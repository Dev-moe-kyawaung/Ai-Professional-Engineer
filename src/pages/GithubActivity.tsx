import { useMemo } from 'react'
import { GitPullRequest, MessageSquare, Package, Star } from 'lucide-react'
import { useI18n } from '../lib/i18n'
import { useSEO } from '../lib/seo'
import { githubStats, profile } from '../lib/data'
import { GlassCard, Magnetic, PageHero, Reveal, Section, SectionHeading } from '../components/ui'
import CTABand from '../components/CTABand'

const LEVELS = ['rgba(255,255,255,0.05)', 'rgba(34,224,245,0.22)', 'rgba(34,224,245,0.42)', 'rgba(34,224,245,0.68)', '#22e0f5']

function useHeatmap() {
  return useMemo(() => {
    // deterministic pseudo-random so the grid is stable across renders
    let seed = 20260214
    const rand = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296
      return seed / 4294967296
    }
    const weeks: number[][] = []
    for (let w = 0; w < 53; w++) {
      const week: number[] = []
      for (let d = 0; d < 7; d++) {
        const weekend = d === 0 || d === 6
        const r = rand()
        let level = 0
        if (r > (weekend ? 0.72 : 0.22)) level = 1
        if (r > (weekend ? 0.86 : 0.45)) level = 2
        if (r > (weekend ? 0.94 : 0.68)) level = 3
        if (r > (weekend ? 0.985 : 0.88)) level = 4
        week.push(level)
      }
      weeks.push(week)
    }
    return weeks
  }, [])
}

const iconFor = (type: string) => {
  if (type === 'pr') return GitPullRequest
  if (type === 'release') return Package
  if (type === 'review') return MessageSquare
  return Star
}

export default function GithubActivity() {
  const { t, formatNumber } = useI18n()
  const weeks = useHeatmap()
  useSEO(t('page.github'), 'Contribution activity, review volume, language distribution, and recent open-source releases.')

  const stats = [
    { k: formatNumber(githubStats.contributionsYear), v: 'contributions this year' },
    { k: formatNumber(githubStats.prsMerged), v: 'pull requests merged' },
    { k: formatNumber(githubStats.reviews), v: 'reviews given' },
    { k: `${githubStats.currentStreak}d`, v: 'current streak' },
  ]

  return (
    <>
      <PageHero
        eyebrow={t('page.github')}
        title="Twelve years of commits, mostly boring on purpose."
        lead="Consistency beats intensity. The graph below is what shipping weekly, reviewing carefully and maintaining a handful of libraries actually looks like."
        accent="neon"
        meta={[
          { k: 'Handle', v: `@${profile.githubHandle}` },
          { k: 'Longest streak', v: `${githubStats.longestStreak} days` },
          { k: 'Issues closed', v: formatNumber(githubStats.issuesClosed) },
          { k: 'Primary language', v: 'Kotlin' },
        ]}
      />

      <Section className="pt-2">
        <Reveal>
          <GlassCard strong className="overflow-hidden p-6 md:p-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="mono-label text-neon">Contribution graph</div>
                <h2 className="display mt-2 text-2xl text-ink">Last 12 months</h2>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-faint">
                Less
                {LEVELS.map((l, i) => (
                  <span key={i} className="h-3 w-3 rounded-[3px]" style={{ background: l }} />
                ))}
                More
              </div>
            </div>

            <div className="mt-7 overflow-x-auto pb-2">
              <div className="flex min-w-max gap-[3px]">
                {weeks.map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-[3px]">
                    {week.map((lvl, di) => (
                      <span
                        key={di}
                        title={`${lvl * 3} contributions`}
                        className="h-3 w-3 rounded-[3px] transition-transform duration-200 hover:scale-125"
                        style={{
                          background: LEVELS[lvl],
                          boxShadow: lvl === 4 ? '0 0 8px rgba(34,224,245,0.6)' : undefined,
                        }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </Reveal>

        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.v} delay={i * 0.06}>
              <GlassCard className="p-5">
                <div className="display text-3xl text-gradient">{s.k}</div>
                <div className="mt-1.5 text-[12.5px] text-dim">{s.v}</div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionHeading eyebrow="Languages" title="Where the lines go" accent="violet" />
            <Reveal>
              <GlassCard className="mt-8 p-6">
                <div className="flex h-2.5 w-full overflow-hidden rounded-full">
                  {githubStats.languages.map((l) => (
                    <span key={l.name} style={{ width: `${l.pct}%`, background: l.color }} />
                  ))}
                </div>
                <ul className="mt-6 space-y-3">
                  {githubStats.languages.map((l) => (
                    <li key={l.name} className="flex items-center justify-between text-[13px]">
                      <span className="flex items-center gap-2.5 text-dim">
                        <span className="h-2 w-2 rounded-full" style={{ background: l.color }} />
                        {l.name}
                      </span>
                      <span className="font-mono text-[12px] text-ink">{l.pct}%</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>
          </div>

          <div>
            <SectionHeading eyebrow="Recent activity" title="What happened lately" accent="neon" />
            <div className="mt-8 space-y-px overflow-hidden rounded-2xl border border-white/8">
              {githubStats.recent.map((r) => {
                const Icon = iconFor(r.type)
                return (
                  <div key={r.text} className="flex items-start gap-4 bg-white/[0.025] px-6 py-4">
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-neon" />
                    <div className="min-w-0 flex-1">
                      <div className="text-[13.5px] text-ink">{r.text}</div>
                      <div className="mt-0.5 font-mono text-[11px] text-faint">{r.repo}</div>
                    </div>
                    <span className="shrink-0 text-[11.5px] text-faint">{r.when}</span>
                  </div>
                )
              })}
            </div>
            <div className="mt-6">
              <Magnetic href={`https://${profile.github}`} variant="ghost">
                @{profile.githubHandle} on GitHub
              </Magnetic>
            </div>
          </div>
        </div>
      </Section>

      <CTABand />
    </>
  )
}
