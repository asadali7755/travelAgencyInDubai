import { Reveal } from "@/components/ui/Reveal";
import { ShieldCheckIcon } from "@/components/ui/Icons";
import { isPlaceholder, site } from "@/lib/site";

/**
 * Only confirmed figures are shown. A stat still holding its bracketed
 * placeholder ("[XX]+") is left out entirely, because a template marker on the
 * home page reads as an unfinished site to visitors and to quality raters. When
 * the client confirms the numbers in lib/site.ts they appear here unchanged.
 */
export function TrustBand() {
  const stats = site.stats.filter((stat) => !isPlaceholder(stat.value));

  return (
    <section className="bg-sea-tint">
      <div className="mx-auto max-w-[1280px] px-5 py-12 lg:px-10 lg:py-16">
        {stats.length ? (
          <Reveal className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat) => (
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
        ) : null}

        <Reveal
          as="p"
          delayMs={120}
          className={`${stats.length ? "mt-10 border-t border-sea/15 pt-6" : ""} flex items-center gap-2 text-[14px] text-ink/70`}
        >
          <ShieldCheckIcon className="h-[18px] w-[18px] shrink-0 text-sea" />
          Licensed by Dubai&rsquo;s Department of Economy &amp; Tourism — DET licence{" "}
          {site.detLicenceDisplay}
        </Reveal>
      </div>
    </section>
  );
}
