import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@/payload/payload.config";

export const runtime = "nodejs";

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

    // Price cart server-side (never trust the client).
    const items: {
      variant: string | number;
      productName: string;
      variantLabel: string;
      qty: number;
      unitPrice: number;
      lineTotal: number;
    }[] = [];
    let subtotal = 0;

    for (const row of body.items) {
      const v = await payload.findByID({
        collection: "variants",
        id: row.variantId,
        depth: 1,
      });
      if (!v || !v.active) continue;
      const qty = Math.max(1, Math.min(row.qty, (v.stock as number) || 99));
      const unitPrice = v.price as number;
      const lineTotal = unitPrice * qty;
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
        qty,
        unitPrice,
        lineTotal,
      });
      subtotal += lineTotal;
    }

    if (!items.length)
      return NextResponse.json(
        { error: "No purchasable items in cart" },
        { status: 400 },
      );

    const shipping = subtotal >= 499 ? 0 : 60;
    const total = subtotal + shipping;
    const orderNumber = `KNA-${Date.now().toString(36).toUpperCase()}`;

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
    const created = await payload.create({
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

    return NextResponse.json({
      ok: true,
      order: { id: created.id, orderNumber, total, currency: "INR" },
    });
  } catch (err) {
    console.error("[checkout/create-order]", err);
    const message =
      err instanceof Error ? err.message : "Checkout failed. Please try again.";
    return NextResponse.json(
      {
        error: message,
        // Helpful in dev; harmless to leak for this store.
        detail:
          err instanceof Error && process.env.NODE_ENV !== "production"
            ? err.stack
            : undefined,
      },
      { status: 500 },
    );
  }
}
