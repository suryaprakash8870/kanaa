"use client";

import { ChiliDoodle, MustardDoodle } from "./footer/FooterDoodles";

const linksLeft = [
  { label: "Our Story", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "The Process", href: "#process" },
  { label: "Recipes", href: "#recipes" },
];
const linksRight = [
  { label: "Wholesale", href: "#wholesale" },
  { label: "Find Us", href: "#find" },
  { label: "Contact", href: "#contact" },
  { label: "FAQ", href: "#faq" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      style={{
        position: "relative",
        background: "#1A3D28",
        color: "#FAF7F2",
        overflow: "hidden",
      }}
    >
      {/* ============== INSTAGRAM HANDLE BAND ============== */}
      <a
        href="https://instagram.com/kanaa.pickles"
        target="_blank"
        rel="noreferrer"
        style={{
          display: "block",
          position: "relative",
          padding: "clamp(40px, 6vw, 70px) clamp(24px, 5vw, 80px)",
          textAlign: "center",
          textDecoration: "none",
          color: "#FAF7F2",
          borderBottom: "1px solid rgba(250,247,242,0.1)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "8%",
            transform: "translateY(-50%) rotate(-15deg)",
            opacity: 0.35,
          }}
        >
          <ChiliDoodle size={64} />
        </div>
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: "8%",
            transform: "translateY(-50%) rotate(20deg)",
            opacity: 0.35,
          }}
        >
          <MustardDoodle size={64} />
        </div>

        <p
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "rgba(250,247,242,0.55)",
            marginBottom: 12,
          }}
        >
          Follow our small batches
        </p>
        <p
          style={{
            fontFamily: "var(--font-playfair), serif",
            fontWeight: 700,
            fontSize: "clamp(32px, 5vw, 60px)",
            color: "#C9A24A",
            letterSpacing: "-1px",
            margin: 0,
          }}
        >
          @kanaa.pickles
        </p>
      </a>

      {/* ============== MAIN FOOTER: 3 COLUMNS ============== */}
      <div
        style={{
          padding: "clamp(60px, 7vw, 90px) clamp(24px, 5vw, 80px) 0",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div
            className="footer-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1.4fr 1fr 1fr",
              gap: "clamp(32px, 4vw, 60px)",
              marginBottom: 48,
            }}
          >
            {/* Brand column */}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 22,
                }}
              >
                <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
                  <circle
                    cx="19"
                    cy="19"
                    r="17"
                    stroke="#C9A24A"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <path
                    d="M15 26 Q11 19 14 13 Q17 8 19 10 Q21 8 23 12 Q27 19 23 26"
                    stroke="#FAF7F2"
                    strokeWidth="1.4"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <path
                    d="M19 10 Q20 6 24 5"
                    stroke="#7AA33C"
                    strokeWidth="1.3"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <circle cx="24" cy="5" r="2.5" fill="#7AA33C" />
                </svg>
                <span
                  style={{
                    fontFamily: "var(--font-playfair), serif",
                    fontWeight: 700,
                    fontSize: 26,
                    letterSpacing: "-0.3px",
                  }}
                >
                  Kanaa
                </span>
              </div>

              <p
                style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontWeight: 500,
                  fontSize: 19,
                  lineHeight: 1.45,
                  color: "rgba(250,247,242,0.85)",
                  marginBottom: 18,
                  maxWidth: 360,
                  fontStyle: "italic",
                }}
              >
                We&apos;re here for the slow — sun-cured, stone-pressed, clay-aged
                pickles in every jar.
              </p>

              <p
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: 13,
                  color: "rgba(250,247,242,0.55)",
                  lineHeight: 1.7,
                  maxWidth: 340,
                  marginBottom: 24,
                }}
              >
                Handcrafted in Kongu Nadu, Tamil Nadu. Cold-pressed oil, zero
                preservatives, grandma&apos;s recipes.
              </p>

              {/* Compact newsletter */}
              <form onSubmit={(e) => e.preventDefault()}>
                <p
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: "#C9A24A",
                    marginBottom: 10,
                  }}
                >
                  New batches in your inbox
                </p>
                <div
                  style={{
                    display: "flex",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(250,247,242,0.15)",
                    borderRadius: 100,
                    overflow: "hidden",
                    maxWidth: 340,
                  }}
                >
                  <input
                    type="email"
                    placeholder="your@email.com"
                    style={{
                      flex: 1,
                      background: "transparent",
                      border: "none",
                      padding: "12px 18px",
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: 13,
                      color: "#FAF7F2",
                      outline: "none",
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      background: "#C9A24A",
                      color: "#1A3D28",
                      border: "none",
                      padding: "0 22px",
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontWeight: 600,
                      fontSize: 12,
                      cursor: "pointer",
                      letterSpacing: "0.5px",
                      transition: "background 0.25s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#E2BE72")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "#C9A24A")
                    }
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>

            {/* Link columns */}
            <LinkColumn title="Visit" items={linksLeft} />
            <LinkColumn title="Connect" items={linksRight} />
          </div>
        </div>
      </div>

      {/* ============== BOTTOM BAR ============== */}
      <div
        style={{
          padding: "24px clamp(24px, 5vw, 80px)",
          borderTop: "1px solid rgba(250,247,242,0.08)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
          flexWrap: "wrap",
          maxWidth: 1280,
          margin: "0 auto",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: 12,
            color: "rgba(250,247,242,0.4)",
          }}
        >
          © {year} Kanaa Foods Pvt. Ltd.
        </p>
        <p
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: 12,
            color: "rgba(250,247,242,0.4)",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          Made with <span style={{ color: "#C9A24A" }}>♥</span> in Tamil Nadu
        </p>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 36px !important;
          }
          .footer-grid > :first-child {
            grid-column: 1 / -1;
          }
        }
        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}

function LinkColumn({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
}) {
  return (
    <div>
      <p
        style={{
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "2.5px",
          textTransform: "uppercase",
          color: "#C9A24A",
          marginBottom: 22,
        }}
      >
        {title}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {items.map((item) => (
          <a
            key={item.label}
            href={item.href}
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontSize: 18,
              color: "rgba(250,247,242,0.82)",
              textDecoration: "none",
              transition: "color 0.2s, transform 0.2s",
              width: "fit-content",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = "#C9A24A";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateX(4px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = "rgba(250,247,242,0.82)";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateX(0)";
            }}
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}
