import { Reveal } from "@/components/ui/Reveal";
import type { Package } from "@/lib/data/packages";

/**
 * Itinerary and the two inclusion lists.
 *
 * The itinerary is an ordered list because the order is the meaning, and the
 * same array feeds the ItemList inside the TouristTrip structured data — page
 * and schema cannot disagree because they read the same source.
 */
export function PackageItinerary({ pkg }: { pkg: Package }) {
  return (
    <>
      <Reveal className="mt-12">
        <h2 className="text-[26px] font-extrabold tracking-tight">
          {pkg.durationNights > 0 ? "Day by day" : "How the day runs"}
        </h2>
        <ol className="mt-6 border-t border-divider">
          {pkg.itinerary.map((stop) => (
            <li
              key={stop.label}
              className="grid gap-2 border-b border-divider py-5 sm:grid-cols-[96px_1fr] sm:gap-5"
            >
              <p className="text-[18px] font-bold text-sea">{stop.label}</p>
              <div>
                <h3 className="text-[17px] font-bold">{stop.title}</h3>
                <p className="mt-1 max-w-[62ch] text-[16px] leading-relaxed text-ink/75">
                  {stop.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Reveal>

      <Reveal className="mt-12 grid gap-10 sm:grid-cols-2">
        <div>
          <h2 className="text-[22px] font-extrabold tracking-tight">What&rsquo;s included</h2>
          <ul className="mt-4 flex flex-col gap-3">
            {pkg.inclusions.map((item) => (
              <li key={item} className="flex gap-3 text-[16px] leading-relaxed text-ink/80">
                <span aria-hidden className="font-bold text-palm">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-[22px] font-extrabold tracking-tight">Not included</h2>
          <ul className="mt-4 flex flex-col gap-3">
            {pkg.exclusions.map((item) => (
              <li key={item} className="flex gap-3 text-[16px] leading-relaxed text-ink/80">
                <span aria-hidden className="font-bold text-coral-dark">
                  ✕
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </>
  );
}
