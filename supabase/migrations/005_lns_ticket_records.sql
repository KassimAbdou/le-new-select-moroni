-- Le New Select — billetterie des événements.
-- Complément de 003/004. À exécuter dans le SQL Editor Supabase.
-- Sans cette migration, l'enregistrement d'une réservation de billets est
-- refusé par la contrainte `kind in ('order', 'reservation')`.

alter table public.lns_client_records
  drop constraint if exists lns_client_records_kind_check;

alter table public.lns_client_records
  add constraint lns_client_records_kind_check
  check (kind in ('order', 'reservation', 'ticket'));
