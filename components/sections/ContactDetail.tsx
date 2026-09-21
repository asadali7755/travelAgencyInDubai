import Link from "next/link";
import { FaqList } from "@/components/sections/FaqList";
import { Reveal } from "@/components/ui/Reveal";

export const contactFaqs = [
  {
    q: "How quickly will you reply?",
    a: "Same day, and usually within the hour during UAE business hours. Enquiries that arrive overnight are answered first thing. If you have not heard from us within a working day, the message did not reach us — send it again on WhatsApp.",
  },
  {
    q: "What should I include in my enquiry?",
    a: "Four things get you a real quote first time: your travel dates or the month, how many adults and children with the children's ages, roughly what standard of hotel you want, and anything you already know you want to do. Everything else we can work out with you.",
  },
  {
    q: "Do I have to pay anything to get a quote?",
    a: "No. Quoting is free and there is no card, no deposit and no account needed. We check availability first, then send you the price and what it includes.",
  },
  {
    q: "Which languages do you work in?",
    a: "English, Arabic, Hindi and Urdu across the team. Tell us which you would rather use and we will reply in it.",
  },
  {
    q: "Can you help if I am already in Dubai?",
    a: "Yes, and it is a large part of what we do. Same-day tour bookings, airport transfers and attraction tickets can usually be arranged within a couple of hours. Visa applications need longer.",
  },
  {
    q: "Something on this site is out of date. Who do I tell?",
    a: "Use this form or email us with the page and what has changed. Venues move their prices and hours without notice, and a correction from a reader is the fastest way we find out. We fix it within a working day.",
  },
];

/**
 * The part of the contact page that is worth reading.
 *
 * A contact page that is only a form is thin by any measure — it answers none
 * of the questions people actually have before sending one. These are the six
 * that come up most, and they double as the page's FAQ structured data.
 */
export function ContactDetail() {
  const steps = [
    {
      title: "You send the dates",
      body: "The form, WhatsApp or email — whichever is easiest. Nothing is required beyond a way to reach you and roughly when you want to travel.",
    },
    {
      title: "We check what is actually available",
      body: "Hotel allocation and tour seats move constantly in the November to March season. We confirm the real position before quoting rather than sending a price that turns out not to exist.",
    },
    {
      title: "You get an itinerary and a price",
      body: "Written out properly: what is included, what is not, and what the extras cost. If something in it is poor value we will say so — talking someone out of a AED 400 ticket they will not enjoy is cheaper than a refund.",
    },
    {
      title: "You decide, or you do not",
      body: "No deposit is taken to hold a quote and nobody will chase you. If the answer is no, that is a perfectly normal outcome.",
    },
  ];

  return (
    <>
      <section className="bg-sand">
        <div className="mx-auto max-w-[1280px] px-5 py-16 lg:px-10 lg:py-20">
          <Reveal>
            <h2 className="text-[clamp(1.7rem,3.4vw,2.4rem)] font-extrabold tracking-tight">
              What happens after you send it
            </h2>
            <span className="mt-4 block h-1 w-16 rounded-full bg-sea" />
          </Reveal>

          <ol className="mt-9 border-t border-divider">
            {steps.map((step, i) => (
              <li
                key={step.title}
                className="grid gap-2 border-b border-divider py-6 sm:grid-cols-[64px_1fr] sm:gap-6"
              >
                <span className="text-[26px] font-extrabold leading-none text-sea/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-[18px] font-bold">{step.title}</h3>
                  <p className="mt-2 max-w-[66ch] text-[16px] leading-relaxed text-ink/75">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <p className="mt-8 max-w-[66ch] text-[16px] leading-relaxed text-ink/70">
            Prefer to browse first? The{" "}
            <Link href="/packages">packages have prices on them</Link>, the{" "}
            <Link href="/uae-attractions">attraction guides</Link> say what each venue
            charges at the gate, and the{" "}
            <Link href="/about">about page</Link> explains how we check both.
          </p>
        </div>
      </section>

      <div className="bg-page">
        <div className="mx-auto max-w-[1280px] px-5 py-20 lg:px-10 lg:py-24">
          <FaqList faqs={contactFaqs} heading="Before you get in touch" />
        </div>
      </div>
    </>
  );
}
