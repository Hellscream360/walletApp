-- Create wallets table
create table wallets (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  description text,
  total_value numeric default 0,
  currency text default 'USD',
  is_public boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Create indexes for wallets
create index wallets_user_id_idx on wallets(user_id);

-- Enable RLS on wallets
alter table wallets enable row level security;

-- Create wallet policies
create policy "Users can view own wallets"
  on wallets for select
  using (auth.uid() = user_id);

create policy "Users can create wallets"
  on wallets for insert
  with check (auth.uid() = user_id);

create policy "Users can update own wallets"
  on wallets for update
  using (auth.uid() = user_id);

create policy "Users can delete own wallets"
  on wallets for delete
  using (auth.uid() = user_id);

-- Create wallet_assets table
create table wallet_assets (
  id uuid default uuid_generate_v4() primary key,
  wallet_id uuid references wallets(id) on delete cascade not null,
  asset_id text not null,
  asset_symbol text not null,
  asset_name text not null,
  asset_type text not null check (asset_type in ('crypto', 'stock', 'etf', 'forex')),
  asset_provider text not null check (asset_provider in ('coingecko', 'alphavantage')),
  quantity numeric not null check (quantity > 0),
  purchase_price numeric not null check (purchase_price >= 0),
  current_price numeric not null check (current_price >= 0),
  value numeric generated always as (quantity * current_price) stored,
  last_updated timestamp with time zone default timezone('utc'::text, now()),
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Create indexes for wallet_assets
create index wallet_assets_wallet_id_idx on wallet_assets(wallet_id);
create index wallet_assets_asset_symbol_idx on wallet_assets(asset_symbol);

-- Enable RLS on wallet_assets
alter table wallet_assets enable row level security;

-- Create wallet_assets policies
create policy "Users can view own wallet assets"
  on wallet_assets for select
  using (
    exists (
      select 1 from wallets
      where wallets.id = wallet_assets.wallet_id
      and wallets.user_id = auth.uid()
    )
  );

create policy "Users can insert wallet assets"
  on wallet_assets for insert
  with check (
    exists (
      select 1 from wallets
      where wallets.id = wallet_assets.wallet_id
      and wallets.user_id = auth.uid()
    )
  );

create policy "Users can update own wallet assets"
  on wallet_assets for update
  using (
    exists (
      select 1 from wallets
      where wallets.id = wallet_assets.wallet_id
      and wallets.user_id = auth.uid()
    )
  );

create policy "Users can delete own wallet assets"
  on wallet_assets for delete
  using (
    exists (
      select 1 from wallets
      where wallets.id = wallet_assets.wallet_id
      and wallets.user_id = auth.uid()
    )
  );

-- Create trigger for updating wallet updated_at
create function update_wallet_updated_at()
returns trigger as $$
begin
  update wallets
  set updated_at = now()
  where id = new.wallet_id;
  return new;
end;
$$ language plpgsql;

create trigger wallet_assets_update_wallet
after insert or update or delete
on wallet_assets
for each row
execute function update_wallet_updated_at();
