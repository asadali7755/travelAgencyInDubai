import { accentClasses } from "@/components/ui/accents";
import { BedIcon, CarIcon, PassportIcon, PlaneIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/lib/data/home";

const icons = [PassportIcon, CarIcon, BedIcon, PlaneIcon];

export function Services() {
  return (
    <section className="bg-page">
      <div className="mx-auto max-w-[1280px] px-5 py-20 lg:px-10 lg:py-28">
        <Reveal>
          <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-palm">
            Beyond the tours
          </p>
          <h2 className="mt-3 max-w-[18ch] text-[clamp(2rem,4.2vw,3rem)] font-extrabold leading-tight tracking-tight">
            One agency for the whole trip
          </h2>
          <span className="mt-4 block h-1 w-16 rounded-full bg-palm" />
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => {
            const accent = accentClasses[service.accent];
            const Icon = icons[i] ?? PassportIcon;

            return (
              <Reveal key={service.title} delayMs={i * 80}>
                <div
                  className={`h-full rounded-[var(--radius-card)] border border-card-border p-6 ${accent.tint}`}
                >
                  <Icon className={`h-7 w-7 ${accent.text}`} />
                  <h3 className="mt-4 text-[19px] font-bold leading-tight">{service.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink/70">{service.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
