"use client";

import { useState } from "react";
import { AttractionCard } from "@/components/attractions/AttractionCard";
import { Reveal } from "@/components/ui/Reveal";
import { distanceKm, formatDistance, type Point } from "@/lib/geo/distance";
import { isFree, type Attraction } from "@/lib/data/attractions";

type Located = "idle" | "asking" | "ready" | "denied" | "unavailable";

/**
 * Results for one category, optionally sorted by how close each place is to the
 * visitor.
 *
 * Location is requested on a tap, never on load. A page that fires the browser
 * permission prompt the moment it opens gets the prompt dismissed by reflex,
 * and Chrome now blocks the pattern outright on repeat refusals — so the button
 * exists, the default order is useful without it, and nothing breaks when the
 * answer is no.
 *
 * The coordinate never leaves the browser: the sort happens here, and no
 * request carries it anywhere.
 */
export function NearestResults({
  attractions,
  emptyMessage,
}: {
  attractions: Attraction[];
  emptyMessage: string;
}) {
  const [state, setState] = useState<Located>("idle");
  const [here, setHere] = useState<Point | null>(null);
  const [freeOnly, setFreeOnly] = useState(false);

  function locate() {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setState("unavailable");
      return;
    }

    setState("asking");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setHere({ lat: position.coords.latitude, lng: position.coords.longitude });
        setState("ready");
      },
      (error) => setState(error.code === error.PERMISSION_DENIED ? "denied" : "unavailable"),
      // A cached fix up to five minutes old is fine for sorting a list of
      // places tens of kilometres apart, and it avoids a cold GPS lock.
      { enableHighAccuracy: false, timeout: 10_000, maximumAge: 300_000 },
    );
  }

  const filtered = freeOnly ? attractions.filter(isFree) : attractions;

  const withDistance = here
    ? filtered
        .map((attraction) => ({
          attraction,
          km: distanceKm(here, attraction.geo),
        }))
        .sort((a, b) => a.km - b.km)
    : filtered.map((attraction) => ({ attraction, km: null as number | null }));

  return (
    <>
      <div className="flex flex-wrap items-center gap-3 border-y border-divider py-5">
        <button
          type="button"
          onClick={locate}
          disabled={state === "asking"}
          aria-pressed={state === "ready"}
          className={`min-h-11 rounded-full border px-5 text-[14px] transition-colors disabled:opacity-60 ${
            state === "ready"
              ? "border-sea bg-sea font-semibold text-white"
              : "border-card-border bg-surface text-ink/75 hover:border-sea/40"
          }`}
        >
          {state === "asking"
            ? "Finding you…"
            : state === "ready"
              ? "Sorted by nearest"
              : "Sort by nearest to me"}
        </button>

        <button
          type="button"
          onClick={() => setFreeOnly((v) => !v)}
          aria-pressed={freeOnly}
          className={`min-h-11 rounded-full border px-5 text-[14px] transition-colors ${
            freeOnly
              ? "border-palm bg-palm font-semibold text-white"
              : "border-card-border bg-surface text-ink/75 hover:border-sea/40"
          }`}
        >
          Free entry only ({attractions.filter(isFree).length})
        </button>

        {state === "ready" ? (
          <button
            type="button"
            onClick={() => {
              setHere(null);
              setState("idle");
            }}
            className="min-h-11 px-2 text-[14px] text-ink/60 underline underline-offset-4"
          >
            Clear
          </button>
        ) : null}
      </div>

      <p className="mt-4 text-[14px] leading-relaxed text-ink/55" aria-live="polite">
        {state === "denied"
          ? "Location is blocked for this site, so the list is in our own order. You can allow it in your browser's address bar if you would rather see what is closest."
          : state === "unavailable"
            ? "We couldn't get a location from this device, so the list is in our own order."
            : state === "ready"
              ? `${withDistance.length} places, closest first. Your location stays in your browser.`
              : `${withDistance.length} ${withDistance.length === 1 ? "place" : "places"}.`}
      </p>

      {withDistance.length === 0 ? (
        <p className="mt-8 rounded-[var(--radius-card)] border border-dashed border-card-border bg-surface px-6 py-12 text-center text-[15px] text-ink/65">
          {emptyMessage}
        </p>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {withDistance.map(({ attraction, km }, i) => (
            <Reveal key={attraction.slug} delayMs={(i % 3) * 80}>
              <div className="relative h-full">
                {km !== null ? (
                  <span className="absolute right-3 top-3 z-10 rounded-full bg-surface/95 px-3 py-1 text-[12px] font-bold text-ink shadow-[var(--shadow-card)]">
                    {formatDistance(km)}
                  </span>
                ) : null}
                <AttractionCard attraction={attraction} />
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </>
  );
}
