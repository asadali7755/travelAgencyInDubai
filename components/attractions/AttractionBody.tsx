import { Reveal } from "@/components/ui/Reveal";
import type { Attraction } from "@/lib/data/attractions";

/**
 * The prose column of an attraction page: the long-form sections and the
 * highlights list.
 *
 * Split out of the page so the route file stays a thin composition — the
 * project caps files at 300 lines precisely so pages end up assembled from
 * pieces like this rather than written as one long component.
 */
export function AttractionBody({ attraction }: { attraction: Attraction }) {
  return (
    <>
      <Reveal>
        <h2 className="text-[26px] font-extrabold tracking-tight">Why go</h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {attraction.highlights.map((point) => (
            <li key={point} className="flex gap-3 text-[16px] leading-relaxed text-ink/80">
              <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sea" />
              {point}
            </li>
          ))}
        </ul>
      </Reveal>

      {attraction.sections.map((section, i) => (
        <Reveal key={section.heading} className="mt-12" delayMs={i * 60}>
          <h2 className="text-[26px] font-extrabold tracking-tight">{section.heading}</h2>
          {section.paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 40)}
              className="mt-4 max-w-[68ch] text-[17px] leading-relaxed text-ink/80"
            >
              {paragraph}
            </p>
          ))}
        </Reveal>
      ))}
    </>
  );
}
