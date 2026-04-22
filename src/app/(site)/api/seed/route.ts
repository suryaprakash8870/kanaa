import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@/payload/payload.config";

/**
 * Dev-only seed endpoint. Hit GET /api/seed once to seed initial data.
 * Skips collections that already have rows.
 */
export async function GET() {
  try {
    const payload = await getPayload({ config });
    const log: string[] = [];

    // Products
    const pCount = await payload.count({ collection: "products" });
    if (pCount.totalDocs === 0) {
      const products = [
        { name: "Tomato Chutney",  tamilName: "தக்காளி தொக்கு",   slug: "tomato-chutney",  tagline: "Cold-pressed peanut oil, curry leaves & jaggery.", color: "#8B1F3A", order: 1 },
        { name: "Vatha Kolambu",   tamilName: "வத்த குழம்பு",      slug: "vatha-kolambu",   tagline: "Tamarind, lentils & sun-dried vegetables — bold and tangy.", color: "#6B4022", order: 2 },
        { name: "Sour Spinach",    tamilName: "செம்புளிச்சை கீரை", slug: "sour-spinach",    tagline: "Wild greens slow-cooked with green chillies & sesame oil.", color: "#3D5A2D", order: 3 },
        { name: "Veldt Grape",     tamilName: "பிரண்டை தொக்கு",    slug: "veldt-grape",     tagline: "An ancestral pickle from the Kongu hills — earthy and warming.", color: "#5F3D8A", order: 4 },
      ];
      for (const p of products) {
        const created = await payload.create({ collection: "products", data: { ...p, featured: true } });
        await payload.create({
          collection: "variants",
          data: { product: created.id, sku: `${p.slug}-250`, weightGrams: 250, price: 199, mrp: 249, stock: 25, lowStockThreshold: 5, active: true },
        });
      }
      log.push(`Seeded ${products.length} products + variants.`);
    } else {
      log.push(`Products already exist (${pCount.totalDocs}). Skipped.`);
    }

    // Offers
    const oCount = await payload.count({ collection: "offers" });
    if (oCount.totalDocs === 0) {
      const offers = [
        { icon: "🚚", text: "Free shipping across India on orders above ₹499", ctaLabel: "Shop now",     order: 1 },
        { icon: "🎁", text: "Buy 2 jars, get 1 free — limited time on Wild Mango", ctaLabel: "Grab the deal", order: 2 },
        { icon: "✨", text: "First order? Use code KANAA10 for 10% off",            ctaLabel: "Apply code",   order: 3 },
        { icon: "🌿", text: "New: Lime & Ginger, aged 30 days in terracotta",       ctaLabel: "Try it",       order: 4 },
        { icon: "📦", text: "Subscribe & save 15% on every monthly delivery",       ctaLabel: "Subscribe",    order: 5 },
      ];
      for (const o of offers) {
        await payload.create({ collection: "offers", data: { ...o, active: true, ctaUrl: "/products" } });
      }
      log.push(`Seeded ${offers.length} offers.`);
    } else {
      log.push(`Offers already exist (${oCount.totalDocs}). Skipped.`);
    }

    return NextResponse.json({ ok: true, log });
  } catch (err) {
    console.error("[seed]", err);
    return NextResponse.json({ ok: false, error: err instanceof Error ? err.message : "seed failed" }, { status: 500 });
  }
}
