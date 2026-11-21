export const site = {
  name: 'TechShop',
  tagline: 'La tech qui te ressemble',
  description:
    'Boutique vitrine fictive spécialisée dans les produits électroniques : audio, montres connectées, smartphones et gaming.',
  email: 'contact@techshop.sn',
  phone: '+221 77 000 00 00',
  address: 'Dakar, Sénégal',
  currency: 'XOF',
  nav: [
    { label: 'Accueil', href: '/' },
    { label: 'Boutique', href: '/boutique' },
    { label: 'Contact', href: '/#contact' },
  ],
  socials: [
    { label: 'Instagram', href: 'https://instagram.com/' },
    { label: 'Facebook', href: 'https://facebook.com/' },
    { label: 'X', href: 'https://x.com/' },
  ],
};

export function formatPrice(value) {
  return new Intl.NumberFormat('fr-SN', {
    style: 'currency',
    currency: site.currency,
    maximumFractionDigits: 0,
  }).format(value);
}
