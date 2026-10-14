import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useMedia } from './ui.jsx';

const INTERACTIVE = 'a, button, select, summary, label, [role="button"]';
const TEXT = 'input, textarea, [contenteditable="true"]';

/**
 * Ping-pong ball cursor: the ball tracks the pointer exactly, a ring follows with a little lag.
 * States: hover (links/buttons), grab/drag (the 3D table), text (native caret), hidden.
 * The 3D arena reports its state through a `cursor` window event.
 */
export default function Cursor() {
  const fine = useMedia('(hover: hover) and (pointer: fine)');
  const reduce = useReducedMotion();
  const enabled = fine && !reduce;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 380, damping: 32, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 380, damping: 32, mass: 0.5 });
  const [state, setState] = useState('hidden');
  const [down, setDown] = useState(false);
  const override = useRef(null);

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add('has-cursor');

    const resolve = (target) => {
      if (override.current) return override.current;
      if (target?.closest?.(TEXT)) return 'text';
      if (target?.closest?.(INTERACTIVE)) return 'hover';
      return 'idle';
    };
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setState(resolve(e.target));
    };
    const onCursor = (e) => {
      override.current = e.detail;
      setState(e.detail || 'idle');
    };
    const leave = () => setState('hidden');
    const press = () => setDown(true);
    const release = () => setDown(false);

    window.addEventListener('pointermove', move);
    window.addEventListener('cursor', onCursor);
    document.addEventListener('pointerleave', leave);
    window.addEventListener('pointerdown', press);
    window.addEventListener('pointerup', release);
    return () => {
      root.classList.remove('has-cursor');
      window.removeEventListener('pointermove', move);
      window.removeEventListener('cursor', onCursor);
      document.removeEventListener('pointerleave', leave);
      window.removeEventListener('pointerdown', press);
      window.removeEventListener('pointerup', release);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <div className={`cursor is-${state}${down ? ' is-down' : ''}`} aria-hidden="true">
      <motion.div className="cursor-ring" style={{ x: rx, y: ry }}>
        <span className="cursor-label">{state === 'drag' ? '⟲' : state === 'grab' ? 'DRAG' : ''}</span>
      </motion.div>
      <motion.div className="cursor-ball" style={{ x, y }} />
    </div>
  );
}
