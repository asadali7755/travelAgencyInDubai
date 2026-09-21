import Image from "next/image";
import Link from "next/link";
import { accentClasses } from "@/components/ui/accents";
import { ArrowRightIcon } from "@/components/ui/Icons";
import {
  aed,
  fromPrice,
  fromPrivatePrice,
  packagePath,
  type Package,
} from "@/lib/data/packages";

/**
 * One package card. The price is a real "from" figure taken from the cheapest
 * per-adult tier, so the card, the pricing table and the Offer structured data
 * can never disagree — all three call fromPrice().
 */
export function PackageCard({ pkg, sizes }: { pkg: Package; sizes?: string }) {
  const accent = accentClasses[pkg.accent];
  const from = fromPrice(pkg);
  const priv = fromPrivatePrice(pkg);

  const duration =
    pkg.durationNights > 0
      ? `${pkg.durationDays} days, ${pkg.durationNights} nights`
      : "Day tour";

  return (
    <Link
      href={packagePath(pkg)}
      className="group block h-full overflow-hidden rounded-[var(--radius-card)] border border-card-border bg-surface no-underline shadow-[var(--shadow-card)]"
    >
      <span className={`block h-1.5 w-full ${accent.bar}`} />

      <div className="relative aspect-4/3 overflow-hidden bg-sand">
        {pkg.image && pkg.alt ? (
          <Image
            src={pkg.image}
            alt={pkg.alt}
            fill
            sizes={sizes ?? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
            className="object-cover transition-transform duration-700 group-hover:scale-107"
          />
        ) : null}
        <span
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-75 transition-opacity duration-500 group-hover:opacity-90"
        />
        <span
          className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] ${accent.chip}`}
        >
          {duration}
        </span>
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/80">
            {pkg.places.join(" · ")}
          </p>
          <h3 className="mt-1 text-[20px] font-bold leading-tight text-white">{pkg.title}</h3>
          <p className="mt-1 text-[13px] leading-snug text-white/85">{pkg.tagline}</p>
        </div>
      </div>

      <div className="flex items-end justify-between gap-3 px-5 py-4">
        <div>
          {from > 0 ? (
            <p className="text-[15px] text-ink/70">
              from <span className="text-[17px] font-bold text-ink">{aed(from)}</span> pp
            </p>
          ) : null}
          {priv ? (
            <p className="mt-0.5 text-[13px] text-ink/55">
              private from {aed(priv)} per vehicle
            </p>
          ) : null}
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 pb-0.5 text-[14px] font-semibold text-sea">
          Details
          <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
