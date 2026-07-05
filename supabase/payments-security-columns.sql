alter table public.payments
add column if not exists program_id text,
add column if not exists expected_amount integer,
add column if not exists expected_currency text default 'INR';
