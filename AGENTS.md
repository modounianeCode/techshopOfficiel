# AGENTS.md — TechShop

## Contexte

- Vitrine e-commerce **front-only** (React 18 + Vite 5), sans backend, sans base de données, sans clé API. Panier, catalogue et commandes persistés en `localStorage`, checkout simulé, dashboard admin local.
- Projet dans `/home/modou-niane/tech_shop`. Le dossier parent est le home, très encombré d'autres projets : **ne jamais créer/modifier de fichiers hors de `tech_shop/`**.
- Pas de dépôt git initialisé à ce jour (`git init` à faire uniquement si demandé). `node_modules/` et `dist/` sont ignorés.
- Le propriétaire veut avancer **étape par étape** : livrer une étape vérifiable, puis attendre sa validation.

## Commandes

| Commande          | Effet                                                   |
| ----------------- | ------------------------------------------------------- |
| `npm run dev`     | Serveur Vite sur `http://localhost:5173` (`host: true`) |
| `npm run build`   | Build dans `dist/`                                      |
| `npm run preview` | Sert le build                                           |

- **Aucun test, lint, formatage, typecheck ni CI.** Ne pas en inventer : la seule vérification = `npm run build` + contrôle visuel.
- Avant de relancer le dev server, tester s'il tourne déjà : `curl -s -o /dev/null -w '%{http_code}' http://localhost:5173/` (un serveur peut être actif en arrière-plan, log dans `/tmp/opencode/techshop-dev.log`).
- Node 22 / npm 10.

## Design (non négociable)

- **Source de vérité visuelle** : `UI Design_ Modern Gadget Store Web UI Kit.jpeg`, à la racine du projet. Ne pas la déplacer ni la supprimer ; la palette et les composants en sont directement dérivés.
- Tous les tokens sont dans `src/styles/global.css` : `--ink #02120F`, `--forest-950 #041B16`, `--forest-900 #0A251E`, `--sage #4D6248`, `--cream #EFEFE6`, `--lime #C9F363`, plus rayons/ombres/transitions. **Utiliser les variables, jamais de hex en dur dans les composants.**
- Polices chargées via `@fontsource/outfit` et `@fontsource/playfair-display` dans `src/main.jsx`. **Pas de CDN Google Fonts** : le site doit fonctionner hors ligne.
  - Texte/titres : Outfit. Mots d'accroche : classe `.accent` (Playfair italique lime).
- Style de référence : fond forest dégradé, cartes arrondies avec hairline sage, CTA pilule lime, halo lumineux autour des produits.
- **Tout l'UI et les textes sont en français** (`<html lang="fr">`).

## Conventions produit

- Marque **TechShop**, devise **FCFA**. Branding et devise centralisés dans `src/data/site.js` — jamais en dur dans les composants.
- Prix formatés avec `Intl.NumberFormat('fr-SN')` via `formatPrice()` / `formatNumber()` de `src/data/site.js`. Livraison offerte dès 75 000 FCFA (sinon 2 500 FCFA).
- Catalogue : `src/data/products.js` — 13 produits, 5 catégories. Les helpers de lecture vivent désormais dans `StoreContext` (`getProductById`, `getProductBySlug`, `getRelated`, `getVisible…`) car le catalogue peut être modifié depuis l'admin.
- Chaque produit expose : `slug`, `price`/`oldPrice`, `rating`, `reviewCount`, `stock`, `badge`, `short`, `description`, `paragraphs[]` (contenu long), `highlights[]`, `specs[]`, `reviews[]`, `box[]` (contenu de la boîte), `gallery` (3 visuels), `published`, `featured`.
- Le contenu éditorial long est séparé : `src/data/productContent.js` (un bloc `paragraphs` + `box` par slug), fusionné dans `products.js` au chargement. La fiche produit affiche `description` puis chaque paragraphe, les points clés, les specs et « Dans la boîte » (bloc specs masqué si vide).
- **Source de vérité unique du catalogue et des commandes** : `StoreContext` (`src/context/StoreContext.jsx`), persisté sous `techshop:catalog:v1` et `techshop:orders:v1`. `CartContext` lit le catalogue depuis le store et borne les quantités au stock réel.
- Le panier a une source unique : `CartContext` (`src/context/CartContext.jsx`), persisté dans `localStorage` sous `techshop:cart:v1`, quantités bornées au stock (max 10).
- CSS natif uniquement : **pas de Tailwind ni de librairie de composants UI**. Un fichier CSS par composant à côté de son `.jsx`.

## Images

- Photos **libres de droit** (Pexels), téléchargées en local dans `public/images/` — aucune URL distante au runtime.
- Export **WebP** uniquement (support navigateur universel), 640–1100 px de large, ~800 Ko au total. Sources et licences dans `CREDITS.md` : toute nouvelle image doit y être ajoutée.

## Architecture

