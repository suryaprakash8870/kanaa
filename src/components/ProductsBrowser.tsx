"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const INK = "#1F4A33";
const CREAM = "#FFF4D8";

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

/* Playful pastel arches, cycled by position — the signature of the reference. */
const PALETTE = [
  { arch: "#C8E6A9", pill: "#A9D684", text: "#2E4A1C" }, // green
  { arch: "#FBE6A2", pill: "#F4D277", text: "#5A4711" }, // butter
  { arch: "#F7C9D6", pill: "#F0A3B8", text: "#6B2233" }, // blush
  { arch: "#F4A79C", pill: "#EC8175", text: "#6E251C" }, // coral
  { arch: "#D9C6EE", pill: "#C2A7E4", text: "#3F2A63" }, // lilac
  { arch: "#A9DBE0", pill: "#7FC8CF", text: "#1B4A4F" }, // teal
];

const PER_PAGE = 8;

export default function ProductsBrowser({ products }: { products: ProductCard[] }) {
  const [active, setActive] = useState("All");
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () =>
      active === "All"
        ? products
        : products.filter((p) => categoryOf(p.name) === active),
    [active, products],
  );

  // Reset to first page whenever the filter changes.
  useEffect(() => setPage(1), [active]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * PER_PAGE;
  const pageItems = filtered.slice(start, start + PER_PAGE);

  return (
    <>
      {/* Filter pills */}
      <div className="ws-filters">
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
        <p className="ws-empty">No products in this category yet.</p>
      ) : (
        <>
          <div className="ws-grid">
            {pageItems.map((p, i) => {
              const c = PALETTE[(start + i) % PALETTE.length];
              return (
                <article
                  className="ws-card"
                  key={p.id}
                  style={{ animationDelay: `${i * 70}ms` }}
                >
                  <Link href={`/products/${p.slug}`} className="ws-arch-link" aria-label={p.name}>
                    <div className="ws-arch" style={{ background: c.arch }}>
                      {/* Hand-drawn doodle pattern — fades in on hover. */}
                      <svg
                        className="ws-doodle"
                        viewBox="0 0 220 280"
                        preserveAspectRatio="xMidYMid slice"
                        aria-hidden
                      >
                        <defs>
                          <pattern
                            id={`dd-${p.id}`}
                            width="50"
                            height="50"
                            patternUnits="userSpaceOnUse"
                            patternTransform="rotate(12)"
                          >
                            <g fill="none" stroke={c.text} strokeWidth="2" strokeOpacity="0.5">
                              <circle cx="25" cy="25" r="5" />
                              <circle cx="25" cy="25" r="12" />
                              <circle cx="25" cy="25" r="19" />
                            </g>
                          </pattern>
                        </defs>
                        <rect width="220" height="280" fill={`url(#dd-${p.id})`} />
                      </svg>

                      {p.heroImageUrl ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img src={p.heroImageUrl} alt={p.name} className="ws-jar" />
                      ) : (
                        <span className="ws-initial">{p.name.slice(0, 1)}</span>
                      )}
                    </div>
                    {p.mrp && p.price && p.mrp > p.price && (
                      <span className="ws-save">Save ₹{p.mrp - p.price}</span>
                    )}
                  </Link>

                  <Link href={`/products/${p.slug}`} className="ws-meta">
                    <h3 className="ws-name">{p.name}</h3>
                    {p.price ? (
                      <span className="ws-price">
                        ₹{p.price}
                        {p.mrp && p.mrp > p.price && (
                          <span className="ws-mrp">₹{p.mrp}</span>
                        )}
                      </span>
                    ) : (
                      <span className="ws-price ws-soon">Coming soon</span>
                    )}
                  </Link>

                  <Link
                    href={`/products/${p.slug}`}
                    className="ws-buy"
                    style={{ background: c.pill, color: c.text }}
                  >
                    Buy Now!
                  </Link>
                </article>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav className="ws-pager" aria-label="Product pages">
              <button
                type="button"
                className="ws-pg ws-pg-arrow"
                disabled={safePage === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                aria-label="Previous page"
              >
                ‹
              </button>
              {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((n) => (
                <button
                  key={n}
                  type="button"
                  className={`ws-pg${n === safePage ? " ws-pg-on" : ""}`}
                  onClick={() => setPage(n)}
                  aria-current={n === safePage ? "page" : undefined}
                >
                  {n}
                </button>
              ))}
              <button
                type="button"
                className="ws-pg ws-pg-arrow"
                disabled={safePage === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                aria-label="Next page"
              >
                ›
              </button>
            </nav>
          )}
        </>
      )}

      <style>{`
        .ws-filters {
          display: flex;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: clamp(36px, 5vw, 60px);
        }
        .ws-empty {
          text-align: center;
          font-family: var(--font-dm-sans), sans-serif;
          color: ${INK};
          opacity: 0.6;
          padding: 40px 0;
        }

        .ws-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(24px, 3vw, 44px) clamp(18px, 2.4vw, 34px);
        }

        .ws-card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          opacity: 0;
          transform: translateY(26px);
          animation: wsIn 0.7s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        /* Gentle editorial stagger, echoing the reference's offset rhythm. */
        .ws-card:nth-child(even) { margin-top: clamp(20px, 4vw, 52px); }

        .ws-arch-link { display: block; position: relative; width: 100%; text-decoration: none; }
        .ws-arch {
          position: relative;
          width: 100%;
          aspect-ratio: 3 / 4;
          border-radius: clamp(70px, 11vw, 120px) clamp(70px, 11vw, 120px) 34px 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          /* Subtle base shadow keeps every arch defined on the mint page —
             including the green one, which would otherwise blend in. */
          box-shadow: 0 10px 26px rgba(31,74,51,0.10);
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease;
        }
        .ws-arch-link:hover .ws-arch {
          transform: translateY(-8px);
          box-shadow: 0 26px 50px rgba(31,74,51,0.18);
        }
        .ws-doodle {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          opacity: 0;
          transform: scale(1.08);
          transition: opacity 0.45s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1);
        }
        .ws-arch-link:hover .ws-doodle { opacity: 1; transform: scale(1); }
        .ws-jar {
          position: relative;
          z-index: 1;
          width: 72%;
          height: 86%;
          object-fit: contain;
          filter: drop-shadow(0 18px 26px rgba(31,74,51,0.28));
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
        }
        .ws-arch-link:hover .ws-jar { transform: scale(1.05) rotate(-2deg); }
        .ws-initial { position: relative; z-index: 1; }
        .ws-initial {
          font-family: var(--font-dm-serif), Georgia, serif;
          font-size: clamp(64px, 9vw, 110px);
          color: rgba(31,74,51,0.35);
        }
        .ws-save {
          position: absolute;
          top: 14px;
          right: 14px;
          z-index: 2;
          white-space: nowrap;
          background: rgba(255,255,255,0.92);
          color: ${INK};
          font-family: var(--font-dm-sans), sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.3px;
          padding: 5px 10px;
          border-radius: 999px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.10);
        }

        .ws-meta { display: block; text-decoration: none; margin-top: 18px; }
        .ws-name {
          font-family: var(--font-dm-serif), Georgia, serif;
          font-weight: 400;
          font-size: clamp(22px, 2.2vw, 30px);
          line-height: 1.04;
          color: ${INK};
          margin: 0;
          letter-spacing: -0.4px;
        }
        .ws-price {
          display: inline-flex;
          align-items: baseline;
          gap: 8px;
          margin-top: 8px;
          font-family: var(--font-dm-sans), sans-serif;
          font-size: clamp(15px, 1.4vw, 18px);
          font-weight: 600;
          color: ${INK};
          opacity: 0.85;
        }
        .ws-mrp {
          font-size: 0.8em;
          font-weight: 500;
          text-decoration: line-through;
          opacity: 0.45;
        }
        .ws-soon { opacity: 0.55; font-weight: 500; font-size: 14px; }

        .ws-buy {
          display: inline-block;
          margin-top: 16px;
          padding: 11px 26px;
          border-radius: 999px;
          font-family: var(--font-dm-sans), sans-serif;
          font-weight: 700;
          font-size: 12px;
          letter-spacing: 1.4px;
          text-transform: uppercase;
          text-decoration: none;
          box-shadow: 0 6px 16px rgba(31,74,51,0.12);
          transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
        }
        .ws-buy:hover {
          transform: translateY(-2px);
          filter: brightness(0.96);
          box-shadow: 0 12px 24px rgba(31,74,51,0.2);
        }

        /* Pagination */
        .ws-pager {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: clamp(48px, 7vw, 84px);
        }
        .ws-pg {
          min-width: 42px;
          height: 42px;
          padding: 0 12px;
          border-radius: 999px;
          border: 1px solid ${INK}2A;
          background: transparent;
          color: ${INK};
          font-family: var(--font-dm-sans), sans-serif;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .ws-pg:hover:not(:disabled) { background: ${INK}12; }
        .ws-pg-on { background: ${INK}; color: ${CREAM}; border-color: ${INK}; }
        .ws-pg-on:hover { background: ${INK}; }
        .ws-pg-arrow { font-size: 20px; line-height: 1; }
        .ws-pg:disabled { opacity: 0.35; cursor: default; }

        @keyframes wsIn {
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 1100px) { .ws-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 760px) {
          .ws-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 460px) {
          .ws-grid { grid-template-columns: 1fr 1fr; gap: 18px; }
          .ws-card:nth-child(even) { margin-top: 24px; }
          .ws-buy { padding: 9px 18px; font-size: 11px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ws-card { animation: none; opacity: 1; transform: none; }
        }
      `}</style>
    </>
  );
}
