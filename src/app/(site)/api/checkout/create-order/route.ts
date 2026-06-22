import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { getPayload } from "payload";
import { sql } from "drizzle-orm";
import config from "@/payload/payload.config";
import { sendEmail, orderConfirmationEmail } from "@/lib/email";

export const runtime = "nodejs";

type PayloadInstance = Awaited<ReturnType<typeof getPayload>>;
type DrizzleDb = {
  execute: (q: unknown) => Promise<{ rowCount?: number | null; rows?: unknown[] }>;
};

function drizzleOf(payload: PayloadInstance): DrizzleDb | null {
  const db = (payload.db as unknown as { drizzle?: DrizzleDb }).drizzle;
  return db && typeof db.execute === "function" ? db : null;
}

/**
 * Atomically reserve `wantQty` units of a variant: an all-or-nothing conditional
 * decrement so two concurrent checkouts can never oversell the same unit.
 * Returns the qty reserved (wantQty on success, 0 if not enough stock).
 * Falls back to a non-atomic read-modify-write only if the raw query path is
 * unavailable, so checkout never hard-breaks.
 */
async function reserveStock(
  payload: PayloadInstance,
  id: string | number,
  wantQty: number,
): Promise<number> {
  const db = drizzleOf(payload);
  if (db) {
    try {
      const res = await db.execute(
        sql`UPDATE "variants" SET "stock" = "stock" - ${wantQty} WHERE "id" = ${id} AND "stock" >= ${wantQty} RETURNING "id"`,
      );
      const n = res.rowCount ?? (Array.isArray(res.rows) ? res.rows.length : 0);
      return n > 0 ? wantQty : 0;
    } catch (e) {
      console.error(`[checkout] atomic reserve failed for variant ${id}; falling back:`, e);
    }
  }
  try {
    const v = await payload.findByID({ collection: "variants", id });
    const stock = (v?.stock as number) ?? 0;
    const grant = Math.min(stock, wantQty);
    if (grant <= 0) return 0;
    await payload.update({ collection: "variants", id, data: { stock: stock - grant } });
    return grant;
  } catch (e) {
    console.error(`[checkout] fallback reserve failed for variant ${id}:`, e);
    return 0;
  }
}

/** Give reserved stock back (used when an order fails to persist after reserving). */
async function releaseStock(
  payload: PayloadInstance,
  id: string | number,
  qty: number,
): Promise<void> {
  const db = drizzleOf(payload);
  if (db) {
    try {
      await db.execute(sql`UPDATE "variants" SET "stock" = "stock" + ${qty} WHERE "id" = ${id}`);
      return;
    } catch (e) {
      console.error(`[checkout] atomic release failed for variant ${id}; falling back:`, e);
    }
  }
  try {
    const v = await payload.findByID({ collection: "variants", id });
    const stock = (v?.stock as number) ?? 0;
    await payload.update({ collection: "variants", id, data: { stock: stock + qty } });
  } catch (e) {
    console.error(`[checkout] fallback release failed for variant ${id}:`, e);
  }
}

/**
 * UPI-QR checkout.
 *
 * Accepts multipart/form-data with:
 *   - payload  : JSON string { items, customer, shippingAddress, upiRef? }
 *   - screenshot : File (image) — required
 *
 * Creates a Media doc for the screenshot, then an Order with
 * status="awaiting_verification" linking to that media. Admin reviews
 * and flips to "paid" in the Payload admin.
 */
