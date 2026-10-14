import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import repos from '../data/repos.json';
import { repoNotes } from '../data/repoNotes.js';
import { Page, Reveal, Eyebrow, Icon } from '../components/ui.jsx';
import '../styles/pages.css';

const CATS = ['All', 'AI/ML', 'Graphics/Sim', 'Web', 'Games', 'Tools', 'Hackathon'];
const FEATURED = new Set(['MathWhiz', 'ConstelGuessr', 'Moon', 'TerrainGeneration', 'SNOP', 'Inkwell', 'TetrisAI', 'Snake-AI']);

/** Repos created per year — single series, one hue, per-bar tooltip. */
function YearChart({ data, active, onPick }) {
  const [tip, setTip] = useState(null);
  const max = Math.max(...data.map((d) => d.n));
  return (
    <figure className="year-chart">
      <figcaption>Repos started per year</figcaption>
      <div className="yc-bars" onPointerLeave={() => setTip(null)}>
        {data.map((d) => (
          <button
            key={d.year}
            className={`yc-col${active === d.year ? ' on' : ''}`}
            onPointerEnter={() => setTip(d)}
            onFocus={() => setTip(d)}
            onBlur={() => setTip(null)}
            onClick={() => onPick(active === d.year ? null : d.year)}
            aria-pressed={active === d.year}
            aria-label={`${d.year}: ${d.n} repos. Filter by this year`}
          >
            <span className="yc-bar" style={{ height: `${(d.n / max) * 100}%` }} />
            <span className="yc-year">{d.year}</span>
            {tip?.year === d.year && (
              <span className="yc-tip" role="tooltip">
                <b>{d.n}</b> repos in {d.year}
              </span>
            )}
          </button>
        ))}
      </div>
      <table className="sr-only">
        <caption>Repos started per year</caption>
        <thead>
          <tr><th>Year</th><th>Repos</th></tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.year}><td>{d.year}</td><td>{d.n}</td></tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}

export default function Archive() {
  const [cat, setCat] = useState('All');
  const [lang, setLang] = useState('All');
  const [year, setYear] = useState(null);
  const [q, setQ] = useState('');

  const langs = useMemo(() => ['All', ...[...new Set(repos.map((r) => r.language))].sort()], []);
  const years = useMemo(() => {
    const m = {};
    repos.forEach((r) => (m[r.created.slice(0, 4)] = (m[r.created.slice(0, 4)] || 0) + 1));
    return Object.entries(m).sort().map(([year, n]) => ({ year, n }));
  }, []);

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return repos
      .filter((r) => cat === 'All' || r.categories.includes(cat))
      .filter((r) => lang === 'All' || r.language === lang)
      .filter((r) => !year || r.created.startsWith(year))
      .filter((r) => !needle || `${r.name} ${r.description} ${repoNotes[r.name] || ''}`.toLowerCase().includes(needle))
      .sort((a, b) => (FEATURED.has(b.name) - FEATURED.has(a.name)) || b.pushed.localeCompare(a.pushed));
  }, [cat, lang, year, q]);

  return (
    <Page>
      <section className="section archive-hero">
        <div className="wrap archive-top">
          <Reveal>
            <Eyebrow>Playground</Eyebrow>
            <h1 className="page-title">Training Log</h1>
            <p className="page-lede">
              Every public repo since 2021 — game AIs, engines, visualizers, hackathon builds and the experiments in between.
              Featured work floats to the top.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <YearChart data={years} active={year} onPick={setYear} />
          </Reveal>
        </div>
      </section>

      <section className="section tight" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="filters" role="search">
            <div className="chips" role="group" aria-label="Category">
              {CATS.map((c) => (
                <button key={c} className={`chip${cat === c ? ' on' : ''}`} onClick={() => setCat(c)} aria-pressed={cat === c}>
                  {c}
                </button>
              ))}
            </div>
            <div className="filter-row">
              <label className="select">
                <span className="sr-only">Language</span>
                <select value={lang} onChange={(e) => setLang(e.target.value)}>
                  {langs.map((l) => (
                    <option key={l} value={l}>{l === 'All' ? 'All languages' : l}</option>
                  ))}
                </select>
              </label>
              <label className="search">
                <span className="sr-only">Search repos</span>
                <input type="search" placeholder="Search repos…" value={q} onChange={(e) => setQ(e.target.value)} />
              </label>
            </div>
          </div>

          <p className="result-count" aria-live="polite">
            <span className="led">{list.length}</span> {list.length === 1 ? 'repo' : 'repos'}
            {year && (
              <button className="clear" onClick={() => setYear(null)}>
                {year} ×
              </button>
            )}
          </p>

          <motion.div layout className="repo-grid">
            <AnimatePresence mode="popLayout">
              {list.map((r) => (
                <motion.a
                  layout
                  key={r.name}
                  href={r.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`repo${FEATURED.has(r.name) ? ' featured' : ''}`}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="repo-top">
                    <b>{r.name}</b>
                    <Icon.ext />
                  </div>
                  <p>{r.description || repoNotes[r.name] || '—'}</p>
                  <div className="repo-meta">
                    <span><i className="lang-dot" />{r.language}</span>
                    <span>{r.created.slice(0, 4)}</span>
                    {r.fork && <span>fork</span>}
                    {FEATURED.has(r.name) && <span className="feat">★ Featured</span>}
                  </div>
                </motion.a>
              ))}
            </AnimatePresence>
          </motion.div>
          {list.length === 0 && <p className="empty">No repos match — that’s a let. Try another filter.</p>}
        </div>
      </section>
    </Page>
  );
}
