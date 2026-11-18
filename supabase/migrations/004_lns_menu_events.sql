-- Le New Select — nouvelle carte, plats du jour datés et événements.
-- Complément de 001_lns_site_content.sql. À exécuter dans le SQL Editor Supabase.
-- Aucune donnée existante n'est supprimée ni écrasée par cette migration.

-- ---------------------------------------------------------------------------
-- 1. Extension de la table des plats
-- ---------------------------------------------------------------------------

alter table public.lns_menu_items
  add column if not exists category_id text,
  add column if not exists price_options jsonb not null default '[]'::jsonb;

-- ---------------------------------------------------------------------------
-- 2. Nouvelles tables
-- ---------------------------------------------------------------------------

create table if not exists public.lns_menu_categories (
  id text primary key,
  name text not null,
  description text not null default '',
  is_visible boolean not null default true,
  sort_order integer not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.lns_daily_specials (
  id text primary key,
  title text not null default 'Plat du jour du chef',
  dish_name text not null,
  description text not null default '',
  price_kmf integer not null default 0,
  image_url text,
  start_date date not null,
  end_date date not null,
  availability text,
  is_visible boolean not null default true,
  sort_order integer not null default 0,
  updated_at timestamptz not null default now(),
  constraint lns_daily_specials_dates check (end_date >= start_date)
);

create table if not exists public.lns_event_categories (
  id text primary key,
  name text not null,
  description text not null default '',
  is_visible boolean not null default true,
  sort_order integer not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.lns_events (
  id text primary key,
  title text not null,
  description text not null default '',
  category_id text,
  category_label text not null default '',
  event_date date not null,
  end_date date,
  time text,
  location text,
  price_kmf integer,
  image_url text,
  ticket_price_kmf integer,
  tickets_available integer,
  ticket_sale_points text,
  ticketing_url text,
  is_visible boolean not null default true,
  sort_order integer not null default 0,
  updated_at timestamptz not null default now(),
  constraint lns_events_dates check (end_date is null or end_date >= event_date)
);

-- Billetterie : ajoutées même si la table existait déjà.
alter table public.lns_events
  add column if not exists ticket_price_kmf integer,
  add column if not exists tickets_available integer,
  add column if not exists ticket_sale_points text,
  add column if not exists ticketing_url text;

-- ---------------------------------------------------------------------------
-- 3. Horodatage automatique
-- ---------------------------------------------------------------------------

drop trigger if exists lns_menu_categories_updated_at on public.lns_menu_categories;
create trigger lns_menu_categories_updated_at before update on public.lns_menu_categories
for each row execute function public.lns_set_updated_at();

drop trigger if exists lns_daily_specials_updated_at on public.lns_daily_specials;
create trigger lns_daily_specials_updated_at before update on public.lns_daily_specials
for each row execute function public.lns_set_updated_at();

drop trigger if exists lns_event_categories_updated_at on public.lns_event_categories;
create trigger lns_event_categories_updated_at before update on public.lns_event_categories
for each row execute function public.lns_set_updated_at();

drop trigger if exists lns_events_updated_at on public.lns_events;
create trigger lns_events_updated_at before update on public.lns_events
for each row execute function public.lns_set_updated_at();

-- ---------------------------------------------------------------------------
-- 4. Sécurité : même modèle que les autres tables lns_
-- ---------------------------------------------------------------------------

alter table public.lns_menu_categories enable row level security;
alter table public.lns_daily_specials enable row level security;
alter table public.lns_event_categories enable row level security;
alter table public.lns_events enable row level security;

grant select on public.lns_menu_categories to anon, authenticated;
grant select on public.lns_daily_specials to anon, authenticated;
grant select on public.lns_event_categories to anon, authenticated;
grant select on public.lns_events to anon, authenticated;
grant all on public.lns_menu_categories to authenticated;
grant all on public.lns_daily_specials to authenticated;
grant all on public.lns_event_categories to authenticated;
grant all on public.lns_events to authenticated;

drop policy if exists "lns_public_read_menu_categories" on public.lns_menu_categories;
create policy "lns_public_read_menu_categories" on public.lns_menu_categories
for select to anon, authenticated using (is_visible);

drop policy if exists "lns_public_read_daily_specials" on public.lns_daily_specials;
create policy "lns_public_read_daily_specials" on public.lns_daily_specials
for select to anon, authenticated using (is_visible);

drop policy if exists "lns_public_read_event_categories" on public.lns_event_categories;
create policy "lns_public_read_event_categories" on public.lns_event_categories
for select to anon, authenticated using (is_visible);

drop policy if exists "lns_public_read_events" on public.lns_events;
create policy "lns_public_read_events" on public.lns_events
for select to anon, authenticated using (is_visible);

drop policy if exists "lns_admin_all_menu_categories" on public.lns_menu_categories;
create policy "lns_admin_all_menu_categories" on public.lns_menu_categories
for all to authenticated using (public.lns_is_admin()) with check (public.lns_is_admin());

drop policy if exists "lns_admin_all_daily_specials" on public.lns_daily_specials;
create policy "lns_admin_all_daily_specials" on public.lns_daily_specials
for all to authenticated using (public.lns_is_admin()) with check (public.lns_is_admin());

drop policy if exists "lns_admin_all_event_categories" on public.lns_event_categories;
create policy "lns_admin_all_event_categories" on public.lns_event_categories
for all to authenticated using (public.lns_is_admin()) with check (public.lns_is_admin());

drop policy if exists "lns_admin_all_events" on public.lns_events;
create policy "lns_admin_all_events" on public.lns_events
for all to authenticated using (public.lns_is_admin()) with check (public.lns_is_admin());

-- ---------------------------------------------------------------------------
-- 5. Realtime
-- ---------------------------------------------------------------------------

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'lns_menu_categories', 'lns_daily_specials',
    'lns_events', 'lns_event_categories'
  ] loop
    if not exists (
      select 1 from pg_publication_tables
      where pubname = 'supabase_realtime'
        and schemaname = 'public'
        and tablename = table_name
    ) then
      execute format('alter publication supabase_realtime add table public.%I', table_name);
    end if;
  end loop;
end $$;
