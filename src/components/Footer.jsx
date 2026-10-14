import { Link } from 'react-router-dom';
import { profile } from '../data/profile.js';
import { roleList } from '../data/roles.js';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <span className="eyebrow"><span className="bar" /> Match point</span>
            <h3 style={{ marginTop: 12 }}>
              <a href={`mailto:${profile.email}`}>Let’s rally →</a>
            </h3>
          </div>
          <div className="footer-links">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
            <a href={profile.devpost} target="_blank" rel="noreferrer">Devpost</a>
            {roleList.map((r) => (
              <Link key={r.id} to={`/${r.id}`}>{r.label}</Link>
            ))}
            <Link to="/about">About</Link>
            <Link to="/archive">Archive</Link>
          </div>
        </div>
        <div className="footer-base">
          <span>© {new Date().getFullYear()} {profile.name} · {profile.location}</span>
          <span title={profile.binaryBio}>Spreading love through code 🏓</span>
        </div>
      </div>
    </footer>
  );
}
