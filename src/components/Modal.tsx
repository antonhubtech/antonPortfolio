import { useEffect, useRef, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';

/**
 * Accessible modal shell shared by Services and Portfolio.
 * - `layoutId` makes the dialog grow out of the card that opened it
 * - Esc / backdrop click closes; focus moves in and is restored on close; page scroll is locked
 */
export default function Modal({
  layoutId,
  label,
  onClose,
  children,
  className = '',
}: {
  layoutId: string;
  label: string;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.documentElement.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      // minimal focus trap
      if (e.key === 'Tab' && panelRef.current) {
        const f = panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input, textarea, [tabindex]:not([tabindex="-1"])');
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = '';
      prev?.focus?.();
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-6" role="presentation">
      <motion.div
        className="absolute inset-0 bg-ink/80 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        ref={panelRef}
        layoutId={layoutId}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        style={{ borderRadius: 28 }}
        transition={{ type: 'spring', stiffness: 260, damping: 30 }}
        className={`relative max-h-[92svh] w-full max-w-2xl overflow-y-auto border border-white/10 bg-night shadow-[0_40px_120px_-20px_rgb(0_0_0/.9)] ${className}`}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="glass absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full transition-transform hover:rotate-90 active:scale-90"
        >
          <X className="h-4 w-4" />
        </button>
        {children}
      </motion.div>
    </div>
  );
}
