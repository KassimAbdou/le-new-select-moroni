-- Le New Select — enregistrements clients (commandes et demandes de réservation).
-- À exécuter dans le SQL Editor de Supabase si vous souhaitez centraliser ces données.
-- Préfixe `lns_` : n'affecte pas les tables existantes du projet.

create table if not exists public.lns_client_records (
  id text primary key,
  kind text not null check (kind in ('order', 'reservation')),
  name text not null,
  phone text not null,
  email text,
  locale text,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists lns_client_records_created_at_idx
  on public.lns_client_records (created_at desc);
create index if not exists lns_client_records_kind_idx
  on public.lns_client_records (kind);

alter table public.lns_client_records enable row level security;

-- Droits SQL : insertion publique (site client), lecture/gestion admin.
grant usage on schema public to anon, authenticated;
grant insert on public.lns_client_records to anon, authenticated;
grant select, delete on public.lns_client_records to authenticated;

-- Les visiteurs du site peuvent enregistrer une commande/demande (insertion uniquement).
drop policy if exists "lns_public_insert_client_records" on public.lns_client_records;
create policy "lns_public_insert_client_records" on public.lns_client_records
for insert to anon, authenticated
with check (true);

-- Les administrateurs peuvent consulter et supprimer les enregistrements.
drop policy if exists "lns_admin_read_client_records" on public.lns_client_records;
create policy "lns_admin_read_client_records" on public.lns_client_records
for select to authenticated
using (public.lns_is_admin());

drop policy if exists "lns_admin_delete_client_records" on public.lns_client_records;
create policy "lns_admin_delete_client_records" on public.lns_client_records
for delete to authenticated
using (public.lns_is_admin());

-- Realtime optionnel pour le dashboard.
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'lns_client_records'
  ) then
    execute 'alter publication supabase_realtime add table public.lns_client_records';
  end if;
end $$;
