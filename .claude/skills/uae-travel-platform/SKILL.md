---
name: uae-travel-platform
description: Architecture, folder layout, coding conventions and non-negotiable rules for the TravelAgencyInDubai platform — a Next.js + Supabase directory and booking site for UAE travel, outbound tours, and UAE service listings (law firms, clinics, spas, visa agents, etc.). Use this skill whenever the user asks for anything touching this project — new pages, API routes, components, database tables, the blog, services, FAQs, packages, the mobile app, the points system, or the AI chat agent — even if they only describe the feature and never name the project. Read this first, then follow its pointers to the focused sub-skills.
---

# TravelAgencyInDubai — Platform Conventions

This is the entry point. Read it, then open only the sub-skill(s) the task needs. Do not
load all of them; each one is self-contained.

## What this product is

A UAE-centred travel and services marketplace with three audiences:

1. **Inbound** — people visiting the UAE who need tours, visas, hotels, transport.
2. **Resident** — people already in the UAE who need local services (law firms, clinics,
   spas, movers, PROs, car rental) listed as directory entries with enquiry forms.
3. **Outbound** — UAE residents booking tourism to Pakistan, Georgia, Turkey, Azerbaijan,
   Thailand and elsewhere.

Every content type therefore has a **category** and a **country/emirate** dimension. Design
schemas and URLs around that from day one — retrofitting it is expensive.

## Sub-skills — read the one that matches the task

| Task | Skill to read |
|---|---|
| API route handlers, validation, rate limits, auth checks, XSS/SQLi defence | `nextjs-api-security` |
| Tables, indexes, RLS policies, migrations, query performance | `supabase-schema-design` |
| Components, layout, animation, loader, toasts, forms, mobile UX | `mobile-first-ui` |
| Metadata, sitemaps, JSON-LD, blog/services/FAQ SEO, AdSense readiness | `seo-and-adsense` |
| Login, roles, points, daily tasks, games, discount redemption, admin panel | `auth-points-rewards` |
| Guest-submitted blogs/FAQs, NSFW image + text screening, approval queue | `content-moderation` |
| The chat assistant, free LLM providers, prompt-injection defence | `ai-chat-agent` |
| React Native / Expo app sharing the same API | `expo-mobile-app` |

## Stack

- **Next.js (App Router)** with TypeScript, React Server Components by default.
- **Supabase** — Postgres, Auth, Storage, Row Level Security.
- **Tailwind CSS** for styling, **Framer Motion** for animation.
- **Zod** for every input and output boundary.
- **TanStack Query** on the client for anything that mutates and must re-render.
- **Expo (React Native)** for the mobile app, consuming the same route handlers.

Pick boring, well-documented versions. Do not introduce a new dependency when 20 lines of
local code will do — every dependency is a supply-chain and bundle-size cost.

## Hard rules

These are the ones that get violated first under deadline pressure, so they are stated flatly.

1. **No file over 300 lines.** If a file is growing past ~250, split it. A page component
   that renders six sections should be six files plus a thin composition file. This is the
   single most useful constraint in the codebase — it forces the reusable components the
   project needs.
2. **Never build SQL by string concatenation.** Use the Supabase client's query builder or
   parameterised RPC. A template literal with a user value inside it is a bug even if it
   happens to work today.
3. **Never render user HTML with `dangerouslySetInnerHTML`** unless it has passed through
   the sanitiser in `lib/sanitize.ts`. Guest blog content is untrusted by definition.
4. **Never use the Supabase service-role key in client code or in any file under `app/`
   that is not a route handler.** It bypasses RLS entirely. It lives in
   `lib/supabase/admin.ts` and that file is imported only by server code.
5. **Every API route validates input with Zod and shapes output with an explicit
   serialiser.** Returning a raw database row leaks columns (emails, internal flags,
   moderation notes) that the frontend never asked for.
6. **Every mutation invalidates its query key** so lists re-render after create/update/
   delete without a manual refresh.
7. **Guest content is `pending` until a superadmin approves it.** There is no path where
   unmoderated content becomes publicly visible.
8. **Never delete data without asking.** Dropping a table, column or type, truncating,
   deleting rows, or running `supabase db reset` all require explicit human approval
   requested in the current conversation. Prefer soft deletes and status changes. Full
   detail in `supabase-schema-design`.

## Folder layout

```
app/
  (marketing)/            # public pages, statically rendered where possible
    page.tsx
    packages/[slug]/page.tsx
    services/[category]/[slug]/page.tsx
    blog/[slug]/page.tsx
    faq/page.tsx
  (dashboard)/            # authenticated user area
    dashboard/page.tsx
    dashboard/rewards/page.tsx
  (admin)/                # superadmin only, guarded in layout + RLS + middleware
    admin/page.tsx
  api/
    packages/route.ts
    packages/[id]/route.ts
    blog/route.ts
    faq/route.ts
    leads/route.ts
    chat/route.ts
    tasks/complete/route.ts
components/
  ui/                     # primitives: Button, Input, Modal, Skeleton, Toast
  sections/               # Hero, PackageGrid, TestimonialSlider
  forms/                  # LeadForm, BlogSubmitForm, FaqAskForm
lib/
  supabase/{client,server,admin}.ts
  validation/             # Zod schemas, shared with the mobile app
  api/                    # fetch wrappers + TanStack Query hooks
  sanitize.ts
  rate-limit.ts
  seo.ts
supabase/migrations/      # numbered SQL migrations, checked into git
mobile/                   # Expo app
```

## Naming and style

- Files: `kebab-case.ts`. React components: `PascalCase` export, file named after it.
- Database: `snake_case` tables and columns, plural table names (`packages`, `blog_posts`).
- Zod schemas live in `lib/validation/<entity>.ts` and are the single source of truth for
  types — derive TypeScript types with `z.infer`, never hand-write a parallel interface.
- Server Components fetch data directly. Client Components (`"use client"`) are used only
  where interaction demands it, and they call route handlers, never Supabase-with-secrets.

## Environment variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=      # server only, never NEXT_PUBLIC_
GROQ_API_KEY=                   # or OPENROUTER_API_KEY, see ai-chat-agent
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
NEXT_PUBLIC_SITE_URL=
```

Anything prefixed `NEXT_PUBLIC_` is shipped to the browser and is effectively public. If a
key would be dangerous in a stranger's hands, it must not carry that prefix.

## Two things worth flagging honestly

**Bounce rate should go down, not up.** The brief asks to "increase impressions and bounce
rate" — high bounce rate means visitors leave after one page, which hurts both leads and ad
revenue. Optimise for lower bounce and more pages per session: internal links, related
packages, related posts, a sticky enquiry bar.

**Points and AdSense are a dangerous combination.** Google's policies prohibit incentivised
ad interaction. Rewarding users for time on site or page views, and placing ads inside the
games or rewards flow, is a plausible route to having the account disabled. Keep ads out of
`(dashboard)` entirely and never award points for anything an ad impression depends on.
Details in `seo-and-adsense`.

## Definition of done for any feature

- Input validated with Zod on the server, not only in the browser.
- Output shaped by an explicit serialiser.
- Authorisation enforced by RLS *and* checked in the handler.
- Loading and error states rendered (skeleton, not spinner, for content).
- Works at 360px width with 44px minimum tap targets.
- Mutation invalidates the relevant query key.
- No file over 300 lines.
