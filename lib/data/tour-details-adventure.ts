import type { TourDetail } from "@/lib/data/tour-details";

/**
 * Long-form content for the speed boat and skydiving pages.
 *
 * Split from tour-details.ts to keep both files inside the 300-line rule.
 *
 * The speed boat facts (departure points, durations, age rules) come from the
 * operators' own pages, checked 2026-11-23 — the same pages the price
 * comparison cites. The skydiving operator's site could not be read when this
 * was written, so nothing here states an age limit, weight limit or altitude:
 * those are set by the operator, change, and are confirmed per enquiry.
 */
export const adventureTourDetails: Record<string, TourDetail> = {
  "speed-boat-tour": {
    intro:
      "A speed boat tour is the quickest way to see Dubai's coastline from the water. Boats leave Dubai Marina, run out past JBR and Ain Dubai, along the outside of the Palm Jumeirah to Atlantis, and on to the Burj Al Arab before turning back. The longer tours cover all of that with photo stops; the shorter ones go as far as Atlantis. It is a shared, open boat — fast, a little spray, and very different from a dinner cruise.",
    itinerary: [
      {
        time: "Start",
        title: "Check in at Dubai Marina",
        body: "Arrive fifteen minutes early for the safety briefing and life jackets. Departure points differ by operator — Marina Walk for some, the Al Majara side of the Marina for others — so check the ticket.",
      },
      {
        time: "Leg 1",
        title: "JBR and Ain Dubai",
        body: "Out of the Marina mouth and along the JBR beachfront, with the observation wheel on Bluewaters Island beside you.",
      },
      {
        time: "Leg 2",
        title: "The Palm and Atlantis",
        body: "Along the Palm's outer crescent to Atlantis The Palm. The boat stops on the water for photographs.",
      },
      {
        time: "Leg 3",
        title: "Burj Al Arab",
        body: "On the full-length tours only: south along the coast to the Burj Al Arab for a second photo stop.",
      },
      {
        time: "Finish",
        title: "Back to the Marina",
        body: "A faster run home through open water, then back into the Marina past the towers.",
      },
    ],
    includes: [
      "Seat on a shared speed boat with a licensed captain",
      "Life jackets and a safety briefing",
      "Photo stops at Atlantis, and Burj Al Arab on the full-length tours",
      "Commentary on the landmarks (live or audio, depending on the operator)",
    ],
    excludes: [
      "Hotel transfers — most boats meet you at the Marina",
      "Food; some operators include bottled water",
      "Private boat hire, which is priced per boat",
    ],
    faqs: [
      {
        q: "How long is a speed boat tour in Dubai?",
        a: "Between 45 and 99 minutes. The 90 and 99 minute tours cover the Marina, the Palm, Atlantis and the Burj Al Arab. The 45 and 60 minute versions are shorter loops, so check that the landmark you care about is on the route before you book.",
      },
      {
        q: "How much does a speed boat tour cost?",
        a: "Published adult prices for the full Marina to Burj Al Arab route ran from AED 119 to AED 299 when we checked in November 2026, with child tickets around AED 99 to AED 120. The comparison on this page lists each operator's price and links to where it is published.",
      },
      {
        q: "Can children go on a speed boat tour?",
        a: "Yes, from about five years old — the exact rule is the operator's. One sets the minimum at age 5 and 15 kg, another at age 5 with life jackets compulsory under 10, another at age 4.",
      },
      {
        q: "Is it a rough ride?",
        a: "It is fast and you may get splashed, especially on the open-water stretch to the Burj Al Arab. Operators advise against it if you are pregnant or have back, neck or heart problems. Bring sunglasses and keep your phone on a strap.",
      },
      {
        q: "What is the best time of day to go?",
        a: "Early morning or late afternoon. The light is softer for photographs, and from May to September the midday sun on an open boat is hard going.",
      },
    ],
  },

  skydiving: {
    intro:
      "Skydiving in Dubai is done as a tandem jump: you are harnessed to a licensed instructor who controls the freefall and the parachute, so no experience is needed. There are two drop zones. The Palm drop zone puts the Palm Jumeirah and the Marina skyline underneath you and lands beside the beach. The desert drop zone jumps over open dunes. Expect a half day on site, of which the jump itself is a few minutes.",
    itinerary: [
      {
        time: "Arrive",
        title: "Check-in and paperwork",
        body: "Bring photo ID. The operator weighs you and checks the medical declaration — this is where the age and weight limits are applied, so read them before you go.",
      },
      {
        time: "Training",
        title: "Briefing with your instructor",
        body: "The body position for exit, freefall and landing, and harness fitting. It is short and practical.",
      },
      {
        time: "The jump",
        title: "Plane, freefall, parachute",
        body: "The climb to altitude, about a minute of freefall, then several minutes under the canopy while the instructor steers you down.",
      },
      {
        time: "After",
        title: "Landing and media",
        body: "If you bought a photo or video package, you collect it before you leave.",
      },
    ],
    includes: [
      "Tandem skydive with a licensed instructor",
      "Ground briefing, harness and equipment",
      "Booking at the drop zone of your choice, subject to availability",
    ],
    excludes: [
      "Photo and video packages — sold by the operator as an extra",
      "Transfers to the drop zone, arranged on request",
      "Rebooking costs if you cancel outside the operator's terms",
    ],
    faqs: [
      {
        q: "Do I need any experience to skydive in Dubai?",
        a: "No. A tandem jump is designed for first-timers: the instructor is attached to you and handles the exit, the parachute and the landing. The briefing on the day covers everything you need to do.",
      },
      {
        q: "Palm or desert drop zone — which is better?",
        a: "The Palm is the famous view: the island, the Marina and the coast below you. The desert is open dunes and usually easier to get a slot for. Opening dates and prices differ between the two, so tell us your dates and we confirm what is available.",
      },
      {
        q: "Are there age and weight limits?",
        a: "Yes. The operator sets a minimum age and a maximum weight for tandem jumps and checks both at check-in. They change from time to time, so we confirm the current limits when you enquire rather than print a figure that may be out of date.",
      },
      {
        q: "What happens if the weather is bad?",
        a: "Jumps are postponed for strong wind or poor visibility, and the operator reschedules you. Book early in your trip so there is room to move it.",
      },
      {
        q: "Why is there no price comparison on this page?",
        a: "Because we could not read the operator's current price list ourselves when this page was written, and we only compare prices we have checked at the source. Ask us for the current tandem and media prices and we will send them with the date we checked.",
      },
    ],
  },
};
