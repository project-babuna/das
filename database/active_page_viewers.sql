-- Run once in the Supabase SQL Editor before enabling the viewer indicator.
-- A row represents one anonymous browser on one eligible page.
create table if not exists public.active_page_viewers (
  page_key text not null,
  viewer_id uuid not null,
  last_seen_at timestamptz not null default now(),
  primary key (page_key, viewer_id),
  constraint active_page_viewers_allowed_page check (
    page_key in (
      '/',
      '/clarity-session',
      '/full-program',
      '/learn-with-mentorship',
      '/programs/incubation',
      '/programs/accelerator',
      '/programs/scale-up'
    )
  )
);

create index if not exists active_page_viewers_recent
  on public.active_page_viewers (page_key, last_seen_at desc);
create index if not exists active_page_viewers_cleanup
  on public.active_page_viewers (last_seen_at);

alter table public.active_page_viewers enable row level security;
revoke all on public.active_page_viewers from anon, authenticated;

-- The heartbeat route occasionally deletes rows older than one day.
