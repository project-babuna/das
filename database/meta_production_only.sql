-- Run in Supabase SQL Editor before deploying the matching application code.
-- Existing unmarked events remain unsent; do not infer their origin from the
-- hardcoded event_source_url in older payloads.
alter table public.payments
  add column if not exists meta_deployment_environment text;

alter table public.meta_conversion_events
  add column if not exists meta_deployment_environment text;

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
