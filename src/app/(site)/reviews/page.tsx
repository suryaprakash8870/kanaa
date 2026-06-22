import { getPayload } from "payload";
import config from "@/payload/payload.config";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReviewForm from "@/components/ReviewForm";

export const revalidate = 120;

const BG = "#DFF0D8";
const INK = "#1F4A33";
const ACCENT = "#4FB83A";
const GREEN_STROKE = "#6CC74F";
const GOLD = "#E5B43A";
const STAR_EMPTY = "#D6D6D6";
const SANS = "var(--font-dm-sans), sans-serif";
const DISPLAY = "var(--font-fraunces), Georgia, serif";

type Review = { name: string; location?: string; rating: number; text: string };

async function loadReviews(): Promise<Review[]> {
  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "testimonials",
      where: { approved: { equals: true } },
      sort: "-createdAt",
      limit: 100,
    });
    return docs.map((d) => ({
      name: String(d.name ?? ""),
      location: d.location ? String(d.location) : undefined,
      rating: Number(d.rating ?? 5),
      text: String(d.text ?? ""),
    }));
  } catch {
    return [];
  }
}

function Stars({ count, color = GOLD, size = 15 }: { count: number; color?: string; size?: number }) {
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 14 14" fill={i < count ? color : STAR_EMPTY}>
          <path d="M7 1l1.5 4H13l-3.6 2.6 1.4 4.4L7 9.5 3.2 12 4.6 7.6 1 5h4.5L7 1z" />
        </svg>
      ))}
    </div>
  );
}

function UserGlyph() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8.5" r="3.4" />
      <path d="M5 20c1.2-4 4-6 7-6s5.8 2 7 6" />
    </svg>
  );
}

/** Faint hand-drawn doodle background — squiggles, sparkles, leaves. */
function Doodles() {
  const c = "#A9C99A";
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }}
      fill="none"
      stroke={c}
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* wavy ribbon top-left */}
      <path d="M -40 150 C 120 90, 180 220, 320 170 C 440 128, 470 250, 380 300" opacity="0.5" />
      {/* squiggle bottom-right */}
      <path d="M 1480 700 C 1320 760, 1260 630, 1120 690 C 1000 742, 980 620, 1070 575" opacity="0.5" />
      {/* dashed arc top-right */}
      <path d="M 1180 90 C 1280 60, 1360 130, 1340 230" opacity="0.55" strokeDasharray="3 12" />
      {/* spiral left-bottom */}
      <path d="M 150 720 a 26 26 0 1 0 26 -26 a 16 16 0 1 0 -16 16 a 7 7 0 1 0 7 -7" opacity="0.5" />
      {/* sparkles */}
      <g opacity="0.7">
        <path d="M 300 430 v 26 M 287 443 h 26" />
        <path d="M 1130 360 v 20 M 1120 370 h 20" />
        <path d="M 1010 200 v 18 M 1001 209 h 18" />
        <path d="M 470 660 v 18 M 461 669 h 18" />
      </g>
      {/* little leaf top-center */}
      <path d="M 760 70 C 790 50, 830 60, 840 95 C 805 100, 772 96, 760 70 Z" opacity="0.5" />
      {/* dots */}
      <g fill={c} stroke="none" opacity="0.55">
        <circle cx="220" cy="520" r="4" />
        <circle cx="1240" cy="470" r="4" />
        <circle cx="640" cy="800" r="4" />
        <circle cx="900" cy="540" r="4" />
      </g>
    </svg>
  );
}

