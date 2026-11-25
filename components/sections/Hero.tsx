import Link from "next/link";
import { HeroQuickLinks } from "@/components/sections/hero/HeroQuickLinks";
import { HeroWall } from "@/components/sections/hero/HeroWall";
import { PointerScope } from "@/components/sections/hero/PointerScope";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { attractions } from "@/lib/data/attractions";
import { whatsappHref } from "@/lib/site";

/**
 * The home page's first screen: the pitch on the left, and on the right a 3D
 * wall of real UAE places drifting past, lit by a spotlight that follows the
 * mouse. Hover a column and it stops; hover a photo and it lifts and names
 * itself; click it and you are on that page.
 *
 * Server-rendered apart from PointerScope, which only publishes the mouse
 * position to CSS. The h1 and the paragraph under it are never animated in:
 * they are the Largest Contentful Paint and paint with the first frame.
 * Styles are in app/hero.css and app/hero-scroll.css.
 */
export function Hero() {
  const whatsapp = whatsappHref();

  return (
    <PointerScope className="hero relative min-h-[92svh] overflow-hidden bg-[#071d20]" labelledBy="hero-title">
      <HeroWall />

      {/* Keeps the copy readable over the wall: solid on the left, clear on the right. */}
      <div className="hero-fade pointer-events-none absolute inset-0 z-10" aria-hidden />
      <span className="hero-glow hero-glow-a" aria-hidden />

      <div className="pointer-events-none relative z-20 mx-auto flex min-h-[92svh] max-w-[1280px] items-end px-5 pb-14 pt-32 lg:items-center lg:px-10 lg:pb-20">
        <div className="hero-content pointer-events-auto min-w-0 max-w-[620px]">
          <Link
            href="/dubai-tours/speed-boat-tour"
            className="hero-in inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 bg-black/35 py-1 pl-1 pr-4 text-[13px] font-semibold text-white no-underline hover:bg-black/50 hover:text-white"
          >
            <span className="rounded-full bg-sun px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
              New
            </span>
            Speed boat tours, prices compared
            <ArrowRightIcon className="h-4 w-4" />
          </Link>

          <h1
            id="hero-title"
            className="mt-6 text-[clamp(2.75rem,7vw,5.5rem)] font-extrabold leading-[0.98] tracking-tight text-white text-balance"
          >
            Dubai, done <span className="hero-shine">properly.</span>
          </h1>

          <p className="mt-6 max-w-[54ch] text-[17px] leading-relaxed text-white/85 lg:text-[19px]">
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

          <p className="hero-in mt-6 hidden text-[13px] text-white/55 lg:block" style={{ animationDelay: "0.6s" }}>
            Move your mouse over the wall — every photo opens its guide. {attractions.length} places
            across the UAE, with prices and opening hours.
          </p>
        </div>
      </div>

      <span className="hero-scroll-cue hidden lg:flex" aria-hidden>
        Scroll
        <span className="hero-scroll-line" />
      </span>
    </PointerScope>
  );
}
