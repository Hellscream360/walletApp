-- Drop existing wallets table if it exists
drop table if exists public.wallets;

-- Create wallets table with correct structure
create table public.wallets (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references public.profiles(id) on delete cascade,
    name text not null,
    description text,
    categories jsonb default '[]'::jsonb,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.wallets enable row level security;

-- Create policies
create policy "Users can view own wallets" on public.wallets
    for select using (auth.uid() = user_id);

create policy "Users can create wallets" on public.wallets
    for insert with check (auth.uid() = user_id);

create policy "Users can update own wallets" on public.wallets
    for update using (auth.uid() = user_id);

create policy "Users can delete own wallets" on public.wallets
    for delete using (auth.uid() = user_id);
