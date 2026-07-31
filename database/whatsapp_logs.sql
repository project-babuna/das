create extension if not exists pgcrypto;

create table if not exists public.whatsapp_logs (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id) on delete set null,
  payment_id uuid references public.payments(id) on delete set null,
  recipient text not null,
  message_type text not null,
  template_name text not null,
  status text not null default 'processing',
  provider text not null default 'meta_whatsapp_cloud_api',
  provider_message_id text unique,
  media_id text,
  idempotency_key text not null unique,
  sent_at timestamptz,
  error_message text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists whatsapp_logs_lead_id_idx on public.whatsapp_logs(lead_id);
create index if not exists whatsapp_logs_payment_id_idx on public.whatsapp_logs(payment_id);
create index if not exists whatsapp_logs_created_at_idx on public.whatsapp_logs(created_at desc);
create index if not exists whatsapp_logs_status_idx on public.whatsapp_logs(status);

alter table public.whatsapp_logs enable row level security;

comment on table public.whatsapp_logs is
  'Server-only transactional WhatsApp audit log. Accessed with the Supabase service role.';
