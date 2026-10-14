import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { roleList } from '../data/roles.js';
import { caseStudies } from '../data/caseStudies.js';
import { Icon } from './ui.jsx';

function Dropdown({ label, children }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const close = (e) => !ref.current?.contains(e.target) && setOpen(false);
    const esc = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('pointerdown', close);
    document.addEventListener('keydown', esc);
    return () => {
      document.removeEventListener('pointerdown', close);
      document.removeEventListener('keydown', esc);
    };
  }, [open]);

  return (
    <div className="dropdown" ref={ref}>
      <button className="navbtn" aria-expanded={open} aria-haspopup="true" onClick={() => setOpen((o) => !o)}>
        {label} ▾
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="dropdown-menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ThemeToggle() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'dark');
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {
      /* storage unavailable */
    }
  }, [theme]);
  const next = theme === 'dark' ? 'light' : 'dark';
  return (
    <button className="icon-btn" onClick={() => setTheme(next)} aria-label={`Switch to ${next === 'light' ? 'daytime' : 'night'} court`}>
      {theme === 'dark' ? <Icon.sun /> : <Icon.moon />}
    </button>
  );
}

export default function Nav() {
  const [menu, setMenu] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setMenu(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = menu ? 'hidden' : '';
  }, [menu]);

  return (
    <header className="nav">
      <div className="wrap">
        <Link to="/" className="brand" aria-label="Supreet Tadeparti — home">
          <span className="brand-ball" />
          <span>
            SUPREET T. <small>· CENTER COURT</small>
          </span>
        </Link>

        <nav className="nav-links" aria-label="Primary">
          <div className="courts" role="group" aria-label="Role pages">
            {roleList.map((r) => (
              <NavLink key={r.id} to={`/${r.id}`} style={{ '--c': r.color }} title={r.label}>
                {r.short}
              </NavLink>
            ))}
          </div>
          <NavLink to="/about">About</NavLink>
          <Dropdown label="Work">
            {caseStudies.map((c) => (
              <Link key={c.slug} to={`/work/${c.slug}`}>
                {c.name} <span>{c.kicker.split(' · ')[0]}</span>
              </Link>
            ))}
          </Dropdown>
          <NavLink to="/team">Team</NavLink>
          <NavLink to="/archive">Archive</NavLink>
          <Dropdown label="Resume">
            {roleList.map((r) => (
              <a key={r.id} href={r.resume} target="_blank" rel="noreferrer">
                {r.label} <span>PDF</span>
              </a>
            ))}
          </Dropdown>
          <ThemeToggle />
        </nav>

        <button className="icon-btn menu-toggle" onClick={() => setMenu((m) => !m)} aria-expanded={menu} aria-label="Menu">
          {menu ? <Icon.close /> : <Icon.menu />}
        </button>
      </div>

      {menu && (
        <nav className="mobile-menu" aria-label="Mobile">
          {roleList.map((r) => (
            <Link key={r.id} to={`/${r.id}`} style={{ color: r.color }}>
              {r.label} <span className="sub">Court {r.court}</span>
            </Link>
          ))}
          <Link to="/about">About <span className="sub">Player profile</span></Link>
          {caseStudies.map((c) => (
            <Link key={c.slug} to={`/work/${c.slug}`}>
              {c.name} <span className="sub">Breakdown</span>
            </Link>
          ))}
          <Link to="/team">Team <span className="sub">OSS & leadership</span></Link>
          <Link to="/archive">Archive <span className="sub">All repos</span></Link>
          <div style={{ display: 'flex', gap: 8, marginTop: 24, alignItems: 'center' }}>
            <ThemeToggle />
            <span className="eyebrow">Theme</span>
          </div>
        </nav>
      )}
    </header>
  );
}
