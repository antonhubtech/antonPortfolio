import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Check, Clock, Copy, Loader2, Mail, MapPin, RotateCcw } from 'lucide-react';
import { profile, services } from '../data/content';
import { useRouter } from '../router';
import Button from '../components/Button';
import { Reveal, SplitText } from '../components/Reveal';
import { SocialIcon } from '../components/Social';
import SpotlightCard from '../components/SpotlightCard';

type Status = 'idle' | 'sending' | 'sent' | 'preview' | 'error';
interface Values { name: string; email: string; subject: string; message: string }
type Errors = Partial<Record<keyof Values, string>>;

const isPlaceholder = (s: string) => /^\[.*\]$/.test(s.trim());
const validate = (v: Values): Errors => {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = 'Please tell me your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'Please enter a valid email address.';
  if (v.subject.trim().length < 3) e.subject = 'A short subject helps me route your message.';
  if (v.message.trim().length < 10) e.message = 'Tell me a little more (at least a sentence).';
  return e;
};

function Field({
  label,
  value,
  onChange,
  error,
  type = 'text',
  textarea,
  autoComplete,
  name,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  textarea?: boolean;
  autoComplete?: string;
  name: string;
}) {
  const id = useId();
  const [focus, setFocus] = useState(false);
  const raised = focus || value.length > 0;
  const common = {
    id,
    name,
    value,
    autoComplete,
    'aria-invalid': !!error,
    'aria-describedby': error ? `${id}-err` : undefined,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    className:
      'peer block w-full resize-none bg-transparent px-5 pb-3 pt-7 text-[1rem] text-fg placeholder-transparent outline-none',
  };
  return (
    <div>
      <div
        className={`relative overflow-hidden rounded-2xl border bg-white/[0.03] transition-colors duration-300 ${
          error ? 'border-rose-400/60' : focus ? 'border-cyan/60 bg-white/[0.05]' : 'border-white/10 hover:border-white/20'
        }`}
      >
        {textarea ? (
          <textarea {...common} rows={5} onChange={(e) => onChange(e.target.value)} />
        ) : (
          <input {...common} type={type} onChange={(e) => onChange(e.target.value)} />
        )}
        <label
          htmlFor={id}
          className={`pointer-events-none absolute left-5 origin-left transition-all duration-300 ease-out ${
            raised ? 'top-2.5 scale-[0.78] text-cyan' : 'top-[1.15rem] text-muted'
          }`}
        >
          {label}
        </label>
        <motion.span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-cyan via-azure to-violet"
          animate={{ scaleX: focus ? 1 : 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-err`}
            role="alert"
            initial={{ opacity: 0, height: 0, y: -4 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden px-2 pt-2 text-sm text-rose-300"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function CopyEmail() {
  const [done, setDone] = useState(false);
  const placeholder = isPlaceholder(profile.email);
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-azure/15 text-azure">
          <Mail className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <div className="eyebrow text-muted!">Email</div>
          {placeholder ? (
            <span className="block truncate font-medium">{profile.email}</span>
          ) : (
            <a href={`mailto:${profile.email}`} className="block truncate font-medium hover:text-cyan">
              {profile.email}
            </a>
          )}
        </div>
      </div>
      <button
        type="button"
        aria-label="Copy email address"
        disabled={placeholder}
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(profile.email);
            setDone(true);
            window.setTimeout(() => setDone(false), 1800);
          } catch {
            /* clipboard unavailable — ignore */
          }
        }}
        className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 transition-colors enabled:hover:border-cyan/60 disabled:opacity-40"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span key={done ? 'ok' : 'cp'} initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.4, opacity: 0 }} transition={{ duration: 0.15 }}>
            {done ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
          </motion.span>
        </AnimatePresence>
      </button>
    </div>
  );
}

function Success({ status, onReset }: { status: 'sent' | 'preview'; onReset: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  // The form collapses into this panel; make sure the confirmation isn't left off-screen.
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, []);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="flex min-h-[30rem] flex-col items-center justify-center text-center"
      role="status"
    >
      <div className="relative grid h-24 w-24 place-items-center">
        <motion.span
          className="absolute inset-0 rounded-full border border-cyan/40"
          initial={{ scale: 0.6, opacity: 1 }}
          animate={{ scale: 1.8, opacity: 0 }}
          transition={{ duration: 1.4, repeat: 1 }}
        />
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <motion.circle cx="50" cy="50" r="44" fill="none" stroke="url(#ok)" strokeWidth="3" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7 }} />
          <motion.path d="M32 52 L45 65 L69 38" fill="none" stroke="#4fe3ff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.6 }} />
          <defs>
            <linearGradient id="ok" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#4fe3ff" />
              <stop offset="1" stopColor="#8d6bff" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <h3 className="mt-8 text-3xl">{status === 'sent' ? 'Message sent.' : 'Form works — preview only.'}</h3>
      <p className="mt-3 max-w-sm text-muted">
        {status === 'sent'
          ? 'Thank you for reaching out. I’ll get back to you as soon as I can.'
          : 'Everything checked out, but this form isn’t connected to an inbox yet, so nothing was actually sent. Please email me directly instead.'}
      </p>
      <div className="mt-8">
        <Button variant="ghost" onClick={onReset} icon={<RotateCcw className="h-4 w-4" />}>
          Write another
        </Button>
      </div>
    </motion.div>
  );
}

export default function Contact() {
  const { subject: prefill, clearSubject } = useRouter();
  const [v, setV] = useState<Values>({ name: '', email: '', subject: prefill, message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');

  // A subject carried over from a service/project card
  useEffect(() => {
    if (prefill) {
      setV((x) => ({ ...x, subject: prefill }));
      clearSubject();
    }
  }, [prefill, clearSubject]);

  const set = (k: keyof Values) => (val: string) => {
    setV((x) => ({ ...x, [k]: val }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate(v);
    setErrors(errs);
    if (Object.keys(errs).length) {
      (document.querySelector('[aria-invalid="true"]') as HTMLElement | null)?.focus();
      return;
    }
    if (!profile.formEndpoint) {
      setStatus('sending');
      window.setTimeout(() => setStatus('preview'), 700);
      return;
    }
    try {
      setStatus('sending');
      const res = await fetch(profile.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(v),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  };

  const reset = () => {
    setV({ name: '', email: '', subject: '', message: '' });
    setErrors({});
    setStatus('idle');
  };

  const done = status === 'sent' || status === 'preview';

  return (
    <>
      <section className="px-6 pb-24 pt-36 sm:pt-44">
        <div className="mx-auto max-w-7xl">
          <div className="eyebrow mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-cyan/60" /> Contact
          </div>
          <h1 className="max-w-4xl text-[clamp(2.6rem,7vw,5.6rem)]">
            <SplitText text="Let’s build a calmer" trigger="mount" delay={0.4} />{' '}
            <SplitText text="workday, together." trigger="mount" delay={0.7} wordClassName="text-gradient" />
          </h1>
          <Reveal delay={0.3} className="mt-6 max-w-2xl">
            <p className="text-lg leading-relaxed text-muted">
              Share a little about your business and what you’d like off your plate. I’ll reply with ideas and next steps.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
            {/* Form */}
            <Reveal>
              <div className="panel rounded-[2rem] p-6 sm:p-10">
                <AnimatePresence mode="wait">
                  {done ? (
                    <Success key="done" status={status as 'sent' | 'preview'} onReset={reset} />
                  ) : (
                    <motion.form key="form" noValidate onSubmit={submit} exit={{ opacity: 0, y: -10 }} className="space-y-5" aria-label="Contact form">
                      <div className="grid gap-5 sm:grid-cols-2">
                        <Field name="name" label="Your name" value={v.name} onChange={set('name')} error={errors.name} autoComplete="name" />
                        <Field name="email" label="Email address" type="email" value={v.email} onChange={set('email')} error={errors.email} autoComplete="email" />
                      </div>
                      <Field name="subject" label="Subject" value={v.subject} onChange={set('subject')} error={errors.subject} />
                      <div className="flex flex-wrap gap-2" aria-label="Quick subjects">
                        {services.slice(0, 5).map((s) => (
                          <motion.button
                            key={s.id}
                            type="button"
                            whileTap={{ scale: 0.94 }}
                            onClick={() => set('subject')(s.title)}
                            className={`rounded-full border px-3.5 py-1.5 text-xs transition-colors ${
                              v.subject === s.title ? 'border-cyan/60 bg-cyan/10 text-cyan' : 'border-white/10 text-muted hover:border-white/25 hover:text-fg'
                            }`}
                          >
                            {s.title}
                          </motion.button>
                        ))}
                      </div>
                      <Field name="message" label="How can I help?" textarea value={v.message} onChange={set('message')} error={errors.message} />

                      <AnimatePresence>
                        {status === 'error' && (
                          <motion.p role="alert" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="rounded-xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
                            Something went wrong sending your message. Please try again, or email me directly.
                          </motion.p>
                        )}
                      </AnimatePresence>

                      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                        <p className="font-mono text-[11px] text-dim">Your details are only used to reply to you.</p>
                        <Button
                          type="submit"
                          disabled={status === 'sending'}
                          icon={status === 'sending' ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
                        >
                          {status === 'sending' ? 'Sending…' : 'Send Message'}
                        </Button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>

            {/* Side info */}
            <div className="space-y-4">
              <Reveal delay={0.1}>
                <SpotlightCard className="p-6">
                  <CopyEmail />
                </SpotlightCard>
              </Reveal>
              <Reveal delay={0.18}>
                <SpotlightCard className="space-y-5 p-6">
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-violet/15 text-violet">
                      <MapPin className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="eyebrow text-muted!">Based in</div>
                      <div className="font-medium">{profile.location}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-cyan/15 text-cyan">
                      <Clock className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="eyebrow text-muted!">Typical reply</div>
                      <div className="font-medium">{profile.responseTime}</div>
                    </div>
                  </div>
                </SpotlightCard>
              </Reveal>
              <Reveal delay={0.26}>
                <SpotlightCard className="p-6">
                  <div className="eyebrow mb-4 text-muted!">Find me online</div>
                  <div className="flex flex-wrap gap-2">
                    {profile.socials.map((s) => (
                      <SocialIcon key={s.id} id={s.id} label={s.label} href={s.href} />
                    ))}
                  </div>
                  <div className="mt-5 flex items-center gap-2.5 text-sm text-muted">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping-soft absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    </span>
                    {profile.availability}
                  </div>
                </SpotlightCard>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
