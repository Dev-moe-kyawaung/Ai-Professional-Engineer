import { useState } from 'react'
import { Quote } from 'lucide-react'
import { useI18n } from '../lib/i18n'
import { useSEO } from '../lib/seo'
import { testimonials } from '../lib/data'
import { GlassCard, PageHero, Reveal, Section, Tilt } from '../components/ui'
import CTABand from '../components/CTABand'

export default function TestimonialsPage() {
  const { t, tx } = useI18n()
  const [tag, setTag] = useState('all')
  useSEO(t('page.testimonials'), 'What engineering leaders, product heads, and clients say about working together.')

  const tags = ['all', ...Array.from(new Set(testimonials.map((x) => x.tag)))]
  const visible = tag === 'all' ? testimonials : testimonials.filter((x) => x.tag === tag)

  return (
    <>
      <PageHero
        eyebrow={t('page.testimonials')}
        title="References, in their own words."
        lead="Collected from engineering managers, product leaders, and clinicians who had to live with the systems after I left."
        accent="electric"
        meta={[
          { k: 'Sources', v: '6 organisations' },
          { k: 'Roles', v: 'VP Eng · CTO · Product' },
          { k: 'Topics', v: 'Architecture · Delivery' },
          { k: 'References', v: 'Available on request' },
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
                  ? 'border-electric/50 bg-electric/12 text-electric'
                  : 'border-white/10 bg-white/3 text-dim hover:border-white/25 hover:text-ink'
              }`}
            >
              {x === 'all' ? t('ui.all') : x}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {visible.map((q, i) => (
            <Reveal key={q.name} delay={i * 0.06}>
              <Tilt intensity={4} className="h-full rounded-2xl">
                <GlassCard className="flex h-full flex-col p-7">
                  <Quote className="h-6 w-6 text-neon/40" />
                  <blockquote className="mt-5 flex-1 text-[15px] leading-relaxed text-ink/90">{tx(q.quote)}</blockquote>
                  <figcaption className="mt-7 flex items-center gap-3 border-t border-white/8 pt-5">
                    <span className="grid h-10 w-10 place-items-center rounded-full border border-white/12 bg-white/6 font-mono text-[12px] text-neon">
                      {q.name.split(' ').map((n) => n[0]).join('')}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[13.5px] font-medium text-ink">{q.name}</span>
                      <span className="block text-[11.5px] text-faint">
                        {q.role} · {q.company}
                      </span>
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/3 px-2.5 py-0.5 text-[10.5px] text-dim">
                      {q.tag}
                    </span>
                  </figcaption>
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
