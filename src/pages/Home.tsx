import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  CircuitBoard,
  Gauge,
  Quote,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react'
import { useI18n } from '../lib/i18n'
import { useSEO } from '../lib/seo'
import { featuredProjects, profile, skillGroups, testimonials } from '../lib/data'
import Portrait from '../components/Portrait'
import { ACCENT, ArrowLink, Eyebrow, GlassCard, Magnetic, Meter, Reveal, Section, SectionHeading, Tilt } from '../components/ui'
import { AvailabilityBadge } from '../components/Switchers'
import CTABand from '../components/CTABand'

const PILLARS = ['Production', 'Android', 'Kotlin', 'Jetpack Compose', 'Offline-first', 'CI/CD']

const MARQUEE = [
  'Kotlin', 'Jetpack Compose', 'Coroutines', 'Hilt', 'Room', 'WorkManager', 'Kotlin Multiplatform',
  'Macrobenchmark', 'Baseline Profiles', 'Perfetto', 'GitHub Actions', 'Fastlane', 'Material 3',
  'Ktor', 'SQLDelight', 'Paparazzi', 'Play Console', 'Wear OS',
]

function HeroCard() {
  const { t } = useI18n()
  const rows = [
    { label: t('hero.card.crash'), value: '99.96%', accent: '#c8ff4d', pct: 99.96 },
    { label: t('hero.card.startup'), value: '1.1s', accent: '#22e0f5', pct: 82 },
    { label: t('hero.card.jank'), value: '99.2%', accent: '#4c86ff', pct: 99.2 },
    { label: t('hero.card.release'), value: t('hero.card.weekly'), accent: '#9a6bff', pct: 90 },
  ]

  return (
    <Tilt intensity={6} className="rounded-3xl">
      <div className="glass-strong relative overflow-hidden rounded-3xl p-6 md:p-7">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-neon/10 to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-14 animate-scan bg-gradient-to-b from-transparent via-neon/10 to-transparent"
        />

        <div className="relative flex items-start justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <Portrait size="md" status priority />
            <div>
              <div className="text-[14px] font-semibold leading-tight text-ink">MOE KYAW AUNG</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                {profile.location}
              </div>
            </div>
          </div>
          <span className="flex items-center gap-1.5 rounded-full border border-limeneon/30 bg-limeneon/8 px-2.5 py-1 font-mono text-[10px] text-limeneon">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-limeneon" /> LIVE
          </span>
        </div>

        <div className="relative mt-6 border-t border-white/8 pt-5">
          <div className="mono-label text-neon">{t('hero.card.title')}</div>
          <p className="mt-1.5 text-[13px] text-dim">{t('hero.card.sub')}</p>
        </div>

        <div className="relative mt-6 space-y-4">
          {rows.map((r, i) => (
            <motion.div
              key={r.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-[13px] text-dim">{r.label}</span>
                <span className="font-mono text-[13px] font-medium" style={{ color: r.accent }}>
                  {r.value}
                </span>
              </div>
              <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-white/6">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, ${r.accent}, ${r.accent}44)` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${r.pct}%` }}
                  transition={{ delay: 0.7 + i * 0.1, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="relative mt-7 border-t border-white/8 pt-5">
          <div className="mono-label mb-3 text-faint">Focus</div>
          <div className="flex flex-wrap gap-1.5">
            {PILLARS.map((p, i) => (
              <motion.span
                key={p}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + i * 0.06, duration: 0.5 }}
                className="rounded-lg border border-white/10 bg-white/4 px-2.5 py-1 font-mono text-[10.5px] text-dim"
              >
                {p}
              </motion.span>
            ))}
          </div>
        </div>

        <div className="relative mt-6 flex items-center justify-between rounded-xl border border-white/8 bg-white/3 px-4 py-3">
          <span className="text-[12px] text-dim">12 releases shipped this quarter</span>
          <span className="font-mono text-[11px] text-limeneon">0 rollbacks</span>
        </div>
      </div>
    </Tilt>
  )
}

function Hero() {
  const { t } = useI18n()
  const stats = [
    { k: '12', v: 'years shipping' },
    { k: '40M+', v: 'installs shipped' },
    { k: '99.96%', v: 'crash-free' },
    { k: '3', v: 'languages' },
  ]

  return (
    <section className="relative overflow-hidden pt-28 md:pt-36">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-5 pb-16 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:pb-24">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center gap-3"
          >
            <AvailabilityBadge />
            <span className="mono-label text-faint">{t('hero.eyebrow')}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 flex items-center gap-4 lg:hidden"
          >
            <Portrait size="lg" status priority />
            <div>
              <div className="display text-2xl leading-none text-ink">MOE KYAW AUNG</div>
              <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                {profile.location}
              </div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.95, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="display mt-7 text-[clamp(2.6rem,6.6vw,5.4rem)] text-ink"
          >
            {t('hero.headline')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.18 }}
            className="mt-6 hidden items-center gap-3 lg:flex"
          >
            <span className="h-px w-10 bg-gradient-to-r from-neon to-transparent" />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-neon">MOE KYAW AUNG</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
              {profile.location}
            </span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 max-w-2xl text-[15px] leading-relaxed text-dim md:text-[17px]"
          >
            {t('hero.sub')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Magnetic to="/projects">
              {t('cta.viewWork')} <ArrowRight className="h-4 w-4" />
            </Magnetic>
            <Magnetic to="/contact" variant="ghost">
              {t('cta.startProject')} <ArrowUpRight className="h-4 w-4" />
            </Magnetic>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 grid max-w-xl grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4"
          >
            {stats.map((s) => (
              <div key={s.v}>
                <dt className="display text-2xl text-gradient md:text-3xl">{s.k}</dt>
                <dd className="mt-1 text-[11.5px] uppercase tracking-[0.12em] text-faint">{s.v}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <HeroCard />
        </motion.div>
      </div>
    </section>
  )
}

function TrustStrip() {
  const { t } = useI18n()
  const items = [
    { icon: Sparkles, k: t('trust.1.k'), v: t('trust.1.v'), accent: 'neon' as const },
    { icon: ShieldCheck, k: t('trust.2.k'), v: t('trust.2.v'), accent: 'electric' as const },
    { icon: Gauge, k: t('trust.3.k'), v: t('trust.3.v'), accent: 'lime' as const },
    { icon: Users, k: t('trust.4.k'), v: t('trust.4.v'), accent: 'violet' as const },
  ]

  return (
    <section aria-label={t('trust.title')} className="relative border-y border-white/8 bg-white/[0.015]">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-px bg-white/6 px-0 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it, i) => (
          <Reveal key={it.k} delay={i * 0.07}>
            <div className="group h-full bg-[#05080d]/60 px-6 py-8 transition-colors duration-500 hover:bg-white/[0.03] sm:px-8">
              <it.icon
                className="h-5 w-5 transition-transform duration-500 group-hover:-translate-y-0.5"
                style={{ color: ACCENT[it.accent].hex }}
              />
              <div className="mt-4 text-[15px] font-semibold text-ink">{it.k}</div>
              <div className="mt-1.5 text-[13px] leading-relaxed text-dim">{it.v}</div>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="relative overflow-hidden border-t border-white/8 py-3.5">
        <div className="flex w-max animate-marquee gap-8 pr-8">
          {[...MARQUEE, ...MARQUEE].map((m, i) => (
            <span key={`${m}-${i}`} className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/22">
              {m}
            </span>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-obsidian to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-obsidian to-transparent" />
      </div>
    </section>
  )
}

function FeaturedProjects() {
  const { t, tx } = useI18n()
  return (
    <Section>
      <SectionHeading
        eyebrow={t('home.featured.eyebrow')}
        title={t('home.featured.title')}
        lead={t('home.featured.lead')}
        action={<ArrowLink to="/projects">{t('cta.allProjects')}</ArrowLink>}
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {featuredProjects.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.09}>
            <Tilt intensity={5} className="h-full rounded-2xl">
              <article className="glass edge-shine relative flex h-full flex-col overflow-hidden rounded-2xl p-6">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full blur-2xl"
                  style={{ background: `radial-gradient(circle, ${ACCENT[p.accent].soft}, transparent 68%)` }}
                />
                <div className="relative flex items-center justify-between">
                  <span className="font-mono text-[11px] text-faint">0{i + 1}</span>
                  <span className="mono-label" style={{ color: ACCENT[p.accent].hex }}>
                    {p.category}
                  </span>
                </div>

                <h3 className="display relative mt-6 text-3xl text-ink">{p.name}</h3>
                <p className="relative mt-2 text-[13.5px] font-medium" style={{ color: ACCENT[p.accent].hex }}>
                  {tx(p.tagline)}
                </p>
                <p className="relative mt-4 flex-1 text-[14px] leading-relaxed text-dim">{tx(p.summary)}</p>

                <div className="relative mt-6 grid grid-cols-2 gap-3 border-t border-white/8 pt-5">
                  {p.metrics.slice(0, 2).map((m) => (
                    <div key={m.label}>
                      <div className="font-mono text-lg text-ink">{m.value}</div>
                      <div className="mt-0.5 text-[11px] text-faint">{m.label}</div>
                    </div>
                  ))}
                </div>

                <div className="relative mt-5 flex flex-wrap gap-1.5">
                  {p.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-white/8 bg-white/3 px-2 py-0.5 font-mono text-[10px] text-dim"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  to={`/projects/${p.slug}`}
                  className="group/link relative mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition-colors hover:text-neon"
                >
                  {t('cta.viewProject')}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </Link>
              </article>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

function AboutPreview() {
  const { t } = useI18n()
  return (
    <Section>
      <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <Tilt intensity={6} className="rounded-3xl">
            <GlassCard strong className="relative overflow-hidden p-8">
              <div
                aria-hidden
                className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(154,107,255,0.22),transparent_65%)] blur-2xl"
              />
              <CircuitBoard className="h-6 w-6 text-violetneon" />
              <div className="display mt-6 text-[clamp(1.7rem,3.4vw,2.4rem)] leading-tight text-ink">
                “Architecture is the set of decisions you cannot cheaply reverse.”
              </div>
              <div className="mt-6 space-y-3">
                {[
                  { k: 'Ownership', v: 'Modules with named owners and ADRs' },
                  { k: 'Evidence', v: 'Benchmarks before opinions' },
                  { k: 'Handover', v: 'Documentation as a deliverable' },
                ].map((r) => (
                  <div key={r.k} className="flex items-baseline gap-4 border-t border-white/8 pt-3">
                    <span className="mono-label w-24 shrink-0 text-neon">{r.k}</span>
                    <span className="text-[13.5px] text-dim">{r.v}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </Tilt>
        </Reveal>

        <Reveal delay={0.1}>
          <Eyebrow accent="violet">{t('home.about.eyebrow')}</Eyebrow>
          <h2 className="display mt-4 text-[clamp(2rem,4.4vw,3.2rem)] text-ink">{t('about.lead')}</h2>
          <p className="mt-6 text-[15px] leading-relaxed text-dim">{t('about.p1')}</p>
          <p className="mt-4 text-[15px] leading-relaxed text-dim">{t('about.p2')}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Magnetic to="/about" variant="ghost">
              {t('page.about')} <ArrowUpRight className="h-4 w-4" />
            </Magnetic>
            <Magnetic to="/resume" variant="ghost">
              {t('page.resume')} <ArrowUpRight className="h-4 w-4" />
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}

function SkillsSnapshot() {
  const { t, tx } = useI18n()
  return (
    <Section>
      <SectionHeading
        eyebrow={t('home.skills.eyebrow')}
        title={t('home.skills.title')}
        accent="lime"
        action={<ArrowLink to="/skills">{t('page.skills')}</ArrowLink>}
      />
      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((g, i) => (
          <Reveal key={String(g.title)} delay={i * 0.06}>
            <GlassCard className="h-full p-6">
              <div className="flex items-center gap-2">
                <Boxes className="h-4 w-4" style={{ color: ACCENT[g.accent].hex }} />
                <h3 className="text-[15px] font-semibold text-ink">{tx(g.title)}</h3>
              </div>
              <p className="mt-1.5 text-[12.5px] text-faint">{tx(g.note)}</p>
              <div className="mt-5 space-y-3.5">
                {g.skills.slice(0, 3).map((s) => (
                  <Meter key={s.name} value={s.level} accent={g.accent} label={s.name} suffix={s.years} />
                ))}
              </div>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

function TestimonialPreview() {
  const { t, tx } = useI18n()
  const [lead, ...rest] = testimonials
  return (
    <Section>
      <SectionHeading
        eyebrow={t('home.testimonial.eyebrow')}
        title={t('home.testimonial.title')}
        accent="electric"
        action={<ArrowLink to="/testimonials">{t('page.testimonials')}</ArrowLink>}
      />
      <div className="mt-12 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <Reveal>
          <GlassCard strong className="relative h-full overflow-hidden p-8 md:p-10">
            <Quote className="h-8 w-8 text-neon/40" />
            <blockquote className="display mt-6 text-[clamp(1.4rem,2.8vw,2.1rem)] leading-snug text-ink">
              {tx(lead.quote)}
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-3 border-t border-white/8 pt-6">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-white/12 bg-white/6 font-mono text-[12px] text-neon">
                {lead.name.split(' ').map((n) => n[0]).join('')}
              </span>
              <span>
                <span className="block text-sm font-medium text-ink">{lead.name}</span>
                <span className="block text-[12px] text-faint">
                  {lead.role} · {lead.company}
                </span>
              </span>
            </figcaption>
          </GlassCard>
        </Reveal>

        <div className="grid gap-6">
          {rest.slice(0, 2).map((q, i) => (
            <Reveal key={q.name} delay={0.08 + i * 0.08}>
              <GlassCard className="h-full p-6">
                <p className="text-[14px] leading-relaxed text-dim">“{tx(q.quote)}”</p>
                <div className="mt-5 border-t border-white/8 pt-4">
                  <div className="text-[13px] font-medium text-ink">{q.name}</div>
                  <div className="text-[11.5px] text-faint">
                    {q.role} · {q.company}
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}

export default function Home() {
  const { t } = useI18n()
  useSEO(t('page.home'), t('hero.sub'))
  return (
    <>
      <Hero />
      <TrustStrip />
      <FeaturedProjects />
      <AboutPreview />
      <SkillsSnapshot />
      <TestimonialPreview />
      <CTABand />
    </>
  )
}
