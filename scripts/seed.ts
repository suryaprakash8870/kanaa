/**
 * Seed initial data into Payload. Run after your Neon DB is reachable:
 *   npm run seed
 */
import "dotenv/config";
import { getPayload } from "payload";
import config from "../src/payload/payload.config";

async function main() {
  const payload = await getPayload({ config });

  // ----- Products -----
  const productCount = await payload.count({ collection: "products" });
  if (productCount.totalDocs === 0) {
    const products = [
      { name: "Tomato Chutney",  tamilName: "தக்காளி தொக்கு",   slug: "tomato-chutney",  tagline: "Cold-pressed peanut oil, curry leaves & jaggery.",     color: "#8B1F3A", order: 1 },
      { name: "Vatha Kolambu",   tamilName: "வத்த குழம்பு",      slug: "vatha-kolambu",   tagline: "Tamarind, lentils & sun-dried vegetables — bold and tangy.", color: "#6B4022", order: 2 },
      { name: "Sour Spinach",    tamilName: "செம்புளிச்சை கீரை", slug: "sour-spinach",    tagline: "Wild greens slow-cooked with green chillies & sesame oil.",   color: "#3D5A2D", order: 3 },
      { name: "Veldt Grape",     tamilName: "பிரண்டை தொக்கு",    slug: "veldt-grape",     tagline: "An ancestral pickle from the Kongu hills — earthy and warming.", color: "#5F3D8A", order: 4 },
    ];
    for (const p of products) {
      const created = await payload.create({ collection: "products", data: { ...p, featured: true } });
      // Default 250g variant for each
      await payload.create({
        collection: "variants",
        data: { product: created.id, sku: `${p.slug}-250`, weightGrams: 250, price: 199, mrp: 249, stock: 25, lowStockThreshold: 5, active: true },
      });
    }
    console.log(`Seeded ${products.length} products + variants.`);
  } else {
    console.log(`Products already seeded (${productCount.totalDocs} rows). Skipping.`);
  }

  // ----- Offers -----
  const existing = await payload.count({ collection: "offers" });
  if (existing.totalDocs > 0) {
    console.log(`Offers already seeded (${existing.totalDocs} rows). Skipping.`);
    process.exit(0);
  }

  const offers = [
    { icon: "🚚", text: "Free shipping across India on orders above ₹499", ctaLabel: "Shop now", order: 1 },
    { icon: "🎁", text: "Buy 2 jars, get 1 free — limited time on Wild Mango", ctaLabel: "Grab the deal", order: 2 },
    { icon: "✨", text: "First order? Use code KANAA10 for 10% off", ctaLabel: "Apply code", order: 3 },
    { icon: "🌿", text: "New: Lime & Ginger, aged 30 days in terracotta", ctaLabel: "Try it", order: 4 },
    { icon: "📦", text: "Subscribe & save 15% on every monthly delivery", ctaLabel: "Subscribe", order: 5 },
  ];

  for (const o of offers) {
    await payload.create({ collection: "offers", data: { ...o, active: true, ctaUrl: "#products" } });
  }

  console.log(`Seeded ${offers.length} offers.`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
