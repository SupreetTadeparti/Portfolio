import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { roles, roleList } from '../data/roles.js';
import { projects, getBullets } from '../data/projects.js';
import { experience, education, profile } from '../data/profile.js';
import { Page, Reveal, SectionHead, Counter, Eyebrow, Icon, Rich } from '../components/ui.jsx';
import '../styles/role.css';

function RallyTimeline({ items }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const top = useTransform(p, (v) => `${v * 100}%`);

  return (
    <div className="rally" ref={ref}>
      <div className="rally-line" aria-hidden="true">
        <motion.div className="rally-fill" style={{ scaleY: reduce ? 1 : p }} />
        {!reduce && <motion.div className="rally-ball" style={{ top }} />}
      </div>
      {items.map((e, i) => (
        <Reveal key={e.id} className={`rally-item ${i % 2 ? 'right' : 'left'}`} y={30}>
          <article className="rally-card">
            <header>
              <span className="rally-dates">{e.dates}</span>
              <h3>{e.org}</h3>
              <span className="rally-role">
                {e.role} · {e.place}
              </span>
            </header>
            <ul>
              {e.bullets.map((b, j) => (
                <li key={j}>
                  <Rich text={b} />
                </li>
              ))}
            </ul>
            <div className="tags">
              {e.tags.map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}

function PointCard({ id, role, index, featured }) {
  const p = projects[id];
  return (
    <Reveal className={`point${featured ? ' featured' : ''}`} delay={featured ? 0 : (index % 2) * 0.08}>
      <article>
        <div className="point-head">
          <span className="point-no">PT {String(index + 1).padStart(2, '0')}</span>
          <span className="point-year">{p.year}</span>
        </div>
        {p.award && <span className="point-award">🏆 {p.award}</span>}
        <h3>{p.name}</h3>
        <p className="point-tag">{p.tagline}</p>
        <ul>
          {getBullets(id, role).map((b, j) => (
            <li key={j}>
              <Rich text={b} />
            </li>
          ))}
        </ul>
        <div className="tags">
          {p.stack.map((s) => (
            <span key={s} className="tag">{s}</span>
          ))}
        </div>
        <div className="point-links">
          {p.caseStudy && (
            <Link to={`/work/${p.caseStudy}`} className="btn">
              Match breakdown <Icon.arrow />
            </Link>
          )}
          {p.live && (
            <a href={p.live} target="_blank" rel="noreferrer" className="btn ghost">
              <Icon.ext /> Live app
            </a>
          )}
          <a href={p.repo} target="_blank" rel="noreferrer" className="btn ghost">
            <Icon.github /> Code
          </a>
        </div>
      </article>
    </Reveal>
  );
}

export default function RolePage({ roleId }) {
  const r = roles[roleId];
  const others = roleList.filter((x) => x.id !== roleId);

  return (
    <Page color={r.color}>
      <section className="role-hero">
        <span className="role-watermark" aria-hidden="true">{r.court}</span>
        <div className="wrap role-hero-inner">
          <Reveal>
            <Eyebrow live>Court {r.court} · Now playing</Eyebrow>
            <h1 className="role-title">{r.label}</h1>
            <p className="role-headline">{r.headline}</p>
            <p className="role-intro">{r.intro}</p>
            <div className="role-actions">
              <a className="btn" href={r.resume} target="_blank" rel="noreferrer">
                <Icon.download /> {r.label} resume
              </a>
              <a className="btn ghost" href={`mailto:${profile.email}`}>
                <Icon.mail /> Get in touch
              </a>
            </div>
          </Reveal>
          <Reveal className="switch" delay={0.15}>
            <span className="switch-label">Switch court</span>
            {others.map((o) => (
              <Link key={o.id} to={`/${o.id}`} style={{ '--c': o.color }}>
                <span>{o.court}</span> {o.label} <Icon.arrow />
              </Link>
            ))}
          </Reveal>
        </div>
        <div className="wrap">
          <Reveal className="scoreboard" delay={0.1}>
            {r.stats.map((s) => (
              <div className="score-cell" key={s.label}>
                <Counter value={s.value} suffix={s.suffix} />
                <span className="lbl">{s.label}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead num="G1" kicker="Game one" title="The rally so far">
            Experience, point by point.
          </SectionHead>
          <RallyTimeline items={experience} />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionHead num="G2" kicker="Game two" title="Highlights">
            The projects that best show what I bring to {r.label.toLowerCase()} work.
          </SectionHead>
          <div className="points">
            {r.projects.map((id, i) => (
              <PointCard key={id} id={id} role={roleId} index={i} featured={i === 0} />
            ))}
          </div>

          {r.bench.length > 0 && (
            <>
              <h3 className="bench-title">
                <span className="section-num">+</span> Off the bench
              </h3>
              <div className="bench">
                {r.bench.map((id, i) => {
                  const p = projects[id];
                  return (
                    <Reveal key={id} delay={i * 0.05}>
                      <a className="bench-card" href={p.repo} target="_blank" rel="noreferrer">
                        <div className="bench-top">
                          <b>{p.name}</b>
                          <span>{p.year}</span>
                        </div>
                        <p>{p.tagline}</p>
                        <ul>
                          {getBullets(id, roleId).map((b, j) => (
                            <li key={j}>
                              <Rich text={b} />
                            </li>
                          ))}
                        </ul>
                        <span className="bench-stack">{p.stack.join(' · ')}</span>
                        <Icon.ext className="bench-ext" />
                      </a>
                    </Reveal>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionHead num="G3" kicker="Game three" title="Kit bag" />
          <div className="kit">
            <div className="kit-skills">
              {r.skills.map((g, gi) => (
                <Reveal key={g.group} className="kit-group" delay={gi * 0.06}>
                  <h4>{g.group}</h4>
                  <div className="kit-items">
                    {g.items.map((s) => (
                      <span key={s}>{s}</span>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal className="kit-edu" delay={0.1}>
              <span className="eyebrow">
                <span className="bar" /> Education
              </span>
              <h4>{education.school}</h4>
              <p>{education.degree}</p>
              <p className="muted">{education.dates}</p>
              <dl>
                <dt>Honors</dt>
                <dd>{education.honors}</dd>
                {r.certification && (
                  <>
                    <dt>Certification</dt>
                    <dd>{r.certification}</dd>
                  </>
                )}
                <dt>Coursework</dt>
                <dd>{r.coursework.join(' · ')}</dd>
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal className="match-point">
            <div>
              <Eyebrow>Match point</Eyebrow>
              <h2>Hiring for {r.label}?</h2>
              <p>Grab the one-page resume for this court, or send a serve my way.</p>
            </div>
            <div className="role-actions">
              <a className="btn" href={r.resume} target="_blank" rel="noreferrer">
                <Icon.download /> Download PDF
              </a>
              <a className="btn ghost" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </Page>
  );
}
