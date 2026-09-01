"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { heroSlides } from "@/lib/data/home";
import { whatsappHref } from "@/lib/site";

const SLIDE_MS = 6000;

export function Hero() {
  const [active, setActive] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const whatsapp = whatsappHref();

  const start = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(
      () => setActive((i) => (i + 1) % heroSlides.length),
      SLIDE_MS,
    );
  }, []);

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
    setActive(index);
    start();
  };

  return (
    <section className="relative min-h-[88vh] overflow-hidden">
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
            className={`object-cover ${i === active ? "ken-burns" : ""}`}
          />
        </div>
      ))}

      {/* Keeps the white headline readable whatever the photo is doing. */}
      <div
        className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/35 to-black/45"
        aria-hidden
      />

      <div className="relative z-20 mx-auto flex min-h-[88vh] max-w-[1280px] flex-col justify-end px-5 pb-16 pt-32 lg:px-10 lg:pb-24">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">
          {String(active + 1).padStart(2, "0")} — {heroSlides[active].label}
        </p>

        <h1 className="mt-4 max-w-[15ch] text-[clamp(2.75rem,7vw,5.5rem)] font-extrabold leading-[0.98] tracking-tight text-white text-balance">
          Dubai, done properly.
        </h1>

        <p className="mt-6 max-w-[62ch] text-[17px] leading-relaxed text-white/90 lg:text-[19px]">
          Desert safaris, dhow cruises, yachts and city tours from a licensed Dubai tour
          operator — planned around your dates, confirmed on WhatsApp, with hotel pick-up on
          almost everything.
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <Button href="/contact" size="lg">
            Get a free quote
          </Button>
          <Button href={whatsapp} variant="ghost" size="lg">
            <WhatsAppIcon />
            WhatsApp us
          </Button>
        </div>

        <div className="mt-12 flex gap-3" role="tablist" aria-label="Hero slides">
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
    </section>
  );
}
