"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BG = "#DFF0D8";
const INK = "#1F4A33";
const ACCENT = "#4FB83A";
const CREAM = "#FFF4D8";

export default function CTABanner() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cta-stagger > *", {
        y: 32,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        background: BG,
        padding: "clamp(90px, 13vw, 150px) clamp(20px, 5vw, 80px)",
        overflow: "hidden",
      }}
    >
      {/* Soft radial glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(60% 60% at 50% 40%, rgba(79,184,58,0.12) 0%, rgba(79,184,58,0) 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Decorative concentric rings */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(900px, 90vw)",
          height: "min(900px, 90vw)",
          borderRadius: "50%",
          border: `1px dashed ${INK}22`,
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(640px, 70vw)",
          height: "min(640px, 70vw)",
          borderRadius: "50%",
          border: `1px solid ${INK}14`,
          pointerEvents: "none",
        }}
      />

      <div
        ref={contentRef}
        className="cta-stagger"
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 760,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        {/* Eyebrow pill */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 16px",
            borderRadius: 999,
            background: "#fff",
            border: `1px solid ${INK}1A`,
            boxShadow: "0 6px 16px rgba(31,74,51,0.06)",
            marginBottom: 28,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              background: ACCENT,
              boxShadow: `0 0 0 4px ${ACCENT}33`,
              animation: "ctaPulse 1.6s ease-in-out infinite",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "2.4px",
              color: INK,
              textTransform: "uppercase",
            }}
          >
            Small-batch · Dropping weekly
          </span>
        </div>

        <h2
          style={{
            fontFamily: "var(--font-fraunces), Georgia, serif",
            fontWeight: 700,
            fontSize: "clamp(40px, 6.2vw, 84px)",
            lineHeight: 1.0,
            letterSpacing: "-1.5px",
            color: INK,
            margin: "0 0 22px",
          }}
        >
          Taste the difference{" "}
          <span
            style={{
              fontStyle: "italic",
              color: ACCENT,
              fontVariationSettings: "'opsz' 144, 'SOFT' 100, 'WONK' 1",
            }}
          >
            nature makes.
          </span>
        </h2>

        <p
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "clamp(15px, 1.2vw, 17px)",
            lineHeight: 1.65,
            color: INK,
            opacity: 0.72,
            maxWidth: 520,
            margin: "0 auto 40px",
          }}
        >
          We hand-pack a fresh batch every week. When the jars are gone, they&apos;re
          gone — no warehouses, no preservatives, no waiting.
        </p>

        <div
          style={{
            display: "flex",
            gap: 14,
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            marginBottom: 44,
          }}
        >
          <a
            href="/products"
            style={{
              background: INK,
              color: CREAM,
              borderRadius: 999,
              padding: "18px 36px",
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: "1.2px",
              textTransform: "uppercase",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              boxShadow: "0 14px 32px rgba(31,74,51,0.28)",
              transition: "transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = ACCENT;
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 18px 40px rgba(79,184,58,0.35)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = INK;
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 14px 32px rgba(31,74,51,0.28)";
            }}
          >
            Order your jar
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>

          <a
            href="/#process"
            style={{
              color: INK,
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontWeight: 600,
              fontSize: 13,
              letterSpacing: "1px",
              textTransform: "uppercase",
              textDecoration: "none",
              padding: "18px 10px",
              borderBottom: `1.5px solid ${INK}`,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            How it&apos;s made
          </a>
        </div>

        {/* Trust row */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "stretch",
            gap: 0,
            flexWrap: "wrap",
            borderTop: `1px solid ${INK}1A`,
            borderBottom: `1px solid ${INK}1A`,
            paddingBlock: 18,
          }}
        >
          {[
            { k: "Free shipping", v: "above ₹499" },
            { k: "Fresh pack", v: "within 48 hrs" },
            { k: "Flavor promise", v: "30-day guarantee" },
          ].map((item, i) => (
            <div
              key={item.k}
              style={{
                flex: "1 1 180px",
                padding: "6px 22px",
                borderLeft: i === 0 ? "none" : `1px solid ${INK}14`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-fraunces), serif",
                  fontStyle: "italic",
                  fontWeight: 600,
                  fontSize: 17,
                  color: INK,
                }}
              >
                {item.k}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: 11,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  color: INK,
                  opacity: 0.55,
                }}
              >
                {item.v}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ctaPulse {
          0%, 100% { box-shadow: 0 0 0 4px ${ACCENT}33; }
          50% { box-shadow: 0 0 0 8px ${ACCENT}11; }
        }
      `}</style>
    </section>
  );
}
