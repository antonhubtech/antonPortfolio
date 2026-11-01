import { useRef, type HTMLAttributes, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { useFinePointer } from '../hooks';

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart'> {
  children: ReactNode;
  /** Max tilt in degrees; 0 disables tilt */
  tilt?: number;
  /** Shared-element id so the card can expand into a dialog */
  layoutId?: string;
}

/** A panel with a pointer-tracking glow border and optional subtle 3D tilt. */
export default function SpotlightCard({ children, className = '', tilt = 0, layoutId, ...rest }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== 'mouse') return;
    const r = el.getBoundingClientRect();
    const px = e.clientX - r.left;
    const py = e.clientY - r.top;
    el.style.setProperty('--mx', `${px}px`);
    el.style.setProperty('--my', `${py}px`);
    if (tilt) {
      const rx = (0.5 - py / r.height) * tilt;
      const ry = (px / r.width - 0.5) * tilt;
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
    }
  };
  const onLeave = () => {
    if (tilt && ref.current) ref.current.style.transform = '';
  };

  return (
    <motion.div
      ref={ref}
      layoutId={layoutId}
      onPointerMove={fine ? onMove : undefined}
      onPointerLeave={fine ? onLeave : undefined}
      className={`spot panel rounded-3xl transition-transform duration-200 ease-out ${className}`}
      {...(rest as object)}
    >
      {children}
    </motion.div>
  );
}
