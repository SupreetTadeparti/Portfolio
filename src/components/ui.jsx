import { Fragment, useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion, animate } from 'framer-motion';

/** Renders **bold** markers from resume copy as <strong>. */
export function Rich({ text }) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') ? <strong key={i}>{part.slice(2, -2)}</strong> : <Fragment key={i}>{part}</Fragment>
  );
}

// The broadcast wipe only plays on navigation, not on the first page load.
let firstPage = true;

/** Route wrapper: fade/slide in, plus a team-colored broadcast wipe. */
export function Page({ children, color = 'var(--ball)' }) {
  const reduce = useReducedMotion();
  const wipe = useRef(!firstPage && !reduce);
  useEffect(() => {
    firstPage = false;
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 16 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.2, 0.8, 0.2, 1], delay: reduce ? 0 : 0.15 } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      style={{ '--accent': color }}
    >
      {wipe.current && (
        <div className="wipe" aria-hidden="true">
          <motion.div
            style={{ background: color }}
            initial={{ scaleX: 1, originX: 1 }}
            animate={{ scaleX: 0, transition: { duration: 0.55, ease: [0.7, 0, 0.2, 1] } }}
          />
        </div>
      )}
      {children}
    </motion.div>
  );
}

export function Reveal({ children, delay = 0, y = 24, className, as = 'div' }) {
  const reduce = useReducedMotion();
  const M = motion[as];
  return (
    <M
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </M>
  );
}

export function Eyebrow({ children, live }) {
  return (
    <span className="eyebrow">
      {live ? <span className="live-dot" /> : <span className="bar" />}
      {children}
    </span>
  );
}

export function SectionHead({ num, kicker, title, children }) {
  return (
    <div className="section-head">
      <div>
        <Eyebrow>
          {num && <span className="section-num">{num}</span>} {kicker}
        </Eyebrow>
        <h2>{title}</h2>
      </div>
      {children && <p>{children}</p>}
    </div>
  );
}

/** LED counter that ticks up when scrolled into view. */
export function Counter({ value, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(0, value, { duration: 1.4, ease: [0.2, 0.8, 0.2, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, reduce, value]);

  return (
    <span ref={ref} className="led" aria-label={`${value.toLocaleString()}${suffix}`}>
      {n.toLocaleString()}
      <em>{suffix}</em>
    </span>
  );
}

export const Icon = {
  arrow: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  ext: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  ),
  download: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
      <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
    </svg>
  ),
  github: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.3-1.69-1.3-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.7 5.38-5.27 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  ),
  mail: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  ),
  sun: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" {...p}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  ),
  moon: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
    </svg>
  ),
  menu: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" {...p}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  ),
  close: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" {...p}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  ),
};

export function useMedia(query) {
  const get = () => typeof window !== 'undefined' && window.matchMedia(query).matches;
  const [match, setMatch] = useState(get);
  useEffect(() => {
    const m = window.matchMedia(query);
    const on = () => setMatch(m.matches);
    m.addEventListener('change', on);
    return () => m.removeEventListener('change', on);
  }, [query]);
  return match;
}
