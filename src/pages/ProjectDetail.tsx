import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useI18n } from '../lib/i18n'
import { useSEO } from '../lib/seo'
import { getProject, projects } from '../lib/data'
import { ACCENT, BulletList, GlassCard, Magnetic, PageHero, Reveal, Section, SectionHeading, StatGrid, Tilt } from '../components/ui'
import CTABand from '../components/CTABand'
import NotFound from './NotFound'

export default function ProjectDetail() {
  const { slug } = useParams()
  const { t, tx } = useI18n()
  const project = getProject(slug)
  useSEO(project?.name ?? t('page.notFound'), project ? String(tx(project.summary)) : '')

  if (!project) return <NotFound />

  const index = projects.findIndex((p) => p.slug === project.slug)
  const next = projects[(index + 1) % projects.length]

  return (
    <>
      <PageHero
        eyebrow={project.category}
        title={project.name}
        lead={String(tx(project.tagline))}
        accent={project.accent}
        meta={[
          { k: t('ui.role'), v: project.role },
          { k: t('ui.platform'), v: project.platform },
          { k: t('ui.team'), v: project.team },
          { k: t('ui.timeline'), v: `${project.year} · ${project.duration}` },
        ]}
      >
        <div className="mt-8">
          <Link to="/projects" className="inline-flex items-center gap-1.5 text-[13px] text-dim hover:text-neon">
            <ArrowLeft className="h-3.5 w-3.5" /> {t('cta.allProjects')}
          </Link>
        </div>
      </PageHero>

      <Section className="pt-2">
        <Reveal>
          <p className="max-w-3xl text-[17px] leading-relaxed text-ink/90">{tx(project.summary)}</p>
        </Reveal>

        <div className="mt-12">
          <StatGrid stats={project.metrics} accent={project.accent} />
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <GlassCard strong className="h-full p-7">
              <div className="mono-label" style={{ color: ACCENT[project.accent].hex }}>
                {t('ui.challenge')}
              </div>
              <p className="mt-5 text-[15px] leading-relaxed text-dim">{project.challenge}</p>
              <div className="mt-8 border-t border-white/8 pt-6">
                <div className="mono-label text-faint">{t('ui.stackUsed')}</div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-md border border-white/8 bg-white/3 px-2 py-1 font-mono text-[10.5px] text-dim"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </GlassCard>
          </Reveal>

          <div>
            <SectionHeading eyebrow={t('ui.approach')} title="How it was actually built" accent={project.accent} />
            <div className="mt-8 space-y-4">
              {project.approach.map((a, i) => (
                <Reveal key={a.title} delay={i * 0.06}>
                  <GlassCard className="p-6">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-[11px] text-faint">0{i + 1}</span>
                      <h3 className="text-[15.5px] font-semibold text-ink">{a.title}</h3>
                    </div>
                    <p className="mt-3 text-[14px] leading-relaxed text-dim">{a.body}</p>
                  </GlassCard>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow={t('ui.outcome')} title="What changed" accent="lime" />
            <div className="mt-8">
              <BulletList items={project.outcome} accent="lime" />
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Surfaces" title="Key screens" accent={project.accent} />
            <div className="mt-8 grid gap-4">
              {project.screens.map((s, i) => (
                <Reveal key={s.title} delay={i * 0.07}>
                  <Tilt intensity={4} className="rounded-2xl">
                    <GlassCard className="flex gap-5 p-5">
                      <div
                        aria-hidden
                        className="relative h-24 w-14 shrink-0 overflow-hidden rounded-lg border border-white/12"
                        style={{
                          background: `linear-gradient(160deg, ${ACCENT[project.accent].soft}, rgba(255,255,255,0.02))`,
                        }}
                      >
                        <span className="absolute inset-x-2 top-2 h-1.5 rounded-full bg-white/18" />
                        <span className="absolute inset-x-2 top-6 h-8 rounded bg-white/10" />
                        <span className="absolute inset-x-2 top-16 h-1.5 rounded-full bg-white/14" />
                        <span className="absolute inset-x-2 top-[76px] h-1.5 w-6 rounded-full bg-white/14" />
                      </div>
                      <div>
                        <div className="text-[14.5px] font-semibold text-ink">{s.title}</div>
                        <p className="mt-1.5 text-[13px] leading-relaxed text-dim">{s.body}</p>
                      </div>
                    </GlassCard>
                  </Tilt>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <GlassCard strong className="flex flex-col items-start justify-between gap-6 p-8 md:flex-row md:items-center">
          <div>
            <div className="mono-label text-faint">{t('ui.nextProject')}</div>
            <div className="display mt-2 text-3xl text-ink">{next.name}</div>
            <p className="mt-1.5 text-[13.5px] text-dim">{tx(next.tagline)}</p>
          </div>
          <Magnetic to={`/projects/${next.slug}`}>
            {t('cta.viewProject')} <ArrowRight className="h-4 w-4" />
          </Magnetic>
        </GlassCard>
      </Section>

      <CTABand />
    </>
  )
}
