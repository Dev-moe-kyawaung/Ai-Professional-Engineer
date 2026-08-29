import { motion } from 'framer-motion'
import { useI18n } from '../lib/i18n'
import { useSEO } from '../lib/seo'
import { ACCENT, BulletList, GlassCard, PageHero, Reveal, Section, SectionHeading } from '../components/ui'
import CTABand from '../components/CTABand'

const budgets = [
  { metric: 'Cold start (p90)', budget: '≤ 1.2s', current: '1.08s', device: 'Pixel 4a', ok: true },
  { metric: 'Warm start (p90)', budget: '≤ 500ms', current: '380ms', device: 'Pixel 4a', ok: true },
  { metric: 'Frame time (p95)', budget: '≤ 8ms', current: '7.4ms', device: 'Pixel 4a', ok: true },
  { metric: 'Jank-free frames', budget: '≥ 99%', current: '99.2%', device: 'Fleet', ok: true },
  { metric: 'Crash-free sessions', budget: '≥ 99.9%', current: '99.96%', device: 'Fleet', ok: true },
  { metric: 'ANR rate', budget: '≤ 0.15%', current: '0.04%', device: 'Fleet', ok: true },
  { metric: 'APK download size', budget: '≤ 24MB', current: '21.6MB', device: 'arm64', ok: true },
  { metric: 'Memory (steady state)', budget: '≤ 180MB', current: '196MB', device: 'Go device', ok: false },
]

const beforeAfter = [
  { label: 'Cold start p90', before: 3400, after: 1080, unit: 'ms' },
  { label: 'Frame time p95', before: 42, after: 7.4, unit: 'ms' },
  { label: 'APK size', before: 34.8, after: 21.6, unit: 'MB' },
  { label: 'Battery / 30-min trip', before: 18, after: 10.6, unit: '%' },
]

const startupPhases = [
  { name: 'Process fork + class load', ms: 210, accent: 'violet' as const },
  { name: 'Application.onCreate', ms: 180, accent: 'electric' as const },
  { name: 'First activity + DI graph', ms: 240, accent: 'neon' as const },
  { name: 'First composition', ms: 290, accent: 'lime' as const },
  { name: 'First data frame', ms: 160, accent: 'neon' as const },
]

const method = [
  'Set a written budget per metric and per reference device before touching code.',
  'Capture a Perfetto trace of the real user journey, not a synthetic loop.',
  'Attribute cost to a named owner: a library, a composable, a query, an initializer.',
  'Fix the largest attributable cost only. Re-measure. Resist the urge to batch changes.',
  'Gate the win in CI with a macrobenchmark so it cannot silently regress.',
  'Publish a monthly performance report that non-engineers can read.',
]

const tooling = [
  { k: 'Macrobenchmark', v: 'Startup, scroll, and custom trace sections, run on a device farm per PR.' },
  { k: 'Baseline & startup profiles', v: 'Generated per release; typically 22–30% off cold start alone.' },
  { k: 'Perfetto', v: 'The only honest answer to “why is it slow” — with custom trace sections around suspicious work.' },
  { k: 'Compose recomposition counts', v: 'Layout inspector plus a debug overlay that flags any composable recomposing more than expected.' },
  { k: 'LeakCanary + heap dumps', v: 'Leak triage as part of the release checklist, not after a support escalation.' },
  { k: 'R8 + size analyser', v: 'Per-release size diff published in the PR comment.' },
]

