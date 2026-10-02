-- ============================================================
-- Nonkz Membership - Supabase schema + seed
-- Run this in: Supabase Dashboard -> SQL Editor -> New query -> Run
-- Safe to re-run (uses IF NOT EXISTS / ON CONFLICT where possible).
-- ============================================================

-- ---------- Reference / shared tables (public catalog) ----------

create table if not exists public.promos (
  id text primary key,
  discount text not null,
  title text not null,
  description text,
  color text,
  expiry text,
  code text,
  created_at timestamptz default now()
);

create table if not exists public.rewards (
  id text primary key,
  name text not null,
  cost integer not null,
  icon text,
  created_at timestamptz default now()
);

create table if not exists public.outlets (
  id text primary key,
  name text not null,
  address text,
  distance text,
  hours text,
  is_open boolean default true,
  created_at timestamptz default now()
);

-- ---------- Per-user tables ----------

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  initial text,
  tier text default 'Classic',
  next_tier text default 'Signature',
  points integer default 0,
  coupons integer default 0,
  card_number text,
  member_id text,
  spend_to_next_level integer default 800000,
  tier_progress numeric default 0.0,
  profile_completion numeric default 0.5,
  phone text,
  email text,
  joined text,
  created_at timestamptz default now()
);

create table if not exists public.vouchers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  title text not null,
  description text,
  expiry text,
  status text default 'active',  -- active | used
  color text,
  created_at timestamptz default now()
);

create table if not exists public.orders (
  id text primary key,
  user_id uuid references auth.users(id) on delete cascade,
  date text,
  outlet text,
  status text default 'selesai',  -- selesai | diproses
  total integer default 0,
  created_at timestamptz default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id text references public.orders(id) on delete cascade,
  name text not null,
  qty integer default 1,
  price integer default 0
);

create table if not exists public.point_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  label text,
  date text,
  amount integer,
  created_at timestamptz default now()
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  icon text,
  color text,
  title text,
  body text,
  time text,
  unread boolean default true,
  created_at timestamptz default now()
);

-- ============================================================
-- Row Level Security
-- ============================================================

alter table public.profiles       enable row level security;
alter table public.vouchers       enable row level security;
alter table public.orders         enable row level security;
alter table public.order_items    enable row level security;
alter table public.point_history  enable row level security;
alter table public.notifications  enable row level security;
alter table public.promos         enable row level security;
alter table public.rewards        enable row level security;
alter table public.outlets        enable row level security;

-- Public catalog: readable by anyone (incl. anon)
do $$ begin
  create policy "promos readable"  on public.promos  for select using (true);
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "rewards readable" on public.rewards for select using (true);
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "outlets readable" on public.outlets for select using (true);
exception when duplicate_object then null; end $$;

-- Profiles: owner can read/update/insert own row
do $$ begin
  create policy "own profile select" on public.profiles for select using (auth.uid() = id);
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "own profile update" on public.profiles for update using (auth.uid() = id);
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "own profile insert" on public.profiles for insert with check (auth.uid() = id);
exception when duplicate_object then null; end $$;

-- Generic per-user tables: owner can read own rows
do $$ begin
  create policy "own vouchers"      on public.vouchers      for select using (auth.uid() = user_id);
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "own orders"        on public.orders        for select using (auth.uid() = user_id);
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "own point history" on public.point_history for select using (auth.uid() = user_id);
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "own notifications" on public.notifications for select using (auth.uid() = user_id);
exception when duplicate_object then null; end $$;
-- order_items: readable if the parent order belongs to the user
do $$ begin
  create policy "own order items" on public.order_items for select using (
    exists (select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid())
  );
exception when duplicate_object then null; end $$;

-- ============================================================
-- Auto-provision profile + sample data on new signup
-- ============================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  uname text;
  uinit text;
  card  text;
  mid   text;
