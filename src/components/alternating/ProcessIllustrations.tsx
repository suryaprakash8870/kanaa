/** Editorial line-art illustrations for each Kanaa Way section. */

type Props = { color: string; accent: string; size?: number };

export function SunDryingArt({ color, accent, size = 360 }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(0 20px 40px rgba(33,77,52,0.12))" }}
    >
      {/* Backdrop circle */}
      <circle cx="200" cy="200" r="170" fill={accent} opacity="0.08" />
      {/* Sun */}
      <circle cx="200" cy="140" r="48" fill={color} opacity="0.92" />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        const x1 = (200 + Math.cos(a) * 62).toFixed(2);
        const y1 = (140 + Math.sin(a) * 62).toFixed(2);
        const x2 = (200 + Math.cos(a) * 80).toFixed(2);
        const y2 = (140 + Math.sin(a) * 80).toFixed(2);
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.7" />
        );
      })}
      {/* Drying line */}
      <line x1="60" y1="270" x2="340" y2="270" stroke="#8C6820" strokeWidth="2.5" />
      {/* Hanging mango slices */}
      {[110, 170, 230, 290].map((cx, i) => (
        <g key={i}>
          <line x1={cx} y1="270" x2={cx} y2="290" stroke="#8C6820" strokeWidth="1.5" />
          <ellipse cx={cx} cy="308" rx="20" ry="26" fill={color} opacity="0.85" />
          <ellipse cx={cx - 5} cy="302" rx="5" ry="8" fill="#fff" opacity="0.3" />
        </g>
      ))}
      {/* Ground line */}
      <line x1="40" y1="360" x2="360" y2="360" stroke={accent} strokeWidth="1.2" opacity="0.4" />
    </svg>
  );
}

export function OilPressArt({ color, accent, size = 360 }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(0 20px 40px rgba(33,77,52,0.12))" }}
    >
      <circle cx="200" cy="200" r="170" fill={accent} opacity="0.08" />
      {/* Stone vessel */}
      <path
        d="M 120 210 Q 120 160 200 160 Q 280 160 280 210 L 270 310 Q 265 330 200 330 Q 135 330 130 310 Z"
        fill="#C4A57B"
        stroke="#8C6820"
        strokeWidth="2"
      />
      <ellipse cx="200" cy="160" rx="80" ry="18" fill="#A08560" stroke="#8C6820" strokeWidth="2" />
      {/* Oil inside */}
      <ellipse cx="200" cy="165" rx="72" ry="12" fill={color} opacity="0.9" />
      {/* Spout */}
      <path d="M 280 200 Q 315 205 320 225 L 315 230 Q 305 215 275 213 Z" fill="#A08560" stroke="#8C6820" strokeWidth="1.5" />
      {/* Oil drops falling */}
      <path d="M 318 238 Q 322 248 318 258 Q 314 248 318 238 Z" fill={color} opacity="0.9" />
      <path d="M 320 275 Q 323 282 320 290 Q 317 282 320 275 Z" fill={color} opacity="0.7" />
      <path d="M 318 305 Q 321 312 318 320 Q 315 312 318 305 Z" fill={color} opacity="0.5" />
      {/* Sesame seeds around base */}
      {[130, 155, 180, 220, 245, 270].map((cx, i) => (
        <ellipse key={i} cx={cx} cy="350" rx="5" ry="2.5" fill="#E9B861" opacity="0.8" />
      ))}
    </svg>
  );
}

export function MortarArt({ color, accent, size = 360 }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(0 20px 40px rgba(33,77,52,0.12))" }}
    >
      <circle cx="200" cy="200" r="170" fill={accent} opacity="0.08" />
      {/* Pestle */}
      <rect x="180" y="70" width="22" height="130" rx="10" fill="#5A3E2B" transform="rotate(12 191 135)" />
      <ellipse cx="225" cy="188" rx="18" ry="14" fill="#4A3728" />
      {/* Mortar bowl */}
      <ellipse cx="200" cy="240" rx="130" ry="30" fill="#3A2A1E" />
      <path
        d="M 75 240 Q 80 340 200 340 Q 320 340 325 240 Z"
        fill="#5A3E2B"
        stroke="#3A2A1E"
        strokeWidth="2"
      />
      <ellipse cx="200" cy="240" rx="115" ry="22" fill={color} opacity="0.88" />
      {/* Spice specks */}
      {[140, 170, 200, 230, 260, 185, 215].map((cx, i) => (
        <circle
          key={i}
          cx={cx}
          cy={236 + (i % 2) * 6}
          r={2 + (i % 3)}
          fill={i % 2 ? "#E9B861" : "#7A3E1D"}
          opacity="0.85"
        />
      ))}
      {/* Rising spice dust */}
      <circle cx="240" cy="195" r="3" fill={color} opacity="0.4" />
      <circle cx="255" cy="180" r="2" fill={color} opacity="0.3" />
      <circle cx="230" cy="175" r="2.5" fill={accent} opacity="0.4" />
    </svg>
  );
}

export function TerracottaArt({ color, accent, size = 360 }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(0 20px 40px rgba(33,77,52,0.12))" }}
    >
      <circle cx="200" cy="200" r="170" fill={accent} opacity="0.08" />
      {/* Back pot */}
      <path
        d="M 105 140 Q 110 125 145 122 L 175 122 Q 210 125 215 140 L 220 160 Q 235 175 235 210 Q 235 275 200 285 Q 120 285 115 210 Q 115 175 110 160 Z"
        fill="#B8693D"
        stroke="#7A3E1D"
        strokeWidth="2"
        opacity="0.8"
      />
      {/* Main pot */}
      <path
        d="M 155 180 Q 160 160 205 156 L 245 156 Q 290 160 295 180 L 300 210 Q 320 230 320 275 Q 320 355 230 365 Q 140 355 140 275 Q 140 230 155 210 Z"
        fill="#C4741F"
        stroke="#7A3E1D"
        strokeWidth="2.5"
      />
      {/* Rim */}
      <ellipse cx="225" cy="158" rx="75" ry="10" fill="#8B4513" />
      <ellipse cx="225" cy="155" rx="70" ry="7" fill="#3A2A1E" />
      {/* Cloth cover with tie */}
      <ellipse cx="225" cy="152" rx="62" ry="6" fill="#F5E6C8" opacity="0.9" />
      <path
        d="M 165 152 Q 225 125 285 152"
        fill="none"
        stroke="#F5E6C8"
        strokeWidth="3"
        opacity="0.85"
      />
      {/* Tie string */}
      <ellipse cx="225" cy="162" rx="66" ry="3" fill="#8B4513" opacity="0.7" />
      {/* Decorative band */}
      <path
        d="M 150 250 Q 225 256 300 250"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        opacity="0.6"
      />
      {/* Small dots pattern */}
      {[175, 200, 225, 250, 275].map((cx, i) => (
        <circle key={i} cx={cx} cy="250" r="3" fill={color} opacity="0.7" />
      ))}
    </svg>
  );
}
