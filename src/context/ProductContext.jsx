import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { products as defaultProducts, categories } from '../data/products';

const STORAGE_KEY = 'techshop:custom-products:v1';
const ProductContext = createContext(null);

function loadCustomProducts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function slugify(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 60);
}

export function ProductProvider({ children }) {
  const [customProducts, setCustomProducts] = useState(loadCustomProducts);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customProducts));
  }, [customProducts]);

  const products = useMemo(() => [...customProducts, ...defaultProducts], [customProducts]);

  function addProduct(input) {
    const name = input.name.trim();
    const baseSlug = slugify(name) || 'produit';
    const existingSlugs = new Set(products.map((p) => p.slug));
    let slug = baseSlug;
    let i = 2;
    while (existingSlugs.has(slug)) slug = `${baseSlug}-${i++}`;

    const category = categories.find((c) => c.id === input.category) || categories[0];
    const product = {
      id: `custom-${Date.now()}`,
      slug,
      name,
      category: category.id,
      categoryLabel: category.label,
      price: Number(input.price) || 0,
      oldPrice: input.oldPrice ? Number(input.oldPrice) : null,
      rating: 5,
      reviews: 0,
      badge: input.badge?.trim() || 'Nouveau',
      image: input.image?.trim() || '/images/hero.webp',
      short: input.short?.trim() || '',
      description: input.description?.trim() || '',
      highlights: (input.highlights || []).filter(Boolean),
      specs: (input.specs || []).filter((s) => s.label && s.value),
      custom: true,
    };

    setCustomProducts((prev) => [product, ...prev]);
    return product;
  }

  function getProductBySlug(slug) {
    return products.find((product) => product.slug === slug);
  }

  function getRelatedProducts(product, limit = 3) {
    return products
      .filter((item) => item.category === product.category && item.id !== product.id)
      .slice(0, limit);
  }

  const value = useMemo(
    () => ({ products, categories, customProducts, addProduct, getProductBySlug, getRelatedProducts }),
    [products, customProducts],
  );

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}

export function useProducts() {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error('useProducts must be used within ProductProvider');
  return ctx;
}
