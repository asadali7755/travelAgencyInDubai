# Image sourcing manifest

Where every attraction image comes from, and which ones still need a licensed
photograph. Read this before adding any image to `public/images/`.

## The rule

**Nothing goes in this folder without a licence we can point to.** "It was on a
search results page" is not a licence, and neither is "we credited them". A stock
agency's demand letter for one unlicensed hero image will cost more than a year of
hosting.

Acceptable sources, in order of preference:

1. **Photographs the agency took itself.** Free, unambiguous, and they show the
   actual product. Best option by a distance.
2. **Licensed stock** (Adobe Stock, Getty, Shutterstock) with the invoice filed.
   Note that editorial-use-only licences do *not* cover a commercial tour page.
3. **Unsplash / Pexels / Wikimedia Commons**, with the photographer, the licence
   and the source URL recorded in the table below. Check each file individually —
   Wikimedia in particular mixes CC0, CC BY-SA and non-free files on the same page,
   and CC BY-SA obliges you to attribute visibly.

Never acceptable: a building's own press images (usually press-use only), a
competitor's site, a Google Images result, or anything a generative model produced
from a prompt naming a real photographer.

## Attractions with a photograph

These already render a photo from this folder. The licence column is **the thing
that needs filling in** — these files were in the repository before this manifest
existed and their provenance has not been recorded anywhere.

| Attraction | Emirate | File | Licence / source |
| --- | --- | --- | --- |
| Burj Khalifa | dubai | `/images/burj-downtown.jpg` | **TODO — confirm** |
| Palm Jumeirah | dubai | `/images/palm-aerial.jpg` | **TODO — confirm** |
| The Dubai Fountain | dubai | `/images/city-night.jpg` | **TODO — confirm** |
| Dubai Marina & JBR | dubai | `/images/marina-towers.jpg` | **TODO — confirm** |
| Al Fahidi Historic District & the Creek souks | dubai | `/images/abra-fahidi.jpg` | **TODO — confirm** |
| Dubai Miracle Garden | dubai | `/images/miracle-garden.jpg` | **TODO — confirm** |
| Hatta | dubai | `/images/hatta-oasis.jpg` | **TODO — confirm** |
| Sheikh Zayed Grand Mosque | abu-dhabi | `/images/grand-mosque.jpg` | **TODO — confirm** |

## Attractions still drawn as posters

These render original SVG artwork from `components/attractions/AttractionPoster.tsx`
— geometry we wrote, so there is nothing to clear. They look deliberate rather than
broken, and the site is shippable as it stands.

To swap one for a real photograph:

1. Drop the file in `public/images/attractions/<slug>.jpg` (1600×1067 or larger,
   landscape, under ~400 KB after compression).
2. Add `image` and `alt` to that attraction's entry in `lib/data/attractions/`.
3. Record the licence in the table above.

No other change is needed — `AttractionMedia` switches from the poster to the photo
automatically.

`alt` should describe what is in the frame for someone who cannot see it, not repeat
the attraction name. "The white marble domes and minarets of the Sheikh Zayed Grand
Mosque" — not "Sheikh Zayed Grand Mosque photo".

| Attraction | Emirate | Wanted shot | Current poster motif |
| --- | --- | --- | --- |
| Museum of the Future | dubai | The torus facade with the Arabic calligraphy windows, from street level | `gallery` |
| Dubai Frame | dubai | The gilded rectangle head-on, ideally with Zabeel Park in the foreground | `arch` |
| Atlantis Aquaventure | dubai | A slide tower or the Leap of Faith drop, with people in frame | `wave` |
| Global Village | dubai | A lit pavilion row at night with a crowd | `garden` |
| Louvre Abu Dhabi | abu-dhabi | The dome from the water terrace, with the light falling through it | `gallery` |
| Qasr Al Watan | abu-dhabi | The Great Hall interior under the dome | `dome` |
| Ferrari World Abu Dhabi | abu-dhabi | The red roof from outside, or Formula Rossa mid-launch | `speed` |
| Al Noor Island | sharjah | An installation lit after dark, or the Butterfly House interior | `garden` |
| Sharjah Museum of Islamic Civilization | sharjah | The golden dome interior with the painted zodiac | `dome` |
| Mleiha Archaeological Centre | sharjah | The centre building in the desert, or Fossil Rock at sunset | `dune` |
| Ajman Museum | ajman | The fort's round watchtowers and coral-block walls | `arch` |
| Jebel Jais | ras-al-khaimah | The switchback road from a viewing deck, or the zipline launch platform | `mountain` |
| Al Bidyah Mosque | fujairah | The four domes from the hill behind, with the sea beyond | `dome` |
| Snoopy Island, Al Aqah | fujairah | The rock from the beach, or reef and fish underwater | `wave` |
| Dreamland Aqua Park | umm-al-quwain | A wide shot showing the scale of the site | `wave` |

## Package images

The outbound packages (Baku, Tbilisi, Istanbul, Phuket) currently reuse UAE
photographs with honest, generic alt text — "a city skyline lit after dark" rather
than a claim that it is Baku. That is not dishonest, but it is not good either, and
those four are the highest-value images to replace: a destination page selling a
AED 2,450 holiday should show the destination.

