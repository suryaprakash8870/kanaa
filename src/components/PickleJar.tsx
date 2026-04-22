type Variant = "mango" | "veg" | "lime";

const variants = {
  mango: {
    lidTop: "#A0722A",
    lidMid: "#C9A24A",
    lidShine: "#E2BE72",
    bodyTint: "rgba(210,235,195,0.28)",
    contentsTop: "#D4820A",
    contentsBot: "#8B5209",
    labelBg: "#214D34",
    labelAccent: "#C9A24A",
    labelText: "#FAF7F2",
    name: "Wild Mango",
    size: "300g",
  },
  veg: {
    lidTop: "#1C5C2E",
    lidMid: "#2D7A42",
    lidShine: "#4A9E5C",
    bodyTint: "rgba(195,230,205,0.28)",
    contentsTop: "#4A7C35",
    contentsBot: "#2A4E1F",
    labelBg: "#7AA33C",
    labelAccent: "#FAF7F2",
    labelText: "#214D34",
    name: "Wild Mixed Veg",
    size: "300g",
  },
  lime: {
    lidTop: "#6B3218",
    lidMid: "#8C4520",
    lidShine: "#B56330",
    bodyTint: "rgba(230,225,180,0.28)",
    contentsTop: "#B8C840",
    contentsBot: "#7A8820",
    labelBg: "#7A3E1D",
    labelAccent: "#C9A24A",
    labelText: "#FAF7F2",
    name: "Lime & Ginger",
    size: "300g",
  },
};

export default function PickleJar({ variant }: { variant: Variant }) {
  const v = variants[variant];
  const id = `jar-${variant}`;

  return (
    <svg
      viewBox="0 0 160 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: "100%",
        height: "100%",
        filter: "drop-shadow(0 16px 32px rgba(33,77,52,0.18))",
      }}
    >
      <defs>
        <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
          <stop offset="40%" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.08" />
        </linearGradient>
        <linearGradient id={`${id}-contents`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={v.contentsTop} />
          <stop offset="100%" stopColor={v.contentsBot} />
        </linearGradient>
        <linearGradient id={`${id}-lid`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={v.lidShine} />
          <stop offset="60%" stopColor={v.lidMid} />
          <stop offset="100%" stopColor={v.lidTop} />
        </linearGradient>
        <radialGradient id={`${id}-shadow`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(33,77,52,0.25)" />
          <stop offset="100%" stopColor="rgba(33,77,52,0)" />
        </radialGradient>
        <clipPath id={`${id}-body-clip`}>
          <rect x="26" y="56" width="108" height="168" rx="18" />
        </clipPath>
      </defs>

      {/* Shadow */}
      <ellipse cx="80" cy="232" rx="50" ry="7" fill={`url(#${id}-shadow)`} />

      {/* Lid band */}
      <rect x="36" y="36" width="88" height="22" rx="5" fill={`url(#${id}-lid)`} />
      {/* Lid dome */}
      <ellipse cx="80" cy="36" rx="44" ry="13" fill={`url(#${id}-lid)`} />
      {/* Lid shine */}
      <ellipse cx="80" cy="32" rx="36" ry="8" fill={v.lidShine} opacity="0.4" />
      {/* Lid rim */}
      <rect x="36" y="50" width="88" height="4" rx="2" fill={v.lidTop} opacity="0.5" />
      {/* Neck */}
      <rect x="34" y="54" width="92" height="8" rx="3" fill={v.lidTop} opacity="0.7" />

      {/* Jar body */}
      <rect
        x="26"
        y="56"
        width="108"
        height="168"
        rx="18"
        fill={v.bodyTint}
        stroke="rgba(180,210,185,0.5)"
        strokeWidth="1.5"
      />

      {/* Contents */}
      <rect
        x="27"
        y="148"
        width="106"
        height="76"
        rx="0"
        clipPath={`url(#${id}-body-clip)`}
        fill={`url(#${id}-contents)`}
      />

      {/* Pickle bits */}
      <ellipse cx="55" cy="165" rx="10" ry="6" fill="rgba(255,255,255,0.12)" clipPath={`url(#${id}-body-clip)`} />
      <ellipse cx="90" cy="175" rx="8" ry="5" fill="rgba(255,255,255,0.1)" clipPath={`url(#${id}-body-clip)`} />
      <ellipse cx="68" cy="188" rx="12" ry="5" fill="rgba(255,255,255,0.08)" clipPath={`url(#${id}-body-clip)`} />
      <ellipse cx="105" cy="160" rx="7" ry="9" fill="rgba(0,0,0,0.1)" clipPath={`url(#${id}-body-clip)`} />
      <ellipse cx="42" cy="180" rx="6" ry="8" fill="rgba(0,0,0,0.08)" clipPath={`url(#${id}-body-clip)`} />

      {/* Oil shimmer */}
      <ellipse cx="80" cy="149" rx="51" ry="5" fill="rgba(201,162,74,0.2)" clipPath={`url(#${id}-body-clip)`} />

      {/* Label */}
      <rect x="34" y="80" width="92" height="72" rx="7" fill={v.labelBg} />
      <rect x="37" y="83" width="86" height="66" rx="5" fill="none" stroke={v.labelAccent} strokeWidth="1" opacity="0.5" />

      {/* Brand name */}
      <text x="80" y="107" textAnchor="middle" fill={v.labelAccent} fontSize="13" fontFamily="serif" fontStyle="italic" fontWeight="600">
        ஃnaa
      </text>
      <line x1="52" y1="112" x2="108" y2="112" stroke={v.labelAccent} strokeWidth="0.7" opacity="0.6" />

      {/* Product name */}
      <text x="80" y="123" textAnchor="middle" fill={v.labelText} fontSize="7.5" fontFamily="sans-serif" letterSpacing="1.5" fontWeight="600">
        {v.name.toUpperCase()}
      </text>
      <text x="80" y="135" textAnchor="middle" fill={v.labelAccent} fontSize="6" fontFamily="sans-serif" letterSpacing="1" opacity="0.9">
        ORGANIC PICKLE
      </text>
      <text x="80" y="146" textAnchor="middle" fill={v.labelText} fontSize="5.5" fontFamily="sans-serif" opacity="0.7" letterSpacing="0.5">
        {v.size} • COLD PRESSED OIL
      </text>

      {/* Glass highlights */}
      <rect x="34" y="62" width="11" height="130" rx="5" fill="white" opacity="0.22" clipPath={`url(#${id}-body-clip)`} />
      <rect x="48" y="65" width="4" height="60" rx="2" fill="white" opacity="0.1" clipPath={`url(#${id}-body-clip)`} />
      <rect x="119" y="62" width="12" height="150" rx="6" fill="rgba(0,0,0,0.06)" clipPath={`url(#${id}-body-clip)`} />
      <ellipse cx="80" cy="220" rx="48" ry="8" fill="rgba(255,255,255,0.1)" clipPath={`url(#${id}-body-clip)`} />
    </svg>
  );
}
