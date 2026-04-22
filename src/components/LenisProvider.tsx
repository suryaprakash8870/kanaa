"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

export default function LenisProvider() {
  useEffect(() => {
    // On touch devices (phones/tablets), native momentum scroll is already smooth
    // and Lenis's `syncTouch` hijacks touch events — which on iOS/Android
    // delays or swallows taps entirely. Opt out of Lenis on coarse pointers and
    // just let the OS handle scrolling.
    const isTouch =
      matchMedia("(pointer: coarse)").matches ||
      matchMedia("(hover: none)").matches;
    if (isTouch) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
