import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Recipes — Simple Recipes with Traditional Flavours | Kanaa",
  description:
    "Discover easy and comforting recipes made using Kanaa products — created to make healthy everyday cooking simple, flavourful, and enjoyable.",
};

const INK = "#1F4A33";
const CREAM = "#FAF7F2";
const MINT = "#DFF0D8";
const ACCENT = "#4FB83A";
const GOLD = "#C9A24A";

export default function RecipesPage() {
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
          {([520, 760, 1000] as number[]).map((size) => (
            <div
              key={size}
              aria-hidden
              style={{
                position: "absolute",
                left: -size * 0.2,
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

          <div
            style={{
              maxWidth: 820,
              margin: "0 auto",
              position: "relative",
              textAlign: "center",
            }}
          >
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
              Kanaa Recipes
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
              Simple recipes,
              <br />
              traditional flavours.
            </h1>
            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "clamp(15px,1.5vw,18px)",
                color: "rgba(250,247,242,0.7)",
                maxWidth: 560,
                lineHeight: 1.75,
                margin: "26px auto 0",
              }}
            >
              Discover easy and comforting recipes made using Kanaa products —
              created to make healthy everyday cooking simple, flavourful, and
              enjoyable.
            </p>
          </div>
        </div>

        {/* ── COMING SOON STATE ── */}
        <div
          style={{
            maxWidth: 720,
            margin: "0 auto",
            padding: "clamp(56px,9vw,120px) clamp(20px,5vw,40px)",
            textAlign: "center",
          }}
        >
          <div
            aria-hidden
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: MINT,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 24,
            }}
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke={INK}
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 11h18M5 11a7 7 0 0 1 14 0M5 11v3a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3v-3M9 4V2M12 4V2M15 4V2M4 21h16" />
            </svg>
          </div>

          <h2
            style={{
              fontFamily: "var(--font-fraunces), Georgia, serif",
              fontWeight: 700,
              fontStyle: "italic",
              fontVariationSettings: "'opsz' 144, 'SOFT' 100, 'WONK' 1",
              fontSize: "clamp(28px,4vw,44px)",
              lineHeight: 1.1,
              letterSpacing: "-1px",
              color: INK,
              margin: "0 0 14px",
            }}
          >
            Our recipe book is simmering.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "clamp(14px,1.2vw,16px)",
              lineHeight: 1.75,
              color: "#4A3728",
              opacity: 0.8,
              maxWidth: 520,
              margin: "0 auto 32px",
            }}
          >
            We&apos;re writing up quick, comforting recipes built around Kanaa
            thokkus, kulambu mixes, soups, and snacks. In the meantime, explore the
            range or read along on the journal.
          </p>

          <div
            style={{
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
              href="/blog"
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
              Read the Journal
            </Link>
          </div>

          <p
            style={{
              fontFamily: "var(--font-caveat), cursive",
              fontSize: 24,
              color: GOLD,
              marginTop: 40,
              transform: "rotate(-2deg)",
            }}
          >
            good food, coming soon ✦
          </p>
        </div>

        {/* accent strip */}
        <div
          aria-hidden
          style={{ height: 6, background: ACCENT, opacity: 0.85 }}
        />
      </main>

      <Footer />
    </>
  );
}
