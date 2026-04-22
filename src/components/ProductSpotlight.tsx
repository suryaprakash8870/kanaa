import { getPayload } from "payload";
import config from "@/payload/payload.config";
import ProductSpotlightClient, { type SpotlightProduct } from "./ProductSpotlightClient";

export const revalidate = 60;

async function load(): Promise<SpotlightProduct[]> {
  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "products",
      sort: "order",
      depth: 1,
      limit: 12,
    });
    return docs.map((p) => {
      const hero = p.heroImage as { url?: string } | undefined;
      return {
        id: String(p.id),
        name: String(p.name ?? ""),
        slug: String(p.slug ?? ""),
        tagline: (p.tagline as string) ?? (p.description as string) ?? "",
        color: (p.color as string) ?? "#214D34",
        image: hero?.url,
      };
    });
  } catch {
    return [];
  }
}

export default async function ProductSpotlight() {
  const products = await load();
  return <ProductSpotlightClient products={products} />;
}
