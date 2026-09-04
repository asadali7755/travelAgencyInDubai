"use client";

import { useMemo, useState } from "react";
import { CalculatorControls } from "@/components/calculator/CalculatorControls";
import { CalculatorSummary } from "@/components/calculator/CalculatorSummary";
import { Reveal } from "@/components/ui/Reveal";
import { describeTrip, estimateTrip, type EstimateInput } from "@/lib/calculator/estimate";

/**
 * A first-guess trip that already produces a sensible number on first paint, so
 * the section is never an empty form.
 *
 * The month is a fixed November rather than today's date on purpose. The page is
 * prerendered at build time, so a date read during render would put the build's
 * month in the HTML and the visitor's month in the first client render — a
 * hydration mismatch. November is Dubai's peak month and the one most people are
 * pricing, the season note under the total explains what it means, and changing
 * it is one tap.
 */
const initial: EstimateInput = {
  origin: "india",
  nights: 5,
  adults: 2,
  children: 0,
  tier: "comfort",
  month: 10,
  tourSlugs: ["desert-safari", "dhow-cruise-marina", "burj-khalifa-at-the-top"],
  includeFlights: true,
  includeVisa: true,
  includeHotel: true,
};

export function TripCalculator() {
  const [input, setInput] = useState<EstimateInput>(initial);
  const [currency, setCurrency] = useState<"AED" | "USD">("AED");

  const estimate = useMemo(() => estimateTrip(input), [input]);

  const quoteHref = useMemo(() => {
    const params = new URLSearchParams();
    if (input.tourSlugs.length === 1) params.set("tour", input.tourSlugs[0]);
    params.set("plan", describeTrip(input, estimate));
    return `/contact?${params.toString()}`;
  }, [input, estimate]);

  const patch = (next: Partial<EstimateInput>) =>
    setInput((prev) => ({ ...prev, ...next }));

  return (
    <section id="trip-cost" className="scroll-mt-24 bg-sand">
      <div className="mx-auto max-w-[1280px] px-5 py-20 lg:px-10 lg:py-28">
        <Reveal className="max-w-[62ch]">
          <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-sun">
            Plan the budget first
          </p>
          <h2 className="mt-3 text-[clamp(2rem,4.2vw,3rem)] font-extrabold leading-tight tracking-tight">
            Dubai trip cost calculator
          </h2>
          <span className="mt-4 block h-1 w-16 rounded-full bg-sun" />
          <p className="mt-5 text-[17px] leading-[1.75] text-ink/75">
            Tell us how long you are staying, where you are flying from and how you like to
            travel. You get an honest range for the whole trip — flights, visa, hotel, transfers,
            experiences and what you will actually spend on food and taxis — before you speak to
            anyone.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(360px,420px)] lg:gap-12">
          <Reveal>
            <div className="rounded-[var(--radius-xl2)] border border-card-border bg-surface p-6 lg:p-8">
              <CalculatorControls value={input} onChange={patch} />
            </div>
          </Reveal>

          <Reveal delayMs={120}>
            <div className="lg:sticky lg:top-28">
              <CalculatorSummary
                estimate={estimate}
                currency={currency}
                onCurrencyChange={setCurrency}
                quoteHref={quoteHref}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
