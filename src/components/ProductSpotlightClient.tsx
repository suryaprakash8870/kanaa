"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export type SpotlightProduct = {
  id: string;
  name: string;
  slug: string;
  tagline?: string;
  color: string;
  image?: string;
};

const CREAM = "#DFF0D8";
const ORANGE = "#1F4A33";

// Slot layout (percent of viewport width, measured to slot CENTER).
// The track renders 5 slots: far-left, left, center, right, far-right.
// Outer slots sit off-screen so they bleed in during the slide.
const SLOT_POS = [-40, 12, 50, 88, 140]; // %
const SLOT_SCALES = [0.5, 0.62, 1, 0.62, 0.5];
const SLOT_OPACITY = [0, 0.95, 1, 0.95, 0];

export default function ProductSpotlightClient({ products }: { products: SpotlightProduct[] }) {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const animating = useRef(false);

  if (products.length === 0) return null;
  const total = products.length;
  const mod = (n: number) => ((n % total) + total) % total;

  const go = (d: 1 | -1) => {
    if (animating.current) return;
    animating.current = true;
    setDir(d);
    setIdx((p) => mod(p + d));
    // Match the transition duration below (0.75s) + a small buffer
    setTimeout(() => (animating.current = false), 780);
  };

  const active = products[idx];
  // The 5 products currently represented in the slots (centered on active idx)
  const windowProducts = [-2, -1, 0, 1, 2].map((o) => products[mod(idx + o)]);

  return (
    <section
      className="ps-section"
      style={{
        position: "relative",
        background: CREAM,
        padding: "clamp(32px, 4vw, 56px) 0 clamp(28px, 3.5vw, 48px)",
        overflow: "hidden",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <h2
        className="ps-heading"
        style={{
          fontFamily: "var(--font-fraunces), Georgia, serif",
          fontWeight: 900,
          fontStyle: "italic",
          fontSize: "clamp(22px, 3.4vw, 44px)",
          fontVariationSettings: "'opsz' 144, 'SOFT' 100, 'WONK' 1",
          color: ORANGE,
          letterSpacing: "-0.8px",
          lineHeight: 1.08,
          maxWidth: 820,
          margin: "0 auto clamp(16px, 2.2vw, 28px)",
          padding: "0 20px",
        }}
      >
        Not so average pantry staples
        <br />
        and entertaining essentials
      </h2>

      {/* Carousel band */}
      <div
        className="ps-band"
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("a, button")) return;
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          go(x < rect.width / 2 ? -1 : 1);
        }}
        style={{
          position: "relative",
          width: "100%",
          flex: "1 1 auto",
          minHeight: "clamp(220px, 30vw, 340px)",
          maxHeight: "46vh",
          cursor: "pointer",
        }}
      >
        {/* Background flourish (cross-fades with product change) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`bg-${active.id}`}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
              zIndex: 0,
            }}
          >
            <BackgroundArt index={idx} />
          </motion.div>
        </AnimatePresence>

        {/* Shelf shadow */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: "50%",
            bottom: "12%",
            transform: "translateX(-50%)",
            width: "clamp(180px, 22vw, 280px)",
            height: 26,
            background:
              "radial-gradient(ellipse at center, rgba(60,30,10,0.28) 0%, rgba(60,30,10,0.12) 40%, transparent 72%)",
            filter: "blur(12px)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        {/* Sliding jars — each jar is absolutely positioned and animates from its previous
            slot to its new slot when idx changes. The keys stay stable per product so
            Framer Motion tweens position/scale between renders instead of mounting new nodes. */}
        {windowProducts.map((p, slotIdx) => {
          const targetX = SLOT_POS[slotIdx];
          const targetScale = SLOT_SCALES[slotIdx];
          const targetOpacity = SLOT_OPACITY[slotIdx];
          const isCenter = slotIdx === 2;

          // Where this same product sat on the previous render (so the motion
          // starts from the correct neighbouring slot).
          // When dir=1 (next): each jar just moved one slot to the LEFT, so previous
          // slot = slotIdx + 1. When dir=-1: previous slot = slotIdx - 1.
          const prevSlot = slotIdx + dir;
          const fromX = SLOT_POS[prevSlot] ?? SLOT_POS[slotIdx] + dir * 50;
          const fromScale = SLOT_SCALES[prevSlot] ?? 0.4;
          const fromOpacity = SLOT_OPACITY[prevSlot] ?? 0;

          return (
            <motion.div
              key={`${p.id}-${slotIdx}`}
              initial={{
                left: `${fromX}%`,
                scale: fromScale,
                opacity: fromOpacity,
              }}
              animate={{
                left: `${targetX}%`,
                scale: targetScale,
                opacity: targetOpacity,
              }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="ps-jar"
              style={{
                position: "absolute",
                top: "50%",
                width: "clamp(180px, 22vw, 280px)",
                height: "clamp(220px, 28vw, 340px)",
                marginLeft: "calc(clamp(180px, 22vw, 280px) / -2)",
                marginTop: "calc(clamp(220px, 28vw, 340px) / -2)",
                zIndex: isCenter ? 3 : 1,
                filter: isCenter
                  ? "drop-shadow(0 30px 48px rgba(40,15,5,0.28))"
                  : "drop-shadow(0 18px 30px rgba(40,15,5,0.18))",
                pointerEvents: isCenter ? "auto" : "none",
              }}
            >
              <Jar product={p} />
            </motion.div>
          );
        })}
      </div>

      {/* Copy */}
      <div className="ps-copy" style={{ position: "relative", marginTop: "clamp(12px, 2vw, 22px)", minHeight: 70, zIndex: 4 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={`copy-${active.id}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ color: ORANGE, maxWidth: 480, margin: "0 auto", padding: "0 20px" }}
          >
            <h3
              style={{
                fontFamily: "var(--font-fraunces), Georgia, serif",
                fontWeight: 700,
                fontStyle: "italic",
                fontVariationSettings: "'opsz' 144, 'SOFT' 100",
                fontSize: "clamp(18px, 2vw, 24px)",
                letterSpacing: "-0.3px",
                margin: 0,
              }}
            >
              {active.name}
            </h3>
            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: 13,
                lineHeight: 1.5,
                marginTop: 6,
                opacity: 0.9,
              }}
            >
              {active.tagline ?? "A small-batch favourite — one spoonful and you'll know."}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* View Product button (centered) */}
      <div
        style={{
          position: "relative",
          marginTop: "clamp(10px, 1.6vw, 18px)",
          display: "flex",
          justifyContent: "center",
          zIndex: 4,
        }}
      >
        <Link
          href={`/products/${active.slug}`}
          style={{
            background: ORANGE,
            color: CREAM,
            padding: "11px 30px",
            borderRadius: 999,
            textDecoration: "none",
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontWeight: 700,
            fontSize: 11,
            letterSpacing: 2.2,
            textTransform: "uppercase",
            boxShadow: `0 14px 30px ${ORANGE}55, 0 4px 10px rgba(31,74,51,0.35)`,
          }}
        >
          View Product
        </Link>
      </div>

      {/* Arrow controls — anchored to the bottom of the section */}
      <div
        style={{
          position: "relative",
          marginTop: "clamp(16px, 2.4vw, 28px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 14,
          zIndex: 4,
        }}
      >
        <button onClick={() => go(-1)} aria-label="Previous product" style={navBtn}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={CREAM} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <span
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontWeight: 600,
            fontSize: 13,
            color: ORANGE,
            minWidth: 52,
            textAlign: "center",
            fontVariantNumeric: "tabular-nums",
            letterSpacing: "0.5px",
          }}
        >
          {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <button onClick={() => go(1)} aria-label="Next product" style={navBtn}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={CREAM} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>

      <style>{`
        /* Tablet */
        @media (max-width: 900px) {
          .ps-section { min-height: auto; padding: 36px 0 32px; }
          .ps-band { min-height: 260px; max-height: 42vh; }
        }
        /* Mobile */
        @media (max-width: 600px) {
          .ps-section { min-height: auto; padding: 28px 0 28px; }
          .ps-heading {
            font-size: clamp(20px, 6vw, 26px) !important;
            letter-spacing: -0.4px !important;
            margin-bottom: 12px !important;
          }
          .ps-band {
            min-height: 240px !important;
            max-height: 56vh !important;
          }
          .ps-jar {
            width: clamp(150px, 50vw, 200px) !important;
            height: clamp(190px, 62vw, 260px) !important;
            margin-left: calc(clamp(150px, 50vw, 200px) / -2) !important;
            margin-top: calc(clamp(190px, 62vw, 260px) / -2) !important;
          }
          .ps-copy { min-height: 60px; }
        }
      `}</style>
    </section>
  );
}

function Jar({ product }: { product: SpotlightProduct }) {
  if (product.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={product.image}
        alt={product.name}
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />
    );
  }
  return (
    <svg viewBox="0 0 200 320" style={{ width: "100%", height: "100%" }} aria-label={product.name}>
      <defs>
        <linearGradient id={`gloss-${product.id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0.35" />
          <stop offset="0.4" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="46" y="12" width="108" height="42" rx="6" fill="#1B1B1B" />
      <path d="M40 60 L160 60 L160 296 Q160 308 148 308 L52 308 Q40 308 40 296 Z" fill={product.color} />
      <rect x="52" y="120" width="96" height="120" rx="4" fill={CREAM} />
      <text x="100" y="180" textAnchor="middle" fontFamily="var(--font-dm-serif), serif" fontSize="20" fill={product.color}>
        {product.name.split(" ")[0]}
      </text>
      <text x="100" y="208" textAnchor="middle" fontFamily="var(--font-dm-sans), sans-serif" fontSize="9" letterSpacing="2" fill={product.color} opacity="0.7">
        SMALL BATCH
      </text>
      <rect x="40" y="60" width="40" height="248" fill={`url(#gloss-${product.id})`} />
    </svg>
  );
}

function BackgroundArt({ index }: { index: number }) {
  const tint = "rgba(31, 74, 51, 0.28)";
  const set = index % 3;
  const W = "clamp(380px, 42vw, 580px)";
  return (
    <svg viewBox="0 0 600 500" style={{ width: W, height: "auto" }} fill="none" stroke={tint} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {set === 0 && (
        <>
          <g transform="translate(80 140) rotate(-18)">
            <path d="M0 0 C 20 20, 28 80, 8 120 C -6 140, -22 132, -20 110 C -18 80, -10 40, 0 0 Z" />
            <path d="M0 0 C 6 -10, 18 -14, 32 -8" />
          </g>
          <g transform="translate(500 360) rotate(20)">
            <path d="M0 0 C 22 22, 30 86, 6 128 C -8 148, -26 138, -22 116 C -18 84, -10 42, 0 0 Z" />
            <path d="M0 0 C 8 -12, 22 -16, 36 -10" />
          </g>
          <g transform="translate(120 360)">
            <path d="M0 0 L0 90" />
            <ellipse cx="-14" cy="30" rx="14" ry="5" transform="rotate(-30 -14 30)" />
            <ellipse cx="16" cy="50" rx="14" ry="5" transform="rotate(30 16 50)" />
          </g>
        </>
      )}
      {set === 1 && (
        <>
          <g transform="translate(100 180)">
            <circle cx="0" cy="0" r="46" />
            <path d="M-46 0 A46 46 0 0 1 46 0" />
            <path d="M0 -46 L0 46" />
            <path d="M-32 -32 L32 32" />
          </g>
          <g transform="translate(500 330)">
            <circle cx="0" cy="0" r="52" />
            <path d="M0 -52 C 12 -30, 12 30, 0 52" />
            <path d="M-52 0 C -30 -12, 30 -12, 52 0" />
          </g>
          <g transform="translate(140 380)">
            <ellipse cx="0" cy="0" rx="22" ry="8" />
            <path d="M-22 0 C -10 -6, 10 -6, 22 0" />
          </g>
        </>
      )}
      {set === 2 && (
        <>
          <g transform="translate(110 160) rotate(-12)">
            <path d="M0 0 C -30 40, -30 120, 0 160 C 30 120, 30 40, 0 0 Z" />
            <path d="M0 10 L0 150" />
          </g>
          <g transform="translate(490 340) rotate(18)">
            <rect x="-18" y="0" width="36" height="80" rx="6" />
            <rect x="-10" y="-20" width="20" height="22" rx="3" />
            <path d="M-14 30 L14 30" />
          </g>
          <g transform="translate(150 380)">
            <path d="M0 0 C 14 -10, 34 -10, 48 0" />
            <circle cx="8" cy="-4" r="2" fill={tint} stroke="none" />
            <circle cx="24" cy="-8" r="2" fill={tint} stroke="none" />
            <circle cx="40" cy="-4" r="2" fill={tint} stroke="none" />
          </g>
        </>
      )}
    </svg>
  );
}

const navBtn: React.CSSProperties = {
  width: 38,
  height: 38,
  borderRadius: "50%",
  background: ORANGE,
  border: "none",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: `0 10px 24px ${ORANGE}55`,
};
