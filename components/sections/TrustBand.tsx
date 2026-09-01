import { Reveal } from "@/components/ui/Reveal";
import { ShieldCheckIcon } from "@/components/ui/Icons";
import { site } from "@/lib/site";

/**
 * The figures are bracketed placeholders until the client confirms them, so
 * there is deliberately no count-up animation here: a placeholder has no number
 * to count toward, and keeping the effect would have meant inventing one.
 */
export function TrustBand() {
  return (
    <section className="bg-sea-tint">
      <div className="mx-auto max-w-[1280px] px-5 py-12 lg:px-10 lg:py-16">
        <Reveal className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {site.stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-[clamp(1.9rem,3.6vw,2.6rem)] font-extrabold leading-none tracking-tight text-sea-dark">
                {stat.value}
              </p>
              <p className="mt-2 text-[13px] font-semibold uppercase tracking-[0.12em] text-ink/60">
                {stat.label}
              </p>
            </div>
          ))}
        </Reveal>

        <Reveal
          as="p"
          delayMs={120}
          className="mt-10 flex items-center gap-2 border-t border-sea/15 pt-6 text-[14px] text-ink/70"
        >
          <ShieldCheckIcon className="h-[18px] w-[18px] shrink-0 text-sea" />
          Licensed by Dubai&rsquo;s Department of Economy &amp; Tourism — DET licence{" "}
          {site.detLicenceDisplay}
        </Reveal>
      </div>
    </section>
  );
}
