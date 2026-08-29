import { FlaskConical } from 'lucide-react'
import { useI18n } from '../lib/i18n'
import { useSEO } from '../lib/seo'
import { labs } from '../lib/data'
import { GlassCard, PageHero, Reveal, Section, Tilt } from '../components/ui'
import CTABand from '../components/CTABand'

const STATUS: Record<string, string> = {
  Active: 'border-neon/35 bg-neon/10 text-neon',
  Shipped: 'border-limeneon/35 bg-limeneon/10 text-limeneon',
  Paused: 'border-white/12 bg-white/4 text-faint',
}

export default function Labs() {
  const { t } = useI18n()
  useSEO(t('page.labs'), 'Experiments in Compose motion, on-device ML, Gradle tooling, and text shaping performance.')

  return (
    <>
      <PageHero
        eyebrow={t('page.labs')}
        title="Experiments that have not earned a product yet."
        lead="Where I test ideas before they touch a client codebase. Some ship into open source, some produce a benchmark and a firm no."
        accent="neon"
        meta={[
          { k: 'Experiments', v: `${labs.length} tracked` },
          { k: 'Active', v: `${labs.filter((l) => l.status === 'Active').length}` },
          { k: 'Graduated', v: `${labs.filter((l) => l.status === 'Shipped').length}` },
          { k: 'Rule', v: 'Publish the negative results too' },
        ]}
      />

      <Section className="pt-2">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {labs.map((l, i) => (
            <Reveal key={l.name} delay={i * 0.06}>
              <Tilt intensity={5} className="h-full rounded-2xl">
                <GlassCard className="flex h-full flex-col p-6">
                  <div className="flex items-start justify-between gap-3">
                    <FlaskConical className="h-5 w-5 text-neon" />
                    <span className={`rounded-full border px-2.5 py-0.5 text-[10.5px] ${STATUS[l.status]}`}>
                      {l.status}
                    </span>
                  </div>
                  <h2 className="mt-5 text-[16px] font-semibold leading-snug text-ink">{l.name}</h2>
                  <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-dim">{l.desc}</p>
                  <div className="mt-5 flex flex-wrap gap-1.5 border-t border-white/8 pt-4">
                    {l.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-white/8 bg-white/3 px-2 py-0.5 font-mono text-[10px] text-faint"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
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
