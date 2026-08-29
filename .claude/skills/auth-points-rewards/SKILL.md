---
name: auth-points-rewards
description: Supabase Auth setup, roles, session handling, and the points/streak/daily-task/mini-game reward system for the TravelAgencyInDubai platform, including the points ledger, coupon redemption, anti-abuse rules and the superadmin dashboard. Use this whenever the user mentions login, signup, sessions, roles, superadmin, user dashboard, points, rewards, discounts, coupons, daily tasks, streaks, games, referrals, or seeing which users are online.
---

# Auth, points and rewards

The points system is a discount liability. Treat every point as money: it can only be
created by an audited server-side event, and it can only be spent once.

## Auth

Supabase Auth with email/password plus Google, and phone OTP — phone matters because much of
this audience signs up from a mobile number, not an email inbox.

- Sessions live in cookies via `@supabase/ssr`, refreshed in `middleware.ts`.
- On the server, always `supabase.auth.getUser()`. `getSession()` reads a cookie without
  verifying the JWT, so it cannot be trusted for an authorisation decision.
- A trigger creates the `profiles` row on signup, so the app never has to check whether a
  profile exists:

```sql
create or replace function handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'name', split_part(new.email,'@',1)));
  return new;
end $$;

create trigger on_auth_user_created after insert on auth.users
  for each row execute function handle_new_user();
```

Roles are `user`, `editor`, `superadmin`, stored on `profiles.role`. The RLS policy on
`profiles` prevents a user from editing their own role — check that policy exists before
shipping, because a self-service role update is a full compromise of the admin panel.

Route protection sits in three layers: `middleware.ts` redirects unauthenticated users away
from `/dashboard` and `/admin`, the admin layout re-checks the role server-side, and RLS
enforces it at the data layer. Only the third layer is real security; the other two exist so
users get a sensible redirect instead of an empty page.

## Points schema

```sql
create type point_reason as enum
  ('signup','daily_checkin','streak_bonus','quiz','game','profile_complete',
   'referral','faq_approved','blog_approved','review','redemption','admin_adjust');

-- Append-only ledger. Never update or delete a row.
create table points_ledger (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references profiles(id) on delete cascade,
  delta       integer not null check (delta <> 0),
  reason      point_reason not null,
  ref_id      uuid,                       -- task completion, coupon, referral
  note        text,
  created_at  timestamptz not null default now()
);
create index idx_ledger_user on points_ledger (user_id, created_at desc);

create table daily_tasks (
  id           uuid primary key default gen_random_uuid(),
  code         text not null unique,      -- 'checkin','quiz_uae','memory_game'
  title        text not null,
  description  text,
  points       integer not null check (points between 1 and 100),
  kind         text not null check (kind in ('checkin','quiz','game','action')),
  is_active    boolean not null default true
);

-- One completion per user per task per day. The unique index is the anti-abuse mechanism.
create table task_completions (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references profiles(id) on delete cascade,
  task_id      uuid not null references daily_tasks(id) on delete cascade,
  completed_on date not null default (now() at time zone 'Asia/Dubai')::date,
  score        integer,
  created_at   timestamptz not null default now(),
  unique (user_id, task_id, completed_on)
);

create table coupons (
  id            uuid primary key default gen_random_uuid(),
  code          text not null unique,
  title         text not null,
  points_cost   integer not null check (points_cost > 0),
  discount_type text not null check (discount_type in ('percent','flat')),
  discount_value numeric(10,2) not null check (discount_value > 0),
  max_discount_aed numeric(10,2),
  min_spend_aed numeric(10,2),
  stock         integer,                  -- null = unlimited
  valid_until   timestamptz,
  is_active     boolean not null default true
);

create table coupon_redemptions (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references profiles(id) on delete cascade,
  coupon_id   uuid not null references coupons(id) on delete restrict,
  code_issued text not null unique,       -- per-user single-use code
  used_at     timestamptz,
  created_at  timestamptz not null default now()
);
```

`profiles.points_balance` is a cached sum of the ledger, kept correct by the award function.
The ledger is the truth; if they ever disagree, recompute the balance from the ledger.

Dates use `Asia/Dubai`, not UTC. A user checking in at 2am Dubai time should get today's
streak, not yesterday's.

## Awarding points

All point movement goes through one `security definer` function. The client can call it,
but cannot choose the amount — the amount comes from the `daily_tasks` row.

