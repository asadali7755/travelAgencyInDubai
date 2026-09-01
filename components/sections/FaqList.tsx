import { Reveal } from "@/components/ui/Reveal";

/**
 * Native <details> rather than a JS accordion: it works before hydration, it is
 * keyboard accessible for free, and the answers stay in the HTML where a
 * crawler can read them — which matters because the same questions are emitted
 * as FAQPage structured data.
 */
export function FaqList({
  faqs,
  heading = "Before you book",
  className = "",
}: {
  faqs: ReadonlyArray<{ q: string; a: string }>;
  heading?: string;
  className?: string;
}) {
  return (
    <section className={className}>
      <Reveal>
        <h2 className="text-[clamp(1.75rem,3.4vw,2.4rem)] font-extrabold leading-tight tracking-tight">
          {heading}
        </h2>
        <span className="mt-4 block h-1 w-16 rounded-full bg-sea" />
      </Reveal>

      <div className="mt-8 border-t border-divider">
        {faqs.map((faq) => (
          <details key={faq.q} className="group border-b border-divider">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 text-[17px] font-semibold marker:hidden">
              {faq.q}
              <span
                aria-hidden
                className="shrink-0 text-2xl leading-none text-sea transition-transform duration-300 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="max-w-[68ch] pb-5 text-[16px] leading-relaxed text-ink/75">{faq.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
