import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { profile, now } from '../data/profile.js';
import { roleList } from '../data/roles.js';
import repos from '../data/repos.json';
import { Page, Reveal, SectionHead, Eyebrow, Icon } from '../components/ui.jsx';
import '../styles/pages.css';

const career = [
  { year: '2021', title: 'First serve', body: 'Started shipping on GitHub — a pathfinding visualizer, a neural-network visualizer, a sudoku solver and a pile of mini-games.' },
  { year: '2022', title: 'Into the engine room', body: 'Began Moon, a C++/OpenGL engine; generated infinite low-poly terrain in Python; taught a NEAT network to play Snake; built a Passport auth server.' },
  { year: '2023', title: 'Hackathon season', body: '2nd Place Overall at LingHacks V with Paruni (NLP + OpenAI) and Best Game Hack runner-up at HackBytes II with Word Storm. Also neuroevolved a Tetris agent and built Recom (Vue + Firebase).' },
  { year: '2024', title: 'Gainesville', body: 'Started CS at the University of Florida. Won Most Technical Complexity at Steel City Hacks with Snowgineer and built Inkwell on the ICP blockchain for the dApp Hackathon.' },
  { year: '2025', title: 'Podium & presidency', body: '3rd Place Overall at SwampHacks X with MathWhiz. Became UF Table Tennis Club President, mentored 60+ students in COP 3502C, shipped ConstelGuessr and SNOP. Dean’s List.' },
  { year: '2026', title: 'Pro tour', body: 'Software Engineer at NCTTA on .NET 8 and Azure, contributing to UF OSC’s Jukebox, and building Textraordinary with classmates.' },
];

const facts = [
  { k: 'GitHub bio', v: profile.binaryBio, note: '= “code”. Spreading love through it.' },
  { k: 'Old handle', v: 'PotatoFleet', note: 'Hence repos like Potatoes and PotatoGames.' },
  { k: 'Same sport, both sides', v: 'Player → President → Engineer', note: 'From the club table to NCTTA’s national platform.' },
];

function TradingCard() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rx = useSpring(useTransform(y, [0, 1], [10, -10]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(x, [0, 1], [-12, 12]), { stiffness: 150, damping: 18 });
  const glare = useTransform([x, y], ([a, b]) => `radial-gradient(circle at ${a * 100}% ${b * 100}%, rgba(255,255,255,.22), transparent 55%)`);

  const move = (e) => {
    if (reduce) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width);
    y.set((e.clientY - r.top) / r.height);
  };
  const leave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <div className="tcard-stage" onPointerMove={move} onPointerLeave={leave}>
      <motion.div ref={ref} className="tcard" style={reduce ? undefined : { rotateX: rx, rotateY: ry }}>
        <div className="tcard-photo">
          <img src={profile.photo} alt="Supreet Tadeparti" />
        </div>
        <div className="tcard-body">
          <div className="tcard-name">
            <b>{profile.first}</b>
            <b>{profile.last}</b>
          </div>
          <dl className="tcard-stats">
            <div><dt>School</dt><dd>UF</dd></div>
            <div><dt>Class</dt><dd>2028</dd></div>
            <div><dt>Repos</dt><dd>{repos.length}</dd></div>
            <div><dt>Since</dt><dd>2021</dd></div>
            <div><dt>Courts</dt><dd>3</dd></div>
            <div><dt>Sport</dt><dd>🏓</dd></div>
          </dl>
        </div>
        {!reduce && <motion.div className="tcard-glare" style={{ background: glare }} aria-hidden="true" />}
      </motion.div>
    </div>
  );
}

export default function About() {
  return (
    <Page>
      <section className="section about-hero">
        <div className="wrap about-grid">
          <Reveal>
            <TradingCard />
          </Reveal>
          <div>
            <Reveal>
              <Eyebrow>Player profile</Eyebrow>
              <h1 className="page-title">Hi, I’m Supreet.</h1>
            </Reveal>
            <Reveal className="about-bio" delay={0.1}>
              <p>
                I’m a Computer Science student at the <strong>University of Florida</strong> (class of 2028) who has been
                building in public since 2021 — {repos.length} repos and counting, from sorting visualizers and Snake-playing
                neural nets to a C++ graphics engine.
              </p>
              <p>
                Today I write <strong>.NET 8 and Azure</strong> features as a Software Engineer at <strong>NCTTA</strong>, the
                platform behind collegiate table tennis in the US. That’s fitting: I’m also <strong>President of the UF
                Table Tennis Club</strong>, which I helped get back to Nationals for the first time in eight years.
              </p>
              <p>
                I care about software that is secure by default, pleasant to use and honest about what it does — and I like
                teaching it, too: I spent a semester as a peer mentor for 60+ students in UF’s intro programming course.
              </p>
            </Reveal>
            <Reveal className="about-actions" delay={0.15}>
              {roleList.map((r) => (
                <Link key={r.id} to={`/${r.id}`} className="btn" style={{ '--bg': r.color }}>
                  {r.label} <Icon.arrow />
                </Link>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionHead num="01" kicker="Now" title="Currently on court" />
          <div className="now-grid">
            {now.map((n, i) => (
              <Reveal key={n.label} className="now-card" delay={i * 0.05}>
                <span>{n.label}</span>
                <p>{n.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionHead num="02" kicker="Career so far" title="Season by season" />
          <ol className="seasons">
            {career.map((c, i) => (
              <Reveal as="li" key={c.year} className="season" delay={i * 0.04}>
                <span className="season-year">{c.year}</span>
                <div>
                  <h3>{c.title}</h3>
                  <p>{c.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionHead num="03" kicker="Off the table" title="Fun facts" />
          <div className="facts">
            {facts.map((f, i) => (
              <Reveal key={f.k} className="fact" delay={i * 0.06}>
                <span className="eyebrow">{f.k}</span>
                <b>{f.v}</b>
                <p>{f.note}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </Page>
  );
}
