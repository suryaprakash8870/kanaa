"use client";

import { useRef, useEffect } from "react";
import { ContactShadows } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import PickleJar3D from "../PickleJar3D";
import { useStore } from "@/hooks/useStore";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type SceneDef = {
  contentsColor: THREE.Color;
  jarPos: THREE.Vector3;
  jarRot: THREE.Euler;
};

export const HERO_SCENES: SceneDef[] = [
  {
    contentsColor: new THREE.Color("#C82040"),
    jarPos: new THREE.Vector3(1.8, -0.1, 0),
    jarRot: new THREE.Euler(0, 0, 0),
  },
  {
    contentsColor: new THREE.Color("#5C3416"),
    jarPos: new THREE.Vector3(-1.9, -0.1, 0),
    jarRot: new THREE.Euler(0, -0.25, 0),
  },
  {
    contentsColor: new THREE.Color("#4A7534"),
    jarPos: new THREE.Vector3(1.9, -0.1, 0),
    jarRot: new THREE.Euler(0, 0.25, 0),
  },
  {
    contentsColor: new THREE.Color("#42265F"),
    jarPos: new THREE.Vector3(-1.9, -0.1, 0),
    jarRot: new THREE.Euler(0, -0.2, 0),
  },
];

export default function HeroScene({
  progressRef,
}: {
  progressRef: React.MutableRefObject<number>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const contentsCol = useRef(new THREE.Color("#C82040"));
  const isReady = useStore((s) => s.isReady);
  const isDesktop = useMediaQuery("(min-width: 768px)", true);

  useEffect(() => {
    const id = requestAnimationFrame(() => isReady());
    return () => cancelAnimationFrame(id);
  }, [isReady]);

  useFrame(() => {
    if (!groupRef.current) return;
    const p = progressRef.current * (HERO_SCENES.length - 1); // 0..3
    const idx = Math.min(HERO_SCENES.length - 2, Math.max(0, Math.floor(p)));
    const tRaw = p - idx;
    const ease = tRaw * tRaw * (3 - 2 * tRaw);
    const a = HERO_SCENES[idx];
    const b = HERO_SCENES[idx + 1];

    if (!isDesktop) {
      // Mobile: center jar, lower it below the text block
      groupRef.current.position.set(0, -1.1, 0);
      groupRef.current.rotation.set(0, 0, 0);
    } else {
      groupRef.current.position.lerpVectors(a.jarPos, b.jarPos, ease);
      groupRef.current.rotation.set(
        THREE.MathUtils.lerp(a.jarRot.x, b.jarRot.x, ease),
        THREE.MathUtils.lerp(a.jarRot.y, b.jarRot.y, ease),
        THREE.MathUtils.lerp(a.jarRot.z, b.jarRot.z, ease),
      );
    }
    contentsCol.current.lerpColors(a.contentsColor, b.contentsColor, ease);

    const ops = [0, 0, 0, 0];
    ops[idx] = 1 - ease;
    ops[idx + 1] = ease;

    groupRef.current.traverse((obj) => {
      if (!(obj instanceof THREE.Mesh)) return;
      const m = obj.material as THREE.MeshStandardMaterial;
      if (!m) return;
      if (obj.userData.isContents) m.color.copy(contentsCol.current);
      const li = obj.userData.labelIndex;
      if (typeof li === "number") m.opacity = ops[li];
    });
  });

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.3}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-5, 3, -5]} intensity={0.45} color="#C9A24A" />
      <pointLight position={[0, -2, 3]} intensity={0.3} color="#7AA33C" />
      <hemisphereLight args={["#ffffff", "#999988", 0.35]} />
      <ContactShadows position={[0, -1.6, 0]} opacity={0.3} scale={6} blur={2.4} far={3} />
      <group ref={groupRef} scale={isDesktop ? 0.85 : 0.7}>
        <PickleJar3D />
      </group>
    </>
  );
}
