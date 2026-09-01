import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { TourCard } from "@/components/sections/TourCard";
import { Reveal } from "@/components/ui/Reveal";
import { featuredTours } from "@/lib/data/home";

export function SignatureExperiences() {
  return (
    <section className="bg-page">
      <div className="mx-auto max-w-[1280px] px-5 py-20 lg:px-10 lg:py-28">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-sun-dark">
              Signature experiences
            </p>
            <h2 className="mt-3 text-[clamp(2rem,4.2vw,3rem)] font-extrabold leading-tight tracking-tight">
              The Dubai you came for
            </h2>
            <span className="mt-4 block h-1 w-16 rounded-full bg-sun" />
          </div>

          <Link
            href="/dubai-tours"
            className="inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold no-underline"
          >
            All tours
            <ArrowRightIcon />
          </Link>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredTours.map((tour, i) => (
            <Reveal key={tour.slug} delayMs={(i % 3) * 90}>
              <TourCard tour={tour} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
