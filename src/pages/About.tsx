import { motion } from 'motion/react';
import { MapPin, User } from 'lucide-react';
import { about, profile } from '../data/content';
import CtaBand from '../components/CtaBand';
import { Reveal, ScrollWords, SplitText, Stagger, StaggerItem } from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import SpotlightCard from '../components/SpotlightCard';

function Portrait() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      {/* orbit decoration */}
      <div aria-hidden className="animate-spin-slow absolute -inset-4 rounded-full border border-dashed sm:-inset-8 border-white/10 [animation-duration:120s]" />
      <div aria-hidden className="absolute -inset-3 rounded-[2.4rem] bg-gradient-to-br from-azure/30 via-transparent to-violet/30 blur-2xl" />

      <SpotlightCard tilt={7} className="relative !rounded-[2rem] p-3">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-navy via-panel to-night">
          {profile.photoUrl ? (
            <img src={profile.photoUrl} alt={`Portrait of ${profile.name}`} className="h-full w-full object-cover" loading="eager" />
          ) : (
            <div className="grid h-full w-full place-items-center">
              <div aria-hidden className="grid-lines absolute inset-0" />
              <div className="relative flex flex-col items-center gap-4 text-center">
                <span className="grid h-24 w-24 place-items-center rounded-full border border-white/10 bg-white/[0.04]">
                  <User className="h-10 w-10 text-cyan/80" strokeWidth={1.4} />
                </span>
                <span className="font-mono text-xs tracking-wider text-muted">{profile.photoLabel}</span>
              </div>
            </div>
          )}
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
          <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3">
            <div className="glass min-w-0 rounded-2xl px-4 py-3">
              <div className="truncate font-display text-sm font-semibold">{profile.name}</div>
              <div className="truncate font-mono text-[11px] text-muted">{profile.title}</div>
            </div>
          </div>
        </div>
      </SpotlightCard>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="glass animate-float absolute -right-3 top-10 hidden items-center gap-2 rounded-full px-4 py-2 text-xs font-medium sm:flex"
      >
        <span className="h-2 w-2 rounded-full bg-emerald-400" /> {profile.availability}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="glass animate-float absolute -left-3 bottom-28 hidden items-center gap-2 rounded-full px-4 py-2 text-xs font-medium [animation-delay:-3s] sm:flex"
      >
        <MapPin className="h-3.5 w-3.5 text-cyan" /> {profile.location}
      </motion.div>
    </div>
  );
}

export default function About() {
  return (
    <>
      <section className="px-6 pb-16 pt-36 sm:pt-44">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          {/* Left: sticky portrait */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Portrait />
          </div>

          {/* Right: story */}
          <div>
            <div className="eyebrow mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-cyan/60" /> About me
            </div>
            <h1 className="text-[clamp(2.4rem,6vw,4.6rem)]">
              <SplitText text="The calm, capable" trigger="mount" delay={0.4} />{' '}
              <SplitText text="person behind the process." trigger="mount" delay={0.7} wordClassName="text-gradient" />
            </h1>

            <div className="mt-10 space-y-6">
              {about.story.map((p, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <p className="text-lg leading-relaxed text-muted">{p}</p>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-8">
              <div className="panel rounded-2xl p-6">
                <div className="eyebrow mb-2">Short bio</div>
                <p className="text-fg/90">{profile.shortBio}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="My approach" title="How I work with clients." text="Simple habits that make working together easy." />
          <Stagger className="mt-14 grid gap-4 md:grid-cols-2">
            {about.approach.map((a, i) => (
              <StaggerItem key={a.title}>
                <SpotlightCard className="h-full">
                  <div className="flex gap-5 p-7">
                    <span className="font-mono text-sm text-cyan">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <h3 className="text-xl">{a.title}</h3>
                      <p className="mt-2 leading-relaxed text-muted">{a.text}</p>
                    </div>
                  </div>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Values */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Strengths & values" title="What you can expect from me." />
          <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5" gap={0.07}>
            {about.values.map((v) => (
              <StaggerItem key={v.title}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="panel group relative h-full overflow-hidden rounded-3xl p-6"
                >
                  <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <h3 className="text-xl">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{v.text}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
          <p className="mt-6 font-mono text-[11px] text-dim">These describe how I aim to work — not certifications or credentials.</p>
        </div>
      </section>

      {/* Mission */}
      <section className="px-6 py-28 sm:py-40">
        <div className="mx-auto max-w-5xl">
          <div className="eyebrow mb-8 flex items-center gap-3">
            <span className="h-px w-8 bg-cyan/60" /> My mission
          </div>
          <ScrollWords className="font-display text-[clamp(1.8rem,4.6vw,3.4rem)] font-medium leading-[1.15] tracking-tight" text={about.mission} />
        </div>
      </section>

      <CtaBand title="Let’s see how I can help." />
    </>
  );
}
