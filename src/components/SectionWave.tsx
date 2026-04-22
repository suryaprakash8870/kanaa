"use client";

type Props = {
  color: string;
  position: "top" | "bottom";
  height?: number;
};

export default function SectionWave({ color, position, height = 60 }: Props) {
  const isTop = position === "top";
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        width: "100%",
        height,
        display: "block",
        zIndex: 3,
        pointerEvents: "none",
        ...(isTop
          ? { top: -1, transform: "scaleY(-1)" }
          : { bottom: -1 }),
      }}
    >
      <path
        d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
        fill={color}
      />
    </svg>
  );
}
