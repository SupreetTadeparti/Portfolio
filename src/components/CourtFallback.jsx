import { useEffect, useRef } from 'react';
import { animate, useReducedMotion } from 'framer-motion';
import { roleList } from '../data/roles.js';

// Perspective table drawn in SVG for phones and reduced-motion visitors.
// Far edge y=70, near edge y=330; zones sit on the far half.
const FAR_Y = 70;
const NET_Y = 175;
const NEAR_Y = 330;
const xAt = (y, t) => {
  // t in [-1, 1] across the table width; table narrows toward the far end.
  const half = 95 + ((y - FAR_Y) / (NEAR_Y - FAR_Y)) * 80;
  return 200 + t * half;
};
const zoneCenter = (i) => ({ x: xAt(120, (i - 1) * 0.66), y: 120 });

export default function CourtFallback({ hover, setHover, serve, onPick, onLanded }) {
  const ball = useRef(null);
  const trail = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!serve) return;
    const i = roleList.findIndex((r) => r.id === serve);
    const end = zoneCenter(i);
    const start = { x: 200, y: 360 };
    const ctrl = { x: (start.x + end.x) / 2, y: 40 };
    const d = `M${start.x} ${start.y} Q${ctrl.x} ${ctrl.y} ${end.x} ${end.y}`;
    trail.current?.setAttribute('d', d);
    if (reduce) {
      onLanded?.();
      return;
    }
    const c = animate(0, 1, {
      duration: 0.7,
      ease: 'easeIn',
      onUpdate: (t) => {
        const x = (1 - t) ** 2 * start.x + 2 * (1 - t) * t * ctrl.x + t * t * end.x;
        const y = (1 - t) ** 2 * start.y + 2 * (1 - t) * t * ctrl.y + t * t * end.y;
        ball.current?.setAttribute('cx', x);
        ball.current?.setAttribute('cy', y);
        trail.current?.style.setProperty('stroke-dashoffset', String(600 - 600 * t));
      },
      onComplete: () => onLanded?.(),
    });
    return () => c.stop();
  }, [serve, reduce, onLanded]);

  const corner = (y, t) => `${xAt(y, t)},${y}`;

  return (
    <div className="court-fallback">
      <svg viewBox="0 0 400 380" role="img" aria-label="Table tennis table with three courts: Security, Full-Stack and ML">
        <defs>
          <linearGradient id="tbl" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#15409e" />
            <stop offset="1" stopColor="#2367ee" />
          </linearGradient>
          <radialGradient id="ballg" cx="35%" cy="30%">
            <stop offset="0" stopColor="#ffc196" />
            <stop offset=".6" stopColor="#ff6a1a" />
            <stop offset="1" stopColor="#b23c06" />
          </radialGradient>
        </defs>
        <ellipse cx="200" cy="350" rx="190" ry="22" fill="#000" opacity=".35" />
        <polygon points={`${corner(FAR_Y, -1)} ${corner(FAR_Y, 1)} ${corner(NEAR_Y, 1)} ${corner(NEAR_Y, -1)}`} fill="url(#tbl)" stroke="#fff" strokeWidth="3" />
        <line x1="200" y1={FAR_Y} x2="200" y2={NEAR_Y} stroke="#fff" strokeWidth="1.2" opacity=".85" />
        {roleList.map((r, i) => {
          const a = -1 + (i * 2) / 3 + 0.03;
          const b = -1 + ((i + 1) * 2) / 3 - 0.03;
          const y1 = FAR_Y + 8;
          const y2 = NET_Y - 10;
          const on = hover === r.id || serve === r.id;
          return (
            <g
              key={r.id}
              onPointerEnter={() => setHover(r.id)}
              onPointerLeave={() => setHover(null)}
              onClick={() => onPick(r.id)}
              style={{ cursor: 'pointer' }}
            >
              <polygon
                points={`${corner(y1, a)} ${corner(y1, b)} ${corner(y2, b)} ${corner(y2, a)}`}
                fill={r.hex}
                opacity={on ? 0.55 : 0.2}
                style={{ transition: 'opacity .25s' }}
              />
              <text x={zoneCenter(i).x} y={zoneCenter(i).y + 4} textAnchor="middle" fill="#fff" fontFamily="Unbounded, sans-serif" fontWeight="700" fontSize="11">
                {r.short}
              </text>
            </g>
          );
        })}
        {/* net */}
        <line x1={xAt(NET_Y, -1) - 14} y1={NET_Y} x2={xAt(NET_Y, 1) + 14} y2={NET_Y} stroke="#0b1020" strokeWidth="10" />
        <line x1={xAt(NET_Y, -1) - 14} y1={NET_Y - 5} x2={xAt(NET_Y, 1) + 14} y2={NET_Y - 5} stroke="#fff" strokeWidth="2" />
        <path ref={trail} d="M200 360" fill="none" stroke="#ff8a3d" strokeWidth="2" strokeDasharray="600" strokeDashoffset="600" strokeLinecap="round" opacity=".9" />
        <circle ref={ball} cx="200" cy="360" r="8" fill="url(#ballg)" className={serve || reduce ? '' : 'bob'} />
      </svg>
    </div>
  );
}
