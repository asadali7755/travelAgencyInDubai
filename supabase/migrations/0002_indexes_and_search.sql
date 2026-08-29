-- 0002_indexes_and_search.sql
-- Partial indexes for public listings, moderation queues and the leads dashboard,
-- plus full-text search on packages. Added with the tables, not after the site is slow.

-- Listing pages: filter by status + category, order by date. Soft-deleted rows excluded.
create index idx_packages_live on packages (status, category_id, published_at desc)
  where status = 'approved' and deleted_at is null;

create index idx_services_live on services (status, category_id, emirate)
  where status = 'approved' and deleted_at is null;

create index idx_blog_live on blog_posts (status, published_at desc)
  where status = 'approved' and deleted_at is null;

create index idx_faqs_live on faqs (status, helpful_count desc)
  where status = 'approved' and deleted_at is null;

-- Admin moderation queue
create index idx_blog_pending on blog_posts (created_at) where status = 'pending';
create index idx_faqs_pending on faqs (created_at) where status = 'pending';
create index idx_services_pending on services (created_at) where status = 'pending';

-- Leads dashboard
create index idx_leads_status_created on leads (status, created_at desc);

-- Full-text search. Beats ILIKE '%term%', which cannot use a normal index.
alter table packages add column search_tsv tsvector
  generated always as (
    setweight(to_tsvector('english', coalesce(title,'')), 'A') ||
    setweight(to_tsvector('english', coalesce(summary,'')), 'B') ||
    setweight(to_tsvector('english', coalesce(city,'')), 'B')
  ) stored;

create index idx_packages_search on packages using gin (search_tsv);

alter table services add column search_tsv tsvector
  generated always as (
    setweight(to_tsvector('english', coalesce(name,'')), 'A') ||
    setweight(to_tsvector('english', coalesce(summary,'')), 'B') ||
    setweight(to_tsvector('english', coalesce(area,'')), 'B')
  ) stored;

create index idx_services_search on services using gin (search_tsv);
