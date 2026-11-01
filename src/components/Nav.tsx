import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Link, useRouter } from '../router';
import { navItems, profile } from '../data/content';
import Magnetic from './Magnetic';

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link to="home" aria-label={`${profile.name} — home`} className={`group flex items-center gap-3 ${className}`}>
      <span className="relative grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-gradient-to-br from-azure/25 to-violet/25">
        <svg viewBox="0 0 32 32" className="h-5 w-5 transition-transform duration-500 group-hover:rotate-[360deg]" aria-hidden>
          <path d="M8 9l8 15 8-15" fill="none" stroke="#4fe3ff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="max-w-[9.5rem] truncate font-display text-sm font-semibold tracking-tight sm:max-w-none">{profile.name}</span>
    </Link>
  );
}

export default function Nav() {
  const { route } = useRouter();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState<string | null>(null);

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 24));

  // Close the mobile menu on route change and lock scroll while open
  useEffect(() => setOpen(false), [route]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', esc);
    return () => {
      window.removeEventListener('keydown', esc);
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <a
        href="#main"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('main')?.focus();
        }}
        className="fixed left-4 top-4 z-[120] -translate-y-20 rounded-full bg-fg px-4 py-2 text-sm font-semibold text-ink focus:translate-y-0"
      >
        Skip to content
      </a>

      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-5">
        <motion.nav
          aria-label="Primary"
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className={`glass flex w-full max-w-5xl items-center justify-between gap-2 rounded-full py-2 pl-2.5 pr-2.5 transition-all duration-500 ${
            scrolled ? 'bg-night/70 shadow-[0_20px_60px_-20px_rgb(0_0_0/.8)]' : ''
          }`}
        >
          <Logo />

          {/* Desktop links */}
          <ul className="relative hidden items-center gap-1 lg:flex" onPointerLeave={() => setHover(null)}>
            {navItems.map((n) => {
              const active = route === n.route;
              return (
                <li key={n.route} className="relative">
                  <Link
                    to={n.route}
                    aria-current={active ? 'page' : undefined}
                    onPointerEnter={() => setHover(n.route)}
                    onFocus={() => setHover(n.route)}
                    className={`relative z-10 block rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                      active ? 'text-white' : 'text-muted hover:text-fg'
                    }`}
                  >
                    {n.label}
                  </Link>
                  {hover === n.route && !active && (
                    <motion.span
                      layoutId="nav-hover"
                      className="absolute inset-0 rounded-full bg-white/[0.06]"
                      transition={{ type: 'spring', stiffness: 500, damping: 38 }}
                    />
                  )}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-azure/80 to-violet/80 shadow-[0_0_24px_-4px_rgb(79_139_255/.8)]"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <Magnetic strength={0.25} className="hidden sm:block">
              <Link
                to="contact"
                className="group inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold transition-colors hover:border-cyan/50 hover:bg-white/[0.08]"
              >
                Let’s talk
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </Magnetic>
            <button
              type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] lg:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? 'x' : 'm'}
                  initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.2 }}
                >
                  {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile / tablet overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-label="Menu"
            className="fixed inset-0 z-40 flex flex-col justify-center bg-ink/95 px-8 backdrop-blur-xl lg:hidden"
            initial={{ clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 2.5rem) 2.5rem)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)' }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul className="space-y-1">
              {navItems.map((n, i) => (
                <motion.li
                  key={n.route}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.25 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
                  exit={{ opacity: 0 }}
                >
                  <Link
                    to={n.route}
                    aria-current={route === n.route ? 'page' : undefined}
                    className={`flex items-baseline gap-4 py-2.5 font-display text-4xl font-semibold tracking-tight sm:text-5xl ${
                      route === n.route ? 'text-gradient' : 'text-fg'
                    }`}
                  >
                    <span className="font-mono text-xs text-dim">{String(i + 1).padStart(2, '0')}</span>
                    {n.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <p className="eyebrow mt-10 text-muted!">{profile.availability}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
