import { useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { Link } from '../router';
import { Logo } from './Nav';
import { navItems, profile } from '../data/content';
import { SocialIcon } from './Social';

/** Thin gradient bar at the very top showing reading progress. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-cyan via-azure to-violet"
      style={{ scaleX }}
    />
  );
}

/** Circular progress ring that doubles as a back-to-top button once you scroll down. */
export function BackToTop() {
  const { scrollY, scrollYProgress } = useScroll();
  const [show, setShow] = useState(false);
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28 });
  useMotionValueEvent(scrollY, 'change', (v) => setShow(v > 700));

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 380, damping: 26 }}
          className="group glass fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full sm:bottom-8 sm:right-8"
        >
          <svg viewBox="0 0 56 56" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden>
            <motion.circle cx="28" cy="28" r="26" fill="none" stroke="#4fe3ff" strokeWidth="2" strokeLinecap="round" style={{ pathLength: progress }} />
          </svg>
          <ArrowUp className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-ink/60 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-14 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-muted">
            {profile.title} helping business owners stay organized and focused on growth.
          </p>
          <p className="mt-4 font-mono text-xs text-dim">{profile.location}</p>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-14 gap-y-2 text-sm">
          {navItems.map((n) => (
            <Link key={n.route} to={n.route} className="text-muted transition-colors hover:text-cyan">
              {n.label}
            </Link>
          ))}
        </nav>
        <div>
          <div className="eyebrow mb-3">Elsewhere</div>
          <div className="flex gap-2">
            {profile.socials.map((s) => (
              <SocialIcon key={s.id} id={s.id} label={s.label} href={s.href} />
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/[0.05] px-6 py-5 text-center font-mono text-[11px] text-dim">
        © {new Date().getFullYear()} {profile.name}. All rights reserved.
      </div>
    </footer>
  );
}
