-- 0006_agencies_and_uploads.sql
-- Company profiles, their members, their uploaded documents, and the audit log
-- behind every moderation decision.
--
-- Forward-only and additive, per CLAUDE.md. Nothing here drops, renames or
-- retypes an existing column. The new columns on `services`, `packages` and
-- `leads` are all nullable, so every row already in those tables stays valid.

-- ---------------------------------------------------------------------------
-- Companies: travel agencies, and the service businesses in the directory.
-- One table for both, because the profile, the verification and the moderation
-- workflow are identical and a second table would duplicate all three.
-- ---------------------------------------------------------------------------
create table agencies (
  id             uuid primary key default gen_random_uuid(),
  slug           text not null unique,
  name           text not null check (char_length(name) between 2 and 120),
  -- What the company does. 'tour' and 'visa' are travel; the rest are the
  -- resident-services directory. Mirrors the listing_kind enum from 0001.
  kind           listing_kind not null default 'other',
  tagline        text check (char_length(tagline) <= 160),
  about_md       text,
  emirate        text not null check (emirate in ('Dubai','Abu Dhabi','Sharjah','Ajman','Fujairah','Ras Al Khaimah','Umm Al Quwain')),
  area           text,
  -- Contact. Public once approved, so the API serialiser decides what leaves.
  email          text,
  phone          text,
  whatsapp       text,
  website        text,
  logo_url       text,
  cover_url      text,
  -- DED / DET trade licence. Never shown publicly; used to verify the company.
  licence_number text,
  -- Set by a superadmin after checking the licence document. Never self-set:
  -- the RLS update policy below refuses a change to this column by the owner.
  is_verified    boolean not null default false,
  status         content_status not null default 'pending',
  -- Why a rejection happened. Kept forever; it is the evidence if challenged.
  review_note    text,
  reviewed_by    uuid references profiles(id) on delete set null,
  reviewed_at    timestamptz,
  deleted_at     timestamptz,
  created_by     uuid references profiles(id) on delete set null,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

-- Who may act for a company. A join table rather than a column on profiles,
-- because one person can run two businesses and one business has several staff.
create table agency_members (
  agency_id  uuid not null references agencies(id) on delete cascade,
  user_id    uuid not null references profiles(id) on delete cascade,
  -- 'owner' may invite and remove; 'staff' may edit listings only.
  member_role text not null default 'owner' check (member_role in ('owner','staff')),
  created_at timestamptz not null default now(),
  primary key (agency_id, user_id)
);

-- Files a company uploads: trade licence, insurance, brochures, price lists.
-- The bytes live in Supabase Storage; this table is the index and the ACL.
create table agency_documents (
  id          uuid primary key default gen_random_uuid(),
  agency_id   uuid not null references agencies(id) on delete cascade,
  uploaded_by uuid references profiles(id) on delete set null,
  kind        text not null default 'other'
                check (kind in ('licence','insurance','brochure','price_list','photo','other')),
  -- Path inside the storage bucket. Never a public URL: licence scans are
  -- private and are served through a short-lived signed URL instead.
  storage_path text not null,
  file_name   text not null,
  mime_type   text not null,
  size_bytes  integer not null check (size_bytes > 0),
  -- Licence scans are private; brochures and photos can be shown on the profile.
  is_public   boolean not null default false,
  deleted_at  timestamptz,
  created_at  timestamptz not null default now()
);

-- Every approve, reject or verify, with who and why. Append-only by design:
-- there is no update or delete policy on this table for anybody.
create table moderation_events (
  id          uuid primary key default gen_random_uuid(),
  entity      text not null check (entity in ('agency','service','package','blog_post','faq','document')),
  entity_id   uuid not null,
  action      text not null check (action in ('approve','reject','archive','verify','unverify')),
  actor_id    uuid references profiles(id) on delete set null,
  note        text,
  created_at  timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Link the existing content tables to a company. All nullable and additive:
-- the rows already in these tables predate agencies and stay valid.
-- ---------------------------------------------------------------------------
alter table services add column agency_id uuid references agencies(id) on delete set null;
alter table services add column owner_id  uuid references profiles(id) on delete set null;
alter table packages add column agency_id uuid references agencies(id) on delete set null;
alter table packages add column owner_id  uuid references profiles(id) on delete set null;
alter table leads    add column agency_id uuid references agencies(id) on delete set null;
-- Stamped when the enquiry is made by a signed-in visitor, so they can see
-- their own history in the dashboard. Null for the guest enquiries that make up
-- most of the table, which is why it has to be nullable.
alter table leads    add column user_id   uuid references profiles(id) on delete set null;

create trigger t_agencies_updated before update on agencies
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- Indexes. Written with the tables, not after the directory is slow.
-- ---------------------------------------------------------------------------
create index idx_agencies_live on agencies (status, kind, emirate)
  where status = 'approved' and deleted_at is null;

create index idx_agencies_pending on agencies (created_at) where status = 'pending';

create index idx_agency_members_user on agency_members (user_id);

create index idx_agency_documents_agency on agency_documents (agency_id, created_at desc)
  where deleted_at is null;

create index idx_moderation_entity on moderation_events (entity, entity_id, created_at desc);

create index idx_services_agency on services (agency_id, status) where deleted_at is null;
create index idx_packages_agency on packages (agency_id, status) where deleted_at is null;
create index idx_leads_agency on leads (agency_id, created_at desc);
create index idx_leads_user on leads (user_id, created_at desc) where user_id is not null;

-- Search over the directory, same pattern as 0002.
alter table agencies add column search_tsv tsvector
  generated always as (
    setweight(to_tsvector('english', coalesce(name,'')), 'A') ||
    setweight(to_tsvector('english', coalesce(tagline,'')), 'B') ||
    setweight(to_tsvector('english', coalesce(area,'')), 'C')
  ) stored;

create index idx_agencies_search on agencies using gin (search_tsv);
