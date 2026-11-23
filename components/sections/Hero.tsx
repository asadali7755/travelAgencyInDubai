"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { HeroCardStack } from "@/components/sections/hero/HeroCardStack";
import { HeroQuickLinks } from "@/components/sections/hero/HeroQuickLinks";
import { usePointerParallax } from "@/components/sections/hero/usePointerParallax";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { heroSlides } from "@/lib/data/home";
import { whatsappHref } from "@/lib/site";

const SLIDE_MS = 6000;

/**
 * The home page's first screen: a crossfading photograph with pointer
 * parallax, drifting light, a 3D postcard stack of the same scenes on desktop,
 * and the shortcuts most visitors are looking for.
 *
 * Performance rule for everything here: the h1 and the paragraph under it are
 * never hidden or delayed. They are the Largest Contentful Paint, so they
 * paint with the first frame and only the supporting pieces animate in.
 * Styles and motion are in app/hero.css.
 */
export function Hero() {
  // `prev` keeps its slow zoom running while it fades out; removing the class
  // mid-fade made the outgoing photo snap back from its zoomed-in scale.
  const [slideState, setSlideState] = useState({ active: 0, prev: -1 });
  const active = slideState.active;
  const show = useCallback(
    (next: (current: number) => number) =>
      setSlideState((s) => ({ active: next(s.active), prev: s.active })),
    [],
  );
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const section = useRef<HTMLElement>(null);
  const whatsapp = whatsappHref();
  usePointerParallax(section);

  const start = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => show((i) => (i + 1) % heroSlides.length), SLIDE_MS);
  }, [show]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced) start();
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [start]);

  // A manual pick restarts the clock, so the slide the visitor chose gets its
  // full six seconds rather than the remainder of the previous one.
  const pick = (index: number) => {
    if (index !== active) show(() => index);
    start();
  };

  return (
    <section ref={section} className="hero relative min-h-[92svh] overflow-hidden bg-ink">
      <div className="hero-bg absolute -inset-6">
        {heroSlides.map((slide, i) => (
          <div
            key={slide.image}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: i === active ? 1 : 0, zIndex: i === active ? 2 : 1 }}
            aria-hidden={i !== active}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              className={`object-cover ${i === active || i === slideState.prev ? "ken-burns" : ""}`}
            />
          </div>
        ))}
      </div>

      {/* Readability first: the white headline must hold on every photograph. */}
      <div
        className="absolute inset-0 z-10 bg-gradient-to-t from-black/85 via-black/40 to-black/50"
        aria-hidden
      />
      <span className="hero-glow hero-glow-a" aria-hidden />
      <span className="hero-glow hero-glow-b" aria-hidden />

      <div className="relative z-20 mx-auto grid min-h-[92svh] max-w-[1280px] grid-cols-[minmax(0,1fr)] items-end gap-10 px-5 pb-14 pt-32 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:px-10 lg:pb-20">
        <div className="hero-content min-w-0">
          <Link
            href="/dubai-tours/speed-boat-tour"
            className="hero-in inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 bg-black/30 py-1 pl-1 pr-4 text-[13px] font-semibold text-white no-underline hover:bg-white/20 hover:text-white"
          >
            <span className="rounded-full bg-sun px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
              New
            </span>
            Speed boat tours, prices compared
            <ArrowRightIcon className="h-4 w-4" />
          </Link>

          <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/75">
            {String(active + 1).padStart(2, "0")} — {heroSlides[active].label}
          </p>

          <h1 className="mt-3 max-w-[15ch] text-[clamp(2.75rem,7vw,5.5rem)] font-extrabold leading-[0.98] tracking-tight text-white text-balance">
            Dubai, done <span className="hero-shine">properly.</span>
          </h1>

          <p className="mt-6 max-w-[58ch] text-[17px] leading-relaxed text-white/90 lg:text-[19px]">
            Desert safaris, dhow cruises, yachts and city tours from a licensed Dubai tour
            operator — planned around your dates, confirmed on WhatsApp, with hotel pick-up on
            almost everything.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/contact" size="lg" className="hero-cta">
              Get a free quote
            </Button>
            <Button href={whatsapp} variant="ghost" size="lg">
              <WhatsAppIcon />
              WhatsApp us
            </Button>
          </div>

          <HeroQuickLinks />

          <div className="mt-8 flex gap-3" role="tablist" aria-label="Hero slides">
            {heroSlides.map((slide, i) => (
              /* The bar stays 3px; the padding around it gives the finger a
                 44px target without changing how the indicator looks. */
              <button
                key={slide.image}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={slide.label}
                onClick={() => pick(i)}
                className="group -my-5 flex h-11 w-13 items-center border-0 bg-transparent p-0"
              >
                <span
                  data-active={i === active}
                  className="indicator-fill relative block h-[3px] w-full overflow-hidden rounded-full bg-white/30"
                />
              </button>
            ))}
          </div>
        </div>

        <HeroCardStack slides={heroSlides} active={active} onPick={pick} />
      </div>

      <span className="hero-scroll-cue hidden lg:flex" aria-hidden>
        Scroll
        <span className="hero-scroll-line" />
      </span>
    </section>
  );
}
