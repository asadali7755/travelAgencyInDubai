import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The body of the "things to do in Dubai" guide.
 *
 * Every fact here was checked rather than remembered: fountain show times,
 * the one-dirham abra fare, Nol fares and the daily cap, Metro hours, the
 * Burj Khalifa deck heights, and which desert is which. Where something moves
 * around — Ramadan, ticket prices — the guide says so instead of pinning a
 * number that will be wrong in six months.
 */

const h2 = "mt-14 text-[clamp(1.6rem,3.2vw,2.2rem)] font-extrabold tracking-tight scroll-mt-28";
const p = "mt-4 max-w-[68ch] text-[17px] leading-[1.75] text-ink/80";
const h3 = "mt-8 text-[19px] font-bold";

export function ThingsToDoBody() {
  return (
    <div className="max-w-[72ch]">
      <Reveal as="p" className="text-[20px] leading-[1.7] text-ink/85">
        Dubai has a reputation for being expensive, and it can be. But a good half of what makes
        the city worth the flight costs nothing, and several of the famous paid attractions are
        worth exactly one photograph. This is the list we actually send people when they ask,
        grouped by what it costs rather than by neighbourhood.
      </Reveal>

      <Reveal>
        <h2 id="free" className={h2}>
          Free things worth doing
        </h2>
        <p className={p}>
          <strong>1. The Dubai Fountain.</strong> Shows run every half hour from 18:00 until
          23:00 — eleven of them a night — with quieter, music-free shows in the early afternoon.
          Stand on the Souk Al Bahar bridge rather than the mall terrace: the same view, a
          fraction of the crowd.
        </p>
        <p className={p}>
          <strong>2. Cross the Creek on an abra.</strong> One dirham per person, cash to the
          driver, on the wooden boats between Deira and Bur Dubai. It is the best five minutes in
          the city and has barely changed in fifty years.
        </p>
        <p className={p}>
          <strong>3. Al Fahidi historical district.</strong> Wind-tower houses, courtyard cafés
          and small museums in the old quarter, walkable in an hour and free to wander.
        </p>
        <p className={p}>
          <strong>4. Kite Beach and La Mer.</strong> Public beaches with showers, changing rooms
          and cafés. Kite Beach has the Burj Al Arab in the background and a running track behind
          it.
        </p>
        <p className={p}>
          <strong>5. Alserkal Avenue.</strong> A converted warehouse district in Al Quoz where
          the contemporary galleries are free to enter, Tuesday to Saturday. Almost no tourists.
        </p>
        <p className={p}>
          <strong>6. The spice and gold souks.</strong> Free to walk, and gold is sold by weight
          against the daily rate — the making charge is the negotiable part.
        </p>
      </Reveal>

      <Reveal>
        <h2 id="paid" className={h2}>
          The paid attractions, ranked honestly
        </h2>
        <p className={p}>
          <strong>Burj Khalifa, At the Top.</strong> Levels 124 and 125 sit around 456 metres up,
          with an open-air terrace on 125. The Sky ticket adds level 148 at 555 metres, the
          highest observatory in the world, where you get a timed slot and Arabic coffee. Sunset
          slots cost more and sell out first; the slot an hour after sunset gives you the city
          fully lit for less.
        </p>
        <p className={p}>
          <strong>Museum of the Future.</strong> The building alone justifies the ticket, and the
          upper floors are genuinely well made. Book ahead — it sells out days in advance in
          season.
        </p>
        <p className={p}>
          <strong>The water parks.</strong> Aquaventure at Atlantis and Wild Wadi are both good,
          and both are full-day commitments. Go on a weekday if you can.
        </p>
        <h3 className={h3}>What we would skip</h3>
        <p className={p}>
          Several of the newer observation decks sell the same skyline for a similar price to the
          Burj Khalifa. Pick one and spend the rest of the afternoon on the water instead. The
          same goes for the indoor snow and ice attractions in summer — fun for an hour, and an
          hour is all you will want.
        </p>
      </Reveal>

      <Reveal>
        <h2 id="desert" className={h2}>
          The desert, and which one you actually want
        </h2>
        <p className={p}>
          Not all desert trips are the same, and the difference matters more than the price. The
          red dunes at <strong>Lahbab</strong>, about forty-five minutes out, are where the
          high-speed dune bashing happens — the sand really is red, from iron oxide, and the
          dunes are steep enough for the drive to be the point.
        </p>
        <p className={p}>
          <strong>Al Marmoom</strong>, around 40km from Downtown, is a protected conservation
          reserve. Motorised dune bashing is heavily restricted there, and it is used instead for
          calmer trips: camel trekking, falconry, desert lakes and a decent chance of seeing
          Arabian oryx. If you have small children or a nervous passenger, this is the better
          half of the desert.
        </p>
        <p className={p}>
          Either way, evenings in the desert between November and March are much cooler than the
          city. Bring a light jacket — people are consistently surprised by this.
        </p>
      </Reveal>

      <Reveal>
        <div className="mt-10 rounded-[var(--radius-card)] border border-card-border border-l-4 border-l-sun bg-sun-tint/50 p-6">
          <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-sun-dark">
            Booked through us
          </p>
          <h3 className="mt-2 text-[22px] font-extrabold tracking-tight">
            Evening desert safari, hotel pick-up included
          </h3>
          <p className="mt-2 max-w-[56ch] text-[16px] leading-relaxed text-ink/75">
            The one paid activity almost every first-timer is glad they did. Dune bashing at
            Lahbab, camel rides, a BBQ camp and the shows, with a driver who collects you from
            your hotel.
          </p>
          <Link
            href="/dubai-tours/desert-safari"
            className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold no-underline"
          >
            See the tour →
          </Link>
        </div>
      </Reveal>

      <Reveal>
        <h2 id="food" className={h2}>
          Food and drink
        </h2>
        <p className={p}>
          This is where Dubai quietly beats its own marketing. You can eat extremely well for
          twenty dirhams and extremely well for two thousand, and the gap between them is smaller
          than you would expect.
        </p>
        <p className={p}>
          For the cheap end, go to <strong>Al Karama</strong> or <strong>Deira</strong>: karak
          tea, parathas, shawarma and South Indian food, mostly under AED 30 a head. For the
          expensive end, the rooftops in the Marina and Downtown are worth booking a week ahead
          in season.
        </p>
        <p className={p}>
          <strong>Friday brunch</strong> is the local institution — a set price, several hours,
          and a far wider spread than the word suggests anywhere else. It is the one meal to
          plan around.
        </p>
      </Reveal>

      <Reveal>
        <h2 id="getting-around" className={h2}>
          Getting around
        </h2>
        <p className={p}>
          The Metro is clean, cheap and air-conditioned, and it reaches most of what visitors
          want. It runs from 05:00 to midnight Monday to Thursday and Saturday, until 01:00 on
          Friday, and starts later — 08:00 — on Sunday.
        </p>
        <p className={p}>
          Buy a <strong>Nol Silver card</strong> at any station. Fares run from about AED 5 for
          two zones to AED 7.50 for longer trips, and there is a daily cap of AED 14 — once you
          hit it, everything else that day is free. Taxis are metered and reasonable by European
          standards, and the ride-hailing apps work normally.
        </p>
      </Reveal>

      <Reveal>
        <h2 id="when" className={h2}>
          When to come
        </h2>
        <p className={p}>
          <strong>November to March</strong> is the season: daytime around 22–26°C, low humidity,
          evenings cool enough for a jacket. It is also when prices peak and the good slots sell
          out. <strong>April, May and October</strong> are the value months — warm but bearable,
          and noticeably cheaper.
        </p>
        <p className={p}>
          <strong>June to September</strong> is genuinely hard outdoors: 40–45°C with high
          humidity. Hotel rates collapse, the malls and indoor attractions are excellent, and the
          desert is only comfortable after dark. Come in summer for the prices, not the beaches.
        </p>
        <p className={p}>
          <strong>Ramadan</strong> moves earlier by about eleven days each year, so check the
          dates for your trip. Eating, drinking and smoking in public during daylight is avoided,
          some restaurants close in the day and hours shorten — but the evenings, with iftar
          buffets and night markets, are one of the best times to be here.
        </p>
      </Reveal>
    </div>
  );
}
