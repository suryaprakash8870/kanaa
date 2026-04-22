import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OrderConfirmedHero from "@/components/OrderConfirmedHero";
import StatusTimeline, { StatusIcons } from "@/components/StatusTimeline";

export const metadata = { title: "Order received — Kanaa" };

const BG = "#DFF0D8";
const INK = "#1F4A33";
const ACCENT = "#4FB83A";
const CREAM = "#FFF4D8";
const CLAY = "#C0301F";

const HAND = "var(--font-caveat), cursive";
const SERIF = "var(--font-cormorant), Georgia, serif";
const SANS = "var(--font-dm-sans), sans-serif";
const DISPLAY = "var(--font-dm-serif), Georgia, serif";

export default async function Success({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order } = await searchParams;
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
            position: "relative",
            zIndex: 1,
            maxWidth: 640,
            margin: "0 auto",
            padding: "0 clamp(20px, 5vw, 60px)",
            textAlign: "center",
          }}
        >
          {/* Hero illustration */}
          <div style={{ marginBottom: 12 }}>
            <OrderConfirmedHero width={520} />
          </div>

          <div
            style={{
              display: "inline-block",
              transform: "rotate(-6deg)",
              border: `3px solid ${ACCENT}`,
              padding: "8px 22px",
              borderRadius: 8,
              color: ACCENT,
              fontFamily: SANS,
              fontWeight: 800,
              fontSize: 20,
              letterSpacing: "4px",
              marginBottom: 20,
              background: "rgba(255,255,255,0.5)",
            }}
          >
            RECEIVED
          </div>

          <div
            style={{
              fontFamily: HAND,
              fontSize: 26,
              color: CLAY,
              transform: "rotate(-2deg)",
              marginBottom: 2,
            }}
          >
            thank you —
          </div>

          <h1
            style={{
              fontFamily: SERIF,
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: "clamp(40px, 6vw, 72px)",
              color: INK,
              margin: 0,
              letterSpacing: "-1.4px",
              lineHeight: 1.0,
            }}
          >
            your jar-box is<br />on our table.
          </h1>

          <p
            style={{
              fontFamily: SANS,
              color: INK,
              opacity: 0.78,
              fontSize: 15,
              lineHeight: 1.7,
              marginTop: 18,
            }}
          >
            We&apos;ve received your payment screenshot and saved your order.
            An admin will match it with our UPI inbox and flip it to{" "}
            <strong style={{ color: ACCENT }}>Paid</strong> —
            usually within 2 working hours.
          </p>

          {order && (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                marginTop: 22,
                padding: "10px 18px",
                background: "#fff",
                border: `1px solid ${INK}1A`,
                borderRadius: 999,
                boxShadow: "0 6px 18px rgba(31,74,51,0.06)",
              }}
            >
              <span
                style={{
                  fontFamily: SANS,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "2.4px",
                  textTransform: "uppercase",
                  color: INK,
                  opacity: 0.6,
                }}
              >
                Order #
              </span>
              <span
                style={{
                  fontFamily: DISPLAY,
                  fontSize: 18,
                  color: INK,
                  letterSpacing: "-0.2px",
                }}
              >
                {order}
              </span>
            </div>
          )}

          {/* Pill-card status timeline */}
          <div style={{ marginTop: 36, textAlign: "left" }}>
            <StatusTimeline
              heading="ORDER STATUS"
              currentIndex={1}
              stages={[
                {
                  icon: StatusIcons.receipt,
                  label: "Order",
                  sub: "Received",
                },
                {
                  icon: StatusIcons.box,
                  label: "Order",
                  sub: "Processed",
                },
                {
                  icon: StatusIcons.truck,
                  label: "Package",
                  sub: "Shipped",
                },
                {
                  icon: StatusIcons.home,
                  label: "Package",
                  sub: "Arrived",
                },
              ]}
            />
          </div>

          <div
            style={{
              marginTop: 28,
              display: "flex",
              gap: 14,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/products"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: INK,
                color: CREAM,
                textDecoration: "none",
                padding: "14px 28px",
                borderRadius: 999,
                fontFamily: SANS,
                fontWeight: 800,
                fontSize: 12,
                letterSpacing: "2px",
                textTransform: "uppercase",
                boxShadow: "0 12px 26px rgba(31,74,51,0.22)",
              }}
            >
              Back to the shelf
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
            <Link
              href={order ? `/track?order=${encodeURIComponent(order)}` : "/track"}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: "transparent",
                color: INK,
                textDecoration: "none",
                padding: "14px 26px",
                borderRadius: 999,
                fontFamily: SANS,
                fontWeight: 800,
                fontSize: 12,
                letterSpacing: "2px",
                textTransform: "uppercase",
                border: `1.5px solid ${INK}`,
              }}
            >
              Track this order
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
            </Link>
          </div>

          <p
            style={{
              marginTop: 22,
              fontFamily: HAND,
              fontSize: 22,
              color: INK,
              opacity: 0.75,
              transform: "rotate(-1deg)",
            }}
          >
            with love, from Erode ✦
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
