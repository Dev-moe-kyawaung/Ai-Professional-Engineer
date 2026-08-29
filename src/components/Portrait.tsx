import { motion, useReducedMotion } from 'framer-motion'
import { profile } from '../lib/data'

type Size = 'sm' | 'md' | 'lg' | 'xl'

const SIZES: Record<Size, string> = {
  sm: 'h-9 w-9',
  md: 'h-14 w-14',
  lg: 'h-24 w-24',
  xl: 'h-40 w-40 sm:h-48 sm:w-48',
}

/**
 * Avatar sourced from the owner's Gravatar profile, framed in a neon
 * conic ring with an ambient glow and an optional live availability dot.
 */
export default function Portrait({
  size = 'md',
  status = false,
  ring = true,
  className = '',
  priority = false,
}: {
  size?: Size
  status?: boolean
  ring?: boolean
  className?: string
  priority?: boolean
}) {
  const reduced = useReducedMotion()

  return (
    <span className={`relative inline-flex shrink-0 ${SIZES[size]} ${className}`}>
      {ring && (
        <motion.span
          aria-hidden
          className="absolute -inset-[3px] rounded-full opacity-70"
          style={{
            background:
              'conic-gradient(from 0deg, #22e0f5, #4c86ff, #9a6bff, #c8ff4d, #22e0f5)',
            filter: 'blur(0.5px)',
          }}
          animate={reduced ? undefined : { rotate: 360 }}
          transition={{ duration: 18, ease: 'linear', repeat: Infinity }}
        />
      )}
      <span
        aria-hidden
        className="absolute -inset-4 rounded-full bg-[radial-gradient(circle,rgba(34,224,245,0.28),transparent_68%)] blur-xl"
      />
      <img
        src={profile.avatar}
        alt={`${profile.name} — ${profile.title}`}
        width={size === 'xl' ? 192 : size === 'lg' ? 96 : size === 'md' ? 56 : 36}
        height={size === 'xl' ? 192 : size === 'lg' ? 96 : size === 'md' ? 56 : 36}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        // @ts-expect-error fetchpriority is valid HTML but not yet in React types
        fetchpriority={priority ? 'high' : undefined}
        className="relative h-full w-full rounded-full border border-white/15 object-cover shadow-[0_20px_50px_-20px_rgba(0,0,0,0.95)]"
      />
      {status && (
        <span className="absolute bottom-0.5 right-0.5 z-10 grid h-4 w-4 place-items-center rounded-full border-2 border-obsidian bg-obsidian">
          <span className="h-2 w-2 animate-pulse-dot rounded-full bg-limeneon shadow-[0_0_10px_#c8ff4d]" />
        </span>
      )}
    </span>
  )
}
