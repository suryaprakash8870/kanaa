import { getPayload } from "payload";
import config from "@/payload/payload.config";
import OfferBannerClient, { type Offer } from "./OfferBannerClient";

export const revalidate = 60;

const FALLBACK: Offer[] = [
  { icon: "🚚", text: "Free shipping across India on orders above ₹499", cta: "Shop now" },
  { icon: "🎁", text: "Buy 2 jars, get 1 free — limited time on Wild Mango", cta: "Grab the deal" },
  { icon: "✨", text: "First order? Use code KANAA10 for 10% off", cta: "Apply code" },
  { icon: "🌿", text: "New: Lime & Ginger, aged 30 days in terracotta", cta: "Try it" },
  { icon: "📦", text: "Subscribe & save 15% on every monthly delivery", cta: "Subscribe" },
];

async function fetchOffers(): Promise<Offer[]> {
  try {
    const payload = await getPayload({ config });
    const now = new Date();
    const { docs } = await payload.find({
      collection: "offers",
      where: {
        active: { equals: true },
        and: [
          { or: [{ startsAt: { exists: false } }, { startsAt: { less_than_equal: now } }] },
          { or: [{ endsAt: { exists: false } }, { endsAt: { greater_than_equal: now } }] },
        ],
      },
      sort: "order",
      limit: 20,
    });
    if (!docs.length) return FALLBACK;
    return docs.map((d) => ({
      icon: String(d.icon ?? "✨"),
      text: String(d.text ?? ""),
      cta: String(d.ctaLabel ?? "Learn more"),
      ctaUrl: (d.ctaUrl as string) ?? "#products",
    }));
  } catch {
    return FALLBACK;
  }
}

export default async function OfferBanner() {
  const offers = await fetchOffers();
  return <OfferBannerClient offers={offers} />;
}
