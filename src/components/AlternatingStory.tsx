"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from "@/hooks/useMediaQuery";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const sections = [
  {
    heading: "Sun-dried, not sun-shortcut.",
    body: "Every mango, chili, and spice is sun-cured in the open Kongu air for days — the old, slow way.",
    bg: "#DFF0D8",
    color: "#D94862",
    image:
      "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=900&q=80&auto=format&fit=crop",
    imageFallback: "https://picsum.photos/seed/sundried/900/720",
    alt: "Sun-dried spices and ingredients",
  },
  {
    heading: "Cold-pressed oils only.",
    body: "Gingelly, peanut, and coconut — crushed by stone, never refined. Preserves aroma, flavor, and nutrients.",
    bg: "#DFF0D8",
    color: "#6B4022",
    image:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=900&q=80&auto=format&fit=crop",
    imageFallback: "https://picsum.photos/seed/oil/900/720",
    alt: "Cold-pressed oil",
  },
  {
    heading: "Hand-ground masalas.",
    body: "Eleven spices, ground on granite. No factory grinder ever touches a Kanaa jar.",
    bg: "#DFF0D8",
    color: "#3D5A2D",
    image:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=900&q=80&auto=format&fit=crop",
    imageFallback: "https://picsum.photos/seed/masala/900/720",
    alt: "Indian spices and curry",
  },
  {
    heading: "Aged in terracotta.",
    body: "Thirty days in clay pots. The ferment breathes, the flavor deepens, the grandma's recipe survives.",
    bg: "#DFF0D8",
    color: "#5F3D8A",
    image: "https://picsum.photos/seed/terracotta/900/720",
    imageFallback: "https://picsum.photos/seed/clay/900/720",
    alt: "Terracotta clay pots",
  },
];

export default function AlternatingStory() {
  const isDesktop = useMediaQuery("(min-width: 768px)", true);
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      sections.forEach((_, i) => {
        gsap.fromTo(
          `.alt-art-${i}`,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: `.alt-section-${i}`,
              start: "top 85%",
              once: true,
            },
          },
        );
        gsap.fromTo(
          `.alt-text-${i}`,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: `.alt-section-${i}`,
              start: "top 88%",
              once: true,
            },
          },
        );
      });

      sections.forEach((s, i) => {
        ScrollTrigger.create({
          trigger: `.alt-section-${i}`,
          start: "top 50%",
          end: "bottom 50%",
          onEnter: () =>
            gsap.to(".alt-container", {
              backgroundColor: s.bg,
              duration: 0.8,
              ease: "power2.inOut",
            }),
          onEnterBack: () =>
            gsap.to(".alt-container", {
              backgroundColor: s.bg,
              duration: 0.8,
              ease: "power2.inOut",
            }),
        });
      });
    },
    { scope: containerRef, dependencies: [isDesktop] },
  );

  return (
    <section
      ref={containerRef}
      className="alt-container"
      style={{
        position: "relative",
        background: sections[0].bg,
        color: "#214D34",
        padding: "clamp(40px, 5vw, 70px) 0",
      }}
    >
      <div
        style={{
          position: "relative",
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 clamp(20px, 5vw, 80px)",
        }}
      >
        {/* Section title */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "clamp(24px, 4vw, 48px)",
            maxWidth: 720,
            marginInline: "auto",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: 11,
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "#4FB83A",
              fontWeight: 700,
              margin: 0,
              marginBottom: 14,
            }}
          >
            How we make it
          </p>
          <h2
            style={{
              fontFamily: "var(--font-fraunces), Georgia, serif",
              fontWeight: 700,
              fontStyle: "italic",
              fontVariationSettings: "'opsz' 144, 'SOFT' 100, 'WONK' 1",
              fontSize: "clamp(30px, 4.4vw, 56px)",
              lineHeight: 1.05,
              letterSpacing: "-1px",
              color: "#214D34",
              margin: 0,
            }}
          >
            Four rituals, zero shortcuts.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "clamp(14px, 1.1vw, 16px)",
              lineHeight: 1.65,
              color: "#4A3728",
              opacity: 0.78,
              marginTop: 14,
              maxWidth: 520,
              marginInline: "auto",
            }}
          >
            The old, slow way — sun, stone, clay, and patience. Here&apos;s what
            actually happens before a Kanaa jar reaches your pantry.
          </p>
        </div>

        {sections.map((s, i) => {
          const imageFirst = i % 2 === 0;
          return (
            <div
              key={i}
              className={`alt-section-${i}`}
              style={{
                display: "grid",
                gridTemplateColumns: isDesktop ? "1fr 1fr" : "1fr",
                gridAutoFlow: isDesktop ? "dense" : "row",
                alignItems: "center",
                gap: isDesktop ? 56 : 24,
                padding: isDesktop ? "48px 0" : "32px 0",
              }}
            >
              {/* Image card */}
              <div
                className={`alt-art-${i}`}
                style={{
                  gridColumn: isDesktop ? (imageFirst ? 1 : 2) : 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    maxWidth: 480,
                    aspectRatio: "5 / 4",
                    borderRadius: 18,
                    overflow: "hidden",
                    boxShadow:
                      "0 24px 50px rgba(33,77,52,0.15), 0 4px 12px rgba(33,77,52,0.08)",
                    background: `${s.color}22`,
                    transform: imageFirst ? "rotate(-2deg)" : "rotate(2deg)",
                    transition: "transform 0.4s ease",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.image}
                    alt={s.alt}
                    onError={(e) => {
                      const img = e.currentTarget as HTMLImageElement;
                      if (img.src !== s.imageFallback) img.src = s.imageFallback;
                    }}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
              </div>

              {/* Text */}
              <div
                className={`alt-text-${i}`}
                style={{
                  gridColumn: isDesktop ? (imageFirst ? 2 : 1) : 1,
                  padding: isDesktop ? "0 16px" : "0 8px",
                  textAlign: isDesktop ? "left" : "center",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: 11,
                    letterSpacing: "3px",
                    textTransform: "uppercase",
                    color: s.color,
                    marginBottom: 12,
                    opacity: 0.85,
                  }}
                >
                  The Kanaa Way · 0{i + 1}
                </p>
                <h2
                  style={{
                    fontFamily: "var(--font-playfair), serif",
                    fontWeight: 700,
                    fontSize: "clamp(28px, 3.8vw, 48px)",
                    lineHeight: 1.05,
                    letterSpacing: "-1px",
                    color: "#214D34",
                    margin: 0,
                  }}
                >
                  {s.heading}
                </h2>
                <p
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "clamp(14px, 1.1vw, 16px)",
                    color: "#4A3728",
                    lineHeight: 1.65,
                    marginTop: 14,
                    maxWidth: 420,
                    opacity: 0.82,
                    marginInline: isDesktop ? undefined : "auto",
                  }}
                >
                  {s.body}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
