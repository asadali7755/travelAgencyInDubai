import Link from "next/link";
import { accentClasses } from "@/components/ui/accents";
import { Reveal } from "@/components/ui/Reveal";
import type { CategoryMeta } from "@/lib/data/attractions";

/**
 * "What are you planning?" — the category grid.
 *
 * This is the step between picking a place and seeing results, and it is
 * phrased as the question rather than as a taxonomy because that is how the
 * decision is actually made. Only categories with something in them are passed
 * in; an empty tile is worse than a shorter grid.
 */
export function PlanGrid({
  categories,
  counts,
  hrefFor,
  heading = "What are you planning?",
  intro,
}: {
  categories: CategoryMeta[];
  counts: Record<string, number>;
  hrefFor: (id: CategoryMeta["id"]) => string;
  heading?: string;
  intro?: string;
}) {
  return (
    <section aria-labelledby="plan-heading">
      <Reveal>
        <h2
          id="plan-heading"
          className="text-[clamp(1.8rem,3.6vw,2.6rem)] font-extrabold leading-tight tracking-tight"
        >
          {heading}
        </h2>
        <span className="mt-4 block h-1 w-16 rounded-full bg-sea" />
        {intro ? (
          <p className="mt-5 max-w-[62ch] text-[17px] leading-relaxed text-ink/75">{intro}</p>
        ) : null}
      </Reveal>

      <ul className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((category, i) => {
          const accent = accentClasses[category.accent];

          return (
            <Reveal key={category.id} delayMs={(i % 4) * 60}>
              <li className="h-full list-none">
                <Link
                  href={hrefFor(category.id)}
                  className="flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-card-border bg-surface no-underline shadow-[var(--shadow-card)] transition-colors hover:border-sea/40"
                >
                  <span className={`block h-1.5 w-full ${accent.bar}`} />
                  <span className="flex flex-1 flex-col p-5">
                    <span className="text-[19px] font-bold leading-tight text-ink">
                      {category.label}
                    </span>
                    <span className="mt-1.5 text-[14px] leading-snug text-ink/65">
                      {category.tagline}
                    </span>
                    <span className="mt-auto pt-4 text-[13px] font-semibold text-sea">
                      {counts[category.id] ?? 0}{" "}
                      {(counts[category.id] ?? 0) === 1 ? "place" : "places"} →
                    </span>
                  </span>
                </Link>
              </li>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
