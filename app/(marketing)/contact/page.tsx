import type { Metadata } from "next";
import { Suspense } from "react";
import { LeadForm } from "@/components/forms/LeadForm";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { site, whatsappHref } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us | 24-Hour Travel Agency in Dubai",
  description:
    "Talk to a Dubai travel expert any time. Call or WhatsApp for tour bookings, visa help and holiday packages — we reply the same day, often within the hour.",
  path: "/contact",
  image: "/images/city-night.jpg",
});

const trail: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
];

export default function ContactPage() {
  const whatsapp = whatsappHref();

  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />

      <section className="bg-sea-tint/60">
        <div className="mx-auto max-w-[1280px] px-5 pb-14 pt-28 lg:px-10 lg:pb-16 lg:pt-36">
          <Breadcrumbs trail={trail} />
          <h1 className="mt-5 max-w-[18ch] text-[clamp(2.4rem,5.5vw,4rem)] font-extrabold leading-[1.02] tracking-tight">
            Tell us your dates. We&rsquo;ll build the trip.
          </h1>
          <p className="mt-6 max-w-[62ch] text-[18px] leading-relaxed text-ink/75">
            One message is enough: how many people, which days, and what you want to see. You get
            a real itinerary and a real price back — no logins, no card, no obligation.
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-[1280px] gap-14 px-5 py-16 lg:grid-cols-[1fr_380px] lg:px-10 lg:py-20">
        <Reveal>
          <h2 className="text-[26px] font-extrabold tracking-tight">Send an enquiry</h2>
          <p className="mt-2 max-w-[56ch] text-[16px] leading-relaxed text-ink/70">
            Everything except your name, contact details and where you are travelling from is
            optional.
          </p>
          <div className="mt-8">
            <Suspense fallback={<div className="min-h-96" />}>
              <LeadForm />
            </Suspense>
          </div>
        </Reveal>

        <Reveal delayMs={100} className="flex flex-col gap-6">
          <div className="rounded-[var(--radius-card)] border border-card-border bg-surface p-6">
            <h2 className="text-[20px] font-extrabold tracking-tight">Reach us directly</h2>
            <dl className="mt-5 flex flex-col gap-4 text-[15px]">
              <div>
                <dt className="text-ink/55">Phone</dt>
                <dd className="mt-1 font-semibold underline decoration-dashed decoration-ink/25 underline-offset-4">
                  {site.phoneDisplay}
                </dd>
              </div>
              <div>
                <dt className="text-ink/55">WhatsApp</dt>
                <dd className="mt-1 font-semibold underline decoration-dashed decoration-ink/25 underline-offset-4">
                  {site.whatsappDisplay}
                </dd>
              </div>
              <div>
                <dt className="text-ink/55">Email</dt>
                <dd className="mt-1 font-semibold">
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </dd>
              </div>
              <div>
                <dt className="text-ink/55">Office</dt>
                <dd className="mt-1 font-semibold underline decoration-dashed decoration-ink/25 underline-offset-4">
                  {site.addressDisplay}
                </dd>
              </div>
            </dl>

            <Button href={whatsapp} size="lg" className="mt-6 w-full">
              <WhatsAppIcon />
              WhatsApp us
            </Button>
          </div>

          <div className="rounded-[var(--radius-card)] bg-sand p-6">
            <h2 className="text-[20px] font-extrabold tracking-tight">When we answer</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-ink/75">
              Someone is on WhatsApp around the clock, because guests land at every hour and
              flights do not care what time it is in Dubai. Written quotes come back the same day.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-ink/75">
              Licensed by Dubai&rsquo;s Department of Economy &amp; Tourism — DET licence{" "}
              <span className="underline decoration-dashed decoration-ink/25 underline-offset-4">
                {site.detLicenceDisplay}
              </span>
              .
            </p>
          </div>
        </Reveal>
      </div>
    </>
  );
}
