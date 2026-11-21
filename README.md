# TechShop — Vitrine e-commerce électronique

Site vitrine fictif **front-only** pour une boutique spécialisée dans les produits électroniques.  
Projet construit avec **React + Vite**, sans backend, sans base de données et sans clé API.

## ✨ Fonctionnalités

- **Accueil** : hero, catégories, produits populaires, avantages, section contact.
- **Boutique** : catalogue produits avec filtre par catégorie (`?cat=...`).
- **Fiche produit** : image, prix en FCFA, description, points clés, caractéristiques, produits similaires.
- **Bouton WhatsApp** : sur la fiche produit, redirection vers WhatsApp (`+221 77 000 00 00`) avec message prérempli.
- **Ajout de produit (page externe)** : formulaire d’ajout de produit accessible via `/ajouter-produit`.
- **Persistance locale** : les produits ajoutés sont enregistrés dans le navigateur via `localStorage`.
- **Responsive** : interface adaptée desktop/mobile.
- **404** : page dédiée pour les routes inconnues.

## 🧱 Stack technique

- [React 18](https://react.dev/)
- [Vite 5](https://vitejs.dev/)
- [React Router DOM](https://reactrouter.com/)
- CSS natif (un fichier CSS par composant/page)
- Polices locales via `@fontsource/outfit` et `@fontsource/playfair-display`

## 🚀 Installation et démarrage

### Prérequis

- Node.js 18+ (recommandé : Node 22)
- npm

### Installation

```bash
npm install
```

### Lancer en développement

```bash
npm run dev
```

Application disponible sur : `http://localhost:5173`

### Build de production

```bash
npm run build
```

### Prévisualiser le build

```bash
npm run preview
```

## 🗺️ Routes

| Route | Description |
| --- | --- |
| `/` | Accueil |
| `/boutique` | Catalogue produits |
| `/boutique?cat=audio` | Catalogue filtré par catégorie |
| `/produit/:slug` | Fiche produit |
| `/ajouter-produit` | Page externe d’ajout de produit (non liée au menu) |
| `*` | Page 404 |

## ➕ Ajouter un produit

La page d’ajout est accessible à l’URL :

```text
http://localhost:5173/ajouter-produit
```

### Fonctionnement

- Le formulaire permet de renseigner : nom, catégorie, prix, ancien prix, badge, image, descriptions, points clés et caractéristiques.
- Les produits ajoutés sont stockés dans `localStorage` sous la clé :  
  `techshop:custom-products:v1`
- Les produits ajoutés apparaissent dans le catalogue aux côtés des produits par défaut.
- Comme il n’y a pas de backend, les produits ajoutés sont **propres au navigateur/appareil** utilisé.

## 📁 Structure du projet

```text
.
├── public/
│   ├── favicon.svg
│   └── images/                  # Images WebP locales
├── src/
│   ├── components/              # Composants réutilisables
│   │   ├── Header.*
│   │   ├── Footer.*
│   │   └── ProductCard.*
│   ├── context/
│   │   └── ProductContext.jsx   # Catalogue par défaut + produits personnalisés
│   ├── data/
│   │   ├── products.js          # Produits et catégories par défaut
│   │   └── site.js              # Infos site + formatage prix FCFA
│   ├── pages/                   # Pages/routes
│   │   ├── Home.*
│   │   ├── Shop.*
│   │   ├── ProductDetail.*
│   │   ├── AddProduct.*
│   │   └── NotFound.*
│   ├── styles/
│   │   └── global.css           # Tokens/design global
│   ├── App.jsx                  # Routes et layout
│   └── main.jsx                 # Point d’entrée React
├── CREDITS.md                   # Sources/licences des images
├── index.html
├── package.json
└── vite.config.js
```

## 💰 Données & affichage

- **Devise** : FCFA (`XOF`)
- **Formatage prix** : `Intl.NumberFormat('fr-SN')` via `formatPrice()` dans `src/data/site.js`
- **Langue UI** : français
- **Catalogue** : défini dans `src/data/products.js`, enrichi au runtime par `ProductContext`

## 🖼️ Images

- Images téléchargées depuis **Pexels** (libres d’utilisation), puis converties en WebP.
- Fichiers stockés localement dans `public/images/`.
- Sources et références listées dans `CREDITS.md`.

## 📲 WhatsApp

Le bouton présent sur la fiche produit redirige vers :

```text
https://wa.me/221770000000
```

Le message WhatsApp est prérempli avec le nom du produit concerné.

## ✅ Vérification

La vérification principale du projet se fait avec :

```bash
npm run build
```

Un contrôle responsive a également été effectué sur les pages principales (desktop/mobile).

## ⚠️ Limites

- Projet **fictif** à but de démonstration.
- Pas de backend, pas d’authentification réelle, pas de paiement réel.
- Les produits ajoutés via `/ajouter-produit` sont stockés uniquement dans le `localStorage` du navigateur.