import { lazy, Suspense, useCallback, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { profile } from '../data/profile.js';
import { roleList } from '../data/roles.js';
import { projects } from '../data/projects.js';
import { caseStudies } from '../data/caseStudies.js';
import repos from '../data/repos.json';
import { Page, Reveal, SectionHead, Counter, Eyebrow, Icon, useMedia } from '../components/ui.jsx';
import Ticker from '../components/Ticker.jsx';
import CourtFallback from '../components/CourtFallback.jsx';
import '../styles/home.css';

const Arena = lazy(() => import('../three/Arena.jsx'));

function Hud({ shot }) {
  return (
    <div className="hud" aria-hidden="true">
      <div className="hud-head">
        <span className="live-dot" /> BALL TRACKING
      </div>
      <div className="hud-row">
        <span>Speed</span>
        <b className="led">{shot.kmh}</b>
        <i>km/h</i>
      </div>
      <div className="hud-row">
        <span>Spin</span>
        <b className="led">{shot.rps}</b>
        <i>rev/s</i>
      </div>
      <div className="hud-row">
        <span>Rally</span>
        <b className="led">{String(shot.rally).padStart(2, '0')}</b>
        <i>shots</i>
      </div>
      <p className="hud-hint">
        <span>⟲</span> Drag to spin the table. Click a court on the far side to serve into it.
      </p>
    </div>
  );
}

function Hero() {
  const navigate = useNavigate();
  const reduce = useReducedMotion();
  const wide = useMedia('(min-width: 900px)');
  const use3D = wide && !reduce;
  const [hover, setHover] = useState(null);
  const [serve, setServe] = useState(null);
  const [shot, setShot] = useState({ kmh: 72, rps: 80, rally: 1 });
  const going = useRef(false);
  const done = useRef(false);

  const go = useCallback(
    (id) => {
      if (done.current) return;
      done.current = true;
      navigate(`/${id}`);
    },
    [navigate]
  );
  const pick = useCallback(
    (id) => {
      if (going.current) return;
      going.current = true;
      setServe(id);
      // Safety net in case the animation never reports a landing.
      setTimeout(() => go(id), 2200);
    },
    [go]
  );
  const landed = useCallback(() => {
    if (serve) setTimeout(() => go(serve), reduce ? 0 : 450);
  }, [serve, go, reduce]);

  return (
    <section className="hero force-dark" aria-label="Introduction">
      {use3D && (
        <Suspense fallback={<div className="arena-canvas" />}>
          <Arena hover={hover} setHover={setHover} serve={serve} onPick={pick} onShot={setShot} onLanded={landed} />
        </Suspense>
      )}
      <div className="hero-vignette" aria-hidden="true" />

      <div className="wrap hero-inner">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, x: reduce ? 0 : -30 }}
          animate={{ opacity: serve ? 0 : 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <Eyebrow live>Live · Center Court · {profile.location}</Eyebrow>
          <h1 className="hero-name">
            <span>{profile.first}</span>
            <span className="outline">{profile.last}</span>
          </h1>
          <div className="lower-third">
            <span className="lt-tag">CS · UF ’28</span>
            <p>{profile.tagline}</p>
          </div>
        </motion.div>

        {!use3D && <CourtFallback hover={hover} setHover={setHover} serve={serve} onPick={pick} onLanded={landed} />}

        <motion.div
          className="serve-bar"
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          animate={{ opacity: serve ? 0.4 : 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <span className="serve-label">Pick a court and I’ll serve</span>
          <div className="serve-chips">
            {roleList.map((r) => (
              <button
                key={r.id}
                className={`serve-chip${hover === r.id ? ' on' : ''}`}
                style={{ '--c': r.color }}
                onPointerEnter={() => setHover(r.id)}
                onPointerLeave={() => setHover(null)}
                onFocus={() => setHover(r.id)}
                onBlur={() => setHover(null)}
                onClick={() => pick(r.id)}
                disabled={!!serve}
              >
                <span className="court-no">{r.court}</span>
                {r.label}
                <Icon.arrow />
              </button>
            ))}
          </div>
        </motion.div>

        {use3D && <Hud shot={shot} />}
      </div>
    </section>
  );
}

const highlights = [
  { value: repos.length, suffix: '', label: 'Public repos since 2021' },
  { value: 1000, suffix: '+', label: 'Athletes on the NCTTA app' },
  { value: 3, suffix: 'rd', label: 'Overall at SwampHacks X' },
  { value: 8000, suffix: '+', label: 'Dollars raised for the club', prefix: '$' },
];

export default function Home() {
  return (
    <Page>
      <Hero />
      <Ticker />

      {/* Player intro */}
      <section className="section">
        <div className="wrap intro-grid">
          <Reveal className="player-card">
            <img src={profile.photo} alt="Supreet Tadeparti" loading="lazy" />
            <div className="player-card-lt">
              <div>
                <b>{profile.name}</b>
                <span>University of Florida · Computer Science</span>
              </div>
            </div>
          </Reveal>
          <div className="intro-copy">
            <Reveal>
              <Eyebrow>Player intro</Eyebrow>
              <h2 className="intro-statement">
                Hey, I’m Supreet. I study CS at UF and spend most of my time <em>building things</em>.
              </h2>
              <p className="intro-sub">
                Right now I’m working on .NET 8 and Azure features at NCTTA, running the UF Table Tennis Club, and building
                Textraordinary with a few classmates. When I have free time, I like working on graphics projects like my C++ engine.
              </p>
            </Reveal>
            <div className="intro-stats">
              {highlights.map((h) => (
                <Reveal key={h.label} className="intro-stat">
                  <span className="led-wrap">
                    {h.prefix && <span className="led">{h.prefix}</span>}
                    <Counter value={h.value} suffix={h.suffix} />
                  </span>
                  <span className="lbl">{h.label}</span>
                </Reveal>
              ))}
            </div>
            <Link to="/about" className="btn ghost">
              More about me <Icon.arrow />
            </Link>
          </div>
        </div>
      </section>

      {/* Courts */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionHead num="01" kicker="Choose your court" title="Pick a role">
            Each page is set up for one kind of role, with the experience, projects, skills and resume that fit it best.
          </SectionHead>
          <div className="court-cards">
            {roleList.map((r, i) => (
              <Reveal key={r.id} delay={i * 0.08}>
                <Link to={`/${r.id}`} className="court-card" style={{ '--c': r.color }}>
                  <div className="cc-top">
                    <span className="cc-no">COURT {r.court}</span>
                    <Icon.arrow />
                  </div>
                  <h3>{r.label}</h3>
                  <p>{r.headline}</p>
                  <div className="tags">
                    {r.projects.map((p) => (
                      <span className="tag" key={p}>{projects[p].name}</span>
                    ))}
                  </div>
                  <svg className="cc-arc" viewBox="0 0 300 80" preserveAspectRatio="none" aria-hidden="true">
                    <path d="M0 78 Q 90 -20 180 70 Q 230 20 300 50" />
                  </svg>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Case studies */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionHead num="02" kicker="Match breakdowns" title="A closer look">
            Four projects in more detail: what problem each one solves, how it works, and the decisions I made along the way.
          </SectionHead>
          <div className="case-grid">
            {caseStudies.map((c, i) => (
              <Reveal key={c.slug} delay={(i % 2) * 0.08}>
                <Link to={`/work/${c.slug}`} className="case-card" style={{ '--c': c.color }}>
                  <span className="case-kicker">{c.kicker}</span>
                  <h3>{c.name}</h3>
                  <p>{c.summary}</p>
                  <div className="case-flow" aria-hidden="true">
                    {c.pipeline.map((s, j) => (
                      <span key={s.label} style={{ '--d': `${j * 0.12}s` }}>{s.label}</span>
                    ))}
                  </div>
                  <div className="case-foot">
                    <span>{c.result}</span>
                    <Icon.arrow />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Beyond */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap beyond">
          <Reveal>
            <Link to="/team" className="beyond-card">
              <Eyebrow>Open source & leadership</Eyebrow>
              <h3>The Team</h3>
              <p>My work with UF’s Open Source Club, NCTTA, the table tennis club, peer mentoring and hackathons.</p>
              <Icon.arrow />
            </Link>
          </Reveal>
          <Reveal delay={0.08}>
            <Link to="/archive" className="beyond-card">
              <Eyebrow>Playground</Eyebrow>
              <h3>Training Log</h3>
              <p>All {repos.length} of my public repos since 2021, including game AIs, engines, visualizers and hackathon projects.</p>
              <Icon.arrow />
            </Link>
          </Reveal>
        </div>
      </section>
    </Page>
  );
}
