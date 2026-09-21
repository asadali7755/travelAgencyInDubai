# Travel Agency in Dubai

A UAE travel and services platform: attractions across all seven emirates, priced tour
packages, outbound holidays for residents, and a moderated directory of licensed UAE
businesses — with an account area, an agency portal and an admin panel behind it.

Next.js (App Router) · TypeScript · Supabase (Postgres, Auth, Storage, RLS) · Tailwind CSS
· Zod.

## Getting started

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build
pnpm lint
```

The public site runs without Supabase — attractions, packages and tours are typed data in
`lib/data/`. The directory, accounts, agency portal and admin panel need a database.

### Environment

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=        # server only — never prefix this NEXT_PUBLIC_
NEXT_PUBLIC_SITE_URL=             # used for canonicals and the same-origin check
NEXT_PUBLIC_ALLOW_INDEXING=       # "true" only on the real domain, at launch
NEXT_PUBLIC_WHATSAPP_NUMBER=
UPSTASH_REDIS_REST_URL=           # optional; rate limiting fails open without it
UPSTASH_REDIS_REST_TOKEN=
```

### Database

```bash
supabase migration new <name>
supabase db push
```

Migrations are forward-only and additive. `supabase db reset` is destructive and is not run
by an agent — see `CLAUDE.md`.

## What is where

```
app/
  (marketing)/            public pages
    uae-attractions/[emirate]/[slug]     72 places, 7 emirates
    things-to-do/[category]/[emirate]    16 intents x 7 emirates
    packages/[slug]
    services/[category]/[slug]
    list-your-business/
  (auth)/                 login, signup
  (dashboard)/            account area + agency portal
  (admin)/                superadmin only
  api/                    route handlers
  llms.txt/               plain-text site map for answer engines
components/
  attractions/ packages/ services/ agency/ dashboard/ admin/ map/ ui/ sections/
lib/
  data/attractions/       72 places across 7 emirates, 16 plan categories
  data/packages/          10 packages with pricing tiers
  data/client-keywords.ts the client's 231 search terms
  validation/             Zod schemas — the single source of types
  auth/ api/ geo/ services/ supabase/
  seo.ts seo-schema.ts seo-sitemap.ts seo-keywords.ts
supabase/migrations/      0001-0008
```

## The "what are you planning?" flow

Two ways into the same content, because visitors arrive knowing either the place or
the kind of day they want:

- `/uae-attractions` — clickable emirate map, then the category grid for that emirate
- `/things-to-do` — category grid first, then narrow to an emirate

Both land on `/things-to-do/<category>/<emirate>`, which can reorder itself by whatever
is nearest to the visitor. Location is requested on a tap, never on load, and the
coordinate never leaves the browser — the haversine sort in `lib/geo/distance.ts` runs
client side.

Only emirate/category pairs that actually have content are built; see
`populatedPlanPairs()`. 112 combinations exist on paper, 76 have something in them.

## Two things to know before changing anything

**Prices are researched market rates, not our rates.** Everything in
`lib/data/attractions/` and `lib/data/packages/` is a published figure checked in September
2026, and every page that renders one says so through
`components/packages/PriceNote.tsx`. The same numbers feed the `Offer` structured data, so
a wrong figure is wrong in search results too. See
`reports/package-rates-for-approval.md` for the sign-off sheet.

**Images need a licence we can point to.** Attractions without a photograph render original
SVG artwork from `components/attractions/AttractionPoster.tsx` rather than something
borrowed. `public/images/SOURCING.md` lists which attractions still want a real photo and
how to drop one in.

## Security model, briefly

Row Level Security is the boundary, and every page and route handler checks again on top of
it. The service-role key lives in `lib/supabase/admin.ts` and is imported by server code
only. Guest and company submissions are `pending` until a superadmin approves them, and
rejections are kept rather than deleted — they are the record of why a decision was made.

Full conventions are in `CLAUDE.md` and `.claude/skills/uae-travel-platform/SKILL.md`.
