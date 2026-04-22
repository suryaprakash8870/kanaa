"use client";

import { View } from "@react-three/drei";
import SkyDiveScene from "./skydive/SkyDiveScene";

export default function SkyDiveFinale() {
  return (
    <section
      className="skydive"
      style={{
        position: "relative",
        height: "100vh",
        background: "linear-gradient(180deg, #E2D4F0 0%, #FBF0D5 100%)",
        overflow: "hidden",
      }}
    >
      <View
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        <SkyDiveScene sentence="Rooted from the nature" />
      </View>
      <div
        style={{
          position: "absolute",
          bottom: "8vh",
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
          pointerEvents: "auto",
        }}
      >
        <a
          href="/products"
          style={{
            background: "#214D34",
            color: "#FAF7F2",
            border: "none",
            borderRadius: 100,
            padding: "16px 40px",
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontWeight: 500,
            fontSize: 14,
            letterSpacing: "1px",
            cursor: "pointer",
            boxShadow: "0 12px 32px rgba(33,77,52,0.3)",
            textDecoration: "none",
            display: "inline-block",
          }}
        >
          Shop the Collection →
        </a>
      </div>
    </section>
  );
}
