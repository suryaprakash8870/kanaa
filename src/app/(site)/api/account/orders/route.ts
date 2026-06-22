import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getPayload } from "payload";
import config from "@/payload/payload.config";
import { normalizeEmail } from "@/lib/identity";
import { CUSTOMER_COOKIE } from "../session/route";
import { verifySessionToken } from "@/lib/session";

export const runtime = "nodejs";

/**
 * GET — order history for the logged-in customer (verified email in the cookie
 * set by /api/account/session). Each order's items are enriched with a fresh
 * cart-line snapshot (current price/stock/image) so the storefront can offer
 * "Reorder".
 *
 * Orders are matched by email (the Google account email vs the checkout email).
 * Querying Payload directly on the nested email keeps this indexed and scalable.
 */
export async function GET() {
  const store = await cookies();
  // Verify the signed session — a forged/tampered/expired cookie yields null.
  const email = verifySessionToken(store.get(CUSTOMER_COOKIE)?.value);
  if (!email) {
    return NextResponse.json({ loggedIn: false, orders: [] }, { status: 401 });
  }

  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "orders",
      // contains → case-insensitive (ILIKE) so "John@x.com" still matches the
      // lowercased cookie email; the JS filter below enforces an exact match.
      where: { "customer.email": { contains: email } },
      limit: 200,
      sort: "-createdAt",
      depth: 0,
    });

    // Keep only exact normalized-email matches (guards against the substring
    // nature of `contains`).
    const mine = docs.filter(
      (o) => normalizeEmail((o.customer as { email?: string })?.email) === email,
    );

    // Collect unique variant ids across my orders for one batched fetch.
    const variantIds = new Set<string | number>();
    for (const o of mine) {
      for (const it of (o.items as { variant?: string | number }[]) ?? []) {
        if (it.variant != null) variantIds.add(it.variant);
      }
    }

    const variantMap = new Map<
      string,
      {
        variantId: string;
        productId: string;
        name: string;
        weight: string;
        price: number;
        mrp?: number;
        image?: string;
        stock: number;
        active: boolean;
      }
    >();
    await Promise.all(
      [...variantIds].map(async (id) => {
        try {
          const v = await payload.findByID({
            collection: "variants",
            id,
            depth: 2,
          });
          if (!v) return;
          const product = v.product as
            | { id?: string | number; name?: string; heroImage?: { url?: string } }
            | string;
          const prod = typeof product === "object" ? product : undefined;
          variantMap.set(String(id), {
            variantId: String(v.id),
            productId: String(prod?.id ?? ""),
            name: prod?.name ?? "Item",
            weight: `${v.weightGrams}g`,
            price: v.price as number,
            mrp: (v.mrp as number) || undefined,
            image: prod?.heroImage?.url,
            stock: (v.stock as number) ?? 0,
            active: Boolean(v.active),
          });
        } catch {
          /* variant gone — skip; it just won't be reorderable */
        }
      }),
    );

    const orders = mine.map((o) => {
      const items = ((o.items as Array<Record<string, unknown>>) ?? []).map(
        (it) => {
          const snap = it.variant != null ? variantMap.get(String(it.variant)) : undefined;
          const reorderable =
            snap && snap.active && snap.stock > 0
              ? { ...snap, qty: Math.min(it.qty as number, snap.stock) }
              : null;
          return {
            productName: it.productName as string,
            variantLabel: (it.variantLabel as string) ?? null,
            qty: it.qty as number,
            unitPrice: it.unitPrice as number,
            lineTotal: it.lineTotal as number,
            reorderable,
          };
        },
      );
      return {
        id: o.id,
        orderNumber: o.orderNumber as string,
        status: o.status as string,
        total: o.total as number,
        currency: (o.currency as string) ?? "INR",
        createdAt: o.createdAt as string,
        items,
      };
    });

    return NextResponse.json({ loggedIn: true, email, orders });
  } catch (err) {
    console.error("[account/orders]", err);
    return NextResponse.json(
      { error: "Could not load your orders." },
      { status: 500 },
    );
  }
}
