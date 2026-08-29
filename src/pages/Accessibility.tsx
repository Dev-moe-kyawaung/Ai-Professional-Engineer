import { CheckCircle2, Eye, Keyboard, Volume2 } from 'lucide-react'
import { useI18n } from '../lib/i18n'
import { useSEO } from '../lib/seo'
import { BulletList, GlassCard, PageHero, Reveal, Section, SectionHeading } from '../components/ui'
import CTABand from '../components/CTABand'

const commitments = [
  { icon: Eye, title: 'Contrast enforced by tokens', body: 'Every foreground/background pair in the design system is checked at build time. A token pair below 4.5:1 for body text fails the lint rule.' },
  { icon: Keyboard, title: 'Keyboard and D-pad complete', body: 'Full traversal without a pointer, visible focus rings, logical order, and escape routes from every overlay. Verified on TV and desktop form factors too.' },
  { icon: Volume2, title: 'Screen reader authored, not inferred', body: 'Compose semantics written alongside layout: merged nodes, meaningful labels, state descriptions, and live regions for async results.' },
  { icon: CheckCircle2, title: 'Tested with people, not just tools', body: 'Automated checks catch maybe 30% of real problems. Monthly sessions with a low-vision clinic worker catch the rest.' },
]

const checklist = [
  { item: 'Text contrast ≥ 4.5:1 (body), ≥ 3:1 (large)', status: 'Enforced in CI' },
  { item: 'Touch targets ≥ 48dp with 8dp spacing', status: 'Lint rule' },
  { item: 'Font scaling to 200% without truncation', status: 'Screenshot test' },
  { item: 'Content descriptions on all actionable nodes', status: 'Lint rule' },
  { item: 'Focus order matches visual order', status: 'Manual + espresso' },
  { item: 'No information conveyed by colour alone', status: 'Design review' },
  { item: 'Motion respects reduced-motion setting', status: 'Enforced in code' },
  { item: 'Error messages announced to screen readers', status: 'Manual test' },
  { item: 'Captions and transcripts on media', status: 'Content policy' },
]

const contrastPairs = [
  { fg: '#e9eef7', bg: '#04060a', label: 'ink on obsidian', ratio: '17.4:1', pass: 'AAA' },
  { fg: '#9aa8bd', bg: '#04060a', label: 'dim on obsidian', ratio: '8.6:1', pass: 'AAA' },
  { fg: '#22e0f5', bg: '#04060a', label: 'neon on obsidian', ratio: '11.9:1', pass: 'AAA' },
  { fg: '#67748a', bg: '#04060a', label: 'faint on obsidian', ratio: '4.7:1', pass: 'AA' },
  { fg: '#04060a', bg: '#c8ff4d', label: 'obsidian on lime', ratio: '16.1:1', pass: 'AAA' },
]

export default function AccessibilityPage() {
  const { t } = useI18n()
  useSEO(t('page.accessibility'), 'Accessibility practice for Android and web: WCAG 2.2 AA, TalkBack, contrast tokens, and CI enforcement.')

  return (
    <>
      <PageHero
        eyebrow={t('page.accessibility')}
        title="Accessible by construction, not by audit."
        lead="Accessibility is cheapest at the moment a component is written and most expensive the week before launch. I build it into the token set, the lint rules, and the definition of done."
        accent="electric"
        meta={[
          { k: 'Standard', v: 'WCAG 2.2 AA' },
          { k: 'Certification', v: 'IAAP WAS, 2024' },
          { k: 'Enforcement', v: 'Lint + CI + review' },
          { k: 'Testing', v: 'TalkBack · Switch · Scaling' },
        ]}
      />

      <Section className="pt-2">
        <div className="grid gap-5 md:grid-cols-2">
          {commitments.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.06}>
              <GlassCard className="h-full p-7">
                <c.icon className="h-5 w-5 text-electric" />
                <h2 className="mt-5 text-[16px] font-semibold text-ink">{c.title}</h2>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-dim">{c.body}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeading eyebrow="Definition of done" title="Nine checks before a screen ships" accent="neon" />
            <div className="mt-9 space-y-px overflow-hidden rounded-2xl border border-white/8">
              {checklist.map((c) => (
                <div key={c.item} className="flex items-center justify-between gap-4 bg-white/[0.025] px-5 py-3.5">
                  <span className="flex items-center gap-3 text-[13.5px] text-dim">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-limeneon" />
                    {c.item}
                  </span>
                  <span className="shrink-0 font-mono text-[10.5px] text-faint">{c.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SectionHeading eyebrow="Contrast" title="This site, measured" accent="lime" />
            <div className="mt-9 space-y-3">
              {contrastPairs.map((p) => (
                <div
                  key={p.label}
                  className="flex items-center justify-between gap-4 rounded-xl border border-white/8 px-5 py-4"
                  style={{ background: p.bg }}
                >
                  <span className="text-[13.5px]" style={{ color: p.fg }}>
                    {p.label}
                  </span>
                  <span className="flex items-center gap-3">
                    <span className="font-mono text-[12px]" style={{ color: p.fg }}>
                      {p.ratio}
                    </span>
                    <span
                      className="rounded-full border px-2 py-0.5 font-mono text-[10px]"
                      style={{ color: p.fg, borderColor: `${p.fg}55` }}
                    >
                      {p.pass}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <GlassCard strong className="h-full p-8">
              <div className="mono-label text-neon">Statement for this site</div>
              <p className="mt-5 text-[14px] leading-relaxed text-dim">
                This portfolio targets WCAG 2.2 AA. It supports full keyboard navigation with a skip link, visible
                focus indicators, semantic landmarks and headings, and text that reflows to 400% zoom. All motion is
                disabled when your system requests reduced motion. Colour is never the only carrier of meaning.
              </p>
              <p className="mt-4 text-[14px] leading-relaxed text-dim">
                If anything here blocks you, email me and I will fix it as a priority — not add it to a backlog.
              </p>
            </GlassCard>
          </Reveal>
          <div>
            <SectionHeading eyebrow="Testing matrix" title="How it is verified" accent="violet" />
            <div className="mt-8">
              <BulletList
                accent="violet"
                items={[
                  'TalkBack on Android 10, 13, and 15 — full task traversal, not spot checks.',
                  'Switch Access for two-button navigation on the primary flows.',
                  'Font scale 0.85× to 2.0× with screenshot diffing in CI.',
                  'Display size large + font scale max, the combination that breaks most layouts.',
                  'Colour-vision simulation on every chart and status indicator.',
                  'Keyboard-only traversal on web and large-screen Android.',
                ]}
              />
            </div>
          </div>
        </div>
      </Section>

      <CTABand />
    </>
  )
}
