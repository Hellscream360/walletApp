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

-- Create policy to allow users to insert their own profile
create policy "Users can insert own profile" on public.profiles
    for insert with check (auth.uid() = id);
