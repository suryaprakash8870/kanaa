"use client";

import { useState } from "react";
import Link from "next/link";

const INK = "#1F4A33";
const CLAY = "#C0301F";
const ACCENT = "#4FB83A";
const CREAM = "#FFF4D8";

const SERIF = "var(--font-dm-serif), Georgia, serif";
const SANS = "var(--font-dm-sans), sans-serif";

/**
 * Product hero with a circular "plate" and a manual carousel.
 *
 * Uses existing images as placeholders for now. When real cut-out product
 * shots arrive, swap the `img` paths below (and we can add the auto-rotation
 * animation on top of the existing Previous/Next + dot controls).
 */
type Slide = {
  name: string;
  tag: string;
  price: number;
  mrp?: number;
  img: string;
  desc: string;
};

const SLIDES: Slide[] = [
  {
    name: "Pirandai Thokku",
    tag: "Thokku",
    price: 199,
    mrp: 249,
    img: "/login/left.png",
    desc: "A traditional homemade thokku, slow-cooked with wholesome ingredients — rich, tangy and ready to lift any meal.",
  },
  {
    name: "Garlic Kulambu Mix",
    tag: "Kulambu",
    price: 219,
    img: "/hero-bg.jpg",
    desc: "Our nourishing kulambu base — real spices, no shortcuts. A warm, comforting gravy in minutes on a busy day.",
  },
  {
    name: "Curry Leaf Podi",
    tag: "Powders",
    price: 179,
    mrp: 219,
    img: "/story/story1.png",
    desc: "Sun-dried curry leaves ground into a fragrant podi — sprinkle over rice with a spoon of ghee for instant comfort.",
  },
];

