-- 0008_storage_and_categories.sql
-- The private bucket agency uploads land in, its policies, and the seed rows
-- for the services directory.
--
-- The bucket is private. Trade licence scans and insurance certificates go into
-- it, and a public bucket would put them one guessed URL away from anybody. The
-- app serves them through short-lived signed URLs instead — see
-- app/api/agency/documents/[id]/route.ts.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'agency-uploads',
  'agency-uploads',
  false,
  10485760, -- 10 MB. A trade licence PDF is under 1 MB; a brochure is a few.
  array[
    'image/jpeg','image/png','image/webp',
    'application/pdf'
  ]
)
on conflict (id) do nothing;

-- Objects are namespaced by agency id: agency-uploads/<agency_id>/<uuid>.<ext>.
-- Every policy below keys off that first path segment, so a member can never
-- read or write inside another company's folder.
create policy "members read own uploads" on storage.objects
  for select to authenticated
  using (
    bucket_id = 'agency-uploads'
    and is_agency_member((storage.foldername(name))[1]::uuid)
  );

create policy "members write own uploads" on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'agency-uploads'
    and is_agency_member((storage.foldername(name))[1]::uuid)
  );

create policy "members replace own uploads" on storage.objects
  for update to authenticated
  using (
    bucket_id = 'agency-uploads'
    and is_agency_member((storage.foldername(name))[1]::uuid)
  );

create policy "admin reads all uploads" on storage.objects
  for select to authenticated
  using (bucket_id = 'agency-uploads' and is_superadmin());

-- ---------------------------------------------------------------------------
-- Directory categories. `categories` already exists from 0001 and is public
-- reference data; these are the rows the services directory is built on.
-- Idempotent on slug so re-running the migration is harmless.
-- ---------------------------------------------------------------------------
insert into categories (slug, name, kind, position) values
  ('tour-operators',   'Tour operators',        'tour',      10),
  ('visa-services',    'Visa & PRO services',   'visa',      20),
  ('hotels',           'Hotels & apartments',   'hotel',     30),
  ('transport',        'Transport & car hire',  'transport', 40),
  ('law-firms',        'Law firms',             'law',       50),
  ('clinics',          'Clinics & medical',     'medical',   60),
  ('spas',             'Spas & salons',         'spa',       70),
  ('movers',           'Movers & logistics',    'moving',    80),
  ('other-services',   'Other services',        'other',     90)
on conflict (slug) do nothing;
