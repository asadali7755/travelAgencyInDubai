"use client";

import Link from "next/link";
import type { CSSProperties, KeyboardEvent } from "react";
import { OrbitCard } from "@/components/sections/orbit/OrbitCard";
import { useOrbit } from "@/components/sections/orbit/useOrbit";
import { Button } from "@/components/ui/Button";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/ui/Icons";
import type { Tour } from "@/lib/data/tours";

/**
 * The signature experiences as a 3D ring you can spin: drag or swipe it, use
 * the arrows or the keyboard, or tap a side card to bring it round. The front
 * card's details sit underneath with the one action that matters.
 *
 * The 3D is plain CSS transforms (see .orbit-* in app/motion.css), so it costs
 * no WebGL library and the ring is laid out by the server before any script
 * runs — it is already in place when it hydrates.
 */
export function ExperienceOrbit({ tours }: { tours: readonly Tour[] }) {
  const count = tours.length;
  const { ringRef, active, interacted, goTo, next, prev, wasDrag, handlers } = useOrbit(count);
  const current = tours[active];

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      next();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      prev();
    }
  };

  const distanceOf = (i: number) => {
    const d = Math.abs(i - active) % count;
    return Math.min(d, count - d);
  };

  return (
    <section className="orbit-section relative overflow-hidden text-white">
      <div className="mx-auto max-w-[1280px] px-5 pt-20 lg:px-10 lg:pt-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-sun">
              Signature experiences
            </p>
            <h2 className="mt-3 text-[clamp(2rem,4.2vw,3rem)] font-extrabold leading-tight tracking-tight">
              The Dubai you came for
            </h2>
            <p className="mt-3 max-w-[48ch] text-[16px] leading-relaxed text-white/70">
              Spin the ring to browse every experience we book — from the dunes at dusk to the
              Marina at full throttle.
            </p>
          </div>
          <Link
            href="/dubai-tours"
            className="inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold text-white no-underline hover:text-sun"
          >
            All tours
            <ArrowRightIcon />
          </Link>
        </div>
      </div>

      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Signature experiences"
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="orbit-stage relative mt-6 select-none outline-none focus-visible:ring-2 focus-visible:ring-sun/70"
        {...handlers}
      >
        <div
          ref={ringRef}
          className="orbit-ring"
          style={{ "--n": count } as CSSProperties}
        >
          {tours.map((tour, i) => (
            <OrbitCard
              key={tour.slug}
              tour={tour}
              index={i}
              distance={distanceOf(i)}
              onSelect={goTo}
              wasDrag={wasDrag}
            />
          ))}
        </div>
        <span aria-hidden className="orbit-floor" />
        <p
          aria-hidden
          data-hidden={interacted}
          className="orbit-hint pointer-events-none absolute inset-x-0 bottom-3 text-center text-[13px] font-semibold tracking-wide text-white/60"
        >
          ← Drag to spin →
        </p>
      </div>

      <div className="mx-auto grid max-w-[1280px] gap-6 px-5 pb-20 pt-4 lg:grid-cols-[1fr_auto] lg:items-end lg:px-10 lg:pb-28">
        <div aria-live="polite" key={current.slug} className="orbit-detail min-h-[9.5rem]">
          <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-white/55">
            {active + 1} / {count} · {current.durationLabel}
          </p>
          <h3 className="mt-2 text-[clamp(1.5rem,3vw,2rem)] font-extrabold leading-tight">
            {current.title}
          </h3>
          <p className="mt-2 max-w-[60ch] text-[16px] leading-relaxed text-white/75">
            {current.summary}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous experience"
            className="grid h-12 w-12 place-items-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/10"
          >
            <ArrowLeftIcon />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next experience"
            className="grid h-12 w-12 place-items-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/10"
          >
            <ArrowRightIcon />
          </button>
          <Button href={`/dubai-tours/${current.slug}`} variant="onSea" size="lg">
            View this tour
          </Button>
        </div>
      </div>
    </section>
  );
}
