import { Link } from 'react-router-dom';
import { site } from '../data/site';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link to="/" className="brand">
            <span className="brand-mark">TS</span>
            <span className="brand-name">{site.name}</span>
          </Link>
          <p>{site.description}</p>
        </div>

        <div>
          <p className="footer-title">Navigation</p>
          <ul className="footer-links">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link to={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="footer-title">Contact</p>
          <ul className="footer-links">
            <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
            <li><a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a></li>
            <li><span>{site.address}</span></li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} {site.name}. Site vitrine fictif.</p>
      </div>
    </footer>
  );
}
