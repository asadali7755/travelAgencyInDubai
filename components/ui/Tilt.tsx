"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Tilts its child in 3D towards the pointer, with a soft glare that follows it.
 *
 * Only on a real mouse or trackpad (`hover: hover` and `pointer: fine`) and only
 * when the visitor has not asked for reduced motion. On a phone there is no
 * hover to follow, so the card gets the CSS press effect instead.
 *
 * Writes CSS variables straight onto the element inside requestAnimationFrame,
 * so moving the pointer never re-renders React and never touches layout — the
 * transform runs on the compositor. Styles live in app/motion.css.
 */
export function Tilt({ children, max = 8 }: { children: ReactNode; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!canHover.matches || reduce.matches) return;

    let frame = 0;

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;

      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.setProperty("--ry", `${(x - 0.5) * max * 2}deg`);
        el.style.setProperty("--rx", `${(0.5 - y) * max * 2}deg`);
        el.style.setProperty("--gx", `${x * 100}%`);
        el.style.setProperty("--gy", `${y * 100}%`);
      });
      el.dataset.tilting = "true";
    };

    const onLeave = () => {
      cancelAnimationFrame(frame);
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
      delete el.dataset.tilting;
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [max]);

  return (
    <div ref={ref} className="tilt h-full">
      {children}
    </div>
  );
}
