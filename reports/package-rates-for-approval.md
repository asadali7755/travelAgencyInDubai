# Package and attraction rates — for the boss to sign off

**Researched 18 September 2026. Nothing here is a rate this agency has contracted.**

Every figure now rendered on the site comes from one of two files:

- `lib/data/attractions/*.ts` — the `gate` field on each attraction
- `lib/data/packages/*.ts` — the `tiers` and `addOns` fields on each package

They are *published market rates*: what the venue charges at the gate, or what a
trip of that shape sells for across UAE operators and OTAs. That is the same
basis `lib/data/trip-rates.ts` already uses for the trip cost calculator, and
every price the site prints carries the disclaimer in
`components/packages/PriceNote.tsx` saying so.

**What needs to happen:** go through the two tables below, replace anything where
we have our own contracted rate, and tell us. Changing a number in those files
updates the card, the pricing table, the enquiry box and the `Offer` structured
data at once — they all read the same source, so they cannot drift apart.

---

## 1. Attraction gate prices

These are the venue's own prices, not ours. We show them because a visitor
planning a trip needs to know that the Burj Khalifa deck is AED 173 and the
Dubai Frame is AED 42 — and because a page that answers that question is the
page that ranks. They should only change if a venue changes its price.

| Attraction | Adult from | Child from | Note |
| --- | --- | --- | --- |
| Burj Khalifa | AED 173 | AED 140 | Prime hours from AED 250; level 148 from AED 400 |
| Museum of the Future | AED 149 | — | AED 149–159 standard; Pioneer pass ~AED 399 |
| Dubai Frame | AED 42 | AED 25 | Child 3–11; Zabeel Park entry included |
| Global Village | AED 20 | — | Gate only; rides and food extra |
| Dubai Miracle Garden | AED 89 | — | Butterfly Garden separate |
| Atlantis Aquaventure | AED 299 | — | AED 299–350 by season; aquarium included |
| Ferrari World Abu Dhabi | AED 345 | — | 2 parks ~AED 475, 3 ~AED 575, 4 ~AED 675 |
| Louvre Abu Dhabi | AED 63 | Free | Under-18s free; closed Mondays |
| Qasr Al Watan | AED 65 | AED 30 | Junior 4–17; evening projection included |
| Al Noor Island | AED 35 | AED 20 | Butterfly House ~AED 15 extra |
| Sharjah Museum of Islamic Civilization | AED 10 | AED 5 | Cheapest serious museum in the country |
| Mleiha Archaeological Centre | AED 25 | — | Guided tours and camps priced separately |
| Ajman Museum | AED 5 | — | **Confirm — nominal, poorly published** |
| Jebel Jais zipline | AED 325 | — | Mountain road and viewing park are free |
| Dreamland Aqua Park | AED 145 | — | **Confirm — varies by day and season** |

**Free to enter** (stated as free on the site): Sheikh Zayed Grand Mosque, the
Dubai Fountain, Palm Jumeirah, Dubai Marina & JBR, Al Fahidi and the Creek souks,
Hatta, Jebel Jais viewing park, Al Bidyah Mosque, Snoopy Island.

---

## 2. Package prices — the ones that need your rates

This is the table that matters. These are what the market charges; replace them
with what *we* charge.

### Day tours (per adult on a shared seat; private is a vehicle total)

| Package | Shared adult | Shared child | Private (up to 4) | Your rate |
| --- | --- | --- | --- | --- |
| Dubai City Tour, half day | AED 150 | AED 110 | AED 550 | |
| Abu Dhabi Day Trip | AED 250 | AED 190 | AED 950 | |
| Hatta Mountain Day Trip | AED 300 | AED 220 | AED 1,100 | |

### UAE holidays (per adult, twin sharing, land only)

| Package | 3-star | 4-star | 5-star | Your rate |
| --- | --- | --- | --- | --- |
| Dubai Essentials, 3D/2N | AED 600 | AED 850 | AED 1,450 | |
| Dubai Explorer, 5D/4N | AED 1,200 | AED 1,650 | AED 2,750 | |
| UAE Theme Parks Family, 4D/3N | — | AED 1,850 | AED 2,950 | |

### Outbound (per adult, twin sharing, **including** return economy flights from Dubai)

| Package | 3-star | 4-star | 5-star | Your rate |
| --- | --- | --- | --- | --- |
| Baku, 4D/3N | AED 999 | AED 1,299 | AED 1,899 | |
| Georgia — Tbilisi & Kazbegi, 5D/4N | AED 1,750 | AED 2,050 | AED 3,200 | |
| Türkiye — Istanbul & Cappadocia, 6D/5N | AED 2,150 | AED 2,750 | AED 4,200 | |
| Thailand — Bangkok & Phuket, 6D/5N | AED 2,450 | AED 3,100 | AED 4,600 | |

---

## 3. Three things worth deciding at the same time

**Season pricing.** Every package carries one `seasonNote` sentence, and the
UAE ones all say the same thing in different words: hotels roughly double
between late December and February. If you want real seasonal columns rather
than a sentence, that is a data-model change and worth doing once rather than
twice — say so now.

**The disclaimer.** Every price on the site currently reads as "indicative
market rate, September 2026 — your quote may differ". The moment you confirm
your own rates, that wording should change to a straight price. It lives in one
file: `components/packages/PriceNote.tsx`.

**Structured data.** Package pages now emit `AggregateOffer` with these prices,
which is what makes a price appear under the result in Google. Google requires
the structured price to match the visible price, and both read the same field —
so this stays correct automatically, but it also means a wrong number here is a
wrong number in search results, not just on the page.

---

## 4. Sources used

Prices were cross-checked in September 2026 against venue sites (Burj Khalifa,
Museum of the Future, Dubai Frame, Museum of Islamic Civilization, Qasr Al
Watan, Ferrari World/Yas), the main UAE ticket resellers (Platinumlist, Headout,
Cobone, Viator, GetYourGuide), and UAE holiday operators for the outbound
lead-in fares. Where two sources disagreed, the lower published figure was used
and the spread noted in the `note` field, so no price on the site is higher than
something a visitor can actually find.

Two rows are marked **Confirm**: Ajman Museum and Dreamland Aqua Park publish
their prices poorly and the figures shown are the best available. Both are
small-ticket and low-traffic, but they should be checked by phone before the
site is promoted.
