"""Fill boss's keyword sheet: Keyword / URL / Meta Title / Meta Description / Anchor / BB Tags.

Page metas are defined once per URL (keywords that share a page share its meta, which is
correct SEO practice); anchors are per keyword because they become internal-link text.

Run:  python seo/build_keyword_map.py
Out:  seo/keyword-map.csv
"""

import csv
import pathlib

# url -> (meta title <= 60 chars, meta description <= 155 chars)
PAGES: dict[str, tuple[str, str]] = {
    "/": (
        "Travel Agency in Dubai | Tours, Visa & Packages",
        "Licensed travel agency in Dubai offering desert safaris, dhow cruises, city tours, hotels, visas and holiday packages. Free quote on WhatsApp.",
    ),
    "/about": (
        "About Us | Trusted Dubai Travel & Tourism Company",
        "A DET-licensed Dubai tourism company handling inbound tours, outbound holidays, visas and transfers. Meet the team behind every trip we plan.",
    ),
    "/contact": (
        "Contact Us | 24-Hour Travel Agency in Dubai",
        "Talk to a Dubai travel expert any time. Call or WhatsApp for tour bookings, visa help and last-minute holiday packages, with replies in minutes.",
    ),
    "/areas/deira": (
        "Travel Agency in Deira, Dubai | Tours & Visas",
        "Local travel agency serving Deira and old Dubai. Book desert safaris, city tours, airport transfers and visit visas with a team close to you.",
    ),
    "/dubai-tours": (
        "Dubai Tours | Desert Safari, Cruises & City Tours",
        "Browse our Dubai tours: desert safari, dhow cruise, city sightseeing, yacht trips and attraction tickets. Transparent AED pricing, fast confirmation.",
    ),
    "/dubai-tours/desert-safari": (
        "Desert Safari Dubai | Evening & Overnight Tours",
        "Book a Dubai desert safari with dune bashing, camel rides, BBQ dinner and live shows. Hotel pick-up included across Dubai. Family and VIP options.",
    ),
    "/dubai-tours/city-tour": (
        "Dubai City Tour | Half-Day & Full-Day Sightseeing",
        "See Burj Khalifa, the Palm, Dubai Frame and Old Dubai in one guided city tour. Air-conditioned transport and hotel pick-up included.",
    ),
    "/dubai-tours/cruises": (
        "Dubai Cruise Tours | Dhow, Dinner & Yacht Cruises",
        "Every cruise we run from Dubai: dhow dinner cruises, Marina cruises, luxury yacht charters and speedboat tours. Compare and book in minutes.",
    ),
    "/dubai-tours/dhow-cruise-dinner": (
        "Dhow Cruise Dubai | Dinner Cruise with Live Show",
        "Traditional dhow cruise in Dubai with buffet dinner, tanoura show and skyline views. Creek and Marina departures, hotel transfers available.",
    ),
    "/dubai-tours/dhow-cruise-marina": (
        "Dhow Cruise Dubai Marina | Marina Dinner Cruise",
        "Two-hour dhow cruise through Dubai Marina with international buffet dinner, live entertainment and views of JBR and Ain Dubai.",
    ),
    "/dubai-tours/yacht-charter": (
        "Dubai Yacht Tour | Private Charter & Sightseeing",
        "Private yacht tours in Dubai Marina and around the Palm. Hourly charters with crew, refreshments and swimming stops. Groups of 6 to 40.",
    ),
    "/dubai-tours/yellow-boats": (
        "Yellow Boats Dubai | Speedboat Sightseeing Tour",
        "High-speed RIB boat tour past Burj Al Arab, Atlantis and the Palm. Sixty and ninety minute options with an on-board guide.",
    ),
    "/dubai-tours/escorted-tours": (
        "Escorted Dubai Tours | Fully Guided Group Trips",
        "Fully escorted Dubai tours with an English-speaking guide throughout. Transport, tickets and meals arranged end to end, nothing left to plan.",
    ),
    "/dubai-holiday-packages": (
        "Dubai Holiday Packages | Hotel, Tours & Transfers",
        "All-in Dubai holiday packages with hotel, airport transfers, tours and visa. Family, honeymoon and budget options priced clearly per person.",
    ),
    "/dubai-hotels": (
        "Dubai Hotel Booking | Beach, City & Family Hotels",
        "Book Dubai hotels at agency rates: beach resorts, Marina apartments and city hotels. Free cancellation on most stays, pay on confirmation.",
    ),
    "/dubai-hotels/fairmont-the-palm": (
        "Fairmont The Palm Dubai | Rates, Rooms & Beach",
        "Fairmont The Palm guide and booking: room types, private beach, pools, dining, and what the resort costs through a Dubai travel agent.",
    ),
    "/dubai-hotels/anantara-the-palm": (
        "Anantara The Palm Dubai Resort | Overwater Villas",
        "Anantara The Palm Dubai Resort guide: overwater villas, lagoon access, spa and dining, plus agency rates and package options.",
    ),
    "/dubai-hotels/grand-hyatt-dubai": (
        "Grand Hyatt Dubai | Rooms, Pools & Location Guide",
        "Grand Hyatt Dubai guide: rooms, pools, restaurants and the Creek location, with agency rates and tours that pair well with your stay.",
    ),
    "/dubai-hotels/underwater-suites": (
        "Dubai Underwater Hotel | Atlantis Poseidon Suites",
        "What a stay in Dubai's underwater suites at Atlantis actually costs, what is included, and the alternatives worth considering first.",
    ),
    "/services/visa/dubai": (
        "Dubai Visa Services | Tourist & Visit Visa Help",
        "UAE tourist and visit visa processing for 30 and 60 days. Document checklist, timelines and fees handled by a licensed Dubai agency.",
    ),
    "/services/transport/dubai": (
        "Dubai Airport Transfers & Chauffeur Car Rental",
        "Private airport transfers, city transport and chauffeur cars across Dubai. Fixed prices with meet-and-greet at DXB and DWC.",
    ),
    "/blog/best-travel-agencies-in-dubai": (
        "Best Travel Agencies in Dubai (2026 Comparison)",
        "How Dubai's travel and tourism companies compare on tours, visas and holiday packages: licences, specialities and what each one does best.",
    ),
    "/blog/things-to-do-in-dubai": (
        "Things to Do in Dubai | 40 Ideas for 2026",
        "Forty things to do in Dubai, from desert safaris and Burj Khalifa to free beaches and souks, sorted by budget, season and who you travel with.",
    ),
    "/blog/places-to-visit-in-dubai": (
        "Places to Visit in Dubai | Top Attractions Guide",
        "The famous places to visit in Dubai and the ones locals rate, with ticket prices, best visiting times and how to reach each attraction.",
    ),
    "/blog/best-time-to-visit-dubai": (
        "Best Time to Visit Dubai | Month-by-Month Guide",
        "Dubai weather, crowds and prices month by month, plus which season suits beaches, desert tours, shopping festivals and family trips.",
    ),
    "/blog/dubai-nightlife-guide": (
        "Dubai Nightlife Guide | Clubs, Lounges & Rules",
        "A practical guide to Dubai nightlife: the main clubs and lounges, dress codes, entry rules, ladies nights and what the law actually allows.",
    ),
    "/blog/beach-clubs-in-dubai": (
        "Beach Clubs in Dubai | Day Passes & Prices",
        "Dubai beach clubs compared: day pass prices, minimum spend, the best pools, and which ones suit couples, groups or families.",
    ),
    "/blog/malls-in-dubai": (
        "Malls in Dubai | Biggest Malls & Outlet Shopping",
        "Every major mall in Dubai plus the outlet villages, with what each is best for, opening hours and how to get there by metro.",
    ),
    "/blog/dubai-water-parks": (
        "Dubai Water Parks | Tickets, Rides & Best Days",
        "Aquaventure, Wild Wadi and Laguna compared: ticket prices, ride line-ups, height limits and the quietest days to visit.",
    ),
    "/blog/dubai-adventure-activities": (
        "Skydiving & Adventure Activities in Dubai",
        "Skydive Dubai, indoor skydiving, zero gravity flights and other adrenaline activities: prices, booking windows and what to expect.",
    ),
    "/blog/museum-of-the-future-dubai": (
        "Museum of the Future Dubai | Tickets & Tips",
        "Museum of the Future ticket prices, how to avoid the queue, how long to allow inside, and what each floor actually shows.",
    ),
    "/blog/sky-views-dubai": (
        "Sky Views Dubai | Edge Walk, Glass Slide & Tickets",
        "Sky Views Observatory guide: the glass slide, Edge Walk, ticket prices, and how it compares with Burj Khalifa At The Top.",
    ),
    "/blog/dubai-marina-guide": (
        "Dubai Marina Guide | Things to Do, Eat & Stay",
        "What to do in Dubai Marina: the walk, JBR beach, cruises and restaurants, plus where to stay and how to get around.",
    ),
    "/blog/bluewaters-island-dubai": (
        "Bluewaters Island Dubai | Ain Dubai & Beach Guide",
        "Bluewaters Island guide: the Ain Dubai observation wheel, the beach, restaurants, and how to reach the island from JBR.",
    ),
    "/blog/dubai-dolphinarium": (
        "Dubai Dolphinarium | Shows, Tickets & Timings",
        "Dubai Dolphinarium show timings, ticket prices, seating tips, and what else to do in Creek Park on the same visit.",
    ),
    "/blog/dubai-safari-park": (
        "Dubai Safari Park | Tickets, Zones & Best Time",
        "Dubai Safari Park guide: ticket types, the five zones, feeding times, and how long a visit really takes with children.",
    ),
    "/blog/dubai-uae-travel-guide": (
        "Dubai, UAE Travel Guide for a First Trip",
        "A first-timer guide to Dubai and the UAE: visas, currency, transport, local customs, weather and a sample week-long itinerary.",
    ),
    "/blog/luxury-dubai-experiences": (
        "Luxury Dubai Experiences | Deluxe Tours & Stays",
        "The deluxe Dubai experiences worth the money: private yachts, helicopter tours, desert suites and fine dining, with real prices.",
    ),
}

