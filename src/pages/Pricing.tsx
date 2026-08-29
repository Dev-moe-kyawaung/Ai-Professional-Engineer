import { Check, Sparkles } from 'lucide-react'
import { useI18n } from '../lib/i18n'
import { useSEO } from '../lib/seo'
import { useCurrency } from '../lib/currency'
import { faqs, pricingAddons, pricingTiers } from '../lib/data'
import { ArrowLink, GlassCard, Magnetic, PageHero, Reveal, Section, SectionHeading, Tilt } from '../components/ui'
import { CurrencyTabs } from '../components/Switchers'
import CTABand from '../components/CTABand'

export default function Pricing() {
  const { t, tx } = useI18n()
  const { price, currency } = useCurrency()
  useSEO(t('page.pricing'), 'Transparent engagement pricing in USD, THB, and MMK for audits, builds, and fractional leadership.')

  const commercialFaqs = faqs.filter((f) => f.group === 'Commercial')

  return (
    <>
      <PageHero
        eyebrow={t('page.pricing')}
        title="Priced in the currency you budget in."
        lead={t('pricing.lead')}
        accent="lime"
        meta={[
          { k: t('ui.currency'), v: currency },
          { k: 'Terms', v: '50 / 50 or monthly' },
          { k: 'Rate lock', v: 'Fixed at signing' },
          { k: 'Support', v: '30 days post-handover' },
        ]}
      />

      <Section className="pt-2">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="text-[13px] text-dim">{t('pricing.switch')}</span>
          <CurrencyTabs />
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {pricingTiers.map((tier, i) => (
            <Reveal key={tier.slug} delay={i * 0.08}>
              <Tilt intensity={5} className="h-full rounded-2xl">
                <div
                  className={`relative flex h-full flex-col rounded-2xl p-7 ${
                    tier.popular ? 'glass-strong' : 'glass'
                  }`}
                >
                  {tier.popular && (
                    <span className="absolute -top-3 left-7 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-neon to-violetneon px-3 py-1 text-[11px] font-semibold text-obsidian">
                      <Sparkles className="h-3 w-3" /> {t('pricing.popular')}
                    </span>
                  )}
                  <h2 className="display text-[1.9rem] text-ink">{tx(tier.name)}</h2>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-dim">{tx(tier.blurb)}</p>

                  <div className="mt-7 border-y border-white/8 py-6">
                    <div className="text-[11px] uppercase tracking-[0.16em] text-faint">{t('pricing.from')}</div>
                    <div className="display mt-1.5 text-[2.6rem] leading-none text-gradient">{price(tier.usd)}</div>
                    <div className="mt-2 text-[12.5px] text-faint">
                      {tier.unit === 'month' ? t('pricing.perMonth') : t('pricing.perProject')}
                    </div>
                  </div>

                  <div className="mt-6 flex-1">
                    <div className="mono-label mb-4 text-faint">{t('pricing.includes')}</div>
                    <ul className="space-y-3">
                      {tier.features.map((f, fi) => (
                        <li key={fi} className="flex gap-3 text-[13.5px] leading-relaxed text-dim">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-limeneon" />
                          {tx(f)}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8">
                    <Magnetic to="/contact" variant={tier.popular ? 'primary' : 'ghost'} block>
                      {t('cta.startProject')}
                    </Magnetic>
                  </div>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 max-w-3xl text-[12.5px] leading-relaxed text-faint">{t('pricing.note')}</p>
      </Section>

      <Section className="pt-0">
        <SectionHeading eyebrow={t('pricing.addons')} title="Bolt-on work, same transparency" accent="violet" />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {pricingAddons.map((a, i) => (
            <Reveal key={String(a.name)} delay={i * 0.06}>
              <GlassCard className="flex items-center justify-between gap-6 p-6">
                <div className="text-[14px] text-ink">{tx(a.name)}</div>
                <div className="shrink-0 text-right">
                  <div className="font-mono text-[15px] text-violetneon">{price(a.usd)}</div>
                  <div className="text-[11px] text-faint">
                    {a.unit === 'day' ? t('pricing.perDay') : t('pricing.perProject')}
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <SectionHeading eyebrow={t('sec.faqShort')} title="Commercial questions" accent="neon" action={<ArrowLink to="/faq">{t('page.faq')}</ArrowLink>} />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {commercialFaqs.map((f, i) => (
            <Reveal key={String(f.q)} delay={i * 0.06}>
              <GlassCard className="h-full p-6">
                <h3 className="text-[15px] font-semibold text-ink">{tx(f.q)}</h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-dim">{tx(f.a)}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTABand />
    </>
  )
}
