import { Mic } from 'lucide-react'
import { useI18n } from '../lib/i18n'
import { useSEO } from '../lib/seo'
import { talks } from '../lib/data'
import { GlassCard, Magnetic, PageHero, Reveal, Section, SectionHeading, Tilt } from '../components/ui'
import CTABand from '../components/CTABand'

const topics = [
  'Compose performance and frame budgets',
  'Modularising large Android codebases without a freeze',
  'Offline-first architecture for unreliable networks',
  'Localization engineering for Burmese and Thai',
  'Release engineering: flags, staged rollout, automated halt',
]

export default function Talks() {
  const { t } = useI18n()
  useSEO(t('page.talks'), 'Conference talks, workshops, and podcast appearances on Android performance and architecture.')

  return (
    <>
      <PageHero
        eyebrow={t('page.talks')}
        title="Explaining the hard parts, in public."
        lead="Conference sessions, community meetups, workshops, and podcasts — mostly about making performance and architecture legible to a whole team."
        accent="electric"
        meta={[
          { k: 'Sessions', v: `${talks.length} recent` },
          { k: 'Formats', v: 'Talk · Workshop · Podcast' },
          { k: 'Regions', v: 'SEA · Online' },
          { k: 'Languages', v: 'English · Burmese' },
        ]}
      />

      <Section className="pt-2">
        <div className="grid gap-5 md:grid-cols-2">
          {talks.map((tk, i) => (
            <Reveal key={tk.title} delay={i * 0.06}>
              <Tilt intensity={4} className="h-full rounded-2xl">
                <GlassCard className="flex h-full flex-col p-7">
                  <div className="flex items-start justify-between gap-4">
                    <Mic className="h-5 w-5 text-electric" />
                    <span className="font-mono text-[11px] text-faint">
                      {tk.year} · {tk.length}
                    </span>
                  </div>
                  <h2 className="display mt-6 text-[1.6rem] leading-tight text-ink">{tk.title}</h2>
                  <div className="mt-2 text-[13px] text-electric">
                    {tk.event} · {tk.type}
                  </div>
                  <p className="mt-4 flex-1 text-[13.5px] leading-relaxed text-dim">{tk.desc}</p>
                </GlassCard>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Speaking" title="Topics I can deliver on short notice" accent="neon" />
            <ul className="mt-8 space-y-3">
              {topics.map((x, i) => (
                <Reveal key={x} delay={i * 0.05}>
                  <li className="glass flex gap-4 rounded-xl p-5 text-[13.5px] text-dim">
                    <span className="font-mono text-[11px] text-neon">{String(i + 1).padStart(2, '0')}</span>
                    {x}
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
          <Reveal delay={0.1}>
            <GlassCard strong className="h-full p-8">
              <div className="mono-label text-limeneon">Invite me</div>
              <h3 className="display mt-4 text-3xl text-ink">Conferences, meetups, and internal team sessions.</h3>
              <p className="mt-4 text-[14px] leading-relaxed text-dim">
                I speak free of charge at community meetups across Myanmar and Thailand. For corporate workshops and
                internal enablement sessions, see the workshop add-on on the pricing page.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Magnetic to="/contact">{t('cta.contact')}</Magnetic>
                <Magnetic to="/pricing" variant="ghost">
                  {t('cta.seePricing')}
                </Magnetic>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </Section>

      <CTABand />
    </>
  )
}