```sql
create or replace function complete_task(p_task_code text, p_score integer default null)
returns json
language plpgsql security definer set search_path = public as $$
declare
  v_user uuid := auth.uid();
  v_task daily_tasks%rowtype;
  v_today date := (now() at time zone 'Asia/Dubai')::date;
  v_completion uuid;
  v_streak integer;
  v_bonus integer := 0;
begin
  if v_user is null then raise exception 'not authenticated'; end if;
  if exists (select 1 from profiles where id = v_user and is_banned) then
    raise exception 'account suspended';
  end if;

  select * into v_task from daily_tasks where code = p_task_code and is_active;
  if not found then raise exception 'unknown task'; end if;

  insert into task_completions (user_id, task_id, completed_on, score)
  values (v_user, v_task.id, v_today, p_score)
  on conflict (user_id, task_id, completed_on) do nothing
  returning id into v_completion;

  if v_completion is null then
    return json_build_object('awarded', 0, 'reason', 'already_completed_today');
  end if;

  insert into points_ledger (user_id, delta, reason, ref_id)
  values (v_user, v_task.points, v_task.kind::point_reason, v_completion);

  -- Streak: consecutive days with any completion
  update profiles
     set streak_days = case when last_active_on = v_today - 1 then streak_days + 1 else 1 end,
         last_active_on = v_today
   where id = v_user
   returning streak_days into v_streak;

  if v_streak % 7 = 0 then
    v_bonus := 50;
    insert into points_ledger (user_id, delta, reason, note)
    values (v_user, v_bonus, 'streak_bonus', v_streak || '-day streak');
  end if;

  update profiles set points_balance = points_balance + v_task.points + v_bonus
   where id = v_user;

  return json_build_object('awarded', v_task.points + v_bonus, 'streak', v_streak);
end $$;
```

Why this shape matters: `on conflict do nothing` plus the unique index makes the whole thing
idempotent. A user tapping "claim" five times, or replaying the request in a proxy, gets
points once. Doing the same check with a `SELECT` first would race.

Redemption is the mirror image — one function that checks the balance, decrements stock,
writes a negative ledger row and issues a single-use code, all in one transaction. Never
subtract points in application code; a crash between the two writes gives away free
discounts.

## Task and game design

Keep the task list short and genuinely engaging:

- **Daily check-in** — 5 points, one tap.
- **Destination quiz** — 5 questions about UAE/Pakistan/Georgia travel, 10 points. Score
  the answers **on the server**; a client that posts its own score is a client that posts
  `100`.
- **Mini-games** — memory match with destination photos, "spot the landmark", a spin wheel
  with server-decided outcomes. Games are client-rendered but the reward is always
  server-decided; never let the browser tell the API how many points it earned.
- **Profile completion** — 25 points, one time.
- **Referral** — 100 points when the referred user's first enquiry is marked contacted, not
  at signup. Rewarding signup alone funds fake accounts.
- **Approved FAQ or blog post** — 30/100 points, awarded by the superadmin on approval.

Load game components with `dynamic(..., { ssr: false })` so they never enter the main bundle.

## Points economics

Fix the exchange rate before launch and write it down: e.g. 100 points = 10 AED off, minimum
spend 500 AED, maximum 15% of any booking, points expire after 12 months of inactivity.
Without a cap and an expiry, the liability grows without bound and the first person to
notice will be an accountant, not a developer.

Add a daily earning cap (say 80 points) so no combination of tasks and bugs produces a
runaway balance.

## Anti-abuse

- One account per verified phone number.
- Rate-limit `complete_task` per user, not just per IP.
- Flag accounts earning near the daily cap every day for a week for manual review.
- Server-side timing check on games — a "60-second memory game" completed in 3 seconds is
  automation.
- Referrals need a distinct device/IP and a real enquiry before paying out.
- Never trust any number the client sends about its own performance.

## Superadmin dashboard

Under `app/(admin)/`, backed by RLS policies that require `is_superadmin()`:

- **Moderation queue** — pending blogs, FAQs and service listings with approve/reject and a
  required rejection reason. See `content-moderation`.
- **Leads** — filter by status, export CSV, mark contacted/won/lost.
- **Users** — search, view points ledger, adjust points with a mandatory note, ban.
- **Content** — create and edit packages, services and coupons.
- **Activity** — recently active users. Note that "currently logged in" is not something
  JWT sessions can tell you exactly; either show `last_seen_at` updated by a lightweight
  heartbeat, or use Supabase Realtime presence for a genuine live count. Say which one the
  number represents so nobody misreads it.

Every admin action that changes state writes to an `admin_audit` table (actor, action,
target, before/after, timestamp). When something is wrong later, this is the only way to
find out what happened.
