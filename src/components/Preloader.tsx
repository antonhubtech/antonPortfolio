import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { profile } from '../data/content';

/** Branded loader: a monogram that draws itself while a counter fills, then lifts away. */
export default function Preloader({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion();
  const [pct, setPct] = useState(0);

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    const total = reduce ? 500 : 1900;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / total);
      // ease-out so it feels like it's "settling"
      setPct(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else window.setTimeout(onDone, 250);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.style.overflow = '';
    };
  }, [onDone, reduce]);

  return (
    <motion.div
      role="status"
      aria-label="Loading"
      className="fixed inset-0 z-[110] flex flex-col items-center justify-center bg-ink"
      initial={{ y: 0 }}
      exit={{ y: '-100%', transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] } }}
    >
      <div className="absolute inset-0 grid-lines opacity-60" />
      <div className="relative flex flex-col items-center">
        <div className="relative h-28 w-28">
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full -rotate-90">
            <circle cx="50" cy="50" r="46" fill="none" stroke="rgb(255 255 255 / .07)" strokeWidth="1.5" />
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="url(#pl)"
              strokeWidth="2"
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray="1"
              strokeDashoffset={1 - pct / 100}
            />
            <defs>
              <linearGradient id="pl" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#4fe3ff" />
                <stop offset="1" stopColor="#8d6bff" />
              </linearGradient>
            </defs>
          </svg>
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
            <motion.path
              d="M30 34 L50 68 L70 34"
              fill="none"
              stroke="#e9edf7"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: reduce ? 0.2 : 1.1, ease: 'easeInOut', delay: 0.15 }}
            />
          </svg>
        </div>
        <div className="mt-8 font-display text-sm font-medium tracking-[0.3em] text-fg">{profile.monogram}</div>
        <div className="mt-2 font-mono text-xs tabular-nums text-muted">{String(pct).padStart(3, '0')}</div>
        <div className="eyebrow mt-6 text-muted!">Preparing your workspace</div>
      </div>
    </motion.div>
  );
}
