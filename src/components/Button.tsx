import { useState, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { Link, type Route } from '../router';
import Magnetic from './Magnetic';

type Variant = 'primary' | 'ghost';
interface Ripple { id: number; x: number; y: number; size: number }

interface Props {
  variant?: Variant;
  to?: Route;
  subject?: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  magnetic?: boolean;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  disabled?: boolean;
  onClick?: () => void;
}

const base =
  'relative inline-flex select-none items-center justify-center gap-2.5 overflow-hidden rounded-full px-7 py-3.5 text-[0.95rem] font-semibold tracking-tight transition-[box-shadow,border-color,background-color] duration-300 disabled:opacity-60 disabled:pointer-events-none';
const styles: Record<Variant, string> = {
  primary:
    'bg-gradient-to-r from-azure to-violet text-white shadow-[0_10px_40px_-10px_rgb(79_139_255/.7)] hover:shadow-[0_14px_50px_-8px_rgb(120_120_255/.85)]',
  ghost: 'glass text-fg hover:border-cyan/50 hover:bg-white/[0.06]',
};

/**
 * Button / link with: magnetic pull, press squish, click ripple and (primary) a light sweep on hover.
 * Renders a real <a> when `to` is provided so navigation stays accessible.
 */
export default function Button({ variant = 'primary', to, subject, icon, children, className = '', magnetic = true, type = 'button', disabled, onClick }: Props) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const spawn = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const size = Math.max(r.width, r.height) * 2;
    const id = performance.now();
    setRipples((rs) => [...rs, { id, x: e.clientX - r.left - size / 2, y: e.clientY - r.top - size / 2, size }]);
    window.setTimeout(() => setRipples((rs) => rs.filter((x) => x.id !== id)), 700);
  };

  const inner = (
    <>
      {variant === 'primary' && (
        <span aria-hidden className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -translate-x-full bg-white/25 opacity-0 blur-md transition-opacity group-hover/btn:opacity-100 group-hover/btn:[animation:shine_0.9s_ease-out]" />
      )}
      {ripples.map((r) => (
        <span
          key={r.id}
          aria-hidden
          className="pointer-events-none absolute rounded-full bg-white/35"
          style={{ left: r.x, top: r.y, width: r.size, height: r.size, transform: 'scale(0)', animation: 'ripple .7s ease-out forwards' }}
        />
      ))}
      <span className="relative z-10 flex items-center gap-2.5">
        {children}
        {icon}
      </span>
    </>
  );

  const cls = `group/btn ${base} ${styles[variant]} ${className}`;

  const el = to ? (
    <motion.span whileTap={{ scale: 0.95 }} className="inline-flex">
      <Link to={to} subject={subject} className={cls} onPointerDown={spawn} onClick={onClick}>
        {inner}
      </Link>
    </motion.span>
  ) : (
    <motion.button whileTap={{ scale: 0.95 }} type={type} disabled={disabled} onClick={onClick} onPointerDown={spawn} className={cls}>
      {inner}
    </motion.button>
  );

  return magnetic ? <Magnetic className="inline-block">{el}</Magnetic> : el;
}
