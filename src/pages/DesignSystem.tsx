import { useI18n } from '../lib/i18n'
import { useSEO } from '../lib/seo'
import { GlassCard, Magnetic, PageHero, Pill, Reveal, Section, SectionHeading, Meter } from '../components/ui'
import CTABand from '../components/CTABand'

const colors = [
  { name: 'obsidian', hex: '#04060a', use: 'Page base' },
  { name: 'void', hex: '#070a10', use: 'Elevated base' },
  { name: 'charcoal', hex: '#0b1018', use: 'Panel fill' },
  { name: 'ink', hex: '#e9eef7', use: 'Primary text' },
  { name: 'dim', hex: '#9aa8bd', use: 'Body text' },
  { name: 'faint', hex: '#67748a', use: 'Meta text' },
  { name: 'neon', hex: '#22e0f5', use: 'Primary accent' },
  { name: 'electric', hex: '#4c86ff', use: 'Secondary accent' },
  { name: 'violet', hex: '#9a6bff', use: 'Tertiary accent' },
  { name: 'lime', hex: '#c8ff4d', use: 'Success / availability' },
]

const typeScale = [
  { name: 'Display XL', cls: 'display text-[clamp(2.6rem,6vw,5rem)]', sample: 'Ship it' },
  { name: 'Display L', cls: 'display text-[clamp(2rem,4.4vw,3.4rem)]', sample: 'Architecture' },
  { name: 'Display M', cls: 'display text-2xl', sample: 'Section title' },
  { name: 'Body L', cls: 'text-[17px] leading-relaxed', sample: 'Lead paragraph copy for page introductions.' },
  { name: 'Body M', cls: 'text-[14px] leading-relaxed', sample: 'Default body copy used across cards and lists.' },
  { name: 'Mono label', cls: 'mono-label', sample: 'PERFORMANCE BUDGET' },
]

const spacing = [4, 8, 12, 16, 24, 32, 48, 64, 96]
const radii = [
  { name: 'sm', px: 8 },
  { name: 'md', px: 12 },
  { name: 'lg', px: 16 },
  { name: 'xl', px: 24 },
  { name: 'full', px: 999 },
]

const motionTokens = [
  { name: 'instant', dur: '120ms', ease: 'linear', use: 'State toggles, pressed feedback' },
  { name: 'quick', dur: '240ms', ease: 'cubic-bezier(.22,1,.36,1)', use: 'Hover, dropdown, tooltip' },
  { name: 'standard', dur: '450ms', ease: 'cubic-bezier(.22,1,.36,1)', use: 'Card reveal, page section entry' },
  { name: 'cinematic', dur: '900ms', ease: 'cubic-bezier(.22,1,.36,1)', use: 'Hero entrance, one per page' },
]

