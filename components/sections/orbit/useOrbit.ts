"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";

/** Degrees of rotation per pixel dragged. About one card per 150px. */
const DEG_PER_PX = 0.3;
/** How far a flick carries, in ms of the release velocity. */
const FLING_MS = 220;
/** Movement beyond this is a drag, so the click that ends it is swallowed. */
const CLICK_SLOP_PX = 6;

/**
 * State and gestures for the 3D ring carousel.
 *
 * Rotation lives in a ref and is written to the ring as a CSS variable, so a
 * drag never re-renders React: only the active index is state, and it changes
 * once per card, not once per frame. Snapping is a CSS transition switched on
 * by `data-animate`, so the settle runs on the compositor too.
 *
 * Index grows as rotation decreases: dragging left brings the next card round.
 */
export function useOrbit(count: number) {
  const step = 360 / count;
  const ringRef = useRef<HTMLDivElement>(null);
  const rotation = useRef(0);
  const drag = useRef({ on: false, startX: 0, startRot: 0, lastX: 0, lastT: 0, v: 0, moved: 0 });
  // Pointer events can arrive several times per frame; only the last one each
  // frame is drawn, so a drag never does more work than the screen can show.
  const frame = useRef(0);
  const pending = useRef(0);
  const [active, setActive] = useState(0);
  const [interacted, setInteracted] = useState(false);

  const indexFor = useCallback(
    (rot: number) => ((Math.round(-rot / step) % count) + count) % count,
    [count, step],
  );

  const apply = useCallback(
    (rot: number, animate: boolean) => {
      rotation.current = rot;
      const ring = ringRef.current;
      if (ring) {
        ring.dataset.animate = String(animate);
        ring.style.setProperty("--rot", `${rot}deg`);
      }
      const next = indexFor(rot);
      setActive((current) => (current === next ? current : next));
    },
    [indexFor],
  );

  const goTo = useCallback(
    (index: number) => {
      const snapped = Math.round(rotation.current / step) * step;
      let diff = (((index - indexFor(snapped)) % count) + count) % count;
      if (diff > count / 2) diff -= count;
      apply(snapped - diff * step, true);
      setInteracted(true);
    },
    [apply, count, indexFor, step],
  );

  const next = useCallback(() => goTo(indexFor(rotation.current) + 1), [goTo, indexFor]);
  const prev = useCallback(() => goTo(indexFor(rotation.current) - 1), [goTo, indexFor]);

  const onPointerDown = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    drag.current = {
      on: true,
      startX: event.clientX,
      startRot: rotation.current,
      lastX: event.clientX,
      lastT: event.timeStamp,
      v: 0,
      moved: 0,
    };
  };

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    const d = drag.current;
    if (!d.on) return;
    const dx = event.clientX - d.startX;
    d.moved = Math.max(d.moved, Math.abs(dx));
    // Capture only once it is clearly a horizontal drag, so a tap on a card
    // still reaches the link and a vertical swipe still scrolls the page.
    if (d.moved > CLICK_SLOP_PX && !event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    const dt = Math.max(1, event.timeStamp - d.lastT);
    d.v = ((event.clientX - d.lastX) * DEG_PER_PX) / dt;
    d.lastX = event.clientX;
    d.lastT = event.timeStamp;
    pending.current = d.startRot + dx * DEG_PER_PX;
    if (!frame.current) {
      frame.current = requestAnimationFrame(() => {
        frame.current = 0;
        apply(pending.current, false);
      });
    }
  };

  const onPointerUp = () => {
    const d = drag.current;
    if (!d.on) return;
    d.on = false;
    if (d.moved <= CLICK_SLOP_PX) return;
    if (frame.current) {
      cancelAnimationFrame(frame.current);
      frame.current = 0;
      rotation.current = pending.current;
    }
    const projected = rotation.current + d.v * FLING_MS;
    apply(Math.round(projected / step) * step, true);
    setInteracted(true);
  };

  /** True when the pointer-up that produced this click ended a drag. */
  const wasDrag = () => drag.current.moved > CLICK_SLOP_PX;

  // One spin into place the first time the ring scrolls into view: the moment
  // that tells a visitor this is something they can turn. Skipped entirely
  // for reduced motion.
  useEffect(() => {
    const ring = ringRef.current;
    if (!ring || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        apply(step * 3, false);
        requestAnimationFrame(() => requestAnimationFrame(() => apply(0, true)));
      },
      { threshold: 0.4 },
    );
    io.observe(ring);
    return () => io.disconnect();
  }, [apply, step]);

  return {
    ringRef,
    active,
    interacted,
    goTo,
    next,
    prev,
    wasDrag,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel: onPointerUp,
    },
  };
}
