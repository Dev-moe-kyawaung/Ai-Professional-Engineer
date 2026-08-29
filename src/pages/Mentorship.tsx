import { useI18n } from '../lib/i18n'
import { useSEO } from '../lib/seo'
import { mentorshipStats, mentorshipTracks } from '../lib/data'
import { BulletList, GlassCard, Magnetic, PageHero, Reveal, Section, SectionHeading, Tilt } from '../components/ui'
import CTABand from '../components/CTABand'

const expectations = [
  'You bring a real problem from your actual codebase, every session.',
  'You write before we talk — three sentences on what you tried and why it failed.',
  'I give direct feedback. Kind, specific, and occasionally uncomfortable.',
  'We measure progress against a written goal you set in week one.',
]

export default function Mentorship() {
  const { t } = useI18n()
  useSEO(t('page.mentorship'), 'Mentorship tracks for mid-level Android engineers: architecture reasoning, performance, and career progression.')

  return (
    <>
      <PageHero
        eyebrow={`${t('page.mentorship')} · E-4Skills`}
        title="Turning capable engineers into owners."
        lead="Structured mentorship through E-4Skills, my engineering practice in Tachileik — for Android engineers who can already ship features and now need the judgement that comes with owning a system."
        accent="violet"
        meta={mentorshipStats.map((s) => ({ k: s.v, v: s.k }))}
      />

      <Section className="pt-2">
        <div className="grid gap-6 lg:grid-cols-3">
          {mentorshipTracks.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.08}>
              <Tilt intensity={5} className="h-full rounded-2xl">
                <GlassCard className="flex h-full flex-col p-7">
                  <div className="flex items-center justify-between gap-3">
                    <span className="mono-label text-violetneon">{m.length}</span>
                    <span className="rounded-full border border-white/10 bg-white/3 px-2.5 py-0.5 text-[10.5px] text-dim">
                      {m.seats}
                    </span>
                  </div>
                  <h2 className="display mt-5 text-[1.7rem] leading-tight text-ink">{m.name}</h2>
                  <p className="mt-2 text-[12.5px] text-faint">{m.format}</p>
                  <p className="mt-4 flex-1 text-[13.5px] leading-relaxed text-dim">{m.desc}</p>
                  <div className="mt-6 border-t border-white/8 pt-5">
                    <div className="mono-label mb-3 text-faint">You leave able to</div>
                    <BulletList items={m.outcomes} accent="violet" />
                  </div>
                </GlassCard>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Ground rules" title="What I expect from you" accent="neon" />
            <div className="mt-8">
              <BulletList items={expectations} accent="neon" />
            </div>
          </div>
          <Reveal delay={0.1}>
            <GlassCard strong className="h-full p-8">
              <div className="mono-label text-limeneon">Free places</div>
              <h3 className="display mt-4 text-3xl text-ink">Two seats per cohort, always free.</h3>
              <p className="mt-4 text-[14px] leading-relaxed text-dim">
                Reserved for junior and mid-level engineers based in Myanmar and the Thai border region, and for
                anyone from a background under-represented in mobile engineering. No application essay — send me a
                paragraph in Burmese, Thai or English about what you are stuck on.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Magnetic to="/contact">{t('cta.contact')}</Magnetic>
                <Magnetic to="/writing" variant="ghost">
                  {t('page.writing')}
                </Magnetic>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </Section>

      <CTABand />
    </>
  )
}
