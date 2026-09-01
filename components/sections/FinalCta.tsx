import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { whatsappHref } from "@/lib/site";

export function FinalCta() {
  const whatsapp = whatsappHref();

  return (
    <section className="bg-page">
      <div className="mx-auto max-w-[1280px] px-5 pb-24 lg:px-10 lg:pb-32">
        <Reveal className="rounded-[var(--radius-xl2)] bg-sea px-6 py-14 text-center lg:px-16 lg:py-20">
          <h2 className="mx-auto max-w-[20ch] text-[clamp(2rem,4.4vw,3.1rem)] font-extrabold leading-tight tracking-tight text-white text-balance">
            Tell us your dates. We&rsquo;ll build the trip.
          </h2>
          <p className="mx-auto mt-5 max-w-[58ch] text-[17px] leading-relaxed text-white/85">
            A real itinerary and a real price within hours — no logins, no card required to
            enquire, free cancellation on most tours up to 24 hours before.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button href="/contact" variant="onSea" size="lg">
              Get a free quote
            </Button>
            <Button href={whatsapp} variant="ghost" size="lg">
              <WhatsAppIcon />
              WhatsApp us
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
