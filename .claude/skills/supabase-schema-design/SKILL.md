---
name: supabase-schema-design
description: Postgres schema, indexing, Row Level Security policies, migrations and query-performance rules for the TravelAgencyInDubai platform, covering packages, services, blog posts, FAQs, leads, profiles, points and daily tasks. Use this whenever the user asks about database tables, columns, relationships, migrations, RLS, slow queries, search, pagination, or says anything like "optimize the database", "add a table", or "how should I store X".
---

# Database design

Supabase is plain Postgres. Put constraints in the database, not in application code — the
web app, the mobile app and the admin panel all write to these tables, and only the database
sees every one of them.

## Principles

- **Constrain at the database.** `NOT NULL`, `CHECK`, `UNIQUE`, foreign keys with explicit
  `ON DELETE`. A row that can't be written wrong is a bug you never debug.
- **RLS on every table, no exceptions.** A table without RLS is public to anyone holding
  the anon key, which is shipped in the browser bundle.
- **Index what you filter, sort and join on.** Then verify with `EXPLAIN ANALYZE` rather
  than guessing.
- **Denormalise deliberately.** A cached `points_balance` on `profiles` earns its keep; a
  copied `package_title` on `leads` will go stale and lie to you.
- **Migrations are files.** `supabase/migrations/0007_add_faq_votes.sql`, numbered, in git,
  never edited after being applied. Changes made in the dashboard UI do not exist.
- **Nothing is deleted without asking.** See below — this one overrides convenience.

## Destructive operations

Ask a human before running any of these, and wait for a clear yes in the current
conversation. A prior approval does not carry forward to a new operation.

`DROP DATABASE` · `DROP TABLE` · `DROP COLUMN` · `DROP TYPE` · `TRUNCATE` · `DELETE` without
a narrow `WHERE` · `UPDATE` without a `WHERE` · `supabase db reset` · deleting Storage
buckets or objects · altering a column type in place · adding `NOT NULL` to an existing
column without a backfill.

When one of these looks necessary, state what would be removed, what references it, and how
it would be undone. Then stop.

**Reach for these instead:**

```sql
-- Soft delete rather than DELETE
alter table blog_posts add column deleted_at timestamptz;
create index idx_blog_live on blog_posts (status, published_at desc)
  where status = 'approved' and deleted_at is null;

-- Then exclude it in RLS so no client can read it back
create policy "public reads approved posts" on blog_posts
  for select using (status = 'approved' and deleted_at is null);
```

- **Status transitions** — `archived` and `rejected` already exist on `content_status`. Use
  them; they preserve the row and its moderation history.
- **Additive, forward-only migrations** — add the new column, backfill it, switch reads to
  it, and leave the old one in place. Dropping it is a separate, human-approved step taken
  after the old app version has stopped serving traffic.
- **Compensating entries** — `points_ledger` is append-only by design. A wrongly awarded
  100 points is corrected with a `-100` row of reason `admin_adjust` and a note, never by
  editing or deleting the original. The ledger is the audit trail; editing it destroys the
  only record of what happened.

Rejected submissions, expired coupons and lost leads stay in the database. They are the
evidence if a decision is challenged and the data you need to tune moderation thresholds.
Retention purges are written, reviewed and run by a human.

One consequence worth planning for: soft deletes mean every query and every RLS policy needs
the `deleted_at is null` filter. Put it in the partial indexes from the start, or you will
have rows leaking into public listings months later.

## Shared conventions

Every table gets:

```sql
id          uuid primary key default gen_random_uuid(),
created_at  timestamptz not null default now(),
updated_at  timestamptz not null default now()
```

with one shared trigger function:

```sql
create or replace function set_updated_at() returns trigger
language plpgsql as $$
begin new.updated_at = now(); return new; end $$;

create trigger t_packages_updated before update on packages
  for each row execute function set_updated_at();
```

Use enums for closed sets — they cost nothing and stop typos becoming data:

