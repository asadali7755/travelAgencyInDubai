"use client";

import { useState } from "react";
import { TourCard } from "@/components/sections/TourCard";
import { Reveal } from "@/components/ui/Reveal";
import { tourCategories, tours, type TourCategory } from "@/lib/data/tours";

/**
 * Filtering is client-side over a list of six: no round trip, no loading state,
 * and every tour stays in the server-rendered HTML so crawlers and visitors
 * without JavaScript still see all of them.
 */
export function ToursGrid() {
  const [active, setActive] = useState<TourCategory | "all">("all");
  const shown = active === "all" ? tours : tours.filter((tour) => tour.category === active);

  return (
    <>
      <div className="flex flex-wrap gap-2.5 border-y border-divider py-5">
        {tourCategories.map((category) => {
          const on = category.id === active;

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => setActive(category.id)}
              aria-pressed={on}
              className={`min-h-11 rounded-full border px-5 text-[14px] transition-colors ${
                on
                  ? "border-sea bg-sea font-semibold text-white"
                  : "border-card-border bg-surface text-ink/75 hover:border-sea/40"
              }`}
            >
              {category.label}
            </button>
          );
        })}
      </div>

      <p className="mt-5 text-[14px] text-ink/55">
        {shown.length} {shown.length === 1 ? "tour" : "tours"}
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((tour, i) => (
          <Reveal key={tour.slug} delayMs={(i % 3) * 80}>
            <TourCard tour={tour} />
          </Reveal>
        ))}
      </div>
    </>
  );
}
