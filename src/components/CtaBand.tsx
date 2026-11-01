import { ArrowRight } from 'lucide-react';
import { Reveal, SplitText } from './Reveal';
import Button from './Button';

/** Closing call-to-action used at the bottom of most pages. */
export default function CtaBand({
  title = 'Let’s take the busywork off your plate.',
  text = 'Tell me what is eating your time. I will reply with how I would approach it and what a first week could look like.',
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="relative px-6 py-24 sm:py-32">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-azure/15 via-night to-violet/20 px-6 py-16 text-center sm:px-16 sm:py-24">
        <div aria-hidden className="grid-lines absolute inset-0 opacity-70" />
        <div aria-hidden className="absolute left-1/2 top-0 h-64 w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-azure/30 blur-[100px]" />
        <div className="relative">
          <div className="eyebrow mb-5">Ready when you are</div>
          <SplitText as="h2" text={title} className="mx-auto max-w-3xl text-[clamp(2rem,5.4vw,4rem)]" />
          <Reveal delay={0.2} className="mx-auto mt-6 max-w-xl">
            <p className="text-lg text-muted">{text}</p>
          </Reveal>
          <Reveal delay={0.3} className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button to="contact" icon={<ArrowRight className="h-4 w-4" />}>
              Let’s Work Together
            </Button>
            <Button to="portfolio" variant="ghost">
              See My Work
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
