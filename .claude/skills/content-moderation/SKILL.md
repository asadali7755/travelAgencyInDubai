---
name: content-moderation
description: The moderation pipeline for guest-submitted blog posts, FAQs, service listings, images and profile content on the TravelAgencyInDubai platform — pending-by-default workflow, text screening, NSFW image detection, spam and link-scam filtering, the superadmin review queue, appeals and audit logging. Use this whenever the user mentions guest submissions, user-generated content, approving or rejecting posts, blocking adult or inappropriate content, image screening, spam, or keeping the site safe and advertiser-friendly.
---

# Moderation

Anything a stranger can submit will eventually be used to post something the site cannot
host. The pipeline below assumes that, rather than hoping otherwise.

Two additional pressures make this stricter than a typical blog: the UAE has real legal
constraints on published content, and AdSense will disable an account over adult or hateful
material regardless of who uploaded it. Automated filters are the first pass; a human
approval step is what actually protects the site.

## The pipeline

```
submit → validate → rate limit → text screen → image screen → status='pending'
       → admin review → approved (indexable) | rejected (reason recorded)
```

**Nothing skips the human step.** Automated screening decides what gets auto-rejected and
what gets prioritised in the queue; it does not decide what gets published. Classifiers have
both false positives (a legitimate spa listing flagged as adult) and false negatives, and
the cost of the second is much higher than the first here.

## Stage 1 — structural validation

Before any classifier runs, reject what is obviously not a submission:

- Length bounds: blog body 600–20,000 characters, FAQ question 10–300.
- Maximum 3 outbound links in a guest post, 0 in an FAQ question. Link count alone filters
  most SEO spam.
- Reject non-Latin-script link domains, URL shorteners, and any domain on a blocklist.
- Markdown only — no raw HTML accepted from guests. This removes the XSS surface entirely
  rather than trying to sanitise it.
- Strip and re-attach images separately; images are handled in stage 3.

## Stage 2 — text screening

Run three checks, cheapest first.

**Keyword and pattern lists.** Maintain lists in `lib/moderation/lexicons.ts` covering
explicit sexual terms, escort/adult-services phrasing (which is the most common spam vector
for a Dubai travel site specifically), hate slurs, and crypto/forex/loan spam. Include
common obfuscations — spaced letters, digit substitutions, zero-width characters. Normalise
first: lowercase, strip diacritics, collapse repeated characters, remove zero-width and
homoglyph substitutions. Without normalisation the lists are trivially bypassed.

**Heuristics.** Excessive capitals, repeated phone numbers or WhatsApp links, more than ~2%
link density, near-duplicate of an existing post (compare a simhash of the body), and
submissions from the same IP within minutes of each other.

**Model-based classification.** Send the text to the same free provider used for the chat
agent (see `ai-chat-agent`) with a strict classification prompt returning JSON:

```ts
// lib/moderation/text.ts
const SYSTEM = `You classify user-submitted travel content. Return ONLY JSON:
{"sexual":0-1,"hate":0-1,"violence":0-1,"spam":0-1,"scam":0-1,"quality":0-1,"reason":"short"}
Score sexual >0.7 for explicit content or solicitation of sexual services.
Legitimate spa, massage, wellness and beauty listings are NOT sexual content.
Return JSON only, no prose.`;

export async function classifyText(text: string): Promise<ModerationScores> {
  // truncate to ~4000 chars, call provider, parse with Zod, and on any failure
  // return a "needs review" result rather than a pass.
}
```

The failure mode to design around: if the API is down or returns something unparseable, the
submission goes to the queue flagged for review. It must never fall through to approved.

The instruction about spas is not cosmetic — a naive classifier flags most legitimate
wellness listings on this site, and if the team learns to ignore the flag, the filter stops
working.

**Thresholds.** Auto-reject at sexual/hate/violence > 0.85. Queue with a warning banner
between 0.4 and 0.85. Pass quietly below 0.4 — still into the human queue, just unflagged.

## Stage 3 — image screening

Images are the higher risk and the harder problem.

1. **Verify the file is what it claims.** Check magic bytes; accept only JPEG, PNG, WebP.
   A `.jpg` filename means nothing.
2. **Cap size** at ~5MB and dimensions at ~4000px.
3. **Re-encode with `sharp`.** This strips EXIF (which carries GPS coordinates of the
   submitter's home, among other things) and destroys any polyglot payload hidden in the
   container.
4. **Hash and compare** against a blocklist of previously rejected images (perceptual hash,
   so a re-crop is still caught).
5. **NSFW classification.** Run `nsfwjs` (TensorFlow.js, free, self-hosted) server-side in
   the route handler or a background job. It returns probabilities across Drawing, Hentai,
   Neutral, Porn, Sexy.

```ts
// lib/moderation/image.ts — model loaded once at module scope, not per request
const THRESHOLDS = { porn: 0.35, hentai: 0.35, sexy: 0.6 };
// exceeding any → auto-reject; within 60% of any → queue with warning
```

Thresholds are deliberately low. A false positive costs one legitimate photo and a support
message; a false negative costs the AdSense account and potentially more than that.

6. **Store in a private bucket** until approved. Unapproved uploads must not be reachable by
   URL, even an unguessable one — assume any URL that exists will be found.

For higher confidence, add a hosted moderation API later. But the pipeline should work
without one, because a dependency that costs money per image will be the first thing
disabled during a budget squeeze.

## Stage 4 — the review queue

The admin queue lives under `app/(admin)/admin/moderation/`. Design it for speed, since a
slow queue is an unused queue:

- Sort by flag severity, then oldest first.
- Show the automated scores inline with colour coding, and the specific matched terms.
- Keyboard shortcuts: `A` approve, `R` reject, `J`/`K` to move.
- Rejection requires selecting a reason from a fixed list plus optional notes. The reason is
  stored in `moderation_note` and emailed to the submitter — arbitrary silent rejection
  generates support load and resubmissions.
- Approving a blog post awards the author points and triggers `revalidateTag()` so the post
  appears on the live site without a deploy.
- Bulk-reject for obvious spam runs.

## Records and audit

```sql
create table moderation_events (
  id           uuid primary key default gen_random_uuid(),
  entity_type  text not null check (entity_type in ('blog_post','faq','service','image','profile')),
  entity_id    uuid not null,
  action       text not null check (action in ('auto_flag','auto_reject','approve','reject','appeal','restore')),
  actor_id     uuid references profiles(id) on delete set null,   -- null = automated
  scores       jsonb,
  reason       text,
  created_at   timestamptz not null default now()
);
create index idx_moderation_entity on moderation_events (entity_type, entity_id, created_at desc);
```

Keep rejected content rather than deleting it: it is the evidence if a decision is
challenged, and the training signal for tuning thresholds. Purge after 90 days.

Track the automated pass rate and the human override rate. If admins are overriding
auto-flags most of the time, the thresholds are wrong and the flags are being ignored — fix
the thresholds rather than letting the queue teach people to click through.

## Repeat offenders

Escalate: first violation warns, second suspends submission rights for 30 days, third bans
the account and blocks the email/phone. Store the trust level on the profile, and let
established contributors (3+ approved posts, no violations) skip straight to a lighter
review — that is what keeps the queue manageable as volume grows.

## Related policies

- Guest outbound links carry `rel="nofollow ugc"` — see `seo-and-adsense`.
- Unapproved content returns `noindex` and is excluded from sitemaps.
- Upload validation details are in `nextjs-api-security`.
- The chat agent's own outputs need separate guardrails — see `ai-chat-agent`.
