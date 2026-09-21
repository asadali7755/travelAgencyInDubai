-- 0005_agency_role.sql
-- Adds the 'agency' role on its own.
--
-- ALTER TYPE ... ADD VALUE cannot be used in the same transaction that added it,
-- and Supabase runs each migration file in one transaction. So the value is
-- added here and first *used* in 0006. Splitting the file is the whole point of
-- this migration; there is nothing else in it.
--
-- Additive only: no existing value is renamed or removed, so every row that
-- already says 'user', 'editor' or 'superadmin' is untouched.

alter type user_role add value if not exists 'agency';
