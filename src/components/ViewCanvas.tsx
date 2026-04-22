"use client";

import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";

export default function ViewCanvas() {
  // Render the WebGL overlay only on real (non-touch) pointers.
  // Reasons we skip it on mobile:
  //   1. Safari/Chrome aggressively kill WebGL-heavy tabs, which LOOKS like
  //      the page is auto-reloading when the user comes back to it.
  //   2. `eventSource={document.body}` attaches pointer/touch listeners on
  //      <body> — which occasionally swallows tap events on buttons.
  //   3. Every 3D hover interaction is mouse-only anyway.
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isTouch =
      matchMedia("(pointer: coarse)").matches ||
      matchMedia("(hover: none)").matches;
    setEnabled(!isTouch);
  }, []);

  if (!enabled) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100dvh",
        pointerEvents: "none",
        zIndex: 10,
      }}
    >
      <Canvas
        style={{ width: "100%", height: "100%", pointerEvents: "none" }}
        eventSource={typeof document !== "undefined" ? document.body : undefined}
        shadows
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        camera={{ fov: 35, position: [0, 0, 7] }}
        frameloop="always"
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={null}>
          <View.Port />
        </Suspense>
      </Canvas>
    </div>
  );
}
