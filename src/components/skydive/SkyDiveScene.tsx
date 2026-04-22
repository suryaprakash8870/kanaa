"use client";

import { useRef } from "react";
import * as THREE from "three";
import { Cloud, Clouds, Text } from "@react-three/drei";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PickleJar3D from "../PickleJar3D";
import { setJarFlavor } from "../jarUtils";
import { useMediaQuery } from "@/hooks/useMediaQuery";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function SkyDiveScene({ sentence }: { sentence: string }) {
  const jarRef = useRef<THREE.Group>(null);
  const cloud1 = useRef<THREE.Group>(null);
  const cloud2 = useRef<THREE.Group>(null);
  const cloudsRef = useRef<THREE.Group>(null);
  const wordsRef = useRef<THREE.Group>(null);

  const ANGLE = 75 * (Math.PI / 180);
  const gx = (d: number) => d * Math.cos(ANGLE);
  const gy = (d: number) => d * Math.sin(ANGLE);
  const xy = (d: number) => ({ x: gx(d), y: gy(-d) });

  useGSAP(() => {
    if (
      !jarRef.current ||
      !cloud1.current ||
      !cloud2.current ||
      !cloudsRef.current ||
      !wordsRef.current
    )
      return;

    setJarFlavor(jarRef.current, 3, 1); // veldt grape = finale flavor

    gsap.set(cloudsRef.current.position, { z: 10 });
    gsap.set(jarRef.current.position, { ...xy(-4) });
    gsap.set(
      wordsRef.current.children.map((w) => w.position),
      { ...xy(7), z: 2 },
    );

    gsap.to(jarRef.current.rotation, {
      y: Math.PI * 2,
      duration: 2.2,
      repeat: -1,
      ease: "none",
    });

    const D = 14;
    const DUR = 6;
    gsap.set([cloud1.current.position, cloud2.current.position], { ...xy(D) });
    gsap.to(cloud1.current.position, {
      y: `+=${gy(D * 2)}`,
      x: `+=${gx(D * -2)}`,
      ease: "none",
      repeat: -1,
      duration: DUR,
    });
    gsap.to(cloud2.current.position, {
      y: `+=${gy(D * 2)}`,
      x: `+=${gx(D * -2)}`,
      ease: "none",
      repeat: -1,
      delay: DUR / 2,
      duration: DUR,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".skydive",
        pin: true,
        start: "top top",
        end: "+=1800",
        scrub: 1.4,
      },
    });

    tl.to(cloudsRef.current.position, { z: 0, duration: 0.3 }, 0)
      .to(
        jarRef.current.position,
        { x: 0, y: 0, duration: 0.4, ease: "back.out(1.6)" },
        0,
      )
      .to(
        wordsRef.current.children.map((w) => w.position),
        {
          keyframes: [
            { x: 0, y: 0, z: -1 },
            { ...xy(-7), z: -7 },
          ],
          stagger: 0.3,
        },
        0,
      )
      .to(jarRef.current.position, {
        ...xy(4),
        duration: 0.5,
        ease: "back.in(1.6)",
      })
      .to(cloudsRef.current.position, { z: 7, duration: 0.5 });
  });

  return (
    <>
      <group ref={jarRef} scale={0.9}>
        <PickleJar3D />
        <pointLight intensity={12} color="#5F3D8A" decay={0.8} />
      </group>

      <Clouds ref={cloudsRef}>
        <Cloud ref={cloud1} bounds={[10, 10, 2]} color="#F0EBE0" />
        <Cloud ref={cloud2} bounds={[10, 10, 2]} color="#F0EBE0" />
      </Clouds>

      <group ref={wordsRef}>
        <SentenceText sentence={sentence} />
      </group>

      <ambientLight intensity={1.2} color="#E2D4F0" />
      <hemisphereLight args={["#E2D4F0", "#8C6BA8", 0.8]} />
      <directionalLight position={[2, 4, 3]} intensity={1.1} />
    </>
  );
}

function SentenceText({ sentence }: { sentence: string }) {
  const words = sentence.toUpperCase().split(" ");
  const material = new THREE.MeshBasicMaterial({ color: "#1A3D28" });
  const isDesktop = useMediaQuery("(min-width: 950px)", true);
  return (
    <>
      {words.map((w, i) => (
        <Text
          key={`${i}-${w}`}
          scale={isDesktop ? 1.1 : 0.6}
          material={material}
          anchorX="center"
          anchorY="middle"
          fontWeight={900}
          characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ!,.?'"
        >
          {w}
        </Text>
      ))}
    </>
  );
}
