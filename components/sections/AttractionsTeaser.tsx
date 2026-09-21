import Link from "next/link";
import { AttractionCard } from "@/components/attractions/AttractionCard";
import { Reveal } from "@/components/ui/Reveal";
import { attractions, emirates, emiratePath, emirateCount, isFree } from "@/lib/data/attractions";

/**
 * The attractions strip on the home page.
 *
 * Six cards plus the full set of emirate links. The emirate links matter more
 * than they look: they are the internal path from the home page to every hub,
 * which is what stops the emirate pages being orphans that only the sitemap
 * knows about.
 */
export function AttractionsTeaser() {
  const featured = attractions.slice(0, 6);
  const freeCount = attractions.filter(isFree).length;

  return (
    <section className="bg-page">
      <div className="mx-auto max-w-[1280px] px-5 py-20 lg:px-10 lg:py-24">
        <Reveal>
          <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-sea-dark">
            All seven emirates
          </p>
          <h2 className="mt-3 max-w-[20ch] text-[clamp(1.9rem,4vw,2.8rem)] font-extrabold leading-tight tracking-tight">
            UAE attractions, with what they actually cost
          </h2>
          <span className="mt-4 block h-1 w-16 rounded-full bg-sea" />
          <p className="mt-5 max-w-[62ch] text-[17px] leading-relaxed text-ink/75">
            {attractions.length} places worth your time, each with 2026 gate prices, opening
            hours and honest advice on what to skip. {freeCount} of them are free to enter —
            including the most impressive building in the country.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((attraction, i) => (
            <Reveal key={attraction.slug} delayMs={(i % 3) * 80}>
              <AttractionCard attraction={attraction} />
            </Reveal>
          ))}
        </div>

        <nav aria-label="Attractions by emirate" className="mt-10 flex flex-wrap gap-2.5">
          {emirates.map((emirate) => (
            <Link
              key={emirate.id}
              href={emiratePath(emirate.id)}
              className="flex min-h-11 items-center rounded-full border border-card-border bg-surface px-5 text-[14px] text-ink/75 no-underline transition-colors hover:border-sea/40"
            >
              {emirate.name}
              <span className="ml-2 text-ink/45">{emirateCount(emirate.id)}</span>
            </Link>
          ))}
        </nav>

        <Link
          href="/uae-attractions"
          className="mt-8 inline-flex min-h-13 items-center rounded-full bg-sea px-8 text-base font-semibold text-white no-underline hover:bg-sea-dark"
        >
          See all {attractions.length} attractions
        </Link>
      </div>
    </section>
  );
}
