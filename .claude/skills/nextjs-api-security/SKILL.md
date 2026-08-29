---
name: nextjs-api-security
description: How to write secure Next.js App Router API route handlers for the TravelAgencyInDubai platform — Zod input validation, explicit output serialisers, Supabase auth checks, rate limiting, CSRF and XSS defence, safe file uploads, and consistent error envelopes. Use this whenever creating or reviewing anything under app/api/, any server action, any form submission endpoint, or whenever the user mentions APIs, forms, validation, SQL injection, XSS, rate limiting, or "secure the backend".
---

# Secure API routes

Every route handler follows the same five-step shape. Deviating from it is how holes appear.

```
rate limit → authenticate → validate input → authorise the specific row → serialise output
```

## The standard handler

```ts
// app/api/leads/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { leadCreateSchema, serializeLead } from "@/lib/validation/lead";
import { rateLimit } from "@/lib/rate-limit";
import { fail, ok } from "@/lib/api/respond";

export async function POST(req: NextRequest) {
  const limited = await rateLimit(req, { key: "leads:create", limit: 5, window: "10 m" });
  if (limited) return fail(429, "Too many requests. Please try again shortly.");

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return fail(400, "Invalid request body.");
  }

  const parsed = leadCreateSchema.safeParse(body);
  if (!parsed.success) {
    return fail(400, "Please check the highlighted fields.", parsed.error.flatten().fieldErrors);
  }

  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("leads")
    .insert(parsed.data)
    .select("id, created_at, status")
    .single();

  if (error) {
    console.error("leads.create", error.message);   // log detail server-side
    return fail(500, "We couldn't submit your enquiry. Please try again.");
  }

  return ok(serializeLead(data), 201);
}
```

Note what the client never sees: the Postgres error message, the table structure, or any
column not named in `.select()`. Database errors leak schema information to attackers and
mean nothing to users, so log them and return a human sentence.

## Response envelope

Keep one shape so the frontend and the mobile app can share error handling.

```ts
// lib/api/respond.ts
export const ok = <T>(data: T, status = 200) =>
  NextResponse.json({ success: true, data }, { status });

export const fail = (status: number, message: string, fields?: Record<string, string[]>) =>
  NextResponse.json({ success: false, error: { message, fields } }, { status });
```

## Validation with Zod

Schemas live in `lib/validation/` and are imported by the route handler, the web form, and
the Expo app. One definition, three consumers — that is what keeps them from drifting.

```ts
// lib/validation/lead.ts
import { z } from "zod";

export const leadCreateSchema = z.object({
  full_name: z.string().trim().min(2).max(80),
  email: z.string().trim().toLowerCase().email().max(160),
  phone: z.string().trim().regex(/^\+?[0-9\s-]{7,20}$/, "Enter a valid phone number"),
  country: z.string().trim().length(2).toUpperCase(),      // ISO-3166 alpha-2
  package_id: z.string().uuid().optional(),
  service_id: z.string().uuid().optional(),
  message: z.string().trim().max(1000).optional(),
  travel_date: z.coerce.date().min(new Date()).optional(),
}).strict();     // .strict() rejects unknown keys instead of silently passing them through

export type LeadCreate = z.infer<typeof leadCreateSchema>;

export const serializeLead = (row: { id: string; created_at: string; status: string }) => ({
  id: row.id,
  createdAt: row.created_at,
  status: row.status,
});
```

`.strict()` matters more than it looks. Without it, a request that posts
`{ ..., "status": "approved", "is_admin": true }` passes validation, and if the insert
spreads the parsed object those fields land in the row.

## Output serialisers

Never return `data` straight from Supabase. Write a `serializeX` function per entity that
names each field explicitly. When someone later adds an `internal_notes` or
`moderation_reason` column, the serialiser keeps it out of the public API automatically.

The same rule applies to `.select()` — always list columns, never `select("*")` on a table
that has any non-public column.

## Authentication and authorisation

Authentication answers "who is this". Authorisation answers "may they touch *this row*".
Both are needed; RLS handles the second but the handler should fail fast and clearly.

```ts
const { data: { user } } = await supabase.auth.getUser();
if (!user) return fail(401, "Please sign in to continue.");

// Role check for admin-only routes
const { data: profile } = await supabase
  .from("profiles").select("role").eq("id", user.id).single();
if (profile?.role !== "superadmin") return fail(403, "Not allowed.");
```

