import { clientKeywords } from "@/lib/data/client-keywords";
import {
  attractionPath,
  attractions,
  categoryPath,
  planCategories,
} from "@/lib/data/attractions";
import { packagePath, packages } from "@/lib/data/packages";

/**
 * Maps the client's keyword list onto the pages that actually answer each term.
 *
 * The mapping is derived, not hand-maintained: every attraction, category and
 * package carries its own `keywords`, and this walks that data. Adding a
 * keyword to a page is therefore the only step — the report updates itself.
 *
 * What this deliberately does NOT do is put keywords into body copy. Text
 * written to contain a phrase reads like it, ranks worse than text written to
 * be useful, and is exactly what Google's helpful-content work targets. The
 * keywords decide which pages exist and what each one is about; the prose is
 * written for the person reading it.
 */

export type KeywordTarget = {
  keyword: string;
  /** The page that answers it, or null when nothing on the site does yet. */
  path: string | null;
  title: string | null;
  /** Why it is unmapped, when it is. */
  note?: string;
};

/**
 * Terms no page here should chase, with the reason.
 *
 * Two kinds. Navigational ones point at somebody else's brand — a page built to
 * rank for "riya travel dubai" competes with Riya's own site for their own name
 * and will lose, and it would be passing off besides. The rest are queries this
 * site is the wrong shape for.
 */
const EXCLUDED: Record<string, string> = {
  "trip advisor dubai": "Navigational — belongs to tripadvisor.com",
  "cozmo travels karama": "Competitor brand name",
  "riya travel dubai": "Competitor brand name",
  "tabeer travel agency dubai": "Competitor brand name",
  "sharaf travel dubai": "Competitor brand name",
  "travel agency hiring in dubai": "Jobs query — we are not a recruiter",
  "travel agencies in kenya to dubai": "Outbound agency in another country",
  "dubai escorted": "Ambiguous; assumed escorted tours, confirm before targeting",
  "grand hyatt dubai": "Hotel brand — belongs to the operator",
  "anantara the palm dubai resort": "Hotel brand",
  "fairmont the palm": "Hotel brand",
  "centara mirage beach resort dubai": "Hotel brand",
  "hilton dubai jumeirah": "Hotel brand",
  "sofitel dubai jumeirah beach": "Hotel brand",
  "hotel riu dubai": "Hotel brand",
  "radisson beach resort palm jumeirah": "Hotel brand",
  "roda amwaj suites jumeirah beach residence": "Hotel brand",
  "doubletree by hilton dubai jumeirah beach": "Hotel brand",
  "sofitel downtown dubai": "Hotel brand",
  "one and only royal mirage dubai": "Hotel brand",
  "westin dubai mina seyahi": "Hotel brand",
  "four seasons resort dubai at jumeirah beach": "Hotel brand",
  "doubletree hilton dubai": "Hotel brand",
  "dubai underwater hotel": "Single property, and it is not open",
  "ruspa ukrainian and european massage al barsha": "Single business — belongs in the directory",
  "lavana spa dubai": "Single business — belongs in the directory",
  "lavana spa al barsha": "Single business — belongs in the directory",
  "nikki beach spa dubai": "Single business — belongs in the directory",
  "cora spa massage center sheikh zayed road dubai": "Single business — belongs in the directory",
};

/**
 * Terms that map to a page which has no reason to carry a keyword list of its
 * own — the home page, the tours hub, the contact page and so on.
 */
