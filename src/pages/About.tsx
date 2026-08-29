import { Compass, Feather, Mountain, PenTool, ShieldCheck, Users } from 'lucide-react'
import { useI18n } from '../lib/i18n'
import { useSEO } from '../lib/seo'
import { profile } from '../lib/data'
import { ACCENT, GlassCard, PageHero, Reveal, Section, SectionHeading, Tilt } from '../components/ui'
import Portrait from '../components/Portrait'
import CTABand from '../components/CTABand'

const principles = [
  {
    icon: Compass,
    accent: 'neon' as const,
    title: 'Decide once, document forever',
    body: 'Every irreversible decision gets an ADR: the context, the options, the trade-off, and the date. Future-you and future-them deserve the reasoning, not just the result.',
  },
  {
    icon: ShieldCheck,
    accent: 'electric' as const,
    title: 'Reliability is a product feature',
    body: 'A crash-free rate is a promise to a customer. I set SLOs with product, route alerts to owners, and treat a regression as a stop-the-line event rather than a ticket.',
  },
  {
    icon: Mountain,
    accent: 'lime' as const,
    title: 'Measure before you argue',
    body: 'Opinions about performance are cheap. A Perfetto trace, a macrobenchmark, and a device matrix end the debate in twenty minutes.',
  },
  {
    icon: Users,
    accent: 'violet' as const,
    title: 'The team outlives the feature',
    body: 'I optimise for the engineer who joins in eighteen months. Naming, boundaries, tests, and docs are how you show respect to people you have not met.',
  },
  {
    icon: PenTool,
    accent: 'neon' as const,
    title: 'Design is a shared discipline',
    body: 'I read the Figma file properly, ask about the empty state, and push back with implementation cost — early, in the open, with alternatives attached.',
  },
  {
    icon: Feather,
    accent: 'electric' as const,
    title: 'Say the hard thing kindly',
    body: 'Scope that will damage a release gets named in the room, with data and a proposal. Calm honesty scales better than heroics.',
  },
]

const workingRhythm = [
  { k: 'Week 0', v: 'Read the codebase, the analytics, and the support tickets. Talk to whoever answers the phone when it breaks.' },
  { k: 'Week 1', v: 'Baseline measurements on real devices. A written, ranked list of what actually hurts.' },
  { k: 'Week 2+', v: 'Ship the smallest valuable slice to production behind a flag. Repeat weekly. Never a big-bang reveal.' },
  { k: 'Ongoing', v: 'Architecture forum, PR review standards, and a monthly release-health report the whole company can read.' },
]

const offHours = [
  'Early morning runs along the Mae Sai river road — the only hour my phone is genuinely off.',
  'Film photography on an old Olympus, which taught me more about constraint than any framework.',
  'Teaching a free Saturday Android class through E-4Skills, now in its fifth year.',
  'Reading computer-vision papers I only half understand, then building the toy version anyway.',
]

export default function About() {
  const { t } = useI18n()
  useSEO(t('page.about'), t('about.lead'))

  return (
    <>
      <PageHero
        eyebrow={t('page.about')}
        title={t('about.lead')}
        accent="violet"
        meta={[
          { k: 'Base', v: profile.location },
          { k: 'Focus', v: 'Android · Kotlin · Compose' },
          { k: 'Experience', v: '12 years, 5 industries' },
          { k: 'Languages', v: 'Burmese · English · Thai' },
        ]}
      />

      <Section className="pt-4">
        <Reveal>
          <GlassCard strong className="mb-12 flex flex-col items-start gap-7 p-8 sm:flex-row sm:items-center md:p-10">
            <Portrait size="xl" status priority />
            <div>
              <div className="mono-label text-neon">{profile.title}</div>
              <h2 className="display mt-3 text-[clamp(2.2rem,4.6vw,3.4rem)] leading-none text-ink">
                MOE KYAW AUNG
              </h2>
              <p className="mt-4 max-w-xl text-[14.5px] leading-relaxed text-dim">
                Twelve years building Android from the Myanmar–Thailand border. Currently a Senior Android
                Engineer at {profile.company}, and founder of {profile.venture}, an engineering practice that has
                trained more than 180 regional engineers.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {['Kotlin', 'Jetpack Compose', 'Architecture', 'Performance', 'Offline-first', 'CI/CD'].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/4 px-3 py-1 font-mono text-[10.5px] text-dim"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </GlassCard>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr]">
          <Reveal>
            <div className="space-y-6 text-[15.5px] leading-relaxed text-dim">
              <p className="text-[17px] text-ink/90">{t('about.p1')}</p>
              <p>{t('about.p2')}</p>
              <p>{t('about.p3')}</p>
              <p>
                I have worked in cross-border payments under regulatory review, in public transit where a bad
                release strands commuters, and in rural healthcare where the device is shared and the network is a
                rumour. Those contexts taught me the same lesson three times: the constraint you refuse to design
                for is the one that ships to your users.
              </p>
              <p>
                Alongside Android I have taken formal study in computer vision with Python, cyber security, web
                technologies and digital growth strategy. Not because a mobile engineer needs all of it — but
                because knowing where the data goes after it leaves the device makes me a better one.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Tilt intensity={5} className="rounded-2xl">
              <GlassCard strong className="p-7">
                <div className="mono-label text-neon">Currently</div>
                <ul className="mt-5 space-y-4 text-[13.5px] text-dim">
                  <li className="border-b border-white/8 pb-4">
                    <span className="block text-ink">Senior Android Engineer</span>
                    {profile.company} — architecture and release health ownership
                  </li>
                  <li className="border-b border-white/8 pb-4">
                    <span className="block text-ink">Founder</span>
                    {profile.venture} — 180+ engineers trained, 3 cohorts a year
                  </li>
                  <li className="border-b border-white/8 pb-4">
                    <span className="block text-ink">Maintainer</span>
                    compose-motion-lab — 41k monthly downloads
                  </li>
                  <li>
                    <span className="block text-ink">Based in</span>
                    {profile.location} — MMT (UTC+6:30), remote-first
                  </li>
                </ul>
              </GlassCard>
            </Tilt>
          </Reveal>
        </div>
      </Section>

      <Section className="pt-0">
        <SectionHeading eyebrow={t('about.principles')} title="Six things I will not compromise on" accent="neon" />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <GlassCard className="group h-full p-6">
                <p.icon className="h-5 w-5" style={{ color: ACCENT[p.accent].hex }} />
                <h3 className="mt-5 text-[15.5px] font-semibold text-ink">{p.title}</h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-dim">{p.body}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Working rhythm" title="What the first month looks like" accent="electric" />
            <div className="mt-9 space-y-px overflow-hidden rounded-2xl border border-white/8">
              {workingRhythm.map((r, i) => (
                <Reveal key={r.k} delay={i * 0.06}>
                  <div className="flex flex-col gap-1.5 bg-white/[0.025] px-6 py-5 sm:flex-row sm:gap-6">
                    <span className="mono-label w-24 shrink-0 pt-1 text-neon">{r.k}</span>
                    <span className="text-[13.5px] leading-relaxed text-dim">{r.v}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <SectionHeading eyebrow={t('about.offhours')} title="The parts that are not code" accent="lime" />
            <ul className="mt-9 space-y-4">
              {offHours.map((o, i) => (
                <Reveal key={o} delay={i * 0.06}>
                  <li className="glass flex gap-4 rounded-xl p-5 text-[13.5px] leading-relaxed text-dim">
                    <span className="font-mono text-[11px] text-limeneon">0{i + 1}</span>
                    {o}
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <CTABand />
    </>
  )
}
