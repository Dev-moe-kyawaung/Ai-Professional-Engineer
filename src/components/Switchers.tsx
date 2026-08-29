import { useEffect, useRef, useState } from 'react'
import { Check, ChevronDown, Coins, Globe } from 'lucide-react'
import { LOCALES, useI18n } from '../lib/i18n'
import { CURRENCIES, useCurrency } from '../lib/currency'

function useOutside(onClose: () => void) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('mousedown', handler)
    document.addEventListener('keydown', esc)
    return () => {
      document.removeEventListener('mousedown', handler)
      document.removeEventListener('keydown', esc)
    }
  }, [onClose])
  return ref
}

const trigger =
  'inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/4 px-3 py-1.5 text-[12px] font-medium text-dim transition-colors hover:border-neon/40 hover:text-ink'
const panel =
  'absolute right-0 z-50 mt-2 min-w-[168px] overflow-hidden rounded-xl border border-white/10 bg-[#080c13]/95 p-1.5 shadow-[0_30px_70px_-25px_rgba(0,0,0,0.9)] backdrop-blur-xl'
const item =
  'flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-[13px] text-dim transition-colors hover:bg-white/6 hover:text-ink'

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale, t } = useI18n()
  const [open, setOpen] = useState(false)
  const ref = useOutside(() => setOpen(false))
  const current = LOCALES.find((l) => l.code === locale)!

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        className={trigger}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('ui.language')}
        onClick={() => setOpen((o) => !o)}
      >
        <Globe className="h-3.5 w-3.5" />
        <span>{compact ? current.short : current.native}</span>
        <ChevronDown className={`h-3 w-3 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className={panel} role="listbox" aria-label={t('ui.language')}>
          {LOCALES.map((l) => (
            <button
              key={l.code}
              type="button"
              role="option"
              aria-selected={l.code === locale}
              className={item}
              onClick={() => {
                setLocale(l.code)
                setOpen(false)
              }}
            >
              <span>
                <span className="text-ink">{l.native}</span>
                <span className="ml-2 font-mono text-[10px] text-faint">{l.short}</span>
              </span>
              {l.code === locale && <Check className="h-3.5 w-3.5 text-neon" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export function CurrencySwitcher() {
  const { t } = useI18n()
  const { currency, setCurrency } = useCurrency()
  const [open, setOpen] = useState(false)
  const ref = useOutside(() => setOpen(false))

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        className={trigger}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('ui.currency')}
        onClick={() => setOpen((o) => !o)}
      >
        <Coins className="h-3.5 w-3.5" />
        <span className="font-mono">{currency}</span>
        <ChevronDown className={`h-3 w-3 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className={panel} role="listbox" aria-label={t('ui.currency')}>
          {CURRENCIES.map((c) => (
            <button
              key={c.code}
              type="button"
              role="option"
              aria-selected={c.code === currency}
              className={item}
              onClick={() => {
                setCurrency(c.code)
                setOpen(false)
              }}
            >
              <span>
                <span className="font-mono text-ink">{c.code}</span>
                <span className="ml-2 text-[11px] text-faint">{c.label}</span>
              </span>
              {c.code === currency && <Check className="h-3.5 w-3.5 text-neon" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export function CurrencyTabs() {
  const { currency, setCurrency } = useCurrency()
  return (
    <div className="inline-flex rounded-full border border-white/10 bg-white/4 p-1">
      {CURRENCIES.map((c) => (
        <button
          key={c.code}
          type="button"
          onClick={() => setCurrency(c.code)}
          aria-pressed={c.code === currency}
          className={`rounded-full px-4 py-1.5 font-mono text-[12px] transition-all duration-300 ${
            c.code === currency
              ? 'bg-gradient-to-r from-neon/90 to-electric/90 text-obsidian shadow-[0_6px_20px_-8px_rgba(34,224,245,0.8)]'
              : 'text-dim hover:text-ink'
          }`}
        >
          {c.symbol} {c.code}
        </button>
      ))}
    </div>
  )
}

export function AvailabilityBadge({ className = '' }: { className?: string }) {
  const { t } = useI18n()
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-limeneon/30 bg-limeneon/8 px-3 py-1.5 text-[11.5px] font-medium text-limeneon ${className}`}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-limeneon" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-limeneon" />
      </span>
      {t('availability.badge')}
    </span>
  )
}
