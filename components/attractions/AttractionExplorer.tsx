"use client";

import { useState } from "react";
import { AttractionCard } from "@/components/attractions/AttractionCard";
import { Reveal } from "@/components/ui/Reveal";
import {
  categoriesWithContent,
  isFree,
  type Attraction,
  type PlanCategory,
} from "@/lib/data/attractions";

type Filter = PlanCategory | "all" | "free";

/**
 * Client-side filtering over a list of two dozen. No round trip, no loading
 * state, and every attraction stays in the server-rendered HTML so crawlers and
 * answer engines see the whole set rather than an empty shell.
 *
 * "Free" is a first-class filter because it is the single most useful cut of
 * this data for a visitor who has been told the UAE is expensive.
 */
export function AttractionExplorer({
  attractions,
  showEmirate = true,
  heading = "All places",
}: {
  attractions: Attraction[];
  showEmirate?: boolean;
  /** Names the grid in the outline so the card <h3>s do not skip a level. */
  heading?: string;
}) {
  const [active, setActive] = useState<Filter>("all");

  const shown =
    active === "all"
      ? attractions
      : active === "free"
        ? attractions.filter(isFree)
        : attractions.filter((a) => a.categories.includes(active));

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: "Everything" },
    { id: "free", label: `Free entry (${attractions.filter(isFree).length})` },
    ...categoriesWithContent(attractions).map((c) => ({ id: c.id, label: c.label })),
  ];

  return (
    <section aria-labelledby="explorer-heading">
      <h2 id="explorer-heading" className="sr-only">
        {heading}
      </h2>

      <div className="flex flex-wrap gap-2.5 border-y border-divider py-5">
        {filters.map((filter) => {
          const on = filter.id === active;

          return (
            <button
              key={filter.id}
              type="button"
              onClick={() => setActive(filter.id)}
              aria-pressed={on}
              className={`min-h-11 rounded-full border px-5 text-[14px] transition-colors ${
                on
                  ? "border-sea bg-sea font-semibold text-white"
                  : "border-card-border bg-surface text-ink/75 hover:border-sea/40"
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      <p className="mt-5 text-[14px] text-ink/55" aria-live="polite">
        {shown.length} {shown.length === 1 ? "attraction" : "attractions"}
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((attraction, i) => (
          <Reveal key={attraction.slug} delayMs={(i % 3) * 80}>
            <AttractionCard attraction={attraction} showEmirate={showEmirate} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
