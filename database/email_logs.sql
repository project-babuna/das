create extension if not exists pgcrypto;

create table if not exists public.email_logs (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id) on delete set null,
  payment_id uuid references public.payments(id) on delete set null,
  program_id text,
  email_type text not null,
  recipient text not null,
  subject text not null,
  status text not null default 'processing',
  provider text not null default 'resend',
  provider_message_id text unique,
  idempotency_key text not null unique,
  scheduled_for timestamptz,
  sent_at timestamptz,
  last_event_at timestamptz,
  last_webhook_id text,
  error_message text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists email_logs_lead_id_idx on public.email_logs(lead_id);
create index if not exists email_logs_payment_id_idx on public.email_logs(payment_id);
create index if not exists email_logs_created_at_idx on public.email_logs(created_at desc);
create index if not exists email_logs_status_idx on public.email_logs(status);
create index if not exists email_logs_type_idx on public.email_logs(email_type);

alter table public.email_logs enable row level security;

comment on table public.email_logs is
  'Server-only transactional email audit log. Accessed with the Supabase service role.';
