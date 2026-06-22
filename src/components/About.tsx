const BG = "#F4F1E4";
const INK = "#1F4A33";
const GREEN = "#6CA82E";
const TERRA = "#B5642A";
const HIGHLIGHT = "#4A7A2D";
const BODY = "#3A4438";

const SERIF = "var(--font-playfair), Georgia, serif";
const HAND = "var(--font-caveat), cursive";
const SANS = "var(--font-dm-sans), sans-serif";

const timeline = [
  {
    title: "Rooted in Tradition",
    body: "Inspired by timeless South Indian recipes.",
    lead: true,
    icon: (
      <g stroke={INK} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21v-7" />
        <path d="M12 14c0-3 2-5 5-5 0 3-2 5-5 5z" />
        <path d="M12 16c0-3-2-5-5-5 0 3 2 5 5 5z" />
      </g>
    ),
  },
  {
    title: "Past",
    body: "Traditions passed down with love.",
    icon: (
      <g stroke={INK} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 11l8-6 8 6" />
        <path d="M6 10v9h12v-9" />
        <path d="M10 19v-5h4v5" />
      </g>
    ),
  },
  {
    title: "Present",
    body: "Made with care for today's families.",
    icon: (
      <g stroke={INK} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" />
      </g>
    ),
  },
  {
    title: "Future",
    body: "Bringing authentic home food to generations ahead.",
    icon: (
      <g stroke={INK} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21c0-5 0-9 0-9" />
        <path d="M12 12c-4 0-7-2-7-6 4 0 7 2 7 6z" />
        <path d="M12 14c4 0 7-3 7-7-4 0-7 3-7 7z" />
      </g>
    ),
  },
];

