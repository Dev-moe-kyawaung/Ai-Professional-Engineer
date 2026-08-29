import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { useI18n } from '../lib/i18n'
import { useSEO } from '../lib/seo'
import { projects } from '../lib/data'
import { ACCENT, GlassCard, PageHero, Reveal, Section, Tilt } from '../components/ui'
import CTABand from '../components/CTABand'

export default function Projects() {
  const { t, tx } = useI18n()
  const [filter, setFilter] = useState<string>('all')
  useSEO(t('page.projects'), 'Selected Android products: fintech, mobility, healthcare, logistics, and open source.')

  const categories = useMemo(() => {
    const set = new Set(projects.map((p) => p.category.split(' · ')[0]))
    return ['all', ...Array.from(set)]
  }, [])

  const visible = filter === 'all' ? projects : projects.filter((p) => p.category.startsWith(filter))

  return (
    <>
      <PageHero
        eyebrow={t('page.projects')}
        title="Six products. All shipped, all measured."
        lead="A curated selection rather than a portfolio dump — each one includes the constraint, the decision, and the number that moved."
        accent="neon"
        meta={[
          { k: 'Shipped', v: '6 featured of 30+' },
          { k: 'Sectors', v: 'Fintech · Mobility · Health' },
          { k: 'Reach', v: '40M+ installs' },
          { k: 'Ownership', v: 'Architecture · Delivery' },
        ]}
      />

      <Section className="pt-2">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              aria-pressed={filter === c}
              className={`rounded-full border px-4 py-1.5 text-[12.5px] transition-all duration-300 ${
                filter === c
                  ? 'border-neon/50 bg-neon/12 text-neon'
                  : 'border-white/10 bg-white/3 text-dim hover:border-white/25 hover:text-ink'
              }`}
            >
              {c === 'all' ? t('ui.all') : c}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {visible.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06}>
              <Tilt intensity={4} className="h-full rounded-2xl">
                <article className="glass edge-shine relative flex h-full flex-col overflow-hidden rounded-2xl">
                  <div
                    className="relative h-40 overflow-hidden border-b border-white/8"
                    style={{
                      background: `radial-gradient(120% 120% at 20% 0%, ${ACCENT[p.accent].soft}, transparent 60%), linear-gradient(140deg, rgba(255,255,255,0.04), rgba(255,255,255,0))`,
                    }}
                  >
                    <div aria-hidden className="absolute inset-0 grid-lines opacity-40" />
                    <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between gap-4">
                      <span className="display text-[2.6rem] leading-none text-ink/90">{p.name}</span>
                      <span className="font-mono text-[11px] text-faint">{p.year}</span>
                    </div>
                    <span
                      className="absolute left-6 top-5 mono-label"
                      style={{ color: ACCENT[p.accent].hex }}
                    >
                      {p.category}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-[13.5px] font-medium" style={{ color: ACCENT[p.accent].hex }}>
                      {tx(p.tagline)}
                    </p>
                    <p className="mt-3 flex-1 text-[14px] leading-relaxed text-dim">{tx(p.summary)}</p>

                    <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/8 pt-5 sm:grid-cols-4">
                      {p.metrics.map((m) => (
                        <div key={m.label}>
                          <div className="font-mono text-[15px] text-ink">{m.value}</div>
                          <div className="mt-0.5 text-[10.5px] leading-tight text-faint">{m.label}</div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {p.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-white/8 bg-white/3 px-2 py-0.5 font-mono text-[10px] text-dim"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      to={`/projects/${p.slug}`}
                      className="group/link mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition-colors hover:text-neon"
                    >
                      {t('cta.viewProject')}
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </Link>
                  </div>
                </article>
              </Tilt>
            </Reveal>
          ))}
        </div>

        <GlassCard className="mt-10 p-7">
          <div className="mono-label text-faint">Not shown</div>
          <p className="mt-3 max-w-3xl text-[14px] leading-relaxed text-dim">
            Around two dozen further engagements are under NDA — banking cores, insurance claim flows, retail
            loyalty platforms, and an airline crew application. I am happy to talk through architecture and
            decisions in a call without disclosing client detail.
          </p>
        </GlassCard>
      </Section>

      <CTABand />
    </>
  )
}
