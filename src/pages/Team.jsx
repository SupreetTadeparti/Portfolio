import { Link } from 'react-router-dom';
import { openSource, leadership, hackathons } from '../data/team.js';
import { Page, Reveal, SectionHead, Eyebrow, Icon } from '../components/ui.jsx';
import '../styles/pages.css';

export default function Team() {
  return (
    <Page>
      <section className="section">
        <div className="wrap">
          <Reveal>
            <Eyebrow>Open source & leadership</Eyebrow>
            <h1 className="page-title">The Team</h1>
            <p className="page-lede">
              Table tennis is an individual sport played by teams. So is software. Here’s where I build with — and for — other people.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section tight" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionHead num="01" kicker="Captaincy" title="Leadership" />
          <div className="lead-list">
            {leadership.map((l, i) => (
              <Reveal key={l.org} className="lead" delay={i * 0.06}>
                <div className="lead-head">
                  <div>
                    <span className="lead-dates">{l.dates}</span>
                    <h3>{l.org}</h3>
                    <span className="lead-role">{l.role}</span>
                  </div>
                  <p>{l.body}</p>
                </div>
                <div className="lead-stats">
                  {l.stats.map((s) => (
                    <div key={s.label}>
                      <b className="led">{s.value}</b>
                      <span>{s.label}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section tight">
        <div className="wrap">
          <SectionHead num="02" kicker="Doubles" title="Open source" />
          <div className="oss">
            {openSource.map((o, i) => (
              <Reveal key={o.name} delay={i * 0.06}>
                <a href={o.href} target="_blank" rel="noreferrer" className="oss-card">
                  <span className="eyebrow">{o.org}</span>
                  <h3>{o.name}</h3>
                  <p>{o.body}</p>
                  <div className="tags">
                    {o.tags.map((t) => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                  <Icon.ext className="oss-ext" />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section tight">
        <div className="wrap">
          <SectionHead num="03" kicker="Tournaments" title="Hackathons" />
          <div className="hacks">
            {hackathons.map((h) => {
              const inner = (
                <>
                  <span className="hack-year led">{h.year}</span>
                  <div>
                    <b>{h.event}</b>
                    <span>{h.project}</span>
                  </div>
                  <span className="hack-result">{h.result}</span>
                  <Icon.arrow />
                </>
              );
              return (
                <Reveal key={h.event}>
                  {h.href.startsWith('/') ? (
                    <Link to={h.href} className="hack">{inner}</Link>
                  ) : (
                    <a href={h.href} target="_blank" rel="noreferrer" className="hack">{inner}</a>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </Page>
  );
}
