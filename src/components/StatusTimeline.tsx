/**
 * Pill-card status timeline.
 *
 * Layout:  [ icon | label ]  ────●   (checkmark node on the right spine)
 *
 * `stages` lists the whole journey. `currentIndex` is the latest completed
 * step. Stages at or below `currentIndex` render as "done" (tinted pill, filled
 * green check). The current stage pulses. Future stages are flat/muted.
 */

import type { ReactNode } from "react";

const INK = "#1F4A33";
const ACCENT = "#4FB83A";
const ACCENT_SOFT = "#E6F4DC";

const SANS = "var(--font-dm-sans), sans-serif";

export type StatusStage = {
  label: string;
  sub: string;
  icon: ReactNode;
};

export default function StatusTimeline({
  stages,
  currentIndex,
  heading = "Order status",
}: {
  stages: StatusStage[];
  currentIndex: number;
  heading?: string;
}) {
  return (
    <div>
      {heading && (
        <div
          style={{
            background: "#fff",
            border: `1px solid ${INK}10`,
            borderRadius: 14,
            padding: "14px 18px",
            fontFamily: SANS,
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: INK,
            marginBottom: 16,
            boxShadow: "0 6px 18px rgba(31,74,51,0.06)",
          }}
        >
          {heading}
        </div>
      )}

      <div style={{ position: "relative" }}>
        {/* vertical spine sits behind the checkmark column */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 24,
            bottom: 24,
            right: 17,
            width: 2,
            background: `${INK}18`,
            borderRadius: 2,
          }}
        />
        {/* filled portion of spine up to the current step */}
        {currentIndex >= 0 && stages.length > 1 && (
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: 24,
              right: 17,
              width: 2,
              height: `calc(${
                Math.max(0, Math.min(currentIndex, stages.length - 1)) *
                100 /
                (stages.length - 1)
              }% - 0px)`,
              background: ACCENT,
              borderRadius: 2,
              transition: "height 400ms ease",
            }}
          />
        )}

        {stages.map((s, i) => {
          const done = i <= currentIndex;
          const current = i === currentIndex;
          return (
            <div
              key={`${i}-${s.label}-${s.sub}`}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 36px",
                alignItems: "center",
                gap: 14,
                marginBottom: i === stages.length - 1 ? 0 : 12,
              }}
            >
              {/* Pill card */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "14px 18px",
                  borderRadius: 14,
                  background: done ? ACCENT_SOFT : "#F1F1EF",
                  border: `1px solid ${done ? `${ACCENT}33` : `${INK}0E`}`,
                  minHeight: 56,
                }}
              >
                <span
                  aria-hidden
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: done ? ACCENT : `${INK}55`,
                    flexShrink: 0,
                  }}
                >
                  {s.icon}
                </span>
                <div style={{ minWidth: 0 }}>
                  <p
                    style={{
                      margin: 0,
                      fontFamily: SANS,
                      fontSize: 13,
                      color: done ? INK : `${INK}88`,
                      fontWeight: 500,
                      lineHeight: 1.25,
                    }}
                  >
                    {s.label}
                  </p>
                  <p
                    style={{
                      margin: "2px 0 0",
                      fontFamily: SANS,
                      fontSize: 15,
                      fontWeight: 700,
                      color: done ? INK : `${INK}77`,
                      letterSpacing: "-0.2px",
                      lineHeight: 1.2,
                    }}
                  >
                    {s.sub}
                  </p>
                </div>
              </div>

              {/* Check node */}
              <div
                style={{
                  position: "relative",
                  width: 36,
                  height: 36,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 1,
                }}
              >
                <span
                  aria-hidden
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 999,
                    background: done ? ACCENT : "#fff",
                    border: `2px solid ${done ? ACCENT : `${INK}22`}`,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: current
                      ? `0 0 0 6px ${ACCENT}22`
                      : done
                      ? "0 3px 8px rgba(79,184,58,0.3)"
                      : "none",
                    animation: current
                      ? "st-pulse 1.8s ease-in-out infinite"
                      : undefined,
                  }}
                >
                  {done ? (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12.5l4.5 4.5L19 7" />
                    </svg>
                  ) : (
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: 999,
                        background: `${INK}22`,
                      }}
                    />
                  )}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes st-pulse {
          0%, 100% { box-shadow: 0 0 0 6px ${ACCENT}22; }
          50%      { box-shadow: 0 0 0 10px ${ACCENT}11; }
        }
      `}</style>
    </div>
  );
}

/* ---------------------------- shared icons ---------------------------- */

export const StatusIcons = {
  receipt: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3z" />
      <path d="M9 8h6M9 12h6M9 16h4" />
    </svg>
  ),
  box: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7l9-4 9 4-9 4-9-4z" />
      <path d="M3 7v10l9 4 9-4V7" />
      <path d="M12 11v10" />
    </svg>
  ),
  truck: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="7" width="13" height="10" rx="1" />
      <path d="M14 10h4l3 3v4h-7z" />
      <circle cx="6" cy="19" r="2" />
      <circle cx="18" cy="19" r="2" />
    </svg>
  ),
  home: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11l9-8 9 8v9a2 2 0 01-2 2h-4v-6h-6v6H5a2 2 0 01-2-2v-9z" />
    </svg>
  ),
  shield: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l8 3v7c0 5-3.5 9-8 10-4.5-1-8-5-8-10V5l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
};
