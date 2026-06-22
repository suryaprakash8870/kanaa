import type { CSSProperties } from "react";
import { getPayload } from "payload";
import config from "@/payload/payload.config";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const revalidate = 300;
export const metadata = {
  title: "Stories, Recipes & Healthy Living — Kanaa",
  description:
    "Healthy food ideas, traditional recipes, wellness tips, and stories inspired by homemade South Indian cooking.",
};

const INK = "#1F4A33";
const RED = "#C0301F";

const PALETTES = [
  { bg: "#214D34", accent: "#A8D5B5" },
  { bg: "#8B1F3A", accent: "#F4B8C8" },
  { bg: "#6B4022", accent: "#E8C9A8" },
  { bg: "#3D5A2D", accent: "#B5D4A0" },
  { bg: "#5F3D8A", accent: "#D4C0F4" },
];

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  author?: string | null;
  publishedAt?: string | null;
  readTime?: number | null;
  tags?: { tag: string }[] | null;
  featuredImage?: { url?: string } | null;
};

async function loadPosts(): Promise<Post[]> {
  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "posts",
      where: { status: { equals: "published" } },
      sort: "-publishedAt",
      limit: 20,
    });
    return docs as unknown as Post[];
  } catch (err) {
    // DB unreachable (e.g. paused Supabase project) — degrade gracefully
    // instead of crashing the whole route.
    console.error("[blog] failed to load posts:", err instanceof Error ? err.message : err);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await loadPosts();
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <>
      <Navbar />
      <div style={{ height: 96 }} />

      <main style={{ background: "#FAF7F2", minHeight: "100vh" }}>
        {/* ── MASTHEAD ── */}
        <div
          className="blog-masthead"
          style={{
            background: INK,
            padding:
              "clamp(56px,9vw,120px) clamp(20px,6vw,88px) clamp(64px,9vw,120px)",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "clamp(520px, 78vh, 800px)",
          }}
        >
          {/* Concentric ring ornaments (centered, faint) */}
          {([520, 760, 1000] as number[]).map((size) => (
            <div
              key={size}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%,-50%)",
                width: size,
                height: size,
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.045)",
                pointerEvents: "none",
              }}
            />
          ))}

          {/* Decorative side images — drop your art at /public/blog/left.png
              and /public/blog/right.png. They bleed off the left & right edges
              behind the text. A missing file simply renders nothing (no broken
              icon), so the masthead looks clean until you add them. */}
          <div
            aria-hidden
            className="blog-side blog-side-left"
            style={{ backgroundImage: "url(/blog/left.png)" }}
          />
          <div
            aria-hidden
            className="blog-side blog-side-right"
            style={{ backgroundImage: "url(/blog/right.png)" }}
          />

          <div
            style={{
              maxWidth: 760,
              margin: "0 auto",
              position: "relative",
              zIndex: 3,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "5px",
                color: "#A8D5B5",
                textTransform: "uppercase",
                marginBottom: 20,
              }}
            >
              The Kanaa Journal
            </p>

            <h1
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(56px,10vw,130px)",
                color: "#FAF7F2",
                margin: "0 0 28px",
                lineHeight: 0.88,
                letterSpacing: "-2px",
              }}
            >
              Stories, Recipes<br />&amp; Healthy Living.
            </h1>

            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "clamp(13px,1.4vw,15px)",
                color: "rgba(250,247,242,0.55)",
                maxWidth: 440,
                lineHeight: 1.8,
                margin: "0 auto",
              }}
            >
              Explore healthy food ideas, traditional recipes, wellness tips, and
              stories inspired by homemade South Indian cooking.
            </p>
          </div>
        </div>

        {/* ── BODY ── */}
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding:
              "clamp(40px,6vw,80px) clamp(20px,5vw,48px) clamp(72px,10vw,140px)",
          }}
        >
          {posts.length === 0 && (
            <p
              style={{
                textAlign: "center",
                color: INK,
                opacity: 0.42,
                fontFamily: "var(--font-dm-sans)",
                fontSize: 15,
                padding: "80px 0",
              }}
            >
              No stories yet — check back soon.
            </p>
          )}

          {/* ── FEATURED ── */}
          {featured && (
            <Link
              href={`/blog/${featured.slug}`}
              className="featured-card"
              style={{ textDecoration: "none", display: "block", marginBottom: "clamp(40px,5vw,64px)" }}
            >
              <div className="featured-inner">
                {/* Left panel */}
                <div
                  className="featured-visual"
                  style={{
                    background: featured.featuredImage?.url
                      ? `url(${featured.featuredImage.url}) center/cover`
                      : PALETTES[0].bg,
                    position: "relative",
                    overflow: "hidden",
                    minHeight: "clamp(240px,28vw,400px)",
                  }}
                >
                  {!featured.featuredImage?.url && (
                    <>
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: "var(--font-cormorant), Georgia, serif",
                          fontStyle: "italic",
                          fontWeight: 700,
                          fontSize: "clamp(100px,18vw,220px)",
                          color: "rgba(255,255,255,0.06)",
                          lineHeight: 1,
                          userSelect: "none",
                          letterSpacing: -4,
                        }}
                      >
                        {featured.title.charAt(0)}
                      </div>
                      <div
                        style={{
                          position: "absolute",
                          bottom: 28,
                          left: 28,
                          display: "flex",
                          gap: 8,
                        }}
                      >
                        {[18, 12, 8, 5].map((s, i) => (
                          <div
                            key={i}
                            style={{
                              width: s,
                              height: s,
                              borderRadius: "50%",
                              background: PALETTES[0].accent,
                              opacity: 0.55,
                            }}
                          />
                        ))}
                      </div>
                    </>
                  )}
                  <div
                    style={{
                      position: "absolute",
                      top: 20,
                      left: 20,
                      background: "rgba(255,255,255,0.13)",
                      backdropFilter: "blur(8px)",
                      borderRadius: 100,
                      padding: "5px 14px",
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: 9,
                      fontWeight: 700,
                      letterSpacing: "2.5px",
                      textTransform: "uppercase",
                      color: "#FAF7F2",
                    }}
                  >
                    Featured
                  </div>
                </div>

                {/* Right panel */}
                <div
                  style={{
                    background: "#fff",
                    padding: "clamp(28px,4vw,56px)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  {(featured.tags ?? []).length > 0 && (
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 18 }}>
                      {(featured.tags ?? []).slice(0, 3).map((t, i) => (
                        <span
                          key={i}
                          style={{
                            fontSize: 9,
                            fontWeight: 700,
                            letterSpacing: "2px",
                            textTransform: "uppercase",
                            color: RED,
                            background: "#FEF2F2",
                            padding: "4px 10px",
                            borderRadius: 100,
                            fontFamily: "var(--font-dm-sans)",
                          }}
                        >
                          {t.tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <h2
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontStyle: "italic",
                      fontWeight: 400,
                      fontSize: "clamp(28px,4vw,48px)",
                      color: INK,
                      margin: "0 0 16px",
                      lineHeight: 1.08,
                    }}
                  >
                    {featured.title}
                  </h2>

                  {featured.excerpt && (
                    <p
                      style={{
                        fontFamily: "var(--font-dm-sans)",
                        fontSize: "clamp(13px,1.2vw,15px)",
                        color: INK,
                        opacity: 0.62,
                        lineHeight: 1.78,
                        margin: "0 0 24px",
                      }}
                    >
                      {featured.excerpt}
                    </p>
                  )}

                  <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                    {featured.author && (
                      <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 12, color: INK, fontWeight: 600 }}>
                        {featured.author}
                      </span>
                    )}
                    {featured.author && featured.publishedAt && (
                      <span style={{ color: `${INK}44`, fontSize: 12 }}>·</span>
                    )}
                    {featured.publishedAt && (
                      <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 12, color: `${INK}66` }}>
                        {new Date(featured.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                      </span>
                    )}
                    {featured.readTime && (
                      <>
                        <span style={{ color: `${INK}44`, fontSize: 12 }}>·</span>
                        <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 12, color: `${INK}66` }}>
                          {featured.readTime} min read
                        </span>
                      </>
                    )}
                  </div>

                  <div
                    className="read-cta"
                    style={{
                      marginTop: "clamp(24px,3.5vw,40px)",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      color: INK,
                    }}
                  >
                    Read the story
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="cta-arrow">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* ── GRID ── */}
          {rest.length > 0 && (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: "clamp(28px,4vw,40px)" }}>
                <span
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: "4px",
                    textTransform: "uppercase",
                    color: INK,
                    opacity: 0.35,
                    whiteSpace: "nowrap",
                  }}
                >
                  More Reads
                </span>
                <div style={{ flex: 1, height: 1, background: `${INK}16` }} />
              </div>

              <div className="blog-grid">
                {rest.map((post, i) => {
                  const pal = PALETTES[(i + 1) % PALETTES.length];
                  const date = post.publishedAt
                    ? new Date(post.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
                    : null;
                  return (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      className="grid-card"
                      style={{ textDecoration: "none", display: "flex", flexDirection: "column" }}
                    >
                      {/* Card visual header */}
                      <div
                        style={{
                          height: 180,
                          background: post.featuredImage?.url
                            ? `url(${post.featuredImage.url}) center/cover`
                            : pal.bg,
                          position: "relative",
                          overflow: "hidden",
                          flexShrink: 0,
                          borderRadius: "clamp(14px,1.5vw,20px) clamp(14px,1.5vw,20px) 0 0",
                        }}
                      >
                        {!post.featuredImage?.url && (
                          <>
                            <div
                              style={{
                                position: "absolute",
                                right: -12,
                                bottom: -24,
                                fontFamily: "var(--font-cormorant), Georgia, serif",
                                fontStyle: "italic",
                                fontWeight: 700,
                                fontSize: 140,
                                color: "rgba(255,255,255,0.065)",
                                lineHeight: 1,
                                userSelect: "none",
                              }}
                            >
                              {post.title.charAt(0)}
                            </div>
                            <div style={{ position: "absolute", top: 18, left: 18, display: "flex", gap: 6 }}>
                              {[14, 9, 5].map((s, j) => (
                                <div
                                  key={j}
                                  style={{
                                    width: s,
                                    height: s,
                                    borderRadius: "50%",
                                    background: pal.accent,
                                    opacity: 0.65,
                                  }}
                                />
                              ))}
                            </div>
                          </>
                        )}
                        {post.readTime && (
                          <div
                            style={{
                              position: "absolute",
                              bottom: 10,
                              right: 12,
                              background: "rgba(255,255,255,0.13)",
                              backdropFilter: "blur(6px)",
                              borderRadius: 100,
                              padding: "3px 10px",
                              fontFamily: "var(--font-dm-sans)",
                              fontSize: 9,
                              fontWeight: 700,
                              color: "#FAF7F2",
                              letterSpacing: "0.5px",
                            }}
                          >
                            {post.readTime} min
                          </div>
                        )}
                      </div>

                      {/* Card body */}
                      <div
                        style={{
                          background: "#fff",
                          padding: "clamp(18px,2vw,24px)",
                          flex: 1,
                          display: "flex",
                          flexDirection: "column",
                          borderRadius: `0 0 clamp(14px,1.5vw,20px) clamp(14px,1.5vw,20px)`,
                        }}
                      >
                        {(post.tags ?? []).length > 0 && (
                          <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 10 }}>
                            {(post.tags ?? []).slice(0, 2).map((t, j) => (
                              <span
                                key={j}
                                style={{
                                  fontSize: 8,
                                  fontWeight: 700,
                                  letterSpacing: "1.8px",
                                  textTransform: "uppercase",
                                  color: pal.bg,
                                  background: `${pal.bg}12`,
                                  padding: "3px 8px",
                                  borderRadius: 100,
                                  fontFamily: "var(--font-dm-sans)",
                                  border: `1px solid ${pal.bg}20`,
                                }}
                              >
                                {t.tag}
                              </span>
                            ))}
                          </div>
                        )}

                        <h3
                          style={{
                            fontFamily: "var(--font-cormorant), Georgia, serif",
                            fontStyle: "italic",
                            fontWeight: 500,
                            fontSize: "clamp(19px,2vw,24px)",
                            color: INK,
                            margin: "0 0 10px",
                            lineHeight: 1.2,
                          }}
                        >
                          {post.title}
                        </h3>

                        {post.excerpt && (
                          <p
                            style={{
                              fontFamily: "var(--font-dm-sans)",
                              fontSize: 13,
                              color: INK,
                              opacity: 0.58,
                              lineHeight: 1.72,
                              margin: "0 0 14px",
                              flex: 1,
                              display: "-webkit-box",
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            } as CSSProperties}
                          >
                            {post.excerpt}
                          </p>
                        )}

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginTop: "auto",
                            paddingTop: 12,
                            borderTop: `1px solid ${INK}0c`,
                          }}
                        >
                          <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, color: `${INK}50` }}>
                            {date ?? ""}
                          </span>
                          <svg
                            className="card-arrow"
                            width="13"
                            height="13"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke={INK}
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{ opacity: 0.25, transition: "all 0.25s ease" }}
                          >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />

      <style>{`
        /* Masthead decorative side images (CSS bg — missing file = nothing).
           aspect-ratio matches the source art (1983x793) so the panel is the
           exact shape of the image: no distortion, no empty padding, and it
           scales smoothly with the viewport via clamp(). */
        /* Desktop: wide art (1983x793) fills the FULL masthead height so the
           image's own top-art reaches the top and bottom-art reaches the
           bottom — framing the text on all sides like the reference.
           background-size: auto 100% = scale to height, keep aspect (no art
           crop); the transparent inner half simply overflows toward center. */
        .blog-side {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 100%;
          background-repeat: no-repeat;
          background-size: auto 100%;
          pointer-events: none;
          z-index: 1;
          opacity: 0;
          will-change: transform, opacity;
        }
        .blog-side-left  {
          left: 0;
          background-position: left center;
          animation: blogSideInLeft 1.1s cubic-bezier(0.16,1,0.3,1) 0.15s forwards;
        }
        .blog-side-right {
          right: 0;
          background-position: right center;
          animation: blogSideInRight 1.1s cubic-bezier(0.16,1,0.3,1) 0.15s forwards;
        }

        /* Reveal: slide up + in from the edge, settle at full opacity */
        @keyframes blogSideInLeft {
          from { opacity: 0; transform: translate(-28px, 36px); }
          to   { opacity: 0.95; transform: translate(0, 0); }
        }
        @keyframes blogSideInRight {
          from { opacity: 0; transform: translate(28px, 36px); }
          to   { opacity: 0.95; transform: translate(0, 0); }
        }

        /* Mobile: swap to the purpose-built portrait art (864x1821).
           contain = full image, no crop; panel locked to portrait ratio and
           anchored to the bottom corners. !important overrides the inline
           background-image (which points at the desktop files). */
        @media (max-width: 768px) {
          .blog-side {
            top: auto;
            bottom: 0;
            width: clamp(130px, 40vw, 300px);
            aspect-ratio: 864 / 1821;
            background-size: contain;
          }
          .blog-side-left  { background-image: url(/blog/mobileleft.png) !important; background-position: left bottom; }
          .blog-side-right { background-image: url(/blog/mobileright.png) !important; background-position: right bottom; }
        }
        @media (max-width: 480px) {
          .blog-side { width: 44vw; }
        }

        /* Respect reduced-motion preferences */
        @media (prefers-reduced-motion: reduce) {
          .blog-side { opacity: 0.95 !important; animation: none !important; transform: none !important; }
        }

        /* Featured card layout */
        .featured-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-radius: clamp(18px, 2vw, 28px);
          overflow: hidden;
          box-shadow: 0 4px 28px rgba(31,74,51,0.08);
          transition: box-shadow 0.4s ease;
        }
        .featured-card:hover .featured-inner {
          box-shadow: 0 28px 72px rgba(31,74,51,0.18);
        }
        .featured-card:hover .cta-arrow {
          transform: translateX(5px);
        }
        .cta-arrow { transition: transform 0.25s ease; }

        /* Grid */
        .blog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
          gap: clamp(16px, 2.5vw, 28px);
        }
        .grid-card {
          border-radius: clamp(14px, 1.5vw, 20px);
          box-shadow: 0 2px 14px rgba(31,74,51,0.06);
          transition: box-shadow 0.35s cubic-bezier(0.16,1,0.3,1),
                      transform 0.35s cubic-bezier(0.16,1,0.3,1);
          overflow: hidden;
        }
        .grid-card:hover {
          box-shadow: 0 18px 52px rgba(31,74,51,0.16);
          transform: translateY(-5px);
        }
        .grid-card:hover .card-arrow {
          opacity: 0.85 !important;
          transform: translateX(4px);
        }

        /* Responsive */
        @media (max-width: 640px) {
          .featured-inner { grid-template-columns: 1fr !important; }
          .featured-visual { min-height: 220px !important; }
        }
      `}</style>
    </>
  );
}
