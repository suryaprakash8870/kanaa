"use client";

/* Sky tone sampled to match the footer illustration (public/footer-scene.png).
   The CTABanner above fades into this same colour so the two sections blend. */
const SKY = "#DFF0D8";
const INK = "#1C3D27";
const ACCENT = "#C0301F";

const columns: { title: string; items: { label: string; href: string }[] }[] = [
  {
    title: "Shop",
    items: [
      { label: "All Pickles", href: "/products" },
      { label: "Recipes", href: "/recipes" },
      { label: "Wholesale", href: "/#wholesale" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "Our Story", href: "/about" },
      { label: "The Process", href: "/#process" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Support",
    items: [
      { label: "Track Order", href: "/track" },
      { label: "Find Us", href: "/#find" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
];

const socials = [
  {
    label: "Instagram",
    href: "https://instagram.com/kanaa.pickles",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com/kanaa.pickles",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H7v3h3v6h3v-6h3l1-3h-4v-2c0-.6.4-1 1-1z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/918939874391",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a10 10 0 00-8.5 15.3L2 22l4.8-1.5A10 10 0 1012 2zm0 18a8 8 0 01-4.1-1.1l-.3-.2-2.8.9.9-2.7-.2-.3A8 8 0 1112 20zm4.4-5.6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.5 6.5 0 01-3.2-2.8c-.1-.2 0-.4.1-.5l.4-.5c.1-.1.1-.3 0-.4l-.7-1.7c-.2-.4-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.3c.1.2 1.7 2.6 4.1 3.6 1.5.6 2 .7 2.7.6.4-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      style={{
        position: "relative",
        background: SKY,
        color: INK,
        overflow: "hidden",
      }}
    >
      {/* ============== CONTENT (separate, above the illustration) ============== */}
      <div
        className="footer-content"
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1280,
          margin: "0 auto",
          padding: "clamp(56px,7vw,96px) clamp(24px,5vw,72px) clamp(20px,2.5vw,32px)",
        }}
      >
        <div
          className="footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.7fr 1fr 1fr 1.3fr",
            gap: "clamp(28px,3.5vw,56px)",
          }}
        >
          {/* ---- Brand / headline block ---- */}
          <div className="footer-brand">
            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: ACCENT,
                margin: "0 0 18px",
              }}
            >
              Kanaa · Small-Batch Pickles
            </p>

            <h2
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontWeight: 600,
                fontSize: "clamp(44px,6vw,82px)",
                lineHeight: 0.95,
                letterSpacing: "-1px",
                color: INK,
                margin: 0,
              }}
            >
              Good things
              <br />
              <span style={{ fontStyle: "italic" }}>take time.</span>
            </h2>

            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: 14,
                lineHeight: 1.7,
                color: INK,
                opacity: 0.72,
                maxWidth: 360,
                margin: "20px 0 28px",
              }}
            >
              Homemade healthy food inspired by traditional South Indian flavours —
              wholesome ingredients, everyday convenience, and comfort in every meal.
            </p>

            {/* CTA buttons */}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="/products" className="footer-btn footer-btn--solid">
                Shop Pickles
              </a>
              <a href="/#about" className="footer-btn footer-btn--ghost">
                Our Story
              </a>
            </div>
          </div>

          {/* ---- Link columns ---- */}
          {columns.map((col) => (
            <div key={col.title}>
              <p className="footer-col-title">{col.title}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {col.items.map((item) => (
                  <a key={item.label} href={item.href} className="footer-link">
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ============== ILLUSTRATION BAND with contact/socials over its sky ====== */}
      <div
        className="footer-scene"
        style={{ backgroundImage: "url(/footer-scene.png)" }}
      >
        <div className="footer-scene-overlay">
          {/* Contact + socials row */}
          <div className="footer-connect">
            <div style={{ display: "flex", gap: "clamp(20px,3vw,44px)", flexWrap: "wrap" }}>
              <a href="tel:+918939874391" className="footer-contact">
                +91 89398 74391
              </a>
              <a href="mailto:kanaafoods@gmail.com" className="footer-contact">
                kanaafoods@gmail.com
              </a>
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="footer-social"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: 12,
              color: `${INK}aa`,
              margin: "16px 0 0",
            }}
          >
            © {year} Kanaa Foods Pvt. Ltd. · Made with{" "}
            <span style={{ color: ACCENT }}>♥</span> in Tamil Nadu
          </p>
        </div>
      </div>

      <style>{`
        /* Buttons */
        .footer-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          padding: 13px 26px;
          font-family: var(--font-dm-sans), sans-serif;
          font-weight: 600;
          font-size: 13px;
          letter-spacing: 0.4px;
          text-decoration: none;
          transition: transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
        }
        .footer-btn--solid {
          background: ${INK};
          color: ${SKY};
          box-shadow: 0 10px 24px rgba(28,61,39,0.22);
        }
        .footer-btn--solid:hover {
          background: ${ACCENT};
          transform: translateY(-2px);
          box-shadow: 0 14px 30px rgba(192,48,31,0.28);
        }
        .footer-btn--ghost {
          background: transparent;
          color: ${INK};
          border: 1.5px solid ${INK}55;
        }
        .footer-btn--ghost:hover {
          border-color: ${INK};
          transform: translateY(-2px);
        }

        /* Link columns */
        .footer-col-title {
          font-family: var(--font-dm-sans), sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: ${ACCENT};
          margin: 0 0 18px;
        }
        .footer-link {
          font-family: var(--font-dm-sans), sans-serif;
          font-size: 14.5px;
          color: ${INK}cc;
          text-decoration: none;
          width: fit-content;
          transition: color 0.2s, transform 0.2s;
        }
        .footer-link:hover {
          color: ${ACCENT};
          transform: translateX(3px);
        }

        /* Contact + socials */
        .footer-contact {
          font-family: var(--font-dm-sans), sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: ${INK};
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-contact:hover { color: ${ACCENT}; }
        .footer-social {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: ${INK};
          color: ${SKY};
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s, background 0.2s;
        }
        .footer-social:hover {
          background: ${ACCENT};
          transform: translateY(-2px);
        }

        /* Illustration band below the content. Contact/socials/copyright are
           overlaid on the image's sky (top). Full-width; the sky-top blends
           into the mint content bg above. Cropping is fine. */
        .footer-scene {
          position: relative;
          width: 100%;
          aspect-ratio: 1672 / 714;
          background-repeat: no-repeat;
          background-position: center top;
          background-size: cover;
        }
        .footer-scene-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          max-width: 1280px;
          margin: 0 auto;
          padding: clamp(20px,3vw,40px) clamp(24px,5vw,72px) 0;
        }
        .footer-connect {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
        }

        /* Responsive */
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .footer-brand { grid-column: 1 / -1; }
        }
        @media (max-width: 540px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .footer-connect { flex-direction: column; align-items: flex-start !important; }
        }
      `}</style>
    </footer>
  );
}