```sql
create type content_status as enum ('draft','pending','approved','rejected','archived');
create type user_role     as enum ('user','editor','superadmin');
create type listing_kind  as enum ('tour','visa','hotel','transport','law','medical','spa','moving','other');
```

## Core tables

```sql
-- Users. Mirrors auth.users; never store passwords here.
create table profiles (
  id              uuid primary key references auth.users(id) on delete cascade,
  display_name    text not null check (char_length(display_name) between 2 and 60),
  avatar_url      text,
  role            user_role not null default 'user',
  points_balance  integer not null default 0 check (points_balance >= 0),
  streak_days     integer not null default 0,
  last_active_on  date,
  is_banned       boolean not null default false,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- Categories: one tree for both tours and local services.
create table categories (
  id         uuid primary key default gen_random_uuid(),
  slug       text not null unique,
  name       text not null,
  kind       listing_kind not null,
  parent_id  uuid references categories(id) on delete set null,
  position   integer not null default 0
);

-- Tour packages and outbound trips.
create table packages (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  title         text not null,
  summary       text not null check (char_length(summary) <= 300),
  body_md       text not null,
  hero_image    text,
  category_id   uuid not null references categories(id) on delete restrict,
  origin_code   char(2) not null default 'AE',
  country_code  char(2) not null,           -- destination
  city          text,
  duration_days smallint check (duration_days between 1 and 60),
  price_aed     numeric(10,2) check (price_aed >= 0),
  old_price_aed numeric(10,2),
  rating        numeric(2,1) default 0 check (rating between 0 and 5),
  status        content_status not null default 'draft',
  published_at  timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- Local UAE service listings: law firms, clinics, spas, movers, PROs.
create table services (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique,
  name         text not null,
  category_id  uuid not null references categories(id) on delete restrict,
  emirate      text not null check (emirate in ('Dubai','Abu Dhabi','Sharjah','Ajman','Fujairah','Ras Al Khaimah','Umm Al Quwain')),
  area         text,
  summary      text,
  body_md      text,
  phone        text,
  whatsapp     text,
  website      text,
  hero_image   text,
  is_verified  boolean not null default false,
  status       content_status not null default 'pending',
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- Blog. author_id null means a guest submission.
create table blog_posts (
  id              uuid primary key default gen_random_uuid(),
  slug            text not null unique,
  title           text not null check (char_length(title) between 8 and 140),
  excerpt         text check (char_length(excerpt) <= 300),
  body_md         text not null,
  cover_image     text,
  author_id       uuid references profiles(id) on delete set null,
  guest_name      text,
  guest_email     text,
  category_id     uuid references categories(id) on delete set null,
  status          content_status not null default 'pending',
  moderation_note text,                     -- internal, never serialised to the public API
  reviewed_by     uuid references profiles(id) on delete set null,
  view_count      integer not null default 0,
  published_at    timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- Community FAQ: guests ask, staff or trusted users answer.
create table faqs (
  id           uuid primary key default gen_random_uuid(),
  question     text not null check (char_length(question) between 10 and 300),
  answer_md    text,
  asked_by     uuid references profiles(id) on delete set null,
  guest_name   text,
  category_id  uuid references categories(id) on delete set null,
  status       content_status not null default 'pending',
  helpful_count integer not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- Enquiries. The commercial output of the whole site.
create table leads (
  id           uuid primary key default gen_random_uuid(),
  full_name    text not null,
  email        text not null,
  phone        text not null,
  country      char(2) not null,
  package_id   uuid references packages(id) on delete set null,
  service_id   uuid references services(id) on delete set null,
  message      text,
  travel_date  date,
  source       text,                        -- utm_source / referrer
  status       text not null default 'new' check (status in ('new','contacted','won','lost','spam')),
  created_at   timestamptz not null default now()
);
```

Gamification tables (`daily_tasks`, `task_completions`, `points_ledger`, `coupons`,
`coupon_redemptions`) are defined in `auth-points-rewards`.

## Indexes

Add these with the tables, not after the site is slow.

