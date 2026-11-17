-- Le New Select — contenu éditable du site.
-- Tout est préfixé `lns_` : cette migration n'affecte aucune table, policy ou
-- image du projet restaurant déjà présent dans ce projet Supabase.
-- À exécuter une seule fois dans le SQL Editor de Supabase.

-- ---------------------------------------------------------------------------
-- 1. Tables
-- ---------------------------------------------------------------------------

create table if not exists public.lns_site_settings (
  id text primary key default 'main' check (id = 'main'),
  name text not null default 'Le New Select',
  tagline text,
  address text,
  country text,
  phone_display text,
  phone_href text,
  whatsapp_href text,
  email text,
  hours_summary text,
  latitude double precision,
  longitude double precision,
  directions_url text,
  hero_image_url text,
  chef_title text,
  chef_subtitle text,
  chef_dish_name text,
  chef_price_kmf integer,
  chef_availability text,
  updated_at timestamptz not null default now()
);

create table if not exists public.lns_menu_items (
  id text primary key,
  name text not null,
  description text not null default '',
  price_kmf integer not null default 0,
  moment text not null default 'dejeuner'
    check (moment in ('petit-dejeuner', 'dejeuner', 'diner', 'desserts-boissons')),
  section_label text not null default '',
  tag text,
  is_signature boolean not null default false,
  image_url text,
  is_visible boolean not null default true,
  sort_order integer not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.lns_gallery_items (
  id text primary key,
  title text not null,
  caption text not null default '',
  category text not null default 'plats'
    check (category in ('terrasse', 'salle', 'plats', 'evenements')),
  category_label text not null default '',
  image_url text not null default '',
  is_visible boolean not null default true,
  sort_order integer not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.lns_brigade_members (
  id text primary key,
  name text not null,
  role text not null default '',
  tenure text not null default '',
  bio text not null default '',
  is_visible boolean not null default true,
  sort_order integer not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.lns_faq_items (
  id text primary key,
  question text not null,
  answer text not null default '',
  is_visible boolean not null default true,
  sort_order integer not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.lns_admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- 2. Horodatage automatique
-- ---------------------------------------------------------------------------

create or replace function public.lns_set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists lns_settings_updated_at on public.lns_site_settings;
create trigger lns_settings_updated_at before update on public.lns_site_settings
for each row execute function public.lns_set_updated_at();

drop trigger if exists lns_menu_updated_at on public.lns_menu_items;
create trigger lns_menu_updated_at before update on public.lns_menu_items
for each row execute function public.lns_set_updated_at();

drop trigger if exists lns_gallery_updated_at on public.lns_gallery_items;
create trigger lns_gallery_updated_at before update on public.lns_gallery_items
for each row execute function public.lns_set_updated_at();

drop trigger if exists lns_brigade_updated_at on public.lns_brigade_members;
create trigger lns_brigade_updated_at before update on public.lns_brigade_members
for each row execute function public.lns_set_updated_at();

drop trigger if exists lns_faq_updated_at on public.lns_faq_items;
create trigger lns_faq_updated_at before update on public.lns_faq_items
for each row execute function public.lns_set_updated_at();

-- ---------------------------------------------------------------------------
-- 3. Sécurité : lecture publique, écriture réservée aux administrateurs
-- ---------------------------------------------------------------------------

alter table public.lns_site_settings enable row level security;
alter table public.lns_menu_items enable row level security;
alter table public.lns_gallery_items enable row level security;
alter table public.lns_brigade_members enable row level security;
alter table public.lns_faq_items enable row level security;
alter table public.lns_admins enable row level security;

-- Droits SQL de base (les policies RLS ci-dessous filtrent ensuite l'accès).
-- Sans ces GRANT, l'API PostgREST répond "permission denied" au rôle anon.
grant usage on schema public to anon, authenticated;
grant select on public.lns_site_settings to anon, authenticated;
grant select on public.lns_menu_items to anon, authenticated;
grant select on public.lns_gallery_items to anon, authenticated;
grant select on public.lns_brigade_members to anon, authenticated;
grant select on public.lns_faq_items to anon, authenticated;
grant select on public.lns_admins to authenticated;
grant all on public.lns_site_settings to authenticated;
grant all on public.lns_menu_items to authenticated;
grant all on public.lns_gallery_items to authenticated;
grant all on public.lns_brigade_members to authenticated;
grant all on public.lns_faq_items to authenticated;
grant all on public.lns_admins to authenticated;

-- Fonction isolée : elle ne lit que la table lns_admins.
create or replace function public.lns_is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.lns_admins where user_id = auth.uid()
  );
$$;

revoke all on function public.lns_is_admin() from public;
grant execute on function public.lns_is_admin() to anon, authenticated;

-- Lecture publique (les lignes masquées restent invisibles côté client).
drop policy if exists "lns_public_read_settings" on public.lns_site_settings;
create policy "lns_public_read_settings" on public.lns_site_settings
for select to anon, authenticated using (true);

drop policy if exists "lns_public_read_menu" on public.lns_menu_items;
create policy "lns_public_read_menu" on public.lns_menu_items
for select to anon, authenticated using (is_visible);

drop policy if exists "lns_public_read_gallery" on public.lns_gallery_items;
create policy "lns_public_read_gallery" on public.lns_gallery_items
for select to anon, authenticated using (is_visible);

drop policy if exists "lns_public_read_brigade" on public.lns_brigade_members;
create policy "lns_public_read_brigade" on public.lns_brigade_members
for select to anon, authenticated using (is_visible);

drop policy if exists "lns_public_read_faq" on public.lns_faq_items;
create policy "lns_public_read_faq" on public.lns_faq_items
for select to anon, authenticated using (is_visible);

-- Écriture : administrateurs uniquement.
drop policy if exists "lns_admin_all_settings" on public.lns_site_settings;
create policy "lns_admin_all_settings" on public.lns_site_settings
for all to authenticated using (public.lns_is_admin()) with check (public.lns_is_admin());

drop policy if exists "lns_admin_all_menu" on public.lns_menu_items;
create policy "lns_admin_all_menu" on public.lns_menu_items
for all to authenticated using (public.lns_is_admin()) with check (public.lns_is_admin());

drop policy if exists "lns_admin_all_gallery" on public.lns_gallery_items;
create policy "lns_admin_all_gallery" on public.lns_gallery_items
for all to authenticated using (public.lns_is_admin()) with check (public.lns_is_admin());

drop policy if exists "lns_admin_all_brigade" on public.lns_brigade_members;
create policy "lns_admin_all_brigade" on public.lns_brigade_members
for all to authenticated using (public.lns_is_admin()) with check (public.lns_is_admin());

drop policy if exists "lns_admin_all_faq" on public.lns_faq_items;
create policy "lns_admin_all_faq" on public.lns_faq_items
for all to authenticated using (public.lns_is_admin()) with check (public.lns_is_admin());

drop policy if exists "lns_admin_read_own_access" on public.lns_admins;
create policy "lns_admin_read_own_access" on public.lns_admins
for select to authenticated using (user_id = auth.uid());

-- ---------------------------------------------------------------------------
-- 4. Stockage des photos (bucket dédié)
-- ---------------------------------------------------------------------------

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'lns-media',
  'lns-media',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
on conflict (id) do update set
  public = true,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "lns_media_public_read" on storage.objects;
create policy "lns_media_public_read" on storage.objects
for select to anon, authenticated using (bucket_id = 'lns-media');

drop policy if exists "lns_media_admin_write" on storage.objects;
create policy "lns_media_admin_write" on storage.objects
for all to authenticated
using (bucket_id = 'lns-media' and public.lns_is_admin())
with check (bucket_id = 'lns-media' and public.lns_is_admin());

-- ---------------------------------------------------------------------------
-- 5. Realtime : mise à jour automatique des pages client
-- ---------------------------------------------------------------------------

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'lns_site_settings', 'lns_menu_items', 'lns_gallery_items',
    'lns_brigade_members', 'lns_faq_items'
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

-- ---------------------------------------------------------------------------
-- 6. Premier administrateur (à faire après la création du compte Auth)
-- ---------------------------------------------------------------------------

-- Remplacez l'adresse puis exécutez cette ligne dans le SQL Editor :
-- insert into public.lns_admins (user_id)
-- select id from auth.users where email = 'proprietaire@exemple.com'
-- on conflict (user_id) do nothing;

-- Le contenu initial s'importe depuis le dashboard, onglet « Tableau de bord »,
-- avec le bouton « Importer le contenu d'origine ».
