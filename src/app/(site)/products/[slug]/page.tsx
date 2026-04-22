import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AddToCartButton from "@/components/AddToCartButton";
import { getPayload } from "payload";
import config from "@/payload/payload.config";

export const revalidate = 300;

const BG = "#DFF0D8";
const INK = "#1F4A33";
const ACCENT = "#4FB83A";
const CREAM = "#FFF4D8";
const CLAY = "#C0301F";
const MUSTARD = "#F5C03A";

const HAND = "var(--font-caveat), cursive";
const SERIF = "var(--font-cormorant), Georgia, serif";
const SANS = "var(--font-dm-sans), sans-serif";
const DISPLAY = "var(--font-dm-serif), Georgia, serif";

type Params = { slug: string };

async function load(slug: string) {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "products",
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
  });
  const product = docs[0];
  if (!product) return null;

  const { docs: variants } = await payload.find({
    collection: "variants",
    where: { product: { equals: product.id }, active: { equals: true } },
    sort: "price",
    limit: 20,
  });

  return { product, variants };
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  try {
    const data = await load(slug);
    if (!data) return { title: "Not found" };
    return {
      title: `${data.product.name} — Kanaa`,
      description: data.product.description ?? undefined,
    };
  } catch {
    return { title: "Kanaa" };
  }
}

