"use client";

import { Button } from "@/components/ui/Button";
import { AED_PER_USD } from "@/lib/data/trip-rates";
import type { Estimate } from "@/lib/calculator/estimate";

type Currency = "AED" | "USD";

type Props = {
  estimate: Estimate;
  currency: Currency;
  onCurrencyChange: (currency: Currency) => void;
  quoteHref: string;
};

/** Section colours for the proportion bar, in the order lines are produced. */
const barColours: Record<string, string> = {
  flights: "bg-sea",
  visa: "bg-gold",
  hotel: "bg-sun",
  transfers: "bg-palm",
  tours: "bg-coral",
  food: "bg-sea-light",
  transport: "bg-gold-dark",
};

/** Dollars are converted at the peg, then both currencies round to whole units. */
function format(value: number, currency: Currency) {
  const amount = currency === "AED" ? value : value / AED_PER_USD;
  return Math.round(amount).toLocaleString("en-US");
}

export function CalculatorSummary({
  estimate,
  currency,
  onCurrencyChange,
  quoteHref,
}: Props) {
  const { total, perPerson, perNight, lines, season, travellers } = estimate;
  const span = total.high || 1;

  return (
    <div className="overflow-hidden rounded-[var(--radius-xl2)] border border-card-border bg-surface shadow-[var(--shadow-card)]">
      <div className="bg-sea px-6 py-7 text-white">
        <div className="flex items-start justify-between gap-4">
          <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-white/75">
            Estimated trip cost
          </p>
          <div
            role="radiogroup"
            aria-label="Currency"
            className="flex shrink-0 rounded-full bg-white/15"
          >
            {(["AED", "USD"] as const).map((code) => (
              <button
                key={code}
                type="button"
                role="radio"
                aria-checked={currency === code}
                onClick={() => onCurrencyChange(code)}
                className={`min-h-11 rounded-full px-4 text-[13px] font-bold transition-colors ${
                  currency === code ? "bg-white text-sea" : "text-white/80 hover:text-white"
                }`}
              >
                {code}
              </button>
            ))}
          </div>
        </div>

        <p aria-live="polite" className="mt-3 text-[clamp(1.9rem,5vw,2.7rem)] font-extrabold leading-none tracking-tight tabular-nums">
          {currency} {format(total.low, currency)}
          <span className="px-1.5 font-semibold text-white/60">–</span>
          {format(total.high, currency)}
        </p>

        <p className="mt-3 text-[14px] leading-relaxed text-white/80">
          Roughly {currency} {format(perPerson.low, currency)}–{format(perPerson.high, currency)} per
          person, or {currency} {format(perNight.low, currency)}–{format(perNight.high, currency)} a
          day for all {travellers}.
        </p>
      </div>

      {lines.length ? (
        <div className="flex h-2 w-full" aria-hidden>
          {lines.map((line) => (
            <span
              key={line.id}
              className={barColours[line.id] ?? "bg-ink/20"}
              style={{ width: `${(line.high / span) * 100}%` }}
            />
          ))}
        </div>
      ) : null}

      <div className="px-6 py-6">
        <ul className="flex flex-col divide-y divide-divider">
          {lines.map((line) => (
            <li key={line.id} className="flex items-start justify-between gap-4 py-3">
              <span className="min-w-0">
                <span className="flex items-center gap-2 text-[15px] font-semibold">
                  <span
                    aria-hidden
                    className={`h-2.5 w-2.5 shrink-0 rounded-full ${barColours[line.id] ?? "bg-ink/20"}`}
                  />
                  {line.label}
                </span>
                <span className="mt-0.5 block text-[13px] leading-snug text-ink/55">
                  {line.detail}
                </span>
              </span>
              <span className="shrink-0 whitespace-nowrap pt-0.5 text-[15px] font-semibold tabular-nums">
                {format(line.low, currency)}–{format(line.high, currency)}
              </span>
            </li>
          ))}
        </ul>

        {!lines.length ? (
          <p className="py-4 text-[15px] text-ink/60">
            Turn something on — a hotel, an experience, your flights — and the estimate appears
            here.
          </p>
        ) : null}

        <div className="mt-5 rounded-[12px] bg-sand p-4">
          <p className="text-[13px] font-bold">{season.label}</p>
          <p className="mt-1 text-[13px] leading-relaxed text-ink/70">{season.note}</p>
        </div>

        <Button href={quoteHref} size="lg" className="mt-5 w-full">
          Turn this into a real quote
        </Button>

        <p className="mt-4 text-[12px] leading-relaxed text-ink/55">
          This is a planning estimate built from published Dubai market rates in September 2026 —
          hotel rack rates, government visa fees, the Tourism Dirham, ticket prices and typical
          return airfares. It is not a quote, and nothing here is booked or charged. Send it to us
          and we will come back with real prices for your dates.
        </p>
      </div>
    </div>
  );
}
