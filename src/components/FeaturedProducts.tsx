"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const INK = "#1F4A33";
const ACCENT = "#4FB83A";
const CREAM = "#FAF7F2";

type Cat = {
  name: string;
  body: string;
  bg: string;
  badge: string;
  blob: string;
  icon: React.ReactNode;
};

const categories: Cat[] = [
  {
    name: "Traditional Thokkus",
    body: "Rich, flavourful, homemade-style thokkus made with authentic ingredients and traditional methods.",
    bg: "#0F766E",
    badge: "#0A554F",
    blob: "#0A554F",
    icon: (
      <g stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <rect x="7" y="3" width="10" height="3.5" rx="1.2" />
        <path d="M6.5 7h11v11a2 2 0 0 1-2 2H8.5a2 2 0 0 1-2-2z" />
        <path d="M9.5 12h5" />
      </g>
    ),
  },
  {
    name: "Healthy Soup Mixes",
    body: "Quick 5-minute soups packed with natural goodness and comforting flavours.",
    bg: "#1D6FD8",
    badge: "#1551A6",
    blob: "#1551A6",
    icon: (
      <g stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 11h16a8 8 0 0 1-16 0z" />
        <path d="M9 7c0-1.2 1-1.2 1-2.4M13.5 7c0-1.2 1-1.2 1-2.4" />
      </g>
    ),
  },
  {
    name: "Traditional Kulambu Mixes",
    body: "Classic South Indian kulambu blends crafted for everyday homemade cooking.",
    bg: "#C9234A",
    badge: "#991834",
    blob: "#991834",
    icon: (
      <g stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5.5" y="8" width="13" height="10" rx="2" />
        <path d="M3 10.5h2.5M18.5 10.5H21M8 5.5l1 2.5M12 5l.4 3M16 5.5l-1 2.5" />
      </g>
    ),
  },
  {
    name: "Healthy Snacks",
    body: "Nutritious snacks made for mindful eating without compromising on taste.",
    bg: "#E8842B",
    badge: "#BD631A",
    blob: "#BD631A",
    icon: (
      <g stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="8" />
        <circle cx="10" cy="10" r="0.6" fill="#fff" />
        <circle cx="14.5" cy="11" r="0.6" fill="#fff" />
        <circle cx="11" cy="14.5" r="0.6" fill="#fff" />
        <circle cx="14.5" cy="14.8" r="0.6" fill="#fff" />
      </g>
    ),
  },
];

function Card({ c }: { c: Cat }) {
  return (
    <Link href="/products" className="fm-card" aria-label={c.name}>
      <span className="fm-inner" style={{ background: c.bg }} aria-hidden>
        <svg className="fm-blobs" viewBox="0 0 160 160" preserveAspectRatio="xMidYMid slice" aria-hidden>
          <circle cx="26" cy="120" r="40" fill={c.blob} opacity="0.55" />
          <circle cx="70" cy="150" r="26" fill={c.blob} opacity="0.4" />
          <circle cx="6" cy="60" r="22" fill={c.blob} opacity="0.5" />
          <circle cx="54" cy="84" r="10" fill={c.blob} opacity="0.45" />
        </svg>
      </span>
      <span className="fm-badge" style={{ background: c.badge }} aria-hidden>
        <svg width="22" height="22" viewBox="0 0 24 24">
          {c.icon}
        </svg>
      </span>
      <span className="fm-content">
        <span className="fm-title">{c.name}</span>
        <span className="fm-body">{c.body}</span>
        <span className="fm-cta">
          Shop now
          <svg className="fm-arrow" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </span>
    </Link>
  );
}

