import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@/payload/payload.config";

/**
 * Dev-only seed endpoint. Hit GET /api/seed once to seed initial data.
 * Skips collections that already have rows.
 *
 * Hardened: in production it is disabled unless a SEED_SECRET env var is set and
 * matched via ?key=... (or an x-seed-secret header). Otherwise anyone could hit
 * this public endpoint to write rows into the live database.
 */
export async function GET(req: Request) {
  if (process.env.NODE_ENV === "production") {
    const secret = process.env.SEED_SECRET;
    const url = new URL(req.url);
    const provided = url.searchParams.get("key") ?? req.headers.get("x-seed-secret");
    if (!secret || provided !== secret) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
  }
  try {
    const payload = await getPayload({ config });
    const log: string[] = [];

    // Products
    const pCount = await payload.count({ collection: "products" });
    if (pCount.totalDocs === 0) {
      const THOKKU_TAGLINE = "Traditional homemade-style thokku, rich and flavourful.";
      const SOUP_TAGLINE = "Quick, nourishing soup mix ready in minutes.";
      const POWDER_TAGLINE = "Naturally dried & powdered for easy everyday cooking.";
      const products = [
        // Thokku collection
        { name: "Pirandai Thokku",        slug: "pirandai-thokku",        tagline: THOKKU_TAGLINE, color: "#5F3D8A", order: 1 },
        { name: "Poondu Thokku",          slug: "poondu-thokku",          tagline: THOKKU_TAGLINE, color: "#6B4022", order: 2 },
        { name: "Kothamalli Thokku",      slug: "kothamalli-thokku",      tagline: THOKKU_TAGLINE, color: "#3D5A2D", order: 3 },
        { name: "Thakkali Thokku",        slug: "thakkali-thokku",        tagline: THOKKU_TAGLINE, color: "#8B1F3A", order: 4 },
        { name: "Karuvepillai Thokku",    slug: "karuvepillai-thokku",    tagline: THOKKU_TAGLINE, color: "#2E6B3E", order: 5 },
        { name: "Pulichaikeerai Thokku",  slug: "pulichaikeerai-thokku",  tagline: THOKKU_TAGLINE, color: "#4A7A2D", order: 6 },
        { name: "Thakkali Poondu Thokku", slug: "thakkali-poondu-thokku", tagline: THOKKU_TAGLINE, color: "#A63A2A", order: 7 },
        { name: "Vazhaipoo Thokku",       slug: "vazhaipoo-thokku",       tagline: THOKKU_TAGLINE, color: "#7A5C2E", order: 8 },
        { name: "Kalan Thokku",           slug: "kalan-thokku",           tagline: THOKKU_TAGLINE, color: "#6B4F3A", order: 9 },
        { name: "Vallarai Thokku",        slug: "vallarai-thokku",        tagline: THOKKU_TAGLINE, color: "#3D6B4A", order: 10 },
        { name: "Mangai Thokku",          slug: "mangai-thokku",          tagline: THOKKU_TAGLINE, color: "#C9912A", order: 11 },
        { name: "Chinna Vengayam Thokku", slug: "chinna-vengayam-thokku", tagline: THOKKU_TAGLINE, color: "#9A3B5A", order: 12 },
        // Karakulambu
        { name: "Vathakulambu",           slug: "vathakulambu",           tagline: "Traditional South Indian kulambu mix — bold and tangy.", color: "#6B2A1F", order: 13 },
        // Soup mixes
        { name: "Murungai Keerai Soup",   slug: "murungai-keerai-soup",   tagline: SOUP_TAGLINE, color: "#3D7A2D", order: 14 },
        { name: "Mudakathan Soup",        slug: "mudakathan-soup",        tagline: SOUP_TAGLINE, color: "#4A8A3A", order: 15 },
        { name: "Vallarai Soup",          slug: "vallarai-soup",          tagline: SOUP_TAGLINE, color: "#2E6B3E", order: 16 },
        { name: "Oovuthi Keerai Soup",    slug: "oovuthi-keerai-soup",    tagline: SOUP_TAGLINE, color: "#5A8A2D", order: 17 },
        { name: "Mudavattukaal Soup",     slug: "mudavattukaal-soup",     tagline: SOUP_TAGLINE, color: "#3D6B4A", order: 18 },
        // Dried & powdered
        { name: "Tomato Powder",          slug: "tomato-powder",          tagline: POWDER_TAGLINE, color: "#B5402A", order: 19 },
        { name: "Onion Powder",           slug: "onion-powder",           tagline: POWDER_TAGLINE, color: "#B5762A", order: 20 },
        { name: "Garlic Powder",          slug: "garlic-powder",          tagline: POWDER_TAGLINE, color: "#C9A24A", order: 21 },
        { name: "Moringa Powder",         slug: "moringa-powder",         tagline: POWDER_TAGLINE, color: "#3D7A3A", order: 22 },
        { name: "Drumstick Powder",       slug: "drumstick-powder",       tagline: POWDER_TAGLINE, color: "#4A8A3A", order: 23 },
        // Healthy snacks
        { name: "Raagi Bread",            slug: "raagi-bread",            tagline: "Wholesome ragi snack for guilt-free everyday munching.", color: "#6B4022", order: 24 },
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

    // Blog posts
    const bCount = await payload.count({ collection: "posts", where: { status: { equals: "published" } } });
    if (bCount.totalDocs === 0) {
      const posts = [
        {
          title: "Why Cold-Pressed Oil Makes All the Difference",
          slug: "why-cold-pressed-oil",
          excerpt: "Most pickles use refined oils that are stripped of flavour and nutrients. Here's what happens when you choose cold-pressed gingelly instead.",
          author: "Kanaa Kitchen",
          readTime: 4,
          status: "published",
          publishedAt: new Date("2026-03-10").toISOString(),
          tags: [{ tag: "Ingredients" }, { tag: "Oil" }],
          content: {
            root: {
              type: "root",
              children: [
                { type: "heading", tag: "h2", version: 1, children: [{ type: "text", text: "The difference starts in the mill", version: 1 }] },
                { type: "paragraph", version: 1, children: [{ type: "text", text: "Cold-pressed oil is extracted by crushing seeds or nuts at low temperatures — typically below 49°C. No chemicals, no heat treatment, no solvent extraction. The result is an oil that still carries the aroma, colour, and micronutrients of the original ingredient.", version: 1 }] },
                { type: "paragraph", version: 1, children: [{ type: "text", text: "Refined oil, by contrast, goes through bleaching, deodorising, and high-heat processing. By the time it reaches your jar, most of the flavour is gone — and so are the antioxidants.", version: 1 }] },
                { type: "heading", tag: "h2", version: 1, children: [{ type: "text", text: "Why gingelly oil for pickles?", version: 1 }] },
                { type: "paragraph", version: 1, children: [{ type: "text", text: "Gingelly (sesame) oil has been the traditional pickling medium in Tamil Nadu for centuries — for good reason. It acts as a natural preservative, has a high smoke point, and carries a nutty depth that amplifies every spice it touches. Every jar of Kanaa is made with stone-crushed gingelly oil from the Kongu region.", version: 1 }] },
              ],
              direction: "ltr",
              format: "",
              indent: 0,
              version: 1,
            },
          },
        },
        {
          title: "The Art of Sun-Drying: A 72-Hour Ritual",
          slug: "art-of-sun-drying",
          excerpt: "Before a single spice enters a Kanaa jar, it spends three days under the open Tamil Nadu sky. This is why it matters.",
          author: "Kanaa Kitchen",
          readTime: 3,
          status: "published",
          publishedAt: new Date("2026-03-22").toISOString(),
          tags: [{ tag: "Process" }, { tag: "Tradition" }],
          content: {
            root: {
              type: "root",
              children: [
                { type: "paragraph", version: 1, children: [{ type: "text", text: "Every mango slice, every red chilli, every raw ingredient that enters our kitchen first spends three full days drying in the open air. Not in a dehydrator. Not under a heat lamp. Under the actual Tamil Nadu sun, on woven bamboo mats.", version: 1 }] },
                { type: "heading", tag: "h2", version: 1, children: [{ type: "text", text: "What sun-drying actually does", version: 1 }] },
                { type: "paragraph", version: 1, children: [{ type: "text", text: "Removing moisture is the obvious part. But slow sun-drying also concentrates flavour compounds — sugars and acids develop complexity they simply can't achieve in a fast oven. The slow evaporation also allows fermentation-friendly microorganisms to begin their work on the surface, building the tangy depth you taste in a well-made pickle.", version: 1 }] },
                { type: "heading", tag: "h2", version: 1, children: [{ type: "text", text: "Why we'll never shortcut this step", version: 1 }] },
                { type: "paragraph", version: 1, children: [{ type: "text", text: "Faster drying methods exist. We've been offered them. But the flavour comparison is stark — machine-dried mangoes taste flat against the sun-cured ones. Three days is the minimum. Some batches get five.", version: 1 }] },
              ],
              direction: "ltr",
              format: "",
              indent: 0,
              version: 1,
            },
          },
        },
        {
          title: "Pickling in Terracotta: What 30 Days in Clay Does",
          slug: "pickling-in-terracotta",
          excerpt: "Our pickles age in unglazed terracotta pots for 30 days. The clay isn't just aesthetic — it's an active ingredient.",
          author: "Kanaa Kitchen",
          readTime: 5,
          status: "published",
          publishedAt: new Date("2026-04-05").toISOString(),
          tags: [{ tag: "Process" }, { tag: "Fermentation" }, { tag: "Clay" }],
          content: {
            root: {
              type: "root",
              children: [
                { type: "paragraph", version: 1, children: [{ type: "text", text: "Terracotta is porous. That single property changes everything about how a pickle matures inside it.", version: 1 }] },
                { type: "heading", tag: "h2", version: 1, children: [{ type: "text", text: "Breathing through clay", version: 1 }] },
                { type: "paragraph", version: 1, children: [{ type: "text", text: "Unlike glass or plastic, unglazed clay allows microscopic air exchange through its walls. This creates a stable, slightly humid microclimate inside the pot — ideal for controlled lacto-fermentation. The result is a pickle that develops layered sourness rather than a sharp, aggressive one.", version: 1 }] },
                { type: "heading", tag: "h2", version: 1, children: [{ type: "text", text: "The mineral exchange", version: 1 }] },
                { type: "paragraph", version: 1, children: [{ type: "text", text: "Clay naturally leaches trace minerals — calcium, magnesium, iron — into anything stored in it. Our grandmothers knew this intuitively. The pickle tastes earthier, rounder, more complete from the clay contact.", version: 1 }] },
                { type: "heading", tag: "h2", version: 1, children: [{ type: "text", text: "Why 30 days minimum", version: 1 }] },
                { type: "paragraph", version: 1, children: [{ type: "text", text: "The first week is aggressive: acids develop rapidly, the brine turns cloudy, flavours are sharp. By day 14, things calm. By day 30, the spices have fully bloomed into the oil, the fermentation has stabilised, and the pickle is genuinely ready. We test every batch before it leaves the clay.", version: 1 }] },
              ],
              direction: "ltr",
              format: "",
              indent: 0,
              version: 1,
            },
          },
        },
        {
          title: "Five Ways to Use Kanaa Tomato Chutney Beyond Toast",
          slug: "five-ways-tomato-chutney",
          excerpt: "Tomato chutney is the most versatile jar in our lineup. Here are five ways we actually use it in the kitchen.",
          author: "Kanaa Kitchen",
          readTime: 3,
          status: "published",
          publishedAt: new Date("2026-04-18").toISOString(),
          tags: [{ tag: "Recipes" }, { tag: "Tomato Chutney" }],
          content: {
            root: {
              type: "root",
              children: [
                { type: "paragraph", version: 1, children: [{ type: "text", text: "Most people open a jar of tomato chutney and reach for bread. That's a good start. But there's a lot more it can do.", version: 1 }] },
                { type: "heading", tag: "h2", version: 1, children: [{ type: "text", text: "1. Stir into scrambled eggs", version: 1 }] },
                { type: "paragraph", version: 1, children: [{ type: "text", text: "A spoonful stirred into eggs just before they set adds body, a gentle heat, and enough acidity to cut through the richness. Skip the hot sauce.", version: 1 }] },
                { type: "heading", tag: "h2", version: 1, children: [{ type: "text", text: "2. Thin it into a pasta sauce", version: 1 }] },
                { type: "paragraph", version: 1, children: [{ type: "text", text: "Two tablespoons of chutney, a ladle of pasta water, a glug of olive oil. Toss in spaghetti with some torn basil. Ready in the time it takes to boil the pasta.", version: 1 }] },
                { type: "heading", tag: "h2", version: 1, children: [{ type: "text", text: "3. Use as a marinade base", version: 1 }] },
                { type: "paragraph", version: 1, children: [{ type: "text", text: "Mix with yoghurt and coat chicken, paneer, or mushrooms before grilling. The jaggery in the chutney caramelises beautifully under heat.", version: 1 }] },
                { type: "heading", tag: "h2", version: 1, children: [{ type: "text", text: "4. Spread on a dosa before filling", version: 1 }] },
                { type: "paragraph", version: 1, children: [{ type: "text", text: "Instead of regular chutney on the side, spread a thin layer directly onto the dosa before adding masala. Every bite gets some.", version: 1 }] },
                { type: "heading", tag: "h2", version: 1, children: [{ type: "text", text: "5. Dollop on dal", version: 1 }] },
                { type: "paragraph", version: 1, children: [{ type: "text", text: "A spoonful of cold chutney dropped onto a bowl of hot dal, right at the table. The contrast — warm dal, cold chutney, fresh rice — is the whole meal.", version: 1 }] },
              ],
              direction: "ltr",
              format: "",
              indent: 0,
              version: 1,
            },
          },
        },
      ];

      for (const post of posts) {
        await payload.create({ collection: "posts", data: post as Parameters<typeof payload.create>[0]["data"] });
      }
      log.push(`Seeded ${posts.length} blog posts.`);
    } else {
      log.push(`Blog posts already exist (${bCount.totalDocs}). Skipped.`);
    }

    return NextResponse.json({ ok: true, log });
  } catch (err) {
    console.error("[seed]", err);
    // Don't leak internal error details to clients.
    const error =
      process.env.NODE_ENV === "production"
        ? "Seed failed."
        : err instanceof Error
          ? err.message
          : "seed failed";
    return NextResponse.json({ ok: false, error }, { status: 500 });
  }
}
