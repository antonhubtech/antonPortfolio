import { motion } from 'motion/react';

const PATHS: Record<string, string> = {
  linkedin:
    'M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3a1.97 1.97 0 1 0 0 3.94 1.97 1.97 0 0 0 0-3.94ZM20.44 13.4c0-3.1-1.65-4.55-3.85-4.55a3.32 3.32 0 0 0-3 1.65V8.5h-3.38V20h3.38v-6.2c0-1.63.31-3.2 2.33-3.2 2 0 2.02 1.86 2.02 3.31V20h3.5v-6.6Z',
  instagram:
    'M12 7.2a4.8 4.8 0 1 0 0 9.6 4.8 4.8 0 0 0 0-9.6Zm0 7.9a3.1 3.1 0 1 1 0-6.2 3.1 3.1 0 0 1 0 6.2ZM17.2 5.5a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2ZM16 2.5H8A5.5 5.5 0 0 0 2.5 8v8A5.5 5.5 0 0 0 8 21.5h8a5.5 5.5 0 0 0 5.5-5.5V8A5.5 5.5 0 0 0 16 2.5Zm3.8 13.5a3.8 3.8 0 0 1-3.8 3.8H8A3.8 3.8 0 0 1 4.2 16V8A3.8 3.8 0 0 1 8 4.2h8A3.8 3.8 0 0 1 19.8 8v8Z',
  facebook:
    'M13.5 21v-7.6h2.6l.4-3h-3V8.5c0-.9.3-1.5 1.5-1.5h1.6V4.3c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1Z',
  x: 'M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.3L5.3 21H2.2l7.2-8.3L1.8 3h6.4l4.4 5.8L17.8 3Zm-1.1 16.2h1.7L7.3 4.7H5.5l11.2 14.5Z',
};

/**
 * Social link. If no URL has been set yet (placeholder), it renders as an inert,
 * clearly-labelled icon rather than a broken link.
 */
export function SocialIcon({ id, label, href }: { id: string; label: string; href: string }) {
  const live = href.trim().length > 0;
  const cls =
    'grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-muted transition-colors duration-300';
  const icon = (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden>
      <path d={PATHS[id]} />
    </svg>
  );

  if (!live) {
    return (
      <span className={`${cls} opacity-70`} title={`${label} — add your link in src/data/content.ts`} role="img" aria-label={`${label} (link not set yet)`}>
        {icon}
      </span>
    );
  }
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.92 }}
      className={`${cls} hover:border-cyan/50 hover:text-cyan`}
    >
      {icon}
    </motion.a>
  );
}
