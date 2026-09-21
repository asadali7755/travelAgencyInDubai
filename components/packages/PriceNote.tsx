/**
 * The disclaimer that must accompany every price this site renders.
 *
 * The figures in lib/data/packages are researched published market rates, not
 * rates this agency has contracted. Showing them without saying so would be
 * dishonest to the visitor and, once they are also in Offer structured data, a
 * rich-result problem. One component so the wording cannot drift between pages.
 *
 * TODO(client): when the agency's own rate card is signed off, change `basis`
 * at the call sites and replace this copy with a straightforward price note.
 */
export function PriceNote({
  checked,
  className = "",
  compact = false,
}: {
  /** ISO date the rate was last researched. */
  checked: string;
  className?: string;
  compact?: boolean;
}) {
  const on = new Date(checked).toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });

  if (compact) {
    return (
      <p className={`text-[12px] leading-relaxed text-ink/50 ${className}`}>
        Indicative market rate, {on}. Your quote may differ.
      </p>
    );
  }

  return (
    <p className={`text-[13px] leading-relaxed text-ink/60 ${className}`}>
      <strong className="font-semibold text-ink/75">About these prices.</strong> They are
      typical published rates for a trip of this shape, researched in {on}, and they are
      shown so you can budget honestly before you enquire. They are not a quote: your final
      price depends on travel dates, party size, hotel availability and season. Send us the
      dates and we will come back with a real figure and what it includes.
    </p>
  );
}
