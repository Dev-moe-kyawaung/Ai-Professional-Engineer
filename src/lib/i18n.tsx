import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { LOCALES, translate, pick, type Locale, type LocalizedText } from './dict'

type I18nValue = {
  locale: Locale
  setLocale: (l: Locale) => void
  t: (key: string) => string
  tx: (value: LocalizedText) => string
  intl: string
  formatDate: (iso: string, opts?: Intl.DateTimeFormatOptions) => string
  formatNumber: (n: number, opts?: Intl.NumberFormatOptions) => string
}

const I18nContext = createContext<I18nValue | null>(null)

const STORAGE_KEY = 'kzh.locale'

function detect(): Locale {
  if (typeof window === 'undefined') return 'en'
  const saved = window.localStorage.getItem(STORAGE_KEY) as Locale | null
  if (saved && LOCALES.some((l) => l.code === saved)) return saved
  const nav = window.navigator.language.toLowerCase()
  if (nav.startsWith('my')) return 'my'
  if (nav.startsWith('th')) return 'th'
  return 'en'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')

  useEffect(() => {
    setLocaleState(detect())
  }, [])

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l)
    try {
      window.localStorage.setItem(STORAGE_KEY, l)
    } catch {
      /* storage blocked — non fatal */
    }
  }, [])

  const intl = useMemo(() => LOCALES.find((l) => l.code === locale)?.intl ?? 'en-US', [locale])

  useEffect(() => {
    document.documentElement.lang = locale === 'my' ? 'my' : locale === 'th' ? 'th' : 'en'
  }, [locale])

  const value = useMemo<I18nValue>(
    () => ({
      locale,
      setLocale,
      intl,
      t: (key: string) => translate(key, locale),
      tx: (value: LocalizedText) => pick(value, locale),
      formatDate: (iso: string, opts?: Intl.DateTimeFormatOptions) => {
        try {
          return new Intl.DateTimeFormat(intl, opts ?? { year: 'numeric', month: 'short', day: 'numeric' }).format(
            new Date(iso),
          )
        } catch {
          return iso
        }
      },
      formatNumber: (n: number, opts?: Intl.NumberFormatOptions) => {
        try {
          return new Intl.NumberFormat(intl, opts).format(n)
        } catch {
          return String(n)
        }
      },
    }),
    [locale, setLocale, intl],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used inside I18nProvider')
  return ctx
}

export { LOCALES }
export type { Locale }
