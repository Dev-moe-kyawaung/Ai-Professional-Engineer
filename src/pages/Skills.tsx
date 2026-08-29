import { useI18n } from '../lib/i18n'
import { useSEO } from '../lib/seo'
import { skillGroups } from '../lib/data'
import { ACCENT, BulletList, GlassCard, Meter, PageHero, Reveal, Section, SectionHeading, Tilt } from '../components/ui'
import CTABand from '../components/CTABand'

const honest = {
  strong: [
    'Android platform depth: process lifecycle, memory, background execution, OEM behaviour.',
    'Compose architecture and performance, from recomposition counts to baseline profiles.',
    'Release engineering: trunk-based flow, flags, staged rollout, automated halt.',
    'Localization and accessibility as engineering constraints, verified in CI.',
  ],
  learning: [
    'Compose Multiplatform for shared UI — currently production-testing on internal tools only.',
    'On-device ML beyond MLKit wrappers; I can integrate, not train.',
    'Advanced Rust for NDK-level work — reading fluently, writing carefully.',
  ],
  no: [
    'I do not claim senior iOS UI work. I architect shared logic and review Swift.',
    'I do not do pure people-management roles without hands-on architecture ownership.',
    'I do not ship a design I cannot make accessible; I will propose an alternative instead.',
  ],
}

export default function Skills() {
  const { t, tx } = useI18n()
  useSEO(
    t('page.skills'),
    'Kotlin, Jetpack Compose, multi-module architecture, performance engineering, release delivery, accessibility and localization.',
  )

  return (
    <>
      <PageHero
        eyebrow={t('page.skills')}
        title="Depth where it changes outcomes."
        lead="Grouped by what I am actually accountable for on a team — not an alphabetised list of every library I have ever imported."
        accent="lime"
        meta={[
          { k: 'Primary', v: 'Kotlin · Compose' },
          { k: 'Discipline', v: 'Architecture · Performance' },
          { k: 'Delivery', v: 'CI/CD · Staged rollout' },
          { k: 'Craft', v: 'A11y · i18n · Docs' },
        ]}
      />

      <Section className="pt-2">
        <div className="grid gap-6 md:grid-cols-2">
          {skillGroups.map((g, i) => (
            <Reveal key={String(g.title)} delay={i * 0.06}>
              <Tilt intensity={4} className="h-full rounded-2xl">
                <GlassCard className="h-full p-7">
                  <div className="flex items-baseline justify-between gap-4">
                    <h2 className="display text-2xl text-ink">{tx(g.title)}</h2>
                    <span className="mono-label" style={{ color: ACCENT[g.accent].hex }}>
                      {g.skills.length} areas
                    </span>
                  </div>
                  <p className="mt-1.5 text-[13px] text-faint">{tx(g.note)}</p>
                  <div className="mt-6 space-y-4">
                    {g.skills.map((s) => (
                      <Meter key={s.name} value={s.level} accent={g.accent} label={s.name} suffix={s.years} />
                    ))}
                  </div>
                </GlassCard>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <SectionHeading
          eyebrow="Honest inventory"
          title="Strong, learning, and not for me"
          lead="Seniority includes knowing the edge of your competence and saying so before a contract is signed."
          accent="neon"
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          <Reveal>
            <GlassCard className="h-full p-6">
              <div className="mono-label text-limeneon">Strong</div>
              <div className="mt-5">
                <BulletList items={honest.strong} accent="lime" />
              </div>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.08}>
            <GlassCard className="h-full p-6">
              <div className="mono-label text-neon">Actively learning</div>
              <div className="mt-5">
                <BulletList items={honest.learning} accent="neon" />
              </div>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.16}>
            <GlassCard className="h-full p-6">
              <div className="mono-label text-violetneon">Not my lane</div>
              <div className="mt-5">
                <BulletList items={honest.no} accent="violet" />
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </Section>

      <CTABand />
    </>
  )
}
