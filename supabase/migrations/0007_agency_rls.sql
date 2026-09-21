-- 0007_agency_rls.sql
-- RLS for everything added in 0006. A table without RLS is readable by anyone
-- holding the anon key, and the anon key ships in the browser bundle.
--
-- The rules in one sentence: the public sees approved, non-deleted companies;
-- a member sees and edits their own company whatever its status; a superadmin
-- sees everything; nobody but a superadmin can set is_verified or status.

alter table agencies          enable row level security;
alter table agency_members    enable row level security;
alter table agency_documents  enable row level security;
alter table moderation_events enable row level security;

-- Membership test, kept in one place so the policies below stay readable.
-- SECURITY DEFINER because the policy on agency_members would otherwise recurse
-- into itself while deciding whether you may read agency_members.
create or replace function is_agency_member(target uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from agency_members
    where agency_id = target and user_id = auth.uid()
  );
$$;

create or replace function is_agency_owner(target uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from agency_members
    where agency_id = target and user_id = auth.uid() and member_role = 'owner'
  );
$$;

-- ---------------------------------------------------------------------------
-- agencies
-- ---------------------------------------------------------------------------
create policy "public reads approved agencies" on agencies
  for select using (status = 'approved' and deleted_at is null);

create policy "members read own agency" on agencies
  for select using (is_agency_member(id));

create policy "admin reads agencies" on agencies
  for select using (is_superadmin());

-- A signed-in user may register a company, but only as pending and unverified.
-- Without the status check in WITH CHECK, anyone could insert status='approved'
-- and appear in the public directory without ever being reviewed.
create policy "users register an agency" on agencies
  for insert to authenticated
  with check (
    auth.uid() is not null
    and status = 'pending'
    and is_verified = false
    and created_by = auth.uid()
  );

-- Owners edit their own profile copy, but the moderation columns are frozen:
-- the new row must carry the same status, verification and review note as the
-- old one. Changing those is a superadmin action and goes through the API.
create policy "owners update own agency" on agencies
  for update using (is_agency_owner(id) and deleted_at is null)
  with check (
    is_agency_owner(id)
    and status     = (select a.status      from agencies a where a.id = agencies.id)
    and is_verified = (select a.is_verified from agencies a where a.id = agencies.id)
  );

create policy "admin writes agencies" on agencies
  for all using (is_superadmin()) with check (is_superadmin());

-- ---------------------------------------------------------------------------
-- agency_members
-- ---------------------------------------------------------------------------
create policy "members read own membership" on agency_members
  for select using (user_id = auth.uid() or is_agency_member(agency_id));

create policy "owners manage members" on agency_members
  for all using (is_agency_owner(agency_id)) with check (is_agency_owner(agency_id));

create policy "admin manages members" on agency_members
  for all using (is_superadmin()) with check (is_superadmin());

-- ---------------------------------------------------------------------------
-- agency_documents
--
-- Only public documents on an approved company are readable by the public. A
-- trade licence scan is never public, which is why is_public defaults to false.
-- ---------------------------------------------------------------------------
create policy "public reads public documents" on agency_documents
  for select using (
    is_public
    and deleted_at is null
    and exists (
      select 1 from agencies a
      where a.id = agency_id and a.status = 'approved' and a.deleted_at is null
    )
  );

create policy "members read own documents" on agency_documents
  for select using (is_agency_member(agency_id));

create policy "members upload documents" on agency_documents
  for insert to authenticated
  with check (is_agency_member(agency_id) and uploaded_by = auth.uid());

-- Soft delete only: this is an UPDATE policy, and there is deliberately no
-- DELETE policy for anyone. Removing a licence scan after a dispute has started
-- is exactly what the audit log exists to prevent.
create policy "members soft-delete own documents" on agency_documents
  for update using (is_agency_member(agency_id)) with check (is_agency_member(agency_id));

create policy "admin reads all documents" on agency_documents
  for select using (is_superadmin());

-- ---------------------------------------------------------------------------
-- moderation_events — append-only.
-- Insert is service-role only (no policy grants it to a client). Select is
-- staff-only. There is no update and no delete policy for anybody, including
-- superadmins: the log is the evidence when a decision is challenged.
-- ---------------------------------------------------------------------------
create policy "admin reads moderation log" on moderation_events
  for select using (is_superadmin());

-- ---------------------------------------------------------------------------
-- The new columns on the existing tables need matching visibility.
-- Agencies must be able to see and edit their own listings and their own leads.
-- ---------------------------------------------------------------------------
create policy "members read own services" on services
  for select using (agency_id is not null and is_agency_member(agency_id));

create policy "members submit services" on services
  for insert to authenticated
  with check (is_agency_member(agency_id) and status = 'pending');

create policy "members update own services" on services
  for update using (is_agency_member(agency_id) and deleted_at is null)
  with check (
    is_agency_member(agency_id)
    and status = (select s.status from services s where s.id = services.id)
  );

create policy "members read own packages" on packages
  for select using (agency_id is not null and is_agency_member(agency_id));

create policy "members submit packages" on packages
  for insert to authenticated
  with check (is_agency_member(agency_id) and status = 'pending');

create policy "members update own packages" on packages
  for update using (is_agency_member(agency_id) and deleted_at is null)
  with check (
    is_agency_member(agency_id)
    and status = (select p.status from packages p where p.id = packages.id)
  );

-- An agency reads the enquiries routed to it, and nothing else. `leads` still
-- has no public SELECT policy, so this is the only non-admin read path.
create policy "members read own leads" on leads
  for select using (agency_id is not null and is_agency_member(agency_id));

-- A signed-in visitor reads their own enquiry history and nothing else. There
-- is still no public SELECT policy on `leads`, so an anonymous enquiry stays
-- unreadable by anyone but staff.
create policy "users read own leads" on leads
  for select using (user_id is not null and user_id = auth.uid());
