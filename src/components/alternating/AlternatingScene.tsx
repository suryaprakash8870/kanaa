"use client";

import { useRef } from "react";
import { ContactShadows } from "@react-three/drei";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import PickleJar3D from "../PickleJar3D";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { setJarFlavor } from "../jarUtils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function AlternatingScene() {
  const jarRef = useRef<THREE.Group>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)", true);

  useGSAP(
    () => {
      if (!jarRef.current) return;
      setJarFlavor(jarRef.current, 0, 1);

      const sections = gsap.utils.toArray<HTMLElement>(".alt-section");
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".alt-view",
          endTrigger: ".alt-container",
          pin: true,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      sections.forEach((_, i) => {
        if (i === 0) return;
        const odd = i % 2 !== 0;
        const xPos = isDesktop ? (odd ? -1.1 : 1.1) : 0;
        const yRot = isDesktop ? (odd ? 0.4 : -0.4) : 0;

        tl.to(jarRef.current!.position, { x: xPos, ease: "power2.inOut" }).to(
          jarRef.current!.rotation,
          { y: yRot, ease: "power2.inOut" },
          "<",
        );
        tl.add(() => setJarFlavor(jarRef.current, i % 4, 0.15));
      });
    },
    { dependencies: [isDesktop] },
  );

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} />
      <directionalLight position={[-5, 3, -5]} intensity={0.5} color="#C9A24A" />
      <hemisphereLight args={["#ffffff", "#999988", 0.35]} />
      <ContactShadows position={[0, -1.6, 0]} opacity={0.25} scale={6} blur={2.4} far={3} />
      <group
        ref={jarRef}
        position={[isDesktop ? 1.1 : 0, isDesktop ? -0.1 : 1.2, 0]}
        scale={isDesktop ? 0.85 : 0.65}
      >
        <PickleJar3D />
      </group>
    </>
  );
}
