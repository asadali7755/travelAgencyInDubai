import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

const audiences = [
  {
    title: "Visiting the UAE",
    body: "Tour operators, visa agents, airport transfers, car hire and hotels — the people who make a trip work, each one reviewed before it was listed.",
    href: "/services/tour-operators",
    label: "Tour operators",
  },
  {
    title: "Living here",
    body: "Law firms, clinics, spas, movers and PRO services across all seven emirates. The verified badge means we opened the trade licence.",
    href: "/services",
    label: "Browse the directory",
  },
  {
    title: "Running a business",
    body: "A free profile, unlimited service listings, private document storage and enquiries routed straight to you. No paid tier, no commission.",
    href: "/list-your-business",
    label: "List your business",
  },
];

/**
 * The directory strip on the home page.
 *
 * Three audiences rather than three categories, because the site serves people
 * who are visiting, people who live here and people who want to be found — and
 * a visitor sorts themselves far faster by which of those they are.
 */
export function DirectoryTeaser() {
  return (
    <section className="bg-sea-tint/50">
      <div className="mx-auto max-w-[1280px] px-5 py-20 lg:px-10 lg:py-24">
        <Reveal>
          <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-sea-dark">
            UAE services directory
          </p>
          <h2 className="mt-3 max-w-[22ch] text-[clamp(1.9rem,4vw,2.8rem)] font-extrabold leading-tight tracking-tight">
            Licensed businesses, checked by a person
          </h2>
          <span className="mt-4 block h-1 w-16 rounded-full bg-sea" />
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {audiences.map((audience, i) => (
            <Reveal key={audience.title} delayMs={i * 80}>
              <div className="flex h-full flex-col rounded-[var(--radius-card)] border border-card-border bg-surface p-6">
                <h3 className="text-[20px] font-bold tracking-tight">{audience.title}</h3>
                <p className="mt-3 text-[16px] leading-relaxed text-ink/75">{audience.body}</p>
                <Link
                  href={audience.href}
                  className="mt-auto pt-5 text-[15px] font-semibold no-underline"
                >
                  {audience.label} →
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
