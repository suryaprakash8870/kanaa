"use client";

/**
 * Pure-CSS "3D-ish" conveyor packing animation.
 * No Three.js, no canvas — just transforms, perspective, and keyframes.
 * Shown on order-success and during checkout submit.
 */

const INK = "#1F4A33";
const ACCENT = "#4FB83A";
const CLAY = "#C0301F";
const MUSTARD = "#F5C03A";
const KRAFT = "#D9B97A";
const KRAFT_DEEP = "#B59049";

export default function PackingConveyor({
  size = 280,
}: {
  size?: number;
}) {
  return (
    <div
      className="kn-scene"
      style={{
        width: size,
        height: size * 0.72,
        perspective: size * 3,
        perspectiveOrigin: "50% 40%",
        position: "relative",
        margin: "0 auto",
      }}
      aria-hidden
    >
      {/* Belt */}
      <div className="kn-belt">
        <div className="kn-belt-top" />
        <div className="kn-belt-front" />
        <div className="kn-belt-left" />
        <div className="kn-belt-right" />
      </div>

      {/* Jar */}
      <div className="kn-jar">
        <div className="kn-jar-lid" />
        <div className="kn-jar-body">
          <div className="kn-jar-label" />
        </div>
      </div>

      {/* Box (bottom half + fold-up flaps) */}
      <div className="kn-box">
        <div className="kn-box-back" />
        <div className="kn-box-left" />
        <div className="kn-box-right" />
        <div className="kn-box-front" />
        <div className="kn-flap kn-flap-back" />
        <div className="kn-flap kn-flap-front" />
      </div>

      {/* Wax seal */}
      <div className="kn-seal">✦</div>

      <style>{`
        .kn-scene {
          transform-style: preserve-3d;
          transform: rotateX(18deg) rotateY(-14deg);
        }

        /* ── Belt ── */
        .kn-belt {
          position: absolute;
          left: 8%;
          right: 8%;
          bottom: 18%;
          height: 14%;
          transform-style: preserve-3d;
        }
        .kn-belt-top {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            90deg,
            ${INK} 0 14px,
            ${INK}cc 14px 18px,
            ${INK} 18px 32px
          );
          background-size: 32px 100%;
          animation: kn-belt-scroll 1.1s linear infinite;
          border-radius: 4px;
          box-shadow: inset 0 2px 0 rgba(255,255,255,0.12), 0 2px 0 rgba(0,0,0,0.18);
        }
        .kn-belt-front {
          position: absolute;
          left: 0;
          right: 0;
          top: 100%;
          height: 18px;
          background: linear-gradient(180deg, ${INK}cc, ${INK}88);
          border-radius: 0 0 3px 3px;
          transform: rotateX(-60deg);
          transform-origin: top;
        }
        .kn-belt-left, .kn-belt-right {
          position: absolute;
          top: -6px;
          width: 18px;
          height: calc(100% + 12px);
          background: ${INK}dd;
          border-radius: 50%;
          box-shadow: inset 2px 0 0 rgba(255,255,255,0.15);
        }
        .kn-belt-left { left: -14px; }
        .kn-belt-right { right: -14px; }
        @keyframes kn-belt-scroll {
          from { background-position-x: 0; }
          to   { background-position-x: -32px; }
        }

        /* ── Jar ── */
        .kn-jar {
          position: absolute;
          left: 50%;
          bottom: 32%;
          width: 22%;
          height: 30%;
          transform: translateX(-50%);
          animation: kn-jar-travel 3.6s cubic-bezier(.5,.1,.4,1) infinite;
          transform-style: preserve-3d;
        }
        .kn-jar-lid {
          width: 80%;
          height: 18%;
          margin: 0 auto;
          background: linear-gradient(180deg, ${MUSTARD} 0%, ${KRAFT_DEEP} 100%);
          border-radius: 4px 4px 2px 2px;
          box-shadow: inset 0 2px 0 rgba(255,255,255,0.4), 0 2px 0 rgba(0,0,0,0.2);
        }
        .kn-jar-body {
          width: 100%;
          height: 82%;
          margin-top: -2px;
          background: linear-gradient(180deg, ${CLAY}ee 0%, ${CLAY} 70%, #8a220f 100%);
          border-radius: 6px 6px 10px 10px;
          position: relative;
          box-shadow:
            inset 3px 0 6px rgba(255,255,255,0.18),
            inset -3px 0 6px rgba(0,0,0,0.2),
            0 6px 10px rgba(0,0,0,0.25);
        }
        .kn-jar-label {
          position: absolute;
          left: 12%;
          right: 12%;
          top: 32%;
          height: 36%;
          background: #FFF4D8;
          border-radius: 2px;
          box-shadow: inset 0 0 0 1px ${INK}33;
        }
        .kn-jar-label::before,
        .kn-jar-label::after {
          content: "";
          position: absolute;
          left: 18%;
          right: 18%;
          height: 1.5px;
          background: ${INK}88;
          border-radius: 1px;
        }
        .kn-jar-label::before { top: 30%; }
        .kn-jar-label::after  { top: 62%; width: 40%; }

        @keyframes kn-jar-travel {
          0%   { transform: translateX(-260%) translateY(0); opacity: 0; }
          12%  { opacity: 1; }
          42%  { transform: translateX(-50%) translateY(0); opacity: 1; }
          55%  { transform: translateX(-50%) translateY(24%); opacity: 1; }
          60%  { transform: translateX(-50%) translateY(24%); opacity: 0; }
          100% { transform: translateX(-50%) translateY(24%); opacity: 0; }
        }

        /* ── Box ── */
        .kn-box {
          position: absolute;
          left: 50%;
          bottom: 20%;
          width: 30%;
          height: 22%;
          transform: translateX(-50%);
          transform-style: preserve-3d;
        }
        .kn-box-back, .kn-box-front, .kn-box-left, .kn-box-right {
          position: absolute;
        }
        .kn-box-back {
          inset: 0;
          background: ${KRAFT_DEEP};
          border-radius: 3px;
        }
        .kn-box-front {
          inset: 0;
          background: linear-gradient(180deg, ${KRAFT} 0%, ${KRAFT_DEEP} 100%);
          border-radius: 3px;
          box-shadow: inset 0 0 0 1px rgba(0,0,0,0.14), 0 6px 10px rgba(0,0,0,0.2);
        }
        .kn-box-left, .kn-box-right {
          top: 0; bottom: 0; width: 14%;
          background: ${KRAFT_DEEP};
        }
        .kn-box-left  { left: 0; border-radius: 3px 0 0 3px; }
        .kn-box-right { right: 0; border-radius: 0 3px 3px 0; }

        .kn-flap {
          position: absolute;
          left: 0; right: 0;
          height: 46%;
          background: linear-gradient(180deg, ${KRAFT} 0%, ${KRAFT_DEEP} 100%);
          box-shadow: inset 0 0 0 1px rgba(0,0,0,0.14);
          transform-origin: top center;
          top: 0;
        }
        .kn-flap-back  {
          transform: rotateX(180deg);
          animation: kn-flap-close-back 3.6s ease-in-out infinite;
        }
        .kn-flap-front {
          transform: rotateX(180deg);
          animation: kn-flap-close-front 3.6s ease-in-out infinite;
          background: linear-gradient(180deg, ${KRAFT_DEEP} 0%, ${KRAFT} 100%);
        }
        @keyframes kn-flap-close-back {
          0%, 55%   { transform: rotateX(180deg); }
          70%, 100% { transform: rotateX(6deg);  }
        }
        @keyframes kn-flap-close-front {
          0%, 60%   { transform: rotateX(180deg); }
          75%, 100% { transform: rotateX(-6deg); }
        }

        /* ── Seal ── */
        .kn-seal {
          position: absolute;
          left: 50%;
          bottom: 30%;
          width: 34px;
          height: 34px;
          margin-left: -17px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 30%, #F27062 0%, ${CLAY} 55%, #7A1A0E 100%);
          color: #FFF4D8;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-cormorant), serif;
          font-style: italic;
          font-size: 18px;
          font-weight: 700;
          box-shadow: 0 4px 8px rgba(0,0,0,0.3), inset -2px -3px 0 rgba(0,0,0,0.18);
          opacity: 0;
          transform: scale(0.4) translateY(-24px);
          animation: kn-seal-drop 3.6s ease-out infinite;
        }
        @keyframes kn-seal-drop {
          0%, 78%   { opacity: 0; transform: scale(0.4) translateY(-40px); }
          85%       { opacity: 1; transform: scale(1.2) translateY(0); }
          92%, 100% { opacity: 1; transform: scale(1) translateY(0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .kn-belt-top, .kn-jar, .kn-flap-back, .kn-flap-front, .kn-seal {
            animation: none !important;
          }
          .kn-seal { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}

// Keep ACCENT referenced so lint doesn't drop it if we theme later
void ACCENT;