const MANUAL: Record<string, string> = {
  "travel agency in dubai": "/",
  "best travel agency in dubai": "/",
  "best travel agency for dubai": "/",
  "good travel agency in dubai": "/",
  "best tour agency in dubai": "/",
  "best travel companies in dubai": "/",
  "top 10 travel agencies in dubai": "/",
  "top 10 travel agencies in dubai 2020": "/",
  "top 10 travel companies in dubai": "/",
  "top ten travel agency in dubai": "/",
  "tourism companies in dubai": "/",
  "top tourism companies in dubai": "/",
  "list of travel and tourism companies in dubai": "/services/tour-operators",
  "list of tourism companies in dubai": "/services/tour-operators",
  "travel and tours in dubai": "/dubai-tours",
  "dubai travel agents in dubai": "/",
  "travel agent for dubai trip": "/contact",
  "dubai specialist travel agents": "/",
  "travel agents for dubai packages": "/packages",
  "travel agency in dubai 24 hours": "/contact",
  "travel agency in dubai deira": "/contact",
  "deira travel and tourist agency": "/contact",
  "dubai tour": "/dubai-tours",
  "dubai tour package": "/packages",
  "dubai holiday package": "/packages",
  "holiday packages": "/packages",
  "dubai tour attractions": "/uae-attractions",
  "dubai safari tour": "/dubai-tours/desert-safari",
  "dubai desert tour": "/dubai-tours/desert-safari",
  "desert safari dubai": "/dubai-tours/desert-safari",
  "dubai safari": "/dubai-tours/desert-safari",
  "dubai cruise": "/dubai-tours/dhow-cruise-marina",
  "dhow cruise dubai": "/dubai-tours/dhow-cruise-marina",
  "dhow cruise dubai marina": "/dubai-tours/dhow-cruise-marina",
  "dhow cruise marina": "/dubai-tours/dhow-cruise-marina",
  "dubai marina cruise": "/dubai-tours/dhow-cruise-marina",
  "dubai marina dinner cruise": "/dubai-tours/dhow-cruise-marina",
  "cruise dinner dubai": "/dubai-tours/dhow-cruise-marina",
  "cruise from dubai": "/dubai-tours/dhow-cruise-marina",
  "boat tour dubai": "/dubai-tours/yacht-charter",
  "dubai yacht tour": "/dubai-tours/yacht-charter",
  "dubai yellow boats": "/dubai-tours/yacht-charter",
  "booking dubai": "/packages",
  "dubai hotel booking": "/services/hotels",
  "dubai united arab emirates": "/uae-attractions/dubai",
  "tourist in dubai": "/uae-attractions/dubai",
  "best time to visit dubai": "/blog/things-to-do-in-dubai",
  "things to do in dubai": "/blog/things-to-do-in-dubai",
  "to do in dubai": "/blog/things-to-do-in-dubai",
  "things to see and do in dubai": "/blog/things-to-do-in-dubai",
  "things to see in dubai": "/uae-attractions/dubai",
  "places to visit in dubai": "/uae-attractions/dubai",
  "dubai tourist places": "/uae-attractions/dubai",
  "places to go out in dubai": "/things-to-do/nightlife/dubai",
  "places to visit in dubai for free": "/uae-attractions/dubai",
  "things to do in dubai for free": "/uae-attractions/dubai",
  "places to go in dubai for free": "/uae-attractions/dubai",
  "deluxe experience": "/packages",
  "dubai skydiving": "/things-to-do/adventure/dubai",
  "dubai rigga": "/uae-attractions/dubai",
  "zero gravity dubai": "/uae-attractions/dubai/dubai-beach-clubs",
  "sky view dubai": "/things-to-do/landmarks/dubai",
  "bluewaters island": "/uae-attractions/dubai/dubai-marina-jbr",
  "dolphinarium dubai": "/things-to-do/wildlife/dubai",
  "dubai water park": "/things-to-do/waterparks/dubai",
  "dubai marina": "/uae-attractions/dubai/dubai-marina-jbr",
  "palm jumeirah island": "/uae-attractions/dubai/palm-jumeirah",
  "iceland water park ras al khaimah": "/uae-attractions/ras-al-khaimah/iceland-water-park",
  "yas waterworld": "/uae-attractions/abu-dhabi/yas-waterworld",
  "wadi adventure al ain": "/uae-attractions/abu-dhabi/wadi-adventure",
  "al ain zoo": "/uae-attractions/abu-dhabi/al-ain-zoo",
  "al ain oasis": "/uae-attractions/abu-dhabi/al-ain-oasis",
  "wadi wurayah fujairah": "/uae-attractions/fujairah/wadi-wurayah",
  "adventure park fujairah": "/things-to-do/adventure/fujairah",
  "snoopy island fujairah": "/uae-attractions/fujairah/snoopy-island",
  "places in fujairah": "/uae-attractions/fujairah",
  "camping in fujairah": "/things-to-do/camping/fujairah",
  "beach camping in fujairah": "/things-to-do/camping/fujairah",
  "fujairah beach camping": "/things-to-do/camping/fujairah",
  "fujairah camping beach": "/things-to-do/camping/fujairah",
  "fujairah camping site": "/things-to-do/camping/fujairah",
  "fujairah camping spot": "/things-to-do/camping/fujairah",
  "camping places in fujairah": "/things-to-do/camping/fujairah",
  "camping site in fujairah": "/things-to-do/camping/fujairah",
  "camping spots in fujairah": "/things-to-do/camping/fujairah",
  "best mandi in fujairah": "/things-to-do/dining/fujairah",
  "cafes in fujairah": "/things-to-do/dining/fujairah",
  "best beach fujairah": "/things-to-do/beaches/fujairah",
  "things to do in ras al khaimah": "/uae-attractions/ras-al-khaimah",
  "10 things to do in ras al khaimah": "/uae-attractions/ras-al-khaimah",
  "places to visit in ras al khaimah": "/uae-attractions/ras-al-khaimah",
  "ras al khaimah tourist places": "/uae-attractions/ras-al-khaimah",
  "ras al khaimah best place to visit": "/uae-attractions/ras-al-khaimah",
  "best attractions in ras al khaimah": "/uae-attractions/ras-al-khaimah",
  "nice place to visit in ras al khaimah": "/uae-attractions/ras-al-khaimah",
  "new attraction in ras al khaimah": "/uae-attractions/ras-al-khaimah",
  "best place to eat in ras al khaimah": "/things-to-do/dining/ras-al-khaimah",
  "places to eat in rak": "/things-to-do/dining/ras-al-khaimah",
  "things to do in al ain": "/uae-attractions/abu-dhabi",
  "al alain uae": "/uae-attractions/abu-dhabi",
  "alain in uae": "/uae-attractions/abu-dhabi",
  "al ain tourist places free": "/uae-attractions/abu-dhabi",
  "al ain camping site": "/things-to-do/camping/abu-dhabi",
  "al ain farm visit": "/uae-attractions/abu-dhabi/al-ain-oasis",
  "shopping mall in al ain": "/things-to-do/shopping/abu-dhabi",
  "bawadi mall al ain location": "/things-to-do/shopping/abu-dhabi",
  "abu dhabi top things to do": "/uae-attractions/abu-dhabi",
  "visiting places abu dhabi": "/uae-attractions/abu-dhabi",
  "top sights in abu dhabi": "/uae-attractions/abu-dhabi",
  "hidden gems in abu dhabi": "/uae-attractions/abu-dhabi",
  "places to visit in abu dhabi for free": "/uae-attractions/abu-dhabi",
  "abu dhabi at night": "/things-to-do/nightlife/abu-dhabi",
  "best bar in abu dhabi": "/things-to-do/nightlife/abu-dhabi",
  "jazz bar abu dhabi": "/things-to-do/nightlife/abu-dhabi",
  "mad yas island nightclub abu dhabi": "/things-to-do/nightlife/abu-dhabi",
  "abu dhabi cheap shopping": "/things-to-do/shopping/abu-dhabi",
  "cheapest market in abu dhabi": "/things-to-do/souks/abu-dhabi",
  "beach in abu dhabi free": "/things-to-do/beaches/abu-dhabi",
  "hameem beach abu dhabi": "/things-to-do/beaches/abu-dhabi",
  "yas beach abu dhabi": "/things-to-do/beaches/abu-dhabi",
  "abu dhabi view point": "/things-to-do/landmarks/abu-dhabi",
  "abu dhabi camping": "/uae-attractions/abu-dhabi/abu-dhabi-desert-camping",
  "abu dhabi camping site": "/uae-attractions/abu-dhabi/abu-dhabi-desert-camping",
  "camping spot in abu dhabi": "/uae-attractions/abu-dhabi/abu-dhabi-desert-camping",
  "places to visit in sharjah for free": "/uae-attractions/sharjah",
  "places to visit in sharjah for free with family": "/things-to-do/family/sharjah",
  "best restaurant in sharjah": "/things-to-do/dining/sharjah",
  "cafe in sharjah": "/things-to-do/dining/sharjah",
  "best breakfast in sharjah": "/things-to-do/dining/sharjah",
  "best beach in sharjah": "/things-to-do/beaches/sharjah",
  "sharjah shopping mall": "/things-to-do/shopping/sharjah",
  "al noor island bridge": "/uae-attractions/sharjah/al-noor-island",
  "ajman shopping mall": "/things-to-do/shopping/ajman",
  "fun city safeer mall ajman": "/things-to-do/kids/ajman",
  "malls in dubai": "/uae-attractions/dubai/the-dubai-mall",
  "dubai mall": "/uae-attractions/dubai/the-dubai-mall",
  "spice souk dubai": "/uae-attractions/dubai/al-fahidi-historic-district",
  "gold souk deira": "/uae-attractions/dubai/al-fahidi-historic-district",
  "hatta mountain bike trails": "/uae-attractions/dubai/hatta",
  "concerts in dubai": "/uae-attractions/dubai/coca-cola-arena",
  "coca cola arena dubai": "/uae-attractions/dubai/coca-cola-arena",
  "dubai opera": "/uae-attractions/dubai/coca-cola-arena",
  "etihad arena yas island": "/uae-attractions/dubai/coca-cola-arena",
  "global village stage shows": "/uae-attractions/dubai/global-village",
  "kids play area dubai": "/things-to-do/kids/dubai",
  "family picnic spots in uae": "/things-to-do/family",
  "soho garden dubai": "/uae-attractions/dubai/dubai-night-clubs",
  "ajman corniche": "/uae-attractions/ajman/ajman-corniche",
  "sharjah aquarium": "/uae-attractions/sharjah/sharjah-aquarium",
};

