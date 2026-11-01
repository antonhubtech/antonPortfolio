import { useRef, type ElementType, type ReactNode } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react';

const EASE = [0.16, 1, 0.3, 1] as const;

/** Fade + rise when scrolled into view. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className = '',
  as = 'div',
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'li' | 'section' | 'article';
}) {
  const M = motion[as];
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </M>
  );
}

/** Staggered card/list wrapper — children should be <StaggerItem>. */
export function Stagger({ children, className = '', gap = 0.08 }: { children: ReactNode; className?: string; gap?: number }) {
  return (
    <motion.div
      className={className}
      initial="hide"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      variants={{ hide: {}, show: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </motion.div>
  );
}
export function StaggerItem({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={{ hide: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Word-by-word masked text reveal. Each word slides up from behind a clip,
 * so headlines feel "typeset" in rather than just fading.
 */
export function SplitText({
  text,
  className = '',
  as: Tag = 'span',
  delay = 0,
  trigger = 'view',
  show = true,
  wordClassName = '',
}: {
  text: string;
  className?: string;
  as?: ElementType;
  delay?: number;
  trigger?: 'view' | 'mount';
  show?: boolean;
  wordClassName?: string;
}) {
  const words = text.split(' ');
  const props =
    trigger === 'view'
      ? { initial: 'hide', whileInView: 'show', viewport: { once: true, margin: '0px 0px -10% 0px' } }
      : { initial: 'hide', animate: show ? 'show' : 'hide' };
  return (
    <Tag className={className}>
      {/* Real text for assistive tech; the animated copy below is decorative */}
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden
        className="inline"
        {...props}
        variants={{ hide: {}, show: { transition: { staggerChildren: 0.055, delayChildren: delay } } }}
      >
        {words.map((w, i) => (
          <span key={i} className="inline-block overflow-hidden whitespace-nowrap pb-[0.12em] align-bottom">
            <motion.span
              className={`inline-block ${wordClassName}`}
              variants={{ hide: { y: '110%' }, show: { y: 0, transition: { duration: 0.9, ease: EASE } } }}
            >
              {w}
              {i < words.length - 1 ? ' ' : ''}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {word}&nbsp;
    </motion.span>
  );
}

/** Paragraph whose words light up as you scroll through it. */
export function ScrollWords({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.55'] });
  const words = text.split(' ');
  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((w, i) => {
          const a = i / words.length;
          return <Word key={i} word={w} progress={scrollYProgress} range={[a, Math.min(1, a + 1.4 / words.length)]} />;
        })}
      </span>
    </p>
  );
}
