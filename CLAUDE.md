# TravelAgencyInDubai

Next.js (App Router) + Supabase + Expo. UAE travel, services directory, outbound tours.

Read `.claude/skills/uae-travel-platform/SKILL.md` before starting any task — it routes to
the eight focused skills.

## Never destroy data

Treat the database as append-only unless a human has explicitly told you otherwise **in this
conversation**. Ask first, then wait for a clear yes. Do not proceed on an implied
permission, a stale approval from earlier in the session, or your own judgement that the
data is obviously disposable.

This covers:

- `DROP DATABASE`, `DROP TABLE`, `DROP COLUMN`, `DROP TYPE`, `TRUNCATE`
- `DELETE FROM` without a `WHERE`, or with a `WHERE` that could match many rows
- `UPDATE` without a `WHERE`
- `supabase db reset` — this wipes local data; never run it against a remote project
- Deleting Storage buckets or objects
- Migrations that drop or rename a column, alter a type in place, or add a `NOT NULL`
  constraint to an existing column without a backfill
- Deleting rows from `auth.users`, `points_ledger`, `leads`, or `moderation_events`

When a task seems to need one of these, stop and say what you want to remove, why, what
depends on it, and how it would be reversed. Then wait.

**Instead of deleting, prefer:**

- Soft deletes — add `deleted_at timestamptz`, filter it out in queries and RLS policies
- Status transitions — `archived` or `rejected` on the `content_status` enum
- Forward-only, additive migrations — add the new column, backfill, switch reads, and leave
  the old column in place until a human approves dropping it
- Compensating rows — the points ledger is append-only, so a mistake is corrected with a
  negative `admin_adjust` entry, never by editing or removing the original

Rejected content, expired coupons and lost leads all stay in the database. They are the
evidence when a decision is challenged and the signal for tuning moderation thresholds.
Purge jobs are written by a human, reviewed, and run deliberately.

## Non-negotiable

- No file over 300 lines
- Zod validation on every API boundary, `.strict()` always
- Explicit serialisers — never return a raw Supabase row
- Service-role key server-only, never in `app/` outside route handlers
- Guest content is `pending` until a superadmin approves it

## Commands

```
pnpm dev / pnpm build / pnpm lint
supabase migration new <name>
supabase db push
```

`supabase db reset` is destructive and is not run by an agent. If a local reset is needed,
ask and let a human run it.
