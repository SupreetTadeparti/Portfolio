import { now } from '../data/profile.js';

export default function Ticker({ label = 'NOW' }) {
  const items = [...now, ...now];
  return (
    <div className="ticker" role="region" aria-label="What I'm doing now">
      <div className="ticker-label">
        <span className="live-dot" style={{ background: 'currentColor' }} /> {label}
      </div>
      <div className="ticker-track">
        {items.map((n, i) => (
          <span className="ticker-item" key={i} aria-hidden={i >= now.length}>
            <b>{n.label}</b> {n.text}
          </span>
        ))}
      </div>
    </div>
  );
}
