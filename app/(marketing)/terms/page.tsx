import type { Metadata } from "next";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Terms & Cancellation | Travel Agency in Dubai",
  description:
    "How bookings, payments, changes and cancellations work when you book a tour, transfer, hotel or visa through us in Dubai.",
  path: "/terms",
});

const trail: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Terms & cancellation", path: "/terms" },
];

const h2 = "mt-10 text-[22px] font-extrabold tracking-tight";
const p = "mt-3 max-w-[68ch] text-[16px] leading-[1.75] text-ink/80";

export default function TermsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />

      <div className="mx-auto max-w-[1280px] px-5 pb-20 pt-28 lg:px-10 lg:pt-36">
        <Breadcrumbs trail={trail} />
        <h1 className="mt-5 text-[clamp(2.2rem,4.6vw,3.2rem)] font-extrabold leading-tight tracking-tight">
          Terms &amp; cancellation
        </h1>

        <p className="mt-6 max-w-[68ch] rounded-[var(--radius-card)] bg-sun-tint/60 p-5 text-[15px] leading-relaxed text-ink/75">
          These terms describe how we actually work. They are written in plain English and are
          pending review by the operator before launch — the company&rsquo;s registered legal name
          and DET licence number are still to be filled in.
        </p>

        <h2 className={h2}>Who you are booking with</h2>
        <p className={p}>
          Tours, transfers, hotels and visa assistance on this site are arranged by{" "}
          <span className="underline decoration-dashed decoration-ink/25 underline-offset-4">
            [registered company name]
          </span>
          , a tour operator licensed by Dubai&rsquo;s Department of Economy &amp; Tourism under
          licence{" "}
          <span className="underline decoration-dashed decoration-ink/25 underline-offset-4">
            {site.detLicenceDisplay}
          </span>
          . Where a tour is operated by a partner, we remain your point of contact.
        </p>

        <h2 className={h2}>Enquiries, quotes and confirmation</h2>
        <p className={p}>
          Sending an enquiry does not book anything and does not commit you to paying. We check
          availability, quote you a price, and your booking exists only once you have accepted
          that quote and we have confirmed it in writing.
        </p>

        <h2 className={h2}>Prices</h2>
        <p className={p}>
          Prices are quoted in UAE dirhams per person unless stated otherwise, and are held for
          the dates in your quote. Attraction tickets and hotel rates move with demand, so a
          quote that has expired may be re-priced before confirmation.
        </p>

        <h2 className={h2}>Changes and cancellations</h2>
        <p className={p}>
          Most tours can be cancelled free of charge up to 24 hours before departure, and we will
          always tell you the specific cancellation window before you pay. Attraction tickets with
          timed entry, private charters and hotel bookings often have stricter terms set by the
          supplier — those are stated in your quote rather than hidden here.
        </p>
        <p className={p}>
          If we cancel — for weather, safety or an operational problem — you are offered another
          date or a full refund, whichever you prefer.
        </p>

        <h2 className={h2}>Your safety and conduct</h2>
        <p className={p}>
          Some activities, dune bashing especially, are not suitable for pregnant guests, small
          children or anyone with back, neck or heart conditions. Tell us at the time of booking
          so we can adapt the trip. Drivers and guides may stop an activity where they judge it
          unsafe.
        </p>

        <h2 className={h2}>Local law and custom</h2>
        <p className={p}>
          Guests are expected to respect UAE law and local custom, including dress codes at
          religious sites and the rules that apply during Ramadan. We will brief you on anything
          relevant to your itinerary before you travel.
        </p>

        <h2 className={h2}>Complaints</h2>
        <p className={p}>
          Tell us while you are still in Dubai if you can — most problems are fixable on the day.
          Write to{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a> and we will respond within three
          working days.
        </p>
      </div>
    </>
  );
}
