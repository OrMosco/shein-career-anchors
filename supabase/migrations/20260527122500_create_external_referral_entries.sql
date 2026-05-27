create extension if not exists "pgcrypto";

create table if not exists public.external_referral_entries (
  visitor_id uuid primary key default gen_random_uuid(),
  referrer_url text not null,
  referrer_host text not null,
  landing_path text not null,
  created_at timestamp with time zone not null default now()
);

alter table public.external_referral_entries enable row level security;

create policy "Allow anonymous insert of referral entries"
  on public.external_referral_entries
  for insert
  to anon
  with check (true);
