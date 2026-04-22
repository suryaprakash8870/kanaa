"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PickleJar from "./PickleJar";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const jarLeftRef = useRef<HTMLDivElement>(null);
  const jarCenterRef = useRef<HTMLDivElement>(null);
  const jarRightRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bgLeafRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entry animations
      gsap.from(headlineRef.current, {
        y: 50,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        delay: 0.2,
      });
      gsap.from(subRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.45,
      });
      gsap.from(ctaRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.65,
      });
      gsap.from(
        [jarLeftRef.current, jarCenterRef.current, jarRightRef.current],
        {
          y: 90,
          opacity: 0,
          duration: 1.3,
          ease: "power3.out",
          stagger: 0.14,
          delay: 0.35,
        }
      );

      // Floating loops (CSS handles this, but let's boost with GSAP for more control)
      // These supplement the CSS float animations

      // Scroll-driven parallax
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.4,
        },
      });

      tl.to(jarLeftRef.current, { x: -70, rotation: -18, opacity: 0.6, ease: "none" }, 0)
        .to(jarRightRef.current, { x: 70, rotation: 18, opacity: 0.6, ease: "none" }, 0)
        .to(jarCenterRef.current, { y: -55, scale: 1.08, ease: "none" }, 0)
        .to(headlineRef.current, { y: -35, opacity: 0, ease: "none" }, 0)
        .to(subRef.current, { y: -20, opacity: 0, ease: "none" }, 0)
        .to(ctaRef.current, { y: -12, opacity: 0, ease: "none" }, 0);

      // Subtle bg parallax
      gsap.to(bgLeafRef.current, {
        y: -60,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 2,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "linear-gradient(165deg, #FAF7F2 0%, #F0EBE0 60%, #E8DFC8 100%)",
        paddingTop: 80,
      }}
    >
      {/* Background botanical leaves */}
      <div
        ref={bgLeafRef}
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        {/* Large decorative leaf — top left */}
        <svg
          style={{ position: "absolute", top: "-5%", left: "-3%", width: "clamp(180px,28vw,380px)", opacity: 0.07 }}
          viewBox="0 0 300 400"
          fill="none"
        >
          <path d="M50 380 Q30 200 150 40 Q200 80 220 180 Q240 280 160 360 Q120 390 50 380Z" fill="#214D34" />
          <line x1="150" y1="40" x2="90" y2="380" stroke="#214D34" strokeWidth="3" />
          {[80, 110, 140, 170, 200, 230].map((y, i) => (
            <line key={i} x1="90" y1={y + 20} x2={i % 2 === 0 ? "160" : "60"} y2={y} stroke="#214D34" strokeWidth="1.5" />
          ))}
        </svg>

        {/* Large decorative leaf — bottom right */}
        <svg
          style={{ position: "absolute", bottom: "-8%", right: "-4%", width: "clamp(160px,24vw,340px)", opacity: 0.06, transform: "scaleX(-1) rotate(20deg)" }}
          viewBox="0 0 300 400"
          fill="none"
        >
          <path d="M50 380 Q30 200 150 40 Q200 80 220 180 Q240 280 160 360 Q120 390 50 380Z" fill="#7AA33C" />
          <line x1="150" y1="40" x2="90" y2="380" stroke="#7AA33C" strokeWidth="3" />
        </svg>

        {/* Scattered small dots */}
        {[
          { x: "18%", y: "20%", r: 3 },
          { x: "82%", y: "15%", r: 2 },
          { x: "75%", y: "70%", r: 4 },
          { x: "10%", y: "65%", r: 2.5 },
          { x: "55%", y: "88%", r: 3 },
        ].map((dot, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: dot.x,
              top: dot.y,
              width: dot.r * 2,
              height: dot.r * 2,
              borderRadius: "50%",
              background: "#214D34",
              opacity: 0.12,
            }}
          />
        ))}
      </div>

      {/* Content wrapper */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 1200,
          padding: "0 clamp(20px, 5vw, 80px)",
          display: "grid",
          gridTemplateColumns: "1fr",
          alignItems: "center",
          gap: 0,
        }}
      >
        {/* Tagline pill */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
          <span
            style={{
              background: "rgba(33,77,52,0.08)",
              border: "1px solid rgba(33,77,52,0.15)",
              borderRadius: 100,
              padding: "6px 18px",
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: 12,
              fontWeight: 500,
              color: "#214D34",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
            }}
          >
            100% Natural · No Preservatives
          </span>
        </div>

        {/* Headline */}
        <div ref={headlineRef} style={{ textAlign: "center", marginBottom: 20 }}>
          <h1
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontWeight: 800,
              fontSize: "clamp(42px, 7vw, 96px)",
              lineHeight: 1.05,
              color: "#214D34",
              letterSpacing: "-1.5px",
            }}
          >
            Rooted From
            <br />
            <span style={{ color: "#7AA33C", fontStyle: "italic" }}>The Nature</span>
          </h1>
        </div>

        {/* Subtitle */}
        <div ref={subRef} style={{ textAlign: "center", marginBottom: 40 }}>
          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "clamp(15px, 1.8vw, 18px)",
              color: "#5A3E2B",
              opacity: 0.75,
              maxWidth: 480,
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Handcrafted Indian pickles made with grandma's recipes,
            cold-pressed oil, and zero preservatives.
          </p>
        </div>

        {/* 3 Pickle Jars */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            gap: "clamp(12px, 3vw, 40px)",
            margin: "0 auto 48px",
            width: "100%",
            maxWidth: 640,
          }}
        >
          {/* Left jar */}
          <div
            ref={jarLeftRef}
            className="float-b"
            style={{
              width: "clamp(100px, 16vw, 170px)",
              transform: "rotate(-6deg)",
              transformOrigin: "bottom center",
              flexShrink: 0,
            }}
          >
            <PickleJar variant="veg" />
          </div>

          {/* Center jar — taller */}
          <div
            ref={jarCenterRef}
            className="float-a"
            style={{
              width: "clamp(120px, 20vw, 210px)",
              transform: "translateY(-20px)",
              flexShrink: 0,
              zIndex: 2,
            }}
          >
            <PickleJar variant="mango" />
          </div>

          {/* Right jar */}
          <div
            ref={jarRightRef}
            className="float-c"
            style={{
              width: "clamp(100px, 16vw, 170px)",
              transform: "rotate(6deg)",
              transformOrigin: "bottom center",
              flexShrink: 0,
            }}
          >
            <PickleJar variant="lime" />
          </div>
        </div>

        {/* CTA */}
        <div ref={ctaRef} style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              background: "#214D34",
              color: "#FAF7F2",
              border: "none",
              borderRadius: 100,
              padding: "15px 36px",
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontWeight: 500,
              fontSize: 15,
              cursor: "pointer",
              letterSpacing: "0.3px",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 24px rgba(33,77,52,0.28)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#7AA33C";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(33,77,52,0.32)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#214D34";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 24px rgba(33,77,52,0.28)";
            }}
          >
            Shop Pickles →
          </button>
          <button
            onClick={() => document.getElementById("our-story")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              background: "transparent",
              color: "#214D34",
              border: "1.5px solid rgba(33,77,52,0.3)",
              borderRadius: 100,
              padding: "15px 36px",
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontWeight: 500,
              fontSize: 15,
              cursor: "pointer",
              letterSpacing: "0.3px",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#214D34";
              e.currentTarget.style.background = "rgba(33,77,52,0.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(33,77,52,0.3)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            Our Story
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          opacity: 0.5,
        }}
      >
        <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, letterSpacing: "2px", color: "#214D34", textTransform: "uppercase" }}>
          Scroll
        </span>
        <div
          style={{
            width: 1,
            height: 40,
            background: "linear-gradient(to bottom, #214D34, transparent)",
            animation: "float-a 1.8s ease-in-out infinite",
          }}
        />
      </div>
    </section>
  );
}
