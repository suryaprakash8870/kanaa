import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductsBrowser, { type ProductCard } from "@/components/ProductsBrowser";
import { getPayload } from "payload";
import config from "@/payload/payload.config";

export const revalidate = 300;
export const metadata = { title: "Kanaa — All Products" };

const BG = "#DFF0D8";
const INK = "#1F4A33";
const ACCENT = "#4FB83A";

async function loadProducts(): Promise<ProductCard[]> {
  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "products",
      sort: "order",
      depth: 1,
      limit: 50,
    });
    if (docs.length === 0) return [];

    // Batch: one query for all variants, then pick the cheapest active variant
    // per product in-memory. Turns N+1 into 1+1.
    const productIds = docs.map((p) => p.id);
    const { docs: allVariants } = await payload.find({
      collection: "variants",
      where: {
        product: { in: productIds },
        active: { equals: true },
      },
      sort: "price",
      limit: 500,
      depth: 0,
    });

    const cheapestByProduct = new Map<string, { price?: number; mrp?: number }>();
    for (const v of allVariants) {
      const pid = String(
        typeof v.product === "object" && v.product !== null
          ? (v.product as { id: string }).id
          : v.product,
      );
      if (cheapestByProduct.has(pid)) continue; // sorted by price asc — first win
      cheapestByProduct.set(pid, {
        price: v.price as number | undefined,
        mrp: (v.mrp as number) ?? undefined,
      });
    }

    return docs.map((p) => {
      const hero = p.heroImage as { url?: string } | undefined;
      const cheapest = cheapestByProduct.get(String(p.id));
      return {
        id: String(p.id),
        name: String(p.name ?? ""),
        tamil: (p.tamilName as string) ?? undefined,
        slug: String(p.slug ?? ""),
        tagline: (p.tagline as string) ?? undefined,
        color: (p.color as string) ?? INK,
        price: cheapest?.price,
        mrp: cheapest?.mrp,
        heroImageUrl: hero?.url,
      };
    });
  } catch {
    return [];
  }
}

export default async function ProductsPage() {
  const products = await loadProducts();

  return (
    <>
      <Navbar />
      <main
        style={{
          background: BG,
          minHeight: "100vh",
          paddingTop: "calc(56px + clamp(40px, 6vw, 90px))",
          paddingBottom: "clamp(60px, 8vw, 110px)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Doodle background — big ribbon line only */}
        <svg
          aria-hidden
          viewBox="0 0 1600 1200"
          preserveAspectRatio="xMidYMid slice"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            opacity: 0.14,
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
          <path
            d="M -120 140 C 120 20, 340 280, 200 420 C 60 560, 360 620, 520 480 C 680 340, 900 520, 760 680 C 620 840, 940 920, 1120 760 C 1300 600, 1480 820, 1340 960 C 1200 1100, 1520 1200, 1760 1020"
            fill="none"
            stroke={INK}
            strokeOpacity="0.5"
            strokeWidth="64"
            strokeLinecap="round"
          />
        </svg>

        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 clamp(20px, 5vw, 60px)",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "clamp(40px, 6vw, 72px)" }}>
            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 4,
                color: ACCENT,
                textTransform: "uppercase",
                marginBottom: 18,
              }}
            >
              Our Products
            </p>
            <h1
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontStyle: "italic",
                fontWeight: 500,
                fontSize: "clamp(52px, 8vw, 112px)",
                lineHeight: 0.96,
                letterSpacing: "-2px",
                color: INK,
                margin: 0,
                marginBottom: 18,
              }}
            >
              crafted with care.
            </h1>
            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                color: INK,
                opacity: 0.72,
                fontSize: "clamp(14px, 1.2vw, 17px)",
                lineHeight: 1.65,
                maxWidth: 540,
                margin: "0 auto",
              }}
            >
              Explore our range of healthy homemade products inspired by traditional
              South Indian flavours. Thoughtfully prepared using wholesome ingredients,
              every product brings nourishment, convenience, and authentic taste to your
              everyday meals.
            </p>
          </div>

          {products.length === 0 ? (
            <div
              style={{
                marginTop: 40,
                padding: 48,
                borderRadius: 18,
                background: "#fff",
                border: `1px solid ${INK}1A`,
                textAlign: "center",
                maxWidth: 520,
                marginInline: "auto",
              }}
            >
              <p style={{ fontFamily: "var(--font-dm-sans)", color: INK }}>
                No products yet. Add some from{" "}
                <Link href="/admin/collections/products" style={{ color: INK, fontWeight: 600 }}>
                  the admin
                </Link>
                .
              </p>
            </div>
          ) : (
            <ProductsBrowser products={products} />
          )}

          {/* Trust row */}
          <div
            style={{
              marginTop: "clamp(60px, 8vw, 100px)",
              paddingTop: "clamp(32px, 4vw, 48px)",
              borderTop: `1px solid ${INK}22`,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 24,
              textAlign: "center",
            }}
          >
            {[
              { k: "Homemade taste", v: "Traditional recipes" },
              { k: "Healthy ingredients", v: "Wholesome & natural" },
              { k: "Quick & easy", v: "Made for busy days" },
              { k: "Comforting", v: "In every meal" },
            ].map((item) => (
              <div key={item.k}>
                <p
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontStyle: "italic",
                    fontWeight: 600,
                    fontSize: 22,
                    color: INK,
                    margin: 0,
                  }}
                >
                  {item.k}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: 11,
                    letterSpacing: "1.8px",
                    textTransform: "uppercase",
                    color: INK,
                    opacity: 0.55,
                    margin: "4px 0 0",
                  }}
                >
                  {item.v}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
