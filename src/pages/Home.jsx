import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';
import { site } from '../data/site';
import './Home.css';

const perks = [
  { title: 'Sélection premium', text: 'Des produits électroniques choisis pour leur qualité et leur fiabilité.' },
  { title: 'Paiement sécurisé', text: 'Une expérience d’achat simple, claire et rassurante.' },
  { title: 'Support réactif', text: 'Une équipe disponible pour vous conseiller avant et après l’achat.' },
];

export default function Home() {
  const { products, categories } = useProducts();
  const featured = products.slice(0, 4);

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Boutique électronique</p>
            <h1>
              La tech <span className="accent">qui te ressemble</span>
            </h1>
            <p className="hero-lead">
              Découvrez une sélection fictive de produits électroniques modernes : audio, montres, smartphones et accessoires gaming.
            </p>
            <div className="hero-actions">
              <Link to="/boutique" className="btn btn-primary">Explorer la boutique</Link>
              <a href="#contact" className="btn btn-ghost">Nous contacter</a>
            </div>
            <div className="hero-stats">
              <div><strong>+50</strong><span>Produits</span></div>
              <div><strong>24/7</strong><span>Support</span></div>
              <div><strong>100%</strong><span>Fictif & démo</span></div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-glow" />
            <img src="/images/hero.webp" alt="Casque audio premium" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Catégories</p>
            <h2>Trouvez votre <span className="accent">univers</span></h2>
            <p>Parcourez nos catégories phares pour dénicher le produit qui vous convient.</p>
          </div>
          <div className="category-grid">
            {categories.map((cat) => (
              <Link key={cat.id} to={`/boutique?cat=${cat.id}`} className="category-card">
                <img src={cat.image} alt={cat.label} loading="lazy" />
                <div className="category-overlay">
                  <span>{cat.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Sélection</p>
            <h2>Produits <span className="accent">populaires</span></h2>
            <p>Une sélection de nos produits électroniques les plus appréciés.</p>
          </div>
          <div className="products-grid">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="section-cta">
            <Link to="/boutique" className="btn btn-ghost">Voir tous les produits</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="perks-grid">
            {perks.map((perk) => (
              <div key={perk.title} className="perk-card">
                <div className="perk-icon" aria-hidden="true">✦</div>
                <h3>{perk.title}</h3>
                <p>{perk.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section contact-banner">
        <div className="container contact-banner-inner">
          <div>
            <p className="eyebrow">Contact</p>
            <h2>Une question ? <span className="accent">Parlons-en</span></h2>
            <p>Ce site est une vitrine fictive créée pour la démonstration.</p>
          </div>
          <div className="contact-banner-actions">
            <a href={`mailto:${site.email}`} className="btn btn-primary">{site.email}</a>
            <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="btn btn-ghost">{site.phone}</a>
          </div>
        </div>
      </section>
    </>
  );
}
