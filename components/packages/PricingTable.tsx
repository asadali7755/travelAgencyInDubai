import { PriceNote } from "@/components/packages/PriceNote";
import { aed, tierAdultLabel, tierChildLabel, type Package } from "@/lib/data/packages";

/**
 * The pricing table on a package page.
 *
 * A real table rather than a grid of divs: the row/column relationship is data,
 * screen readers announce it correctly, and answer engines lift a <table> far
 * more reliably than a flexbox that happens to look like one.
 *
 * Scrolls horizontally on narrow screens rather than shrinking the type, which
 * is the one thing that makes a price table unreadable on a phone.
 */
export function PricingTable({ pkg }: { pkg: Package }) {
  const anyPrivate = pkg.tiers.some((t) => t.privateTotal);

  return (
    <section aria-labelledby="pricing-heading">
      <h2 id="pricing-heading" className="text-[26px] font-extrabold tracking-tight">
        Prices
      </h2>
      <span className="mt-3 block h-1 w-14 rounded-full bg-sea" />

      <p className="mt-4 max-w-[62ch] text-[15px] leading-relaxed text-ink/70">
        {pkg.priceBasis.charAt(0).toUpperCase() + pkg.priceBasis.slice(1)}.
      </p>

      <div className="mt-6 -mx-5 overflow-x-auto px-5 lg:mx-0 lg:px-0">
        <table className="w-full min-w-[520px] border-collapse text-left">
          <caption className="sr-only">
            Prices for {pkg.title} by accommodation or vehicle tier
          </caption>
          <thead>
            <tr className="border-y border-divider">
              <th scope="col" className="py-3 pr-4 text-[13px] font-bold uppercase tracking-[0.1em] text-ink/55">
                Option
              </th>
              <th scope="col" className="py-3 pr-4 text-[13px] font-bold uppercase tracking-[0.1em] text-ink/55">
                {anyPrivate ? "Adult / total" : "Adult"}
              </th>
              <th scope="col" className="py-3 text-[13px] font-bold uppercase tracking-[0.1em] text-ink/55">
                {anyPrivate ? "Child / party" : "Child"}
              </th>
            </tr>
          </thead>
          <tbody>
            {pkg.tiers.map((tier) => (
              <tr key={tier.id} className="border-b border-divider align-top">
                <th scope="row" className="py-4 pr-4 font-normal">
                  <span className="block text-[16px] font-bold text-ink">{tier.label}</span>
                  <span className="mt-1 block max-w-[34ch] text-[14px] leading-relaxed text-ink/65">
                    {tier.detail}
                  </span>
                </th>
                <td className="py-4 pr-4 text-[17px] font-bold text-ink">
                  {tierAdultLabel(tier) ?? "—"}
                </td>
                <td className="py-4 text-[15px] text-ink/75">{tierChildLabel(tier) ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-5 rounded-[var(--radius-card)] bg-sun-tint px-5 py-4 text-[14px] leading-relaxed text-ink/80">
        <strong className="font-semibold">Season.</strong> {pkg.seasonNote}
      </p>

      {pkg.addOns.length ? (
        <div className="mt-8">
          <h3 className="text-[19px] font-bold tracking-tight">Add on if you want it</h3>
          <ul className="mt-4 border-t border-divider">
            {pkg.addOns.map((addOn) => (
              <li
                key={addOn.label}
                className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-divider py-3"
              >
                <span className="text-[15px] text-ink/85">
                  {addOn.label}
                  {addOn.note ? (
                    <span className="block text-[13px] text-ink/55">{addOn.note}</span>
                  ) : null}
                </span>
                <span className="text-[15px] font-bold text-ink">{aed(addOn.priceAed)}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <PriceNote checked={pkg.checked} className="mt-6 max-w-[64ch]" />
    </section>
  );
}
