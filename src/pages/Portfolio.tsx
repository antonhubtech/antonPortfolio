import { useCallback, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { categories, projects, type Category, type Project } from '../data/content';
import { useRouter } from '../router';
import Button from '../components/Button';
import CtaBand from '../components/CtaBand';
import Modal from '../components/Modal';
import ProjectThumb from '../components/ProjectThumb';
import { Reveal, SplitText } from '../components/Reveal';

function ProjectDetail({ p, onClose }: { p: Project; onClose: () => void }) {
  const { navigate } = useRouter();
  return (
    <Modal layoutId={`project-${p.id}`} label={p.title} onClose={onClose} className="!max-w-3xl">
      <ProjectThumb hue={p.hue} motif={p.motif} className="aspect-[16/8] w-full" />
      <motion.div className="p-7 sm:p-10" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5 }}>
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-[11px] uppercase tracking-widest text-cyan">{p.category}</span>
          <span className="rounded-full border border-white/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-dim">Sample project</span>
        </div>
        <h3 className="mt-3 text-3xl sm:text-4xl">{p.title}</h3>
        <p className="mt-4 text-lg leading-relaxed text-muted">{p.summary}</p>

        <div className="mt-9 grid gap-8 sm:grid-cols-2">
          <div>
            <div className="eyebrow mb-3">Scope</div>
            <ul className="space-y-2.5">
              {p.scope.map((s) => (
                <li key={s} className="flex items-start gap-3 text-[0.95rem]">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-cyan/15 text-cyan">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="eyebrow mb-3">Deliverables</div>
            <ul className="space-y-2.5 text-[0.95rem]">
              {p.deliverables.map((d) => (
                <li key={d} className="flex items-center gap-3">
                  <ArrowUpRight className="h-4 w-4 text-violet" /> {d}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="eyebrow mb-3 mt-9">Tools used</div>
        <div className="flex flex-wrap gap-2">
          {p.tools.map((t) => (
            <span key={t} className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-sm">
              {t}
            </span>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button
            icon={<ArrowRight className="h-4 w-4" />}
            onClick={() => {
              onClose();
              navigate('contact', { subject: `Project inquiry: ${p.title}` });
            }}
          >
            Start something similar
          </Button>
          <Button variant="ghost" onClick={onClose} magnetic={false}>
            Back to projects
          </Button>
        </div>
      </motion.div>
    </Modal>
  );
}

export default function Portfolio() {
  const [filter, setFilter] = useState<'All' | Category>('All');
  const [open, setOpen] = useState<Project | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const list = useMemo(() => (filter === 'All' ? projects : projects.filter((p) => p.category === filter)), [filter]);

  return (
    <>
      <section className="px-6 pb-10 pt-36 sm:pt-44">
        <div className="mx-auto max-w-7xl">
          <div className="eyebrow mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-cyan/60" /> Portfolio
          </div>
          <h1 className="max-w-4xl text-[clamp(2.4rem,6vw,4.8rem)]">
            <SplitText text="Work that keeps" trigger="mount" delay={0.4} />{' '}
            <SplitText text="things moving." trigger="mount" delay={0.7} wordClassName="text-gradient" />
          </h1>
          <Reveal delay={0.3} className="mt-6 max-w-2xl">
            <p className="text-lg leading-relaxed text-muted">
              Sample project layouts showing how my work will be presented. Real case studies are on the way.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-[4.6rem] z-30 px-6 py-4 sm:top-[5.2rem]">
        <div className="mx-auto max-w-7xl">
          <div role="tablist" aria-label="Filter projects" className="glass no-scrollbar inline-flex max-w-full gap-1 overflow-x-auto rounded-full p-1.5">
            {categories.map((c) => {
              const active = filter === c;
              return (
                <button
                  key={c}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(c)}
                  className={`relative shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${active ? 'text-white' : 'text-muted hover:text-fg'}`}
                >
                  {active && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-azure/80 to-violet/80"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="relative">{c}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="px-6 pb-24 pt-6">
        <motion.div layout className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.button
                  type="button"
                  layoutId={`project-${p.id}`}
                  style={{ borderRadius: 28 }}
                  data-cursor="View"
                  aria-haspopup="dialog"
                  onClick={() => setOpen(p)}
                  whileHover={{ y: -8 }}
                  className="panel group block w-full overflow-hidden text-left"
                >
                  <div className="relative overflow-hidden">
                    <ProjectThumb hue={p.hue} motif={p.motif} className="aspect-[400/260] w-full transition-transform duration-700 ease-out group-hover:scale-[1.08]" />
                    <span className="glass absolute left-4 top-4 rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-widest">{p.category}</span>
                    <span className="glass absolute bottom-4 right-4 grid h-10 w-10 translate-y-3 place-items-center rounded-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl">{p.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{p.summary}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {p.tools.map((t) => (
                        <span key={t} className="rounded-full bg-white/[0.05] px-2.5 py-1 font-mono text-[10px] text-muted">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <CtaBand title="Have a project in mind?" text="Tell me about it and I’ll share how I would set it up." />

      <AnimatePresence>{open && <ProjectDetail key={open.id} p={open} onClose={close} />}</AnimatePresence>
    </>
  );
}
