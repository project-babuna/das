create table if not exists public.queries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  phone text,
  question text not null,
  message text,
  source_page text,
  status text default 'new',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.queries
add column if not exists name text,
add column if not exists email text,
add column if not exists phone text,
add column if not exists question text,
add column if not exists message text,
add column if not exists source_page text,
add column if not exists status text default 'new',
add column if not exists created_at timestamptz default now(),
add column if not exists updated_at timestamptz default now();

create table if not exists public.contact_queries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  phone text,
  question text,
  message text,
  source_page text,
  status text default 'new',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.contact_queries
add column if not exists name text,
add column if not exists email text,
add column if not exists phone text,
add column if not exists question text,
add column if not exists message text,
add column if not exists source_page text,
add column if not exists status text default 'new',
add column if not exists created_at timestamptz default now(),
add column if not exists updated_at timestamptz default now();
