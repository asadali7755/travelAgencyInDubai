---
name: mobile-first-ui
description: Component architecture, mobile-first layout, animation, global loader, toasts, forms and optimistic data flow for the TravelAgencyInDubai web app. Use this whenever building or reviewing any React component, page layout, form, modal, list, card, navigation, skeleton, animation, or when the user mentions mobile UX, reusable components, auto re-render after create/update/delete, loaders, toasters, or making the site feel fast and attractive.
---

# UI and interaction

Most of this audience is on a mid-range Android phone on mobile data. Design for that
device first; the desktop layout is the easy case that falls out afterwards.

## Component layers

Three layers, and a component belongs to exactly one:

- `components/ui/` — primitives with no business knowledge: `Button`, `Input`, `Select`,
  `Modal`, `Sheet`, `Skeleton`, `Badge`, `Rating`. They take props, render, and nothing else.
- `components/sections/` — composed blocks that know the domain: `PackageCard`, `Hero`,
  `ServiceGrid`, `FaqAccordion`, `BlogList`.
- `app/**/page.tsx` — thin. A page fetches data and arranges sections. If a page file is
  approaching 150 lines it is doing work that belongs in a section.

This layering is what keeps files under 300 lines without effort.

## Server first, client only where needed

Default to Server Components. Add `"use client"` only for state, effects, or event
handlers. A `PackageCard` with no interaction is a Server Component; the "Save to
wishlist" heart inside it is a small Client Component. Splitting at that boundary keeps
JavaScript off the phone.

## Mobile rules

- **360px is the design width.** Test there before anything wider.
- **44×44px minimum tap targets**, with at least 8px between adjacent ones.
- **Thumb zone**: put primary actions (Enquire, Book, Call, WhatsApp) at the bottom of the
  screen, not the top. A sticky bottom bar on package and service pages is the single
  highest-converting element on this kind of site.
- **16px minimum font size on inputs** — anything smaller makes iOS Safari zoom on focus.
- **Never a horizontal scrollbar.** Long content wraps; carousels scroll deliberately with
  `overflow-x-auto snap-x snap-mandatory` and visible edge peeking so it reads as swipeable.
- **`inputMode` and `autoComplete` on every field**: `inputMode="tel"`, `type="email"`,
  `autoComplete="tel"`. It costs one attribute and saves several taps.
- **Bottom sheets instead of centre modals** on mobile — reachable, and matches the OS.
- **Respect `prefers-reduced-motion`** and disable non-essential animation when set.

## Global providers

One place, wrapping the app:

```tsx
// app/providers.tsx
"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(() => new QueryClient({
    defaultOptions: { queries: { staleTime: 60_000, retry: 1, refetchOnWindowFocus: false } },
  }));
  return (
    <QueryClientProvider client={client}>
      {children}
      <Toaster position="top-center" richColors closeButton duration={4000} />
    </QueryClientProvider>
  );
}
```

`position="top-center"` because bottom-anchored toasts collide with the sticky enquiry bar
and the phone's home indicator.

## Loading states

Use **route-level `loading.tsx` with skeletons**, not a full-screen spinner. A skeleton that
matches the final layout makes the page feel roughly twice as fast and prevents layout
shift, which also protects the Core Web Vitals score.

```tsx
// app/packages/loading.tsx
import { PackageCardSkeleton } from "@/components/sections/package-card-skeleton";

export default function Loading() {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }, (_, i) => <PackageCardSkeleton key={i} />)}
    </div>
  );
}
```

Reserve a *thin top progress bar* for client-side navigations and mutations — that is the
"global loader". A modal overlay that blocks the whole screen on every fetch feels slower
than doing nothing.

```tsx
// components/ui/global-progress.tsx  — mount once in the root layout
"use client";
import { useIsFetching, useIsMutating } from "@tanstack/react-query";

export function GlobalProgress() {
  const busy = useIsFetching() + useIsMutating() > 0;
  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-0.5">
      <div className={`h-full bg-amber-500 transition-[width,opacity] duration-500
        ${busy ? "w-4/5 opacity-100" : "w-full opacity-0"}`} />
    </div>
  );
}
```

