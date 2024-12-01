-- Remove email column from profiles table as it's redundant with auth.users
alter table public.profiles drop column if exists email;