begin
  uname := coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1));
  uinit := upper(left(uname, 1));
  mid   := lpad((floor(random() * 100000000000))::bigint::text, 11, '0');
  card  := 'NKZ ' || substr(mid,1,4) || ' ' || substr(mid,5,4) || ' ' || substr(mid,9,3);

  insert into public.profiles (id, name, initial, tier, next_tier, points, coupons,
    card_number, member_id, spend_to_next_level, tier_progress, profile_completion,
    phone, email, joined)
  values (new.id, uname, uinit, 'Classic', 'Signature', 1250, 3,
    card, mid, 800000, 0.28, 0.75,
    '0812-3456-7890', new.email, to_char(now(), 'Mon YYYY'));

  -- sample vouchers
  insert into public.vouchers (user_id, title, description, expiry, status, color) values
    (new.id, 'Diskon Rp 10.000', 'Min. transaksi Rp 50.000', '31 Okt 2026', 'active', '#2F56D8'),
    (new.id, 'Gratis Ongkir', 'Untuk pengiriman dalam kota', '10 Nov 2026', 'active', '#1BA784'),
    (new.id, 'Diskon 20%', 'Khusus menu Ube Series', '20 Okt 2026', 'active', '#7C5CFC'),
    (new.id, 'Cashback Rp 15.000', 'Sudah digunakan', '01 Sep 2026', 'used', '#8A90A6');

  -- sample point history
  insert into public.point_history (user_id, label, date, amount) values
    (new.id, 'Belanja di Senayan', '30 Sep 2026', 78),
    (new.id, 'Tukar Free Americano', '29 Sep 2026', -800),
    (new.id, 'Belanja di Kemang', '28 Sep 2026', 45),
    (new.id, 'Bonus Referal', '27 Sep 2026', 250),
    (new.id, 'Belanja di BSD', '25 Sep 2026', 60);

  -- sample notifications
  insert into public.notifications (user_id, icon, color, title, body, time, unread) values
    (new.id, 'pricetags', '#E23744', 'Promo Ube Series!', 'Beli 1 gratis 1 untuk semua menu Ube Series. Berlaku sampai 20 Okt.', '2 jam lalu', true),
    (new.id, 'pricetag', '#F7B733', 'Poin bertambah', 'Kamu mendapat +78 poin dari transaksi di Nonkz Senayan.', '1 hari lalu', true),
    (new.id, 'gift', '#7C5CFC', 'Bonus referal masuk', 'Teman kamu bergabung! +250 poin ditambahkan ke saldo.', '3 hari lalu', false),
    (new.id, 'heart', '#2F56D8', 'Selamat datang di Nonkz!', 'Lengkapi profil kamu untuk mendapatkan reward spesial.', '5 hari lalu', false);

  -- sample orders + items
  insert into public.orders (id, user_id, date, outlet, status, total) values
    ('ORD-' || substr(new.id::text,1,8) || '-1', new.id, '30 Sep 2026', 'Nonkz Coffee - Senayan', 'selesai', 78000),
    ('ORD-' || substr(new.id::text,1,8) || '-2', new.id, '28 Sep 2026', 'Nonkz Coffee - Kemang', 'selesai', 45000),
    ('ORD-' || substr(new.id::text,1,8) || '-3', new.id, '25 Sep 2026', 'Nonkz Coffee - BSD', 'diproses', 60000);

  insert into public.order_items (order_id, name, qty, price) values
    ('ORD-' || substr(new.id::text,1,8) || '-1', 'Ube Latte', 2, 30000),
    ('ORD-' || substr(new.id::text,1,8) || '-1', 'Matcha Ube', 1, 18000),
    ('ORD-' || substr(new.id::text,1,8) || '-2', 'Dirty Ube', 1, 45000),
    ('ORD-' || substr(new.id::text,1,8) || '-3', 'Strawberry Ube Latte', 1, 32000),
    ('ORD-' || substr(new.id::text,1,8) || '-3', 'Coconut Ube Cloud', 1, 28000);

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- Seed public catalog (promos, rewards, outlets)
-- ============================================================

insert into public.promos (id, discount, title, description, color, expiry, code) values
  ('p1', '20%',     'Diskon Minuman',       'Berlaku untuk semua menu minuman dingin.',          '#2F56D8', '31 Okt 2026', 'NONKZ20'),
  ('p2', 'Rp 10rb', 'Cashback Poin',        'Dapatkan cashback poin untuk transaksi min. Rp 50.000.', '#1BA784', '15 Nov 2026', 'CASH10'),
  ('p3', 'Buy 1',   'Get 1 Free',           'Beli 1 gratis 1 untuk menu Ube Series.',            '#E23744', '20 Okt 2026', 'UBE1GET1'),
  ('p4', '15%',     'Diskon Member Baru',   'Khusus member baru di 7 hari pertama.',             '#7C5CFC', '30 Nov 2026', 'WELCOME15')
on conflict (id) do update set
  discount = excluded.discount, title = excluded.title, description = excluded.description,
  color = excluded.color, expiry = excluded.expiry, code = excluded.code;

insert into public.rewards (id, name, cost, icon) values
  ('r1', 'Voucher Rp 10.000', 500,  'cash-outline'),
  ('r2', 'Free Americano',    800,  'cafe-outline'),
  ('r3', 'Free Ube Latte',    1200, 'cafe-outline'),
  ('r4', 'Voucher Rp 25.000', 1500, 'cash-outline'),
  ('r5', 'Tumbler Eksklusif', 3000, 'gift-outline'),
  ('r6', 'Voucher Rp 50.000', 2800, 'cash-outline')
on conflict (id) do update set
  name = excluded.name, cost = excluded.cost, icon = excluded.icon;

insert into public.outlets (id, name, address, distance, hours, is_open) values
  ('o1', 'Nonkz Coffee - Senayan', 'Jl. Asia Afrika No. 8, Jakarta Pusat', '1.2 km',  '08.00 - 22.00', true),
  ('o2', 'Nonkz Coffee - Kemang',  'Jl. Kemang Raya No. 12, Jakarta Selatan', '3.5 km', '08.00 - 23.00', true),
  ('o3', 'Nonkz Coffee - BSD',     'ICE BSD City, Tangerang', '12.8 km', '09.00 - 22.00', true),
  ('o4', 'Nonkz Coffee - Bandung', 'Jl. Braga No. 45, Bandung', '128 km', '08.00 - 21.00', false)
on conflict (id) do update set
  name = excluded.name, address = excluded.address, distance = excluded.distance,
  hours = excluded.hours, is_open = excluded.is_open;
