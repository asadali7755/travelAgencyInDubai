import { Reveal } from "@/components/ui/Reveal";
import type { PriceComparison as Comparison } from "@/lib/data/price-comparisons";

const aed = (n: number) => `AED ${n.toLocaleString("en-AE")}`;

const longDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

/**
 * Other operators' published prices, cheapest first, each with a link to the
 * page it came from and the date it was read.
 *
 * Cards rather than a table: at 360px a seven-column table either scrolls
 * sideways or crushes the inclusions, and the inclusions are the point — the
 * cheapest row is often cheapest because it charges for things at camp.
 *
 * Outbound links are nofollow: we are citing these pages, not vouching for
 * them, and the comparison should pass no ranking signal to a competitor.
 */
export function PriceComparison({ data }: { data: Comparison }) {
  const rows = [...data.rows].sort((a, b) => a.adult - b.adult);

  return (
    <section className="mt-14" aria-labelledby="price-comparison">
      <Reveal>
        <h2 id="price-comparison" className="text-[26px] font-extrabold tracking-tight">
          {data.heading}
        </h2>
        <p className="mt-3 max-w-[62ch] text-[16px] leading-relaxed text-ink/75">{data.intro}</p>
        <p className="mt-2 text-[14px] text-ink/55">
          Prices as published by each operator, checked {longDate(data.checked)}. Per person,
          in AED, cheapest adult price first.
        </p>
      </Reveal>

      <ul className="mt-6 flex flex-col gap-4">
        {rows.map((row) => (
          <li
            key={`${row.operator}-${row.product}`}
            className="rounded-[var(--radius-card)] border border-card-border bg-surface p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
              <div className="min-w-0">
                <p className="text-[17px] font-bold">{row.operator}</p>
                <p className="mt-0.5 text-[14px] text-ink/65">
                  {row.product} · {row.duration}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[22px] font-extrabold leading-none tracking-tight">
                  {aed(row.adult)}
                </p>
                <p className="mt-1 text-[13px] text-ink/60">
                  adult
                  {row.child ? ` · child ${aed(row.child.price)} (${row.child.ages})` : ""}
                </p>
              </div>
            </div>

            <ul className="mt-4 flex flex-wrap gap-2">
              {row.includes.map((item) => (
                <li
                  key={item}
                  className="rounded-full bg-sea-tint px-3 py-1 text-[13px] font-medium text-sea-dark"
                >
                  {item}
                </li>
              ))}
            </ul>

            {row.note ? (
              <p className="mt-3 text-[14px] leading-relaxed text-ink/70">{row.note}</p>
            ) : null}

            <a
              href={row.source}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="mt-2 inline-flex min-h-11 items-center text-[14px] font-semibold text-sea underline underline-offset-4"
            >
              Source: {new URL(row.source).hostname.replace(/^www\./, "")}
            </a>
          </li>
        ))}
      </ul>

      {data.omitted?.length ? (
        <div className="mt-5 text-[14px] leading-relaxed text-ink/65">
          <p className="font-semibold text-ink/75">Not in the comparison</p>
          <ul className="mt-1 flex flex-col gap-1">
            {data.omitted.map((reason) => (
              <li key={reason}>{reason}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <p className="mt-5 text-[13px] leading-relaxed text-ink/55">
        Prices change without notice and may differ on the operator&rsquo;s site at checkout.
        Operator names are used only to identify the products compared; we are not affiliated
        with them.
      </p>
    </section>
  );
}
