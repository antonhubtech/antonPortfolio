import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, ArrowUpRight, MapPin } from 'lucide-react';
import { Link, useRouter } from '../router';
import { marqueeWords, pillars, profile, projects, services, stats } from '../data/content';
import Button from '../components/Button';
import Counter from '../components/Counter';
import CtaBand from '../components/CtaBand';
import HeroVisual from '../components/HeroVisual';
import ProjectThumb from '../components/ProjectThumb';
import { Reveal, ScrollWords, SplitText, Stagger, StaggerItem } from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import SpotlightCard from '../components/SpotlightCard';
import Testimonials from '../components/Testimonials';

const EASE = [0.16, 1, 0.3, 1] as const;

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const item = (d: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease: EASE, delay: d },
  });

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-center px-6 pb-20 pt-32 sm:pt-36">
      <motion.div style={{ y, opacity: fade }} className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-6">
        <div>
          <motion.div {...item(0.5)} className="glass mb-7 inline-flex items-center gap-2.5 rounded-full py-2 pl-3 pr-4">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping-soft absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            <span className="text-[0.82rem] font-medium">{profile.availability}</span>
          </motion.div>

          <motion.p {...item(0.6)} className="font-display text-xl font-medium tracking-tight sm:text-2xl">
            Hi, I’m <span className="text-gradient">{profile.name}</span>
            <span className="text-muted"> — {profile.title}</span>
          </motion.p>

          <h1 className="mt-5 text-[clamp(2.4rem,4.9vw,4.7rem)] leading-[1.04]">
            <SplitText text="Your Behind-the-Scenes Partner in" trigger="mount" delay={0.75} />{' '}
            <SplitText text="Business Growth." trigger="mount" delay={1.15} wordClassName="text-gradient" />
          </h1>

          <motion.p {...item(1.5)} className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
            I’m a Virtual Assistant who helps business owners and entrepreneurs manage their operations, stay organized, and
            get back to growing their business.
          </motion.p>

          <motion.div {...item(1.65)} className="mt-10 flex flex-wrap items-center gap-4">
            <Button to="portfolio" icon={<ArrowRight className="h-4 w-4" />}>
              Explore My Work
            </Button>
            <Button to="contact" variant="ghost">
              Let’s Work Together
            </Button>
          </motion.div>

          <motion.p {...item(1.8)} className="mt-10 flex items-center gap-2 font-mono text-xs text-dim">
            <MapPin className="h-3.5 w-3.5" /> {profile.location}
          </motion.p>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.4, ease: EASE, delay: 0.6 }}>
          <HeroVisual />
        </motion.div>
      </motion.div>

      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-dim md:flex"
      >
        Scroll
        <span className="relative h-10 w-px overflow-hidden bg-white/10">
          <motion.span
            className="absolute inset-x-0 top-0 h-4 bg-cyan"
            animate={{ y: [-16, 40] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.div>
    </section>
  );
}

