import Link from "next/link";
import { ServiceCard } from "@/components/services/ServiceCard";
import { Reveal } from "@/components/ui/Reveal";
import type { DirectoryListing } from "@/lib/services/directory";

/**
 * Registered businesses shown alongside the editorial on a category page.
 *
 * Some intents are answered by a guide we write — a beach, a fort, a mountain.
 * Others are answered by a business: a spa, a clinic, a moving company. For
 * those, the directory is the content, and this strip is what stops such a
 * category page being a dead end before any business has signed up.
 */
export function DirectoryStrip({
  listings,
  heading,
  categorySlug,
}: {
  listings: DirectoryListing[];
  heading: string;
  categorySlug: string;
}) {
  return (
    <section aria-labelledby="directory-heading">
      <Reveal>
        <h2
          id="directory-heading"
          className="text-[clamp(1.6rem,3.2vw,2.2rem)] font-extrabold tracking-tight"
        >
          {heading}
        </h2>
        <p className="mt-3 max-w-[60ch] text-[16px] leading-relaxed text-ink/70">
          Businesses listed in our directory. A verified badge means somebody on our team
          opened the company&rsquo;s trade licence and checked it.
        </p>
      </Reveal>

      {listings.length ? (
        <>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {listings.slice(0, 6).map((listing, i) => (
              <Reveal key={listing.id} delayMs={(i % 3) * 80}>
                <ServiceCard listing={listing} />
              </Reveal>
            ))}
          </div>
          <Link
            href={`/services/${categorySlug}`}
            className="mt-8 inline-flex min-h-11 items-center rounded-full border border-sea px-6 text-[15px] font-semibold text-sea no-underline hover:bg-sea-tint"
          >
            See the full directory
          </Link>
        </>
      ) : (
        <div className="mt-8 rounded-[var(--radius-card)] border border-dashed border-card-border bg-surface px-6 py-10 text-center">
          <p className="mx-auto max-w-[54ch] text-[16px] leading-relaxed text-ink/70">
            No businesses listed here yet. If this is what you do, a profile is free, takes
            about five minutes, and puts you in front of people already looking for it.
          </p>
          <Link
            href="/list-your-business"
            className="mt-6 inline-flex min-h-11 items-center rounded-full bg-sea px-6 text-[15px] font-semibold text-white no-underline hover:bg-sea-dark"
          >
            List your business free
          </Link>
        </div>
      )}
    </section>
  );
}
