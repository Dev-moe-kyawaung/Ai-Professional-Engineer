import { useI18n } from '../lib/i18n'
import { useSEO } from '../lib/seo'
import { useCurrency } from '../lib/currency'
import { BulletList, GlassCard, PageHero, Reveal, Section, SectionHeading } from '../components/ui'
import { CurrencyTabs, LanguageSwitcher } from '../components/Switchers'
import CTABand from '../components/CTABand'

const samples: { key: string; en: string; my: string; th: string }[] = [
  {
    key: 'transfer.confirm',
    en: 'Confirm transfer',
    my: '\u1004\u103d\u1031\u101c\u103d\u103e\u1032\u1019\u103e\u102f \u1021\u1010\u100a\u103a\u1015\u103c\u102f\u101b\u1014\u103a',
    th: '\u0e22\u0e37\u0e19\u0e22\u0e31\u0e19\u0e01\u0e32\u0e23\u0e42\u0e2d\u0e19',
  },
  {
    key: 'sync.pending',
    en: 'Waiting for connection',
    my: '\u1021\u1004\u103a\u1010\u102c\u1014\u1000\u103a \u1015\u103c\u1014\u103a\u101c\u100a\u103a\u101b\u101b\u103e\u102d\u101b\u1014\u103a \u1005\u1031\u102c\u1004\u1037\u103a\u1006\u102d\u102f\u1004\u103a\u1038\u1014\u1031\u101e\u100a\u103a',
    th: '\u0e01\u0e33\u0e25\u0e31\u0e07\u0e23\u0e2d\u0e01\u0e32\u0e23\u0e40\u0e0a\u0e37\u0e48\u0e2d\u0e21\u0e15\u0e48\u0e2d',
  },
  {
    key: 'a11y.balanceCard',
    en: 'Account balance card, double tap to open',
    my: '\u1021\u1000\u1031\u102c\u1004\u1037\u103a\u101c\u1000\u103a\u1000\u103b\u1014\u103a \u1000\u1010\u103a — ဖွင့်ရန် နှစ်ကြိမ်နှိပ်ပါ',
    th: '\u0e01\u0e32\u0e23\u0e4c\u0e14\u0e22\u0e2d\u0e14\u0e04\u0e07\u0e40\u0e2b\u0e25\u0e37\u0e2d แตะสองครั้งเพื่อเปิด',
  },
]

const practices = [
  'Strings live in one place with descriptions for translators; no concatenation, ever.',
  'ICU message format for plurals and gender — Burmese and Thai plural rules are not English rules.',
  'Pseudo-locale screenshot tests catch truncation before a human reviewer sees the build.',
  'Zawgyi detection and conversion at the input boundary so legacy encoding never reaches storage.',
  'Locale-aware dates, numbers, and currency via Intl / ICU rather than hand-rolled formatting.',
  'Layouts sized by intrinsic content, tested at 0.85× to 2.0× font scale in all three languages.',
  'RTL-ready layout direction from day one, even when no RTL locale is currently shipped.',
]

const scriptNotes = [
  { k: 'Burmese (my)', v: 'Runs ~40% longer than English. Complex stacking means line height needs headroom, and Zawgyi-encoded input still appears on older devices.' },
  { k: 'Thai (th)', v: 'No word spacing, so naive truncation cuts mid-word. Requires ICU line-breaking and taller line boxes for tone marks.' },
  { k: 'English (en)', v: 'The shortest and least demanding — which is exactly why designing in English first hides every layout bug.' },
]