export default function Performance() {
  const { t } = useI18n()
  useSEO(t('page.performance'), 'Performance engineering for Android: budgets, macrobenchmarks, baseline profiles, and CI gates.')

  const totalStartup = startupPhases.reduce((a, b) => a + b.ms, 0)

  return (
    <>
      <PageHero
        eyebrow={t('page.performance')}
        title="Speed is a contract, not a vibe."
        lead="Every product I own has a written performance budget, a reference device, and a CI gate. This is what that looks like in practice."
        accent="lime"
        meta={[
          { k: 'Reference device', v: 'Pixel 4a + 2GB Go device' },
          { k: 'Gate', v: 'Macrobenchmark on every PR' },
          { k: 'Startup p90', v: '1.08s' },
          { k: 'Jank-free', v: '99.2%' },
        ]}
      />

      <Section className="pt-2">
        <SectionHeading eyebrow="The budget" title="Eight numbers the whole team can quote" accent="lime" />
        <div className="mt-10 overflow-x-auto rounded-2xl border border-white/8">
          <table className="w-full min-w-[640px] text-left">
            <thead>
              <tr className="border-b border-white/8 bg-white/[0.03]">
                <th className="mono-label px-5 py-3.5 text-faint">Metric</th>
                <th className="mono-label px-5 py-3.5 text-faint">Budget</th>
                <th className="mono-label px-5 py-3.5 text-faint">Current</th>
                <th className="mono-label px-5 py-3.5 text-faint">Reference</th>
                <th className="mono-label px-5 py-3.5 text-right text-faint">State</th>
              </tr>
            </thead>
            <tbody>
              {budgets.map((b) => (
                <tr key={b.metric} className="border-b border-white/6 last:border-0 hover:bg-white/[0.025]">
                  <td className="px-5 py-4 text-[13.5px] text-ink">{b.metric}</td>
                  <td className="px-5 py-4 font-mono text-[12.5px] text-dim">{b.budget}</td>
                  <td className="px-5 py-4 font-mono text-[12.5px]" style={{ color: b.ok ? '#c8ff4d' : '#ff8f6b' }}>
                    {b.current}
                  </td>
                  <td className="px-5 py-4 text-[12.5px] text-faint">{b.device}</td>
                  <td className="px-5 py-4 text-right">
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-[11px] ${
                        b.ok
                          ? 'border-limeneon/30 bg-limeneon/8 text-limeneon'
                          : 'border-[#ff8f6b]/30 bg-[#ff8f6b]/8 text-[#ff8f6b]'
                      }`}
                    >
                      {b.ok ? 'within' : 'over'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-[12.5px] text-faint">
          One metric is deliberately shown over budget. A performance page with all green is a marketing page.
        </p>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Before / after" title="Measured on the same device" accent="neon" />
            <div className="mt-9 space-y-7">
              {beforeAfter.map((b, i) => {
                const pct = (b.after / b.before) * 100
                return (
                  <Reveal key={b.label} delay={i * 0.07}>
                    <div>
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="text-[13.5px] text-ink">{b.label}</span>
                        <span className="font-mono text-[12px] text-faint">
                          <span className="text-white/35 line-through">
                            {b.before}
                            {b.unit}
                          </span>{' '}
                          <span className="text-limeneon">
                            {b.after}
                            {b.unit}
                          </span>
                        </span>
                      </div>
                      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/6">
                        <div className="h-full w-full rounded-full bg-white/8">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-limeneon to-neon"
                            initial={{ width: '100%' }}
                            whileInView={{ width: `${pct}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
                          />
                        </div>
                      </div>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>

          <div>
            <SectionHeading eyebrow="Cold start" title="Where the 1,080ms goes" accent="violet" />
            <Reveal>
              <GlassCard strong className="mt-9 p-7">
                <div className="flex h-3 w-full overflow-hidden rounded-full">
                  {startupPhases.map((p) => (
                    <motion.div
                      key={p.name}
                      className="h-full"
                      style={{ background: ACCENT[p.accent].hex, opacity: 0.85 }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(p.ms / totalStartup) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                    />
                  ))}
                </div>
                <ul className="mt-6 space-y-3">
                  {startupPhases.map((p) => (
                    <li key={p.name} className="flex items-center justify-between gap-4 text-[13px]">
                      <span className="flex items-center gap-2.5 text-dim">
                        <span className="h-2 w-2 rounded-full" style={{ background: ACCENT[p.accent].hex }} />
                        {p.name}
                      </span>
                      <span className="font-mono text-[12px] text-ink">{p.ms}ms</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex items-center justify-between border-t border-white/8 pt-4 text-[13px]">
                  <span className="text-faint">Total to first data frame</span>
                  <span className="font-mono text-limeneon">{totalStartup}ms</span>
                </div>
              </GlassCard>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Method" title="Six steps, in this order" accent="neon" />
            <div className="mt-8">
              <BulletList items={method} accent="neon" />
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Tooling" title="What is actually in the toolbox" accent="electric" />
            <div className="mt-8 space-y-px overflow-hidden rounded-2xl border border-white/8">
              {tooling.map((tl) => (
                <div key={tl.k} className="bg-white/[0.025] px-6 py-4">
                  <div className="text-[13.5px] font-semibold text-ink">{tl.k}</div>
                  <div className="mt-1 text-[13px] leading-relaxed text-dim">{tl.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <CTABand />
    </>
  )
}
