import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionStyle,
} from 'framer-motion'
import { useRef, type ReactNode, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

export type Accent = 'neon' | 'electric' | 'violet' | 'lime'

export const ACCENT: Record<Accent, { hex: string; text: string; border: string; soft: string }> = {
  neon: { hex: '#22e0f5', text: 'text-neon', border: 'border-neon/40', soft: 'rgba(34,224,245,0.16)' },
  electric: { hex: '#4c86ff', text: 'text-electric', border: 'border-electric/40', soft: 'rgba(76,134,255,0.16)' },
  violet: { hex: '#9a6bff', text: 'text-violetneon', border: 'border-violetneon/40', soft: 'rgba(154,107,255,0.16)' },
  lime: { hex: '#c8ff4d', text: 'text-limeneon', border: 'border-limeneon/40', soft: 'rgba(200,255,77,0.14)' },
}

/* ------------------------------------------------------------------ reveal */

export function Reveal({
  children,
  delay = 0,
  y = 22,
  className = '',
  once = true,
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  once?: boolean
}) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y, filter: 'blur(6px)' }}
      whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

/* -------------------------------------------------------------------- tilt */

export function Tilt({
  children,
  className = '',
  intensity = 7,
  glare = true,
  style,
}: {
  children: ReactNode
  className?: string
  intensity?: number
  glare?: boolean
  style?: CSSProperties
}) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const spring = { stiffness: 160, damping: 18, mass: 0.4 }
  const rotateX = useSpring(useTransform(my, [0, 1], [intensity, -intensity]), spring)
  const rotateY = useSpring(useTransform(mx, [0, 1], [-intensity, intensity]), spring)
  const glareX = useTransform(mx, (v) => `${v * 100}%`)
  const glareY = useTransform(my, (v) => `${v * 100}%`)
  const glareBg = useMotionTemplate`radial-gradient(420px circle at ${glareX} ${glareY}, rgba(255,255,255,0.10), transparent 60%)`

  if (reduced) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    )
  }

  return (
    <div className="perspective group" style={style}>
      <motion.div
        ref={ref}
        className={`preserve-3d relative ${className}`}
        style={{ rotateX, rotateY } as MotionStyle}
        onPointerMove={(e) => {
          const el = ref.current
          if (!el) return
          const r = el.getBoundingClientRect()
          mx.set((e.clientX - r.left) / r.width)
          my.set((e.clientY - r.top) / r.height)
        }}
        onPointerLeave={() => {
          mx.set(0.5)
          my.set(0.5)
        }}
      >
        {children}
        {glare && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: glareBg }}
          />
        )}
      </motion.div>
    </div>
  )
}

/* --------------------------------------------------------------- magnetic */

type MagneticProps = {
  children: ReactNode
  to?: string
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'ghost' | 'quiet'
  className?: string
  type?: 'button' | 'submit'
  ariaLabel?: string
  block?: boolean
}

export function Magnetic({
  children,
  to,
  href,
  onClick,
  variant = 'primary',
  className = '',
  type = 'button',
  ariaLabel,
  block = false,
}: MagneticProps) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.3 })
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.3 })

  const base =
    'group/mag relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-tight transition-colors duration-300 will-change-transform'
  const styles: Record<string, string> = {
    primary:
      'text-obsidian bg-gradient-to-r from-neon via-[#63b6ff] to-violetneon shadow-[0_10px_40px_-12px_rgba(34,224,245,0.7)] hover:shadow-[0_14px_50px_-10px_rgba(154,107,255,0.75)]',
    ghost: 'text-ink glass hover:border-neon/40 hover:text-white',
    quiet: 'text-dim hover:text-neon px-0 py-1',
  }

  const inner = (
    <motion.span
      ref={ref}
      className={`${base} ${styles[variant]} ${block ? 'w-full' : ''} ${className}`}
      style={reduced ? undefined : { x: sx, y: sy }}
      onPointerMove={(e) => {
        if (reduced) return
        const el = ref.current
        if (!el) return
        const r = el.getBoundingClientRect()
        x.set(((e.clientX - r.left) / r.width - 0.5) * 14)
        y.set(((e.clientY - r.top) / r.height - 0.5) * 12)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.span>
  )

  const wrap = block ? 'block w-full' : 'inline-block'

  if (to) {
    return (
      <Link to={to} aria-label={ariaLabel} className={wrap}>
        {inner}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" aria-label={ariaLabel} className={wrap}>
        {inner}
      </a>
    )
  }
  return (
    <button type={type} onClick={onClick} aria-label={ariaLabel} className={wrap}>
      {inner}
    </button>
  )
}

/* ------------------------------------------------------------------ atoms */

export function Eyebrow({ children, accent = 'neon' }: { children: ReactNode; accent?: Accent }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-8" style={{ background: `linear-gradient(90deg, transparent, ${ACCENT[accent].hex})` }} />
      <span className="mono-label" style={{ color: ACCENT[accent].hex }}>
        {children}
      </span>
    </div>
  )
}

