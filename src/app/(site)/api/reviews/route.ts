import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@/payload/payload.config";

export const runtime = "nodejs";

/**
 * Customer review submission.
 *
 * Anyone can POST a review, but it is created UNAPPROVED (approved=false) so an
 * admin must vet it before it appears on the site. We go through the Local API
 * (overrideAccess) and force approved=false + source=customer, so the public
 * can never publish an already-approved review or spoof the source.
 */
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      name?: string;
      location?: string;
      rating?: number;
      text?: string;
      email?: string;
      product?: string;
    };

    const name = String(body.name ?? "").trim().slice(0, 80);
    const text = String(body.text ?? "").trim().slice(0, 1000);
    const location = String(body.location ?? "").trim().slice(0, 80);
    const email = String(body.email ?? "").trim().slice(0, 120);
    let rating = Math.round(Number(body.rating));
    if (!Number.isFinite(rating)) rating = 5;
    rating = Math.min(5, Math.max(1, rating));

    if (name.length < 2)
      return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
    if (text.length < 5)
      return NextResponse.json({ error: "Please write a little more about your experience." }, { status: 400 });

    const payload = await getPayload({ config });
    await payload.create({
      collection: "testimonials",
      data: {
        name,
        location: location || undefined,
        rating,
        text,
        email: email || undefined,
        product: body.product || undefined,
        approved: false, // pending admin moderation
        source: "customer",
        order: 999,
      },
    });

    return NextResponse.json({
      ok: true,
      message: "Thank you! Your review has been submitted and will appear once approved.",
    });
  } catch (err) {
    console.error("[reviews] submit failed:", err);
    const isDev = process.env.NODE_ENV !== "production";
    return NextResponse.json(
      { error: isDev && err instanceof Error ? err.message : "Could not submit your review. Please try again." },
      { status: 500 },
    );
  }
}
