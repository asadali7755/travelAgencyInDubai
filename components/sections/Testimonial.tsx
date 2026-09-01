import { Reveal } from "@/components/ui/Reveal";

/**
 * The quote is drafted copy standing in for a real review, and the attribution
 * keeps its bracket so nobody mistakes it for one. Swap both together once the
 * client sends real reviews.
 */
export function Testimonial() {
  return (
    <section className="bg-coral-tint">
      <div className="mx-auto max-w-[1280px] px-5 py-20 lg:px-10 lg:py-24">
        <Reveal as="figure" className="mx-auto max-w-[46ch] text-center">
          <span className="mx-auto mb-6 block h-1 w-16 rounded-full bg-coral" />
          <blockquote className="text-[clamp(1.35rem,2.6vw,1.9rem)] font-semibold leading-snug tracking-tight text-balance">
            &ldquo;They moved our safari when the weather turned, upgraded the camp without
            asking twice, and answered every message in minutes. Book with them.&rdquo;
          </blockquote>
          <figcaption className="mt-6 text-[14px] text-ink/60">
            — Guest from{" "}
            <span className="underline decoration-dashed decoration-ink/30 underline-offset-4">
              [country]
            </span>
            , evening desert safari
          </figcaption>
        </Reveal>
      </div>
    </section>
  );
}
