import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <section className="section notfound">
      <div className="container notfound-inner">
        <p className="eyebrow">Erreur 404</p>
        <h1>Page <span className="accent">introuvable</span></h1>
        <p>La page que vous cherchez n’existe pas ou a été déplacée.</p>
        <Link to="/" className="btn btn-primary">Retour à l’accueil</Link>
      </div>
    </section>
  );
}
