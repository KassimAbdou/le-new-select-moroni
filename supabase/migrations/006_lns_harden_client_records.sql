-- Le New Select — durcissement des demandes clients (commandes / réservations).
-- Complément de 003/005. À exécuter dans le SQL Editor Supabase.
-- Non destructif : aucune ligne existante n'est supprimée ni modifiée.

-- ---------------------------------------------------------------------------
-- 1. Limites de taille et de contenu appliquées aux NOUVELLES lignes.
--    `not valid` permet d'appliquer la migration même si d'anciennes lignes
--    contenaient des valeurs plus longues : elles restent lisibles.
-- ---------------------------------------------------------------------------

alter table public.lns_client_records
  drop constraint if exists lns_client_records_id_len;
alter table public.lns_client_records
  add constraint lns_client_records_id_len
  check (char_length(id) between 1 and 80) not valid;

alter table public.lns_client_records
  drop constraint if exists lns_client_records_name_len;
alter table public.lns_client_records
  add constraint lns_client_records_name_len
  check (char_length(name) between 1 and 120) not valid;

alter table public.lns_client_records
  drop constraint if exists lns_client_records_phone_len;
alter table public.lns_client_records
  add constraint lns_client_records_phone_len
  check (char_length(phone) between 3 and 40) not valid;

alter table public.lns_client_records
  drop constraint if exists lns_client_records_email_len;
alter table public.lns_client_records
  add constraint lns_client_records_email_len
  check (email is null or char_length(email) <= 254) not valid;

alter table public.lns_client_records
  drop constraint if exists lns_client_records_locale_allowed;
alter table public.lns_client_records
  add constraint lns_client_records_locale_allowed
  check (locale is null or locale in ('fr', 'en', 'ar', 'sw')) not valid;

alter table public.lns_client_records
  drop constraint if exists lns_client_records_kind_allowed;
alter table public.lns_client_records
  add constraint lns_client_records_kind_allowed
  check (kind in ('order', 'reservation', 'ticket')) not valid;

-- Détails du panier : 8 Ko suffisent largement pour une commande normale.
alter table public.lns_client_records
  drop constraint if exists lns_client_records_details_size;
alter table public.lns_client_records
  add constraint lns_client_records_details_size
  check (pg_column_size(details) <= 8192) not valid;

-- ---------------------------------------------------------------------------
-- 2. Anti-spam : quelques demandes par numéro et un plafond global.
--    La fonction est `security definer` car le rôle anon n'a pas le droit de
--    lire la table (RLS) : elle doit pouvoir compter les lignes récentes.
-- ---------------------------------------------------------------------------

create or replace function public.lns_limit_client_record_insert()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  normalized_phone text;
  phone_count integer;
  global_count integer;
begin
  -- L'horodatage est fixé par la base : un client ne peut pas contourner les
  -- fenêtres de temps en envoyant une date future ou très ancienne.
  new.created_at := now();

  -- Les comptes administrateurs ne sont pas limités.
  if public.lns_is_admin() then
    return new;
  end if;

  normalized_phone := regexp_replace(lower(new.phone), '[^0-9]', '', 'g');

  select count(*) into phone_count
    from public.lns_client_records
   where regexp_replace(lower(phone), '[^0-9]', '', 'g') = normalized_phone
     and created_at > now() - interval '10 minutes';

  if phone_count >= 5 then
    raise exception 'Trop de demandes pour ce numéro. Réessayez dans quelques minutes.'
      using errcode = 'P0001';
  end if;

  select count(*) into global_count
    from public.lns_client_records
   where created_at > now() - interval '1 minute';

  if global_count >= 120 then
    raise exception 'Trop de demandes en ce moment. Réessayez dans un instant.'
      using errcode = 'P0001';
  end if;

  return new;
end;
$$;

revoke all on function public.lns_limit_client_record_insert() from public;
grant execute on function public.lns_limit_client_record_insert() to anon, authenticated;

drop trigger if exists lns_client_records_rate_limit on public.lns_client_records;
create trigger lns_client_records_rate_limit
  before insert on public.lns_client_records
  for each row execute function public.lns_limit_client_record_insert();
