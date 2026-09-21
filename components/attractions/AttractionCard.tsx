import Link from "next/link";
import { AttractionMedia } from "@/components/attractions/AttractionMedia";
import { accentClasses } from "@/components/ui/accents";
import { ArrowRightIcon } from "@/components/ui/Icons";
import {
  attractionPath,
  emirateById,
  gateLabel,
  type Attraction,
} from "@/lib/data/attractions";

/**
 * One attraction card. Shared by the national hub, the emirate hubs and the
 * "nearby" strip on detail pages, so the three can never drift apart.
 *
 * The price line states "Free" where entry is free rather than hiding it — the
 * free entries are the most useful thing on the page for most visitors.
 */
export function AttractionCard({
  attraction,
  sizes,
  showEmirate = true,
}: {
  attraction: Attraction;
  sizes?: string;
  showEmirate?: boolean;
}) {
  const accent = accentClasses[attraction.accent];
  const emirate = emirateById(attraction.emirate);
  const free = attraction.gate.kind === "free";

  return (
    <Link
      href={attractionPath(attraction)}
      className="group block h-full overflow-hidden rounded-[var(--radius-card)] border border-card-border bg-surface no-underline shadow-[var(--shadow-card)]"
    >
      <span className={`block h-1.5 w-full ${accent.bar}`} />

      <div className="relative aspect-4/3 overflow-hidden">
        <AttractionMedia
          attraction={attraction}
          sizes={sizes}
          className="transition-transform duration-700 group-hover:scale-107"
        />
        <span
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-75 transition-opacity duration-500 group-hover:opacity-90"
        />
        {free ? (
          <span className="absolute left-4 top-4 rounded-full bg-palm px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-white">
            Free entry
          </span>
        ) : null}
        <div className="absolute inset-x-0 bottom-0 p-5">
          {showEmirate && emirate ? (
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/80">
              {emirate.name}
            </p>
          ) : null}
          <h3 className="mt-1 text-[20px] font-bold leading-tight text-white">
            {attraction.name}
          </h3>
          <p className="mt-1 text-[13px] leading-snug text-white/85">{attraction.tagline}</p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 px-5 py-4">
        <p className="text-[15px] text-ink/70">
          <span className={`font-bold ${free ? "text-palm" : "text-ink"}`}>
            {gateLabel(attraction)}
          </span>
          <span className="text-ink/55"> · {attraction.timeNeeded}</span>
        </p>
        <span className="inline-flex shrink-0 items-center gap-1.5 text-[14px] font-semibold text-sea">
          Guide
          <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