export default function FeaturedProducts() {
  const sectionRef = useRef<HTMLElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const top = topRef.current;
    const bottom = bottomRef.current;
    if (!section || !top || !bottom) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      top.style.transform = "translateX(0)";
      bottom.style.transform = "translateX(0)";
      return;
    }

    let raf = 0;
    let running = false;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      // Continuous parallax across the whole time the section is on screen:
      // q = 0 when the section's top is at the bottom of the viewport,
      // q = 1 when its bottom has risen to the top of the viewport.
      const q = Math.max(0, Math.min(1, (vh - rect.top) / (vh + rect.height)));
      const A = Math.min(150, window.innerWidth * 0.11);
      // Static stagger so the rows are never perfectly aligned (cascading look):
      // top sits a little left, bottom a little right — even when centered.
      const S = Math.min(120, window.innerWidth * 0.08);
      // x: scroll parallax. -A (left) at entry → +A (right) at exit.
      const x = (q - 0.5) * 2 * A;
      top.style.transform = `translate3d(${x - S / 2}px,0,0)`;
      bottom.style.transform = `translate3d(${-x + S / 2}px,0,0)`;
    };

    // Continuous rAF loop while the section is near the viewport. This follows
    // the real visual scroll position (via getBoundingClientRect) even though
    // Lenis smooth-scroll doesn't emit native window scroll events.
    const tick = () => {
      update();
      if (running) raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !running) {
            running = true;
            raf = requestAnimationFrame(tick);
          } else if (!e.isIntersecting && running) {
            running = false;
            if (raf) cancelAnimationFrame(raf);
            update(); // settle to the final value for this side
          }
        });
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(section);
    update();

    return () => {
      io.disconnect();
      running = false;
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const top = [categories[0], categories[1]];
  const bottom = [categories[2], categories[3]];

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        background: CREAM,
        padding: "clamp(72px,9vw,124px) clamp(20px,5vw,80px)",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            maxWidth: 640,
            margin: "0 auto clamp(40px,6vw,68px)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: ACCENT,
              margin: "0 0 14px",
            }}
          >
            Featured Products
          </p>
          <h2
            style={{
              fontFamily: "var(--font-fraunces), Georgia, serif",
              fontWeight: 700,
              fontStyle: "italic",
              fontVariationSettings: "'opsz' 144, 'SOFT' 100, 'WONK' 1",
              fontSize: "clamp(30px,4.4vw,56px)",
              lineHeight: 1.05,
              letterSpacing: "-1px",
              color: INK,
              margin: 0,
            }}
          >
            Made for every craving.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "clamp(14px,1.1vw,16px)",
              lineHeight: 1.65,
              color: "#4A3728",
              opacity: 0.78,
              margin: "14px auto 0",
              maxWidth: 520,
            }}
          >
            From pantry staples to quick, nourishing meals — a homemade range for
            every part of your day.
          </p>
        </div>

        {/* Top row — slides in from the LEFT as you scroll */}
        <div ref={topRef} className="fm-row" style={{ transform: "translate3d(-160px,0,0)" }}>
          {top.map((c) => (
            <Card key={c.name} c={c} />
          ))}
        </div>

        {/* Bottom row — slides in from the RIGHT as you scroll */}
        <div ref={bottomRef} className="fm-row fm-row-gap" style={{ transform: "translate3d(160px,0,0)" }}>
          {bottom.map((c) => (
            <Card key={c.name} c={c} />
          ))}
        </div>
      </div>

      <style>{`
        .fm-row {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(20px, 2.6vw, 34px);
          padding-top: 14px;          /* room for the badge poking out the top */
          will-change: transform;
        }
        .fm-row-gap { margin-top: clamp(20px, 2.6vw, 34px); }

        .fm-card {
          position: relative;
          display: block;
          border-radius: 18px;
          padding: clamp(24px,3vw,32px) clamp(22px,3vw,30px) clamp(24px,3vw,30px) clamp(96px,11vw,128px);
          min-height: 150px;
          text-decoration: none;
          box-shadow: 0 14px 30px rgba(31,74,51,0.12);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .fm-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 26px 52px rgba(31,74,51,0.2);
        }
        .fm-inner {
          position: absolute;
          inset: 0;
          border-radius: 18px;
          overflow: hidden;
          z-index: 0;
        }
        .fm-blobs {
          position: absolute;
          left: 0;
          top: 0;
          width: clamp(120px, 16vw, 180px);
          height: 100%;
        }
        .fm-badge {
          position: absolute;
          top: -14px;
          left: clamp(20px, 3vw, 28px);
          z-index: 2;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 18px rgba(0,0,0,0.22);
        }
        .fm-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
        }
        .fm-title {
          font-family: var(--font-fraunces), Georgia, serif;
          font-weight: 700;
          font-size: clamp(22px, 2.4vw, 30px);
          line-height: 1.1;
          letter-spacing: -0.4px;
          color: #fff;
          margin-bottom: 8px;
        }
        .fm-body {
          font-family: var(--font-dm-sans), sans-serif;
          font-size: 13.5px;
          line-height: 1.6;
          color: rgba(255,255,255,0.88);
          margin-bottom: 16px;
        }
        .fm-cta {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-family: var(--font-dm-sans), sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #fff;
        }
        .fm-card:hover .fm-arrow { transform: translateX(4px); }
        .fm-arrow { transition: transform 0.25s ease; }

        @media (max-width: 760px) {
          .fm-row { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