export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const raw = form.get("payload");
    const file = form.get("screenshot");

    if (typeof raw !== "string") {
      return NextResponse.json({ error: "Missing payload JSON" }, { status: 400 });
    }

    const body = JSON.parse(raw) as {
      items: { variantId: string; qty: number }[];
      customer: { name: string; email: string; phone: string };
      shippingAddress: {
        line1: string;
        line2?: string;
        city: string;
        state: string;
        pincode: string;
        country?: string;
      };
      upiRef?: string;
    };

    if (!body?.items?.length)
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    if (!body.customer?.email)
      return NextResponse.json({ error: "Missing customer details" }, { status: 400 });
    if (!(file instanceof File))
      return NextResponse.json(
        { error: "Please attach your payment screenshot." },
        { status: 400 },
      );
    if (!file.type.startsWith("image/"))
      return NextResponse.json(
        { error: "Screenshot must be an image." },
        { status: 400 },
      );
    if (file.size > 6 * 1024 * 1024)
      return NextResponse.json(
        { error: "Screenshot too large (max 6MB)." },
        { status: 400 },
      );

    const payload = await getPayload({ config });

    // Aggregate the requested qty per variant (dedupe repeated cart rows) with a
    // sanitized positive-integer qty — a missing/NaN/negative qty must never
    // poison pricing.
    const requested = new Map<string, number>();
    for (const row of body.items) {
      const q = Math.floor(Number(row.qty));
      if (!Number.isFinite(q) || q < 1) continue;
      const key = String(row.variantId);
      requested.set(key, (requested.get(key) ?? 0) + q);
    }

    // Price the cart server-side (never trust the client) AND atomically reserve
    // stock per variant, so two concurrent checkouts can never oversell.
    const items: {
      variant: string | number;
      productName: string;
      variantLabel: string;
      qty: number;
      unitPrice: number;
      lineTotal: number;
    }[] = [];
    const reserved: { id: string | number; qty: number }[] = [];
    let subtotal = 0;

    for (const [variantId, wantQty] of requested) {
      const v = await payload.findByID({ collection: "variants", id: variantId, depth: 1 });
      if (!v || !v.active) continue;
      const granted = await reserveStock(payload, v.id, wantQty);
      if (granted <= 0) continue; // out of stock — skip this line
      reserved.push({ id: v.id, qty: granted });
      const unitPrice = v.price as number;
      const lineTotal = unitPrice * granted;
      const product = v.product as { name?: string } | string;
      const productName =
        typeof product === "object" && product?.name ? product.name : "Item";
      items.push({
        // Pass the raw id (number on postgres, string on mongo) — Payload
        // validates relationship IDs by type, so String()-ing a numeric id
        // makes it fail "Items N > Variant".
        variant: v.id,
        productName,
        variantLabel: `${v.weightGrams}g`,
        qty: granted,
        unitPrice,
        lineTotal,
      });
      subtotal += lineTotal;
    }

    if (!items.length)
      return NextResponse.json(
        { error: "Sorry — those items are out of stock." },
        { status: 409 },
      );

    const shipping = subtotal >= 499 ? 0 : 60;
    const total = subtotal + shipping;
    // Timestamp keeps it sortable; random suffix makes order numbers
    // unguessable (so they can't be enumerated on the public track page).
    const rand = randomBytes(4).toString("hex").toUpperCase();
    const orderNumber = `KNA-${Date.now().toString(36).toUpperCase()}-${rand}`;

    let created: { id: string | number } | undefined;
    try {
      // 1. Upload the screenshot via Payload local API (bypasses access control).
      const buffer = Buffer.from(await file.arrayBuffer());
      const media = await payload.create({
        collection: "media",
        data: {
          alt: `Payment proof for ${orderNumber} by ${body.customer.name}`,
        },
        file: {
          data: buffer,
          mimetype: file.type,
          name: `${orderNumber}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`,
          size: file.size,
        },
      });

      // 2. Create the Order, linked to the media doc.
      created = await payload.create({
        collection: "orders",
        data: {
          orderNumber,
          status: "awaiting_verification",
          paymentMethod: "upi_qr",
          paymentProof: media.id,
          upiTransactionRef: body.upiRef?.trim() || undefined,
          customer: body.customer,
          shippingAddress: { country: "India", ...body.shippingAddress },
          items,
          subtotal,
          shipping,
          discount: 0,
          total,
          currency: "INR",
        },
      });
    } catch (e) {
      // The order didn't persist — release the stock we already reserved so it
      // isn't silently lost from inventory.
      await Promise.all(reserved.map((r) => releaseStock(payload, r.id, r.qty).catch(() => {})));
      throw e;
    }

    // 4. Send the order-confirmation email (best-effort — never block the order).
    try {
      const { subject, html } = orderConfirmationEmail({
        orderNumber,
        customerName: body.customer.name,
        customerEmail: body.customer.email,
        items,
        subtotal,
        shipping,
        total,
        currency: "INR",
        shippingAddress: { country: "India", ...body.shippingAddress },
      });
      await sendEmail({
        to: body.customer.email,
        toName: body.customer.name,
        subject,
        html,
      });
    } catch (e) {
      console.error("[checkout] confirmation email failed:", e);
    }

    return NextResponse.json({
      ok: true,
      order: { id: created!.id, orderNumber, total, currency: "INR" },
    });
  } catch (err) {
    console.error("[checkout/create-order]", err);
    const isDev = process.env.NODE_ENV !== "production";
    // In production return a fixed generic message — never echo raw DB/Payload
    // error text (table/column/constraint names) to an unauthenticated caller.
    return NextResponse.json(
      {
        error: isDev && err instanceof Error
          ? err.message
          : "Checkout failed. Please try again.",
        detail: isDev && err instanceof Error ? err.stack : undefined,
      },
      { status: 500 },
    );
  }
}
