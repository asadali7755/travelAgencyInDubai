import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { whatsappHref } from "@/lib/site";
import type { Tour } from "@/lib/data/tours";

/**
 * Sits beside the tour copy on desktop. It does not pretend to be a checkout:
 * there is no confirmed price and no payment step yet, so it collects the
 * enquiry instead and says plainly what happens next.
 */
export function BookingCard({ tour }: { tour: Tour }) {
  const whatsapp = whatsappHref(
    `Hello, I would like to book the ${tour.title} in Dubai. Please send availability and pricing.`,
  );

  return (
    <div className="rounded-[var(--radius-card)] border border-card-border bg-surface p-6 shadow-[var(--shadow-card)]">
      <p className="text-[13px] text-ink/55">from</p>
      <p className="mt-1 text-[32px] font-extrabold leading-none tracking-tight">
        <span className="underline decoration-dashed decoration-ink/25 underline-offset-8">
          [AED price]
        </span>
        <span className="ml-2 text-[15px] font-semibold text-ink/60">{tour.priceUnit}</span>
      </p>

      <dl className="mt-6 flex flex-col gap-3 border-t border-divider pt-5 text-[15px]">
        <div className="flex justify-between gap-4">
          <dt className="text-ink/60">Duration</dt>
          <dd className="font-semibold">{tour.durationLabel}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-ink/60">Pick-up</dt>
          <dd className="font-semibold">Across Dubai</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-ink/60">Confirmation</dt>
          <dd className="font-semibold">Same day</dd>
        </div>
      </dl>

      <div className="mt-6 flex flex-col gap-3">
        <Button href={`/contact?tour=${tour.slug}`} size="lg" className="w-full">
          Request this tour
        </Button>
        <Button href={whatsapp} variant="outline" size="lg" className="w-full">
          <WhatsAppIcon />
          Ask on WhatsApp
        </Button>
      </div>

      <p className="mt-5 text-[13px] leading-relaxed text-ink/55">
        No card needed to enquire. We check availability first, then send you the price and a
        payment link.
      </p>
    </div>
  );
}
