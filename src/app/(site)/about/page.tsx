import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "About Kanaa — Homemade Healthy Food",
  description:
    "Kanaa is a homemade healthy food brand making nutritious eating simple, comforting, and accessible — wholesome ingredients and traditional South Indian food wisdom for modern lifestyles.",
};

const INK = "#1F4A33";
const CREAM = "#FAF7F2";
const MINT = "#DFF0D8";
const ACCENT = "#4FB83A";
const GOLD = "#C9A24A";

const paragraphs = [
  "Welcome to Kanaa — a homemade healthy food brand created to make nutritious eating simple, comforting, and accessible for modern lifestyles.",
  "At Kanaa, we believe healthy food should never feel boring, complicated, or time-consuming. Our products are thoughtfully crafted using wholesome ingredients and traditional food wisdom to deliver taste, convenience, and nourishment in every serving.",
  "From ready-to-eat food mixes and 5-minute soup blends to healthy snacks, every product is designed for people who want quick meals without compromising on health or flavour.",
  "Rooted in homemade goodness and inspired by traditional South Indian food culture, Kanaa combines authenticity with modern convenience — helping you enjoy healthier everyday eating, wherever life takes you.",
];

const values = [
  { k: "Healthy", v: "Wholesome ingredients, never compromised" },
  { k: "Simple", v: "Quick to prepare, made for busy days" },
  { k: "Comforting", v: "Familiar flavours that feel like home" },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div style={{ height: "var(--hdr)" }} />

      <main style={{ background: CREAM, minHeight: "100vh" }}>
        {/* ── MASTHEAD ── */}
        <div
          style={{
            background: INK,
            padding:
              "clamp(56px,9vw,120px) clamp(20px,6vw,88px) clamp(56px,8vw,110px)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Concentric ring ornaments */}
          {([520, 760, 1000] as number[]).map((size) => (
            <div
              key={size}
              aria-hidden
              style={{
                position: "absolute",
                right: -size * 0.22,
                top: "50%",
                transform: "translateY(-50%)",
                width: size,
                height: size,
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.05)",
                pointerEvents: "none",
              }}
            />
          ))}

          <div style={{ maxWidth: 880, margin: "0 auto", position: "relative" }}>
            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "5px",
                color: "#A8D5B5",
                textTransform: "uppercase",
                marginBottom: 20,
              }}
            >
              About Kanaa
            </p>
            <h1
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(44px,8vw,104px)",
                color: CREAM,
                margin: 0,
                lineHeight: 0.92,
                letterSpacing: "-2px",
              }}
            >
              Homemade health,
              <br />
              made simple.
            </h1>
            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "clamp(15px,1.5vw,18px)",
                color: "rgba(250,247,242,0.7)",
                maxWidth: 560,
                lineHeight: 1.75,
                margin: "26px 0 0",
              }}
            >
              {paragraphs[0]}
            </p>
          </div>
        </div>

        {/* ── BODY ── */}
        <div
          style={{
            maxWidth: 760,
            margin: "0 auto",
            padding:
              "clamp(48px,7vw,96px) clamp(20px,5vw,40px) clamp(40px,5vw,64px)",
          }}
        >
          {paragraphs.slice(1).map((p, i) => (
            <p
              key={i}
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "clamp(15px,1.3vw,18px)",
                lineHeight: 1.85,
                color: "#3A4A40",
                margin: "0 0 26px",
              }}
            >
              {p}
            </p>
          ))}

          {/* Values row */}
          <div
            className="about-values"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "clamp(16px,2.5vw,28px)",
              marginTop: "clamp(24px,3vw,40px)",
              paddingTop: "clamp(28px,4vw,44px)",
              borderTop: `1px solid ${INK}1A`,
            }}
          >
            {values.map((item) => (
              <div key={item.k}>
                <p
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontStyle: "italic",
                    fontWeight: 600,
                    fontSize: "clamp(24px,3vw,32px)",
                    color: INK,
                    margin: "0 0 8px",
                  }}
                >
                  {item.k}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: 13,
                    lineHeight: 1.6,
                    color: "#3A4A40",
                    opacity: 0.8,
                    margin: 0,
                  }}
                >
                  {item.v}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── CLOSING PLEDGE ── */}
        <div
          style={{
            background: MINT,
            padding: "clamp(56px,8vw,110px) clamp(20px,5vw,40px)",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              width: "min(680px, 80vw)",
              height: "min(680px, 80vw)",
              borderRadius: "50%",
              border: `1px dashed ${INK}22`,
              pointerEvents: "none",
            }}
          />
          <div style={{ position: "relative", maxWidth: 720, margin: "0 auto" }}>
            <h2
              style={{
                fontFamily: "var(--font-fraunces), Georgia, serif",
                fontWeight: 700,
                fontStyle: "italic",
                fontVariationSettings: "'opsz' 144, 'SOFT' 100, 'WONK' 1",
                fontSize: "clamp(36px,6vw,72px)",
                lineHeight: 1.05,
                letterSpacing: "-1px",
                color: INK,
                margin: 0,
              }}
            >
              Healthy. Simple.{" "}
              <span style={{ color: ACCENT }}>Comforting.</span>
            </h2>
            <p
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontStyle: "italic",
                fontSize: "clamp(20px,2.4vw,30px)",
                color: INK,
                opacity: 0.78,
                margin: "16px 0 0",
              }}
            >
              That&apos;s the Kanaa way.
            </p>

            <div
              style={{
                marginTop: "clamp(32px,4vw,48px)",
                display: "flex",
                gap: 14,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Link
                href="/products"
                style={{
                  background: INK,
                  color: CREAM,
                  borderRadius: 999,
                  padding: "15px 34px",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontWeight: 700,
                  fontSize: 13,
                  letterSpacing: "1.2px",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  boxShadow: "0 14px 32px rgba(31,74,51,0.22)",
                }}
              >
                Explore Products
              </Link>
              <Link
                href="/contact"
                style={{
                  background: "transparent",
                  color: INK,
                  border: `1.5px solid ${INK}55`,
                  borderRadius: 999,
                  padding: "15px 30px",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontWeight: 600,
                  fontSize: 13,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  textDecoration: "none",
                }}
              >
                Get in Touch
              </Link>
            </div>
          </div>

          {/* subtle gold seal accent */}
          <span
            aria-hidden
            style={{
              position: "absolute",
              bottom: 24,
              right: "clamp(20px,6vw,80px)",
              fontFamily: "var(--font-caveat), cursive",
              fontSize: 24,
              color: GOLD,
              transform: "rotate(-4deg)",
            }}
          >
            from our kitchen to yours ✦
          </span>
        </div>
      </main>

      <Footer />

      <style>{`
        @media (max-width: 600px) {
          .about-values { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
      `}</style>
    </>
  );
}
