import { useI18n } from '../lib/i18n'
import { Eyebrow, Magnetic } from './ui'
import { ArrowRight, CalendarClock } from 'lucide-react'

export default function CTABand({
  eyebrow,
  title,
  lead,
}: {
  eyebrow?: string
  title?: string
  lead?: string
}) {
  const { t } = useI18n()
  return (
    <section className="relative mx-auto w-full max-w-6xl px-5 pb-24 pt-6 sm:px-8">
      <div className="glass-strong relative overflow-hidden rounded-3xl px-6 py-12 text-center md:px-16 md:py-16">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(34,224,245,0.22),transparent_65%)] blur-2xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-28 -right-16 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(154,107,255,0.22),transparent_65%)] blur-2xl"
        />
        <div className="relative mx-auto flex max-w-2xl flex-col items-center">
          <Eyebrow accent="lime">{eyebrow ?? t('cta.startProject')}</Eyebrow>
          <h2 className="display mt-5 text-[clamp(2rem,4.6vw,3.5rem)] text-ink">{title ?? t('home.cta.title')}</h2>
          <p className="mt-5 text-[15px] leading-relaxed text-dim">{lead ?? t('home.cta.lead')}</p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Magnetic to="/contact">
              {t('cta.contact')} <ArrowRight className="h-4 w-4" />
            </Magnetic>
            <Magnetic to="/pricing" variant="ghost">
              <CalendarClock className="h-4 w-4" /> {t('cta.seePricing')}
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  )
}
