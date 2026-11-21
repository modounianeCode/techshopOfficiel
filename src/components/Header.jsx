import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { site } from '../data/site';
import './Header.css';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand" aria-label={site.name}>
          <span className="brand-mark">TS</span>
          <span className="brand-name">{site.name}</span>
        </Link>

        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>

        <nav id="site-nav" className={`site-nav ${open ? 'is-open' : ''}`}>
          {site.nav.map((item) =>
            item.href.includes('#') ? (
              <a key={item.href} href={item.href} className="nav-link" onClick={() => setOpen(false)}>
                {item.label}
              </a>
            ) : (
              <NavLink
                key={item.href}
                to={item.href}
                end={item.href === '/'}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </NavLink>
            ),
          )}
        </nav>
      </div>
    </header>
  );
}