function Marquee() {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center gap-10 pr-10" aria-hidden={hidden || undefined}>
      {marqueeWords.map((w) => (
        <li key={w} className="flex items-center gap-10 font-display text-2xl font-medium tracking-tight text-white/30 sm:text-3xl">
          {w}
          <span className="text-cyan/60">✦</span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee-wrap relative overflow-hidden border-y border-white/[0.06] bg-white/[0.015] py-6 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
      <div className="animate-marquee flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

function Intro() {
  return (
    <section className="px-6 py-28 sm:py-40">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="eyebrow mb-8 flex items-center gap-3">
            <span className="h-px w-8 bg-cyan/60" /> Introduction
          </div>
        </Reveal>
        <ScrollWords
          className="font-display text-[clamp(1.7rem,4.2vw,3.2rem)] font-medium leading-[1.2] tracking-tight"
          text="I help founders and small business owners hand off the admin, the inbox and the endless follow-ups, so their attention goes where it actually grows the business."
        />
        <Reveal delay={0.1} className="mt-10">
          <Link to="about" className="group inline-flex items-center gap-2 text-sm font-semibold text-cyan">
            More about me
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="px-6 pb-24">
      <Stagger className="mx-auto grid max-w-6xl grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <StaggerItem key={s.label}>
            <div className="panel h-full rounded-3xl p-6 sm:p-8">
              <div className="text-gradient font-display text-5xl font-semibold tracking-tight sm:text-6xl">
                <Counter to={s.value} suffix={s.suffix} />
                {s.note && <span className="text-gradient align-super text-2xl">*</span>}
              </div>
              <p className="mt-3 text-sm leading-snug text-muted">{s.label}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
      <p className="mx-auto mt-5 max-w-6xl font-mono text-[11px] text-dim">* Placeholder figure — to be replaced with real numbers.</p>
    </section>
  );
}

function ServicesOverview() {
  const { navigate } = useRouter();
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading eyebrow="What I do" title="Support that covers the whole back office." text="From the inbox to the store, here are the areas I can take off your hands." />
          <Reveal>
            <Button to="services" variant="ghost" icon={<ArrowRight className="h-4 w-4" />}>
              All 9 services
            </Button>
          </Reveal>
        </div>
        <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((s) => (
            <StaggerItem key={s.id}>
              <SpotlightCard tilt={4} className="h-full">
                <button
                  type="button"
                  onClick={() => navigate('services')}
                  className="group flex h-full w-full flex-col rounded-3xl p-7 text-left"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-azure/25 to-violet/25 text-cyan transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                    <s.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-6 text-xl">{s.title}</h3>
                  <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-muted">{s.blurb}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-fg/70 transition-colors group-hover:text-cyan">
                    Learn more
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </button>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function Expertise() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Expertise" title="Three things I do for every client." />
        <Stagger className="mt-14 grid gap-4 md:grid-cols-3">
          {pillars.map((p, i) => (
            <StaggerItem key={p.title}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className="panel group relative h-full overflow-hidden rounded-3xl p-8"
              >
                <span aria-hidden className="absolute -right-3 -top-6 font-display text-[9rem] font-semibold leading-none text-white/[0.035] transition-colors duration-500 group-hover:text-azure/10">
                  {i + 1}
                </span>
                <h3 className="relative text-3xl">{p.title}</h3>
                <p className="relative mt-4 leading-relaxed text-muted">{p.text}</p>
                <span className="relative mt-8 block h-px w-12 bg-gradient-to-r from-cyan to-transparent transition-all duration-500 group-hover:w-full" />
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal className="mt-8 flex flex-wrap gap-2.5">
          {['Organized', 'Dependable', 'Proactive', 'Detail-oriented', 'Resourceful'].map((q) => (
            <motion.span
              key={q}
              whileHover={{ y: -3, scale: 1.04 }}
              className="glass rounded-full px-5 py-2 text-sm font-medium text-fg/90"
            >
              {q}
            </motion.span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function Featured() {
  const { navigate } = useRouter();
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading eyebrow="Selected work" title="A look at how I work." text="Sample project layouts — each slot is ready for your real work." />
          <Reveal>
            <Button to="portfolio" variant="ghost" icon={<ArrowRight className="h-4 w-4" />}>
              View portfolio
            </Button>
          </Reveal>
        </div>
        <Stagger className="mt-14 grid gap-5 md:grid-cols-3">
          {projects.slice(0, 3).map((p) => (
            <StaggerItem key={p.id}>
              <motion.button
                type="button"
                data-cursor="View"
                onClick={() => navigate('portfolio')}
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                className="panel group block w-full overflow-hidden rounded-3xl text-left"
              >
                <div className="overflow-hidden">
                  <ProjectThumb hue={p.hue} motif={p.motif} className="aspect-[400/260] w-full transition-transform duration-700 ease-out group-hover:scale-[1.07]" />
                </div>
                <div className="p-6">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-cyan">{p.category}</span>
                  <h3 className="mt-2 text-xl">{p.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted">{p.summary}</p>
                </div>
              </motion.button>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function Voices() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="Kind words" title="What working together feels like." align="center" />
        <Reveal className="mt-12">
          <Testimonials />
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Intro />
      <Stats />
      <ServicesOverview />
      <Expertise />
      <Featured />
      <Voices />
      <CtaBand />
    </>
  );
}
