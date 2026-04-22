import { getPayload } from "payload";
import config from "@/payload/payload.config";
import FlavorCarouselClient, { type Flavor } from "./FlavorCarouselClient";

export const revalidate = 60;

async function fetchFlavors(): Promise<Flavor[]> {
  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "products",
      sort: "order",
      limit: 20,
    });
    const mapped: Flavor[] = [];
    for (const p of docs) {
      // Pull cheapest variant for a price display (optional)
      let price = "";
      try {
        const v = await payload.find({
          collection: "variants",
          where: { product: { equals: p.id }, active: { equals: true } },
          sort: "price",
          limit: 1,
        });
        if (v.docs[0]?.price) price = `₹${v.docs[0].price}`;
      } catch {}
      mapped.push({
        name: String(p.name ?? ""),
        tamil: String(p.tamilName ?? ""),
        price: price || "",
        weight: "",
        spice: "",
        color: String(p.color ?? "#6B4022"),
      });
    }
    return mapped;
  } catch {
    return [];
  }
}

export default async function FlavorCarousel() {
  const flavors = await fetchFlavors();
  return <FlavorCarouselClient flavors={flavors.length ? flavors : undefined} />;
}