/** keyword -> page, built from the `keywords` arrays on the content itself. */
function derivedIndex(): Map<string, { path: string; title: string }> {
  const index = new Map<string, { path: string; title: string }>();

  const add = (keyword: string, path: string, title: string) => {
    const key = keyword.trim().toLowerCase();
    if (key && !index.has(key)) index.set(key, { path, title });
  };

  for (const attraction of attractions) {
    for (const keyword of attraction.keywords ?? []) {
      add(keyword, attractionPath(attraction), attraction.metaTitle);
    }
  }
  for (const category of planCategories) {
    for (const keyword of category.keywords) {
      add(keyword, categoryPath(category.id), `${category.label} in the UAE`);
    }
  }
  for (const pkg of packages) {
    add(pkg.title, packagePath(pkg), pkg.metaTitle);
  }

  return index;
}

export function keywordTargets(): KeywordTarget[] {
  const derived = derivedIndex();

  return clientKeywords.map((keyword) => {
    if (EXCLUDED[keyword]) {
      return { keyword, path: null, title: null, note: EXCLUDED[keyword] };
    }

    const manual = MANUAL[keyword];
    if (manual) return { keyword, path: manual, title: null };

    const hit = derived.get(keyword);
    if (hit) return { keyword, path: hit.path, title: hit.title };

    return { keyword, path: null, title: null, note: "No page targets this yet" };
  });
}

export function keywordCoverage() {
  const targets = keywordTargets();
  const covered = targets.filter((t) => t.path !== null);
  const excluded = targets.filter((t) => t.path === null && t.note !== "No page targets this yet");
  const gaps = targets.filter((t) => t.note === "No page targets this yet");

  return {
    targets,
    total: targets.length,
    covered: covered.length,
    excluded: excluded.length,
    gaps,
    /** Share of the keywords we are actually trying to rank for. */
    percent: Math.round((covered.length / (targets.length - excluded.length)) * 100),
  };
}