```sql
-- Listing pages: filter by status + category, order by date
create index idx_packages_live on packages (status, category_id, published_at desc)
  where status = 'approved';
create index idx_services_live on services (status, category_id, emirate)
  where status = 'approved';
create index idx_blog_live on blog_posts (status, published_at desc)
  where status = 'approved';

-- Admin moderation queue
create index idx_blog_pending on blog_posts (created_at) where status = 'pending';
create index idx_faqs_pending on faqs (created_at) where status = 'pending';

-- Leads dashboard
create index idx_leads_status_created on leads (status, created_at desc);

-- Slug lookups are already covered by the unique constraints.
```

Partial indexes are the highest-value trick here: public pages only read approved rows, so
the index stays small even as rejected spam accumulates.

## Full-text search

Better than `ILIKE '%term%'`, which cannot use a normal index:

```sql
alter table packages add column search_tsv tsvector
  generated always as (
    setweight(to_tsvector('english', coalesce(title,'')), 'A') ||
    setweight(to_tsvector('english', coalesce(summary,'')), 'B') ||
    setweight(to_tsvector('english', coalesce(city,'')), 'B')
  ) stored;

create index idx_packages_search on packages using gin (search_tsv);
```

Query it with `.textSearch("search_tsv", term, { type: "websearch" })`.

## Row Level Security

```sql
alter table packages   enable row level security;
alter table blog_posts enable row level security;
alter table leads      enable row level security;
alter table profiles   enable row level security;

-- Helper so policies stay readable and role checks stay in one place.
create or replace function is_superadmin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from profiles where id = auth.uid() and role = 'superadmin');
$$;

-- Public reads only approved content.
create policy "public reads approved packages" on packages
  for select using (status = 'approved');

create policy "public reads approved posts" on blog_posts
  for select using (status = 'approved');

-- Authors read their own submissions regardless of status.
create policy "authors read own posts" on blog_posts
  for select using (auth.uid() = author_id);

-- Anyone may submit, but only as pending and never as someone else.
create policy "guests submit posts" on blog_posts
  for insert with check (
    status = 'pending' and (author_id is null or author_id = auth.uid())
  );

-- Only superadmins change state.
create policy "admin writes posts" on blog_posts
  for all using (is_superadmin()) with check (is_superadmin());

-- Leads: write-only for the public. Nobody but staff can read them.
create policy "anyone creates a lead" on leads for insert with check (true);
create policy "admin reads leads"     on leads for select using (is_superadmin());

-- Profiles: read own, update own, but never your own role or points.
create policy "read own profile"   on profiles for select using (auth.uid() = id);
create policy "update own profile" on profiles for update using (auth.uid() = id)
  with check (auth.uid() = id and role = (select role from profiles where id = auth.uid()));
```

Points must never be writable by the user — award them through a `security definer`
function that the client calls via RPC, so the balance can only move through audited paths.
That function is specified in `auth-points-rewards`.

Test policies with the anon key and a user key. A policy you have not tried to break is a
policy you have not tested.

## Query performance

- **Never `select("*")`** on public routes. `body_md` on a 24-item list page is megabytes
  of wasted transfer.
- **Keyset pagination.** `.range(20000, 20020)` makes Postgres count through 20,000 rows;
  `.lt("published_at", cursor).limit(20)` uses the index.
- **Avoid N+1** with nested selects: `.select("id, title, categories(name, slug)")` is one
  round trip.
- **Cache at the edge.** `export const revalidate = 3600` plus `revalidateTag()` on publish
  means most traffic never reaches the database. This beats any index for page speed.
- **Counters** are incremented by RPC (`set view_count = view_count + 1`), never
  read-modify-write from the client.

## Migration workflow

```bash
supabase migration new add_faq_votes     # creates a numbered file
# edit the SQL, then verify locally
supabase db push                         # apply to the remote project
```

Forward-only and additive: add a nullable column, backfill, then add the constraint.
Dropping a column while an old app version is still serving traffic breaks real users — and
per the rules above, it needs human approval regardless.

`supabase db reset` rebuilds from scratch and wipes local data. It is a human's command, not
an agent's, and it must never be pointed at a remote project.
