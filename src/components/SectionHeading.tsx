import { Reveal, SplitText } from './Reveal';

export default function SectionHeading({
  eyebrow,
  title,
  text,
  align = 'left',
  className = '',
}: {
  eyebrow: string;
  title: string;
  text?: string;
  align?: 'left' | 'center';
  className?: string;
}) {
  return (
    <div className={`${align === 'center' ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      <Reveal>
        <div className="eyebrow mb-4 flex items-center gap-3" style={{ justifyContent: align === 'center' ? 'center' : 'flex-start' }}>
          <span className="h-px w-8 bg-cyan/60" />
          {eyebrow}
        </div>
      </Reveal>
      <SplitText as="h2" text={title} className="text-[clamp(2rem,5vw,3.6rem)]" />
      {text && (
        <Reveal delay={0.15} className="mt-5">
          <p className="text-lg leading-relaxed text-muted">{text}</p>
        </Reveal>
      )}
    </div>
  );
}
