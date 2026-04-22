"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const CREAM = "#FFF4D8";
const YELLOW = "#F5C03A";
const GREEN_DARK = "#1F4A33";

const MARQUEE = [
  "Pantry heroes",
  "Thoughtfully-sourced ingredients",
  "Bold, modern classics",
  "Flavours that pop",
  "Crafted with care",
  "Rooted from the nature",
];

const HERO_IMG = "/hero-bg.jpg";

export default function HeroSimple() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hs-headline > span", {
        y: 80, opacity: 0, duration: 1, stagger: 0.12, ease: "power3.out", delay: 0.25,
      });
      gsap.from(".hs-top-link, .hs-top-logo", {
        y: -16, opacity: 0, duration: 0.7, stagger: 0.08, ease: "power3.out", delay: 0.1,
      });
      gsap.from(".hs-marquee-item", {
        opacity: 0, duration: 0.6, stagger: 0.06, ease: "power2.out", delay: 0.7,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        marginTop: 56,
        height: "calc(100vh - 56px)",
        minHeight: 600,
        width: "100%",
        overflow: "hidden",
        background: GREEN_DARK,
      }}
    >
      {/* Full-bleed background image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={HERO_IMG}
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          zIndex: 0,
        }}
      />
      {/* Subtle dark vignette so cream text reads */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.35) 100%)", zIndex: 1, pointerEvents: "none" }} />

      {/* Big headline anchored bottom-left */}
      <div
        style={{
          position: "absolute",
          left: "clamp(20px, 5vw, 64px)",
          right: "clamp(20px, 5vw, 64px)",
          bottom: "clamp(80px, 12vh, 160px)",
          zIndex: 4,
          color: CREAM,
          maxWidth: 980,
        }}
      >
        <h1
          className="hs-headline"
          style={{
            fontFamily: "var(--font-fraunces), Georgia, serif",
            fontStyle: "italic",
            fontWeight: 700,
            fontSize: "clamp(36px, 5.4vw, 86px)",
            lineHeight: 1.0,
            letterSpacing: "-1.5px",
            margin: 0,
            textShadow: "0 6px 30px rgba(0,0,0,0.45)",
            maxWidth: 820,
          }}
        >
          <span style={{ display: "block" }}>Your pantry&apos;s new</span>
          <span style={{ display: "block" }}>main character.</span>
        </h1>
        <Link
          href="/products"
          style={{
            display: "inline-block",
            marginTop: 28,
            background: CREAM,
            color: GREEN_DARK,
            padding: "16px 32px",
            borderRadius: 100,
            textDecoration: "none",
            fontFamily: "var(--font-dm-sans)",
            fontWeight: 700,
            fontSize: 14,
            letterSpacing: 1,
            textTransform: "uppercase",
            boxShadow: "0 14px 40px rgba(0,0,0,0.25)",
          }}
        >
          Shop the collection →
        </Link>
      </div>

      {/* Bottom yellow marquee strip */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 5,
          background: YELLOW,
          color: GREEN_DARK,
          padding: "14px 0",
          overflow: "hidden",
          fontFamily: "var(--font-dm-sans)",
          fontWeight: 700,
          fontSize: 15,
          letterSpacing: "0.5px",
        }}
      >
        <div className="hs-marquee-track" style={{ display: "flex", whiteSpace: "nowrap", animation: "hsMarquee 35s linear infinite" }}>
          {[...MARQUEE, ...MARQUEE, ...MARQUEE].map((t, i) => (
            <span key={i} className="hs-marquee-item" style={{ display: "inline-flex", alignItems: "center", gap: 28, paddingInline: 18 }}>
              <span>{t}</span>
              <Sparkle />
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes hsMarquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
        @media (max-width: 720px) {
          .hs-top-link { font-size: 13px !important; }
          .hs-top-logo img { height: 48px !important; }
        }
      `}</style>
    </section>
  );
}

function Sparkle() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden style={{ flexShrink: 0 }}>
      <path d="M8 0 L9.4 6.6 L16 8 L9.4 9.4 L8 16 L6.6 9.4 L0 8 L6.6 6.6 Z" fill={GREEN_DARK} />
    </svg>
  );
}
