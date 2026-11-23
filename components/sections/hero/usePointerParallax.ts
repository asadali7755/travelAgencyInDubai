"use client";

import { useEffect, type RefObject } from "react";

/**
 * Publishes the pointer position over an element as `--px` and `--py`, each
 * from -1 to 1, for CSS to turn into parallax and 3D tilt.
 *
 * Mouse and trackpad only, and never for reduced motion: a phone has no
 * pointer to follow, and the layers simply sit still. Values are written in
 * requestAnimationFrame straight onto the element, so nothing re-renders.
 */
export function usePointerParallax(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;

    const set = (x: number, y: number) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.setProperty("--px", x.toFixed(3));
        el.style.setProperty("--py", y.toFixed(3));
      });
    };

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      set(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        ((event.clientY - rect.top) / rect.height) * 2 - 1,
      );
    };
    const onLeave = () => set(0, 0);

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [ref]);
}
