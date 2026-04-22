/**
 * Drop a packing-themed GIF at `public/packing.gif` (mp4/webm also fine — see src).
 * Keeps the visual warm if the file is missing by showing a tiny kraft box fallback.
 */
"use client";

import { useState } from "react";

export default function PackingGif({
  size = 260,
  src = "/packing.gif",
  alt = "Hand-packing your jar box",
}: {
  size?: number;
  src?: string;
  alt?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        aria-hidden
        style={{
          width: size,
          height: size,
          margin: "0 auto",
          borderRadius: 20,
          background:
            "linear-gradient(180deg,#F5E7C6 0%,#D9B97A 60%,#B59049 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#1F4A33",
          fontFamily: "var(--font-caveat), cursive",
          fontSize: 26,
          boxShadow: "0 12px 28px rgba(0,0,0,0.12)",
        }}
      >
        packing your jars…
      </div>
    );
  }

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      onError={() => setFailed(true)}
      style={{
        width: size,
        height: size,
        objectFit: "contain",
        display: "block",
        margin: "0 auto",
        borderRadius: 16,
      }}
    />
  );
}
