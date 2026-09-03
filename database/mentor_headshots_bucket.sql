insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'mentor-headshots',
  'mentor-headshots',
  false,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

alter table public.queries
add column if not exists headshot_path text;

comment on column public.queries.headshot_path is
  'Private object path in the mentor-headshots Supabase Storage bucket.';
