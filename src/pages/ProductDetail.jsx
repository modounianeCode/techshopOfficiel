import { Link, useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';
import { formatPrice } from '../data/site';
import './ProductDetail.css';

export default function ProductDetail() {
  const { slug } = useParams();
  const { getProductBySlug, getRelatedProducts } = useProducts();
  const product = getProductBySlug(slug);

  if (!product) {
    return (
      <section className="section">
        <div className="container detail-missing">
          <p className="eyebrow">Produit introuvable</p>
          <h1>Ce produit n’existe pas</h1>
          <p>Le produit que vous cherchez n’est pas disponible dans cette vitrine.</p>
          <Link to="/boutique" className="btn btn-primary">Retour à la boutique</Link>
        </div>
      </section>
    );
  }

  const related = getRelatedProducts(product);

  return (
    <div className="detail-page">
      <section className="section detail-section">
        <div className="container detail-grid">
          <div className="detail-media">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="detail-info">
            <p className="eyebrow">{product.categoryLabel}</p>
            <h1>{product.name}</h1>
            <div className="detail-meta">
              <span className="detail-rating">★ {product.rating} <span>({product.reviews} avis)</span></span>
              {product.badge && <span className="pill">{product.badge}</span>}
            </div>
            <div className="detail-price">
              <span className="price">{formatPrice(product.price)}</span>
              {product.oldPrice && <span className="old-price">{formatPrice(product.oldPrice)}</span>}
            </div>
            <p className="detail-desc">{product.description}</p>

            <ul className="detail-highlights">
              {product.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <div className="detail-actions">
              <a
                href={`https://wa.me/221770000000?text=${encodeURIComponent(`Bonjour, je suis intéressé(e) par le produit ${product.name} sur TechShop.`)}`}
                className="btn btn-whatsapp"
                target="_blank"
                rel="noopener noreferrer"
              >
                Commander sur WhatsApp
              </a>
              <Link to="/boutique" className="btn btn-ghost">Retour boutique</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Caractéristiques</p>
            <h2>Fiche <span className="accent">technique</span></h2>
          </div>
          <div className="specs-grid">
            {product.specs.map((spec) => (
              <div key={spec.label} className="spec-item">
                <span className="spec-label">{spec.label}</span>
                <span className="spec-value">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">À découvrir</p>
              <h2>Produits <span className="accent">similaires</span></h2>
            </div>
            <div className="related-grid">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
