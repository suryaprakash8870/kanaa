"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { View } from "@react-three/drei";
import HeroScene from "./hero/HeroScene";
import JarIllustration from "./hero/JarIllustration";
import { TextSplitter } from "./TextSplitter";
import { useStore } from "@/hooks/useStore";
import { useMediaQuery } from "@/hooks/useMediaQuery";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const scenes = [
  {
    chip: "Kanaa · Organic Pickles",
    title: "Tomato",
    accent: "Chutney",
    tamil: "தக்காளி தொக்கு",
    subtitle: "Cold-pressed peanut oil, curry leaves & jaggery.",
    bg: "#F7DDE1",
    color: "#D94862",
    contents: "#C82040",
    align: "left" as const,
  },
  {
    chip: "01 · Rice Mix",
    title: "Vatha",
    accent: "Kolambu",
    tamil: "வத்த குழம்பு",
    subtitle: "Sun-dried turkey berry, garlic & fenugreek.",
    bg: "#E8D4B8",
    color: "#6B4022",
    contents: "#5C3416",
    align: "right" as const,
  },
  {
    chip: "02 · Rice Mix",
    title: "Sour Spinach",
    accent: "Chutney",
    tamil: "செம்புளிச்சை கீரை",
    subtitle: "Fresh sour-spinach leaves with gingelly oil.",
    bg: "#D9E8C4",
    color: "#3D5A2D",
    contents: "#4A7534",
    align: "left" as const,
  },
  {
    chip: "03 · Pickle",
    title: "Veldt Grape",
    accent: "Chutney",
    tamil: "பிரண்டை தொக்கு",
    subtitle: "Pirandai, tamarind & jaggery — ancestral Tamil.",
    bg: "#E2D4F0",
    color: "#5F3D8A",
    contents: "#42265F",
    align: "right" as const,
  },
];

