import Image from "next/image";
import Link from "next/link";
import { accentClasses } from "@/components/ui/accents";
import { ArrowRightIcon } from "@/components/ui/Icons";
import type { Tour } from "@/lib/data/tours";

/**
 * One tour card. Used on the home page and the tours hub so the two never
 * drift apart. The price is a bracketed placeholder until the client confirms
 * real figures.
 */
export function TourCard({ tour, sizes }: { tour: Tour; sizes?: string }) {
  const accent = accentClasses[tour.accent];

  return (
    <Link
      href={`/dubai-tours/${tour.slug}`}
      className="group block h-full overflow-hidden rounded-[var(--radius-card)] border border-card-border bg-surface no-underline shadow-[var(--shadow-card)]"
    >
      <span className={`block h-1.5 w-full ${accent.bar}`} />

      <div className="relative aspect-4/3 overflow-hidden">
        <Image
          src={tour.image}
          alt={tour.alt}
          fill
          sizes={sizes ?? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
          className="object-cover transition-transform duration-700 group-hover:scale-107"
        />
        <span
          className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90"
          aria-hidden
        />
        {tour.badge ? (
          <span
            className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] ${accent.chip}`}
          >
            {tour.badge}
          </span>
        ) : null}
        <div className="absolute inset-x-0 bottom-0 p-5">
          <h3 className="text-[21px] font-bold leading-tight text-white">{tour.title}</h3>
          <p className="mt-1 text-[13px] leading-snug text-white/85">{tour.detail}</p>
        </div>
      </div>

      <div className="flex items-center justify-between px-5 py-4">
        <p className="text-[15px] text-ink/70">
          from{" "}
          <span className="font-bold text-ink underline decoration-dashed decoration-ink/30 underline-offset-4">
            [AED price]
          </span>{" "}
          {tour.priceUnit}
        </p>
        <span className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-sea">
          View tour
          <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
