import Link from "next/link";
import { ArrowRightIcon, ShieldCheckIcon } from "@/components/ui/Icons";
import type { DirectoryListing } from "@/lib/services/directory";

/**
 * One directory listing.
 *
 * `summary` is plain text from a `text` column, rendered as text — it is never
 * passed through dangerouslySetInnerHTML. The long description on the detail
 * page is the one that goes through lib/sanitize.ts, because that field can
 * contain markup and is written by whoever registered the business.
 */
export function ServiceCard({ listing }: { listing: DirectoryListing }) {
  return (
    <Link
      href={`/services/${listing.categorySlug}/${listing.slug}`}
      className="group flex h-full flex-col rounded-[var(--radius-card)] border border-card-border bg-surface p-5 no-underline shadow-[var(--shadow-card)] transition-colors hover:border-sea/40"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink/50">
            {listing.categoryName}
          </p>
          <h3 className="mt-1 text-[19px] font-bold leading-tight text-ink">{listing.name}</h3>
        </div>
        {listing.isVerified ? (
          <span
            title="Trade licence checked by our team"
            className="inline-flex shrink-0 items-center gap-1 rounded-full bg-palm-tint px-2.5 py-1 text-[11px] font-bold text-palm"
          >
            <ShieldCheckIcon className="h-3.5 w-3.5" />
            Verified
          </span>
        ) : null}
      </div>

      <p className="mt-1.5 text-[13px] text-ink/55">
        {[listing.area, listing.emirate].filter(Boolean).join(", ")}
      </p>

      {listing.summary ? (
        <p className="mt-3 line-clamp-3 text-[15px] leading-relaxed text-ink/75">
          {listing.summary}
        </p>
      ) : null}

      <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[14px] font-semibold text-sea">
        View details
        <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
