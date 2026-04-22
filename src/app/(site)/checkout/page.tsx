import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CheckoutForm from "@/components/CheckoutForm";

export const metadata = { title: "Checkout — Kanaa" };

const BG = "#DFF0D8";
const INK = "#1F4A33";
const ACCENT = "#4FB83A";
const CLAY = "#C0301F";

const HAND = "var(--font-caveat), cursive";
const SERIF = "var(--font-cormorant), Georgia, serif";
const SANS = "var(--font-dm-sans), sans-serif";

export default function CheckoutPage() {
  const steps = ["Pack", "Address", "Pay & send"];
  return (
    <>
      <Navbar />
      <main
        style={{
          background: BG,
          minHeight: "100vh",
          paddingTop: "calc(56px + clamp(32px, 4vw, 60px))",
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
            d="M -120 200 C 200 80, 420 380, 280 520 C 140 660, 460 720, 680 580 C 900 440, 1080 640, 940 800 C 800 960, 1140 1020, 1360 860 C 1560 720, 1740 940, 1760 820"
            fill="none"
            stroke={INK}
            strokeOpacity="0.45"
            strokeWidth="56"
            strokeLinecap="round"
          />
        </svg>

        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 clamp(20px, 5vw, 60px)",
          }}
        >
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "clamp(28px, 4vw, 44px)" }}>
            <div
              style={{
                fontFamily: HAND,
                fontSize: "clamp(22px, 2.4vw, 28px)",
                color: CLAY,
                transform: "rotate(-2deg)",
                marginBottom: 2,
              }}
            >
              almost out the door —
            </div>
            <h1
              style={{
                fontFamily: SERIF,
                fontStyle: "italic",
                fontWeight: 500,
                fontSize: "clamp(42px, 6vw, 84px)",
                letterSpacing: "-1.5px",
                color: INK,
                margin: 0,
                lineHeight: 1.0,
              }}
            >
              let&apos;s pack your jars.
            </h1>
            <p
              style={{
                fontFamily: SANS,
                color: INK,
                opacity: 0.72,
                fontSize: "clamp(13px, 1.1vw, 15px)",
                marginTop: 14,
                maxWidth: 520,
                marginInline: "auto",
              }}
            >
              Tell us where it&apos;s going — we&apos;ll hand-seal it, slip a note in, and ship it within 48 hours.
            </p>

            {/* Stepper */}
            <div
              style={{
                marginTop: 24,
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 18px",
                background: "#fff",
                borderRadius: 999,
                border: `1px solid ${INK}1A`,
                boxShadow: "0 6px 18px rgba(31,74,51,0.06)",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {steps.map((s, i) => (
                <span
                  key={s}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    fontFamily: SANS,
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: INK,
                    opacity: i === 0 ? 1 : 0.55,
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 20,
                      height: 20,
                      borderRadius: 999,
                      background: i === 0 ? ACCENT : "transparent",
                      border: i === 0 ? "none" : `1.5px solid ${INK}55`,
                      color: i === 0 ? "#fff" : INK,
                      fontSize: 10,
                    }}
                  >
                    {i + 1}
                  </span>
                  {s}
                  {i < steps.length - 1 && (
                    <span
                      aria-hidden
                      style={{
                        width: 18,
                        height: 1,
                        background: `${INK}33`,
                        display: "inline-block",
                        marginLeft: 4,
                      }}
                    />
                  )}
                </span>
              ))}
            </div>
          </div>

          <CheckoutForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
