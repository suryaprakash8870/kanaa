"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const reviews = [
  {
    name: "Meera Krishnan",
    rating: 4,
    text: "I really appreciate how authentic Kanaa pickles taste. The mango is sun-cured properly, the oil is cold-pressed, and you can taste the love in every spoon.",
  },
  {
    name: "Arjun Sathyamurthy",
    rating: 5,
    text: "Finally a brand that doesn't lie about 'no preservatives.' Fresh, clean, vibrant — and they ship fast. Already on my fourth jar this quarter.",
  },
  {
    name: "Priya Nandakumar",
    rating: 5,
    text: "The Lime & Ginger is unlike anything I've tried. Aged 30 days in terracotta — you can actually taste the depth. Goes with everything.",
  },
  {
    name: "Karthik Raman",
    rating: 4,
    text: "Tastes exactly like my grandmother's recipe from Madurai. Every spoonful brings back childhood memories.",
  },
  {
    name: "Lakshmi Iyer",
    rating: 5,
    text: "Bold, balanced and beautifully spiced. Kanaa has earned a permanent spot on our dinner table.",
  },
];

const BG = "#DFF0D8";
const GREEN = "#4FB83A";
const GREEN_STROKE = "#6CC74F";
const STAR_EMPTY = "#D6D6D6";
const INK = "#1A1A1A";

// Slot layout — same pattern as ProductSpotlight.
// 5 slots: far-offscreen-left, left, center, right, far-offscreen-right.
const SLOT_POS = [-40, 14, 50, 86, 140]; // percent (center of card)
const SLOT_SCALES = [0.7, 0.85, 1, 0.85, 0.7];
const SLOT_OPACITY = [0, 1, 1, 1, 0];

function Stars({ count, max = 5 }: { count: number; max?: number }) {
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {Array.from({ length: max }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 14 14" fill={i < count ? GREEN : STAR_EMPTY}>
          <path d="M7 1l1.5 4H13l-3.6 2.6 1.4 4.4L7 9.5 3.2 12 4.6 7.6 1 5h4.5L7 1z" />
        </svg>
      ))}
    </div>
  );
}

function UserGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
      <circle cx="12" cy="8.5" r="3.6" />
      <path d="M4.5 20c1.2-4 4-6 7.5-6s6.3 2 7.5 6" />
    </svg>
  );
}

