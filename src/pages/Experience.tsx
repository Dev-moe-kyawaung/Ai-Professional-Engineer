import { useI18n } from '../lib/i18n'
import { useSEO } from '../lib/seo'
import { experience } from '../lib/data'
import { GlassCard, PageHero, Reveal, Section, SectionHeading } from '../components/ui'
import CTABand from '../components/CTABand'

const domains = [
  { k: 'Cross-border fintech', v: 'Remittance, multi-currency wallets, KYC flows, regulated data handling.' },
  { k: 'Mobility', v: 'Realtime transit, ticketing, offline validation, Android Auto.' },
  { k: 'Healthcare', v: 'Clinical records, medication scheduling, shared-device workflows.' },
  { k: 'Logistics', v: 'Rugged device fleets, kiosk mode, barcode capture, MDM.' },
  { k: 'Commerce & media', v: 'Catalogues, checkout, subscriptions, offline reading.' },
]

const leadership = [
  { k: 'Architecture forum', v: 'Founded and chair a fortnightly forum where every significant decision is presented, challenged, and recorded as an ADR.' },
  { k: 'Hiring', v: 'Designed the mobile interview loop at two companies. 30+ interviews conducted; calibrated on signal, not trivia.' },
  { k: 'Mentoring', v: '180+ engineers trained through E-4Skills, 11 promoted to senior, two now leading teams of their own.' },
  { k: 'Incident command', v: 'On-call rotation lead for mobile; ran seven Sev-1 incidents with written post-incident reviews.' },
]

export default function ExperiencePage() {
  const { t, tx } = useI18n()
  useSEO(t('page.experience'), 'Twelve years across cross-border fintech, mobility, healthcare, logistics and independent work — with leadership responsibilities.')

  return (
    <>
      <PageHero
        eyebrow={t('page.experience')}
        title="Six chapters. One consistent standard."
        lead="The full professional history, including what I was actually responsible for rather than what the job title said."
        accent="neon"
        meta={[
          { k: 'Years', v: '12' },
          { k: 'Sectors', v: '5' },
          { k: 'Teams led', v: '4' },
          { k: 'Engineers trained', v: '180+' },
        ]}
      />

      <Section className="pt-2">
        <div className="space-y-5">
          {experience.map((r, i) => (
            <Reveal key={r.company} delay={i * 0.05}>
              <GlassCard className="grid gap-6 p-7 md:grid-cols-[0.32fr_0.68fr] md:p-8">
                <div>
                  <div className="font-mono text-[12px] text-neon">{r.period}</div>
                  <h2 className="display mt-2 text-2xl text-ink">{r.company}</h2>
                  <div className="mt-1 text-[13px] text-dim">{r.title}</div>
                  <div className="mt-0.5 text-[12px] text-faint">{r.location}</div>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {r.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-md border border-white/8 bg-white/3 px-2 py-0.5 font-mono text-[10px] text-faint"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[14.5px] text-ink/90">{tx(r.summary)}</p>
                  <ul className="mt-4 space-y-2.5">
                    {r.points.map((p) => (
                      <li key={p} className="flex gap-3 text-[13.5px] leading-relaxed text-dim">
                        <span aria-hidden className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-neon" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Domains" title="Industries I can speak the language of" accent="violet" />
            <div className="mt-8 space-y-px overflow-hidden rounded-2xl border border-white/8">
              {domains.map((d) => (
                <div key={d.k} className="bg-white/[0.025] px-6 py-4">
                  <div className="text-[13.5px] font-semibold text-ink">{d.k}</div>
                  <div className="mt-1 text-[13px] text-dim">{d.v}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Beyond the code" title="Leadership responsibilities" accent="lime" />
            <div className="mt-8 grid gap-4">
              {leadership.map((l, i) => (
                <Reveal key={l.k} delay={i * 0.05}>
                  <GlassCard className="p-6">
                    <div className="text-[14px] font-semibold text-ink">{l.k}</div>
                    <div className="mt-1.5 text-[13.5px] leading-relaxed text-dim">{l.v}</div>
                  </GlassCard>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <CTABand />
    </>
  )
}
