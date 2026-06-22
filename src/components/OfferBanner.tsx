import { getPayload } from "payload";
import config from "@/payload/payload.config";
import OfferBannerClient, { type Offer } from "./OfferBannerClient";

export const revalidate = 60;

// Fixed-header geometry. Pages reserve `--hdr` of top space; we set it here so
// the space collapses to nav-only when there is no banner to show.
const NAV_H = 56;
const BANNER_H = 60;

// The banner is fully CMS-controlled: it shows ONLY the active offers from the
// Offers collection. Deactivate every offer (or set them outside their
// start/end window) and the banner disappears entirely — there are no
// hardcoded fallback offers. On a DB error we also show nothing rather than
// stale defaults.
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
      depth: 1, // populate the `image` upload so we get its URL
    });
    return docs.map((d) => {
      const img = d.image as { url?: string } | string | null | undefined;
      const imageUrl =
        img && typeof img === "object" && typeof img.url === "string" ? img.url : undefined;
      return {
        icon: String(d.icon ?? "✨"),
        text: String(d.text ?? ""),
        cta: String(d.ctaLabel ?? "Learn more"),
        ctaUrl: (d.ctaUrl as string) ?? "#products",
        imageUrl,
      };
    });
  } catch {
    return [];
  }
}

export default async function OfferBanner() {
  const offers = await fetchOffers();
  const hdr = NAV_H + (offers.length ? BANNER_H : 0);
  return (
    <>
      {/* Collapse the reserved header space when there is no banner to show. */}
      <style>{`:root{--hdr:${hdr}px}`}</style>
      <OfferBannerClient offers={offers} />
    </>
  );
}
