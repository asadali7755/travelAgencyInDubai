import { PriceNote } from "@/components/packages/PriceNote";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { aed, fromPrice, fromPrivatePrice, type Package } from "@/lib/data/packages";
import { whatsappHref } from "@/lib/site";

/**
 * The sticky enquiry card beside a package. Not a checkout — there is no
 * payment step and the headline figure is a researched market rate, so it
 * collects the enquiry and says exactly what happens next.
 */
export function PackageEnquiryCard({ pkg }: { pkg: Package }) {
  const from = fromPrice(pkg);
  const priv = fromPrivatePrice(pkg);
  const whatsapp = whatsappHref(
    `Hello, I would like a quote for the ${pkg.title} package. Please send availability and pricing.`,
  );

  return (
    <div className="rounded-[var(--radius-card)] border border-card-border bg-surface p-6 shadow-[var(--shadow-card)]">
      <p className="text-[13px] text-ink/55">from</p>
      <p className="mt-1 text-[32px] font-extrabold leading-none tracking-tight">
        {aed(from)}
        <span className="ml-2 text-[15px] font-semibold text-ink/60">per adult</span>
      </p>
      {priv ? (
        <p className="mt-2 text-[14px] text-ink/60">
          or {aed(priv)} for a private vehicle
        </p>
      ) : null}

      <dl className="mt-6 flex flex-col gap-3 border-t border-divider pt-5 text-[15px]">
        <div className="flex justify-between gap-4">
          <dt className="text-ink/60">Duration</dt>
          <dd className="text-right font-semibold">
            {pkg.durationNights > 0
              ? `${pkg.durationDays}D / ${pkg.durationNights}N`
              : "Single day"}
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-ink/60">Covers</dt>
          <dd className="text-right font-semibold">{pkg.places.join(", ")}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-ink/60">Flights</dt>
          <dd className="text-right font-semibold">
            {pkg.kind === "outbound" ? "Included" : "Not included"}
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-ink/60">Confirmation</dt>
          <dd className="text-right font-semibold">Same day</dd>
        </div>
      </dl>

      <div className="mt-6 flex flex-col gap-3">
        <Button href={`/contact?tour=${pkg.slug}`} size="lg" className="w-full">
          Get a real quote
        </Button>
        <Button href={whatsapp} variant="outline" size="lg" className="w-full">
          <WhatsAppIcon />
          Ask on WhatsApp
        </Button>
      </div>

      <PriceNote checked={pkg.checked} compact className="mt-5" />
    </div>
  );
}
