import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';
import './Shop.css';

export default function Shop() {
  const { products, categories } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCat = searchParams.get('cat') || 'all';

  const filtered = useMemo(() => {
    if (activeCat === 'all') return products;
    return products.filter((p) => p.category === activeCat);
  }, [activeCat]);

  function setCat(cat) {
    if (cat === 'all') setSearchParams({});
    else setSearchParams({ cat });
  }

  return (
    <div className="shop-page">
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Boutique</p>
          <h1>Nos produits <span className="accent">électroniques</span></h1>
          <p>Explorez notre sélection fictive de produits tech conçus pour le quotidien.</p>
        </div>
      </section>

      <section className="section shop-section">
        <div className="container">
          <div className="filters" role="tablist" aria-label="Filtrer par catégorie">
            <button
              className={`filter-btn ${activeCat === 'all' ? 'active' : ''}`}
              onClick={() => setCat('all')}
            >
              Tous
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`filter-btn ${activeCat === cat.id ? 'active' : ''}`}
                onClick={() => setCat(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {filtered.length > 0 ? (
            <div className="products-grid">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="empty">Aucun produit dans cette catégorie.</p>
          )}
        </div>
      </section>
    </div>
  );
}
