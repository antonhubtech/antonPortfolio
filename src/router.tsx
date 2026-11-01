import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { navItems } from './data/content';

export const ROUTES = ['home', 'about', 'services', 'portfolio', 'tools', 'contact'] as const;
export type Route = (typeof ROUTES)[number];

const parse = (): Route => {
  const seg = window.location.hash.replace(/^#\/?/, '').split(/[?/]/)[0];
  return (ROUTES as readonly string[]).includes(seg) ? (seg as Route) : 'home';
};
const toHash = (r: Route) => `#${r}`;

interface NavOptions {
  subject?: string;
}
interface RouterCtx {
  route: Route;
  navigate: (to: Route, opts?: NavOptions) => void;
  /** Subject carried over from e.g. a service card to the contact form */
  subject: string;
  clearSubject: () => void;
}

const Ctx = createContext<RouterCtx | null>(null);

export const useRouter = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error('useRouter must be used inside <RouterProvider>');
  return v;
};

const COVER_MS = 620;
const REVEAL_MS = 700;

/**
 * Tiny hash router with a cinematic curtain transition.
 * Hash routing keeps every page deep-linkable and works on any static host.
 */
export function RouterProvider({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const [route, setRoute] = useState<Route>(parse);
  const [phase, setPhase] = useState<'idle' | 'cover' | 'reveal'>('idle');
  const [target, setTarget] = useState<Route>(route);
  const [subject, setSubject] = useState('');
  const routeRef = useRef(route);
  const busy = useRef(false);

  const swap = useCallback(
    (next: Route) => {
      if (next === routeRef.current) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      if (busy.current) return;
      if (reduce) {
        routeRef.current = next;
        setRoute(next);
        window.scrollTo({ top: 0, behavior: 'instant' });
        return;
      }
      busy.current = true;
      setTarget(next);
      setPhase('cover');
      window.setTimeout(() => {
        routeRef.current = next;
        setRoute(next);
        window.scrollTo({ top: 0, behavior: 'instant' });
        setPhase('reveal');
        window.setTimeout(() => {
          setPhase('idle');
          busy.current = false;
        }, REVEAL_MS);
      }, COVER_MS);
    },
    [reduce],
  );

  const navigate = useCallback(
    (to: Route, opts?: NavOptions) => {
      if (opts?.subject !== undefined) setSubject(opts.subject);
      if (window.location.hash !== toHash(to) && !(to === 'home' && !window.location.hash)) {
        window.history.pushState(null, '', toHash(to));
      }
      swap(to);
    },
    [swap],
  );

  // Browser back / forward and manual hash edits
  useEffect(() => {
    const onNav = () => swap(parse());
    window.addEventListener('popstate', onNav);
    window.addEventListener('hashchange', onNav);
    return () => {
      window.removeEventListener('popstate', onNav);
      window.removeEventListener('hashchange', onNav);
    };
  }, [swap]);

  // Keep the document title in step with the page
  useEffect(() => {
    const label = navItems.find((n) => n.route === route)?.label ?? 'Home';
    document.title = route === 'home' ? 'Anton as VA' : `${label} · Anton — Virtual Assistant`;
  }, [route]);

  const value = useMemo<RouterCtx>(
    () => ({ route, navigate, subject, clearSubject: () => setSubject('') }),
    [route, navigate, subject],
  );

  const label = navItems.find((n) => n.route === target);
  const idx = ROUTES.indexOf(target) + 1;

  return (
    <Ctx.Provider value={value}>
      {children}
      {/* Curtain */}
      <div
        aria-hidden
        className="fixed inset-0 z-[90]"
        style={{ pointerEvents: phase === 'idle' ? 'none' : 'auto' }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-azure via-violet to-cyan"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: phase === 'cover' ? 1 : 0 }}
          style={{ transformOrigin: phase === 'cover' ? 'bottom' : 'top' }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1], delay: phase === 'cover' ? 0 : 0.1 }}
        />
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-ink"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: phase === 'cover' ? 1 : 0 }}
          style={{ transformOrigin: phase === 'cover' ? 'bottom' : 'top' }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1], delay: phase === 'cover' ? 0.1 : 0 }}
        >
          <motion.div
            className="text-center"
            animate={{ opacity: phase === 'cover' ? 1 : 0, y: phase === 'cover' ? 0 : -12 }}
            transition={{ duration: 0.35, delay: phase === 'cover' ? 0.3 : 0 }}
          >
            <div className="eyebrow">{String(idx).padStart(2, '0')} / 06</div>
            <div className="font-display mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">{label?.label}</div>
          </motion.div>
        </motion.div>
      </div>
    </Ctx.Provider>
  );
}

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { to: Route; subject?: string };

/** Real <a href> for accessibility / open-in-new-tab, intercepted for animated navigation. */
export function Link({ to, subject, onClick, children, ...rest }: LinkProps) {
  const { navigate } = useRouter();
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    navigate(to, subject !== undefined ? { subject } : undefined);
  };
  return (
    <a href={toHash(to)} onClick={handle} {...rest}>
      {children}
    </a>
  );
}