export default function LocalizationPage() {
  const { t, locale, intl, formatDate, formatNumber } = useI18n()
  const { price, currency } = useCurrency()
  useSEO(t('page.localization'), 'Localization engineering for Burmese, Thai, and English with locale-aware formatting and CI verification.')

  const now = '2026-03-18T09:30:00Z'

  return (
    <>
      <PageHero
        eyebrow={t('page.localization')}
        title="Three languages, one layout, no excuses."
        lead="I work from the Myanmar–Thailand border, where an app that only works in English is an app that does not work. This site is a working demonstration: switch language or currency and everything re-formats through Intl, including dates, numbers and prices."
        accent="neon"
        meta={[
          { k: 'Locales', v: 'my · en · th' },
          { k: 'Currencies', v: 'MMK · THB · USD' },
          { k: 'Active locale', v: intl },
          { k: 'Active currency', v: currency },
        ]}
      />

      <Section className="pt-2">
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard strong className="h-full p-7">
              <div className="mono-label text-neon">Live formatting</div>
              <h2 className="display mt-3 text-2xl text-ink">Everything below reacts to your selection</h2>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <LanguageSwitcher />
                <CurrencyTabs />
              </div>
              <dl className="mt-8 space-y-px overflow-hidden rounded-xl border border-white/8">
                {[
                  { k: 'Long date', v: formatDate(now, { dateStyle: 'full' } as Intl.DateTimeFormatOptions) },
                  { k: 'Short date', v: formatDate(now, { dateStyle: 'short' } as Intl.DateTimeFormatOptions) },
                  { k: 'Number', v: formatNumber(1234567.89) },
                  { k: 'Percent', v: formatNumber(0.9962, { style: 'percent', maximumFractionDigits: 2 }) },
                  { k: 'Compact', v: formatNumber(41000, { notation: 'compact' }) },
                  { k: 'Price (audit sprint)', v: price(7500) },
                  { k: 'Price (day rate)', v: price(1400) },
                ].map((r) => (
                  <div key={r.k} className="flex items-center justify-between gap-4 bg-white/[0.025] px-5 py-3.5">
                    <dt className="text-[13px] text-faint">{r.k}</dt>
                    <dd className="font-mono text-[13px] text-ink">{r.v}</dd>
                  </div>
                ))}
              </dl>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.08}>
            <GlassCard className="h-full p-7">
              <div className="mono-label text-violetneon">String catalogue</div>
              <h2 className="display mt-3 text-2xl text-ink">Same key, three scripts</h2>
              <div className="mt-6 space-y-4">
                {samples.map((s) => (
                  <div key={s.key} className="rounded-xl border border-white/8 bg-white/[0.02] p-4">
                    <div className="font-mono text-[11px] text-neon">{s.key}</div>
                    <div className="mt-3 space-y-2 text-[13.5px]">
                      {(['en', 'my', 'th'] as const).map((code) => (
                        <div
                          key={code}
                          className={`flex gap-3 ${locale === code ? 'text-ink' : 'text-dim'}`}
                        >
                          <span className="w-6 shrink-0 font-mono text-[10.5px] uppercase text-faint">{code}</span>
                          <span>{s[code]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Engineering practice" title="Seven rules that prevent the usual bugs" accent="lime" />
            <div className="mt-8">
              <BulletList items={practices} accent="lime" />
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Script notes" title="What each language demands" accent="electric" />
            <div className="mt-8 space-y-px overflow-hidden rounded-2xl border border-white/8">
              {scriptNotes.map((s) => (
                <div key={s.k} className="bg-white/[0.025] px-6 py-4">
                  <div className="text-[13.5px] font-semibold text-ink">{s.k}</div>
                  <div className="mt-1 text-[13px] leading-relaxed text-dim">{s.v}</div>
                </div>
              ))}
            </div>
            <GlassCard className="mt-6 p-6">
              <div className="mono-label text-faint">Currency handling</div>
              <p className="mt-3 text-[13.5px] leading-relaxed text-dim">
                Prices are stored once in a base currency and converted at display time with rounding rules per
                currency — MMK to the nearest 100,000, THB to the nearest 1,000, USD to the nearest 50. Contracts
                lock the rate at signing so nobody is exposed to mid-project movement.
              </p>
            </GlassCard>
          </div>
        </div>
      </Section>

      <CTABand />
    </>
  )
}
