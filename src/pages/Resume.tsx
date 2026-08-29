import { Award, Download, GraduationCap, Printer } from 'lucide-react'
import { useI18n } from '../lib/i18n'
import { useSEO } from '../lib/seo'
import { certifications, education, experience, profile, skillGroups } from '../lib/data'
import { ACCENT, GlassCard, Magnetic, Meter, PageHero, Reveal, Section, SectionHeading } from '../components/ui'
import CTABand from '../components/CTABand'

const SUMMARY =
  'Senior Mobile/Android engineer with 12 years shipping production Android at scale. I own architecture, performance and release engineering for products in cross-border fintech, mobility, healthcare and logistics — and I hand systems over documented, tested and owned by the team that inherits them. Based in Tachileik, Myanmar; working remote-first across Myanmar, Thailand and Europe.'

function buildPlainTextCv() {
  const lines: string[] = []
  lines.push(`${profile.nameUpper} — ${profile.title}`)
  lines.push(`${profile.location} · ${profile.email} · ${profile.phone}`)
  lines.push(`${profile.github} · ${profile.linkedin} · ${profile.gravatar}`)
  lines.push('')
  lines.push('SUMMARY')
  lines.push(SUMMARY)
  lines.push('')
  lines.push('EXPERIENCE')
  experience.forEach((r) => {
    lines.push(`${r.title} — ${r.company} (${r.period}, ${r.location})`)
    r.points.forEach((p) => lines.push(`  • ${p}`))
    lines.push(`  Stack: ${r.stack.join(', ')}`)
    lines.push('')
  })
  lines.push('CERTIFICATIONS')
  certifications.forEach((c) => lines.push(`  • ${c.name} — ${c.issuer}, ${c.year} (${c.id})`))
  lines.push('')
  lines.push('EDUCATION')
  education.forEach((e) => lines.push(`  • ${e.name} — ${e.issuer}, ${e.year}`))
  lines.push('')
  lines.push('LANGUAGES')
  lines.push('  Burmese (native) · English (fluent) · Thai (conversational)')
  return lines.join('\n')
}

export default function Resume() {
  const { t, tx } = useI18n()
  useSEO(t('page.resume'), SUMMARY)

  const download = () => {
    const blob = new Blob([buildPlainTextCv()], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'moe-kyaw-aung-cv.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="print-plain">
      <PageHero
        eyebrow={t('page.resume')}
        title="Twelve years of production Android, condensed."
        lead={SUMMARY}
        accent="neon"
        meta={[
          { k: 'Name', v: profile.nameUpper },
          { k: 'Email', v: profile.email },
          { k: 'Base', v: profile.location },
          { k: 'Status', v: t('availability.short') },
        ]}
      >
        <div className="no-print mt-9 flex flex-wrap gap-3">
          <Magnetic onClick={download}>
            <Download className="h-4 w-4" /> {t('cta.downloadCv')}
          </Magnetic>
          <Magnetic onClick={() => window.print()} variant="ghost">
            <Printer className="h-4 w-4" /> {t('cta.printCv')}
          </Magnetic>
        </div>
      </PageHero>

      <Section className="pt-2">
        <SectionHeading eyebrow="Experience" title="Timeline" accent="electric" />
        <div className="relative mt-12">
          <div
            aria-hidden
            className="absolute left-[7px] top-2 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-neon/60 via-violetneon/40 to-transparent md:block"
          />
          <div className="space-y-6">
            {experience.map((r, i) => (
              <Reveal key={r.company} delay={i * 0.06}>
                <div className="relative md:pl-10">
                  <span
                    aria-hidden
                    className="absolute left-0 top-6 hidden h-3.5 w-3.5 rounded-full border-2 border-obsidian bg-neon shadow-[0_0_14px_#22e0f5] md:block"
                  />
                  <GlassCard className="p-6 md:p-7">
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-semibold text-ink">{r.title}</h3>
                        <p className="mt-0.5 text-[13.5px] text-neon">{r.company}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-mono text-[12px] text-dim">{r.period}</div>
                        <div className="text-[11.5px] text-faint">{r.location}</div>
                      </div>
                    </div>
                    <p className="mt-4 text-[14px] text-dim">{tx(r.summary)}</p>
                    <ul className="mt-4 space-y-2">
                      {r.points.map((p) => (
                        <li key={p} className="flex gap-3 text-[13.5px] leading-relaxed text-dim">
                          <span aria-hidden className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-neon" />
                          {p}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {r.stack.map((s) => (
                        <span
                          key={s}
                          className="rounded-md border border-white/8 bg-white/3 px-2 py-0.5 font-mono text-[10px] text-faint"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </GlassCard>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <SectionHeading eyebrow="Key skills" title="Where the depth is" accent="lime" />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g, i) => (
            <Reveal key={String(g.title)} delay={i * 0.05}>
              <GlassCard className="h-full p-6">
                <h3 className="text-[15px] font-semibold text-ink">{tx(g.title)}</h3>
                <div className="mt-5 space-y-3.5">
                  {g.skills.slice(0, 4).map((s) => (
                    <Meter key={s.name} value={s.level} accent={g.accent} label={s.name} suffix={s.years} />
                  ))}
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Certifications" title="Verified credentials" accent="violet" />
            <div className="mt-8 space-y-3">
              {certifications.map((c, i) => (
                <Reveal key={c.id} delay={i * 0.05}>
                  <GlassCard className="flex items-center gap-4 p-5">
                    <Award className="h-5 w-5 shrink-0" style={{ color: ACCENT.violet.hex }} />
                    <div className="min-w-0 flex-1">
                      <div className="text-[14px] font-medium text-ink">{c.name}</div>
                      <div className="text-[12px] text-faint">
                        {c.issuer} · {c.year}
                      </div>
                    </div>
                    <span className="font-mono text-[10.5px] text-faint">{c.id}</span>
                  </GlassCard>
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <SectionHeading eyebrow="Education" title="Foundations" accent="neon" />
            <div className="mt-8 space-y-3">
              {education.map((e, i) => (
                <Reveal key={e.name} delay={i * 0.05}>
                  <GlassCard className="flex items-center gap-4 p-5">
                    <GraduationCap className="h-5 w-5 shrink-0 text-neon" />
                    <div className="min-w-0 flex-1">
                      <div className="text-[14px] font-medium text-ink">{e.name}</div>
                      <div className="text-[12px] text-faint">{e.issuer}</div>
                    </div>
                    <span className="font-mono text-[11px] text-faint">{e.year}</span>
                  </GlassCard>
                </Reveal>
              ))}
            </div>
            <GlassCard className="mt-8 p-6">
              <div className="mono-label text-faint">References</div>
              <p className="mt-3 text-[13.5px] leading-relaxed text-dim">
                Available on request — including engineering managers from the payments and mobility engagements,
                and two engineers I mentored from mid-level to senior.
              </p>
            </GlassCard>
          </div>
        </div>
      </Section>

      <div className="no-print">
        <CTABand />
      </div>
    </div>
  )
}
