// components/Nav.jsx
import { useState, useEffect } from 'react';
import { trackCtaClick } from '../lib/firebase';

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const links = ['Services', 'Why Us', 'Statistics', 'Pricing', 'FAQ'];
  const hrefs = ['#services', '#why', '#stats', '#pricing', '#faq'];

  return (
    <>
      <nav className={scrolled ? 'nav-scrolled' : ''}>
        <div className="nav-logo">
          <img src="so.png" alt="SixtyPlus Global" />
        </div>
        <div className="nav-links">
          {links.map((l, i) => (
            <a
              key={l}
              href={hrefs[i]}
              onClick={() => trackCtaClick(`nav_link_${l.toLowerCase().replace(/\s+/g, '_')}_click`)}
            >
              {l}
            </a>
          ))}
        </div>
        <a
          href="#consult-form"
          className="nav-cta"
          onClick={() => trackCtaClick('nav_desktop_cta_click')}
        >
          Talk to Us
        </a>
        <div
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span /><span /><span />
        </div>
      </nav>
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {links.map((l, i) => (
          <a
            key={l}
            href={hrefs[i]}
            onClick={() => {
              trackCtaClick(`nav_mobile_link_${l.toLowerCase().replace(/\s+/g, '_')}_click`);
              setMenuOpen(false);
            }}
          >
            {l}
          </a>
        ))}
        <a
          href="#consult-form"
          className="mob-cta"
          onClick={() => {
            trackCtaClick('nav_mobile_cta_click');
            setMenuOpen(false);
          }}
        >
          Talk to Us
        </a>
      </div>
    </>
  );
};

export default Nav;