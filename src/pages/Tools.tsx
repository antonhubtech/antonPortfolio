import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { toolGroups, tools, workflow, type Tool, type ToolGroup } from '../data/content';
import CtaBand from '../components/CtaBand';
import { Reveal, SplitText, Stagger, StaggerItem } from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import SpotlightCard from '../components/SpotlightCard';

const INNER = tools.filter((t) => t.group === 'Plan');
const OUTER = tools.filter((t) => t.group !== 'Plan');

function Ring({
  items,
  radius,
  duration,
  reverse,
  active,
  focusGroup,
  onPick,
}: {
  items: Tool[];
  radius: number;
  duration: number;
  reverse?: boolean;
  active: Tool;
  focusGroup: ToolGroup | null;
  onPick: (t: Tool) => void;
}) {
  const spin = reverse ? 'spin-rev' : 'spin-slow';
  const counter = reverse ? 'spin-slow' : 'spin-rev';
  return (
    <>
      <div aria-hidden className="absolute rounded-full border border-white/[0.07]" style={{ inset: `${50 - radius}%` }} />
      <div className="orbit-ring absolute inset-0" style={{ animation: `${spin} ${duration}s linear infinite` }}>
        {items.map((t, i) => {
          const deg = (360 / items.length) * i;
          const selected = active.id === t.id;
          const dim = focusGroup !== null && focusGroup !== t.group;
          return (
            <div
              key={t.id}
              className="absolute left-1/2 top-1/2 h-0 w-0"
              style={{ transform: `rotate(${deg}deg) translateX(${radius}cqw) rotate(${-deg}deg)` }}
            >
              <div className="orbit-node absolute -left-7 -top-7 h-14 w-14" style={{ animation: `${counter} ${duration}s linear infinite` }}>
                <button
                  type="button"
                  aria-label={t.name}
                  aria-pressed={selected}
                  onPointerEnter={() => onPick(t)}
                  onFocus={() => onPick(t)}
                  onClick={() => onPick(t)}
                  className={`grid h-full w-full place-items-center rounded-full border transition-all duration-300 ${
                    selected
                      ? 'scale-125 border-cyan/70 bg-azure/25 text-white shadow-[0_0_34px_-2px_rgb(79_227_255/.55)]'
                      : 'glass text-fg/80 hover:scale-110 hover:text-white'
                  } ${dim ? 'opacity-25' : 'opacity-100'}`}
                >
                  <t.icon className="h-6 w-6" strokeWidth={1.7} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

function Orbit({ active, focusGroup, onPick }: { active: Tool; focusGroup: ToolGroup | null; onPick: (t: Tool) => void }) {
  return (
    <div className="orbit-field relative mx-auto w-full max-w-[560px] [container-type:inline-size]">
      <div className="relative aspect-square w-full">
        <div aria-hidden className="absolute inset-[34%] rounded-full bg-[radial-gradient(circle,rgb(79_139_255/.25),transparent_70%)] blur-xl" />
        <div className="absolute left-1/2 top-1/2 grid h-[26%] w-[26%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[radial-gradient(circle_at_32%_28%,#bff3ff,#4f8bff_40%,#5b3fd1_75%,#1a1450)] shadow-[0_0_60px_6px_rgb(79_139_255/.4)]">
          <span className="px-2 text-center font-display text-[clamp(0.7rem,2.7cqw,1rem)] font-semibold leading-tight text-white/95">
            Your
            <br />
            workflow
          </span>
        </div>
        <Ring items={INNER} radius={25} duration={70} active={active} focusGroup={focusGroup} onPick={onPick} />
        <Ring items={OUTER} radius={40} duration={95} reverse active={active} focusGroup={focusGroup} onPick={onPick} />
      </div>
    </div>
  );
}

export default function Tools() {
  const [active, setActive] = useState<Tool>(tools[0]);
  const [group, setGroup] = useState<ToolGroup | null>(null);

  return (
    <>
      <section className="px-6 pb-10 pt-36 sm:pt-44">
        <div className="mx-auto max-w-7xl">
          <div className="eyebrow mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-cyan/60" /> Tools &amp; expertise
          </div>
          <h1 className="max-w-4xl text-[clamp(2.4rem,6vw,4.8rem)]">
            <SplitText text="One stack," trigger="mount" delay={0.4} />{' '}
            <SplitText text="built around you." trigger="mount" delay={0.65} wordClassName="text-gradient" />
          </h1>
          <Reveal delay={0.3} className="mt-6 max-w-2xl">
            <p className="text-lg leading-relaxed text-muted">
              I’m comfortable with the platforms below, and quick to pick up whatever your team already uses. Hover, tap or focus a tool to see how I put it to work.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal>
            <Orbit active={active} focusGroup={group} onPick={setActive} />
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Highlight a category">
                {toolGroups.map((g) => {
                  const on = group === g;
                  return (
                    <button
                      key={g}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setGroup(on ? null : g)}
                      className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-300 ${
                        on ? 'border-cyan/60 bg-cyan/10 text-cyan' : 'border-white/10 bg-white/[0.03] text-muted hover:border-white/25 hover:text-fg'
                      }`}
                    >
                      {g}
                    </button>
                  );
                })}
              </div>

              <SpotlightCard className="min-h-[16rem] p-8 sm:p-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    aria-live="polite"
                  >
                    <span className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-azure/30 to-violet/30 text-cyan">
                      <active.icon className="h-8 w-8" strokeWidth={1.6} />
                    </span>
                    <div className="mt-6 flex items-center gap-3">
                      <h2 className="text-3xl">{active.name}</h2>
                      <span className="rounded-full border border-white/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-dim">{active.group}</span>
                    </div>
                    <div className="eyebrow mb-2 mt-6">How I use it</div>
                    <p className="text-lg leading-relaxed text-muted">{active.use}</p>
                  </motion.div>
                </AnimatePresence>
              </SpotlightCard>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stack by purpose */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="The stack" title="Right tool, right job." />
          <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {toolGroups.map((g) => (
              <StaggerItem key={g}>
                <SpotlightCard className="h-full p-7">
                  <h3 className="text-xl">{g}</h3>
                  <ul className="mt-5 space-y-3">
                    {tools
                      .filter((t) => t.group === g)
                      .map((t) => (
                        <li key={t.id}>
                          <button
                            type="button"
                            onClick={() => {
                              setActive(t);
                              setGroup(g);
                              window.scrollTo({ top: 260, behavior: 'smooth' });
                            }}
                            className="group flex w-full items-center gap-3 text-left text-sm text-fg/85 transition-colors hover:text-cyan"
                          >
                            <t.icon className="h-4 w-4 text-cyan/80 transition-transform duration-300 group-hover:scale-125" />
                            {t.name}
                          </button>
                        </li>
                      ))}
                  </ul>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Workflow */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Workflow" title="How the tools fit together." text="A simple loop that keeps work visible and nothing forgotten." />
          <Stagger className="mt-14 grid gap-4 md:grid-cols-4" gap={0.12}>
            {workflow.map((w, i) => (
              <StaggerItem key={w.title}>
                <div className="panel relative h-full rounded-3xl p-7">
                  <span className="font-mono text-sm text-cyan">0{i + 1}</span>
                  <h3 className="mt-4 text-2xl">{w.title}</h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{w.text}</p>
                  {i < workflow.length - 1 && (
                    <span aria-hidden className="absolute -right-3 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-night text-cyan md:grid">
                      →
                    </span>
                  )}
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CtaBand title="Using something that isn’t listed?" text="I pick up new tools quickly. Tell me what your team runs on and we’ll take it from there." />
    </>
  );
}
