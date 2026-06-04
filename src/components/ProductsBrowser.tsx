"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const INK = "#1F4A33";
const CREAM = "#FFF4D8";
const PANEL = "#1E2422"; // dark info panel

export type ProductCard = {
  id: string;
  name: string;
  tamil?: string;
  slug: string;
  tagline?: string;
  color: string;
  price?: number;
  mrp?: number;
  heroImageUrl?: string;
};

const CATEGORIES = ["All", "Thokku", "Kulambu", "Soup Mixes", "Powders", "Snacks"];

function categoryOf(name: string): string {
  const n = name.toLowerCase();
  if (n.includes("thokku")) return "Thokku";
  if (n.includes("kulambu")) return "Kulambu";
  if (n.includes("soup")) return "Soup Mixes";
  if (n.includes("powder")) return "Powders";
  return "Snacks";
}

// Small descriptor chips shown on the dark panel (no per-product ingredient
// data exists, so we derive a tidy, consistent set).
function tagsOf(name: string): string[] {
  return [categoryOf(name), "Homemade", "Natural"];
}

export default function ProductsBrowser({ products }: { products: ProductCard[] }) {
  const [active, setActive] = useState("All");

  const filtered = useMemo(
    () =>
      active === "All"
        ? products
        : products.filter((p) => categoryOf(p.name) === active),
    [active, products],
  );

  return (
    <>
      {/* Filter pills */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 10,
          flexWrap: "wrap",
          marginBottom: "clamp(28px, 4vw, 48px)",
        }}
      >
        {CATEGORIES.map((t) => {
          const isActive = t === active;
          return (
            <button
              key={t}
              type="button"
              onClick={() => setActive(t)}
              style={{
                padding: "8px 16px",
                borderRadius: 999,
                border: `1px solid ${isActive ? INK : INK + "33"}`,
                background: isActive ? INK : "transparent",
                color: isActive ? CREAM : INK,
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.3px",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {t}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p
          style={{
            textAlign: "center",
            fontFamily: "var(--font-dm-sans), sans-serif",
            color: INK,
            opacity: 0.6,
            padding: "40px 0",
          }}
        >
          No products in this category yet.
        </p>
      ) : (
        <div className="pr-grid">
          {filtered.map((p) => {
            const tags = tagsOf(p.name);
            return (
              <Link key={p.id} href={`/products/${p.slug}`} className="pr-card">
                {/* Image / tinted top */}
                <div
                  className="pr-media"
                  style={{
                    background: `linear-gradient(160deg, ${p.color}33 0%, ${p.color}17 55%, ${p.color}0a 100%), #FBF8F1`,
                  }}
                >
                  {p.heroImageUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={p.heroImageUrl} alt={p.name} className="pr-img" />
                  ) : (
                    <span className="pr-initial" style={{ color: p.color }}>
                      {p.name.slice(0, 1)}
                    </span>
                  )}

                  {/* Free delivery pill */}
                  <span className="pr-deliver">Free shipping over ₹499</span>
                </div>

                {/* Dark info panel */}
                <div className="pr-info">
                  <div className="pr-info-left">
                    <span className="pr-name">{p.name}</span>
                    <span className="pr-tags">
                      {tags.map((t, i) => (
                        <span key={t} className="pr-tag">
                          {i > 0 && <span className="pr-tag-div" aria-hidden />}
                          {t}
                        </span>
                      ))}
                    </span>
                  </div>
                  <div className="pr-info-right">
                    {p.price ? (
                      <span className="pr-price">₹{p.price}</span>
                    ) : (
                      <span className="pr-price pr-soon">Soon</span>
                    )}
                    <span className="pr-order">
                      Order Now
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17L17 7M9 7h8v8" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      <style>{`
        .pr-grid {
          margin-top: 12px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(16px, 2vw, 26px);
        }
        .pr-card {
          display: flex;
          flex-direction: column;
          border-radius: 18px;
          overflow: hidden;
          text-decoration: none;
          background: ${PANEL};
          border: 1px solid rgba(31,74,51,0.10);
          box-shadow: 0 4px 14px rgba(31,74,51,0.07);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .pr-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 22px 44px rgba(31,74,51,0.16);
        }

        /* Media (image / tint) */
        .pr-media {
          position: relative;
          aspect-ratio: 4 / 5;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .pr-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .pr-initial {
          font-family: var(--font-cormorant), Georgia, serif;
          font-style: italic;
          font-weight: 600;
          font-size: clamp(56px, 7vw, 84px);
          opacity: 0.55;
        }
        .pr-deliver {
          position: absolute;
          bottom: 12px;
          left: 50%;
          transform: translateX(-50%);
          white-space: nowrap;
          background: rgba(255,255,255,0.9);
          color: ${INK};
          font-family: var(--font-dm-sans), sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.2px;
          padding: 5px 12px;
          border-radius: 999px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.12);
        }

        /* Dark info panel */
        .pr-info {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 10px;
          padding: 14px 16px 16px;
        }
        .pr-info-left { min-width: 0; }
        .pr-name {
          display: block;
          font-family: var(--font-dm-sans), sans-serif;
          font-weight: 600;
          font-size: clamp(15px, 1.5vw, 18px);
          line-height: 1.2;
          color: #fff;
          letter-spacing: 0.1px;
        }
        .pr-tags {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          margin-top: 7px;
        }
        .pr-tag {
          display: inline-flex;
          align-items: center;
          font-family: var(--font-dm-sans), sans-serif;
          font-size: 9.5px;
          font-weight: 500;
          letter-spacing: 0.3px;
          color: rgba(255,255,255,0.6);
        }
        .pr-tag-div {
          display: inline-block;
          width: 1px;
          height: 9px;
          background: rgba(255,255,255,0.25);
          margin: 0 7px;
        }
        .pr-info-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          flex-shrink: 0;
        }
        .pr-price {
          font-family: var(--font-dm-sans), sans-serif;
          font-size: clamp(19px, 2vw, 24px);
          font-weight: 800;
          color: #fff;
          line-height: 1;
          letter-spacing: -0.3px;
        }
        .pr-soon { font-size: 13px; opacity: 0.7; font-weight: 600; }
        .pr-order {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          margin-top: 7px;
          font-family: var(--font-dm-sans), sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.2px;
          color: rgba(255,255,255,0.55);
          transition: gap 0.2s ease, color 0.2s ease;
        }
        .pr-card:hover .pr-order { gap: 7px; color: rgba(255,255,255,0.9); }

        @media (max-width: 1100px) { .pr-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 760px)  { .pr-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 420px)  { .pr-grid { grid-template-columns: 1fr; } }
      `}</style>
    </>
  );
}
