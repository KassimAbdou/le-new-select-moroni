-- Correctif à exécuter une fois dans le SQL Editor si l'API répond
-- "permission denied for table lns_*" après la migration 001.
-- Il ne concerne que les tables préfixées lns_.

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

grant execute on function public.lns_is_admin() to anon, authenticated;
