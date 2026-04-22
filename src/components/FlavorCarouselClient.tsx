"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { View } from "@react-three/drei";
import * as THREE from "three";
import PickleJar3D from "./PickleJar3D";
import { setJarFlavor } from "./jarUtils";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { WavyCircles } from "./products/WavyCircles";

const SPINS = 6;

export type Flavor = {
  name: string;
  tamil: string;
  price: string;
  weight: string;
  spice: string;
  color: string;
};

const DEFAULT_FLAVORS: Flavor[] = [
  { name: "Tomato Chutney", tamil: "தக்காளி தொக்கு", price: "₹199", weight: "300g", spice: "Medium", color: "#8B1F3A" },
  { name: "Vatha Kolambu",  tamil: "வத்த குழம்பு",    price: "₹219", weight: "300g", spice: "Hot",    color: "#6B4022" },
  { name: "Sour Spinach",   tamil: "செம்புளிச்சை கீரை", price: "₹189", weight: "300g", spice: "Mild",   color: "#3D5A2D" },
  { name: "Veldt Grape",    tamil: "பிரண்டை தொக்கு",   price: "₹229", weight: "300g", spice: "Medium", color: "#5F3D8A" },
];

export default function FlavorCarousel({ flavors }: { flavors?: Flavor[] } = {}) {
  const FLAVORS = flavors && flavors.length >= 1 ? flavors : DEFAULT_FLAVORS;
  const [idx, setIdx] = useState(0);
  const jarRef = useRef<THREE.Group>(null);
  const animatingRef = useRef(false);
  const isDesktop = useMediaQuery("(min-width: 768px)", true);

  const change = (targetIdx: number) => {
    if (!jarRef.current || animatingRef.current) return;
    animatingRef.current = true;
    const nextIndex = (targetIdx + FLAVORS.length) % FLAVORS.length;
    const spinDir = targetIdx > idx ? -1 : 1;

    const tl = gsap.timeline({
      onComplete: () => {
        animatingRef.current = false;
      },
    });

    tl.to(
      jarRef.current.rotation,
      {
        y:
          spinDir < 0
            ? `-=${Math.PI * 2 * SPINS}`
            : `+=${Math.PI * 2 * SPINS}`,
        ease: "power2.inOut",
        duration: 1,
      },
      0,
    )
      .to(
        ".flavor-bg-overlay, .wavy-circles-outer, .wavy-circles-inner",
        {
          backgroundColor: FLAVORS[nextIndex].color,
          fill: FLAVORS[nextIndex].color,
          ease: "power2.inOut",
          duration: 1,
        },
        0,
      )
      .to(".flavor-text", { duration: 0.2, y: -10, opacity: 0 }, 0)
      .add(() => {
        setIdx(nextIndex);
        setJarFlavor(jarRef.current, nextIndex, 1);
      }, 0.5)
      .to(".flavor-text", { duration: 0.25, y: 0, opacity: 1 }, 0.7);
  };

  const f = FLAVORS[idx];

  return (
    <section
      style={{
        position: "relative",
        display: "grid",
        gridTemplateRows: "auto 4fr auto",
        minHeight: "100vh",
        padding: "clamp(48px, 6vh, 80px) clamp(20px, 5vw, 80px)",
        background: "#ffffff",
        color: "#ffffff",
        overflow: "hidden",
        justifyItems: "center",
      }}
    >
      <div
        className="flavor-bg-overlay"
        style={{
          position: "absolute",
          inset: 0,
          background: FLAVORS[0].color,
          opacity: 0.55,
          pointerEvents: "none",
        }}
      />

      <WavyCircles
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(120vmin, 1200px)",
          height: "min(120vmin, 1200px)",
          color: FLAVORS[0].color,
          pointerEvents: "none",
        }}
      />

      <h2
        style={{
          position: "relative",
          fontFamily: "var(--font-playfair), serif",
          fontWeight: 700,
          fontSize: "clamp(28px, 4vw, 48px)",
          color: "#ffffff",
          margin: 0,
          textAlign: "center",
          letterSpacing: "-0.5px",
          zIndex: 2,
        }}
      >
        Choose Your Flavor
      </h2>

      <div
        style={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: isDesktop ? "auto auto auto" : "1fr",
          alignItems: "center",
          justifyItems: "center",
          gap: isDesktop ? "clamp(16px, 3vw, 40px)" : 16,
          zIndex: 2,
        }}
      >
        {isDesktop && <ArrowBtn dir="left" onClick={() => change(idx - 1)} />}

        <View
          style={{
            width: isDesktop ? "min(70vmin, 600px)" : "min(82vw, 360px)",
            height: isDesktop ? "min(70vmin, 600px)" : "min(82vw, 360px)",
            pointerEvents: "none",
          }}
        >
          <ambientLight intensity={1.0} />
          <directionalLight position={[0, 1, 1]} intensity={5} />
          <directionalLight position={[-4, 2, 2]} intensity={1.5} color="#FFE9A8" />
          <hemisphereLight args={["#ffffff", "#777766", 0.8]} />
          <group ref={jarRef} scale={0.95} position={[0, -0.2, 1.5]}>
            <PickleJar3D />
          </group>
        </View>

        {isDesktop && <ArrowBtn dir="right" onClick={() => change(idx + 1)} />}

        {!isDesktop && (
          <div style={{ display: "flex", gap: 18 }}>
            <ArrowBtn dir="left" onClick={() => change(idx - 1)} />
            <ArrowBtn dir="right" onClick={() => change(idx + 1)} />
          </div>
        )}
      </div>

      <div
        className="flavor-text"
        style={{
          position: "relative",
          textAlign: "center",
          color: "#ffffff",
          zIndex: 2,
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: 13,
            color: "rgba(255,255,255,0.8)",
            letterSpacing: "2px",
            textTransform: "uppercase",
            marginBottom: 6,
          }}
        >
          {f.tamil}
        </p>
        <p
          style={{
            fontFamily: "var(--font-playfair), serif",
            fontWeight: 600,
            fontSize: "clamp(24px, 3vw, 36px)",
            margin: 0,
            letterSpacing: "-0.5px",
          }}
        >
          {f.name}
        </p>
        <p
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "clamp(16px, 1.4vw, 20px)",
            marginTop: 6,
            opacity: 0.9,
          }}
        >
          {f.weight} · {f.spice} · {f.price}
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 10,
            marginTop: 18,
          }}
        >
          {FLAVORS.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (i === idx || animatingRef.current) return;
                change(i);
              }}
              style={{
                width: i === idx ? 26 : 8,
                height: 8,
                borderRadius: 4,
                border: "none",
                background: i === idx ? "#ffffff" : "rgba(255,255,255,0.4)",
                cursor: "pointer",
                transition: "all 0.4s ease",
                padding: 0,
              }}
              aria-label={`Flavor ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ArrowBtn({ dir, onClick }: { dir: "left" | "right"; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "clamp(48px, 5vw, 72px)",
        height: "clamp(48px, 5vw, 72px)",
        borderRadius: "50%",
        border: "2px solid rgba(255,255,255,0.9)",
        background: "rgba(255,255,255,0.12)",
        color: "#ffffff",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.3s ease",
        backdropFilter: "blur(6px)",
        opacity: 0.9,
        zIndex: 3,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.opacity = "1";
        e.currentTarget.style.background = "rgba(255,255,255,0.24)";
        e.currentTarget.style.transform = "scale(1.06)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = "0.9";
        e.currentTarget.style.background = "rgba(255,255,255,0.12)";
        e.currentTarget.style.transform = "scale(1)";
      }}
      aria-label={dir === "left" ? "Previous" : "Next"}
    >
      <svg
        width="28%"
        height="28%"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ transform: dir === "right" ? "scaleX(-1)" : "none" }}
      >
        <polyline points="15 18 9 12 15 6" />
      </svg>
    </button>
  );
}
