import * as THREE from "three";

export const FLAVOR_COLORS = [
  new THREE.Color("#C82040"), // tomato
  new THREE.Color("#5C3416"), // vatha
  new THREE.Color("#4A7534"), // spinach
  new THREE.Color("#42265F"), // veldt
];

export function setJarFlavor(group: THREE.Group | null, index: number, t = 1) {
  if (!group) return;
  const target = FLAVOR_COLORS[index];
  group.traverse((obj) => {
    if (!(obj instanceof THREE.Mesh)) return;
    const m = obj.material as THREE.MeshStandardMaterial;
    if (!m) return;
    if (obj.userData.isContents) m.color.lerp(target, t);
    const li = obj.userData.labelIndex;
    if (typeof li === "number") {
      m.opacity = li === index ? 1 : 0;
    }
  });
}