export default function Testimonials() {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const animating = useRef(false);
  const total = reviews.length;
  const mod = (n: number) => ((n % total) + total) % total;

  const go = (d: 1 | -1) => {
    if (animating.current) return;
    animating.current = true;
    setDir(d);
    setIdx((p) => mod(p + d));
    setTimeout(() => (animating.current = false), 720);
  };

  const windowReviews = [-2, -1, 0, 1, 2].map((o) => reviews[mod(idx + o)]);

  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="reviews"
      ref={sectionRef}
      style={{
        position: "relative",
        background: BG,
        padding: "clamp(90px, 12vw, 150px) 0",
        overflow: "hidden",
        minHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* Doodle continuation from the Process section */}
      <FeedbackDoodle sectionRef={sectionRef} />
      {/* Outline "feed / back" backdrop */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <div
          className="fb-backdrop"
          style={{
            fontFamily: "var(--font-bricolage), system-ui, sans-serif",
            fontWeight: 800,
            fontSize: "clamp(88px, 22vw, 360px)",
            lineHeight: 0.86,
            letterSpacing: "-0.045em",
            textAlign: "center",
            color: "transparent",
            WebkitTextStroke: `2px ${GREEN_STROKE}`,
            textTransform: "lowercase",
            userSelect: "none",
            opacity: 1,
          }}
        >
          feed
          <br />
          back
        </div>
      </div>

      {/* Carousel band */}
      <div
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("a, button")) return;
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          go(x < rect.width / 2 ? -1 : 1);
        }}
        style={{
          position: "relative",
          width: "100%",
          height: "clamp(300px, 34vw, 380px)",
          cursor: "pointer",
          zIndex: 2,
        }}
      >
        {windowReviews.map((r, slotIdx) => {
          const targetX = SLOT_POS[slotIdx];
          const targetScale = SLOT_SCALES[slotIdx];
          const targetOpacity = SLOT_OPACITY[slotIdx];
          const isCenter = slotIdx === 2;

          const prevSlot = slotIdx + dir;
          const fromX = SLOT_POS[prevSlot] ?? SLOT_POS[slotIdx] + dir * 50;
          const fromScale = SLOT_SCALES[prevSlot] ?? 0.6;
          const fromOpacity = SLOT_OPACITY[prevSlot] ?? 0;

          return (
            <motion.div
              key={`${r.name}-${slotIdx}`}
              initial={{ left: `${fromX}%`, y: "-50%", scale: fromScale, opacity: fromOpacity }}
              animate={{ left: `${targetX}%`, y: "-50%", scale: targetScale, opacity: targetOpacity }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: "absolute",
                top: "50%",
                width: "min(560px, 88vw)",
                marginLeft: "calc(min(560px, 88vw) / -2)",
                zIndex: isCenter ? 3 : 1,
                pointerEvents: isCenter ? "auto" : "none",
              }}
            >
              <Card review={r} dim={!isCenter} />
            </motion.div>
          );
        })}
      </div>

      {/* Arrow controls at the bottom of the section */}
      <div
        style={{
          position: "relative",
          marginTop: "clamp(40px, 6vw, 72px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          zIndex: 4,
        }}
      >
        <button aria-label="Previous review" onClick={() => go(-1)} style={navBtn}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <span
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontWeight: 600,
            fontSize: 13,
            color: "#3A5F32",
            minWidth: 52,
            textAlign: "center",
            fontVariantNumeric: "tabular-nums",
            letterSpacing: "0.5px",
          }}
        >
          {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <button aria-label="Next review" onClick={() => go(1)} style={navBtn}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .fb-backdrop {
            opacity: 0.55 !important;
            -webkit-text-stroke-width: 1.5px !important;
          }
        }
      `}</style>
    </section>
  );
}

function Card({ review, dim }: { review: (typeof reviews)[number]; dim: boolean }) {
  return (
    <div
      style={{
        position: "relative",
        background: "#fff",
        borderRadius: 20,
        padding: "26px 30px 28px",
        boxShadow: dim
          ? "0 10px 24px rgba(20, 60, 20, 0.08)"
          : "0 24px 50px rgba(20, 60, 20, 0.14), 0 6px 14px rgba(20, 60, 20, 0.08)",
      }}
    >
      {/* Heart bubble */}
      <div
        style={{
          position: "absolute",
          top: -28,
          right: 28,
          background: GREEN,
          borderRadius: "12px 12px 12px 4px",
          width: 58,
          height: 46,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 10px 20px rgba(79, 184, 58, 0.35)",
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff">
          <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" />
        </svg>
        <div
          style={{
            position: "absolute",
            bottom: -8,
            left: 8,
            width: 0,
            height: 0,
            borderLeft: "9px solid transparent",
            borderRight: "9px solid transparent",
            borderTop: `9px solid ${GREEN}`,
          }}
        />
      </div>

      <Stars count={review.rating} />

      <p
        style={{
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: 15.5,
          lineHeight: 1.55,
          color: INK,
          margin: "14px 0 22px",
          fontWeight: 400,
        }}
      >
        {review.text}
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            background: GREEN,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <UserGlyph />
        </div>
        <span
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontWeight: 700,
            fontSize: 17,
            color: INK,
          }}
        >
          {review.name}
        </span>
      </div>
    </div>
  );
}

const navBtn: React.CSSProperties = {
  width: 40,
  height: 40,
  borderRadius: 999,
  background: GREEN,
  border: "none",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  boxShadow: "0 6px 14px rgba(79, 184, 58, 0.35)",
};

function FeedbackDoodle({ sectionRef }: { sectionRef: React.RefObject<HTMLElement | null> }) {
  // Continuation of the squiggle from the Process section.
  // Enters top-right (matching where Process path ended) and winds down & off bottom-left.
  const stroke = "#1F4A33";

  const { scrollYProgress } = useScroll({
    target: sectionRef as React.RefObject<HTMLElement>,
    offset: ["start end", "end start"],
  });
  const smoothed = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });
  const pathLength = useTransform(smoothed, [0.05, 0.9], [0, 1]);

  const d =
    "M 500 -100 C 500 40, 520 120, 620 240 C 760 400, 540 560, 380 700 C 220 840, 480 1020, 640 1180 C 820 1360, 540 1520, 360 1680 C 180 1840, 400 2000, 260 2160 C 140 2300, -40 2360, -160 2400";

  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <svg
        viewBox="0 0 1000 2400"
        preserveAspectRatio="xMidYMid slice"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <path
          d={d}
          fill="none"
          stroke={stroke}
          strokeOpacity="0.06"
          strokeWidth="90"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <motion.path
          d={d}
          fill="none"
          stroke={stroke}
          strokeOpacity="0.18"
          strokeWidth="90"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ pathLength }}
        />
      </svg>
    </div>
  );
}
