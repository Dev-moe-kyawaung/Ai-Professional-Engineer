import { useI18n } from '../lib/i18n'
import { useSEO } from '../lib/seo'
import { ACCENT, CodeBlock, GlassCard, PageHero, Reveal, Section, SectionHeading } from '../components/ui'
import CTABand from '../components/CTABand'

const layers = [
  { name: ':app', role: 'Composition root. Navigation graph assembly, DI wiring, nothing else.', accent: 'lime' as const, deps: 'depends on everything' },
  { name: ':feature:*', role: 'One product surface each. Screens, state holders, feature-scoped navigation.', accent: 'violet' as const, deps: 'may depend on :core only' },
  { name: ':core:domain', role: 'Use cases and entities. Pure Kotlin, zero Android imports.', accent: 'neon' as const, deps: 'depends on nothing' },
  { name: ':core:data', role: 'Repositories, database, network, sync. Owns the source of truth.', accent: 'electric' as const, deps: 'depends on :core:domain' },
  { name: ':core:designsystem', role: 'Tokens, components, motion. The only place a colour literal may exist.', accent: 'violet' as const, deps: 'depends on nothing' },
  { name: ':core:testing', role: 'Fakes, fixtures, rules, screenshot harness.', accent: 'neon' as const, deps: 'test-only' },
]

const mviCode = [
  'class TransferViewModel @Inject constructor(',
  '    private val submitTransfer: SubmitTransferUseCase,',
  ') : ViewModel() {',
  '',
  '    private val _state = MutableStateFlow(TransferState.Idle)',
  '    val state: StateFlow<TransferState> = _state.asStateFlow()',
  '',
  '    fun onIntent(intent: TransferIntent) {',
  '        when (intent) {',
  '            is TransferIntent.AmountChanged -> _state.update { it.withAmount(intent.value) }',
  '            is TransferIntent.Submit -> submit()',
  '        }',
  '    }',
  '',
  '    private fun submit() = viewModelScope.launch {',
  '        _state.update { it.submitting() }',
  '        // Result, not exceptions: failure is a modelled domain state.',
  '        _state.update { current -> submitTransfer(current.request).fold(current::settled, current::failed) }',
  '    }',
  '}',
]

const adrs = [
  { id: 'ADR-014', title: 'Room as the source of truth, not a cache', status: 'Accepted', date: '2024-03-11' },
  { id: 'ADR-018', title: 'One feature module per product surface', status: 'Accepted', date: '2024-04-02' },
  { id: 'ADR-021', title: 'MVI with an immutable state class per screen', status: 'Accepted', date: '2024-05-19' },
  { id: 'ADR-027', title: 'Navigation owned by :app, routes declared by features', status: 'Accepted', date: '2024-08-04' },
  { id: 'ADR-031', title: 'Reject KSP-heavy serialization in favour of manual mappers on hot paths', status: 'Superseded', date: '2024-11-27' },
  { id: 'ADR-036', title: 'Baseline profiles generated per release, gated in CI', status: 'Accepted', date: '2025-02-13' },
]

const rules = [
  'A feature module may never depend on another feature module. Shared behaviour moves down to :core.',
  'Domain code has no Android imports. If it needs a Context, the abstraction is wrong.',
  'State is immutable and exhaustive. Every screen state renders without a null check.',
  'Errors are values. Exceptions are for programmer mistakes, not for expired sessions.',
  'A composable receives state and emits intents. It never touches a repository.',
  'Every module declares an owner. Unowned code is deleted, not inherited.',
]

export default function Architecture() {
  const { t } = useI18n()
  useSEO(t('page.architecture'), 'Multi-module Android architecture: layering, MVI state, module rules, and architecture decision records.')

  return (
    <>
      <PageHero
        eyebrow={t('page.architecture')}
        title="Boundaries that survive a reorg."
        lead="How I structure Android codebases so that a feature team can move fast without quietly coupling itself to three other teams."
        accent="violet"
        meta={[
          { k: 'Modules', v: '42 in current platform' },
          { k: 'Pattern', v: 'MVI + clean layering' },
          { k: 'DI', v: 'Hilt, compile-time validated' },
          { k: 'Docs', v: '36 ADRs and counting' },
        ]}
      />

      <Section className="pt-2">
        <SectionHeading eyebrow="Module graph" title="Six kinds of module, one direction of dependency" accent="violet" />
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {layers.map((l, i) => (
            <Reveal key={l.name} delay={i * 0.06}>
              <GlassCard className="h-full p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-mono text-[13.5px]" style={{ color: ACCENT[l.accent].hex }}>
                    {l.name}
                  </span>
                  <span className="font-mono text-[10px] text-faint">{l.deps}</span>
                </div>
                <p className="mt-3 text-[13.5px] leading-relaxed text-dim">{l.role}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="State" title="Unidirectional, exhaustive, testable" accent="neon" />
            <div className="mt-8">
              <CodeBlock title="TransferViewModel.kt" lines={mviCode} />
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="House rules" title="Six lines in every CONTRIBUTING.md I write" accent="lime" />
            <ol className="mt-8 space-y-3">
              {rules.map((r, i) => (
                <Reveal key={r} delay={i * 0.05}>
                  <li className="glass flex gap-4 rounded-xl p-5">
                    <span className="font-mono text-[11px] text-limeneon">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-[13.5px] leading-relaxed text-dim">{r}</span>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <SectionHeading
          eyebrow="Decision records"
          title="Architecture you can audit"
          lead="Every irreversible decision is written down with its context and trade-off. New engineers read the ADR log before they read the code."
          accent="electric"
        />
        <div className="mt-10 overflow-hidden rounded-2xl border border-white/8">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/8 bg-white/[0.03]">
                <th className="mono-label px-5 py-3.5 text-faint">ID</th>
                <th className="mono-label px-5 py-3.5 text-faint">Decision</th>
                <th className="mono-label px-5 py-3.5 text-faint">Status</th>
                <th className="mono-label px-5 py-3.5 text-right text-faint">Date</th>
              </tr>
            </thead>
            <tbody>
              {adrs.map((a) => (
                <tr key={a.id} className="border-b border-white/6 last:border-0 hover:bg-white/[0.025]">
                  <td className="px-5 py-4 font-mono text-[12px] text-neon">{a.id}</td>
                  <td className="px-5 py-4 text-[13.5px] text-ink">{a.title}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-[11px] ${
                        a.status === 'Accepted'
                          ? 'border-limeneon/30 bg-limeneon/8 text-limeneon'
                          : 'border-white/12 bg-white/4 text-faint'
                      }`}
                    >
                      {a.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right font-mono text-[11.5px] text-faint">{a.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <CTABand />
    </>
  )
}
