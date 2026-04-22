type Props = { contentsColor: string; accent: string; width?: number };

/** Static SVG pickle-jar illustration — mobile fallback for the 3D hero. */
export default function JarIllustration({ contentsColor, accent, width = 200 }: Props) {
  return (
    <svg
      width={width}
      height={width * 1.3}
      viewBox="0 0 200 260"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(0 16px 32px rgba(33,77,52,0.22))" }}
    >
      {/* Glass body */}
      <defs>
        <linearGradient id="glass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="rgba(255,255,255,0.65)" />
          <stop offset="0.5" stopColor="rgba(255,255,255,0.15)" />
          <stop offset="1" stopColor="rgba(255,255,255,0.45)" />
        </linearGradient>
        <linearGradient id="lid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#D9B659" />
          <stop offset="0.5" stopColor="#C9A24A" />
          <stop offset="1" stopColor="#8C6820" />
        </linearGradient>
        <linearGradient id="contents" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={contentsColor} stopOpacity="0.95" />
          <stop offset="1" stopColor={contentsColor} stopOpacity="0.75" />
        </linearGradient>
      </defs>

      {/* Jar body */}
      <rect
        x="24"
        y="60"
        width="152"
        height="180"
        rx="14"
        fill="url(#glass)"
        stroke="rgba(33,77,52,0.18)"
        strokeWidth="1"
      />
      {/* Contents */}
      <rect
        x="32"
        y="96"
        width="136"
        height="138"
        rx="8"
        fill="url(#contents)"
      />
      {/* Label */}
      <rect
        x="38"
        y="118"
        width="124"
        height="96"
        rx="4"
        fill="#FAF7F2"
        opacity="0.92"
      />
      {/* Label accent lines */}
      <rect x="50" y="134" width="68" height="4" rx="2" fill={accent} opacity="0.85" />
      <rect x="50" y="146" width="44" height="2" rx="1" fill="#4A3728" opacity="0.55" />
      <rect x="50" y="154" width="58" height="2" rx="1" fill="#4A3728" opacity="0.45" />
      <rect x="50" y="162" width="38" height="2" rx="1" fill="#4A3728" opacity="0.45" />
      <rect x="50" y="184" width="84" height="6" rx="3" fill={accent} opacity="0.22" />
      <circle cx="130" cy="148" r="10" fill={accent} opacity="0.35" />
      {/* Gold rings */}
      <rect x="24" y="110" width="152" height="2" fill="#C9A24A" opacity="0.55" />
      <rect x="24" y="220" width="152" height="2" fill="#C9A24A" opacity="0.55" />

      {/* Neck */}
      <rect x="36" y="44" width="128" height="22" rx="3" fill="rgba(228,213,168,0.7)" />

      {/* Lid */}
      <rect x="32" y="12" width="136" height="42" rx="6" fill="url(#lid)" />
      <rect x="32" y="48" width="136" height="6" fill="#8C6820" />
      {/* Lid ridges */}
      {Array.from({ length: 18 }).map((_, i) => (
        <rect
          key={i}
          x={36 + i * 7.3}
          y="18"
          width="2"
          height="28"
          fill="#8C6820"
          opacity="0.5"
        />
      ))}

      {/* Floating bits */}
      <circle cx="70" cy="210" r="5" fill="#8B5209" opacity="0.7" />
      <circle cx="110" cy="220" r="4" fill="#F5A623" opacity="0.6" />
    </svg>
  );
}