export function Pill({
  children,
  accent,
  className = '',
}: {
  children: ReactNode
  accent?: Accent
  className?: string
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-medium tracking-wide ${className}`}
      style={{
        borderColor: accent ? `${ACCENT[accent].hex}44` : 'rgba(255,255,255,0.12)',
        color: accent ? ACCENT[accent].hex : '#9aa8bd',
        background: accent ? ACCENT[accent].soft : 'rgba(255,255,255,0.03)',
      }}
    >
      {children}
    </span>
  )
}

export function GlassCard({
  children,
  className = '',
  strong = false,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  strong?: boolean
  as?: 'div' | 'article' | 'li' | 'section'
}) {
  const Tag = as as 'div'
  return (
    <Tag className={`${strong ? 'glass-strong' : 'glass'} edge-shine rounded-2xl ${className}`}>{children}</Tag>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  accent = 'neon',
  align = 'left',
  action,
}: {
  eyebrow?: string
  title: string
  lead?: string
  accent?: Accent
  align?: 'left' | 'center'
  action?: ReactNode
}) {
  return (
    <div
      className={`flex flex-col gap-5 ${align === 'center' ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between'}`}
    >
      <div className={align === 'center' ? 'max-w-2xl' : 'max-w-2xl'}>
        {eyebrow && <Eyebrow accent={accent}>{eyebrow}</Eyebrow>}
        <h2 className="display mt-4 text-[clamp(2rem,4.4vw,3.4rem)] text-ink">{title}</h2>
        {lead && <p className="mt-4 text-[15px] leading-relaxed text-dim md:text-base">{lead}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}

export function PageHero({
  eyebrow,
  title,
  lead,
  accent = 'neon',
  meta,
  children,
}: {
  eyebrow: string
  title: string
  lead?: string
  accent?: Accent
  meta?: { k: string; v: string }[]
  children?: ReactNode
}) {
  return (
    <header className="relative overflow-hidden pt-32 pb-14 md:pt-40 md:pb-20">
      <div
        aria-hidden
        className="absolute left-1/2 top-0 h-[340px] w-[900px] max-w-[130vw] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${ACCENT[accent].soft}, transparent 65%)` }}
      />
      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Eyebrow accent={accent}>{eyebrow}</Eyebrow>
          <h1 className="display mt-6 max-w-4xl text-[clamp(2.5rem,6.6vw,5rem)] text-ink">{title}</h1>
          {lead && <p className="mt-6 max-w-2xl text-base leading-relaxed text-dim md:text-lg">{lead}</p>}
        </motion.div>

        {meta && (
          <motion.dl
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/8 sm:grid-cols-4"
          >
            {meta.map((m) => (
              <div key={m.k} className="bg-charcoal/80 px-5 py-4 backdrop-blur">
                <dt className="mono-label text-faint">{m.k}</dt>
                <dd className="mt-1.5 text-sm text-ink">{m.v}</dd>
              </div>
            ))}
          </motion.dl>
        )}
        {children}
      </div>
    </header>
  )
}

export function Section({
  children,
  className = '',
  id,
}: {
  children: ReactNode
  className?: string
  id?: string
}) {
  return (
    <section id={id} className={`relative mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 md:py-24 ${className}`}>
      {children}
    </section>
  )
}

export function StatGrid({ stats, accent = 'neon' }: { stats: { label: string; value: string; note?: string }[]; accent?: Accent }) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((s, i) => (
        <Reveal key={s.label} delay={i * 0.06}>
          <GlassCard className="h-full p-5">
            <div className="display text-3xl md:text-4xl" style={{ color: ACCENT[accent].hex }}>
              {s.value}
            </div>
            <div className="mt-2 text-sm text-ink/90">{s.label}</div>
            {s.note && <div className="mt-1 text-xs text-faint">{s.note}</div>}
          </GlassCard>
        </Reveal>
      ))}
    </div>
  )
}