export default function About() {
  return (
    <section
      id="our-story"
      style={{
        position: "relative",
        background: BG,
        overflow: "hidden",
        padding: "clamp(56px,8vw,110px) clamp(20px,5vw,72px) clamp(48px,6vw,80px)",
      }}
    >
      {/* Faint background wordmark */}
      <span
        aria-hidden
        className="st-watermark"
        style={{
          position: "absolute",
          top: "clamp(10px,3vw,40px)",
          left: "clamp(20px,5vw,72px)",
          right: 0,
          fontFamily: SERIF,
          fontWeight: 800,
          fontSize: "clamp(90px,16vw,260px)",
          lineHeight: 0.8,
          letterSpacing: "0.02em",
          color: INK,
          opacity: 0.05,
          textTransform: "uppercase",
          pointerEvents: "none",
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
      >
        Tradition
      </span>

      <div
        className="st-grid"
        style={{
          position: "relative",
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1.05fr 0.95fr",
          gap: "clamp(32px,5vw,72px)",
          alignItems: "center",
        }}
      >
        {/* ── LEFT: story text ── */}
        <div>
          <p
            style={{
              fontFamily: SANS,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "3.5px",
              textTransform: "uppercase",
              color: TERRA,
              margin: "0 0 clamp(16px,2vw,26px)",
            }}
          >
            Our Story Section
          </p>

          {/* Heading */}
          <h2 style={{ margin: "0 0 clamp(26px,3vw,38px)", lineHeight: 1 }}>
            <span
              style={{
                display: "block",
                fontFamily: SERIF,
                fontWeight: 700,
                fontSize: "clamp(34px,4.6vw,60px)",
                color: INK,
                letterSpacing: "-0.5px",
              }}
            >
              The Story of
            </span>
            <span style={{ position: "relative", display: "inline-block", marginTop: 4 }}>
              <span
                style={{
                  fontFamily: HAND,
                  fontWeight: 700,
                  fontSize: "clamp(64px,9vw,128px)",
                  color: GREEN,
                  lineHeight: 0.9,
                  display: "inline-block",
                }}
              >
                Kanaa
              </span>
              {/* leaf accent */}
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                style={{ position: "absolute", top: "-6%", right: "-10%", width: "clamp(22px,3vw,40px)", height: "auto" }}
              >
                <path d="M21 3c-7 0-13 4-13 11 0 3 2 6 5 7 0-6 3-11 8-13-4 4-6 8-6 13 6-1 10-7 10-13 0-3-2-5-4-5z" fill={GREEN} opacity="0.9" />
              </svg>
              {/* underline swoosh */}
              <svg
                aria-hidden
                viewBox="0 0 300 18"
                preserveAspectRatio="none"
                style={{ position: "absolute", left: 0, right: 0, bottom: "2%", width: "100%", height: "clamp(10px,1.4vw,18px)" }}
              >
                <path d="M3 12 C 70 2, 150 16, 230 6 C 260 2, 285 8, 297 5" fill="none" stroke={GREEN} strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
          </h2>

          {/* Body */}
          <p style={bodyStyle}>
            In every South Indian home, food has always been more than just a
            meal. It is comfort after a long day, care shared through recipes,
            and traditions passed from one generation to another.
          </p>

          <p
            style={{
              fontFamily: SERIF,
              fontWeight: 700,
              fontSize: "clamp(17px,1.5vw,22px)",
              color: HIGHLIGHT,
              margin: "clamp(18px,2vw,26px) 0",
              display: "inline-block",
              borderBottom: `2px solid ${HIGHLIGHT}55`,
              paddingBottom: 4,
            }}
          >
            Kanaa was born from this belief.
          </p>

          <p style={bodyStyle}>
            We wanted to bring back the warmth of homemade food in a way that
            fits modern lifestyles — where people are busy, time is limited, but
            the desire for healthy and authentic food still remains.
          </p>
          <p style={{ ...bodyStyle, marginBottom: 0 }}>
            Inspired by traditional recipes and everyday kitchen wisdom, Kanaa
            creates products that are simple to prepare, nourishing to eat, and
            comforting to experience. Every thokku, soup mix, kulambu blend, and
            snack is thoughtfully crafted using wholesome ingredients and
            familiar flavours that remind you of home.
          </p>
        </div>

        {/* ── RIGHT: layered story image ── */}
        <div className="st-art">
          <div className="st-art-box">
            {/* story2 sits behind (static) */}
            <div className="st-layer st-layer-back" style={{ backgroundImage: "url(/story/story2.png)" }} aria-hidden />
            {/* story1 in front, rotating slowly clockwise */}
            <div className="st-layer st-layer-spin" style={{ backgroundImage: "url(/story/story1.png)" }} aria-hidden />
          </div>
        </div>
      </div>

      {/* ── TIMELINE STRIP ── */}
      <div
        className="st-timeline"
        style={{
          position: "relative",
          maxWidth: 1280,
          margin: "clamp(40px,5vw,64px) auto 0",
          paddingTop: "clamp(28px,3vw,40px)",
          borderTop: `1px solid ${INK}22`,
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "clamp(16px,2.5vw,36px)",
        }}
      >
        {timeline.map((t, i) => (
          <div
            key={t.title}
            style={{
              display: "flex",
              gap: 12,
              alignItems: "flex-start",
              paddingLeft: i > 0 ? "clamp(12px,2vw,28px)" : 0,
              borderLeft: i > 0 ? `1px solid ${INK}1A` : "none",
            }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: 2 }}>
              {t.icon}
            </svg>
            <div>
              <p
                style={{
                  fontFamily: SANS,
                  fontSize: t.lead ? 12.5 : 11.5,
                  fontWeight: 800,
                  letterSpacing: "1.2px",
                  textTransform: "uppercase",
                  color: INK,
                  margin: "0 0 5px",
                  lineHeight: 1.2,
                }}
              >
                {t.title}
              </p>
              <p
                style={{
                  fontFamily: SANS,
                  fontSize: 12.5,
                  lineHeight: 1.5,
                  color: BODY,
                  opacity: 0.8,
                  margin: 0,
                }}
              >
                {t.body}
              </p>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .st-art-box {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
        }
        .st-layer {
          position: absolute;
          inset: 0;
          background-repeat: no-repeat;
          background-position: center;
          background-size: contain;
        }
        .st-layer-back {
          z-index: 1;
          transform: scale(1.6);    /* spread the doodles out around story1 */
          transform-origin: 50% 50%;
        }
        .st-layer-spin {
          z-index: 2;
          transform-origin: 50% 50%;
          animation: stSpin 48s linear infinite;
        }
        /* scale baked into the keyframes so the bowl stays enlarged while spinning */
        @keyframes stSpin {
          from { transform: rotate(0deg) scale(0.92); }
          to   { transform: rotate(360deg) scale(0.92); }
        }
        @media (prefers-reduced-motion: reduce) {
          .st-layer-spin { animation: none; }
        }

        @media (max-width: 900px) {
          .st-grid { grid-template-columns: 1fr !important; }
          .st-art { order: -1; }
          .st-art-box { max-width: 520px; margin: 0 auto; }
          .st-timeline { grid-template-columns: 1fr 1fr !important; gap: 24px !important; }
          .st-timeline > div { border-left: none !important; padding-left: 0 !important; }
        }
        @media (max-width: 480px) {
          .st-timeline { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

const bodyStyle: React.CSSProperties = {
  fontFamily: SANS,
  fontSize: "clamp(14px,1.05vw,16px)",
  lineHeight: 1.75,
  color: BODY,
  margin: "0 0 clamp(14px,1.6vw,20px)",
  maxWidth: 520,
};