export default async function ReviewsPage() {
  const reviews = await loadReviews();
  const avg =
    reviews.length > 0
      ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
      : null;

  return (
    <>
      <Navbar />
      <main style={{ background: BG }}>
        {/* ── Submission form, layered over the "feed back" outline backdrop ── */}
        <section
          style={{
            position: "relative",
            overflow: "hidden",
            minHeight: "clamp(660px, 88vh, 880px)",
            paddingTop: "calc(var(--hdr) + clamp(20px, 4vw, 50px))",
            paddingBottom: "clamp(40px, 6vw, 80px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Doodles />
          {/* Eyebrow pinned near the top */}
          <p style={{ position: "absolute", top: "calc(var(--hdr) + clamp(24px, 5vw, 56px))", left: 0, right: 0, zIndex: 2, textAlign: "center", fontFamily: SANS, fontSize: 12, letterSpacing: "2.5px", textTransform: "uppercase", color: "#5a7a4f", margin: 0 }}>
            Loved by home kitchens
          </p>

          {/* Outline "feed" + "back" backdrop — the two words straddle the form card. */}
          <div
            aria-hidden
            className="fb-word"
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: "50%",
              marginBottom: "clamp(60px, 9vw, 150px)",
              textAlign: "center",
              pointerEvents: "none",
              fontFamily: "var(--font-bricolage), system-ui, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(96px, 22vw, 300px)",
              lineHeight: 0.82,
              letterSpacing: "-0.045em",
              color: "transparent",
              WebkitTextStroke: `2px ${GREEN_STROKE}`,
              textTransform: "lowercase",
              userSelect: "none",
            }}
          >
            feed
          </div>
          <div
            aria-hidden
            className="fb-word"
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: "50%",
              marginTop: "clamp(60px, 9vw, 150px)",
              textAlign: "center",
              pointerEvents: "none",
              fontFamily: "var(--font-bricolage), system-ui, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(96px, 22vw, 300px)",
              lineHeight: 0.82,
              letterSpacing: "-0.045em",
              color: "transparent",
              WebkitTextStroke: `2px ${GREEN_STROKE}`,
              textTransform: "lowercase",
              userSelect: "none",
            }}
          >
            back
          </div>

          {/* Form card on top of the backdrop */}
          <div style={{ position: "relative", zIndex: 2, width: "min(460px, 92vw)", padding: "0 clamp(16px, 4vw, 24px)" }}>
            <ReviewForm />
          </div>

          <style>{`
            @media (max-width: 640px) {
              .fb-word { -webkit-text-stroke-width: 1.5px !important; opacity: 0.85; }
            }
          `}</style>
        </section>

        {/* ── Approved reviews ── */}
        <section style={{ position: "relative", overflow: "hidden", padding: "0 clamp(20px, 5vw, 40px) clamp(70px, 10vw, 120px)" }}>
          <Doodles />
          <div style={{ position: "relative", zIndex: 1, maxWidth: 1080, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "clamp(28px, 4vw, 48px)" }}>
              <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(26px, 4vw, 40px)", color: INK, margin: "0 0 12px" }}>
                What people are saying
              </h2>
              {avg && (
                <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#fff", borderRadius: 999, padding: "8px 18px", boxShadow: "0 8px 22px rgba(31,74,51,0.08)" }}>
                  <span style={{ fontFamily: DISPLAY, fontSize: 22, color: INK, fontWeight: 700 }}>{avg}</span>
                  <Stars count={Math.round(Number(avg))} color={ACCENT} />
                  <span style={{ fontFamily: SANS, fontSize: 13, color: "#8a8a7e" }}>· {reviews.length} review{reviews.length === 1 ? "" : "s"}</span>
                </div>
              )}
            </div>

            {reviews.length === 0 ? (
              <div style={{ maxWidth: 520, margin: "0 auto", background: "#fff", borderRadius: 20, padding: "44px 28px", textAlign: "center", boxShadow: "0 16px 40px rgba(20,60,20,0.08)" }}>
                <div style={{ fontSize: 40, marginBottom: 8 }}>🌱</div>
                <p style={{ fontFamily: DISPLAY, fontSize: 24, color: INK, margin: "0 0 6px" }}>No reviews yet</p>
                <p style={{ fontFamily: SANS, fontSize: 14, color: "#5a7a4f", margin: 0 }}>Be the first to share your experience!</p>
              </div>
            ) : (
              <div className="rv-cards">
                {reviews.map((r, i) => (
                  <div key={i} className="rv-card">
                    <div className="rv-heart">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff">
                        <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" />
                      </svg>
                      <div className="rv-heart-tail" />
                    </div>
                    <Stars count={r.rating} color={ACCENT} size={16} />
                    <p style={{ fontFamily: SANS, fontSize: 15.5, lineHeight: 1.55, color: "#1A1A1A", fontWeight: 400, margin: "14px 0 22px" }}>
                      {r.text}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 34, height: 34, borderRadius: "50%", background: ACCENT, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <UserGlyph />
                      </div>
                      <span style={{ fontFamily: SANS, fontWeight: 700, fontSize: 17, color: "#1A1A1A" }}>{r.name}</span>
                      {r.location && <span style={{ fontFamily: SANS, fontSize: 12, color: "#7a8a72" }}>· {r.location}</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <style>{`
            .rv-cards {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
              gap: clamp(36px, 4vw, 48px) clamp(20px, 2.5vw, 32px);
              padding-top: 14px;
            }
            .rv-card {
              position: relative;
              background: #fff;
              border-radius: 20px;
              padding: 26px 30px 28px;
              box-shadow: 0 18px 44px rgba(20,60,20,0.10), 0 5px 12px rgba(20,60,20,0.06);
            }
            .rv-heart {
              position: absolute;
              top: -28px;
              right: 28px;
              width: 58px;
              height: 46px;
              background: ${ACCENT};
              border-radius: 12px 12px 12px 4px;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 10px 20px rgba(79,184,58,0.35);
            }
            .rv-heart-tail {
              position: absolute;
              bottom: -8px;
              left: 8px;
              width: 0;
              height: 0;
              border-left: 9px solid transparent;
              border-right: 9px solid transparent;
              border-top: 9px solid ${ACCENT};
            }
          `}</style>
        </section>
      </main>
      <Footer />
    </>
  );
}
