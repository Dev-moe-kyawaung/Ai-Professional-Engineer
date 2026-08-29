import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useI18n } from '../lib/i18n'
import { useSEO } from '../lib/seo'
import { faqs } from '../lib/data'
import { GlassCard, Magnetic, PageHero, Reveal, Section } from '../components/ui'

export default function Faq() {
  const { t, tx } = useI18n()
  const [open, setOpen] = useState<string | null>(String(faqs[0].q))
  const [group, setGroup] = useState('all')
  useSEO(t('page.faq'), 'Answers on engagement, technical positions, commercial terms, and working style.')

  const groups = ['all', ...Array.from(new Set(faqs.map((f) => f.group)))]
  const visible = group === 'all' ? faqs : faqs.filter((f) => f.group === group)

  return (
    <>
      <PageHero
        eyebrow={t('page.faq')}
        title="The questions that come up before every contract."
        lead="Answered plainly, so the first call can be about your product rather than my process."
        accent="neon"
        meta={[
          { k: 'Questions', v: `${faqs.length}` },
          { k: 'Groups', v: '4' },
          { k: 'Response time', v: '1 business day' },
          { k: 'Currencies', v: 'USD · THB · MMK' },
        ]}
      />

      <Section className="pt-2">
        <div className="flex flex-wrap gap-2">
          {groups.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setGroup(g)}
              aria-pressed={group === g}
              className={`rounded-full border px-4 py-1.5 text-[12.5px] transition-all duration-300 ${
                group === g
                  ? 'border-neon/50 bg-neon/12 text-neon'
                  : 'border-white/10 bg-white/3 text-dim hover:border-white/25 hover:text-ink'
              }`}
            >
              {g === 'all' ? t('ui.all') : g}
            </button>
          ))}
        </div>

        <div className="mt-10 space-y-3">
          {visible.map((f, i) => {
            const id = String(f.q)
            const isOpen = open === id
            return (
              <Reveal key={id} delay={i * 0.04}>
                <div className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${isOpen ? 'border-neon/30 bg-white/[0.045]' : 'border-white/8 bg-white/[0.02]'}`}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : id)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="font-mono text-[11px] text-faint">{String(i + 1).padStart(2, '0')}</span>
                      <span className="text-[15px] font-medium text-ink">{tx(f.q)}</span>
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-neon transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <div
                    className="grid transition-all duration-500 ease-out"
                    style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 pl-[3.6rem] text-[14px] leading-relaxed text-dim">{tx(f.a)}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>

        <GlassCard strong className="mt-10 flex flex-col items-start justify-between gap-5 p-8 md:flex-row md:items-center">
          <div>
            <div className="display text-2xl text-ink">Still unanswered?</div>
            <p className="mt-1.5 text-[13.5px] text-dim">Ask directly — I reply within one business day.</p>
          </div>
          <Magnetic to="/contact">{t('cta.contact')}</Magnetic>
        </GlassCard>
      </Section>
    </>
  )
}
