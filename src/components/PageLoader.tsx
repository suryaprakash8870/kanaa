const BG = "#DFF0D8";
const INK = "#1F4A33";
const ACCENT = "#4FB83A";

/**
 * Shared full-page loader. Mint background, pulsing jar mark,
 * "brewing..." handwritten tag — matches the site palette.
 */
export default function PageLoader({ label = "brewing your jars…" }: { label?: string }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: BG,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 22,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Spinner — concentric rings around a jar glyph */}
      <div
        style={{
          position: "relative",
          width: 88,
          height: 88,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span className="kn-ring kn-ring-1" />
        <span className="kn-ring kn-ring-2" />
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="7" width="14" height="14" rx="2.5" />
          <rect x="7" y="4" width="10" height="4" rx="1" />
          <path d="M7 13c2 -1 4 1 6 0s3 1 4 0" />
        </svg>
      </div>

      <p
        style={{
          fontFamily: "var(--font-caveat), cursive",
          fontSize: 26,
          color: INK,
          margin: 0,
          transform: "rotate(-2deg)",
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: 11,
          letterSpacing: "3px",
          textTransform: "uppercase",
          color: INK,
          opacity: 0.55,
          margin: 0,
        }}
      >
        Kanaa · small batch · slow made
      </p>

      <style>{`
        @keyframes kn-spin { to { transform: rotate(360deg); } }
        @keyframes kn-pulse {
          0%, 100% { transform: scale(1); opacity: 0.55; }
          50% { transform: scale(1.08); opacity: 1; }
        }
        .kn-ring {
          position: absolute;
          border-radius: 50%;
          inset: 0;
        }
        .kn-ring-1 {
          border: 2px dashed ${ACCENT};
          animation: kn-spin 4s linear infinite;
        }
        .kn-ring-2 {
          inset: 14px;
          border: 1.5px solid ${INK}33;
          animation: kn-pulse 1.6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

/** Inline (non full-viewport) variant for sections that suspend. */
export function SectionLoader({ label = "loading…" }: { label?: string }) {
  return (
    <div
      style={{
        minHeight: 280,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 14,
        padding: 40,
      }}
    >
      <div
        style={{
          position: "relative",
          width: 48,
          height: 48,
        }}
      >
        <span
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: `2px dashed ${ACCENT}`,
            animation: "kn-spin 3s linear infinite",
          }}
        />
      </div>
      <p
        style={{
          fontFamily: "var(--font-caveat), cursive",
          fontSize: 20,
          color: INK,
          margin: 0,
          opacity: 0.75,
        }}
      >
        {label}
      </p>
    </div>
  );
}
