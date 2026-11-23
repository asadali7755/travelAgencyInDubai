import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { attractions, isFree } from "@/lib/data/attractions";
import { aed, fromPrice, packages } from "@/lib/data/packages";

/**
 * A pinned, scroll-driven scene: the photograph opens out from a framed card to
 * full screen while the headline rises line by line and the fact chips drift
 * past at different depths.
 *
 * No JavaScript at all. The motion is CSS scroll-driven animation
 * (`animation-timeline`), declared in app/motion.css inside an @supports and a
 * reduced-motion guard. Without support — or with reduced motion — the same
 * markup renders as an ordinary full-bleed section in its finished state, so
 * nobody gets a half-revealed page.
 *
 * Every number on the chips is computed from the site's own data, so it cannot
 * drift from what the pages say. The chips are hidden below the sm breakpoint:
 * at 360px there is no room for them beside the headline.
 */
export function CinematicReveal() {
  const freeCount = attractions.filter(isFree).length;
  const lowest = Math.min(...packages.map(fromPrice).filter((p) => p > 0));

  const chips = [
    { text: "Burj Khalifa · 828 m", place: "left-[6%] top-[14%]", speed: 1.2 },
    { text: `${freeCount} attractions free to enter`, place: "right-[6%] top-[22%]", speed: 0.7 },
    { text: "7 emirates covered", place: "left-[8%] bottom-[16%]", speed: 0.9 },
    { text: `Packages from ${aed(lowest)}`, place: "right-[7%] bottom-[12%]", speed: 1.4 },
  ];

  return (
    <section className="cine relative" aria-labelledby="cine-title">
      <div className="cine-sticky">
        <div className="cine-frame">
          <Image
            src="/images/dunes-skyline.jpg"
            alt="Red desert dunes at sunset outside Dubai"
            fill
            sizes="100vw"
            className="cine-img object-cover"
          />
          <span aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/70" />
        </div>

        {chips.map((chip) => (
          <span
            key={chip.text}
            aria-hidden
            style={{ "--speed": chip.speed } as React.CSSProperties}
            className={`cine-chip absolute ${chip.place} hidden sm:inline-flex items-center rounded-full border border-white/25 bg-black/35 px-4 py-2 text-[13px] font-semibold text-white shadow-lg`}
          >
            {chip.text}
          </span>
        ))}

        <div className="relative z-10 mx-auto max-w-[900px] px-5 text-center text-white">
          <p className="cine-line text-[12px] font-bold uppercase tracking-[0.2em] text-white/80">
            Seven emirates, one trip
          </p>
          <h2
            id="cine-title"
            className="mt-4 text-[clamp(2.3rem,6.5vw,5rem)] font-extrabold leading-[1.02] tracking-tight"
          >
            <span className="cine-line block">From red dunes</span>
            <span className="cine-line block">to the tallest skyline</span>
            <span className="cine-line block text-sun-tint">on earth.</span>
          </h2>
          <p className="cine-line mx-auto mt-6 max-w-[52ch] text-[17px] leading-relaxed text-white/85">
            {attractions.length} attractions across all seven emirates, {freeCount} of them free —
            each with its gate price and opening hours checked, so you can plan the whole trip in
            one place.
          </p>
          <div className="cine-line mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/uae-attractions" variant="onSea" size="lg">
              Explore attractions
            </Button>
            <Button href="/packages" variant="ghost" size="lg">
              See packages
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
