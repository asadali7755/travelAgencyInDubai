import Image from "next/image";
import Link from "next/link";
import type { MouseEvent } from "react";
import { ArrowRightIcon } from "@/components/ui/Icons";
import type { HeroSlide } from "@/lib/data/home";

/**
 * The hero's scenes as a fanned stack of postcards in 3D, desktop only.
 *
 * The front card is always the scene behind the headline, and leads to the
 * page that sells it. A card further back is a slide picker: clicking it
 * brings it forward and changes the background, which is the interaction that
 * makes the whole hero feel alive. The stack tilts with the pointer through
 * the --px / --py variables the hero publishes (see app/hero.css).
 *
 * The cards load a card-sized copy of each photograph (`sizes="300px"`), not
 * the full-width hero image. Reusing the 1920px background copies saved a few
 * kilobytes but made the browser re-composite three huge images inside a 3D
 * context on every frame of the float, which halved the frame rate.
 */
export function HeroCardStack({
  slides,
  active,
  onPick,
}: {
  slides: readonly HeroSlide[];
  active: number;
  onPick: (index: number) => void;
}) {
  const count = slides.length;

  return (
    <div className="hero-stack-wrap hidden lg:block" aria-label="Featured scenes">
      <div className="hero-stack">
        {slides.map((slide, i) => {
          const pos = (i - active + count) % count;
          const front = pos === 0;

          const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
            if (front) return;
            event.preventDefault();
            onPick(i);
          };

          return (
            <Link
              key={slide.image}
              href={slide.href}
              onClick={onClick}
              data-pos={pos}
              aria-label={front ? slide.cta : `Show: ${slide.label}`}
              className="hero-card group block overflow-hidden rounded-[26px] text-white no-underline"
            >
              <Image
                src={slide.image}
                alt=""
                fill
                sizes="300px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent"
              />
              <span className="hero-card-gloss" aria-hidden />
              <span className="hero-card-shade" aria-hidden />
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                <span>
                  <span className="block text-[11px] font-bold uppercase tracking-[0.16em] text-white/70">
                    {slide.label}
                  </span>
                  <span className="mt-1 block text-[19px] font-extrabold leading-tight">
                    {slide.cta}
                  </span>
                </span>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/25 transition-colors group-hover:bg-white group-hover:text-sea">
                  <ArrowRightIcon />
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
