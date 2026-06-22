"use client";

import { useEffect, useRef, useState } from "react";

export type Offer = {
  icon: string;
  text: string;
  cta: string;
  ctaUrl?: string;
  imageUrl?: string;
};

const GREEN = "#1F4A33";
const CREAM = "#FFF4D8";
const GOLD = "#E5B43A";

export default function OfferBannerClient({ offers }: { offers: Offer[] }) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = offers.length;
  if (total === 0) return null;
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx((p) => (p + 1) % total), 4000);
    return () => clearInterval(t);
  }, [paused, total]);

  const go = (dir: 1 | -1) => setIdx((p) => (p + dir + total) % total);

  const o = offers[idx];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        position: "fixed",
        top: 56,
        left: 0,
        right: 0,
        zIndex: 45,
        background: GREEN,
        color: CREAM,
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        padding: "0 12px",
        fontFamily: "var(--font-dm-sans), sans-serif",
        fontSize: 13,
        fontWeight: 500,
        borderBottom: `1px solid rgba(255,244,216,0.12)`,
        overflow: "hidden",
      }}
    >
      <button
        aria-label="Previous offer"
        onClick={() => go(-1)}
        style={btnStyle}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={CREAM} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <div
        ref={trackRef}
        style={{
          flex: "0 1 auto",
          minWidth: 0,
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          gap: 10,
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
        }}
      >
        {o.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={o.imageUrl}
            alt=""
            aria-hidden
            style={{
              width: 40,
              height: 40,
              borderRadius: 8,
              objectFit: "cover",
              flexShrink: 0,
              border: "1px solid rgba(255,244,216,0.25)",
            }}
          />
        ) : (
          <span aria-hidden style={{ fontSize: 18, lineHeight: 1 }}>{o.icon}</span>
        )}
        <span
          key={idx}
          style={{
            display: "inline-block",
            animation: "obSlide 0.45s ease",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {o.text}
        </span>
        <a
          href={o.ctaUrl ?? "#products"}
          style={{
            color: GOLD,
            fontWeight: 700,
            textDecoration: "underline",
            textUnderlineOffset: 3,
            marginLeft: 4,
          }}
        >
          {o.cta} →
        </a>
      </div>

      <button
        aria-label="Next offer"
        onClick={() => go(1)}
        style={btnStyle}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={CREAM} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>

      <span
        style={{
          fontSize: 11,
          opacity: 0.7,
          marginLeft: 4,
          minWidth: 28,
          textAlign: "right",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {idx + 1}/{total}
      </span>

      <style>{`
        @keyframes obSlide {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 560px) {
          .ob-cta { display: none; }
        }
      `}</style>
    </div>
  );
}

const btnStyle: React.CSSProperties = {
  width: 26,
  height: 26,
  borderRadius: 8,
  background: "rgba(255,244,216,0.12)",
  border: "none",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  flexShrink: 0,
};
