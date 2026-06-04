"use client";

import { useEffect, useRef } from "react";
import SectionWave from "./SectionWave";

const steps = [
  {
    number: "01",
    chip: "Homemade Taste",
    title: "Tastes just like home.",
    body:
      "Crafted with traditional recipes inspired by authentic South Indian home cooking.",
    image:
      "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=1200&q=80&auto=format&fit=crop",
    accent: "#C9A24A",
  },
  {
    number: "02",
    chip: "Healthy Ingredients",
    title: "Wholesome by design.",
    body:
      "Made using carefully selected ingredients without compromising on quality or flavour.",
    image:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=1200&q=80&auto=format&fit=crop",
    accent: "#8C6820",
  },
  {
    number: "03",
    chip: "Quick & Convenient",
    title: "Ready in minutes.",
    body:
      "Designed for busy lifestyles with easy-to-prepare products that save time.",
    image:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1200&q=80&auto=format&fit=crop",
    accent: "#3D5A2D",
  },
  {
    number: "04",
    chip: "Comfort in Every Meal",
    title: "Comfort, every day.",
    body:
      "Food that feels warm, familiar, nourishing, and satisfying every single day.",
    image:
      "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=1200&q=80&auto=format&fit=crop",
    accent: "#B8420F",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const blocks = section.querySelectorAll<HTMLElement>(".process-step");

    // Initial state via inline style (NOT opacity 0 — safety)
    blocks.forEach((b, i) => {
      if (i === 0) return;
      b.style.opacity = "0";
      b.style.transform = "translateY(60px)";
      b.style.transition =
        "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)";
    });

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.18 },
    );
    blocks.forEach((b) => obs.observe(b));

    // Safety net: force show after 3s
    const t = setTimeout(() => {
      blocks.forEach((b) => {
        b.style.opacity = "1";
        b.style.transform = "translateY(0)";
      });
    }, 3000);

    return () => {
      obs.disconnect();
      clearTimeout(t);
    };
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      style={{
        position: "relative",
        background: "#DFF0D8",
        padding: "clamp(72px, 10vw, 130px) clamp(20px, 5vw, 80px)",
        overflow: "hidden",
      }}
    >
      <SectionWave color="#DFF0D8" position="bottom" />

      {/* Decorative squiggle doodles — fills as you scroll through the section */}
      <ProcessDoodles sectionRef={sectionRef} />

      <div style={{ maxWidth: 1180, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "clamp(56px, 7vw, 96px)" }}>
          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#1F4A33",
              opacity: 0.7,
              marginBottom: 12,
            }}
          >
            Why Kanaa
          </p>
          <h2
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontWeight: 700,
              fontSize: "clamp(36px, 5vw, 64px)",
              color: "#1F4A33",
              letterSpacing: "-1.2px",
              lineHeight: 1.02,
              margin: 0,
            }}
          >
            Made for{" "}
            <span style={{ fontStyle: "italic", color: "#4FB83A" }}>everyday living.</span>
          </h2>
          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "clamp(15px, 1.2vw, 17px)",
              color: "#1F4A33",
              opacity: 0.8,
              lineHeight: 1.65,
              marginTop: 18,
              maxWidth: 500,
              marginInline: "auto",
            }}
          >
            Homemade taste, healthy ingredients, and everyday convenience —
            crafted to bring comfort to every meal.
          </p>
        </div>

        {/* Steps — vertical timeline */}
        <div style={{ position: "relative" }}>
          {/* Dashed timeline line */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 40,
              bottom: 40,
              width: 2,
              background:
                "repeating-linear-gradient(to bottom, rgba(31,74,51,0.35) 0 8px, transparent 8px 16px)",
              transform: "translateX(-1px)",
            }}
            className="timeline-line"
          />

          {steps.map((s, i) => {
            const imageLeft = i % 2 === 0;
            return (
              <div
                key={i}
                className="process-step"
                style={{
                  position: "relative",
                  display: "grid",
                  gridTemplateColumns: "1fr 80px 1fr",
                  alignItems: "center",
                  gap: "clamp(20px, 3vw, 48px)",
                  marginBottom: i < steps.length - 1 ? "clamp(60px, 8vw, 110px)" : 0,
                }}
              >
                {/* Image side */}
                <div
                  style={{
                    gridColumn: imageLeft ? 1 : 3,
                    order: imageLeft ? 0 : 2,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      maxWidth: 420,
                      aspectRatio: "4 / 3",
                      borderRadius: 18,
                      overflow: "hidden",
                      boxShadow:
                        "0 24px 52px rgba(33,77,52,0.16), 0 6px 16px rgba(33,77,52,0.08)",
                      transform: imageLeft ? "rotate(-2deg)" : "rotate(2deg)",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={s.image}
                      alt={s.chip}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </div>
                </div>

                {/* Center number bubble */}
                <div
                  style={{
                    gridColumn: 2,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    order: 1,
                  }}
                >
                  <div
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: "50%",
                      background: s.accent,
                      color: "#FBF0D5",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--font-playfair), serif",
                      fontWeight: 800,
                      fontSize: 26,
                      letterSpacing: "-0.5px",
                      boxShadow: `0 10px 24px ${s.accent}55`,
                      border: "3px solid #DFF0D8",
                      position: "relative",
                      zIndex: 2,
                    }}
                  >
                    {s.number}
                  </div>
                </div>

                {/* Text side */}
                <div
                  style={{
                    gridColumn: imageLeft ? 3 : 1,
                    order: imageLeft ? 2 : 0,
                    textAlign: imageLeft ? "left" : "right",
                    padding: "0 8px",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: "3px",
                      textTransform: "uppercase",
                      color: s.accent,
                      marginBottom: 12,
                    }}
                  >
                    {s.chip}
                  </p>
                  <h3
                    style={{
                      fontFamily: "var(--font-playfair), serif",
                      fontWeight: 700,
                      fontSize: "clamp(24px, 2.8vw, 36px)",
                      color: "#1F4A33",
                      letterSpacing: "-0.6px",
                      lineHeight: 1.12,
                      margin: 0,
                    }}
                  >
                    {s.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "clamp(14px, 1.1vw, 16px)",
                      color: "#1F4A33",
                      lineHeight: 1.7,
                      marginTop: 14,
                      maxWidth: 420,
                      opacity: 0.82,
                      marginLeft: imageLeft ? 0 : "auto",
                    }}
                  >
                    {s.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .process-step {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
            text-align: center !important;
          }
          .process-step > div:nth-child(1),
          .process-step > div:nth-child(3) {
            grid-column: 1 !important;
            order: unset !important;
            text-align: center !important;
          }
          .process-step > div:nth-child(3) p {
            margin-left: auto !important;
            margin-right: auto !important;
            text-align: center !important;
          }
          .timeline-line {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}

function ProcessDoodles({ sectionRef }: { sectionRef: React.RefObject<HTMLDivElement | null> }) {
  const stroke = "#1F4A33";
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const p = pathRef.current;
    if (!section || !p) return;

    const len = p.getTotalLength();
    p.style.strokeDasharray = `${len}`;
    p.style.strokeDashoffset = `${len}`;

    let ticking = false;
    let inView = false;

    const update = () => {
      ticking = false;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress: 0 when section top reaches bottom of viewport,
      // 1 when section bottom reaches top of viewport.
      const total = rect.height + vh;
      const travelled = vh - rect.top;
      let t = travelled / total;
      // start drawing a bit later and finish a bit sooner for a nicer feel
      t = (t - 0.1) / 0.8;
      if (t < 0) t = 0;
      if (t > 1) t = 1;
      p.style.strokeDashoffset = `${len * (1 - t)}`;
    };

    const onScroll = () => {
      if (!inView || ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          inView = e.isIntersecting;
          if (inView) update();
        });
      },
      { threshold: 0 },
    );
    io.observe(section);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sectionRef]);

  const d =
    "M -80 120 C 180 60, 260 300, 120 420 C -20 540, 140 720, 340 680 C 540 640, 620 860, 460 1000 C 300 1140, 500 1300, 720 1240 C 940 1180, 1020 1360, 860 1520 C 700 1680, 900 1840, 700 1960 C 520 2080, 380 2140, 420 2260 C 440 2340, 480 2400, 500 2500";

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
        <path
          ref={pathRef}
          d={d}
          fill="none"
          stroke={stroke}
          strokeOpacity="0.18"
          strokeWidth="90"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
