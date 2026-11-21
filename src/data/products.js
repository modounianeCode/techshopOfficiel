export const categories = [
  { id: 'audio', label: 'Audio', image: '/images/cat-audio.webp' },
  { id: 'montres', label: 'Montres', image: '/images/cat-montres.webp' },
  { id: 'telephones', label: 'Téléphones', image: '/images/cat-telephones.webp' },
  { id: 'gaming', label: 'Gaming', image: '/images/cat-gaming.webp' },
];

export const products = [
  {
    id: 'p1',
    slug: 'casque-nova-pro',
    name: 'Casque Nova Pro',
    category: 'audio',
    categoryLabel: 'Audio',
    price: 89000,
    oldPrice: 109000,
    rating: 4.8,
    reviews: 124,
    badge: 'Best-seller',
    image: '/images/p-casque-nova.webp',
    short: 'Réduction de bruit active, 40 h d’autonomie et son immersif.',
    description:
      'Le Casque Nova Pro offre une expérience audio premium avec réduction de bruit active, un confort longue durée et une autonomie généreuse pour accompagner toutes vos journées.',
    highlights: ['Réduction de bruit active', 'Autonomie 40 h', 'Bluetooth 5.3', 'Charge USB-C'],
    specs: [
      { label: 'Autonomie', value: '40 heures' },
      { label: 'Connectivité', value: 'Bluetooth 5.3 / Jack 3,5 mm' },
      { label: 'Poids', value: '245 g' },
      { label: 'Charge', value: 'USB-C' },
    ],
  },
  {
    id: 'p2',
    slug: 'ecouteurs-air-pods',
    name: 'Écouteurs Air Pods',
    category: 'audio',
    categoryLabel: 'Audio',
    price: 45000,
    oldPrice: null,
    rating: 4.6,
    reviews: 88,
    badge: 'Nouveau',
    image: '/images/p-ecouteurs-air.webp',
    short: 'Compacts, légers et prêts à suivre votre rythme.',
    description:
      'Des écouteurs sans fil conçus pour la mobilité : appairage rapide, son clair et boîtier de charge compact pour rester connecté toute la journée.',
    highlights: ['Appairage rapide', 'Boîtier compact', 'Commandes tactiles', 'Résistance à la transpiration'],
    specs: [
      { label: 'Autonomie', value: '24 heures avec boîtier' },
      { label: 'Connectivité', value: 'Bluetooth 5.2' },
      { label: 'Résistance', value: 'IPX4' },
      { label: 'Charge', value: 'USB-C' },
    ],
  },
  {
    id: 'p3',
    slug: 'montre-pulse-connect',
    name: 'Montre Pulse Connect',
    category: 'montres',
    categoryLabel: 'Montres',
    price: 69000,
    oldPrice: 79000,
    rating: 4.7,
    reviews: 64,
    badge: 'Promo',
    image: '/images/p-montre-pulse.webp',
    short: 'Suivi santé, notifications et design élégant au poignet.',
    description:
      'La Pulse Connect combine suivi d’activité, notifications intelligentes et autonomie solide dans un design moderne adapté à tous les styles.',
    highlights: ['Suivi fréquence cardiaque', 'Notifications intelligentes', 'Étanche 5 ATM', 'Autonomie 7 jours'],
    specs: [
      { label: 'Écran', value: 'AMOLED 1,43"' },
      { label: 'Autonomie', value: 'Jusqu’à 7 jours' },
      { label: 'Étanchéité', value: '5 ATM' },
      { label: 'Compatibilité', value: 'Android / iOS' },
    ],
  },
  {
    id: 'p4',
    slug: 'smartphone-zen-x',
    name: 'Smartphone Zen X',
    category: 'telephones',
    categoryLabel: 'Téléphones',
    price: 219000,
    oldPrice: null,
    rating: 4.9,
    reviews: 52,
    badge: 'Premium',
    image: '/images/p-phone-zen.webp',
    short: 'Performance fluide, bel écran et photo nette au quotidien.',
    description:
      'Le Zen X est pensé pour ceux qui veulent un smartphone fiable et élégant : écran lumineux, excellente autonomie et appareil photo polyvalent.',
    highlights: ['Écran AMOLED 120 Hz', '128 Go de stockage', 'Caméra 50 MP', 'Batterie 5000 mAh'],
    specs: [
      { label: 'Écran', value: '6,5" AMOLED 120 Hz' },
      { label: 'Stockage', value: '128 Go' },
      { label: 'Caméra', value: '50 MP' },
      { label: 'Batterie', value: '5000 mAh' },
    ],
  },
  {
    id: 'p5',
    slug: 'clavier-tactile-rgb',
    name: 'Clavier Tactile RGB',
    category: 'gaming',
    categoryLabel: 'Gaming',
    price: 59000,
    oldPrice: null,
    rating: 4.5,
    reviews: 41,
    badge: 'Gaming',
    image: '/images/p-clavier-tactile.webp',
    short: 'Frappe précise, rétroéclairage RGB et confort de jeu.',
    description:
      'Un clavier mécanique pensé pour le gaming et la productivité, avec un rétroéclairage RGB personnalisable et une frappe réactive.',
    highlights: ['Switchs mécaniques', 'Rétroéclairage RGB', 'Anti-ghosting', 'Câble USB-C détachable'],
    specs: [
      { label: 'Type', value: 'Mécanique' },
      { label: 'Rétroéclairage', value: 'RGB' },
      { label: 'Connexion', value: 'USB-C filaire' },
      { label: 'Format', value: '75 %' },
    ],
  },
  {
    id: 'p6',
    slug: 'enceinte-boost-sound',
    name: 'Enceinte Boost Sound',
    category: 'audio',
    categoryLabel: 'Audio',
    price: 39000,
    oldPrice: 49000,
    rating: 4.4,
    reviews: 73,
    badge: 'Promo',
    image: '/images/p-enceinte-boost.webp',
    short: 'Un son puissant à emporter partout avec vous.',
    description:
      'La Boost Sound délivre un son riche et puissant dans un format portable. Idéale pour la maison, la plage ou les soirées entre amis.',
    highlights: ['Son 360°', '12 h d’autonomie', 'Résistante aux éclaboussures', 'Bluetooth 5.1'],
    specs: [
      { label: 'Autonomie', value: '12 heures' },
      { label: 'Puissance', value: '20 W' },
      { label: 'Résistance', value: 'IPX5' },
      { label: 'Connectivité', value: 'Bluetooth 5.1' },
    ],
  },
];

export function getProductBySlug(slug) {
  return products.find((product) => product.slug === slug);
}

export function getRelatedProducts(product, limit = 3) {
  return products
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, limit);
}
