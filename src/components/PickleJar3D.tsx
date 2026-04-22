"use client";

import { forwardRef } from "react";
import { Float, useTexture } from "@react-three/drei";
import * as THREE from "three";

const LABEL_PATHS = [
  "/labels/tomato.png",
  "/labels/vatha.png",
  "/labels/spinach.png",
  "/labels/veldt.png",
];

/** Clean, empty glass jar with a crossfading flavor label.
 *  No internal contents — all transparent sort conflicts removed. */
const PickleJar3D = forwardRef<THREE.Group>((_, ref) => {
  const textures = useTexture(LABEL_PATHS);
  textures.forEach((tex) => {
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 16;
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.offset.x = 0.25;
    tex.needsUpdate = true;
  });

  return (
    <group ref={ref} scale={1}>
      <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.25}>
        {/* === LID === */}
        <mesh position={[0, 1.45, 0]} castShadow>
          <cylinderGeometry args={[0.92, 0.92, 0.35, 64]} />
          <meshStandardMaterial color="#C9A24A" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0, 1.63, 0]} castShadow>
          <cylinderGeometry args={[0.88, 0.92, 0.05, 64]} />
          <meshStandardMaterial color="#A07F38" metalness={0.9} roughness={0.25} />
        </mesh>
        {Array.from({ length: 32 }).map((_, i) => {
          const angle = (i / 32) * Math.PI * 2;
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * 0.92, 1.45, Math.sin(angle) * 0.92]}
              rotation={[0, -angle, 0]}
            >
              <boxGeometry args={[0.02, 0.3, 0.04]} />
              <meshStandardMaterial color="#8C6820" metalness={0.9} roughness={0.35} />
            </mesh>
          );
        })}

        {/* === NECK RING === */}
        <mesh position={[0, 1.22, 0]}>
          <cylinderGeometry args={[0.87, 0.87, 0.12, 64]} />
          <meshStandardMaterial color="#E4D5A8" metalness={0.4} roughness={0.5} />
        </mesh>

        {/* === JAR BODY (GLASS) — simplified standard transparent, depthWrite off */}
        <mesh renderOrder={1}>
          <cylinderGeometry args={[0.85, 0.85, 2.4, 64]} />
          <meshStandardMaterial
            color="#F5F5F0"
            roughness={0.15}
            metalness={0.15}
            transparent
            opacity={0.55}
            depthWrite={false}
          />
        </mesh>

        {/* === 4 STACKED LABELS — crossfade by opacity === */}
        {textures.map((tex, i) => (
          <mesh
            key={i}
            position={[0, 0.08, 0]}
            userData={{ labelIndex: i }}
            renderOrder={10 + i}
          >
            <cylinderGeometry
              args={[0.864 + i * 0.003, 0.864 + i * 0.003, 1.25, 80, 1, true]}
            />
            <meshStandardMaterial
              map={tex}
              side={THREE.FrontSide}
              transparent
              roughness={0.75}
              metalness={0}
              opacity={i === 0 ? 1 : 0}
              depthWrite={false}
              alphaTest={0.01}
            />
          </mesh>
        ))}

        {/* Gold trim rings */}
        <mesh position={[0, 0.71, 0]}>
          <torusGeometry args={[0.864, 0.008, 8, 80]} />
          <meshStandardMaterial color="#C9A24A" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0, -0.56, 0]}>
          <torusGeometry args={[0.864, 0.008, 8, 80]} />
          <meshStandardMaterial color="#C9A24A" metalness={0.8} roughness={0.3} />
        </mesh>

        {/* === BOTTOM BASE === */}
        <mesh position={[0, -1.22, 0]}>
          <cylinderGeometry args={[0.85, 0.82, 0.08, 64]} />
          <meshStandardMaterial color="#D0E4D0" roughness={0.3} metalness={0.1} />
        </mesh>
      </Float>
    </group>
  );
});

PickleJar3D.displayName = "PickleJar3D";
export default PickleJar3D;
