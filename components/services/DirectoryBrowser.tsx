"use client";

import Link from "next/link";
import { useState } from "react";
import { ServiceCard } from "@/components/services/ServiceCard";
import { Reveal } from "@/components/ui/Reveal";
import { EMIRATES } from "@/lib/validation/agency";
import type { DirectoryListing } from "@/lib/services/directory";

/**
 * Emirate filtering for a directory category, done in the browser.
 *
 * It used to be a `?emirate=` search param read on the server, which quietly
 * forced the whole route dynamic and broke `export const revalidate` — the page
 * returned a 500. Filtering client side over a list that is already on the page
 * keeps the route statically cached, keeps every listing in the server-rendered
 * HTML where a crawler can read it, and removes a round trip per click.
 *
 * It also fixes the canonical problem: there is now one URL per category rather
 * than eight near-identical ones competing with each other.
 */
export function DirectoryBrowser({
  listings,
  categoryName,
}: {
  listings: DirectoryListing[];
  categoryName: string;
}) {
  const [emirate, setEmirate] = useState<string | null>(null);
  const shown = emirate ? listings.filter((l) => l.emirate === emirate) : listings;

  // Only offer an emirate that actually has something in it.
  const available = EMIRATES.filter((value) => listings.some((l) => l.emirate === value));

  return (
    <section aria-labelledby="directory-results">
      <h2 id="directory-results" className="sr-only">
        {categoryName} listings
      </h2>

      {available.length > 1 ? (
        <div className="flex flex-wrap gap-2.5 border-y border-divider py-5">
          <button
            type="button"
            onClick={() => setEmirate(null)}
            aria-pressed={emirate === null}
            className={`min-h-11 rounded-full border px-5 text-[14px] transition-colors ${
              emirate === null
                ? "border-sea bg-sea font-semibold text-white"
                : "border-card-border bg-surface text-ink/75 hover:border-sea/40"
            }`}
          >
            All emirates
          </button>
          {available.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setEmirate(value)}
              aria-pressed={emirate === value}
              className={`min-h-11 rounded-full border px-5 text-[14px] transition-colors ${
                emirate === value
                  ? "border-sea bg-sea font-semibold text-white"
                  : "border-card-border bg-surface text-ink/75 hover:border-sea/40"
              }`}
            >
              {value}
            </button>
          ))}
        </div>
      ) : null}

      <p className="mt-5 text-[14px] text-ink/55" aria-live="polite">
        {shown.length} {shown.length === 1 ? "business" : "businesses"}
        {emirate ? ` in ${emirate}` : ""}.
      </p>

      {shown.length === 0 ? (
        <div className="mt-8 rounded-[var(--radius-card)] border border-dashed border-card-border bg-surface px-6 py-12 text-center">
          <h3 className="text-[19px] font-bold tracking-tight">Nothing listed here yet</h3>
          <p className="mx-auto mt-2 max-w-[52ch] text-[15px] leading-relaxed text-ink/65">
            No approved {categoryName.toLowerCase()}
            {emirate ? ` in ${emirate}` : ""} so far. If this is your line of work, a profile
            is free and takes about five minutes.
          </p>
          <Link
            href="/list-your-business"
            className="mt-6 inline-flex min-h-11 items-center rounded-full bg-sea px-6 text-[15px] font-semibold text-white no-underline hover:bg-sea-dark"
          >
            List your business
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((listing, i) => (
            <Reveal key={listing.id} delayMs={(i % 3) * 80}>
              <ServiceCard listing={listing} />
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
