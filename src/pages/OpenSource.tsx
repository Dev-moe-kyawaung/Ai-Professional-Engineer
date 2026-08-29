import { GitFork, Scale, Star } from 'lucide-react'
import { useI18n } from '../lib/i18n'
import { useSEO } from '../lib/seo'
import { ossProjects, profile } from '../lib/data'
import { BulletList, GlassCard, Magnetic, PageHero, Reveal, Section, SectionHeading, Tilt } from '../components/ui'
import CTABand from '../components/CTABand'

const philosophy = [
  'Publish the thing you had to build twice. Everything else is noise.',
  'A library with an unclear deprecation policy is a liability, not a gift.',
  'Documentation is the product. The code is the implementation detail.',
  'Answer issues within a week or archive the repository honestly.',
]

export default function OpenSource() {
  const { t } = useI18n()
  useSEO(t('page.openSource'), 'Open-source Kotlin libraries and tooling: motion primitives, money types, Burmese encoding, accessibility lint.')

  return (
    <>
      <PageHero
        eyebrow={t('page.openSource')}
        title="Small libraries, maintained properly."
        lead="I publish tools I already depend on in production, with semantic versioning, a documented deprecation policy, and issues that actually get answered."
        accent="neon"
        meta={[
          { k: 'Repositories', v: '6 active' },
          { k: 'Stars', v: '4.1k combined' },
          { k: 'Downloads', v: '41k / month' },
          { k: 'Licence', v: 'Apache-2.0 / MIT' },
        ]}
      />

      <Section className="pt-2">
        <div className="grid gap-5 md:grid-cols-2">
          {ossProjects.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.06}>
              <Tilt intensity={4} className="h-full rounded-2xl">
                <GlassCard className="flex h-full flex-col p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="font-mono text-[15px] text-neon">{r.name}</h2>
                      <p className="mt-1 text-[11.5px] uppercase tracking-[0.12em] text-faint">{r.role}</p>
                    </div>
                    <span className="rounded-md border border-white/10 bg-white/3 px-2 py-0.5 font-mono text-[10px] text-dim">
                      {r.language}
                    </span>
                  </div>
                  <p className="mt-4 flex-1 text-[13.5px] leading-relaxed text-dim">{r.desc}</p>
                  <div className="mt-6 flex items-center gap-5 border-t border-white/8 pt-4 text-[12px] text-faint">
                    {r.stars > 0 && (
                      <span className="flex items-center gap-1.5">
                        <Star className="h-3.5 w-3.5 text-limeneon" /> {r.stars.toLocaleString('en-US')}
                      </span>
                    )}
                    {r.forks > 0 && (
                      <span className="flex items-center gap-1.5">
                        <GitFork className="h-3.5 w-3.5" /> {r.forks}
                      </span>
                    )}
                    <span className="flex items-center gap-1.5">
                      <Scale className="h-3.5 w-3.5" /> {r.license}
                    </span>
                  </div>
                </GlassCard>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Maintainer philosophy" title="Four rules I hold myself to" accent="lime" />
            <div className="mt-8">
              <BulletList items={philosophy} accent="lime" />
            </div>
          </div>
          <Reveal delay={0.08}>
            <GlassCard strong className="h-full p-8">
              <div className="mono-label text-neon">Contribute</div>
              <h3 className="display mt-4 text-3xl text-ink">Good first issues are labelled and real.</h3>
              <p className="mt-4 text-[14px] leading-relaxed text-dim">
                Every repository has a contributing guide, a code of conduct, and a maintainer who replies. If you are
                a Myanmar- or Thailand-based engineer looking for your first open-source contribution, mention it and
                I will pair with you on it — in Burmese, Thai or English.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Magnetic href={`https://${profile.github}`}>@{profile.githubHandle} on GitHub</Magnetic>
                <Magnetic to="/mentorship" variant="ghost">
                  {t('page.mentorship')}
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
