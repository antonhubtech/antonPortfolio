import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import { testimonials } from '../data/content';

/** Swipeable testimonial slider. Content is placeholder until real quotes are added in content.ts. */
export default function Testimonials() {
  const [[i, dir], set] = useState<[number, number]>([0, 1]);
  const go = (d: number) => set([(i + d + testimonials.length) % testimonials.length, d]);
  const t = testimonials[i];

  return (
    <div className="panel relative overflow-hidden rounded-[2rem] p-8 sm:p-12">
      <Quote className="absolute right-8 top-8 h-24 w-24 text-white/[0.04]" aria-hidden />
      <div className="relative min-h-[11rem]" aria-live="polite">
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <motion.figure
            key={i}
            custom={dir}
            variants={{
              enter: (d: number) => ({ opacity: 0, x: d * 40 }),
              center: { opacity: 1, x: 0 },
              exit: (d: number) => ({ opacity: 0, x: d * -40 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) go(1);
              else if (info.offset.x > 60) go(-1);
            }}
          >
            <blockquote className="font-display text-[clamp(1.3rem,2.6vw,2rem)] font-medium leading-snug tracking-tight">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-7 flex items-center gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-azure/40 to-violet/40 font-mono text-xs">
                {i + 1}
              </span>
              <span>
                <span className="block font-semibold">{t.name}</span>
                <span className="block text-sm text-muted">{t.role}</span>
              </span>
              <span className="ml-auto hidden rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-dim sm:block">
                Placeholder
              </span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      <div className="relative mt-8 flex items-center justify-between">
        <div className="flex gap-2" role="tablist" aria-label="Choose testimonial">
          {testimonials.map((_, n) => (
            <button
              key={n}
              type="button"
              role="tab"
              aria-selected={n === i}
              aria-label={`Testimonial ${n + 1}`}
              onClick={() => set([n, n > i ? 1 : -1])}
              className="group grid h-6 place-items-center"
            >
              <span className={`h-1.5 rounded-full transition-all duration-500 ${n === i ? 'w-8 bg-cyan' : 'w-3 bg-white/20 group-hover:bg-white/40'}`} />
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {[
            { d: -1, Icon: ArrowLeft, label: 'Previous testimonial' },
            { d: 1, Icon: ArrowRight, label: 'Next testimonial' },
          ].map(({ d, Icon, label }) => (
            <motion.button
              key={d}
              type="button"
              aria-label={label}
              onClick={() => go(d)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.9 }}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.04] transition-colors hover:border-cyan/50"
            >
              <Icon className="h-4 w-4" />
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