export default function DesignSystem() {
  const { t } = useI18n()
  useSEO(t('page.designSystem'), 'The token set behind this site and the products I build: colour, type, spacing, elevation, and motion.')

  return (
    <>
      <PageHero
        eyebrow={t('page.designSystem')}
        title="Tokens first, components second."
        lead="A design system is a shared vocabulary before it is a component library. This is the token set behind this site — and the same structure I set up with product design teams."
        accent="violet"
        meta={[
          { k: 'Colour tokens', v: '10 semantic' },
          { k: 'Type scale', v: '6 steps' },
          { k: 'Motion tokens', v: '4 durations' },
          { k: 'Contrast', v: 'AA verified' },
        ]}
      />

      <Section className="pt-2">
        <SectionHeading eyebrow="Colour" title="Semantic, never literal" accent="violet" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {colors.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.04}>
              <GlassCard className="overflow-hidden">
                <div className="h-20 w-full" style={{ background: c.hex }} />
                <div className="p-4">
                  <div className="font-mono text-[12px] text-ink">{c.name}</div>
                  <div className="font-mono text-[11px] text-faint">{c.hex}</div>
                  <div className="mt-1.5 text-[11.5px] text-dim">{c.use}</div>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeading eyebrow="Typography" title="Editorial display, technical detail" accent="neon" />
            <div className="mt-9 space-y-px overflow-hidden rounded-2xl border border-white/8">
              {typeScale.map((ts) => (
                <div key={ts.name} className="bg-white/[0.025] px-6 py-5">
                  <div className="mono-label text-faint">{ts.name}</div>
                  <div className={`mt-2 text-ink ${ts.cls}`}>{ts.sample}</div>
                </div>
              ))}
            </div>
            <p className="mt-5 text-[13px] text-faint">
              Instrument Serif for display, Manrope for interface, JetBrains Mono for data — with Noto Sans Myanmar
              and Noto Sans Thai in the same stack so all three languages share one rhythm.
            </p>
          </div>

          <div className="space-y-8">
            <div>
              <SectionHeading eyebrow="Spacing" title="A 4pt rhythm" accent="electric" />
              <div className="mt-8 space-y-2.5">
                {spacing.map((s) => (
                  <div key={s} className="flex items-center gap-4">
                    <span className="w-10 font-mono text-[11px] text-faint">{s}</span>
                    <span className="h-2 rounded-full bg-gradient-to-r from-electric to-neon" style={{ width: s * 2 }} />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <SectionHeading eyebrow="Radius" title="Soft, not round" accent="lime" />
              <div className="mt-8 flex flex-wrap gap-3">
                {radii.map((r) => (
                  <div key={r.name} className="text-center">
                    <div
                      className="h-16 w-16 border border-white/12 bg-white/5"
                      style={{ borderRadius: r.px }}
                    />
                    <div className="mt-2 font-mono text-[10.5px] text-faint">{r.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <SectionHeading eyebrow="Components" title="The primitives in use on this site" accent="neon" />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          <Reveal>
            <GlassCard className="h-full p-6">
              <div className="mono-label text-faint">Buttons</div>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Magnetic>Primary</Magnetic>
                <Magnetic variant="ghost">Ghost</Magnetic>
              </div>
              <p className="mt-5 text-[12.5px] text-faint">
                Magnetic pointer response of 14px maximum, disabled under reduced-motion.
              </p>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.08}>
            <GlassCard className="h-full p-6">
              <div className="mono-label text-faint">Pills & meters</div>
              <div className="mt-6 flex flex-wrap gap-2">
                <Pill accent="neon">Kotlin</Pill>
                <Pill accent="violet">Compose</Pill>
                <Pill accent="lime">Shipped</Pill>
                <Pill>Neutral</Pill>
              </div>
              <div className="mt-6 space-y-3">
                <Meter value={92} accent="neon" label="Coverage" suffix="92%" />
                <Meter value={68} accent="violet" label="Adoption" suffix="68%" />
              </div>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.16}>
            <GlassCard className="h-full p-6">
              <div className="mono-label text-faint">Surfaces</div>
              <div className="mt-6 space-y-3">
                <div className="glass-quiet rounded-xl p-4 text-[12.5px] text-dim">glass-quiet · blur 12</div>
                <div className="glass rounded-xl p-4 text-[12.5px] text-dim">glass · blur 18</div>
                <div className="glass-strong rounded-xl p-4 text-[12.5px] text-dim">glass-strong · blur 26</div>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </Section>

      <Section className="pt-0">
        <SectionHeading eyebrow="Motion" title="Four durations, one easing family" accent="lime" />
        <div className="mt-10 overflow-x-auto rounded-2xl border border-white/8">
          <table className="w-full min-w-[560px] text-left">
            <thead>
              <tr className="border-b border-white/8 bg-white/[0.03]">
                <th className="mono-label px-5 py-3.5 text-faint">Token</th>
                <th className="mono-label px-5 py-3.5 text-faint">Duration</th>
                <th className="mono-label px-5 py-3.5 text-faint">Easing</th>
                <th className="mono-label px-5 py-3.5 text-faint">Use</th>
              </tr>
            </thead>
            <tbody>
              {motionTokens.map((m) => (
                <tr key={m.name} className="border-b border-white/6 last:border-0 hover:bg-white/[0.025]">
                  <td className="px-5 py-4 font-mono text-[12.5px] text-limeneon">{m.name}</td>
                  <td className="px-5 py-4 font-mono text-[12.5px] text-ink">{m.dur}</td>
                  <td className="px-5 py-4 font-mono text-[11.5px] text-dim">{m.ease}</td>
                  <td className="px-5 py-4 text-[13px] text-dim">{m.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-[12.5px] text-faint">
          Every animation on this site is disabled or reduced when <code className="font-mono text-neon">prefers-reduced-motion</code> is set.
        </p>
      </Section>

      <CTABand />
    </>
  )
}