# (keyword, url, anchor text, bb tags, note)
ROWS: list[tuple[str, str, str, str, str]] = [
    ("travel agency in dubai", "/", "travel agency in Dubai", "core, commercial, homepage", ""),
    ("best travel agency in dubai", "/", "best travel agency in Dubai", "core, commercial", ""),
    ("tourism companies in dubai", "/about", "Dubai tourism company", "core, commercial", ""),
    ("top 10 travel agencies in dubai 2020", "/blog/best-travel-agencies-in-dubai", "top travel agencies in Dubai", "listicle, informational", "Drop the 2020 and target the current year"),
    ("travel and tours in dubai", "/dubai-tours", "travel and tours in Dubai", "core, commercial", ""),
    ("list of travel and tourism companies in dubai", "/blog/best-travel-agencies-in-dubai", "list of Dubai travel companies", "listicle, informational", ""),
    ("list of tourism companies in dubai", "/blog/best-travel-agencies-in-dubai", "Dubai tourism companies list", "listicle, informational", ""),
    ("travel agent for dubai trip", "/", "travel agent for a Dubai trip", "core, commercial", ""),
    ("best travel agency for dubai", "/", "best agency for Dubai", "core, commercial", ""),
    ("dubai specialist travel agents", "/about", "Dubai specialist travel agents", "core, commercial", ""),
    ("travel agency in dubai 24 hours", "/contact", "24-hour travel agency in Dubai", "core, commercial, local", ""),
    ("dubai escorted", "/dubai-tours/escorted-tours", "escorted Dubai tours", "commercial", "AMBIGUOUS: assumed escorted tours. Confirm with boss before targeting"),
    ("dubai tour package", "/dubai-holiday-packages", "Dubai tour packages", "packages, commercial", ""),
    ("dubai tour", "/dubai-tours", "Dubai tours", "packages, commercial", ""),
    ("dubai holiday package", "/dubai-holiday-packages", "Dubai holiday packages", "packages, commercial", ""),
    ("trip advisor dubai", "/blog/best-travel-agencies-in-dubai", "Dubai travel reviews", "informational", "Navigational keyword for tripadvisor.com, very low chance of ranking"),
    ("desert safari dubai", "/dubai-tours/desert-safari", "desert safari Dubai", "safari, commercial, money", ""),
    ("dubai safari", "/dubai-tours/desert-safari", "Dubai safari", "safari, commercial", ""),
    ("dubai tour", "/dubai-tours", "Dubai tours", "packages, commercial", "DUPLICATE of row 14"),
    ("dubai cruise", "/dubai-tours/cruises", "Dubai cruises", "cruise, commercial", ""),
    ("dhow cruise dubai", "/dubai-tours/dhow-cruise-dinner", "dhow cruise Dubai", "cruise, commercial, money", ""),
    ("dhow cruise dubai marina", "/dubai-tours/dhow-cruise-marina", "dhow cruise Dubai Marina", "cruise, commercial, money", ""),
    ("cruise from dubai", "/dubai-tours/cruises", "cruises from Dubai", "cruise, commercial", ""),
    ("cruise dinner dubai", "/dubai-tours/dhow-cruise-dinner", "Dubai dinner cruise", "cruise, commercial", ""),
    ("dhow cruise marina", "/dubai-tours/dhow-cruise-marina", "Marina dhow cruise", "cruise, commercial", ""),
    ("dubai marina cruise", "/dubai-tours/dhow-cruise-marina", "Dubai Marina cruise", "cruise, commercial", ""),
    ("dubai marina dinner cruise", "/dubai-tours/dhow-cruise-marina", "Marina dinner cruise", "cruise, commercial", ""),
    ("boat tour dubai", "/dubai-tours/yellow-boats", "Dubai boat tours", "cruise, commercial", ""),
    ("dubai yacht tour", "/dubai-tours/yacht-charter", "Dubai yacht tours", "cruise, commercial", ""),
    ("dubai yellow boats", "/dubai-tours/yellow-boats", "Yellow Boats Dubai", "cruise, commercial, brand", ""),
    ("dubai safari tour", "/dubai-tours/desert-safari", "Dubai safari tour", "safari, commercial", ""),
    ("holiday packages", "/dubai-holiday-packages", "holiday packages", "packages, commercial", "Very broad and global, win the Dubai-qualified variants first"),
    ("dubai tour attractions", "/dubai-tours/city-tour", "Dubai attraction tours", "tours, commercial", ""),
    ("dubai desert tour", "/dubai-tours/desert-safari", "Dubai desert tour", "safari, commercial", ""),
    ("top tourism companies in dubai", "/blog/best-travel-agencies-in-dubai", "top tourism companies in Dubai", "listicle, informational", ""),
    ("massage center.", "", "", "OFF-TOPIC", "Unrelated to a travel agency, recommend removing from the list"),
    ("massage center near to me", "", "", "OFF-TOPIC", "Unrelated to a travel agency, recommend removing from the list"),
    ("massagecenter near me", "", "", "OFF-TOPIC", "Unrelated to a travel agency, recommend removing from the list"),
    ("massage therapy center", "", "", "OFF-TOPIC", "Unrelated to a travel agency, recommend removing from the list"),
    ("malls in dubai", "/blog/malls-in-dubai", "malls in Dubai", "shopping, informational", ""),
    ("dubai safari park", "/blog/dubai-safari-park", "Dubai Safari Park", "attraction, informational", ""),
    ("things to do in dubai", "/blog/things-to-do-in-dubai", "things to do in Dubai", "attraction, informational, pillar", ""),
    ("dubai marina", "/blog/dubai-marina-guide", "Dubai Marina", "area, informational", ""),
    ("grand hyatt dubai", "/dubai-hotels/grand-hyatt-dubai", "Grand Hyatt Dubai", "hotel, commercial", ""),
    ("booking dubai", "/dubai-hotels", "Dubai hotel booking", "hotel, commercial", ""),
    ("nikki beach dubai", "/blog/beach-clubs-in-dubai", "Nikki Beach Dubai", "nightlife, brand", ""),
    ("anantara the palm dubai resort", "/dubai-hotels/anantara-the-palm", "Anantara The Palm", "hotel, commercial", ""),
    ("fairmont the palm", "/dubai-hotels/fairmont-the-palm", "Fairmont The Palm", "hotel, commercial", ""),
    ("places to visit in dubai", "/blog/places-to-visit-in-dubai", "places to visit in Dubai", "attraction, informational, pillar", ""),
    ("zero gravity dubai", "/blog/dubai-adventure-activities", "Zero Gravity Dubai", "activity, brand", ""),
    ("dubai water park", "/blog/dubai-water-parks", "Dubai water parks", "attraction, informational", ""),
    ("dubai hotel booking", "/dubai-hotels", "Dubai hotel booking", "hotel, commercial, money", ""),
    ("dubai skydiving", "/blog/dubai-adventure-activities", "skydiving in Dubai", "activity, informational", ""),
    ("museum of the future dubai", "/blog/museum-of-the-future-dubai", "Museum of the Future", "attraction, informational", ""),
    ("dubai outlet village", "/blog/malls-in-dubai", "Dubai Outlet Village", "shopping, informational", ""),
    ("bluewaters island", "/blog/bluewaters-island-dubai", "Bluewaters Island", "area, informational", ""),
    ("sky view dubai", "/blog/sky-views-dubai", "Sky Views Dubai", "attraction, informational", ""),
    ("deluxe experience", "/blog/luxury-dubai-experiences", "deluxe Dubai experiences", "luxury, informational", "Vague on its own, targeted as luxury Dubai experiences"),
    ("main attractions in dubai", "/blog/places-to-visit-in-dubai", "main attractions in Dubai", "attraction, informational", ""),
    ("dolphinarium dubai", "/blog/dubai-dolphinarium", "Dubai Dolphinarium", "attraction, informational", ""),
    ("dubai night club", "/blog/dubai-nightlife-guide", "Dubai night clubs", "nightlife, informational", "Keep the page brand-safe, see the AdSense note"),
    ("clubs near me", "/blog/dubai-nightlife-guide", "clubs near me in Dubai", "nightlife, informational", "Generic near-me query, only ranks on local intent"),
    ("night clubs near me", "/blog/dubai-nightlife-guide", "night clubs near me", "nightlife, informational", ""),
    ("dubai nightlife", "/blog/dubai-nightlife-guide", "Dubai nightlife", "nightlife, informational, pillar", ""),
    ("night clubs", "/blog/dubai-nightlife-guide", "night clubs", "nightlife, informational", "Too broad globally to be a realistic target"),
    ("nikki beach dubai", "/blog/beach-clubs-in-dubai", "Nikki Beach Dubai", "nightlife, brand", "DUPLICATE of row 46"),
    ("white dubai", "/blog/dubai-nightlife-guide", "White Dubai", "nightlife, brand", ""),
    ("beach club dubai", "/blog/beach-clubs-in-dubai", "Dubai beach clubs", "nightlife, informational", ""),
    ("night clubs in dubai", "/blog/dubai-nightlife-guide", "night clubs in Dubai", "nightlife, informational", ""),
    ("clubs in dubai", "/blog/dubai-nightlife-guide", "clubs in Dubai", "nightlife, informational", ""),
    ("travel agency in dubai deira", "/areas/deira", "travel agency in Deira", "local, commercial", ""),
    ("places to visit in dubai", "/blog/places-to-visit-in-dubai", "places to visit in Dubai", "attraction, informational", "DUPLICATE of row 49"),
    ("dubai tourist attractions", "/blog/places-to-visit-in-dubai", "Dubai tourist attractions", "attraction, informational", ""),
    ("famous places in dubai", "/blog/places-to-visit-in-dubai", "famous places in Dubai", "attraction, informational", ""),
    ("dubai underwater hotel", "/dubai-hotels/underwater-suites", "Dubai underwater hotel", "hotel, informational", ""),
    ("dubai united arab emirates", "/blog/dubai-uae-travel-guide", "Dubai, United Arab Emirates", "guide, informational", ""),
    ("malls in dubai", "/blog/malls-in-dubai", "malls in Dubai", "shopping, informational", "DUPLICATE of row 40"),
    ("tourist in dubai", "/blog/dubai-uae-travel-guide", "tourists in Dubai", "guide, informational", ""),
    ("best time to visit dubai", "/blog/best-time-to-visit-dubai", "best time to visit Dubai", "guide, informational, pillar", ""),
    ("dubai united arab emirates", "/blog/dubai-uae-travel-guide", "Dubai, UAE", "guide, informational", "DUPLICATE of row 76"),
]

