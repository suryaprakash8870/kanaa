"use client";

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import PickleJar3D from "../PickleJar3D";
import { setJarFlavor } from "../jarUtils";

type Props = {
  prevIdx: number;
  currentIdx: number;
  nextIdx: number;
};

export default function ShowcaseScene({ prevIdx, currentIdx, nextIdx }: Props) {
  const leftRef = useRef<THREE.Group>(null);
  const centerRef = useRef<THREE.Group>(null);
  const rightRef = useRef<THREE.Group>(null);

  useEffect(() => {
    setJarFlavor(leftRef.current, prevIdx, 1);
  }, [prevIdx]);
  useEffect(() => {
    setJarFlavor(centerRef.current, currentIdx, 1);
  }, [currentIdx]);
  useEffect(() => {
    setJarFlavor(rightRef.current, nextIdx, 1);
  }, [nextIdx]);

  useFrame((_, dt) => {
    if (centerRef.current) centerRef.current.rotation.y += dt * 0.3;
  });

  return (
    <>
      <ambientLight intensity={1.0} />
      <directionalLight position={[0, 2, 3]} intensity={4} />
      <directionalLight position={[-3, 2, 2]} intensity={1.3} color="#FFE9A8" />
      <hemisphereLight args={["#ffffff", "#888877", 0.7]} />

      {/* Left (prev) */}
      <group ref={leftRef} position={[-3.4, 0, 0]} scale={0.6}>
        <PickleJar3D />
      </group>
      {/* Center (current) */}
      <group ref={centerRef} position={[0, 0, 0.8]} scale={1.0}>
        <PickleJar3D />
      </group>
      {/* Right (next) */}
      <group ref={rightRef} position={[3.4, 0, 0]} scale={0.6}>
        <PickleJar3D />
      </group>
    </>
  );
}
