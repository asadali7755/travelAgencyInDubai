-- 0001_core_schema.sql
-- Enums, shared trigger, and the core content tables.
-- Forward-only and additive: never edited after being applied.

create type content_status as enum ('draft','pending','approved','rejected','archived');
create type user_role     as enum ('user','editor','superadmin');
create type listing_kind  as enum ('tour','visa','hotel','transport','law','medical','spa','moving','other');

create or replace function set_updated_at() returns trigger
language plpgsql as $$
begin new.updated_at = now(); return new; end $$;

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
  country_code  char(2) not null,
  city          text,
  duration_days smallint check (duration_days between 1 and 60),
  price_aed     numeric(10,2) check (price_aed >= 0),
  old_price_aed numeric(10,2),
  rating        numeric(2,1) default 0 check (rating between 0 and 5),
  status        content_status not null default 'draft',
  published_at  timestamptz,
  deleted_at    timestamptz,
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
  deleted_at   timestamptz,
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
  moderation_note text,
  reviewed_by     uuid references profiles(id) on delete set null,
  view_count      integer not null default 0,
  published_at    timestamptz,
  deleted_at      timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- Community FAQ: guests ask, staff or trusted users answer.
create table faqs (
  id            uuid primary key default gen_random_uuid(),
  question      text not null check (char_length(question) between 10 and 300),
  answer_md     text,
  asked_by      uuid references profiles(id) on delete set null,
  guest_name    text,
  category_id   uuid references categories(id) on delete set null,
  status        content_status not null default 'pending',
  helpful_count integer not null default 0,
  deleted_at    timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
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
  source       text,
  status       text not null default 'new' check (status in ('new','contacted','won','lost','spam')),
  created_at   timestamptz not null default now()
);

create trigger t_profiles_updated   before update on profiles   for each row execute function set_updated_at();
create trigger t_packages_updated   before update on packages   for each row execute function set_updated_at();
create trigger t_services_updated   before update on services   for each row execute function set_updated_at();
create trigger t_blog_posts_updated before update on blog_posts for each row execute function set_updated_at();
create trigger t_faqs_updated       before update on faqs       for each row execute function set_updated_at();

-- Profile row is created by a trigger on signup, so the app never checks for one.
create or replace function handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'name', split_part(new.email,'@',1)));
  return new;
end $$;

create trigger on_auth_user_created after insert on auth.users
  for each row execute function handle_new_user();
