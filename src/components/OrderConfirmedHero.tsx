/**
 * Flat illustration for the order-success hero.
 * Phone mockup in the middle with a verified badge, plant on the left,
 * shopping bag on the right, floating check in the top-right.
 * Pure SVG — no dependencies, scales crisply, paints in Kanaa palette.
 *
 * NOTE on the double-<g> wrapping below:
 *   In SVG, a CSS `transform` REPLACES the `transform="..."` attribute on
 *   the same element. If we animate `transform: translateY(...)` on a group
 *   that also has `transform="translate(x,y)"`, the static positioning gets
 *   wiped and every element stacks at the origin.
 *   Fix: the outer <g> holds the static translate attribute, the inner
 *   <g> (no attribute transform) owns the animation class.
 */

const INK = "#1F4A33";
const ACCENT = "#4FB83A";
const ACCENT_SOFT = "#E6F4DC";
const CREAM = "#FFF4D8";
const CLAY = "#C0301F";
const MUSTARD = "#F5C03A";

export default function OrderConfirmedHero({
  width = 520,
  children,
}: {
  width?: number;
  children?: React.ReactNode;
}) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: width,
        margin: "0 auto",
        position: "relative",
      }}
    >
      <svg
        viewBox="0 0 720 520"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "auto", display: "block" }}
        aria-hidden
      >
        <style>{`
          @keyframes och-bob-a { 0%,100% { transform: translateY(0) }   50% { transform: translateY(-18px) } }
          @keyframes och-bob-b { 0%,100% { transform: translateY(0) }   50% { transform: translateY(-10px) } }
          @keyframes och-bob-c { 0%,100% { transform: translateY(0) }   50% { transform: translateY(-22px) } }
          @keyframes och-bob-d { 0%,100% { transform: translateY(0) }   50% { transform: translateY(-14px) } }
          @keyframes och-bob-e { 0%,100% { transform: translateY(0) }   50% { transform: translateY(-20px) } }
          @keyframes och-badge-wobble {
            0%,100% { transform: rotate(-6deg) }
            50%     { transform: rotate(6deg) }
          }
          @keyframes och-shadow {
            0%,100% { transform: scaleX(1);    opacity: .08 }
            50%     { transform: scaleX(0.82); opacity: .04 }
          }
          .och-float-a, .och-float-b, .och-float-c, .och-float-d, .och-float-e,
          .och-badge, .och-shadow {
            transform-box: fill-box;
            transform-origin: center;
            will-change: transform;
          }
          .och-float-a { animation: och-bob-a 4.2s ease-in-out infinite; }
          .och-float-b { animation: och-bob-b 3.6s ease-in-out infinite; animation-delay: -0.8s; }
          .och-float-c { animation: och-bob-c 5.0s ease-in-out infinite; animation-delay: -1.4s; }
          .och-float-d { animation: och-bob-d 3.8s ease-in-out infinite; animation-delay: -0.4s; }
          .och-float-e { animation: och-bob-e 4.6s ease-in-out infinite; animation-delay: -1.8s; }
          .och-badge   { animation: och-badge-wobble 5s ease-in-out infinite; }
          .och-shadow  { animation: och-shadow 4.2s ease-in-out infinite; }
          @media (prefers-reduced-motion: reduce) {
            .och-float-a, .och-float-b, .och-float-c, .och-float-d, .och-float-e,
            .och-badge, .och-shadow { animation: none !important; }
          }
        `}</style>

        {/* ── soft circle backdrop ── */}
        <circle cx="360" cy="240" r="220" fill={ACCENT_SOFT} />

        {/* ── potted plant (left) ── */}
        <g transform="translate(120,280)">
          <g className="och-float-a">
            {/* leaves */}
            <path d="M30 40 C 10 0, 40 -40, 70 -20 C 55 10, 45 30, 30 40 Z" fill={ACCENT} />
            <path d="M30 40 C 10 0, 40 -40, 70 -20 C 55 10, 45 30, 30 40 Z" fill="none" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M44 38 C 46 10, 50 -15, 54 -34" stroke={INK} strokeWidth="2" fill="none" strokeLinecap="round" />

            <path d="M60 50 C 70 10, 110 -10, 130 10 C 110 30, 90 48, 60 50 Z" fill={ACCENT} />
            <path d="M60 50 C 70 10, 110 -10, 130 10 C 110 30, 90 48, 60 50 Z" fill="none" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M78 48 C 92 30, 110 18, 124 12" stroke={INK} strokeWidth="2" fill="none" strokeLinecap="round" />

            <path d="M22 52 C 20 20, 0 0, -20 10 C -10 35, 0 50, 22 52 Z" fill={ACCENT} />
            <path d="M22 52 C 20 20, 0 0, -20 10 C -10 35, 0 50, 22 52 Z" fill="none" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />

            {/* pot */}
            <path d="M-10 54 L120 54 L108 120 L2 120 Z" fill={CLAY} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
            <rect x="-14" y="50" width="138" height="14" rx="3" fill={CLAY} stroke={INK} strokeWidth="3" />
          </g>
        </g>

        {/* ── phone (center) ── */}
        <g transform="translate(260,60)">
          <g className="och-float-b">
            {/* shadow */}
            <rect x="4" y="8" width="200" height="380" rx="30" fill={INK} opacity="0.15" />
            {/* frame */}
            <rect x="0" y="0" width="200" height="380" rx="30" fill={INK} />
            {/* screen */}
            <rect x="10" y="14" width="180" height="352" rx="22" fill="#FAF7F2" />
            {/* speaker */}
            <rect x="86" y="22" width="28" height="4" rx="2" fill={INK} opacity="0.35" />

            {/* verified badge (starburst) — gently wobbles */}
            <g transform="translate(100,130)">
              <g className="och-badge">
                <path
                  d="M0,-46
                     L8,-42 L16,-44 L20,-36 L28,-34 L28,-26 L34,-20 L30,-12
                     L34,-4 L28,2 L28,10 L20,12 L16,20 L8,18 L0,22
                     L-8,18 L-16,20 L-20,12 L-28,10 L-28,2 L-34,-4
                     L-30,-12 L-34,-20 L-28,-26 L-28,-34 L-20,-36 L-16,-44 L-8,-42 Z"
                  fill={ACCENT}
                  stroke={INK}
                  strokeWidth="3"
                  strokeLinejoin="round"
                />
                <circle cx="0" cy="-12" r="18" fill="#FAF7F2" />
                <path
                  d="M-8,-12 l6,6 l12,-12"
                  fill="none"
                  stroke={ACCENT}
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </g>

            {/* text inside phone */}
            <text x="100" y="210" textAnchor="middle" fontFamily="var(--font-dm-sans), sans-serif" fontSize="13" fill={INK} opacity="0.75">
              Thank you . .
            </text>
            <text x="100" y="240" textAnchor="middle" fontFamily="var(--font-cormorant), Georgia, serif" fontStyle="italic" fontWeight="600" fontSize="22" fill={INK}>
              your order
            </text>
            <text x="100" y="264" textAnchor="middle" fontFamily="var(--font-cormorant), Georgia, serif" fontStyle="italic" fontWeight="600" fontSize="22" fill={INK}>
              is on its way.
            </text>

            {/* DONE pill */}
            <g transform="translate(100,298)">
              <rect x="-42" y="-16" width="84" height="32" rx="16" fill={ACCENT} />
              <text x="0" y="5" textAnchor="middle" fontFamily="var(--font-dm-sans), sans-serif" fontWeight="800" fontSize="12" letterSpacing="3" fill={CREAM}>
                DONE
              </text>
            </g>
          </g>
        </g>

        {/* ── card (floating left of phone) ── */}
        <g transform="translate(200,180)">
          <g className="och-float-c">
            <rect x="0" y="0" width="110" height="72" rx="10" fill="#FAF7F2" stroke={INK} strokeWidth="3" />
            <rect x="10" y="12" width="60" height="14" rx="3" fill={INK} />
            <rect x="10" y="40" width="38" height="4" rx="2" fill={INK} opacity="0.7" />
            <rect x="54" y="40" width="38" height="4" rx="2" fill={INK} opacity="0.7" />
            <circle cx="86" cy="56" r="8" fill={MUSTARD} stroke={INK} strokeWidth="2.5" />
            {/* tiny check badge on card */}
            <circle cx="98" cy="6" r="9" fill={ACCENT} stroke={INK} strokeWidth="2.5" />
            <path d="M93,6 l3.5,3.5 l6,-6" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </g>

        {/* ── floating check bubble (top-right) ── */}
        <g transform="translate(550,180)">
          <g className="och-float-d">
            <circle cx="0" cy="0" r="34" fill={ACCENT} stroke={INK} strokeWidth="3" />
            <path d="M-12,0 l8,8 l16,-16" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </g>

        {/* ── shopping bag (right) ── */}
        <g transform="translate(470,310)">
          <g className="och-float-e">
            {/* handles */}
            <path d="M26 0 C 26 -28, 74 -28, 74 0" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" />
            {/* body */}
            <path d="M6 4 L94 4 L104 110 L-4 110 Z" fill={ACCENT} stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
            {/* fold highlight */}
            <path d="M6 4 L94 4" stroke={INK} strokeWidth="3.5" strokeLinecap="round" />
            <path d="M22 24 L78 24" stroke={INK} opacity="0.25" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        </g>

        {/* ground shadow — breathes with the floating */}
        <ellipse className="och-shadow" cx="360" cy="458" rx="260" ry="8" fill={INK} opacity="0.08" />
      </svg>

      {children}
    </div>
  );
}