export function Meter({ value, accent = 'neon', label, suffix }: { value: number; accent?: Accent; label?: string; suffix?: string }) {
  return (
    <div>
      {label && (
        <div className="mb-1.5 flex items-baseline justify-between gap-3">
          <span className="text-sm text-ink/90">{label}</span>
          {suffix && <span className="font-mono text-[11px] text-faint">{suffix}</span>}
        </div>
      )}
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/7">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${ACCENT[accent].hex}, ${ACCENT[accent].hex}55)` }}
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  )
}

export function ArrowLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="group inline-flex items-center gap-1.5 text-sm font-medium text-neon transition-colors hover:text-white"
    >
      {children}
      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  )
}

export function CodeBlock({ title, lines }: { title: string; lines: string[] }) {
  const kw =
    /\b(fun|val|var|class|interface|object|data|sealed|suspend|return|when|if|else|is|private|internal|override|by|in|for|import|package|typealias|operator|inline|reified)\b/g
  return (
    <div className="glass overflow-hidden rounded-2xl">
      <div className="flex items-center gap-2 border-b border-white/8 px-4 py-2.5">
        <span className="h-2 w-2 rounded-full bg-[#ff5f57]/70" />
        <span className="h-2 w-2 rounded-full bg-[#febc2e]/70" />
        <span className="h-2 w-2 rounded-full bg-limeneon/70" />
        <span className="ml-2 font-mono text-[11px] text-faint">{title}</span>
      </div>
      <pre className="overflow-x-auto px-4 py-4 font-mono text-[12.5px] leading-relaxed text-[#c9d6e8]">
        <code>
          {lines.map((l, i) => (
            <div key={i} className="whitespace-pre">
              <span className="mr-4 inline-block w-5 select-none text-right text-white/20">{i + 1}</span>
              <span
                dangerouslySetInnerHTML={{
                  __html: l
                    .replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/(\/\/.*)$/g, '<span style="color:#5c6b82">$1</span>')
                    .replace(/("[^"]*")/g, '<span style="color:#c8ff4d">$1</span>')
                    .replace(kw, '<span style="color:#9a6bff">$1</span>')
                    .replace(/\b([A-Z][A-Za-z0-9]*)\b/g, '<span style="color:#22e0f5">$1</span>'),
                }}
              />
            </div>
          ))}
        </code>
      </pre>
    </div>
  )
}

export function Divider() {
  return <div className="mx-auto h-px w-full max-w-6xl bg-gradient-to-r from-transparent via-white/10 to-transparent" />
}

export function BulletList({ items, accent = 'neon' }: { items: string[]; accent?: Accent }) {
  return (
    <ul className="space-y-3">
      {items.map((it) => (
        <li key={it} className="flex gap-3 text-sm leading-relaxed text-dim">
          <span
            aria-hidden
            className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full"
            style={{ background: ACCENT[accent].hex, boxShadow: `0 0 10px ${ACCENT[accent].hex}` }}
          />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  )
}
