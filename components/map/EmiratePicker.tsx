import Link from "next/link";
import { UaeMap } from "@/components/map/UaeMap";
import { attractions, emirates, emiratePath, type Emirate } from "@/lib/data/attractions";

/**
 * "Where are you going?" — the map plus the list that always works.
 *
 * The list is not a fallback bolted on for compliance. On a phone the map is
 * for orientation and the list is what people actually tap, and the counts make
 * the list more useful than the map anyway.
 */
export function EmiratePicker({ activeId }: { activeId?: Emirate }) {
  const counts = Object.fromEntries(
    emirates.map((e) => [e.id, attractions.filter((a) => a.emirate === e.id).length]),
  );
  const hrefs = Object.fromEntries(emirates.map((e) => [e.id, emiratePath(e.id)]));

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
      <UaeMap counts={counts} hrefs={hrefs} activeId={activeId} />

      <div>
        <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-tight">
          Pick an emirate
        </h2>
        <p className="mt-3 max-w-[54ch] text-[16px] leading-relaxed text-ink/70">
          Tap the map or choose from the list. Each emirate opens on the question that
          actually matters — what are you planning?
        </p>

        <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
          {emirates.map((emirate) => {
            const on = emirate.id === activeId;

            return (
              <li key={emirate.id}>
                <Link
                  href={emiratePath(emirate.id)}
                  aria-current={on ? "page" : undefined}
                  className={`flex min-h-13 items-center justify-between gap-3 rounded-[var(--radius-card)] border px-4 no-underline transition-colors ${
                    on
                      ? "border-sea bg-sea-tint font-semibold text-sea-dark"
                      : "border-card-border bg-surface text-ink hover:border-sea/40"
                  }`}
                >
                  <span className="text-[15px]">{emirate.name}</span>
                  <span className="shrink-0 text-[13px] text-ink/50">
                    {counts[emirate.id]}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
