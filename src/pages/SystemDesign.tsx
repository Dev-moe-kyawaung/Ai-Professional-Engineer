import { useI18n } from '../lib/i18n'
import { useSEO } from '../lib/seo'
import { ACCENT, BulletList, CodeBlock, GlassCard, PageHero, Reveal, Section, SectionHeading } from '../components/ui'
import CTABand from '../components/CTABand'

const nodes = [
  { id: 'ui', label: 'Compose UI', sub: 'State rendering only', accent: 'violet' as const },
  { id: 'sh', label: 'State holder', sub: 'Intents → reducers → state', accent: 'violet' as const },
  { id: 'uc', label: 'Use cases', sub: 'Pure Kotlin business rules', accent: 'neon' as const },
  { id: 'repo', label: 'Repository', sub: 'Single source of truth', accent: 'electric' as const },
  { id: 'db', label: 'Room / SQLDelight', sub: 'Local truth + outbox', accent: 'electric' as const },
  { id: 'sync', label: 'Sync engine', sub: 'Idempotent, resumable', accent: 'lime' as const },
  { id: 'api', label: 'Remote API', sub: 'gRPC / REST', accent: 'lime' as const },
]

const flows = [
  {
    title: 'Write path',
    steps: [
      'User intent hits the state holder and is validated locally.',
      'A domain command writes an immutable record plus an outbox entry in one transaction.',
      'UI re-renders instantly from the local database — no network in the critical path.',
      'WorkManager drains the outbox with exponential backoff and an idempotency key.',
      'Server acknowledgement flips the record from pending to settled; conflicts surface as a review task.',
    ],
  },
  {
    title: 'Read path',
    steps: [
      'Screens observe a database-backed Flow; the network is never a UI dependency.',
      'A freshness policy per entity decides when to revalidate (TTL, on-focus, or push-triggered).',
      'Remote responses are normalised and upserted; observers update automatically.',
      'Failures degrade to cached data with an explicit staleness indicator.',
    ],
  },
]

const failureModes = [
  { k: 'Network partition', v: 'Reads serve cached truth with staleness UI; writes queue in the outbox and replay in order.' },
  { k: 'Process death mid-write', v: 'Transactions are atomic and the outbox is durable — restart resumes exactly where it stopped.' },
  { k: 'Clock skew', v: 'Server timestamps are authoritative for ordering; device time is only used for display.' },
  { k: 'Duplicate submission', v: 'Every command carries a client-generated idempotency key held for 24 hours server-side.' },
  { k: 'Schema migration', v: 'Room migrations are tested against real captured databases in CI, both directions.' },
  { k: 'Token expiry', v: 'A single-flight refresh mutex prevents the thundering herd that used to log users out.' },
]

const outboxCode = [
  '@Transaction',
  'suspend fun submitTransfer(request: TransferRequest): TransferId {',
  '    val id = TransferId(uuid())',
  '    ledgerDao.insert(',
  '        LedgerEntity(id = id, amount = request.amount, status = PENDING)',
  '    )',
  '    outboxDao.enqueue(',
  '        OutboxEntity(',
  '            id = id,',
  '            idempotencyKey = id.value,   // survives retries and process death',
  '            payload = json.encodeToString(request),',
  '            attempt = 0,',
  '        )',
  '    )',
  '    syncScheduler.requestDrain()',
  '    return id',
  '}',
]

