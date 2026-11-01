import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useFinePointer } from '../hooks';

type Mode = 'default' | 'link' | 'text' | 'label';

const INTERACTIVE = 'a, button, [role="button"], summary, label[for], select';
const TEXTUAL = 'input, textarea';

/**
 * Two-part cursor: a precise dot and a trailing ring that morphs by context.
 *  - links / buttons → ring grows
 *  - inputs          → ring becomes a text caret
 *  - [data-cursor="Label"] → ring expands and shows the label (e.g. "View")
 */
export default function Cursor() {
  const fine = useFinePointer();
  const [mode, setMode] = useState<Mode>('default');
  const [label, setLabel] = useState('');
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 420, damping: 36, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 420, damping: 36, mass: 0.5 });

  useEffect(() => {
    if (!fine) return;
    document.documentElement.classList.add('has-cursor');

    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const over = (e: PointerEvent) => {
      const t = e.target as Element | null;
      if (!t || !t.closest) return;
      const labelled = t.closest<HTMLElement>('[data-cursor]');
      if (labelled) {
        setMode('label');
        setLabel(labelled.dataset.cursor ?? '');
      } else if (t.closest(TEXTUAL)) setMode('text');
      else if (t.closest(INTERACTIVE)) setMode('link');
      else setMode('default');
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);
    const leave = () => setVisible(false);

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerover', over, { passive: true });
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    document.documentElement.addEventListener('pointerleave', leave);
    return () => {
      document.documentElement.classList.remove('has-cursor');
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', over);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
      document.documentElement.removeEventListener('pointerleave', leave);
    };
  }, [fine, x, y]);

  if (!fine) return null;

  const size = mode === 'label' ? 84 : mode === 'link' ? 56 : mode === 'text' ? 28 : 34;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]" style={{ opacity: visible ? 1 : 0, transition: 'opacity .25s' }}>
      {/* trailing ring */}
      <motion.div className="absolute left-0 top-0" style={{ x: rx, y: ry }}>
        <motion.div
          className="flex items-center justify-center rounded-full border text-[11px] font-medium uppercase tracking-widest"
          style={{ translateX: '-50%', translateY: '-50%' }}
          animate={{
            width: mode === 'text' ? 2 : size,
            height: mode === 'text' ? 26 : size,
            scale: pressed ? 0.82 : 1,
            borderRadius: mode === 'text' ? 2 : 999,
            backgroundColor:
              mode === 'label' ? 'rgba(79,139,255,0.9)' : mode === 'link' ? 'rgba(79,227,255,0.10)' : 'rgba(79,227,255,0)',
            borderColor: mode === 'label' ? 'rgba(255,255,255,0)' : mode === 'text' ? 'rgba(79,227,255,0.9)' : 'rgba(79,227,255,0.55)',
            color: '#fff',
          }}
          transition={{ type: 'spring', stiffness: 380, damping: 28 }}
        >
          {mode === 'label' && <span>{label}</span>}
        </motion.div>
      </motion.div>
      {/* precise dot */}
      <motion.div className="absolute left-0 top-0" style={{ x, y }}>
        <motion.div
          className="h-1.5 w-1.5 rounded-full bg-cyan"
          style={{ translateX: '-50%', translateY: '-50%' }}
          animate={{ opacity: mode === 'label' || mode === 'text' ? 0 : 1, scale: pressed ? 2 : 1 }}
        />
      </motion.div>
    </div>
  );
}
