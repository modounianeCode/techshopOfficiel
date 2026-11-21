import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import './AddProduct.css';

const empty = {
  name: '',
  category: 'audio',
  price: '',
  oldPrice: '',
  badge: 'Nouveau',
  image: '',
  short: '',
  description: '',
  highlights: '',
  specs: '',
};

export default function AddProduct() {
  const { categories, addProduct } = useProducts();
  const [form, setForm] = useState(empty);
  const [created, setCreated] = useState(null);
  const [error, setError] = useState('');

  function update(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!form.name.trim()) return setError('Le nom du produit est obligatoire.');
    if (!form.price || Number(form.price) <= 0) return setError('Le prix doit être supérieur à 0.');

    const highlights = form.highlights
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);
    const specs = form.specs
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [label, ...rest] = line.split(':');
        return { label: label?.trim() || '', value: rest.join(':').trim() };
      })
      .filter((s) => s.label && s.value);

    const product = addProduct({ ...form, highlights, specs });
    setCreated(product);
    setForm(empty);
  }

  return (
    <div className="add-page">
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Administration</p>
          <h1>Ajouter un <span className="accent">produit</span></h1>
          <p>Cette page permet d’ajouter un produit fictif au catalogue. Les données sont enregistrées dans votre navigateur (localStorage).</p>
        </div>
      </section>

      <section className="section add-section">
        <div className="container add-grid">
          <form className="add-form" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="name">Nom du produit *</label>
              <input id="name" name="name" value={form.name} onChange={update} required />
            </div>

            <div className="field-row">
              <div className="field">
                <label htmlFor="category">Catégorie</label>
                <select id="category" name="category" value={form.category} onChange={update}>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.label}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="badge">Badge</label>
                <input id="badge" name="badge" value={form.badge} onChange={update} placeholder="Nouveau" />
              </div>
            </div>

            <div className="field-row">
              <div className="field">
                <label htmlFor="price">Prix (FCFA) *</label>
                <input id="price" name="price" type="number" min="0" value={form.price} onChange={update} required />
              </div>
              <div className="field">
                <label htmlFor="oldPrice">Ancien prix (FCFA)</label>
                <input id="oldPrice" name="oldPrice" type="number" min="0" value={form.oldPrice} onChange={update} />
              </div>
            </div>

            <div className="field">
              <label htmlFor="image">URL de l’image</label>
              <input id="image" name="image" value={form.image} onChange={update} placeholder="/images/hero.webp ou https://..." />
            </div>

            <div className="field">
              <label htmlFor="short">Description courte</label>
              <input id="short" name="short" value={form.short} onChange={update} />
            </div>

            <div className="field">
              <label htmlFor="description">Description</label>
              <textarea id="description" name="description" rows="4" value={form.description} onChange={update} />
            </div>

            <div className="field">
              <label htmlFor="highlights">Points clés (un par ligne)</label>
              <textarea id="highlights" name="highlights" rows="4" value={form.highlights} onChange={update} placeholder="Bluetooth 5.3&#10;Autonomie 40 h" />
            </div>

            <div className="field">
              <label htmlFor="specs">Caractéristiques (format: Libellé: Valeur, une par ligne)</label>
              <textarea id="specs" name="specs" rows="4" value={form.specs} onChange={update} placeholder="Autonomie: 40 heures&#10;Poids: 245 g" />
            </div>

            {error && <p className="form-error">{error}</p>}

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">Ajouter le produit</button>
              <Link to="/boutique" className="btn btn-ghost">Voir la boutique</Link>
            </div>
          </form>

          <aside className="add-side">
            <div className="add-preview-card">
              <p className="footer-title">Aperçu</p>
              {form.image ? (
                <img src={form.image} alt="Aperçu" className="add-preview-img" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              ) : (
                <div className="add-preview-empty">Aucune image</div>
              )}
              <h3>{form.name || 'Nom du produit'}</h3>
              <p>{form.short || 'Description courte du produit.'}</p>
            </div>

            {created && (
              <div className="add-success">
                <p className="footer-title">Produit ajouté</p>
                <p><strong>{created.name}</strong> a été ajouté au catalogue.</p>
                <Link to={`/produit/${created.slug}`} className="btn btn-primary">Voir le produit</Link>
              </div>
            )}
          </aside>
        </div>
      </section>
    </div>
  );
}
