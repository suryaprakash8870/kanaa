"use client";

import { forwardRef, ReactNode } from "react";
import * as THREE from "three";
import PickleJar3D from "./PickleJar3D";

type Props = { children?: ReactNode };

/** Ref-able wrapper so GSAP can animate position/rotation of the jar group.
 *  Internal bobbing comes from PickleJar3D's own <Float>. */
const FloatingJar = forwardRef<THREE.Group, Props>(({ children }, ref) => {
  return (
    <group ref={ref}>
      {children}
      <PickleJar3D />
    </group>
  );
});

FloatingJar.displayName = "FloatingJar";
export default FloatingJar;
