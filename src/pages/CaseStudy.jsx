import { Link, useParams } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { caseStudies, getCaseStudy } from '../data/caseStudies.js';
import { Page, Reveal, SectionHead, Eyebrow, Icon } from '../components/ui.jsx';
import NotFound from './NotFound.jsx';
import '../styles/pages.css';

/** Architecture as a Hawk-Eye trajectory: the ball bounces from stage to stage. */
function Pipeline({ steps }) {
  const reduce = useReducedMotion();
  const n = steps.length;
  const W = 1000;
  const H = 120;
  const xs = steps.map((_, i) => 40 + (i * (W - 80)) / (n - 1));
  const d = xs.slice(1).reduce((acc, x, i) => `${acc} Q ${(xs[i] + x) / 2} ${-10} ${x} ${H - 20}`, `M ${xs[0]} ${H - 20}`);

  return (
    <div className="pipeline">
      <svg viewBox={`-10 -20 ${W + 20} ${H + 30}`} preserveAspectRatio="none" className="pipe-arc" aria-hidden="true">
        <motion.path
          d={d}
          initial={{ pathLength: reduce ? 1 : 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
        />
        {xs.map((x, i) => (
          <motion.ellipse
            key={i}
            cx={x}
            cy={H - 20}
            rx="14"
            ry="4"
            initial={{ opacity: reduce ? 1 : 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: reduce ? 0 : (i / (n - 1)) * 1.8 }}
          />
        ))}
      </svg>
      <ol className="pipe-steps" style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}>
        {steps.map((s, i) => (
          <li key={s.label}>
            <span className="pipe-no">{String(i + 1).padStart(2, '0')}</span>
            <b>{s.label}</b>
            <span>{s.note}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function CaseStudy() {
  const { slug } = useParams();
  const c = getCaseStudy(slug);
  if (!c) return <NotFound />;
  const idx = caseStudies.indexOf(c);
  const next = caseStudies[(idx + 1) % caseStudies.length];

  return (
    <Page color={c.color}>
      <section className="section case-hero">
        <div className="wrap">
          <Reveal>
            <Link to="/" className="back">← Center court</Link>
            <Eyebrow live>Match breakdown · {c.kicker}</Eyebrow>
            <h1 className="case-title">{c.name}</h1>
            {c.aka && <p className="case-aka">{c.aka}</p>}
            <p className="case-summary">{c.summary}</p>
          </Reveal>
          <Reveal as="dl" className="case-meta" delay={0.1}>
            <div><dt>When</dt><dd>{c.year}</dd></div>
            <div><dt>Result</dt><dd>{c.result}</dd></div>
            <div><dt>My role</dt><dd>{c.roles.join(' · ')}</dd></div>
            {c.team && <div><dt>Team</dt><dd>{c.team}</dd></div>}
          </Reveal>
          <Reveal className="tags case-stack" delay={0.15}>
            {c.stack.map((s) => (
              <span key={s} className="tag">{s}</span>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section tight">
        <div className="wrap case-problem">
          <Eyebrow>The serve</Eyebrow>
          <Reveal as="p">{c.problem}</Reveal>
        </div>
      </section>

      <section className="section tight">
        <div className="wrap">
          <SectionHead num="01" kicker="Shot tracking" title="Architecture">
            How a request travels through the system, stage by stage.
          </SectionHead>
          <Pipeline steps={c.pipeline} />
        </div>
      </section>

      <section className="section tight">
        <div className="wrap">
          <SectionHead num="02" kicker="Key points" title="The calls I made" />
          <div className="decisions">
            {c.decisions.map((d, i) => (
              <Reveal key={d.title} className="decision" delay={i * 0.06}>
                <span className="decision-no">{String(i + 1).padStart(2, '0')}</span>
                <h3>{d.title}</h3>
                <p>{d.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section tight">
        <div className="wrap">
          <SectionHead num="03" kicker="Final score" title="Outcome" />
          <Reveal className="outcomes">
            {c.outcomes.map((o) => (
              <div key={o} className="outcome">
                <span>✓</span> {o}
              </div>
            ))}
          </Reveal>
          <div className="role-actions" style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {c.links.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className={l.label === 'GitHub' ? 'btn ghost' : 'btn'}>
                {l.label === 'GitHub' ? <Icon.github /> : <Icon.ext />} {l.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section tight">
        <div className="wrap">
          <Link to={`/work/${next.slug}`} className="next-case" style={{ '--c': next.color }}>
            <span className="eyebrow">Next breakdown</span>
            <b>{next.name}</b>
            <Icon.arrow />
          </Link>
        </div>
      </section>
    </Page>
  );
}
