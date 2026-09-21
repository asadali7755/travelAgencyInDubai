import { Reveal } from "@/components/ui/Reveal";
import { attractions } from "@/lib/data/attractions";
import { packages } from "@/lib/data/packages";
import { site } from "@/lib/site";

/**
 * The methodology panel on the about page.
 *
 * Deliberately specific and countable. "We check our facts" is worth nothing to
 * a reader and nothing to an answer engine deciding whether to cite a price;
 * "72 guides, each carrying the date its gate price was last verified against
 * the venue's own site" is a claim that can be checked against the pages.
 */
export function AboutMethod({ lastChecked }: { lastChecked: string }) {
  const free = attractions.filter((a) => a.gate.kind === "free").length;
  const on = new Date(lastChecked).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const steps: { term: string; value: string }[] = [
    {
      term: "Where prices come from",
      value:
        "The venue's own site first. Where it does not publish one, we cross-check the main UAE resellers — Platinumlist, Headout, Cobone, GetYourGuide, Viator — and use the lowest figure a visitor can actually find, noting the spread.",
    },
    {
      term: "How often they are checked",
      value: `Every guide carries its own verification date. The most recent pass across the site was ${on}. Seasonal venues are re-checked before their season opens.`,
    },
    {
      term: "What a verification date means",
      value:
        "That a person opened the venue's published information and compared it to what this page says. It is not a deploy date and it does not move when we change the layout.",
    },
    {
      term: "Who reviews listings",
      value:
        "Directory submissions are read by a person before they appear. A verified badge means someone opened the company's UAE trade licence and checked it against the profile.",
    },
  ];

  return (
    <Reveal>
      <aside
        className="rounded-[var(--radius-card)] border border-card-border bg-surface p-6 shadow-[var(--shadow-card)] lg:sticky lg:top-28"
        aria-labelledby="method-heading"
      >
        <h2 id="method-heading" className="text-[20px] font-extrabold tracking-tight">
          How we check things
        </h2>
        <span className="mt-3 block h-1 w-12 rounded-full bg-palm" />

        <dl className="mt-6 grid grid-cols-3 gap-3 border-b border-divider pb-6">
          {[
            [String(attractions.length), "guides"],
            [String(free), "free to enter"],
            [String(packages.length), "priced packages"],
          ].map(([value, label]) => (
            <div key={label}>
              <dt className="sr-only">{label}</dt>
              <dd>
                <span className="block text-[26px] font-extrabold leading-none tracking-tight">
                  {value}
                </span>
                <span className="mt-1 block text-[13px] leading-snug text-ink/55">{label}</span>
              </dd>
            </div>
          ))}
        </dl>

        <dl className="mt-6 flex flex-col gap-5">
          {steps.map((step) => (
            <div key={step.term}>
              <dt className="text-[12px] font-bold uppercase tracking-[0.12em] text-ink/50">
                {step.term}
              </dt>
              <dd className="mt-1.5 text-[15px] leading-relaxed text-ink/80">{step.value}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-6 border-t border-divider pt-5 text-[13px] leading-relaxed text-ink/55">
          DET licence{" "}
          <span className="underline decoration-dashed decoration-ink/30 underline-offset-4">
            {site.detLicenceDisplay}
          </span>
          . Registered in Dubai, United Arab Emirates.
        </p>
      </aside>
    </Reveal>
  );
}