## Auto re-render after mutations

Every create/update/delete goes through a TanStack Query mutation that invalidates its
list key. This is what makes lists refresh with no manual reload.

```ts
// lib/api/use-faqs.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api/client";

const key = (filters: object = {}) => ["faqs", filters] as const;

export const useFaqs = (filters = {}) =>
  useQuery({ queryKey: key(filters), queryFn: () => api.get("/api/faq", filters) });

export function useCreateFaq() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: FaqCreate) => api.post("/api/faq", input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["faqs"] });
      toast.success("Thanks — your question is with our team for review.");
    },
    onError: (e: ApiError) => toast.error(e.message),
  });
}
```

For deletes and toggles (helpful votes, wishlist) use an **optimistic update** — update the
cache immediately, roll back in `onError`. On a slow connection the difference between
instant and 800ms is the difference between an app that feels native and one that doesn't.

```ts
onMutate: async (id) => {
  await qc.cancelQueries({ queryKey: ["faqs"] });
  const prev = qc.getQueryData(["faqs"]);
  qc.setQueryData(["faqs"], (old: Faq[] = []) => old.filter(f => f.id !== id));
  return { prev };
},
onError: (_e, _id, ctx) => { qc.setQueryData(["faqs"], ctx?.prev); toast.error("Couldn't delete."); },
onSettled: () => qc.invalidateQueries({ queryKey: ["faqs"] }),
```

If a page is server-rendered rather than query-driven, call `router.refresh()` after the
mutation resolves, which re-runs the server fetch without a full page load.

## Forms

`react-hook-form` + the same Zod schema the API uses, via `zodResolver`. One schema means
the browser and the server can never disagree about what is valid.

Rules that matter for completion rate:
- Validate on blur, not on every keystroke — live red text while typing feels hostile.
- Show errors under the field, tie them with `aria-describedby`, and scroll to the first
  error on submit.
- Disable the submit button while pending and change its label to "Sending…". Users double-
  tap otherwise.
- Keep the enquiry form to name, phone, and one optional message. Every extra required
  field measurably costs leads; ask for the rest by WhatsApp later.
- Include the hidden honeypot field described in `nextjs-api-security`.

## Animation

Animation should confirm what happened, not perform. Framer Motion, used sparingly:

- Section reveal on scroll: `whileInView` with 12–16px of travel, 300ms, `once: true`.
- Card press: `whileTap={{ scale: 0.98 }}`. Cheap and makes taps feel acknowledged.
- Page transitions: fade only. Sliding whole pages fights the browser's back gesture.
- Counters ("2,400+ travellers") animate once when they enter the viewport.
- Skeleton shimmer instead of spinners.

Two things to avoid: anything that delays the hero content appearing (it directly hurts
Largest Contentful Paint and therefore ranking), and anything animating `width`, `height`,
`top` or `left` — animate `transform` and `opacity`, which the compositor can handle
without repainting.

## Speed

- `next/image` everywhere, with `priority` on the hero and explicit `sizes`. Serve AVIF/WebP.
- `next/font` with `display: "swap"`; two weights maximum.
- `dynamic(() => import(...), { ssr: false })` for the chat widget, maps and games —
  none of them should be in the first bundle.
- Static-render marketing pages and revalidate on publish.
- Watch the bundle: `@next/bundle-analyzer` in CI. Target under ~150KB of JS on the
  landing page.

## Engagement without dark patterns

To raise pages-per-session and lower bounce: related packages on every package page,
"people also asked" under blog posts, breadcrumbs, a sticky WhatsApp/Call bar, recently
viewed items, and a genuinely useful cost or visa-eligibility calculator that ends in a
prefilled enquiry form. Interstitials, exit-intent popups on mobile, and countdown timers
that reset on refresh raise short-term numbers but hurt search ranking and trust — skip them.

## Accessibility

Keyboard focus visible, `alt` on every meaningful image, labels on every input, colour
contrast at least 4.5:1, and modals that trap focus and close on Escape. This overlaps
almost entirely with what makes the site usable one-handed on a bus.
