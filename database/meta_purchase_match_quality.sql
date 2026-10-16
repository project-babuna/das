-- Optional enrichment for future purchases. Existing payments remain unchanged.
alter table public.payments add column if not exists meta_client_ip text;
alter table public.payments add column if not exists meta_client_user_agent text;
alter table public.payments add column if not exists meta_event_source_url text;
alter table public.payments add column if not exists meta_referrer_url text;
