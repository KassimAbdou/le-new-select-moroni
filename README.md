# Le New Select — Moroni

Site vitrine du restaurant **Le New Select**, Place de France à Moroni (Union des Comores) : présentation, carte, galerie, histoire, réservation et informations pratiques, avec un dashboard propriétaire connecté à Supabase.

**Dépôt GitHub :** <https://github.com/KassimAbdou/le-new-select-moroni.git>

## Stack technique

- React 19 + TypeScript (mode strict)
- Vite 8 + Tailwind CSS 4
- Lucide React (icônes)
- Supabase (Auth, Postgres, Storage, Realtime) pour le dashboard propriétaire
- Vitest + Testing Library (tests unitaires)
- ESLint + Prettier (qualité et formatage)

L'application est **statique** (Vite + Vercel). Sans configuration, elle utilise un contenu local de secours. Avec Supabase, le dashboard propriétaire (`#admin`) modifie les plats, les coordonnées, la galerie, l'équipe et la FAQ ; le site client se met à jour automatiquement via Realtime. La réservation et la commande préparent un message pré-rempli envoyé via WhatsApp.

Voir [`SUPABASE.md`](./SUPABASE.md) pour la configuration complète.

## Dashboard propriétaire

L’espace propriétaire est accessible sur **`#admin`** (par exemple <http://localhost:3001/#admin>, puis `https://votre-domaine/#admin` en production).

- Connexion via **Supabase Auth** ; seuls les e-mails inscrits dans `lns_admins` peuvent modifier le site.
- Onglets : tableau de bord, plats, informations essentielles, galerie, équipe, FAQ et bibliothèque de médias.
- Ajout / modification / suppression / masquage des plats, avec upload des photos dans le bucket `lns-media`.
- Les pages client se rafraîchissent **automatiquement** via Supabase Realtime, sans rechargement.
- Le bouton **Importer le contenu manquant** initialise Supabase depuis `restaurantData.ts` sans écraser les modifications déjà enregistrées.

## Prérequis

- Node.js **22.12+** (voir `engines` dans `package.json`)
- npm 10+

## Démarrage

```bash
npm install
npm run dev
```

Le site est disponible sur <http://localhost:3000>.

## Scripts

| Commande                  | Description                                                     |
| ------------------------- | --------------------------------------------------------------- |
| `npm run dev`             | Serveur de développement sur le port 3000                       |
| `npm run build`           | Typecheck puis build de production dans `dist/`                 |
| `npm run preview`         | Sert le build de production en local                            |
| `npm run typecheck`       | Vérification TypeScript sans émission                           |
| `npm run lint`            | Analyse ESLint                                                  |
| `npm run lint:fix`        | Corrections ESLint automatiques                                 |
| `npm run format`          | Formatage Prettier de tous les fichiers                         |
| `npm run format:check`    | Vérification du formatage (CI)                                  |
| `npm test`                | Exécution des tests unitaires                                   |
| `npm run test:watch`      | Tests en mode watch                                             |
| `npm run optimize:images` | Régénère les WebP optimisés depuis `src/assets/images/original` |
| `npm run check`           | Lance toutes les vérifications puis le build                    |

## Structure

```
src/
├── assets/images/       # Photos optimisées (WebP) + originaux conservés dans original/
├── components/          # Header, Footer, ErrorBoundary, ResilientImage
├── data/restaurantData.ts  # Contenu éditorial, carte, galerie, FAQ, coordonnées
├── hooks/useHashRoute.ts   # Routage par hash + historique navigateur + titres
├── lib/                 # Utilitaires purs et testables (date, format, réservation)
├── pages/               # Une page par rubrique
├── test/setup.ts        # Configuration Testing Library
├── App.tsx              # Composition globale
└── index.css            # Thème Tailwind, styles de base et d'impression
public/                  # favicon, og-image, robots.txt, sitemap.xml
scripts/optimize-images.mjs
```

## Configuration

- **Contenu et coordonnées** : `src/data/restaurantData.ts` sert de valeur par défaut ; avec Supabase, le contenu éditable est stocké dans les tables `lns_*` et piloté depuis le dashboard `#admin`.
- **SEO** : `index.html` (canonical, Open Graph, JSON-LD Restaurant), `public/robots.txt` et `public/sitemap.xml`.
  Les URL absolues sont actuellement `https://lenewselect-moroni.km` : à remplacer par le domaine réel avant mise en ligne.
- **Images** : placez les photos sources dans `src/assets/images/original/`, lancez `npm run optimize:images`, puis importez le WebP généré dans `restaurantData.ts`. Vite gère le hachage et le cache des fichiers.
- **Supabase** : copier `.env.example` vers `.env.local`, renseigner la clé anon/publishable, exécuter `supabase/migrations/001_lns_site_content.sql` puis, si nécessaire, `supabase/migrations/002_lns_grants_fix.sql`, et suivre [`SUPABASE.md`](./SUPABASE.md) pour créer le compte propriétaire. Les mêmes variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) sont à définir sur Vercel.
- **Déploiement Vercel** : importer <https://github.com/KassimAbdou/le-new-select-moroni.git> dans Vercel, ajouter `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY` dans _Project Settings → Environment Variables_, puis redéployer. `vercel.json` définit le framework `vite`, la commande `npm run build` et le dossier `dist/`. La version Node est lue depuis `engines` dans `package.json`. Le routage par hash ne nécessite aucune règle de réécriture serveur.

## Qualité

- TypeScript strict (`strict`, `noUnusedLocals`, `noUncheckedIndexedAccess`, `verbatimModuleSyntax`).
- ESLint (React Hooks, react-refresh, imports de types) et Prettier.
- 23 tests unitaires (panier, réservation, fuseau horaire de Moroni, mapping Supabase, routage).
- Accessibilité : lien d'évitement, focus visible, modale avec piège de focus et restauration, libellés de formulaire, annonces `aria-live`, respect de `prefers-reduced-motion`.
- Performance : images WebP (~1,1 Mo au lieu de 6,3 Mo), image hero chargée en priorité, lazy loading des autres images.

## Contenu à valider

Certaines informations ont été fournies avec le projet et doivent être **vérifiées avec le restaurant** avant publication : avis clients, équipe, tarifs, horaires, coordonnées, moyens de paiement et mentions légales. Voir [`CONTENT.md`](./CONTENT.md).
