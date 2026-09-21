import Link from "next/link";
import { PackageCard } from "@/components/packages/PackageCard";
import { PriceNote } from "@/components/packages/PriceNote";
import { Reveal } from "@/components/ui/Reveal";
import { aed, fromPrice, packages } from "@/lib/data/packages";

/**
 * The packages strip on the home page.
 *
 * One from each kind — a day tour, a UAE holiday and an outbound break — rather
 * than the three cheapest, so a visitor sees the shape of the whole catalogue
 * from the home page instead of only its bottom end.
 */
export function PackagesTeaser() {
  const featured = [
    packages.find((p) => p.kind === "day-tour"),
    packages.find((p) => p.kind === "uae-holiday"),
    packages.find((p) => p.kind === "outbound"),
  ].filter((p): p is NonNullable<typeof p> => Boolean(p));

  const cheapest = Math.min(...packages.map(fromPrice).filter((n) => n > 0));

  return (
    <section className="bg-sand">
      <div className="mx-auto max-w-[1280px] px-5 py-20 lg:px-10 lg:py-24">
        <Reveal>
          <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-gold-dark">
            Packages &amp; pricing
          </p>
          <h2 className="mt-3 max-w-[20ch] text-[clamp(1.9rem,4vw,2.8rem)] font-extrabold leading-tight tracking-tight">
            Real numbers, before you have to ask
          </h2>
          <span className="mt-4 block h-1 w-16 rounded-full bg-gold" />
          <p className="mt-5 max-w-[62ch] text-[17px] leading-relaxed text-ink/75">
            {packages.length} packages with prices attached, from a half-day city tour at{" "}
            {aed(cheapest)} to flight-inclusive breaks in Baku, Tbilisi, Istanbul and Phuket.
            Every itinerary lists what is included and, more usefully, what is not.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((pkg, i) => (
            <Reveal key={pkg.slug} delayMs={i * 80}>
              <PackageCard pkg={pkg} />
            </Reveal>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
          <Link
            href="/packages"
            className="inline-flex min-h-13 items-center rounded-full bg-sea px-8 text-base font-semibold text-white no-underline hover:bg-sea-dark"
          >
            All packages &amp; prices
          </Link>
          <PriceNote checked="2026-09-18" compact className="max-w-[40ch]" />
        </div>
      </div>
    </section>
  );
}
