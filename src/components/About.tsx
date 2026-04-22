"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionWave from "./SectionWave";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "3+", label: "Generations" },
  { value: "100%", label: "Natural" },
  { value: "0", label: "Preservatives" },
  { value: "12+", label: "Varieties" },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Eyebrow
      gsap.from(".abt-eyebrow", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ".abt-eyebrow", start: "top 85%", once: true },
      });
      // Headline words — stagger each line
      gsap.from(".abt-headline", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".abt-headline", start: "top 88%", once: true },
      });
      // Body paragraphs
      gsap.from(".abt-body > *", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: ".abt-body", start: "top 88%", once: true },
      });
      // Stats
      gsap.from(".abt-stat", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".abt-stats", start: "top 88%", once: true },
      });
      // Image panel
      gsap.fromTo(
        ".abt-img-panel",
        { clipPath: "inset(0 100% 0 0)", scale: 1.08 },
        {
          clipPath: "inset(0 0% 0 0)",
          scale: 1,
          duration: 1.3,
          ease: "power3.inOut",
          scrollTrigger: { trigger: ".abt-img-panel", start: "top 80%", once: true },
        }
      );
      // Vertical text
      gsap.from(".abt-vert-text", {
        opacity: 0,
        duration: 1.2,
        delay: 0.5,
        ease: "power2.out",
        scrollTrigger: { trigger: ".abt-img-panel", start: "top 80%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="our-story"
      ref={sectionRef}
      style={{
        position: "relative",
        background: "#FAF7F2",
        overflow: "hidden",
      }}
    >
      <SectionWave color="#FAF7F2" position="top" />
      <SectionWave color="#FAF7F2" position="bottom" />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          minHeight: "auto",
        }}
        className="abt-grid"
      >
        {/* ── LEFT: Text panel ── */}
        <div
          style={{
            padding: "clamp(40px, 5vw, 72px) clamp(24px, 4vw, 56px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {/* Eyebrow */}
          <p
            className="abt-eyebrow"
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "#C9A24A",
              marginBottom: 18,
            }}
          >
            Our Story
          </p>

          {/* Headline */}
          <h2
            className="abt-headline"
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontWeight: 700,
              fontSize: "clamp(28px, 3.4vw, 44px)",
              lineHeight: 1.05,
              color: "#214D34",
              letterSpacing: "-1px",
              margin: 0,
              marginBottom: 22,
            }}
          >
            Brewed with
            <br />
            <em style={{ color: "#7AA33C", fontStyle: "italic" }}>three</em>
            <br />
            generations
            <br />
            of love.
          </h2>

          {/* Body */}
          <div className="abt-body" style={{ marginBottom: 28 }}>
            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "clamp(13px, 0.95vw, 14.5px)",
                lineHeight: 1.65,
                color: "#4A3728",
                opacity: 0.85,
                marginBottom: 12,
                maxWidth: 420,
              }}
            >
              Kanaa was born in a small kitchen in Tamil Nadu, where our
              grandmother would spend every summer sun-drying mangoes, grinding
              fresh spices, and slowly folding them into cold-pressed gingelly
              oil — a ritual passed down through three generations.
            </p>
            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "clamp(13px, 0.95vw, 14.5px)",
                lineHeight: 1.65,
                color: "#4A3728",
                opacity: 0.85,
                maxWidth: 420,
              }}
            >
              Today, every jar of Kanaa is made the same way — small batches,
              single-origin ingredients, never a drop of artificial anything.
              Nature is the recipe. We&apos;re just the hands.
            </p>
          </div>

          {/* Stats row */}
          <div
            className="abt-stats"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 0,
              borderTop: "1px solid rgba(33,77,52,0.12)",
              paddingTop: 18,
              marginBottom: 24,
            }}
          >
            {stats.map((s, i) => (
              <div
                key={s.value}
                className="abt-stat"
                style={{
                  paddingRight: 16,
                  borderRight:
                    i < stats.length - 1
                      ? "1px solid rgba(33,77,52,0.12)"
                      : "none",
                  paddingLeft: i > 0 ? 16 : 0,
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-playfair), serif",
                    fontSize: "clamp(20px, 1.9vw, 26px)",
                    fontWeight: 800,
                    color: "#214D34",
                    lineHeight: 1,
                    marginBottom: 4,
                  }}
                >
                  {s.value}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    color: "#7A5C40",
                    opacity: 0.8,
                  }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          {/* Signature */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                background: "#214D34",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  color: "#FAF7F2",
                  fontFamily: "var(--font-playfair)",
                  fontSize: 16,
                  fontStyle: "italic",
                }}
              >
                K
              </span>
            </div>
            <div>
              <p
                style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontWeight: 600,
                  fontSize: 13,
                  color: "#214D34",
                  marginBottom: 2,
                }}
              >
                The Kanaa Family
              </p>
              <p
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: 11,
                  color: "#7A3E1D",
                  opacity: 0.65,
                  letterSpacing: "0.5px",
                }}
              >
                Tamil Nadu, India
              </p>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Image panel ── */}
        <div
          className="abt-img-panel"
          style={{
            position: "relative",
            overflow: "hidden",
            background: "#214D34",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1596797038530-2c107229654b?w=1200&q=85&auto=format&fit=crop"
            alt="Kanaa pickles — handcrafted in Tamil Nadu"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
            }}
          />

          {/* Vertical label */}
          <p
            className="abt-vert-text"
            style={{
              position: "absolute",
              top: "50%",
              left: 28,
              transform: "translateY(-50%) rotate(-90deg)",
              transformOrigin: "center center",
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "rgba(255,244,216,0.65)",
              whiteSpace: "nowrap",
            }}
          >
            Kanaa · Est. in Tradition
          </p>

          {/* Bottom caption card */}
          <div
            style={{
              position: "absolute",
              bottom: 22,
              right: 22,
              background: "rgba(33,77,52,0.82)",
              backdropFilter: "blur(12px)",
              borderRadius: 12,
              padding: "14px 18px",
              maxWidth: 190,
              border: "1px solid rgba(255,244,216,0.15)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: 15,
                fontWeight: 700,
                color: "#FFF4D8",
                lineHeight: 1.25,
                marginBottom: 6,
              }}
            >
              Made in small batches.
            </p>
            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: 11,
                color: "rgba(255,244,216,0.72)",
                lineHeight: 1.55,
              }}
            >
              Every jar leaves our kitchen within 48 hours of preparation.
            </p>
          </div>

          {/* Decorative corner circle */}
          <div
            style={{
              position: "absolute",
              top: 22,
              right: 22,
              width: 48,
              height: 48,
              borderRadius: "50%",
              border: "1.5px solid rgba(201,162,74,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2 C8 2 4 6 4 11 C4 17 8 20 12 22 C16 20 20 17 20 11 C20 6 16 2 12 2Z"
                stroke="rgba(201,162,74,0.7)"
                strokeWidth="1.2"
                fill="none"
              />
              <line
                x1="12"
                y1="2"
                x2="12"
                y2="22"
                stroke="rgba(201,162,74,0.5)"
                strokeWidth="0.8"
              />
              <line
                x1="4"
                y1="11"
                x2="20"
                y2="11"
                stroke="rgba(201,162,74,0.5)"
                strokeWidth="0.8"
              />
            </svg>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .abt-grid {
            grid-template-columns: 1fr !important;
          }
          .abt-img-panel {
            min-height: 60vw !important;
            aspect-ratio: 4/3;
          }
          .abt-stats {
            grid-template-columns: 1fr 1fr !important;
            gap: 16px !important;
          }
          .abt-stat {
            border-right: none !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