HEADER = ["#", "Keyword", "URL", "Meta Title", "Meta Description", "Anchor Tag", "BB Tags", "Note"]


def build() -> list[list[object]]:
    rows: list[list[object]] = []
    for i, (kw, url, anchor, tags, note) in enumerate(ROWS, start=1):
        title, desc = PAGES.get(url, ("", ""))
        rows.append([i, kw, url, title, desc, anchor, tags, note])
    return rows


def main() -> None:
    out_dir = pathlib.Path(__file__).parent
    rows = build()

    with (out_dir / "keyword-map.csv").open("w", newline="", encoding="utf-8-sig") as f:
        w = csv.writer(f)
        w.writerow(HEADER)
        w.writerows(rows)

    long_titles = [r for r in rows if len(str(r[3])) > 60]
    long_descs = [r for r in rows if len(str(r[4])) > 155]
    missing = [r for r in rows if not r[2]]

    print(f"rows written:            {len(rows)}")
    print(f"unique target URLs:      {len({r[2] for r in rows if r[2]})}")
    print(f"titles over 60 chars:    {len(long_titles)}")
    for r in long_titles:
        print(f"   {len(str(r[3]))}  {r[3]}")
    print(f"descriptions over 155:   {len(long_descs)}")
    for r in long_descs:
        print(f"   {len(str(r[4]))}  {str(r[4])[:70]}...")
    print(f"keywords with no URL:    {len(missing)}  (off-topic, flagged for the client)")


if __name__ == "__main__":
    main()
