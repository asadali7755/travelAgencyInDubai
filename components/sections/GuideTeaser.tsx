import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function GuideTeaser() {
  return (
    <section className="bg-gold-tint">
      <div className="mx-auto grid max-w-[1280px] items-center gap-10 px-5 py-20 lg:grid-cols-2 lg:px-10 lg:py-28">
        <Reveal>
          <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-gold-dark">
            Travel guide
          </p>
          <h2 className="mt-3 text-[clamp(2rem,4.2vw,3rem)] font-extrabold leading-tight tracking-tight">
            40 things to do in Dubai
          </h2>
          <span className="mt-4 block h-1 w-16 rounded-full bg-gold" />
          <p className="mt-6 max-w-[52ch] text-[17px] leading-relaxed text-ink/75">
            Written by people who live here: the viewpoints worth the queue, the souks worth
            the haggle, where to eat for pocket money and where to blow the budget. Updated
            every season.
          </p>
          <Button href="/blog/things-to-do-in-dubai" className="mt-8">
            Read the guide
          </Button>
        </Reveal>

        <Reveal delayMs={120}>
          <div className="relative aspect-4/3 overflow-hidden rounded-[var(--radius-xl2)]">
            <Image
              src="/images/abra-fahidi.jpg"
              alt="An abra crossing Dubai Creek in front of the Al Fahidi district"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
