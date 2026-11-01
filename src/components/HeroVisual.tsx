import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from 'motion/react';
import { CalendarClock, Check, Inbox } from 'lucide-react';

/** Layer that shifts against the pointer, giving the scene real depth. */
function Layer({
  mx,
  my,
  depth,
  className = '',
  children,
}: {
  mx: MotionValue<number>;
  my: MotionValue<number>;
  depth: number;
  className?: string;
  children: React.ReactNode;
}) {
  const x = useTransform(mx, (v) => v * depth);
  const y = useTransform(my, (v) => v * depth);
  return (
    <motion.div className={className} style={{ x, y }}>
      {children}
    </motion.div>
  );
}

/**
 * Interactive centerpiece: a luminous core with orbiting rings and three
 * floating "workspace" widgets. Everything reacts to pointer position.
 * Purely decorative (aria-hidden); widget text is illustrative, not data.
 */
export default function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const mx = useSpring(px, { stiffness: 90, damping: 18 });
  const my = useSpring(py, { stiffness: 90, damping: 18 });
  const rotX = useTransform(my, (v) => -v * 0.06);
  const rotY = useTransform(mx, (v) => v * 0.06);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    px.set(((e.clientX - r.left) / r.width - 0.5) * 100);
    py.set(((e.clientY - r.top) / r.height - 0.5) * 100);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      aria-hidden
      className="relative mx-auto aspect-square w-full max-w-[560px] [perspective:1200px]"
    >
      <motion.div className="absolute inset-0" style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}>
        {/* Halo */}
        <Layer mx={mx} my={my} depth={0.2} className="absolute inset-[8%]">
          <div className="h-full w-full rounded-full bg-[radial-gradient(circle,rgb(79_139_255/.28),transparent_68%)] blur-2xl" />
        </Layer>

        {/* Rings */}
        <Layer mx={mx} my={my} depth={0.4} className="absolute inset-[6%]">
          <div className="animate-spin-slow h-full w-full rounded-full border border-white/10 [animation-duration:60s]">
            <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan shadow-[0_0_18px_4px_rgb(79_227_255/.6)]" />
          </div>
        </Layer>
        <Layer mx={mx} my={my} depth={0.7} className="absolute inset-[18%]">
          <div className="h-full w-full rounded-full border border-dashed border-white/15 [animation:spin-rev_90s_linear_infinite]">
            <span className="absolute bottom-[8%] right-[12%] h-2 w-2 rounded-full bg-violet shadow-[0_0_16px_3px_rgb(141_107_255/.7)]" />
          </div>
        </Layer>
        <Layer mx={mx} my={my} depth={1} className="absolute inset-[30%]">
          <div className="animate-spin-slow h-full w-full rounded-full border border-azure/30 [animation-duration:40s]">
            <span className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-azure" />
          </div>
        </Layer>

        {/* Core */}
        <Layer mx={mx} my={my} depth={1.4} className="absolute inset-[38%]">
          <div className="relative h-full w-full rounded-full bg-[radial-gradient(circle_at_32%_28%,#bff3ff,#4f8bff_38%,#5b3fd1_72%,#1a1450)] shadow-[0_0_80px_10px_rgb(79_139_255/.45),inset_0_-12px_30px_rgb(0_0_20/.5)]">
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_70%_80%,transparent_40%,rgb(0_0_0/.35))]" />
            <svg viewBox="0 0 32 32" className="absolute inset-[28%] h-[44%] w-[44%] drop-shadow-[0_2px_8px_rgb(0_0_40/.5)]">
              <path d="M8 9l8 15 8-15" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </Layer>

        {/* Widget: inbox */}
        <Layer mx={mx} my={my} depth={2.2} className="absolute left-[-4%] top-[12%] w-[40%]">
          <div className="animate-float glass rounded-2xl p-3.5 shadow-2xl [animation-delay:-1s] sm:p-4">
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-azure/20 text-azure">
                <Inbox className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <div className="truncate text-[0.8rem] font-semibold">Inbox</div>
                <div className="truncate font-mono text-[0.65rem] text-muted">triaged &amp; labeled</div>
              </div>
            </div>
            <div className="mt-3 space-y-1.5">
              {[88, 64, 40].map((w) => (
                <div key={w} className="h-1.5 rounded-full bg-white/10" style={{ width: `${w}%` }} />
              ))}
            </div>
          </div>
        </Layer>

        {/* Widget: calendar */}
        <Layer mx={mx} my={my} depth={2.8} className="absolute right-[-4%] top-[22%] w-[42%]">
          <div className="animate-float glass rounded-2xl p-3.5 shadow-2xl [animation-delay:-3s] sm:p-4">
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-violet/20 text-violet">
                <CalendarClock className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <div className="truncate text-[0.8rem] font-semibold">Calendar</div>
                <div className="truncate font-mono text-[0.65rem] text-muted">focus time protected</div>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-5 gap-1">
              {[0, 1, 0, 1, 1].map((on, i) => (
                <span key={i} className={`h-5 rounded-md ${on ? 'bg-gradient-to-b from-violet/70 to-azure/50' : 'bg-white/8'}`} />
              ))}
            </div>
          </div>
        </Layer>

        {/* Widget: tasks */}
        <Layer mx={mx} my={my} depth={1.8} className="absolute bottom-[7%] right-[4%] w-[52%]">
          <div className="animate-float glass rounded-2xl p-3.5 shadow-2xl [animation-delay:-5s] sm:p-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-cyan/15 text-cyan">
                  <Check className="h-4 w-4" />
                </span>
                <div className="text-[0.8rem] font-semibold">Weekly tasks</div>
              </div>
              <span className="font-mono text-[0.65rem] text-cyan">on track</span>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-cyan to-azure"
                initial={{ width: '0%' }}
                animate={{ width: '78%' }}
                transition={{ duration: 1.6, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>
        </Layer>
      </motion.div>
    </div>
  );
}