export default async function ProductDetail({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  let data: Awaited<ReturnType<typeof load>> = null;
  try {
    data = await load(slug);
  } catch {
    notFound();
  }
  if (!data) notFound();
  const { product, variants } = data!;
  const hero = product.heroImage as { url?: string } | undefined;
  const color = (product.color as string) || INK;

  // Tasting notes — pulled from product if available, else sensible defaults
  const heat = Number((product as unknown as { heatLevel?: number }).heatLevel ?? 3);
  const tang = Number((product as unknown as { tangLevel?: number }).tangLevel ?? 4);
  const oil = Number((product as unknown as { oilLevel?: number }).oilLevel ?? 2);

  // Ritual / process steps
  const ritual = [
    { n: "01", label: "Sun-cured", detail: "3 days on clay tiles under Kongu sun" },
    { n: "02", label: "Stone-pounded", detail: "Spices hand-ground, never machine-milled" },
    { n: "03", label: "Oil-sealed", detail: "Cold-pressed gingelly, no preservatives" },
    { n: "04", label: "Jar-aged", detail: "Rests 7 days before shipping" },
  ];

  return (
    <>
      <Navbar />
      <main
        style={{
          background: BG,
          minHeight: "100vh",
          paddingTop: "calc(56px + clamp(30px, 4vw, 60px))",
          paddingBottom: "clamp(60px, 8vw, 110px)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Doodle ribbon backdrop */}
        <svg
          aria-hidden
          viewBox="0 0 1600 1200"
          preserveAspectRatio="xMidYMid slice"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            opacity: 0.12,
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
          <path
            d="M -120 220 C 140 80, 360 340, 260 500 C 140 680, 440 720, 640 560 C 840 400, 1020 620, 900 800 C 760 980, 1100 1040, 1320 880 C 1520 740, 1700 960, 1760 820"
            fill="none"
            stroke={INK}
            strokeOpacity="0.4"
            strokeWidth="56"
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
          {/* Breadcrumb + jar number */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 28,
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <Link
              href="/products"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontFamily: SANS,
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: INK,
                opacity: 0.7,
                textDecoration: "none",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M11 6l-6 6 6 6" />
              </svg>
              All jars
            </Link>
            <div
              style={{
                fontFamily: HAND,
                fontSize: 22,
                color: CLAY,
                transform: "rotate(-3deg)",
              }}
            >
              jar no. {String((product as { order?: number }).order ?? 1).padStart(2, "0")} —
            </div>
          </div>

          <div
            className="pd-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1.1fr 1fr",
              gap: "clamp(28px, 4vw, 72px)",
              alignItems: "start",
            }}
          >
            {/* ── Image column ── */}
            <div
              style={{
                position: "sticky",
                top: "calc(56px + 24px)",
              }}
              className="pd-sticky"
            >
              <div
                style={{
                  position: "relative",
                  aspectRatio: "1/1",
                  borderRadius: 24,
                  overflow: "hidden",
                  background: `linear-gradient(135deg, ${color}33 0%, ${color}11 100%)`,
                  boxShadow:
                    "0 24px 60px rgba(31,74,51,0.15), 0 8px 20px rgba(31,74,51,0.08)",
                }}
              >
                {/* Decorative rings */}
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "88%",
                    height: "88%",
                    borderRadius: "50%",
                    border: `1px dashed ${color}55`,
                  }}
                />
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "64%",
                    height: "64%",
                    borderRadius: "50%",
                    border: `1px solid ${color}33`,
                  }}
                />

                {/* Handwritten tag — top-left */}
                <div
                  style={{
                    position: "absolute",
                    top: 22,
                    left: 22,
                    zIndex: 2,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "7px 14px",
                    borderRadius: 999,
                    background: CREAM,
                    color: INK,
                    fontFamily: SANS,
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    border: `1px solid ${INK}22`,
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: 999,
                      background: ACCENT,
                      boxShadow: `0 0 0 3px ${ACCENT}33`,
                    }}
                  />
                  Hand-packed
                </div>

                {/* Batch stamp — bottom-right, rotated */}
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    bottom: 22,
                    right: 22,
                    zIndex: 2,
                    width: 88,
                    height: 88,
                    borderRadius: "50%",
                    border: `2px dashed ${CLAY}aa`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transform: "rotate(-12deg)",
                    color: CLAY,
                    fontFamily: SANS,
                    fontSize: 9,
                    fontWeight: 800,
                    letterSpacing: "1.4px",
                    textTransform: "uppercase",
                    textAlign: "center",
                    lineHeight: 1.15,
                    background: "rgba(255,255,255,0.4)",
                    backdropFilter: "blur(2px)",
                  }}
                >
                  Batch<br />Apr&nbsp;&apos;26
                </div>

                {hero?.url ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={hero.url}
                    alt={product.name as string}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      position: "relative",
                      zIndex: 1,
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 180,
                      fontFamily: SERIF,
                      fontStyle: "italic",
                      fontWeight: 600,
                      color,
                      opacity: 0.55,
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    {(product.name as string).slice(0, 1)}
                  </div>
                )}
              </div>

              {/* Micro-credit strip */}
              <div
                style={{
                  marginTop: 14,
                  padding: "12px 16px",
                  borderRadius: 14,
                  background: "#fff",
                  border: `1px solid ${INK}14`,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  fontFamily: SANS,
                  fontSize: 12,
                  color: INK,
                  opacity: 0.85,
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
                <span>Brewed in our Erode kitchen · ships in 48 hrs</span>
              </div>
            </div>

            {/* ── Info column ── */}
            <div>
              <p
                style={{
                  fontFamily: SANS,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: 3,
                  color,
                  textTransform: "uppercase",
                  marginBottom: 14,
                }}
              >
                {product.tagline ?? "Kanaa Organic Pickles"}
              </p>
              <h1
                style={{
                  fontFamily: SERIF,
                  fontStyle: "italic",
                  fontWeight: 600,
                  fontSize: "clamp(40px, 5.2vw, 72px)",
                  color: INK,
                  margin: 0,
                  letterSpacing: "-1.5px",
                  lineHeight: 1.0,
                }}
              >
                {product.name as string}
              </h1>
              {product.tamilName && (
                <p
                  style={{
                    fontFamily: SANS,
                    color,
                    fontSize: 14,
                    fontWeight: 600,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    marginTop: 8,
                  }}
                >
                  {product.tamilName as string}
                </p>
              )}

              {/* Star rating strip */}
              <div
                style={{
                  marginTop: 18,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  flexWrap: "wrap",
                }}
              >
                <div style={{ display: "inline-flex", gap: 2 }}>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <svg
                      key={i}
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill={i < 5 ? MUSTARD : "none"}
                      stroke={MUSTARD}
                      strokeWidth="1.6"
                      strokeLinejoin="round"
                    >
                      <path d="M12 2l3 7 7 .8-5.2 4.7 1.6 7-6.4-3.8-6.4 3.8 1.6-7L2 9.8 9 9z" />
                    </svg>
                  ))}
                </div>
                <span
                  style={{
                    fontFamily: SANS,
                    fontSize: 12,
                    color: INK,
                    opacity: 0.7,
                  }}
                >
                  4.9 · 312 jars sent
                </span>
              </div>

              {product.description && (
                <p
                  style={{
                    fontFamily: SANS,
                    color: INK,
                    fontSize: 15,
                    lineHeight: 1.75,
                    marginTop: 22,
                    opacity: 0.78,
                    maxWidth: 480,
                  }}
                >
                  {product.description as string}
                </p>
              )}

              {/* Tasting notes */}
              <div
                style={{
                  marginTop: 28,
                  padding: "18px 20px",
                  background: "#fff",
                  borderRadius: 16,
                  border: `1px solid ${INK}14`,
                }}
              >
                <p
                  style={{
                    fontFamily: SANS,
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: 2.4,
                    color: ACCENT,
                    textTransform: "uppercase",
                    margin: 0,
                    marginBottom: 12,
                  }}
                >
                  Tasting notes
                </p>
                {[
                  { label: "Heat", value: heat, color: CLAY },
                  { label: "Tang", value: tang, color: MUSTARD },
                  { label: "Oil", value: oil, color: color },
                ].map((t) => (
                  <div
                    key={t.label}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "72px 1fr auto",
                      alignItems: "center",
                      gap: 14,
                      marginTop: 8,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: SERIF,
                        fontStyle: "italic",
                        fontWeight: 600,
                        fontSize: 16,
                        color: INK,
                      }}
                    >
                      {t.label}
                    </span>
                    <div
                      style={{
                        display: "flex",
                        gap: 4,
                      }}
                    >
                      {[1, 2, 3, 4, 5].map((n) => (
                        <span
                          key={n}
                          style={{
                            flex: 1,
                            height: 6,
                            borderRadius: 999,
                            background: n <= t.value ? t.color : `${INK}18`,
                          }}
                        />
                      ))}
                    </div>
                    <span
                      style={{
                        fontFamily: SANS,
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: 1.5,
                        color: INK,
                        opacity: 0.55,
                        textTransform: "uppercase",
                      }}
                    >
                      {t.value}/5
                    </span>
                  </div>
                ))}
              </div>

              {/* Variants */}
              {variants.length > 0 ? (
                <div style={{ marginTop: 36 }}>
                  <p
                    style={{
                      fontFamily: SANS,
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: 2.4,
                      color: INK,
                      textTransform: "uppercase",
                      opacity: 0.65,
                    }}
                  >
                    Pick a size
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 12,
                      marginTop: 12,
                    }}
                  >
                    {variants.map((v) => (
                      <AddToCartButton
                        key={String(v.id)}
                        productId={String(product.id)}
                        variantId={String(v.id)}
                        name={product.name as string}
                        weight={`${v.weightGrams}g`}
                        price={v.price as number}
                        mrp={(v.mrp as number) ?? undefined}
                        stock={(v.stock as number) ?? 0}
                        image={hero?.url}
                        color={color}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    marginTop: 32,
                    padding: 18,
                    borderRadius: 14,
                    background: "#fff",
                    border: `1px solid ${INK}1A`,
                  }}
                >
                  <p
                    style={{
                      fontFamily: SANS,
                      color: INK,
                      margin: 0,
                      fontSize: 14,
                    }}
                  >
                    No variants yet. Add one in{" "}
                    <Link
                      href={`/admin/collections/variants/create`}
                      style={{ color }}
                    >
                      admin → Variants
                    </Link>
                    .
                  </p>
                </div>
              )}

              {/* Ingredients */}
              {Array.isArray(product.ingredients) && product.ingredients.length > 0 && (
                <div
                  style={{
                    marginTop: 36,
                    padding: "22px 24px",
                    background: "#fff",
                    borderRadius: 16,
                    border: `1px solid ${INK}14`,
                  }}
                >
                  <p
                    style={{
                      fontFamily: SANS,
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: 2.4,
                      color: ACCENT,
                      textTransform: "uppercase",
                      marginBottom: 14,
                    }}
                  >
                    What&apos;s inside
                  </p>
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
                      gap: 10,
                      fontFamily: SANS,
                      color: INK,
                      fontSize: 13.5,
                    }}
                  >
                    {product.ingredients.map((i: { item?: string }, n: number) => (
                      <li
                        key={n}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <span
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: 999,
                            background: ACCENT,
                            flexShrink: 0,
                          }}
                        />
                        {i.item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Trust row */}
              <div
                style={{
                  marginTop: 28,
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                  gap: 14,
                }}
              >
                {[
                  { k: "Free shipping", v: "above ₹499", c: ACCENT },
                  { k: "Fresh pack", v: "within 48 hrs", c: MUSTARD },
                  { k: "Flavor guarantee", v: "30-day promise", c: color },
                ].map((t) => (
                  <div
                    key={t.k}
                    style={{
                      padding: "12px 14px",
                      borderRadius: 12,
                      background: "#fff",
                      border: `1px solid ${INK}14`,
                      borderLeft: `3px solid ${t.c}`,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: SERIF,
                        fontStyle: "italic",
                        fontWeight: 600,
                        fontSize: 15,
                        color: INK,
                      }}
                    >
                      {t.k}
                    </div>
                    <div
                      style={{
                        fontFamily: SANS,
                        fontSize: 11,
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                        color: INK,
                        opacity: 0.55,
                        marginTop: 2,
                      }}
                    >
                      {t.v}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── How it's made ritual strip ── */}
          <section
            style={{
              marginTop: "clamp(72px, 10vw, 120px)",
              padding: "clamp(36px, 5vw, 60px)",
              borderRadius: 24,
              background: INK,
              color: CREAM,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              aria-hidden
              style={{
                position: "absolute",
                top: "-40%",
                right: "-10%",
                width: 380,
                height: 380,
                borderRadius: "50%",
                border: `1px dashed ${CREAM}22`,
              }}
            />
            <div
              aria-hidden
              style={{
                position: "absolute",
                top: "-20%",
                right: "0%",
                width: 220,
                height: 220,
                borderRadius: "50%",
                border: `1px dashed ${CREAM}22`,
              }}
            />
            <p
              style={{
                fontFamily: HAND,
                fontSize: 26,
                color: ACCENT,
                margin: 0,
                marginBottom: 6,
                transform: "rotate(-2deg)",
                display: "inline-block",
              }}
            >
              how we make it
            </p>
            <h2
              style={{
                fontFamily: SERIF,
                fontStyle: "italic",
                fontWeight: 600,
                fontSize: "clamp(30px, 4vw, 48px)",
                letterSpacing: "-0.8px",
                margin: 0,
                marginBottom: 34,
                lineHeight: 1.05,
              }}
            >
              four rituals,
              <br />
              zero shortcuts.
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: 24,
              }}
            >
              {ritual.map((r) => (
                <div key={r.n}>
                  <div
                    style={{
                      fontFamily: DISPLAY,
                      fontSize: 34,
                      color: ACCENT,
                      marginBottom: 6,
                      letterSpacing: "-0.5px",
                    }}
                  >
                    {r.n}
                  </div>
                  <div
                    style={{
                      fontFamily: SERIF,
                      fontStyle: "italic",
                      fontWeight: 600,
                      fontSize: 20,
                      marginBottom: 6,
                    }}
                  >
                    {r.label}
                  </div>
                  <p
                    style={{
                      fontFamily: SANS,
                      fontSize: 12.5,
                      lineHeight: 1.6,
                      opacity: 0.78,
                      margin: 0,
                    }}
                  >
                    {r.detail}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Review / pull-quote ── */}
          <section
            style={{
              marginTop: "clamp(60px, 8vw, 100px)",
              textAlign: "center",
              padding: "0 clamp(8px, 3vw, 40px)",
            }}
          >
            <p
              style={{
                fontFamily: HAND,
                fontSize: 24,
                color: CLAY,
                margin: 0,
                marginBottom: 4,
                transform: "rotate(-2deg)",
                display: "inline-block",
              }}
            >
              — from a reader in Madurai
            </p>
            <blockquote
              style={{
                fontFamily: SERIF,
                fontStyle: "italic",
                fontWeight: 500,
                fontSize: "clamp(24px, 3.4vw, 40px)",
                color: INK,
                lineHeight: 1.25,
                letterSpacing: "-0.5px",
                maxWidth: 820,
                margin: "10px auto 0",
              }}
            >
              &ldquo;Tastes exactly like the pickle my paati used to stash in the
              top shelf. Gone in three days — sending another jar to my sister.&rdquo;
            </blockquote>
          </section>

          {/* ── Pairing / enjoy with strip ── */}
          <section
            style={{
              marginTop: "clamp(60px, 8vw, 100px)",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: 14,
            }}
          >
            <div
              style={{
                padding: "18px 20px",
                fontFamily: SANS,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 2.4,
                color: INK,
                opacity: 0.7,
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
              }}
            >
              Pairs with —
            </div>
            {[
              { name: "Curd rice", emoji: "🍚" },
              { name: "Hot idli", emoji: "⚪" },
              { name: "Ghee dosa", emoji: "🥞" },
              { name: "Paratha", emoji: "🫓" },
            ].map((p) => (
              <div
                key={p.name}
                style={{
                  padding: "16px 18px",
                  borderRadius: 14,
                  background: "#fff",
                  border: `1px solid ${INK}14`,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  fontFamily: SERIF,
                  fontStyle: "italic",
                  fontWeight: 600,
                  fontSize: 18,
                  color: INK,
                }}
              >
                <span style={{ fontSize: 22 }}>{p.emoji}</span>
                {p.name}
              </div>
            ))}
          </section>
        </div>
      </main>
      <style>{`
        @media (max-width: 900px) {
          .pd-grid { grid-template-columns: 1fr !important; }
          .pd-sticky { position: static !important; }
        }
      `}</style>
      <Footer />
    </>
  );
}
