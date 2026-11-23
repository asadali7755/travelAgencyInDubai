-- 0009_agency_creator_access.sql
-- Registering a company failed with "new row violates row-level security policy
-- for table agencies". Two gaps in 0007, both hit by POST /api/agencies:
--
-- 1. The route inserts with .select(), so Postgres must also pass a SELECT
--    policy to return the row. A pending company is readable only by its
--    members, and the creator is not a member until the next statement.
-- 2. That next statement adds the creator to agency_members, but only an
--    existing owner (or a superadmin) may insert members, so the first owner
--    could never be added.
--
-- Additive only: two policies and two helper functions. Nothing is dropped.

-- SECURITY DEFINER for the same reason as is_agency_member in 0007: the
-- agency_members policy below must look at agencies and agency_members without
-- running into their own policies.
create or replace function is_agency_creator(target uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from agencies
    where id = target and created_by = auth.uid() and deleted_at is null
  );
$$;

create or replace function agency_has_members(target uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from agency_members where agency_id = target);
$$;

-- The creator can read the company they registered, whatever its status.
-- Moderation columns stay frozen: this grants SELECT only.
create policy "creators read own agency" on agencies
  for select to authenticated
  using (created_by = auth.uid() and deleted_at is null);

-- The creator may make themselves the first owner, once. After that the
-- company has a member and "owners manage members" from 0007 takes over, so
-- this cannot be used to rejoin a company someone else now runs.
create policy "creator becomes first owner" on agency_members
  for insert to authenticated
  with check (
    user_id = auth.uid()
    and member_role = 'owner'
    and is_agency_creator(agency_id)
    and not agency_has_members(agency_id)
  );
