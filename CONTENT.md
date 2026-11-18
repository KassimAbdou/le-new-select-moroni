# Contenu à valider avant mise en ligne

Le code est prêt, mais plusieurs informations proviennent du projet initial et doivent être confirmées par le restaurant. Ce document sert de checklist éditoriale et juridique.

## Données professionnelles

- [ ] **Téléphone / WhatsApp** : `+269 773 00 31` (`src/data/restaurantData.ts`).
- [ ] **Adresse e-mail** : `contact@lenewselect-moroni.km`.
- [ ] **Horaires** : tous les jours, 07h00 – 23h00 (service continu) et horaires de service (petit-déjeuner jusqu'à 10h30, déjeuner 12h–15h, dîner 18h30–23h).
- [ ] **Coordonnées GPS** : `-11.7016, 43.2547` et lien OpenStreetMap associé.
- [ ] **Nom du domaine** utilisé dans `index.html`, `public/sitemap.xml` et `public/robots.txt` (`https://lenewselect-moroni.km`).

## Carte et prix

- [ ] **Prix proposés** : plusieurs tarifs manquants ou illisibles dans le document source ont été proposés dans `FULL_MENU` (volailles, poissons, fruits de mer, potage, ailerons de poulet) ainsi que dans les menus desserts et boulangerie. Ils doivent tous être confirmés par le restaurant.
- [ ] Orthographe des plats : le menu source provenait d'une photo avec erreurs d'OCR ; les noms ont été corrigés (« Éventail d'espadon fumé », « Curry de bœuf à la comorienne », etc.) et doivent être relus.
- [ ] Vérifier les prix des pizzas (26/33 cm) et des pizzas à la crème fraîche (PM/GM), ainsi que la mention « MYRAISON GRATUITE » dont le sens était peu clair dans le document source.
- [ ] Plats du jour : les dates de `DAILY_SPECIALS` sont des exemples ; le site n'affiche que les plats dont la période est en cours. Mettre à jour les dates/prix dans le dashboard.
- [ ] Événements : les cinq événements de `EVENTS` et leurs catégories sont des exemples à remplacer par le programme réel.
- [ ] Allergènes et régimes : l'affirmation « toutes nos viandes sont certifiées halal, cuisine sans porc » doit être confirmée et justifiée.

## Photos

- [ ] La génération automatique de visuels n'étant pas disponible, les nouveaux plats réutilisent provisoirement les photos déjà présentes dans le projet. Remplacer chaque association par une vraie photo du plat correspondant via le dashboard (upload dans `lns-media`) avant publication.

## Éléments éditoriaux sensibles

- [ ] **Avis TripAdvisor** : les trois témoignages sont présentés comme « avis certifiés ». Ils doivent correspondre à de vrais avis publiés ou être retirés/remplacés. La note globale « 4,6 / 5 » doit être vérifiable.
- [ ] **Équipe** : noms, rôles et ancienneté de la brigade (`BRIGADE`).
- [ ] **Photos** : les images générées doivent être remplacées par des photos réelles du restaurant avant publication ; les légendes doivent correspondre aux visuels.
- [ ] Wi-Fi, chaises hautes, groupes de 8 à 30 couverts, vente à emporter, moyens de paiement (espèces KMF/EUR, Visa/Mastercard, Huri Money, MVola).

## Juridique / administrative

- [ ] Mentions légales et coordonnées de l'éditeur du site.
- [ ] Éventuelle déclaration CNIL / politique de confidentialité (aucun traceur n'est actuellement intégré, hormis Google Fonts).
- [ ] Conditions d'utilisation du formulaire de réservation et politique d'annulation.

> Tant que ces points ne sont pas validés, éviter la mise en production ou retirer les affirmations non vérifiées.
