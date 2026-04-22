"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const INK = "#1F4A33";
const CREAM = "#FFF4D8";
const ACCENT = "#4FB83A";
const CLAY = "#C0301F";
const MUSTARD = "#F5C03A";

const SERIF_DISPLAY = "var(--font-playfair), serif";
const SERIF_ITALIC = "var(--font-cormorant), Georgia, serif";
const HAND = "var(--font-caveat), cursive";
const SANS = "var(--font-dm-sans), sans-serif";

export default function AtOurTable() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".aot-eyebrow", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
      gsap.from(".aot-heading", {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.05,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
      gsap.from(".aot-body", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.25,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
      gsap.from(".aot-chip", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        delay: 0.35,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
      gsap.from(".aot-card-1", {
        y: 60,
        rotate: 0,
        opacity: 0,
        duration: 1.2,
        delay: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
      gsap.from(".aot-card-2", {
        y: 80,
        rotate: 0,
        opacity: 0,
        duration: 1.2,
        delay: 0.25,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
      gsap.from(".aot-stat", {
        y: 18,
        opacity: 0,
        duration: 0.6,
        delay: 0.45,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
      });
      gsap.from(".aot-doodle", {
        scale: 0.7,
        opacity: 0,
        duration: 1,
        delay: 0.55,
        ease: "back.out(1.7)",
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        background: INK,
        color: CREAM,
        overflow: "hidden",
      }}
    >
      {/* Wavy top edge */}
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        style={{
          display: "block",
          width: "100%",
          height: "clamp(40px, 5vw, 80px)",
          fill: INK,
          marginTop: -1,
        }}
      >
        <path d="M0,40 C240,0 480,80 720,40 C960,0 1200,80 1440,40 L1440,80 L0,80 Z" />
      </svg>

      {/* Soft ambient blobs */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(600px 280px at 12% 18%, rgba(79,184,58,0.12), transparent 65%), radial-gradient(500px 260px at 92% 78%, rgba(245,192,58,0.10), transparent 65%)",
        }}
      />

      {/* Floating sparkle doodles (web only) */}
      <Sparkle top="14%" left="6%" size={22} color={MUSTARD} rotate={-12} className="aot-sparkle aot-sparkle-hide-mobile" />
      <Sparkle top="76%" left="10%" size={18} color={ACCENT} rotate={8} className="aot-sparkle aot-sparkle-hide-mobile" />
      <Sparkle top="8%" left="88%" size={26} color={CREAM} rotate={20} className="aot-sparkle aot-sparkle-hide-mobile" />

      <div
        className="aot-grid"
        style={{
          position: "relative",
          maxWidth: 1280,
          margin: "0 auto",
          padding: "clamp(56px, 8vw, 110px) clamp(22px, 5vw, 80px)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(36px, 5vw, 90px)",
          alignItems: "center",
        }}
      >
        {/* ─────────── LEFT column ─────────── */}
        <div style={{ position: "relative" }}>
          <p
            className="aot-eyebrow"
            style={{
              fontFamily: SANS,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "3.5px",
              textTransform: "uppercase",
              color: ACCENT,
              margin: 0,
              marginBottom: 18,
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span
              aria-hidden
              style={{
                display: "inline-block",
                width: 28,
                height: 1,
                background: ACCENT,
              }}
            />
            Our Table
          </p>

          <h2
            className="aot-heading"
            style={{
              fontFamily: SERIF_DISPLAY,
              fontWeight: 700,
              fontSize: "clamp(38px, 6.2vw, 88px)",
              color: CREAM,
              letterSpacing: "-1.5px",
              lineHeight: 1.02,
              margin: 0,
            }}
          >
            Everyone&apos;s
            <br />
            welcome at{" "}
            <span
              style={{
                fontFamily: SERIF_ITALIC,
                fontStyle: "italic",
                fontWeight: 600,
                color: MUSTARD,
                position: "relative",
                whiteSpace: "nowrap",
              }}
            >
              our
              <svg
                aria-hidden
                viewBox="0 0 120 10"
                preserveAspectRatio="none"
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: -4,
                  width: "100%",
                  height: 10,
                  opacity: 0.9,
                }}
              >
                <path
                  d="M2 6 C 30 0, 60 10, 90 4 C 105 1, 115 6, 118 5"
                  fill="none"
                  stroke={MUSTARD}
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <br />
            table.
          </h2>

          <p
            className="aot-body"
            style={{
              marginTop: "clamp(22px, 3vw, 34px)",
              fontFamily: SANS,
              fontSize: "clamp(14.5px, 1.05vw, 16.5px)",
              color: CREAM,
              lineHeight: 1.7,
              maxWidth: 460,
              opacity: 0.88,
            }}
          >
            We&apos;re here for the moments that bring people together — festive
            feasts, weeknight rasam-rice, and everything in between. Kanaa makes
            mealtime easy, soulful, and full of flavour you&apos;ll actually get
            excited about.
          </p>

          {/* Badge chips */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              marginTop: 22,
            }}
          >
            {[
              { label: "Small-batch", color: ACCENT },
              { label: "Cold-pressed oil", color: MUSTARD },
              { label: "No preservatives", color: CLAY },
            ].map((c) => (
              <span
                key={c.label}
                className="aot-chip"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                  fontFamily: SANS,
                  fontSize: 11.5,
                  fontWeight: 700,
                  letterSpacing: "1.8px",
                  textTransform: "uppercase",
                  color: CREAM,
                  padding: "7px 13px",
                  borderRadius: 999,
                  border: `1px solid ${CREAM}33`,
                  background: `${CREAM}0d`,
                }}
              >
                <span
                  aria-hidden
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 999,
                    background: c.color,
                  }}
                />
                {c.label}
              </span>
            ))}
          </div>

          {/* CTA + Our Story link */}
          <div
            style={{
              marginTop: "clamp(28px, 4vw, 44px)",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 18,
            }}
          >
            <a
              href="#about"
              className="aot-body aot-cta"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                border: `2px solid ${CREAM}`,
                padding: "14px 28px",
                borderRadius: 100,
                textDecoration: "none",
                color: CREAM,
                fontFamily: SANS,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                transition: "all 0.3s ease",
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = CREAM;
                e.currentTarget.style.color = CLAY;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = CREAM;
              }}
            >
              Our Story
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <span
              className="aot-body"
              style={{
                fontFamily: HAND,
                fontSize: 22,
                color: MUSTARD,
                opacity: 0.9,
                transform: "rotate(-3deg)",
                display: "inline-block",
              }}
            >
              since 2019, from Erode ✦
            </span>
          </div>

          {/* Small tilted card — now overlaps slightly with right column on web */}
          <div
            className="aot-card-1 aot-small-card"
            style={{
              marginTop: "clamp(38px, 5vw, 62px)",
              transform: "rotate(-5deg)",
              width: "min(260px, 70%)",
              aspectRatio: "1 / 1",
              borderRadius: 14,
              overflow: "hidden",
              boxShadow: `0 28px 56px rgba(0,0,0,0.4), 0 0 0 8px ${CREAM}`,
              position: "relative",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80&auto=format&fit=crop"
              alt="Indian thali with side dishes"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            {/* Taped corner */}
            <span
              aria-hidden
              style={{
                position: "absolute",
                top: -10,
                left: 20,
                width: 60,
                height: 18,
                background: `${MUSTARD}cc`,
                transform: "rotate(-6deg)",
                boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
              }}
            />
            {/* Handwritten caption */}
            <span
              style={{
                position: "absolute",
                bottom: 10,
                left: 14,
                right: 14,
                fontFamily: HAND,
                fontSize: 18,
                color: CREAM,
                textShadow: "0 1px 6px rgba(0,0,0,0.6)",
                transform: "rotate(-2deg)",
              }}
            >
              amma&apos;s meals
            </span>
          </div>
        </div>

        {/* ─────────── RIGHT column ─────────── */}
        <div style={{ position: "relative" }}>
          <div
            className="aot-card-2"
            style={{
              transform: "rotate(3deg)",
              width: "100%",
              maxWidth: 500,
              aspectRatio: "5 / 4",
              borderRadius: 18,
              overflow: "hidden",
              boxShadow: `0 34px 80px rgba(0,0,0,0.48), 0 0 0 10px ${CREAM}`,
              marginInline: "auto",
              position: "relative",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1596797038530-2c107229654b?w=1200&q=80&auto=format&fit=crop"
              alt="Pickle and spread board"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            {/* Taped corner (top-right) */}
            <span
              aria-hidden
              style={{
                position: "absolute",
                top: -10,
                right: 30,
                width: 74,
                height: 18,
                background: `${ACCENT}cc`,
                transform: "rotate(8deg)",
                boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
              }}
            />
            {/* Handwritten caption */}
            <span
              style={{
                position: "absolute",
                bottom: 14,
                left: 18,
                fontFamily: HAND,
                fontSize: 22,
                color: CREAM,
                textShadow: "0 1px 8px rgba(0,0,0,0.65)",
                transform: "rotate(-1deg)",
              }}
            >
              the spread ✦
            </span>
          </div>

          {/* Decorative runner-style figure */}
          <svg
            className="aot-doodle aot-doodle-hide-mobile"
            viewBox="0 0 120 140"
            style={{
              position: "absolute",
              top: "26%",
              right: "-8%",
              width: 120,
              height: 140,
              fill: "none",
              stroke: CREAM,
              strokeWidth: 2,
              strokeLinecap: "round",
              strokeLinejoin: "round",
              transform: "rotate(8deg)",
            }}
          >
            <ellipse cx="60" cy="22" rx="28" ry="6" />
            <ellipse cx="60" cy="20" rx="22" ry="3.5" />
            <path d="M60 26 L 60 36 M 50 36 L 70 36" />
            <path d="M 60 36 Q 75 50 70 70" />
            <path d="M 70 70 Q 64 90 70 110" />
            {[0, 1, 2, 3].map((i) => (
              <line
                key={i}
                x1={64 + i * 1.5}
                y1={75 + i * 8}
                x2={72 - i * 1.2}
                y2={78 + i * 8}
              />
            ))}
            <path d="M 70 110 L 80 130" />
            <path d="M 70 110 L 60 130" />
          </svg>

          {/* Stat row */}
          <div
            className="aot-stats"
            style={{
              marginTop: "clamp(36px, 5vw, 56px)",
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 18,
              maxWidth: 480,
              marginInline: "auto",
              borderTop: `1px solid ${CREAM}22`,
              borderBottom: `1px solid ${CREAM}22`,
              padding: "18px 6px",
            }}
          >
            {[
              { n: "14+", l: "pickle varieties" },
              { n: "30d", l: "terracotta aged" },
              { n: "5000", l: "happy kitchens" },
            ].map((s) => (
              <div key={s.l} className="aot-stat" style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: SERIF_DISPLAY,
                    fontSize: "clamp(26px, 2.8vw, 34px)",
                    fontWeight: 700,
                    color: MUSTARD,
                    lineHeight: 1,
                  }}
                >
                  {s.n}
                </div>
                <div
                  style={{
                    marginTop: 6,
                    fontFamily: SANS,
                    fontSize: 10.5,
                    fontWeight: 700,
                    letterSpacing: "1.8px",
                    textTransform: "uppercase",
                    color: CREAM,
                    opacity: 0.72,
                  }}
                >
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wavy bottom edge */}
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        style={{
          display: "block",
          width: "100%",
          height: "clamp(40px, 5vw, 80px)",
          fill: "#DFF0D8",
        }}
      >
        <path d="M0,40 C240,0 480,80 720,40 C960,0 1200,80 1440,40 L1440,80 L0,80 Z" />
      </svg>

      <style>{`
        @media (max-width: 880px) {
          .aot-grid {
            grid-template-columns: 1fr !important;
          }
          .aot-small-card {
            width: min(240px, 70%) !important;
            margin-left: auto !important;
            margin-right: auto !important;
          }
          .aot-sparkle-hide-mobile { display: none !important; }
          .aot-doodle-hide-mobile { display: none !important; }
          .aot-stats {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 10px !important;
          }
        }
        @media (max-width: 480px) {
          .aot-stats {
            grid-template-columns: 1fr !important;
            padding: 14px 6px !important;
          }
        }
      `}</style>
    </section>
  );
}

function Sparkle({
  top,
  left,
  size,
  color,
  rotate = 0,
  className,
}: {
  top: string;
  left: string;
  size: number;
  color: string;
  rotate?: number;
  className?: string;
}) {
  return (
    <svg
      aria-hidden
      className={className}
      viewBox="0 0 24 24"
      style={{
        position: "absolute",
        top,
        left,
        width: size,
        height: size,
        transform: `rotate(${rotate}deg)`,
        opacity: 0.85,
        pointerEvents: "none",
      }}
    >
      <path
        d="M12 2 L13.4 9.2 L20 10 L13.4 11 L12 22 L10.6 11 L4 10 L10.6 9.2 Z"
        fill={color}
      />
    </svg>
  );
}
