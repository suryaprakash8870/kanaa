import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPayload } from "payload";
import config from "@/payload/payload.config";

export const revalidate = 300;
export const metadata = { title: "Kanaa — All Products" };

const BG = "#DFF0D8";
const INK = "#1F4A33";
const ACCENT = "#4FB83A";
const CREAM = "#FFF4D8";

type Card = {
  id: string;
  name: string;
  tamil?: string;
  slug: string;
  tagline?: string;
  color: string;
  price?: number;
  mrp?: number;
  heroImageUrl?: string;
};

async function loadProducts(): Promise<Card[]> {
  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "products",
      sort: "order",
      depth: 1,
      limit: 50,
    });
    if (docs.length === 0) return [];

    // Batch: one query for all variants across all products, then pick the
    // cheapest active variant per product in-memory. Turns N+1 into 1+1.
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
              Shop the Collection
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
              the whole shelf.
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
              Small-batch, cold-pressed, hand-ground. Every jar tells a different story — pick the
              one that sounds like yours.
            </p>
          </div>

          {/* Filter pills (static for now) */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 10,
              flexWrap: "wrap",
              marginBottom: "clamp(28px, 4vw, 48px)",
            }}
          >
            {["All jars", "Sun-cured", "Cold-pressed", "Aged in clay"].map((t, i) => (
              <span
                key={t}
                style={{
                  padding: "8px 16px",
                  borderRadius: 999,
                  border: `1px solid ${INK}${i === 0 ? "" : "33"}`,
                  background: i === 0 ? INK : "transparent",
                  color: i === 0 ? CREAM : INK,
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.3px",
                }}
              >
                {t}
              </span>
            ))}
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
            <div
              className="pr-grid"
              style={{
                marginTop: 12,
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gap: "clamp(14px, 1.8vw, 22px)",
              }}
            >
              {products.map((p, i) => (
                <Link
                  key={p.id}
                  href={`/products/${p.slug}`}
                  className="pr-card"
                  style={{
                    position: "relative",
                    display: "block",
                    background: "#fff",
                    borderRadius: 14,
                    overflow: "hidden",
                    textDecoration: "none",
                    color: "inherit",
                    border: `1px solid ${INK}14`,
                    boxShadow: "0 2px 8px rgba(31,74,51,0.05)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  }}
                >
                  {/* Ribbon */}
                  <span
                    style={{
                      position: "absolute",
                      top: 8,
                      left: 8,
                      zIndex: 2,
                      background: CREAM,
                      color: INK,
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: 8,
                      fontWeight: 700,
                      letterSpacing: "1.2px",
                      textTransform: "uppercase",
                      padding: "3px 7px",
                      borderRadius: 999,
                      border: `1px solid ${INK}22`,
                    }}
                  >
                    0{(i % 9) + 1}
                  </span>

                  {/* Image */}
                  <div
                    style={{
                      aspectRatio: "1/1",
                      background: `linear-gradient(135deg, ${p.color}22 0%, ${p.color}11 100%)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <div
                      aria-hidden
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "78%",
                        height: "78%",
                        borderRadius: "50%",
                        border: `1px dashed ${p.color}55`,
                      }}
                    />
                    {p.heroImageUrl ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={p.heroImageUrl}
                        alt={p.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          position: "relative",
                          zIndex: 1,
                        }}
                      />
                    ) : (
                      <span
                        style={{
                          fontFamily: "var(--font-cormorant), serif",
                          fontStyle: "italic",
                          fontSize: 54,
                          fontWeight: 600,
                          color: p.color,
                          opacity: 0.6,
                          position: "relative",
                          zIndex: 1,
                        }}
                      >
                        {p.name.slice(0, 1)}
                      </span>
                    )}
                  </div>

                  {/* Info — compact */}
                  <div style={{ padding: "12px 12px 14px" }}>
                    <h3
                      style={{
                        fontFamily: "var(--font-cormorant), serif",
                        fontStyle: "italic",
                        fontWeight: 600,
                        fontSize: 17,
                        color: INK,
                        margin: 0,
                        letterSpacing: "-0.3px",
                        lineHeight: 1.15,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {p.name}
                    </h3>
                    {p.tamil && (
                      <p
                        style={{
                          fontFamily: "var(--font-dm-sans), sans-serif",
                          color: p.color,
                          fontSize: 9,
                          fontWeight: 600,
                          letterSpacing: "0.8px",
                          textTransform: "uppercase",
                          margin: "2px 0 0",
                        }}
                      >
                        {p.tamil}
                      </p>
                    )}
                    <div
                      style={{
                        marginTop: 10,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 6,
                      }}
                    >
                      {p.price ? (
                        <div style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
                          <span
                            style={{
                              fontFamily: "var(--font-dm-serif), serif",
                              fontSize: 17,
                              color: INK,
                            }}
                          >
                            ₹{p.price}
                          </span>
                          {p.mrp && p.mrp > p.price && (
                            <span
                              style={{
                                fontFamily: "var(--font-dm-sans), sans-serif",
                                fontSize: 11,
                                color: INK,
                                opacity: 0.45,
                                textDecoration: "line-through",
                              }}
                            >
                              ₹{p.mrp}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span
                          style={{
                            fontFamily: "var(--font-dm-sans), sans-serif",
                            color: INK,
                            opacity: 0.55,
                            fontSize: 11,
                          }}
                        >
                          Soon
                        </span>
                      )}
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 26,
                          height: 26,
                          borderRadius: 999,
                          background: INK,
                          color: CREAM,
                          flexShrink: 0,
                        }}
                      >
                        <svg
                          width="11"
                          height="11"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
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
              { k: "Sun-cured", v: "Never sun-shortcut" },
              { k: "Cold-pressed", v: "Never refined" },
              { k: "Hand-ground", v: "Never factory" },
              { k: "Clay-aged", v: "Never rushed" },
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

        <style>{`
          .pr-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 20px 40px rgba(31,74,51,0.14);
          }
          @media (max-width: 1100px) {
            .pr-grid { grid-template-columns: repeat(4, 1fr) !important; }
          }
          @media (max-width: 860px) {
            .pr-grid { grid-template-columns: repeat(3, 1fr) !important; }
          }
          @media (max-width: 560px) {
            .pr-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
        `}</style>
      </main>
      <Footer />
    </>
  );
}
