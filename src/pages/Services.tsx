import { Compass, Layers, LifeBuoy, Radar } from 'lucide-react'
import { useI18n } from '../lib/i18n'
import { useSEO } from '../lib/seo'
import { services, pricingTiers } from '../lib/data'
import { useCurrency } from '../lib/currency'
import { ArrowLink, GlassCard, PageHero, Reveal, Section, SectionHeading, Tilt } from '../components/ui'
import { CurrencyTabs } from '../components/Switchers'
import CTABand from '../components/CTABand'

const ICONS: Record<string, typeof Radar> = { radar: Radar, layers: Layers, lifebuoy: LifeBuoy, compass: Compass }

const process = [
  { k: '01 · Frame', v: 'A 30-minute call, then a written scope with assumptions, exclusions, and a fixed price or rate.' },
  { k: '02 · Baseline', v: 'Measure before touching anything: devices, benchmarks, crash data, build times, team interviews.' },
  { k: '03 · Ship weekly', v: 'Smallest valuable slice to production behind a flag, every week. Demo on Friday, decisions recorded.' },
  { k: '04 · Hand over', v: 'ADRs, runbooks, a recorded walkthrough, and a 30-day support window. Your team owns it.' },
]

const engagementModels = [
  { k: 'Fixed scope', v: 'Best for audits and well-defined builds. 50% on start, 50% on delivery.' },
  { k: 'Monthly retainer', v: 'Best for embedded work and fractional leadership. Rolling, one month notice.' },
  { k: 'Day rate', v: 'Best for workshops, incident support, and short interventions.' },
]

export default function Services() {
  const { t, tx } = useI18n()
  const { price } = useCurrency()
  useSEO(t('page.services'), 'Architecture audits, end-to-end Android builds, release rescue, and fractional mobile leadership.')

  return (
    <>
      <PageHero
        eyebrow={t('page.services')}
        title="Four ways to work together."
        lead="Scoped engagements with written outcomes, transparent pricing in your currency, and a handover that means your team does not need me afterwards."
        accent="lime"
        meta={[
          { k: 'Availability', v: t('availability.badge') },
          { k: 'Engagements', v: 'Fixed · Retainer · Day rate' },
          { k: 'Currencies', v: 'USD · THB · MMK' },
          { k: 'Handover', v: 'Always included' },
        ]}
      />

      <Section className="pt-2">
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((s, i) => {
            const Icon = ICONS[s.icon] ?? Radar
            return (
              <Reveal key={s.slug} delay={i * 0.07}>
                <Tilt intensity={4} className="h-full rounded-2xl">
                  <GlassCard className="flex h-full flex-col p-7">
                    <div className="flex items-start justify-between gap-4">
                      <Icon className="h-6 w-6 text-limeneon" />
                      <span className="font-mono text-[11px] text-faint">{s.duration}</span>
                    </div>
                    <h2 className="display mt-6 text-[1.75rem] leading-tight text-ink">{tx(s.title)}</h2>
                    <p className="mt-2 text-[13.5px] font-medium text-limeneon">{tx(s.outcome)}</p>
                    <p className="mt-4 flex-1 text-[14px] leading-relaxed text-dim">{s.detail}</p>

                    <div className="mt-6 border-t border-white/8 pt-5">
                      <div className="mono-label mb-3 text-faint">{t('sec.deliverables')}</div>
                      <ul className="space-y-2">
                        {s.deliverables.map((d) => (
                          <li key={d} className="flex gap-3 text-[13px] leading-relaxed text-dim">
                            <span aria-hidden className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-limeneon" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </GlassCard>
                </Tilt>
              </Reveal>
            )
          })}
        </div>
      </Section>

      <Section className="pt-0">
        <SectionHeading
          eyebrow={t('sec.process')}
          title="The same four phases, every time"
          lead="Predictability is the point. You always know what happens next and what you receive at the end of it."
          accent="neon"
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {process.map((p, i) => (
            <Reveal key={p.k} delay={i * 0.06}>
              <GlassCard className="h-full p-6">
                <div className="mono-label text-neon">{p.k}</div>
                <p className="mt-4 text-[13.5px] leading-relaxed text-dim">{p.v}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <SectionHeading eyebrow="Engagement models" title="How the commercial side works" accent="violet" />
            <div className="mt-8 space-y-px overflow-hidden rounded-2xl border border-white/8">
              {engagementModels.map((m) => (
                <div key={m.k} className="bg-white/[0.025] px-6 py-4">
                  <div className="text-[13.5px] font-semibold text-ink">{m.k}</div>
                  <div className="mt-1 text-[13px] text-dim">{m.v}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading eyebrow={t('page.pricing')} title="Indicative pricing" accent="lime" />
            </div>
            <div className="mt-6">
              <CurrencyTabs />
            </div>
            <div className="mt-6 space-y-3">
              {pricingTiers.map((tier) => (
                <GlassCard key={tier.slug} className="flex items-center justify-between gap-4 p-5">
                  <div>
                    <div className="text-[14.5px] font-semibold text-ink">{tx(tier.name)}</div>
                    <div className="text-[12px] text-faint">
                      {tier.unit === 'month' ? t('pricing.perMonth') : t('pricing.perProject')}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[11px] text-faint">{t('pricing.from')}</div>
                    <div className="font-mono text-[16px] text-neon">{price(tier.usd)}</div>
                  </div>
                </GlassCard>
              ))}
            </div>
            <div className="mt-6">
              <ArrowLink to="/pricing">{t('cta.seePricing')}</ArrowLink>
            </div>
          </div>
        </div>
      </Section>

      <CTABand />
    </>
  )
}
