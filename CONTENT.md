# Contenu à valider avant mise en ligne

Le code est prêt, mais plusieurs informations proviennent du projet initial et doivent être confirmées par le restaurant. Ce document sert de checklist éditoriale et juridique.

## Données professionnelles

- [ ] **Téléphone / WhatsApp** : `+269 773 00 31` (`src/data/restaurantData.ts`).
- [ ] **Adresse e-mail** : `contact@lenewselect-moroni.km`.
- [ ] **Horaires** : tous les jours, 07h00 – 23h00 (service continu) et horaires de service (petit-déjeuner jusqu'à 10h30, déjeuner 12h–15h, dîner 18h30–23h).
- [ ] **Coordonnées GPS** : `-11.7016, 43.2547` et lien OpenStreetMap associé.
- [ ] **Nom du domaine** utilisé dans `index.html`, `public/sitemap.xml` et `public/robots.txt` (`https://lenewselect-moroni.km`).

## Carte et prix

- [ ] Tous les tarifs en KMF de `FULL_MENU`, `SIGNATURE_DISHES` et `CHEF_DAILY_SPECIAL`.
- [ ] Plat du jour affiché en permanence : prévoir un mécanisme de mise à jour ou une mention « selon arrivage » si le plat change chaque jour.
- [ ] Allergènes et régimes : l'affirmation « toutes nos viandes sont certifiées halal, cuisine sans porc » doit être confirmée et justifiée.

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