function Leaf({ className }: { className: string }) {
  return (
    <svg className={className} width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden>
      <path
        d="M34 6C16 6 6 16 6 34c18 0 28-10 28-28Z"
        fill={ACCENT}
        fillOpacity="0.9"
      />
      <path d="M30 10C20 18 14 24 10 32" stroke="#2E7D32" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export default function ProductHero() {
  const [active, setActive] = useState(0);
  const s = SLIDES[active];

  const go = (i: number) => setActive((i + SLIDES.length) % SLIDES.length);

  return (
    <section className="ph-wrap">
      <div className="ph-inner">
        {/* Left: product info */}
        <div className="ph-left">
          <p className="ph-eyebrow">Featured · Homemade</p>

          <div key={`t-${active}`} className="ph-fade">
            <h1 className="ph-title">{s.name}</h1>
            <div className="ph-price">
              ₹{s.price}
              {s.mrp && s.mrp > s.price && <span className="ph-mrp">₹{s.mrp}</span>}
            </div>
            <p className="ph-desc">{s.desc}</p>
          </div>

          <div className="ph-actions">
            <span className="ph-tag">{s.tag}</span>
            <Link href="/products" className="ph-order">
              Order Now
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>

          {/* carousel controls */}
          <div className="ph-nav">
            <button type="button" onClick={() => go(active - 1)} className="ph-arrow" aria-label="Previous">‹ Prev</button>
            <div className="ph-dots">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => go(i)}
                  className={`ph-dot${i === active ? " ph-dot-on" : ""}`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
            <button type="button" onClick={() => go(active + 1)} className="ph-arrow" aria-label="Next">Next ›</button>
          </div>

          <div className="ph-badge">
            <span className="ph-avatar">K</span>
            <div>
              <span className="ph-badge-k">Best seller</span>
              <span className="ph-badge-v">Handmade by Kanaa</span>
            </div>
          </div>
        </div>

        {/* Right: circular plate + carousel */}
        <div className="ph-right">
          {/* dotted arc */}
          <svg className="ph-arc" viewBox="0 0 500 500" fill="none" aria-hidden>
            <circle cx="250" cy="250" r="232" stroke={INK} strokeOpacity="0.18" strokeWidth="2" strokeDasharray="2 12" strokeLinecap="round" />
          </svg>

          <div className="ph-circle">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img key={`i-${active}`} className="ph-photo" src={s.img} alt={s.name} />
          </div>

          {/* floating leaves */}
          <Leaf className="ph-leaf ph-leaf-1" />
          <Leaf className="ph-leaf ph-leaf-2" />
          <Leaf className="ph-leaf ph-leaf-3" />

          {/* slide thumbnails along the arc */}
          <div className="ph-thumbs">
            {SLIDES.map((sl, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                className={`ph-thumb${i === active ? " ph-thumb-on" : ""}`}
                aria-label={sl.name}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={sl.img} alt="" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .ph-wrap {
          margin-top: 96px;
          min-height: calc(100vh - 96px);
          display: flex;
          align-items: center;
          background:
            radial-gradient(120% 90% at 80% 30%, #EAF4E1 0%, #F6F2E8 55%, #FAF7F2 100%);
          overflow: hidden;
        }
        .ph-inner {
          width: 100%;
          max-width: 1240px;
          margin: 0 auto;
          padding: clamp(24px, 4vw, 56px) clamp(20px, 5vw, 60px);
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(24px, 4vw, 56px);
          align-items: center;
        }

        /* Left */
        .ph-eyebrow {
          font-family: ${SANS};
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: ${CLAY};
          margin: 0 0 14px;
        }
        .ph-title {
          font-family: ${SERIF};
          font-weight: 400;
          font-size: clamp(40px, 6vw, 72px);
          line-height: 1.02;
          color: ${INK};
          margin: 0 0 10px;
          letter-spacing: -1px;
        }
        .ph-price {
          font-family: ${SANS};
          font-weight: 800;
          font-size: clamp(24px, 3vw, 34px);
          color: ${CLAY};
          display: flex;
          align-items: baseline;
          gap: 10px;
          margin-bottom: 16px;
        }
        .ph-mrp { font-size: 0.6em; font-weight: 600; color: ${INK}; opacity: 0.4; text-decoration: line-through; }
        .ph-desc {
          font-family: ${SANS};
          font-size: clamp(14px, 1.2vw, 16px);
          line-height: 1.7;
          color: ${INK};
          opacity: 0.72;
          max-width: 440px;
          margin: 0 0 26px;
        }
        .ph-fade { animation: phFade 0.5s cubic-bezier(0.16,1,0.3,1); }

        .ph-actions { display: flex; align-items: center; gap: 14px; margin-bottom: 30px; }
        .ph-tag {
          font-family: ${SANS};
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          color: ${INK};
          background: #fff;
          border: 1.5px solid ${INK}22;
          border-radius: 100px;
          padding: 11px 20px;
        }
        .ph-order {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: ${ACCENT};
          color: #fff;
          text-decoration: none;
          border-radius: 100px;
          padding: 12px 26px;
          font-family: ${SANS};
          font-weight: 700;
          font-size: 14px;
          box-shadow: 0 10px 24px rgba(79,184,58,0.32);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .ph-order:hover { transform: translateY(-2px); box-shadow: 0 16px 32px rgba(79,184,58,0.4); }

        .ph-nav { display: flex; align-items: center; gap: 18px; margin-bottom: 34px; }
        .ph-arrow {
          background: none; border: none; cursor: pointer;
          font-family: ${SANS}; font-size: 13px; font-weight: 700;
          letter-spacing: 0.5px; color: ${INK}; opacity: 0.75;
          padding: 4px 0; transition: opacity 0.2s ease;
        }
        .ph-arrow:hover { opacity: 1; }
        .ph-dots { display: flex; gap: 8px; }
        .ph-dot {
          width: 9px; height: 9px; border-radius: 99px; border: none; cursor: pointer;
          background: ${INK}33; transition: all 0.25s ease;
        }
        .ph-dot-on { width: 26px; background: ${ACCENT}; }

        .ph-badge { display: inline-flex; align-items: center; gap: 12px; }
        .ph-avatar {
          width: 42px; height: 42px; border-radius: 99px;
          background: ${INK}; color: ${CREAM};
          display: inline-flex; align-items: center; justify-content: center;
          font-family: ${SERIF}; font-size: 20px;
        }
        .ph-badge-k { display: block; font-family: ${SANS}; font-weight: 700; font-size: 13px; color: ${INK}; }
        .ph-badge-v { display: block; font-family: ${SANS}; font-size: 12px; color: ${INK}; opacity: 0.55; }

        /* Right */
        .ph-right { position: relative; aspect-ratio: 1 / 1; display: flex; align-items: center; justify-content: center; }
        .ph-arc { position: absolute; inset: -4%; width: 108%; height: 108%; animation: phSpin 60s linear infinite; }
        .ph-circle {
          position: relative;
          width: 84%;
          aspect-ratio: 1 / 1;
          border-radius: 50%;
          overflow: hidden;
          background: radial-gradient(circle at 50% 35%, #DCEFD0, #BFE0AE);
          box-shadow: 0 40px 80px rgba(31,74,51,0.22), inset 0 0 0 14px rgba(255,255,255,0.5);
        }
        .ph-photo {
          width: 100%; height: 100%; object-fit: cover; display: block;
          animation: phPlate 0.6s cubic-bezier(0.16,1,0.3,1);
        }
        .ph-leaf { position: absolute; filter: drop-shadow(0 8px 12px rgba(31,74,51,0.2)); }
        .ph-leaf-1 { top: 2%; right: 14%; transform: rotate(20deg); animation: phFloat 5s ease-in-out infinite; }
        .ph-leaf-2 { bottom: 8%; left: 2%; transform: rotate(-30deg) scale(1.3); animation: phFloat 6.5s ease-in-out infinite 0.6s; }
        .ph-leaf-3 { bottom: 22%; right: 0%; transform: rotate(120deg) scale(0.8); animation: phFloat 5.8s ease-in-out infinite 1.1s; }

        .ph-thumbs { position: absolute; right: -2%; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; gap: 12px; }
        .ph-thumb {
          width: 58px; height: 58px; border-radius: 50%; overflow: hidden; cursor: pointer;
          border: 2.5px solid #fff; background: #DCEFD0; padding: 0;
          box-shadow: 0 8px 18px rgba(31,74,51,0.18);
          transition: transform 0.2s ease, border-color 0.2s ease;
        }
        .ph-thumb img { width: 100%; height: 100%; object-fit: cover; }
        .ph-thumb:hover { transform: scale(1.08); }
        .ph-thumb-on { border-color: ${ACCENT}; transform: scale(1.12); }

        @keyframes phFade { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
        @keyframes phPlate { from { opacity: 0; transform: scale(0.9) rotate(-6deg); } to { opacity: 1; transform: none; } }
        @keyframes phFloat { 0%,100% { translate: 0 0; } 50% { translate: 0 -12px; } }
        @keyframes phSpin { to { transform: rotate(360deg); } }

        @media (max-width: 900px) {
          .ph-inner { grid-template-columns: 1fr; gap: 12px; }
          .ph-right { order: -1; max-width: 420px; margin: 0 auto; width: 100%; }
          .ph-thumbs { right: 2%; }
        }
        @media (max-width: 540px) {
          .ph-thumb { width: 46px; height: 46px; }
          .ph-leaf { display: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ph-arc, .ph-leaf, .ph-fade, .ph-photo { animation: none; }
        }
      `}</style>
    </section>
  );
}
