"use client";

import { useState } from "react";
import { View } from "@react-three/drei";
import ShowcaseScene from "./showcase/ShowcaseScene";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const FLAVORS = [
  {
    name: "Tomato Chutney",
    desc: "Allow us to introduce you to your dosa's new best friend.",
    accent: "#D94862",
  },
  {
    name: "Vatha Kolambu",
    desc: "The rice-mix classic — sun-dried turkey berry, garlic & fenugreek.",
    accent: "#A55214",
  },
  {
    name: "Sour Spinach",
    desc: "Fresh sour-spinach leaves in cold-pressed gingelly. A green everyday hero.",
    accent: "#3D5A2D",
  },
  {
    name: "Veldt Grape",
    desc: "Pirandai, tamarind & jaggery — the ancestral chutney grandmother used to stir.",
    accent: "#5F3D8A",
  },
];

export default function ProductShowcase() {
  const [idx, setIdx] = useState(0);
  const isDesktop = useMediaQuery("(min-width: 768px)", true);

  const prevIdx = (idx - 1 + FLAVORS.length) % FLAVORS.length;
  const nextIdx = (idx + 1) % FLAVORS.length;
  const current = FLAVORS[idx];

  const go = (dir: 1 | -1) => {
    setIdx((i) => (i + dir + FLAVORS.length) % FLAVORS.length);
  };

  return (
    <section
      style={{
        position: "relative",
        padding: "clamp(80px, 10vw, 140px) clamp(20px, 5vw, 80px)",
        background: "#FFF4D8",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>
        <h2
          style={{
            fontFamily: "var(--font-playfair), serif",
            fontWeight: 700,
            fontSize: "clamp(32px, 5vw, 60px)",
            color: current.accent,
            lineHeight: 1.08,
            textAlign: "center",
            letterSpacing: "-1px",
            margin: 0,
            marginBottom: "clamp(40px, 5vw, 72px)",
            transition: "color 0.6s ease",
          }}
        >
          Not your average pickles —<br />
          rooted in tradition.
        </h2>

        {/* Single View housing 3 jars */}
        <View
          style={{
            width: "100%",
            height: isDesktop ? 420 : 300,
            pointerEvents: "none",
          }}
        >
          <ShowcaseScene
            prevIdx={prevIdx}
            currentIdx={idx}
            nextIdx={nextIdx}
          />
        </View>

        {/* Info + Controls */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            marginTop: "clamp(24px, 4vw, 40px)",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontWeight: 700,
              fontSize: "clamp(22px, 2.6vw, 30px)",
              color: current.accent,
              margin: 0,
              letterSpacing: "-0.3px",
              transition: "color 0.5s ease",
            }}
          >
            {current.name}
          </p>
          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "clamp(14px, 1.1vw, 16px)",
              color: "#8A3A2A",
              opacity: 0.8,
              maxWidth: 440,
              lineHeight: 1.55,
              margin: 0,
            }}
          >
            {current.desc}
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 22,
              marginTop: 22,
            }}
          >
            <ArrowBtn dir="left" onClick={() => go(-1)} color={current.accent} />
            <button
              style={{
                background: current.accent,
                color: "#FFF4D8",
                border: "none",
                borderRadius: 100,
                padding: "14px 34px",
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontWeight: 600,
                fontSize: 13,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: `0 10px 24px ${current.accent}40`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = `0 14px 32px ${current.accent}55`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = `0 10px 24px ${current.accent}40`;
              }}
            >
              View Product
            </button>
            <ArrowBtn dir="right" onClick={() => go(1)} color={current.accent} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ArrowBtn({
  dir,
  onClick,
  color,
}: {
  dir: "left" | "right";
  onClick: () => void;
  color: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={dir === "left" ? "Previous" : "Next"}
      style={{
        width: 46,
        height: 46,
        borderRadius: "50%",
        background: color,
        color: "#FFF4D8",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.3s ease",
        boxShadow: `0 6px 16px ${color}40`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ transform: dir === "right" ? "scaleX(-1)" : "none" }}
      >
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
      </svg>
    </button>
  );
}
