"use client";

import { useEffect, useState } from "react";

/**
 * Returns true when the page is scrolled past `threshold` AND the user is scrolling DOWN.
 * Returns false when scrolling up or when near the top.
 *
 * Used for auto-hiding the offer banner + navbar on downward scroll.
 */
export function useHideOnScroll(threshold = 80): boolean {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let raf = 0;

    const update = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      // ignore tiny jitters
      if (Math.abs(delta) < 4) return;
      if (y < threshold) {
        setHidden(false);
      } else if (delta > 0) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastY = y;
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [threshold]);

  return hidden;
}
