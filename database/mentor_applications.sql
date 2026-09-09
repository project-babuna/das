create table if not exists public.mentor_applications (
  id uuid primary key,
  full_name_role text not null,
  email text not null,
  linkedin_profile text,
  superpowers text[] not null default '{}',
  other_superpower text,
  founder_thoughts text not null,
  mentorship_model text not null,
  session_fee text not null,
  time_commitment text not null,
  consent text not null,
  other_questions text,
  cloudinary_asset_id text unique not null,
  cloudinary_public_id text unique not null,
  cloudinary_version bigint not null,
  cloudinary_format text not null,
  cloudinary_resource_type text not null default 'image',
  cloudinary_delivery_type text not null default 'authenticated',
  headshot_original_name text,
  headshot_size_bytes bigint not null,
  headshot_width integer,
  headshot_height integer,
  status text not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint mentor_application_status_check
    check (status in ('new', 'in_progress', 'approved', 'declined', 'closed')),
  constraint mentor_application_consent_check
    check (consent in ('Yes', 'No', 'Only on the website')),
  constraint mentor_application_headshot_size_check
    check (headshot_size_bytes > 0 and headshot_size_bytes <= 10485760)
);

create index if not exists mentor_applications_created_at_idx
  on public.mentor_applications (created_at desc);

create index if not exists mentor_applications_status_idx
  on public.mentor_applications (status);

alter table public.mentor_applications enable row level security;

revoke all on table public.mentor_applications from anon, authenticated;

comment on table public.mentor_applications is
  'Mentor and knowledge-partner submissions. Headshots are stored as authenticated Cloudinary assets.';

comment on column public.mentor_applications.cloudinary_asset_id is
  'Cloudinary immutable asset reference.';

comment on column public.mentor_applications.cloudinary_public_id is
  'Cloudinary delivery and management identifier.';