export default function ScrollHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
  const ready = useStore((s) => s.ready);
  const isDesktop = useMediaQuery("(min-width: 768px)", true);

  useGSAP(
    () => {
      if (!ready) return;

      // Intro
      gsap
        .timeline()
        .set(".hero", { opacity: 1 })
        .from(".hero-chip", { opacity: 0, y: 18, duration: 0.6, ease: "power3.out" })
        .from(
          ".hero-title-0 .split-char",
          {
            y: 40,
            opacity: 0,
            rotate: -8,
            stagger: 0.04,
            ease: "back.out(2)",
            duration: 0.7,
          },
          "-=0.2",
        )
        .from(".hero-tamil-0, .hero-sub-0", {
          opacity: 0,
          y: 20,
          duration: 0.6,
          stagger: 0.1,
        });

      // Scroll: update progressRef + background + text reveals
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
        },
      });

      const proxy = { p: 0 };
      tl.to(proxy, {
        p: 1,
        ease: "none",
        duration: scenes.length - 1,
        onUpdate: () => {
          progressRef.current = proxy.p;
        },
      });

      // Body bg color tween synced to scenes
      const bgTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
        },
      });
      bgTl.fromTo(
        ".hero",
        { backgroundColor: scenes[0].bg },
        { backgroundColor: scenes[1].bg, ease: "none", duration: 1 },
      );
      for (let i = 1; i < scenes.length - 1; i++) {
        bgTl.to(".hero", {
          backgroundColor: scenes[i + 1].bg,
          ease: "none",
          duration: 1,
        });
      }

      // Per-scene text overlays fade
      scenes.forEach((_, i) => {
        if (i === 0) return;
        ScrollTrigger.create({
          trigger: ".hero",
          start: `top+=${(i - 0.5) * window.innerHeight} top`,
          end: `top+=${(i + 0.5) * window.innerHeight} top`,
          onEnter: () => revealScene(i),
          onEnterBack: () => revealScene(i),
          onLeaveBack: () => revealScene(i - 1),
        });
      });

      function revealScene(i: number) {
        scenes.forEach((_, j) => {
          gsap.to(`.hero-scene-${j}`, {
            opacity: j === i ? 1 : 0,
            y: j === i ? 0 : 24,
            duration: 0.6,
            ease: "power3.out",
          });
          gsap.to(`.hero-jar-${j}`, {
            opacity: j === i ? 1 : 0,
            duration: 0.6,
            ease: "power3.out",
          });
        });
        gsap.to(`.hero-scene-${i} .split-char`, {
          y: 0,
          opacity: 1,
          rotate: 0,
          stagger: 0.03,
          ease: "back.out(2)",
          duration: 0.6,
        });
      }
    },
    { dependencies: [ready] },
  );

  // Fallback: if ready flips before GSAP ctx remounts
  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      progressRef.current = Math.max(0, Math.min(1, -rect.top / total));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="hero"
      style={{
        position: "relative",
        height: "400vh",
        background: scenes[0].bg,
        opacity: 0,
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          width: "100%",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {/* 3D portal view — desktop only (Fizzi pattern) */}
        {isDesktop && (
          <View
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 1,
              pointerEvents: "none",
            }}
          >
            <HeroScene progressRef={progressRef} />
          </View>
        )}

        {/* Mobile: decorative accent blob — no faux-3D */}
        {!isDesktop && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 0,
              pointerEvents: "none",
              overflow: "hidden",
            }}
          >
            {scenes.map((s, i) => (
              <div
                key={i}
                className={`hero-jar-${i}`}
                style={{
                  position: "absolute",
                  right: "-18vw",
                  bottom: "-12vh",
                  width: "78vw",
                  height: "78vw",
                  borderRadius: "50%",
                  background: `radial-gradient(circle at 35% 35%, ${s.color}55, ${s.color}18 55%, transparent 72%)`,
                  opacity: i === 0 ? 1 : 0,
                  transition: "opacity 0.6s ease",
                  filter: "blur(2px)",
                }}
              />
            ))}
            {/* Botanical leaf silhouette, repeated faintly */}
            <svg
              style={{
                position: "absolute",
                left: "-8vw",
                top: "52vh",
                width: "40vw",
                opacity: 0.12,
                transform: "rotate(-18deg)",
              }}
              viewBox="0 0 300 400"
              fill="none"
            >
              <path
                d="M50 380 Q30 200 150 40 Q200 80 220 180 Q240 280 160 360 Q120 390 50 380Z"
                fill={scenes[0].color}
              />
            </svg>
          </div>
        )}

        {/* Text overlays (4 scenes stacked) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            pointerEvents: "none",
            padding: "0 clamp(24px, 6vw, 100px)",
          }}
        >
          {scenes.map((s, i) => (
            <div
              key={i}
              className={`hero-scene-${i}`}
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: isDesktop
                  ? s.align === "left"
                    ? "flex-start"
                    : s.align === "right"
                      ? "flex-end"
                      : "center"
                  : "flex-start",
                textAlign: isDesktop ? s.align : "left",
                padding: isDesktop
                  ? "0 clamp(24px, 6vw, 100px)"
                  : "0 24px 0 24px",
                opacity: i === 0 ? 1 : 0,
                transform: i === 0 ? "translateY(0)" : "translateY(24px)",
              }}
            >
              <p
                className={i === 0 ? "hero-chip" : ""}
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "4px",
                  color: s.color,
                  textTransform: "uppercase",
                  marginBottom: 14,
                }}
              >
                {s.chip}
              </p>
              <h1
                className={`hero-title-${i}`}
                style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontWeight: 800,
                  fontSize: isDesktop
                    ? "clamp(48px, 7.2vw, 110px)"
                    : "clamp(56px, 16vw, 88px)",
                  lineHeight: 0.92,
                  color: "#214D34",
                  letterSpacing: "-2px",
                  margin: 0,
                  maxWidth: isDesktop ? "52vw" : "100%",
                  textShadow: "0 2px 20px rgba(250,247,242,0.5)",
                }}
              >
                <TextSplitter text={s.title} />{" "}
                <span style={{ color: s.color, fontStyle: "italic" }}>
                  <TextSplitter text={s.accent} />
                </span>
              </h1>
              <p
                className={`hero-tamil-${i}`}
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "clamp(16px, 1.8vw, 22px)",
                  color: s.color,
                  marginTop: 10,
                  fontWeight: 500,
                  opacity: 0.9,
                }}
              >
                {s.tamil}
              </p>
              <p
                className={`hero-sub-${i}`}
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "clamp(14px, 1.3vw, 17px)",
                  color: "#4A3728",
                  opacity: 0.78,
                  lineHeight: 1.6,
                  marginTop: 18,
                  maxWidth: 360,
                }}
              >
                {s.subtitle}
              </p>
            </div>
          ))}
        </div>

        {/* Scroll hint */}
        <div
          style={{
            position: "absolute",
            bottom: 28,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            opacity: 0.55,
            zIndex: 3,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: 10,
              letterSpacing: "3px",
              color: "#214D34",
              textTransform: "uppercase",
            }}
          >
            Scroll to Explore
          </span>
          <svg width="14" height="24" viewBox="0 0 14 24" fill="none">
            <rect x="1" y="1" width="12" height="22" rx="6" stroke="#214D34" strokeWidth="1.2" />
            <circle cx="7" cy="7" r="1.5" fill="#214D34">
              <animate attributeName="cy" values="7;15;7" dur="1.6s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>
      </div>
    </section>
  );
}
