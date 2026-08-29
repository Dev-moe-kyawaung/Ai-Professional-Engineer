import { Trophy } from 'lucide-react'
import { useI18n } from '../lib/i18n'
import { useSEO } from '../lib/seo'
import { awards } from '../lib/data'
import { GlassCard, PageHero, Reveal, Section, Tilt } from '../components/ui'
import CTABand from '../components/CTABand'

export default function Awards() {
  const { t } = useI18n()
  useSEO(t('page.awards'), 'Recognition for product engineering, accessibility, open-source contribution, and speaking.')

  return (
    <>
      <PageHero
        eyebrow={t('page.awards')}
        title="Recognition, kept in proportion."
        lead="Awards matter less than a stable release, but they are useful evidence that the work held up to outside scrutiny."
        accent="lime"
        meta={[
          { k: 'Recognitions', v: `${awards.length}` },
          { k: 'Categories', v: 'Product · Community' },
          { k: 'Most recent', v: '2025' },
          { k: 'Regions', v: 'Thailand · Myanmar · Global' },
        ]}
      />

      <Section className="pt-2">
        <div className="grid gap-5 md:grid-cols-2">
          {awards.map((a, i) => (
            <Reveal key={a.name} delay={i * 0.06}>
              <Tilt intensity={4} className="h-full rounded-2xl">
                <GlassCard className="relative h-full overflow-hidden p-7">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(200,255,77,0.16),transparent_65%)] blur-2xl"
                  />
                  <div className="relative flex items-start justify-between gap-4">
                    <Trophy className="h-5 w-5 text-limeneon" />
                    <span className="font-mono text-[12px] text-faint">{a.year}</span>
                  </div>
                  <h2 className="relative mt-6 text-[17px] font-semibold leading-snug text-ink">{a.name}</h2>
                  <div className="relative mt-1.5 text-[12.5px] text-limeneon">{a.org}</div>
                  <p className="relative mt-4 text-[13.5px] leading-relaxed text-dim">{a.detail}</p>
                </GlassCard>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTABand />
    </>
  )
}
