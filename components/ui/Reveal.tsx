"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Renders as this element so the wrapper never adds a stray div. */
  as?: ElementType;
  className?: string;
  /** Stagger a group of siblings without writing a style per child. */
  delayMs?: number;
};

/**
 * Fades its children up the first time they enter the viewport, then stops
 * observing. The initial hidden state lives in globals.css on [data-reveal], so
 * server-rendered markup is already in the right position before hydration.
 *
 * Anything that never intersects — a section below a failed image, a browser
 * without IntersectionObserver — is shown rather than left invisible.
 */
export function Reveal({ children, as: Tag = "div", className, delayMs = 0 }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-in");
      return;
    }

    // Anything already at or above the fold on mount — a deep link, a restored
    // scroll position, a fast scroll before hydration — is shown straight away
    // rather than waiting for an intersection that has already happened.
    if (el.getBoundingClientRect().top < window.innerHeight) {
      el.classList.add("is-in");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      },
      // Fire as soon as any sliver enters, held back slightly so the animation
      // starts just after the section crosses the bottom edge.
      { threshold: 0, rootMargin: "0px 0px -12% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      className={className}
      style={delayMs ? { transitionDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
