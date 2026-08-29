import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { useI18n } from '../lib/i18n'
import { useSEO } from '../lib/seo'
import { caseStudies } from '../lib/data'
import { BulletList, GlassCard, PageHero, Reveal, Section } from '../components/ui'
import CTABand from '../components/CTABand'

export default function CaseStudies() {
  const { t, tx } = useI18n()
  useSEO(t('page.caseStudies'), 'Three deep case studies: architecture migration, realtime performance, and localization engineering.')

  return (
    <>
      <PageHero
        eyebrow={t('page.caseStudies')}
        title="The decisions behind the numbers."
        lead="Three engagements written up the way I would present them internally: the constraint, the lever we pulled, the measured result, and what I would do differently."
        accent="violet"
        meta={[
          { k: 'Studies', v: '3 in depth' },
          { k: 'Disciplines', v: 'Architecture · Performance · i18n' },
          { k: 'Evidence', v: 'Before / after metrics' },
          { k: 'Format', v: 'Problem → lever → result' },
        ]}
      />

      <Section className="pt-2">
        <div className="space-y-8">
          {caseStudies.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.06}>
              <GlassCard strong className="overflow-hidden">
                <div className="grid gap-0 lg:grid-cols-[1.25fr_0.75fr]">
                  <div className="p-7 md:p-9">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="mono-label text-neon">{c.discipline}</span>
                      <span className="font-mono text-[11px] text-faint">{c.duration}</span>
                    </div>
                    <h2 className="display mt-4 text-[clamp(1.8rem,3.6vw,2.7rem)] text-ink">{tx(c.title)}</h2>
                    <p className="mt-3 text-[15px] text-violetneon">{c.headline}</p>

                    <dl className="mt-8 space-y-5">
                      <div>
                        <dt className="mono-label text-faint">{t('ui.challenge')}</dt>
                        <dd className="mt-2 text-[14px] leading-relaxed text-dim">{c.problem}</dd>
                      </div>
                      <div>
                        <dt className="mono-label text-faint">{t('ui.approach')}</dt>
                        <dd className="mt-2 text-[14px] leading-relaxed text-dim">{c.lever}</dd>
                      </div>
                    </dl>

                    <div className="mt-8">
                      <div className="mono-label mb-3 text-faint">What I would tell the next team</div>
                      <BulletList items={c.lessons} accent="violet" />
                    </div>

                    <Link
                      to={`/projects/${c.slug}`}
                      className="group/link mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-ink hover:text-neon"
                    >
                      {c.project} — {t('cta.viewProject')}
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </Link>
                  </div>

                  <div className="border-t border-white/8 bg-white/[0.02] p-7 md:p-9 lg:border-l lg:border-t-0">
                    <div className="mono-label text-limeneon">{t('sec.metrics')}</div>
                    <div className="mt-6 space-y-6">
                      {c.result.map((r) => (
                        <div key={r.label} className="border-b border-white/8 pb-5 last:border-0 last:pb-0">
                          <div className="display text-4xl text-gradient">{r.value}</div>
                          <div className="mt-1.5 text-[13px] text-ink/90">{r.label}</div>
                          {r.note && <div className="text-[11.5px] text-faint">{r.note}</div>}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTABand />
    </>
  )
}
