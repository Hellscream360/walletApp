-- Create profiles table
create table if not exists public.profiles (
    id uuid references auth.users on delete cascade primary key,
    first_name text,
    email text,
    updated_at timestamp with time zone,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for profiles
alter table public.profiles enable row level security;

-- Create policy to allow users to view their own profile
create policy "Users can view own profile" on public.profiles
    for select using (auth.uid() = id);

-- Create policy to allow users to update their own profile
create policy "Users can update own profile" on public.profiles
    for update using (auth.uid() = id);

-- Create wallets table
create table if not exists public.wallets (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references public.profiles(id) on delete cascade,
    name text not null,
    description text,
    categories jsonb default '[]'::jsonb,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for wallets
alter table public.wallets enable row level security;

-- Create policy to allow users to view their own wallets
create policy "Users can view own wallets" on public.wallets
    for select using (auth.uid() = user_id);

-- Create policy to allow users to create their own wallets
create policy "Users can create wallets" on public.wallets
    for insert with check (auth.uid() = user_id);

-- Create policy to allow users to update their own wallets
create policy "Users can update own wallets" on public.wallets
    for update using (auth.uid() = user_id);

-- Create policy to allow users to delete their own wallets
create policy "Users can delete own wallets" on public.wallets
    for delete using (auth.uid() = user_id);
