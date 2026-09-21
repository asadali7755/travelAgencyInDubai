"use client";

import { useState } from "react";
import { PackageCard } from "@/components/packages/PackageCard";
import { Reveal } from "@/components/ui/Reveal";
import { packageKinds, type Package, type PackageKind } from "@/lib/data/packages";

/**
 * Client-side filter across the package catalogue. Everything stays in the
 * server-rendered HTML — the buttons hide rows, they do not fetch them — so a
 * crawler sees all eleven packages and their prices on one request.
 */
export function PackagesExplorer({ packages }: { packages: Package[] }) {
  const [active, setActive] = useState<PackageKind | "all">("all");
  const shown = active === "all" ? packages : packages.filter((p) => p.kind === active);
  const blurb = packageKinds.find((k) => k.id === active)?.blurb;

  return (
    <section aria-labelledby="packages-heading">
      <h2 id="packages-heading" className="sr-only">
        All tour packages
      </h2>

      <div className="flex flex-wrap gap-2.5 border-y border-divider py-5">
        {[{ id: "all" as const, label: "All packages" }, ...packageKinds].map((kind) => {
          const on = kind.id === active;

          return (
            <button
              key={kind.id}
              type="button"
              onClick={() => setActive(kind.id)}
              aria-pressed={on}
              className={`min-h-11 rounded-full border px-5 text-[14px] transition-colors ${
                on
                  ? "border-sea bg-sea font-semibold text-white"
                  : "border-card-border bg-surface text-ink/75 hover:border-sea/40"
              }`}
            >
              {kind.label}
            </button>
          );
        })}
      </div>

      <p className="mt-5 max-w-[60ch] text-[14px] text-ink/55" aria-live="polite">
        {blurb ?? `${shown.length} packages across day tours, UAE holidays and trips abroad.`}
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((pkg, i) => (
          <Reveal key={pkg.slug} delayMs={(i % 3) * 80}>
            <PackageCard pkg={pkg} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