Use `supabase.auth.getUser()`, not `getSession()`, on the server — `getUser()` verifies the
JWT with the auth server, while `getSession()` trusts a cookie that a client can craft.

Guard the admin area in three places: middleware (redirect), layout (render guard), and RLS
(the real enforcement). The first two are UX; only the third is security.

## SQL injection

The Supabase JS client parameterises everything, so ordinary query-builder calls are safe.
The danger sits in three places:

- `.rpc()` functions written with `EXECUTE 'SELECT ... ' || arg`. Write `plpgsql` with
  typed parameters and `USING`, never string-built SQL.
- `.or()` / `.filter()` with interpolated user strings — these take raw PostgREST syntax.
  Never pass user input into them unvalidated; map it through an allowlist first.
- Sort and filter params from the URL. Allowlist them:

```ts
const SORTABLE = { newest: "created_at", price: "price_aed", rating: "rating" } as const;
const column = SORTABLE[searchParams.get("sort") as keyof typeof SORTABLE] ?? "created_at";
```

## XSS

- Prefer plain text. React escapes `{value}` automatically.
- Store guest blog content as **Markdown**, not HTML, and render it through a Markdown
  renderer with raw HTML disabled. This removes almost the whole attack surface.
- If HTML is unavoidable, sanitise on the server *before* insert **and** again on render:

```ts
// lib/sanitize.ts
import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";

const DOMPurify = createDOMPurify(new JSDOM("").window);

export const sanitizeHtml = (dirty: string) =>
  DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ["p","br","strong","em","ul","ol","li","h2","h3","h4","blockquote","a","img","code","pre"],
    ALLOWED_ATTR: ["href","title","alt","src","rel","target"],
    ALLOWED_URI_REGEXP: /^(https?:|mailto:|\/)/i,
  });
```

Sanitising only on input is not enough — a bad row could arrive by another path, and a
sanitiser bypass discovered later still leaves stored payloads live.

Add a Content-Security-Policy in `next.config.js` headers. Even a modest one turns most XSS
findings from critical into cosmetic.

## Rate limiting

Everything unauthenticated needs a limit: lead forms, guest FAQ submissions, blog
submissions, chat, login, password reset. Use Upstash Redis so the counter survives across
serverless instances; an in-memory Map resets on every cold start and protects nothing.

```ts
// lib/rate-limit.ts
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const cache = new Map<string, Ratelimit>();

export async function rateLimit(req: Request, o: { key: string; limit: number; window: `${number} ${"s"|"m"|"h"}` }) {
  const rl = cache.get(o.key) ?? new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(o.limit, o.window),
    prefix: o.key,
  });
  cache.set(o.key, rl);
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anon";
  const { success } = await rl.limit(ip);
  return !success;
}
```

Suggested budgets: leads 5/10min, guest blog 3/hour, FAQ 5/hour, chat 20/hour for guests
and 60/hour signed in, login 10/15min per IP.

## Other defences worth having

- **Honeypot + timing** on public forms: a hidden field that must stay empty, and a reject
  if the form was submitted under ~2 seconds after render. Catches most bots without a
  CAPTCHA. Add Turnstile if spam persists.
- **CSRF**: Route handlers reading JSON with `SameSite=Lax` cookies are largely safe, but
  reject requests whose `Origin` header is not your site on any state-changing method.
- **Uploads**: check the magic bytes, not the filename or the client-provided MIME type;
  cap size (~5MB); re-encode with `sharp` to strip EXIF and any embedded payload; store in
  a private Supabase bucket and serve via signed URLs. See `content-moderation` for the
  NSFW step.
- **Idempotency** on booking/lead POSTs: accept an `Idempotency-Key` header and unique-index
  it, so a double tap on a flaky mobile connection doesn't create two enquiries.
- **PII in logs**: log the lead id, never the email, phone or message body.

## Review checklist

- [ ] Zod schema with `.strict()`, bounded string lengths
- [ ] Explicit `.select()` columns and a serialiser
- [ ] `getUser()` not `getSession()`; role checked for privileged routes
- [ ] Rate limited if reachable without auth
- [ ] Database errors logged server-side, generic message returned
- [ ] No service-role key reachable from client code
- [ ] File under 300 lines
