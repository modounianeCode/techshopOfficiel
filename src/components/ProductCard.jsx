import { Link } from 'react-router-dom';
import { formatPrice } from '../data/site';
import './ProductCard.css';

export default function ProductCard({ product }) {
  return (
    <article className="product-card">
      <Link to={`/produit/${product.slug}`} className="product-card-image">
        <img src={product.image} alt={product.name} loading="lazy" />
        {product.badge && <span className="pill product-card-badge">{product.badge}</span>}
      </Link>
      <div className="product-card-body">
        <p className="product-card-cat">{product.categoryLabel}</p>
        <h3>
          <Link to={`/produit/${product.slug}`}>{product.name}</Link>
        </h3>
        <p className="product-card-short">{product.short}</p>
        <div className="product-card-bottom">
          <div className="product-card-price">
            <span className="price">{formatPrice(product.price)}</span>
            {product.oldPrice && <span className="old-price">{formatPrice(product.oldPrice)}</span>}
          </div>
          <span className="product-card-rating" aria-label={`Note ${product.rating} sur 5`}>
            ★ {product.rating}
          </span>
        </div>
      </div>
    </article>
  );
}
