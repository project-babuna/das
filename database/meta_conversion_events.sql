create extension if not exists pgcrypto;

alter table public.payments add column if not exists meta_fbp text;
alter table public.payments add column if not exists meta_fbc text;
alter table public.payments add column if not exists meta_deployment_environment text;

create table if not exists public.meta_conversion_events (
  event_id text primary key,
  event_name text not null,
  razorpay_order_id text,
  meta_deployment_environment text,
  payload jsonb not null,
  status text not null default 'pending' check (status in ('pending', 'sending', 'sent', 'failed')),
  attempts integer not null default 0,
  locked_until timestamptz,
  sent_at timestamptz,
  error_message text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists meta_purchase_order_once
  on public.meta_conversion_events (razorpay_order_id)
  where event_name = 'Purchase';
create index if not exists meta_conversion_retry
  on public.meta_conversion_events (status, locked_until, created_at);
alter table public.meta_conversion_events add column if not exists meta_deployment_environment text;

alter table public.meta_conversion_events enable row level security;

create or replace function public.queue_clarity_meta_purchase()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.status = 'success' and new.meta_deployment_environment = 'production'
     and new.program_id = 'clarity_session'
     and new.currency = 'INR' and new.amount > 0 then
    insert into public.meta_conversion_events
      (event_id, event_name, razorpay_order_id, meta_deployment_environment, payload)
    values
      ('purchase_' || new.razorpay_order_id, 'Purchase', new.razorpay_order_id,
       new.meta_deployment_environment,
       jsonb_build_object(
         'event_time', extract(epoch from now())::bigint,
         'action_source', 'website',
         'event_source_url', 'https://www.dreamandscale.com/payment-success',
         'custom_data', jsonb_build_object(
           'currency', 'INR', 'value', new.amount / 100.0,
           'content_name', 'Clarity Session', 'order_id', new.razorpay_order_id
         )
       ))
    on conflict (event_id) do nothing;
  end if;
  return new;
end;
$$;

drop trigger if exists queue_clarity_meta_purchase on public.payments;
create trigger queue_clarity_meta_purchase
after insert or update of status on public.payments
for each row execute function public.queue_clarity_meta_purchase();

create or replace function public.claim_meta_conversion(p_event_id text)
returns setof public.meta_conversion_events
language sql
security definer
set search_path = public
as $$
  update public.meta_conversion_events
  set status = 'sending', attempts = attempts + 1,
      locked_until = now() + interval '2 minutes', updated_at = now()
  where event_id = p_event_id
    and meta_deployment_environment = 'production'
    and (status in ('pending', 'failed')
      or (status = 'sending' and locked_until < now()))
  returning *;
$$;

revoke all on function public.claim_meta_conversion(text) from public, anon, authenticated;
grant execute on function public.claim_meta_conversion(text) to service_role;

comment on table public.meta_conversion_events is
  'Server-only Meta Conversions API outbox. Purchase is unique per Razorpay order.';
