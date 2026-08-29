import { useState } from 'react'
import { motion } from 'framer-motion'
import { useI18n } from '../lib/i18n'
import { useSEO } from '../lib/seo'
import { stackLayers } from '../lib/data'
import { ACCENT, CodeBlock, GlassCard, PageHero, Reveal, Section, SectionHeading } from '../components/ui'
import CTABand from '../components/CTABand'

const gradleSnippet = [
  '// build-logic/convention/AndroidFeatureConventionPlugin.kt',
  'class AndroidFeatureConventionPlugin : Plugin<Project> {',
  '    override fun apply(target: Project) = with(target) {',
  '        pluginManager.apply("kzh.android.library")',
  '        pluginManager.apply("kzh.android.compose")',
  '        pluginManager.apply("kzh.hilt")',
  '',
  '        dependencies {',
  '            add("implementation", project(":core:designsystem"))',
  '            add("implementation", project(":core:domain"))',
  '            add("testImplementation", project(":core:testing"))',
  '        }',
  '        // A feature module may never depend on another feature module.',
  '        enforceModuleBoundaries(allowed = setOf(":core", ":shared"))',
  '    }',
  '}',
]

export default function TechStack() {
  const { t, tx } = useI18n()
  const [active, setActive] = useState(0)
  useSEO(t('page.stack'), 'The layered Android stack I build with, and the reasoning behind every choice.')

  return (
    <>
      <PageHero
        eyebrow={t('page.stack')}
        title="A stack chosen for the ten-year version of the app."
        lead="Every dependency is a liability someone will maintain. This is the set I defend in a design review, layer by layer, with the reason attached."
        accent="electric"
        meta={[
          { k: 'Layers', v: '5' },
          { k: 'Direct deps', v: '31 typical' },
          { k: 'Language', v: '100% Kotlin' },
          { k: 'Build', v: 'Convention plugins' },
        ]}
      />

      <Section className="pt-2">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          {/* layered visual */}
          <div className="perspective">
            <div className="space-y-3">
              {stackLayers.map((l, i) => {
                const isActive = i === active
                return (
                  <motion.button
                    key={String(l.name)}
                    type="button"
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    aria-pressed={isActive}
                    className="block w-full text-left"
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    animate={{
                      x: isActive ? 14 : 0,
                      rotateY: isActive ? -4 : 0,
                    }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div
                      className={`relative overflow-hidden rounded-2xl border px-6 py-5 backdrop-blur-xl transition-colors duration-500 ${
                        isActive ? 'bg-white/8' : 'bg-white/3'
                      }`}
                      style={{
                        borderColor: isActive ? `${ACCENT[l.accent].hex}66` : 'rgba(255,255,255,0.08)',
                        boxShadow: isActive ? `0 24px 60px -30px ${ACCENT[l.accent].hex}` : undefined,
                      }}
                    >
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-y-0 left-0 w-1"
                        style={{ background: ACCENT[l.accent].hex, opacity: isActive ? 1 : 0.35 }}
                      />
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="text-[15.5px] font-semibold text-ink">{tx(l.name)}</span>
                        <span className="font-mono text-[10.5px] text-faint">L{stackLayers.length - i}</span>
                      </div>
                      <p className="mt-1 text-[12.5px] text-dim">{tx(l.role)}</p>
                    </div>
                  </motion.button>
                )
              })}
            </div>
            <p className="mt-5 text-[12.5px] text-faint">
              Dependencies point downward only. A layer never reaches up, and a feature never reaches sideways.
            </p>
          </div>

          {/* detail */}
          <div>
            <motion.div key={active} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
              <GlassCard strong className="p-7">
                <div className="mono-label" style={{ color: ACCENT[stackLayers[active].accent].hex }}>
                  {tx(stackLayers[active].name)}
                </div>
                <h2 className="display mt-3 text-3xl text-ink">{tx(stackLayers[active].role)}</h2>
                <div className="mt-7 space-y-px overflow-hidden rounded-xl border border-white/8">
                  {stackLayers[active].items.map((item) => (
                    <div key={item.name} className="bg-white/[0.025] px-5 py-4">
                      <div className="font-mono text-[13px] text-ink">{item.name}</div>
                      <div className="mt-1 text-[13px] text-dim">{item.why}</div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <SectionHeading
          eyebrow="Build logic"
          title="Boundaries enforced by the build, not by hope"
          lead="Convention plugins keep 40+ modules consistent and make architectural rules a compile-time concern."
          accent="neon"
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <CodeBlock title="AndroidFeatureConventionPlugin.kt" lines={gradleSnippet} />
          </Reveal>
          <Reveal delay={0.08}>
            <div className="grid gap-4">
              {[
                { k: 'Remote build cache', v: 'Cold CI build 3m10s, warm 48s across 42 modules.' },
                { k: 'Version catalogue', v: 'One source of truth for every dependency and its rationale comment.' },
                { k: 'Dependency lint', v: 'CI fails when a feature module imports another feature module.' },
                { k: 'Owner metadata', v: 'Each module declares an owning team; the graph is published on every merge.' },
              ].map((r) => (
                <GlassCard key={r.k} className="p-5">
                  <div className="text-[14px] font-semibold text-ink">{r.k}</div>
                  <div className="mt-1.5 text-[13px] text-dim">{r.v}</div>
                </GlassCard>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      <CTABand />
    </>
  )
}
