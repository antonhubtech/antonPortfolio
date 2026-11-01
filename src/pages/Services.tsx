import { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Check, Plus } from 'lucide-react';
import { process, services, type Service } from '../data/content';
import { useRouter } from '../router';
import Button from '../components/Button';
import CtaBand from '../components/CtaBand';
import Modal from '../components/Modal';
import { Reveal, SplitText, Stagger, StaggerItem } from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import SpotlightCard from '../components/SpotlightCard';

function ServiceDetail({ s, onClose }: { s: Service; onClose: () => void }) {
  const { navigate } = useRouter();
  return (
    <Modal layoutId={`service-${s.id}`} label={s.title} onClose={onClose}>
      <div className="p-7 sm:p-10">
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-azure/30 to-violet/30 text-cyan">
          <s.icon className="h-7 w-7" />
        </span>
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5 }}>
          <h3 className="mt-6 text-3xl sm:text-4xl">{s.title}</h3>
          <p className="mt-4 text-lg leading-relaxed text-muted">{s.detail}</p>

          <div className="eyebrow mb-4 mt-9">What’s included</div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {s.covers.map((c) => (
              <li key={c} className="flex items-start gap-3 text-[0.95rem]">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-cyan/15 text-cyan">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {c}
              </li>
            ))}
          </ul>

          <div className="eyebrow mb-3 mt-9">Often paired with</div>
          <div className="flex flex-wrap gap-2">
            {s.tools.map((t) => (
              <span key={t} className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-sm text-fg/90">
                {t}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button
              icon={<ArrowRight className="h-4 w-4" />}
              onClick={() => {
                onClose();
                navigate('contact', { subject: `Service inquiry: ${s.title}` });
              }}
            >
              Ask about this service
            </Button>
            <Button variant="ghost" onClick={onClose} magnetic={false}>
              Close
            </Button>
          </div>
        </motion.div>
      </div>
    </Modal>
  );
}

export default function Services() {
  const [open, setOpen] = useState<Service | null>(null);
  const close = useCallback(() => setOpen(null), []);

  return (
    <>
      <section className="px-6 pb-12 pt-36 sm:pt-44">
        <div className="mx-auto max-w-7xl">
          <div className="eyebrow mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-cyan/60" /> Services
          </div>
          <h1 className="max-w-4xl text-[clamp(2.4rem,6vw,4.8rem)]">
            <SplitText text="Nine ways I can" trigger="mount" delay={0.4} />{' '}
            <SplitText text="lighten your load." trigger="mount" delay={0.7} wordClassName="text-gradient" />
          </h1>
          <Reveal delay={0.3} className="mt-6 max-w-2xl">
            <p className="text-lg leading-relaxed text-muted">
              Pick a card to see what’s included. Every engagement is shaped around your tools, your pace and the way you like to communicate.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-24">
        <Stagger className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-3" gap={0.06}>
          {services.map((s) => (
            <StaggerItem key={s.id}>
              <SpotlightCard
                layoutId={`service-${s.id}`}
                style={{ borderRadius: 28 }}
                className="h-full !rounded-[28px]"
                tilt={3}
              >
                <button
                  type="button"
                  onClick={() => setOpen(s)}
                  aria-haspopup="dialog"
                  data-cursor="Open"
                  className="group flex h-full min-h-[15rem] w-full flex-col p-7 text-left"
                >
                  <div className="flex items-start justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-azure/25 to-violet/25 text-cyan transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                      <s.icon className="h-6 w-6" />
                    </span>
                    <span className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-muted transition-all duration-300 group-hover:rotate-90 group-hover:border-cyan/60 group-hover:text-cyan">
                      <Plus className="h-4 w-4" />
                    </span>
                  </div>
                  <h3 className="mt-6 text-xl">{s.title}</h3>
                  <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-muted">{s.blurb}</p>
                </button>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Process */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Process" title="From first hello to smooth routine." />
          <Stagger className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4" gap={0.1}>
            {process.map((p) => (
              <StaggerItem key={p.step}>
                <div className="panel relative h-full rounded-3xl p-7">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm text-cyan">{p.step}</span>
                    <motion.span
                      aria-hidden
                      className="h-px flex-1 origin-left bg-gradient-to-r from-cyan/60 to-transparent"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 }}
                    />
                  </div>
                  <h3 className="mt-5 text-2xl">{p.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{p.text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CtaBand title="Not sure what you need? Let’s figure it out." text="Describe what’s on your plate and I’ll suggest where I can help most." />

      <AnimatePresence>{open && <ServiceDetail key={open.id} s={open} onClose={close} />}</AnimatePresence>
    </>
  );
}
