"use client";

import { useRef, type ReactNode } from "react";
import { usePointerParallax } from "@/components/sections/hero/usePointerParallax";

/**
 * A <section> that tracks the pointer for its spotlight (see
 * usePointerParallax). It is the only client code in the hero: everything
 * inside it is server-rendered and passed through as children, so the photo
 * wall and copy ship as HTML, not JavaScript.
 */
export function PointerScope({
  children,
  className,
  labelledBy,
}: {
  children: ReactNode;
  className?: string;
  labelledBy?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  usePointerParallax(ref);

  return (
    <section ref={ref} className={className} aria-labelledby={labelledBy}>
      {children}
    </section>
  );
}
