/** Hand-drawn decorative illustrations of Indian pickle ingredients.
 *  Scattered around the footer/pre-footer like Mainstays' entertaining-essentials doodles. */

const stroke = "#FAF7F2";
const accent = "#C9A24A";
const leaf = "#7AA33C";

export function MangoDoodle(props: { size?: number; className?: string }) {
  const { size = 64, className } = props;
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path
        d="M20 36 C 14 28, 20 14, 32 14 C 46 14, 52 26, 48 38 C 44 48, 32 52, 24 46 C 20 44, 18 40, 20 36 Z"
        stroke={stroke}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path d="M34 14 C 36 10, 40 8, 42 10" stroke={leaf} strokeWidth="1.4" strokeLinecap="round" />
      <path d="M36 12 Q 40 8 46 10" stroke={leaf} strokeWidth="1.4" strokeLinecap="round" fill="none" />
      <path d="M28 28 Q 32 32 34 38" stroke={stroke} strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

export function ChiliDoodle(props: { size?: number; className?: string }) {
  const { size = 64, className } = props;
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path
        d="M42 14 L 46 18 L 40 22 M 42 14 L 36 18 L 42 22"
        stroke={leaf}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M42 20 C 46 28, 50 38, 44 48 C 38 56, 30 54, 26 48 C 24 44, 28 40, 34 34 C 38 30, 40 24, 42 20 Z"
        stroke={stroke}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path d="M36 32 Q 38 38 34 44" stroke={stroke} strokeWidth="1" strokeLinecap="round" opacity="0.45" />
    </svg>
  );
}

export function CurryLeafDoodle(props: { size?: number; className?: string }) {
  const { size = 64, className } = props;
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path d="M10 50 L 54 14" stroke={leaf} strokeWidth="1.3" strokeLinecap="round" />
      {[0, 1, 2, 3, 4].map((i) => {
        const x = 14 + i * 8;
        const y = 46 - i * 8;
        return (
          <g key={i}>
            <path
              d={`M${x} ${y} Q ${x - 2} ${y - 6}, ${x - 8} ${y - 4}`}
              stroke={stroke}
              strokeWidth="1.3"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d={`M${x} ${y} Q ${x + 6} ${y + 2}, ${x + 8} ${y - 2}`}
              stroke={stroke}
              strokeWidth="1.3"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        );
      })}
    </svg>
  );
}

export function LimeDoodle(props: { size?: number; className?: string }) {
  const { size = 64, className } = props;
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="20" stroke={stroke} strokeWidth="1.4" />
      <circle cx="32" cy="32" r="16" stroke={stroke} strokeWidth="0.8" opacity="0.55" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const a = (i / 8) * Math.PI * 2;
        const x1 = (32 + Math.cos(a) * 4).toFixed(2);
        const y1 = (32 + Math.sin(a) * 4).toFixed(2);
        const x2 = (32 + Math.cos(a) * 16).toFixed(2);
        const y2 = (32 + Math.sin(a) * 16).toFixed(2);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth="0.9" opacity="0.6" />;
      })}
      <circle cx="32" cy="32" r="2" fill={stroke} />
    </svg>
  );
}

export function MustardDoodle(props: { size?: number; className?: string }) {
  const { size = 64, className } = props;
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none">
      {[
        [20, 28, 3],
        [28, 22, 2.6],
        [36, 30, 3.2],
        [42, 24, 2.4],
        [26, 36, 2.8],
        [34, 40, 3],
        [44, 36, 2.5],
        [18, 40, 2.3],
        [38, 46, 2.7],
      ].map(([cx, cy, r], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} stroke={stroke} strokeWidth="1.2" fill="none" />
      ))}
    </svg>
  );
}

export function StarAniseDoodle(props: { size?: number; className?: string }) {
  const { size = 64, className } = props;
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none">
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const a = (i / 8) * Math.PI * 2;
        const x = (32 + Math.cos(a) * 18).toFixed(2);
        const y = (32 + Math.sin(a) * 18).toFixed(2);
        return (
          <ellipse
            key={i}
            cx={x}
            cy={y}
            rx="5"
            ry="8"
            transform={`rotate(${((i / 8) * 360).toFixed(2)} ${x} ${y})`}
            stroke={stroke}
            strokeWidth="1.3"
            fill="none"
          />
        );
      })}
      <circle cx="32" cy="32" r="3" fill={accent} />
    </svg>
  );
}

export function JarDoodle(props: { size?: number; className?: string }) {
  const { size = 64, className } = props;
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none">
      <rect x="14" y="22" width="36" height="34" rx="3" stroke={stroke} strokeWidth="1.4" />
      <rect x="12" y="14" width="40" height="8" rx="2" fill={accent} />
      <rect x="18" y="30" width="28" height="14" rx="1" stroke={stroke} strokeWidth="1" opacity="0.65" />
    </svg>
  );
}
