"use client";

import { accentClasses } from "@/components/ui/accents";
import { months, origins, tiers, type OriginKey, type Tier } from "@/lib/data/trip-rates";
import { tours } from "@/lib/data/tours";
import type { EstimateInput } from "@/lib/calculator/estimate";

type Props = {
  value: EstimateInput;
  onChange: (patch: Partial<EstimateInput>) => void;
};

const select =
  "min-h-12 w-full rounded-[10px] border border-card-border bg-page px-4 text-[16px] " +
  "text-ink focus:border-sea focus:outline-none";

const legend = "text-[14px] font-semibold";

export function CalculatorControls({ value, onChange }: Props) {
  const toggleTour = (slug: string) =>
    onChange({
      tourSlugs: value.tourSlugs.includes(slug)
        ? value.tourSlugs.filter((s) => s !== slug)
        : [...value.tourSlugs, slug],
    });

  return (
    <div className="flex flex-col gap-7">
      <fieldset>
        <legend className={legend}>How are you travelling?</legend>
        <div
          role="radiogroup"
          aria-label="Trip level"
          className="mt-3 grid gap-2 sm:grid-cols-3"
        >
          {tiers.map((tier) => {
            const active = value.tier === tier.id;
            return (
              <button
                key={tier.id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => onChange({ tier: tier.id as Tier })}
                className={`flex min-h-11 flex-col items-start rounded-[12px] border p-3 text-left transition-colors ${
                  active
                    ? "border-sea bg-sea text-white"
                    : "border-card-border bg-page hover:border-sea/50"
                }`}
              >
                <span className="text-[15px] font-bold">{tier.label}</span>
                <span className={`text-[12px] ${active ? "text-white/80" : "text-ink/55"}`}>
                  {tier.hotelLabel}
                </span>
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-[13px] leading-relaxed text-ink/60">
          {tiers.find((t) => t.id === value.tier)?.blurb}
        </p>
      </fieldset>

      <div>
        <div className="flex items-baseline justify-between">
          <label htmlFor="nights" className={legend}>
            How many nights?
          </label>
          <span className="text-[15px] font-bold text-sea">
            {value.nights} {value.nights === 1 ? "night" : "nights"}
          </span>
        </div>
        <input
          id="nights"
          type="range"
          min={1}
          max={21}
          step={1}
          value={value.nights}
          onChange={(e) => onChange({ nights: Number(e.target.value) })}
          className="mt-3 h-11 w-full cursor-pointer accent-[var(--color-sea)]"
        />
        <div className="flex justify-between text-[12px] text-ink/45">
          <span>1</span>
          <span>21</span>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Stepper
          label="Adults"
          value={value.adults}
          min={1}
          max={16}
          onChange={(adults) => onChange({ adults })}
        />
        <Stepper
          label="Children (2–11)"
          value={value.children}
          min={0}
          max={10}
          onChange={(children) => onChange({ children })}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className={legend}>Where are you coming from?</span>
          <select
            className={select}
            value={value.origin}
            onChange={(e) => {
              const origin = e.target.value as OriginKey;
              const match = origins.find((o) => o.id === origin);
              onChange({
                origin,
                includeFlights: origin !== "uae",
                includeVisa: match?.visaUsual ?? false,
              });
            }}
          >
            {origins.map((origin) => (
              <option key={origin.id} value={origin.id}>
                {origin.label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className={legend}>When?</span>
          <select
            className={select}
            value={value.month}
            onChange={(e) => onChange({ month: Number(e.target.value) })}
          >
            {months.map((month, i) => (
              <option key={month} value={i}>
                {month}
              </option>
            ))}
          </select>
        </label>
      </div>

      <fieldset>
        <legend className={legend}>Which experiences do you want in?</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {tours.map((tour) => {
            const active = value.tourSlugs.includes(tour.slug);
            const accent = accentClasses[tour.accent];
            return (
              <button
                key={tour.slug}
                type="button"
                aria-pressed={active}
                onClick={() => toggleTour(tour.slug)}
                className={`min-h-11 rounded-full border px-4 text-[14px] font-semibold transition-colors ${
                  active
                    ? `${accent.chip} border-transparent`
                    : "border-card-border bg-page text-ink/70 hover:border-sea/50"
                }`}
              >
                {tour.title}
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className={legend}>What should the estimate include?</legend>
        <div className="mt-3 flex flex-col gap-1">
          <Check
            label="Return flights"
            checked={value.includeFlights}
            disabled={value.origin === "uae"}
            onChange={(includeFlights) => onChange({ includeFlights })}
          />
          <Check
            label="UAE visit visa"
            checked={value.includeVisa}
            disabled={value.origin === "uae"}
            onChange={(includeVisa) => onChange({ includeVisa })}
          />
          <Check
            label="Hotel"
            checked={value.includeHotel}
            onChange={(includeHotel) => onChange({ includeHotel })}
          />
        </div>
        <p className="mt-2 text-[13px] leading-relaxed text-ink/60">
          British, European, American, Australian, Japanese, Chinese, Russian and GCC passport
          holders among others get a free visa on arrival — leave the visa off if that is you.
        </p>
      </fieldset>
    </div>
  );
}

function Stepper({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  const button =
    "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-card-border " +
    "text-[20px] leading-none text-sea transition-colors hover:border-sea hover:bg-sea-tint " +
    "disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <div>
      <span className={legend}>{label}</span>
      <div className="mt-2 flex items-center gap-3">
        <button
          type="button"
          className={button}
          onClick={() => onChange(value - 1)}
          disabled={value <= min}
          aria-label={`One fewer ${label.toLowerCase()}`}
        >
          −
        </button>
        <output className="min-w-8 text-center text-[20px] font-bold tabular-nums">{value}</output>
        <button
          type="button"
          className={button}
          onClick={() => onChange(value + 1)}
          disabled={value >= max}
          aria-label={`One more ${label.toLowerCase()}`}
        >
          +
        </button>
      </div>
    </div>
  );
}

function Check({
  label,
  checked,
  disabled,
  onChange,
}: {
  label: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label
      className={`flex min-h-11 items-center gap-3 text-[15px] ${
        disabled ? "opacity-45" : "cursor-pointer"
      }`}
    >
      <input
        type="checkbox"
        checked={checked && !disabled}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        className="h-5 w-5 accent-[var(--color-sea)]"
      />
      {label}
    </label>
  );
}
