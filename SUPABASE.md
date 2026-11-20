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

### Migration 004 — nouvelle carte, plats du jour et événements

Exécuter ensuite :

```text
supabase/migrations/004_lns_menu_events.sql
```

Cette migration est **non destructive** : elle ajoute `category_id` et `price_options` à `lns_menu_items`, puis crée quatre tables avec les mêmes règles RLS/Realtime que les précédentes. Elle ajoute aussi les colonnes de billetterie (`ticket_price_kmf`, `tickets_available`, `ticket_sale_points`, `ticketing_url`) à `lns_events` :

| Table                  | Rôle                                                    |
| ---------------------- | ------------------------------------------------------- |
| `lns_menu_categories`  | Catégories de la carte, éditables depuis le dashboard   |
| `lns_daily_specials`   | Plats du jour avec dates de début/fin                   |
| `lns_event_categories` | Catégories d'événements, ajoutables depuis le dashboard |
| `lns_events`           | Événements, festivités et cérémonies                    |

Sans cette migration, le site continue d'afficher vos modifications des tables existantes (carte, infos, galerie, équipe, FAQ) et utilise le contenu livré uniquement pour les nouvelles sections. Le dashboard affiche un avertissement avec la liste des tables manquantes ; les nouveaux onglets ne peuvent pas enregistrer leurs données tant que la migration n'est pas exécutée.

### Migration 005 — réservations de billets

Exécuter ensuite :

```text
supabase/migrations/005_lns_ticket_records.sql
```

Elle autorise le type `ticket` dans `lns_client_records` : sans elle, une réservation de billets est refusée par la contrainte `kind in ('order', 'reservation')`.

### Migration 006 — durcissement des demandes clients

Exécuter ensuite :

```text
supabase/migrations/006_lns_harden_client_records.sql
```

Elle ajoute des limites de taille sur les champs des commandes/réservations et un anti-spam : au maximum **5 demandes par numéro sur 10 minutes** et **120 demandes globales par minute**. Les administrateurs ne sont pas limités. L'horodatage est désormais fixé par la base de données, ce qui empêche de contourner ces fenêtres en envoyant une date fictive. Cette migration est non destructive.

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

Dans le dashboard, onglet **Tableau de bord** :

- **Importer le contenu manquant** ajoute les données absentes sans jamais écraser une modification existante.
- **Appliquer la nouvelle carte** remplace la carte, ses catégories, les plats du jour et les événements par la version livrée dans le projet, et masque les anciens plats. À utiliser une seule fois, après la migration 004. Les photos téléversées et les coordonnées du restaurant ne sont pas touchées.

Ensuite, modifier un plat, un prix ou une photo : la modification est visible immédiatement sur le site public, sans rechargement. Les nouveaux onglets **Catégories du menu**, **Plats du jour** et **Événements** permettent notamment d'ajouter une catégorie d'événement au moment de créer un événement.

Pour la billetterie, renseigner sur chaque événement le **prix d'un billet**, le **nombre de places**, les **points de vente** et, si besoin, un **lien de billetterie en ligne**. Le bouton « Réserver des billets » de la page Événements ouvre un formulaire : la demande apparaît dans l'onglet **Clients** du dashboard avec la référence, la quantité et le total, puis le client finalise sur WhatsApp. Les photos d'affiches sont affichées en entier (sans recadrage).

Le bouton **Masquer** retire temporairement un élément du site sans le supprimer ; **Supprimer** le retire définitivement de Supabase.

## 5. Vérification

- `npm run check` : typecheck, ESLint, Prettier, tests et build.
- Dashboard → _État de la synchronisation_ : la source doit être « Supabase » et les mises à jour en direct « Actives ».
- Page Menu : le panier recalcule le total et ouvre WhatsApp avec le détail de la commande.

## Sécurité

- Le dashboard est protégé par Supabase Auth **et** par la table `lns_admins` (fonction `lns_is_admin()`).
- Un visiteur anonyme ne peut que lire les éléments visibles : aucune modification du contenu du site n'est possible depuis le navigateur.
- La seule écriture publique est l'ajout d'une commande/réservation dans `lns_client_records`, limité par la migration 006 (taille des champs + anti-spam).
- Les images du bucket `lns-media` sont publiques en lecture, nécessaires aux pages client ; l'upload est réservé aux administrateurs.
- Les URLs éditables (liens et images) sont filtrées côté client : seuls `http(s)`, les chemins relatifs et `tel:` sont acceptés.
- À vérifier dans Supabase → **Authentication → Providers → Email** : activer la confirmation par e-mail, désactiver l'inscription publique si elle n'est pas utile, et utiliser un mot de passe long pour le compte propriétaire (idéalement avec MFA). Ces réglages ne sont pas stockés dans ce dépôt.
- Les en-têtes de sécurité (CSP, `frame-ancestors`, `nosniff`) sont configurés dans `vercel.json`.
