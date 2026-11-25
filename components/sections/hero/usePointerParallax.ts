"use client";

import { useEffect, type RefObject } from "react";

/**
 * Follows the pointer over an element and writes its position, in pixels, as
 * `--mx` / `--my` onto the one child marked `data-pointer-target` — in the
 * hero, the spotlight.
 *
 * Only onto that child, never the section itself: custom properties inherit,
 * so setting them on the section made the browser re-check the style of every
 * element in the hero on every mouse move, which was the main cost of moving
 * the mouse over it. Nothing else is written per move.
 *
 * Mouse and trackpad only, and never for reduced motion. Writes happen inside
 * requestAnimationFrame, at most once a frame, so nothing re-renders.
 */
export function usePointerParallax(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    const target = el?.querySelector<HTMLElement>("[data-pointer-target]");
    if (!el || !target) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let x = 0;
    let y = 0;

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      x = event.clientX - rect.left;
      y = event.clientY - rect.top;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        target.style.setProperty("--mx", `${Math.round(x)}px`);
        target.style.setProperty("--my", `${Math.round(y)}px`);
      });
    };

    el.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointermove", onMove);
    };
  }, [ref]);
}
