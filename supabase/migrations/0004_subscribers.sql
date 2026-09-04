-- Newsletter subscribers.
--
-- Shaped like `leads` on purpose: the public may write, only staff may read.
-- An address list is worth stealing, so nobody holding the anon key can page
-- through it.

create table subscribers (
  id         uuid primary key default gen_random_uuid(),
  email      text not null,
  -- Which popup or form it came from, so we can tell what actually works.
  source     text,
  created_at timestamptz not null default now()
);

-- One row per person. Lowercased in the index as well as in the API, so
-- Foo@example.com and foo@example.com cannot both subscribe.
create unique index subscribers_email_key on subscribers (lower(email));

alter table subscribers enable row level security;

create policy "anyone subscribes"       on subscribers for insert with check (true);
create policy "admin reads subscribers" on subscribers for select using (is_superadmin());
create policy "admin edits subscribers" on subscribers for update using (is_superadmin())
  with check (is_superadmin());
