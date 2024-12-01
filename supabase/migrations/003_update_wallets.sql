-- Update wallets table to ensure categories is always a valid JSON array

-- First, update any non-array or null categories to empty array
update wallets 
set categories = '[]'::jsonb 
where categories is null 
   or jsonb_typeof(categories) != 'array';

-- Now we can safely alter the column
alter table wallets 
    alter column categories set default '[]'::jsonb,
    alter column categories set not null;

-- Add check constraint to ensure future inserts/updates have array categories
alter table wallets
    add constraint categories_is_array 
    check (jsonb_typeof(categories) = 'array');
