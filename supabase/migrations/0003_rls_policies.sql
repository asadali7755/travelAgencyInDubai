-- 0003_rls_policies.sql
-- RLS on every table, no exceptions. A table without RLS is public to anyone
-- holding the anon key, which ships in the browser bundle.

alter table profiles   enable row level security;
alter table categories enable row level security;
alter table packages   enable row level security;
alter table services   enable row level security;
alter table blog_posts enable row level security;
alter table faqs       enable row level security;
alter table leads      enable row level security;

-- Role check kept in one place so policies stay readable.
create or replace function is_superadmin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from profiles where id = auth.uid() and role = 'superadmin');
$$;

-- Categories are public reference data.
create policy "public reads categories" on categories for select using (true);
create policy "admin writes categories" on categories
  for all using (is_superadmin()) with check (is_superadmin());

-- Public reads only approved, non-deleted content.
create policy "public reads approved packages" on packages
  for select using (status = 'approved' and deleted_at is null);
create policy "admin writes packages" on packages
  for all using (is_superadmin()) with check (is_superadmin());

create policy "public reads approved services" on services
  for select using (status = 'approved' and deleted_at is null);
create policy "guests submit services" on services
  for insert with check (status = 'pending');
create policy "admin writes services" on services
  for all using (is_superadmin()) with check (is_superadmin());

create policy "public reads approved posts" on blog_posts
  for select using (status = 'approved' and deleted_at is null);
create policy "authors read own posts" on blog_posts
  for select using (auth.uid() = author_id);
create policy "guests submit posts" on blog_posts
  for insert with check (
    status = 'pending' and (author_id is null or author_id = auth.uid())
  );
create policy "admin writes posts" on blog_posts
  for all using (is_superadmin()) with check (is_superadmin());

create policy "public reads approved faqs" on faqs
  for select using (status = 'approved' and deleted_at is null);
create policy "guests ask faqs" on faqs
  for insert with check (status = 'pending');
create policy "admin writes faqs" on faqs
  for all using (is_superadmin()) with check (is_superadmin());

-- Leads: write-only for the public. Nobody but staff can read them.
create policy "anyone creates a lead" on leads for insert with check (true);
create policy "admin reads leads"     on leads for select using (is_superadmin());
create policy "admin writes leads"    on leads for update using (is_superadmin()) with check (is_superadmin());

-- Profiles: read own, update own, but never your own role or points.
create policy "read own profile"   on profiles for select using (auth.uid() = id);
create policy "admin reads profiles" on profiles for select using (is_superadmin());
create policy "update own profile" on profiles for update using (auth.uid() = id)
  with check (
    auth.uid() = id
    and role = (select role from profiles where id = auth.uid())
    and points_balance = (select points_balance from profiles where id = auth.uid())
  );
