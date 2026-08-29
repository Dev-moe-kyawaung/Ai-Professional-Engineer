import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { useI18n } from '../lib/i18n'
import { useSEO } from '../lib/seo'
import { posts } from '../lib/data'
import { GlassCard, PageHero, Reveal, Section } from '../components/ui'
import CTABand from '../components/CTABand'

export default function Writing() {
  const { t, formatDate } = useI18n()
  const [tag, setTag] = useState('all')
  useSEO(t('page.writing'), 'Essays on Compose performance, Android architecture, release engineering, and localization.')

  const tags = ['all', ...Array.from(new Set(posts.map((p) => p.tag)))]
  const visible = tag === 'all' ? posts : posts.filter((p) => p.tag === tag)

  return (
    <>
      <PageHero
        eyebrow={t('page.writing')}
        title="Notes from inside the release cycle."
        lead="Long-form writing about the parts of Android engineering that do not fit in a conference slot: budgets, boundaries, and the arguments worth having."
        accent="violet"
        meta={[
          { k: 'Essays', v: `${posts.length} published` },
          { k: 'Cadence', v: 'Monthly' },
          { k: 'Topics', v: 'Performance · Architecture' },
          { k: 'Newsletter', v: '2,400 subscribers' },
        ]}
      />

      <Section className="pt-2">
        <div className="flex flex-wrap gap-2">
          {tags.map((x) => (
            <button
              key={x}
              type="button"
              onClick={() => setTag(x)}
              aria-pressed={tag === x}
              className={`rounded-full border px-4 py-1.5 text-[12.5px] transition-all duration-300 ${
                tag === x
                  ? 'border-violetneon/50 bg-violetneon/12 text-violetneon'
                  : 'border-white/10 bg-white/3 text-dim hover:border-white/25 hover:text-ink'
              }`}
            >
              {x === 'all' ? t('ui.all') : x}
            </button>
          ))}
        </div>

        <div className="mt-10 space-y-4">
          {visible.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.05}>
              <GlassCard className="group p-7">
                <div className="flex flex-wrap items-center gap-3 text-[11.5px] text-faint">
                  <span className="rounded-full border border-white/10 bg-white/3 px-2.5 py-0.5 text-violetneon">
                    {p.tag}
                  </span>
                  <span>{formatDate(p.date)}</span>
                  <span>
                    {p.read} {t('ui.minRead')}
                  </span>
                </div>
                <h2 className="display mt-4 text-[clamp(1.5rem,3vw,2.2rem)] leading-tight text-ink transition-colors group-hover:text-gradient">
                  {p.title}
                </h2>
                <p className="mt-3 max-w-3xl text-[14px] leading-relaxed text-dim">{p.excerpt}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-neon">
                  {t('cta.more')}
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTABand />
    </>
  )
}
