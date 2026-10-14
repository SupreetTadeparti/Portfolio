import { Link } from 'react-router-dom';
import { Page, Eyebrow } from '../components/ui.jsx';
import '../styles/pages.css';

export default function NotFound() {
  return (
    <Page color="var(--sec)">
      <section className="section fault">
        <div className="wrap">
          <Eyebrow live>Umpire’s call · 404</Eyebrow>
          <h1 className="fault-title">Fault.</h1>
          <p className="page-lede">That ball went off the table. This page doesn’t exist.</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 28 }}>
            <Link to="/" className="btn">Back to center court</Link>
            <Link to="/archive" className="btn ghost">Browse the archive</Link>
          </div>
        </div>
      </section>
    </Page>
  );
}