- `src/App.jsx` = shell : `BrowserRouter`, `ScrollManager` (remonte en haut à chaque route, gère les ancres `#contact`), routes boutique dans un `StoreLayout` (`Header` + `Outlet` + `Footer` + `CartDrawer`), et `/admin/*` (alias `/techshop/admin/*`) hors du layout boutique.
- Routes : `/` (Home), `/boutique` (Shop), `/produit/:slug` (ProductDetail), `/panier` (Cart), `/commande` (Checkout), `/admin` (dashboard), `/admin/produits`, `/admin/produits/nouveau`, `/admin/produits/:id`, `/admin/commandes`, `/admin/reglages`, `*` (NotFound). Alias : `/techshop/admin` et ses sous-routes gardent le préfixe via `useAdminBase()` (`src/pages/admin/adminBase.js`).
- Un dossier `src/pages/*.jsx` + `*.css` par route, un `src/components/*.jsx` + `*.css` par composant partagé. Les écrans admin sont dans `src/pages/admin/`.
- Filtres boutique pilotés par l'URL : `?cat=`, `?q=`, `?prix=` (`0-50000`, `50000-150000`, `150000-400000`, `400000-`), `?tri=` (`populaires`, `nouveautes`, `prix-asc`, `prix-desc`, `note`, `promos`). `promos` filtre les produits avec `oldPrice`.
- Nav dans `site.nav` : Accueil, Boutique, Nouveautés, Promotions, Contact (ancre `/#contact` vers le footer). Nouveautés et Promotions pointent vers `/boutique?tri=...#produits` : la page atterrit directement sur les filtres et la grille, sans repasser par l'en-tête de la boutique (`scroll-margin-top` compense le header sticky).

## Dashboard admin (démo)

- Accès : `/admin` (ou `/techshop/admin`), protégé par un code **de démonstration** affiché sur l'écran de connexion (`site.adminCode = 'techshop2026'`). Session mémorisée dans `sessionStorage` (`techshop:admin:session`). **Aucune sécurité réelle** : tout est front-end, le code est lisible dans le bundle.
- `AdminApp.jsx` : porte de connexion, sidebar (Tableau de bord, Produits, Commandes, Réglages), topbar avec fil d'Ariane cliquable et action « Ajouter un produit », routes imbriquées.
- `Dashboard.jsx` : 4 KPI (CA 30 j + évolution, commandes 30 j, panier moyen, stock à surveiller), graphique 14 jours, répartition par statut, commandes récentes, stock faible, meilleures ventes, ventes par catégorie.
- `AdminProducts.jsx` : table filtrable (recherche + catégorie), bascule publier/masquer, suppression avec modale, lien vers la fiche boutique.
- `AdminProductEditor.jsx` : formulaire complet (infos, prix/stock, description longue, points clés, boîte, specs dynamiques, image via `src/data/media.js`, publication/mise en avant), aperçu carte boutique, validation, suppression. Une image de la bibliothèque génère automatiquement ses 3 vues.
- `AdminOrders.jsx` : stats, filtres (recherche + statut), table, tiroir de détail avec articles, totaux, changement de statut, suppression. Les commandes passées sur la boutique arrivent ici (`addOrder` → statut `en-attente`).
- `AdminSettings.jsx` : infos boutique (lecture), poids des données locales, export JSON, réinitialisations (catalogue / commandes / tout).
- Données de démo : `src/data/orders.js` génère 20 commandes déterministes sur 60 jours (dont une annulée) au premier chargement, pour que les KPI et le graphique soient lisibles.
- Statuts : `en-attente`, `preparation`, `expediee`, `livree`, `annulee` (`ORDER_STATUSES` dans `orders.js`, pastilles `pill--*`).
- Toute modification admin est immédiatement visible en boutique (même `localStorage`, même contexte). Supprimer un produit le retire aussi du panier ; les commandes existantes gardent leurs lignes (snapshots).
- Responsive : sous 1024 px, la sidebar devient une barre horizontale (marque + actions, puis nav sur plusieurs lignes pour garder les 4 entrées visibles) ; sous 560 px le fil d'Ariane est masqué ; les tableaux défilent horizontalement.

## État actuel

- Étapes 1 à 4 livrées : charte + tokens, images, données + panier, puis layout complet et **toutes les pages** (accueil, boutique, fiche produit, panier, commande simulée, 404).
- Étape 5 livrée : **descriptions produit complètes** (3 paragraphes + « Dans la boîte » sur les 13 fiches) et **dashboard admin** (`/admin`) avec CRUD produits, gestion des commandes, réglages et données de démo.
- Composants : `Header` (nav pilule desktop, burger + menu mobile, badge panier), `Footer` (liens, contact, lien « Espace admin »), `CartDrawer` (tiroir latéral + jauge livraison offerte), `ProductCard`, `StarRating`, `Icons` (SVG inline, pas de librairie).
- Fiche produit : galerie 3 vues avec zoom au survol, description multi-paragraphes, points clés, caractéristiques, « Dans la boîte », avis, produits similaires, barre d'achat fixe en mobile. Produit non publié = 404.
- Checkout : formulaire validé côté client, 4 moyens de paiement simulés, crée une commande réelle (`StoreContext.addOrder`), écran de confirmation avec référence `TS-xxxxxx`, panier vidé après commande.
- Fichiers : `index.html`, `vite.config.js`, `src/main.jsx`, `src/App.jsx`, `src/styles/global.css`, `src/data/{site,products,productContent,orders,media}.js`, `src/context/{StoreContext,CartContext}.jsx`, 6 pages boutique, 5 écrans admin (`src/pages/admin/`), 6 composants, `public/favicon.svg` et 46 visuels WebP dans `public/images/`.
- Vérifié en headless Chrome (desktop 1440 px + mobile 390 px) : parcours complet ajout → panier → commande → confirmation ; connexion admin → dashboard → création d'un produit → visible en boutique et sur sa fiche → suppression ; tiroir de commande ; aucun débordement horizontal, aucune erreur console.

- Chaque tache réalisée, doit etre accompagné d'un resumé avec des émojis.
  
  # - Chaque tache réalisée, doit etre accompagné d'un resumé avec des émojis.
