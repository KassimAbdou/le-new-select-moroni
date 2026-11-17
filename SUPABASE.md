# Dashboard propriétaire & Supabase

Le site peut fonctionner sans Supabase : il utilise alors le contenu de `src/data/restaurantData.ts`.
Une fois Supabase configuré, le dashboard permet de modifier ce contenu et **toutes les pages client se mettent à jour automatiquement** via Supabase Realtime.

Le projet Supabase utilisé est `https://nloedrakjuvdavyenqzy.supabase.co`. Il contient déjà un autre projet restaurant : toutes les tables, policies et le bucket ajoutés ici sont préfixés `lns_` et ne modifient aucun objet existant.

## 1. Variables d'environnement

Copier `.env.example` vers `.env.local`, puis renseigner :

```bash
VITE_SUPABASE_URL=https://nloedrakjuvdavyenqzy.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

La clé **anon** se trouve dans Supabase → Project Settings → API. Elle est publique par conception et protégée par les policies RLS. **Ne jamais exposer la clé `service_role`.**

Sur Vercel, ajouter les deux mêmes variables dans _Project Settings → Environment Variables_ (Production, Preview, Development), puis redéployer.

## 2. Créer les tables (une seule fois)

Dans le SQL Editor de Supabase, exécuter le fichier :

```text
supabase/migrations/001_lns_site_content.sql
```

Il crée uniquement :

| Objet                 | Rôle                                                 |
| --------------------- | ---------------------------------------------------- |
| `lns_site_settings`   | Coordonnées, horaires, photo d'accueil, plat du jour |
| `lns_menu_items`      | Plats, prix, moments, photos, visibilité             |
| `lns_gallery_items`   | Photos de la galerie                                 |
| `lns_brigade_members` | Équipe                                               |
| `lns_faq_items`       | Questions fréquentes                                 |
| `lns_admins`          | Liste des comptes autorisés                          |
| bucket `lns-media`    | Images uploadées depuis le dashboard                 |

Il active aussi la RLS : lecture publique des éléments visibles, écriture réservée aux administrateurs, ajout des tables au canal Realtime. Les policies de storage filtrent toutes sur `bucket_id = 'lns-media'`.

## 3. Créer le compte propriétaire

1. Supabase → **Authentication → Users → Add user** : créer le compte avec e-mail et mot de passe.
2. Dans le SQL Editor, autoriser ce compte (remplacer l'adresse) :

```sql
insert into public.lns_admins (user_id)
select id from auth.users where email = 'proprietaire@exemple.com'
on conflict (user_id) do nothing;
```

3. Ouvrir `https://votre-domaine/#admin` et se connecter.

## 4. Première utilisation

Dans le dashboard, onglet **Tableau de bord**, cliquer sur **Importer le contenu manquant** : la carte actuelle, la galerie, l'équipe, la FAQ et les informations sont ajoutées dans Supabase. Le bouton n'écrase jamais une modification déjà enregistrée. Ensuite, modifier un plat, un prix ou une photo : la modification est visible immédiatement sur le site public, sans rechargement.

Le bouton **Masquer** retire temporairement un élément du site sans le supprimer ; **Supprimer** le retire définitivement de Supabase.

## 5. Vérification

- `npm run check` : typecheck, ESLint, Prettier, tests et build.
- Dashboard → _État de la synchronisation_ : la source doit être « Supabase » et les mises à jour en direct « Actives ».
- Page Menu : le panier recalcule le total et ouvre WhatsApp avec le détail de la commande.

## Sécurité

- Le dashboard est protégé par Supabase Auth **et** par la table `lns_admins` (fonction `lns_is_admin()`).
- Un visiteur anonyme ne peut que lire les éléments visibles : aucune écriture n'est possible depuis le navigateur.
- Les images du bucket `lns-media` sont publiques en lecture, nécessaires aux pages client ; l'upload est réservé aux administrateurs.
