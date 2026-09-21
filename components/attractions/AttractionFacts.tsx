import { gateLabel, type Attraction } from "@/lib/data/attractions";

/**
 * The fact box on an attraction page.
 *
 * Deliberately a <dl> of short, literal answers: this is the block that answer
 * engines and voice assistants lift when someone asks "how much is the Dubai
 * Frame" or "what time does the Grand Mosque close". Burying those facts in
 * prose loses the citation to whoever put them in a table.
 */
export function AttractionFacts({ attraction }: { attraction: Attraction }) {
  const { gate } = attraction;

  // gateLabel() owns how a price reads for each charging basis; the child rate
  // is appended here because only the fact table has room for it.
  const price =
    gate.kind === "ticket" && gate.adultFrom && gate.childFrom
      ? `From AED ${gate.adultFrom} adult, AED ${gate.childFrom} child`
      : gateLabel(attraction);

  const rows: { term: string; value: string }[] = [
    { term: "Entry", value: price },
    { term: "Opening hours", value: attraction.hours },
    { term: "Time to allow", value: attraction.timeNeeded },
    { term: "Best time to go", value: attraction.bestTime },
    { term: "Getting there", value: attraction.gettingThere },
  ];

  return (
    <aside
      className="rounded-[var(--radius-card)] border border-card-border bg-surface p-6 shadow-[var(--shadow-card)]"
      aria-labelledby="facts-heading"
    >
      <h2 id="facts-heading" className="text-[18px] font-extrabold tracking-tight">
        Plan your visit
      </h2>
      <span className="mt-3 block h-1 w-12 rounded-full bg-sea" />

      <dl className="mt-5 flex flex-col gap-4">
        {rows.map((row) => (
          <div key={row.term}>
            <dt className="text-[12px] font-bold uppercase tracking-[0.12em] text-ink/50">
              {row.term}
            </dt>
            <dd className="mt-1 text-[15px] leading-relaxed text-ink/85">{row.value}</dd>
          </div>
        ))}
      </dl>

      {gate.note ? (
        <p className="mt-5 border-t border-divider pt-4 text-[13px] leading-relaxed text-ink/60">
          {gate.note}
        </p>
      ) : null}

      <p className="mt-4 text-[12px] leading-relaxed text-ink/50">
        Gate prices and hours checked{" "}
        {new Date(attraction.checked).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
        . Venues change both without notice — confirm before you travel.
      </p>

      <a
        href={`https://www.google.com/maps/search/?api=1&query=${attraction.geo.lat},${attraction.geo.lng}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex min-h-11 items-center text-[14px] font-semibold"
      >
        Open in maps →
      </a>
    </aside>
  );
}
