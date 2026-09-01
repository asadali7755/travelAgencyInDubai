"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { destinations } from "@/lib/data/home";

const STEP = 320;

export function Destinations() {
  const row = useRef<HTMLDivElement>(null);

  const scrollBy = (direction: -1 | 1) =>
    row.current?.scrollBy({ left: direction * STEP, behavior: "smooth" });

  return (
    <section className="bg-sea-tint/60">
      <div className="mx-auto max-w-[1280px] py-20 lg:py-28">
        <Reveal className="flex flex-wrap items-end justify-between gap-6 px-5 lg:px-10">
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-sea-dark">
              Destinations &amp; cruises
            </p>
            <h2 className="mt-3 text-[clamp(2rem,4.2vw,3rem)] font-extrabold leading-tight tracking-tight">
              Where we&rsquo;ll take you
            </h2>
            <span className="mt-4 block h-1 w-16 rounded-full bg-sea" />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label="Scroll destinations left"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-sea/30 text-sea transition-colors hover:bg-sea hover:text-white"
            >
              <ArrowLeftIcon />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="Scroll destinations right"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-sea/30 text-sea transition-colors hover:bg-sea hover:text-white"
            >
              <ArrowRightIcon />
            </button>
          </div>
        </Reveal>

        <div
          ref={row}
          className="scroll-row mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 lg:px-10"
        >
          {destinations.map((destination) => (
            <article
              key={destination.name}
              className="group w-[260px] shrink-0 snap-start sm:w-[300px]"
            >
              <div className="relative aspect-3/4 overflow-hidden rounded-[var(--radius-xl2)]">
                <Image
                  src={destination.image}
                  alt={destination.alt}
                  fill
                  sizes="300px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-4 text-[19px] font-bold leading-tight">{destination.name}</h3>
              <p className="mt-1 text-[14px] text-ink/65">{destination.sub}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