export default function SystemDesign() {
  const { t } = useI18n()
  useSEO(t('page.systemDesign'), 'Offline-first mobile system design: outbox pattern, sync engine, failure modes, and scaling posture.')

  return (
    <>
      <PageHero
        eyebrow={t('page.systemDesign')}
        title="Designing mobile systems that assume the network will fail."
        lead="The reference architecture I bring to offline-capable products — local truth, an outbox, an idempotent sync engine, and explicit behaviour for every failure mode."
        accent="electric"
        meta={[
          { k: 'Pattern', v: 'Offline-first + outbox' },
          { k: 'Truth', v: 'Local database' },
          { k: 'Sync', v: 'Idempotent, resumable' },
          { k: 'Conflicts', v: 'Explicit, never silent' },
        ]}
      />

      <Section className="pt-2">
        <SectionHeading eyebrow="Reference topology" title="Seven components, one direction of travel" accent="electric" />
        <div className="mt-12 grid gap-4 lg:grid-cols-7">
          {nodes.map((n, i) => (
            <Reveal key={n.id} delay={i * 0.05}>
              <div className="relative h-full">
                <GlassCard className="h-full p-5">
                  <span
                    className="mono-label"
                    style={{ color: ACCENT[n.accent].hex }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="mt-3 text-[13.5px] font-semibold leading-tight text-ink">{n.label}</div>
                  <div className="mt-1.5 text-[11.5px] leading-snug text-faint">{n.sub}</div>
                </GlassCard>
                {i < nodes.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute -right-3 top-1/2 hidden h-px w-4 -translate-y-1/2 lg:block"
                    style={{ background: `linear-gradient(90deg, ${ACCENT[n.accent].hex}, transparent)` }}
                  />
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-6 lg:grid-cols-2">
          {flows.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <GlassCard strong className="h-full p-7">
                <h2 className="display text-2xl text-ink">{f.title}</h2>
                <ol className="mt-6 space-y-4">
                  {f.steps.map((s, si) => (
                    <li key={s} className="flex gap-4">
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-white/12 bg-white/5 font-mono text-[10.5px] text-neon">
                        {si + 1}
                      </span>
                      <span className="text-[13.5px] leading-relaxed text-dim">{s}</span>
                    </li>
                  ))}
                </ol>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <SectionHeading eyebrow="Implementation" title="The outbox, in one transaction" accent="neon" />
            <div className="mt-8">
              <CodeBlock title="TransferRepository.kt" lines={outboxCode} />
            </div>
            <p className="mt-5 text-[13.5px] leading-relaxed text-dim">
              The record and its outbox entry are written atomically. If the process dies between them, neither
              exists — which is the only acceptable outcome when the value is money.
            </p>
          </div>
          <div>
            <SectionHeading eyebrow="Resilience" title="Failure modes, named in advance" accent="lime" />
            <div className="mt-8 space-y-px overflow-hidden rounded-2xl border border-white/8">
              {failureModes.map((f) => (
                <div key={f.k} className="bg-white/[0.025] px-6 py-4">
                  <div className="text-[13.5px] font-semibold text-ink">{f.k}</div>
                  <div className="mt-1 text-[13px] leading-relaxed text-dim">{f.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-6 lg:grid-cols-3">
          <Reveal>
            <GlassCard className="h-full p-6">
              <div className="mono-label text-neon">Trade-offs accepted</div>
              <div className="mt-5">
                <BulletList
                  accent="neon"
                  items={[
                    'More local storage and migration surface than a network-first app.',
                    'Conflict resolution becomes a product conversation, not just a technical one.',
                    'Initial build cost is higher; the payoff arrives at month three.',
                  ]}
                />
              </div>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.08}>
            <GlassCard className="h-full p-6">
              <div className="mono-label text-electric">Scaling posture</div>
              <div className="mt-5">
                <BulletList
                  accent="electric"
                  items={[
                    'Pagination keys stored locally so deep lists survive restarts.',
                    'Delta sync with server cursors instead of full refresh.',
                    'Per-entity freshness policies keep battery and data costs predictable.',
                  ]}
                />
              </div>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.16}>
            <GlassCard className="h-full p-6">
              <div className="mono-label text-limeneon">Observability</div>
              <div className="mt-5">
                <BulletList
                  accent="lime"
                  items={[
                    'Outbox depth and age exported as a client metric.',
                    'Sync failures grouped by reason, alerting on rate not count.',
                    'A debug drawer that shows the queue on any build, including release-signed QA builds.',
                  ]}
                />
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </Section>

      <CTABand />
    </>
  )
}
