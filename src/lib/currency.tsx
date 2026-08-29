import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { useI18n } from './i18n'

export type CurrencyCode = 'USD' | 'THB' | 'MMK'

export const CURRENCIES: {
  code: CurrencyCode
  symbol: string
  label: string
  /** units per 1 USD */
  rate: number
  /** rounding granularity in local units */
  round: number
  maxFractionDigits: number
}[] = [
  { code: 'USD', symbol: '$', label: 'US Dollar', rate: 1, round: 50, maxFractionDigits: 0 },
  { code: 'THB', symbol: '฿', label: 'Thai Baht', rate: 36, round: 1000, maxFractionDigits: 0 },
  { code: 'MMK', symbol: 'K', label: 'Myanmar Kyat', rate: 4600, round: 100000, maxFractionDigits: 0 },
]

type CurrencyValue = {
  currency: CurrencyCode
  setCurrency: (c: CurrencyCode) => void
  /** convert + format a USD base amount */
  price: (usd: number) => string
  /** convert + format without rounding buckets */
  exact: (usd: number) => string
  meta: (typeof CURRENCIES)[number]
}

const CurrencyContext = createContext<CurrencyValue | null>(null)
const STORAGE_KEY = 'kzh.currency'

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const { intl, locale } = useI18n()
  const [currency, setCurrencyState] = useState<CurrencyCode>('USD')

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY) as CurrencyCode | null
    if (saved && CURRENCIES.some((c) => c.code === saved)) {
      setCurrencyState(saved)
      return
    }
    if (locale === 'my') setCurrencyState('MMK')
    else if (locale === 'th') setCurrencyState('THB')
  }, [locale])

  const setCurrency = useCallback((c: CurrencyCode) => {
    setCurrencyState(c)
    try {
      window.localStorage.setItem(STORAGE_KEY, c)
    } catch {
      /* ignore */
    }
  }, [])

  const value = useMemo<CurrencyValue>(() => {
    const meta = CURRENCIES.find((c) => c.code === currency)!
    const format = (amount: number) => {
      try {
        return new Intl.NumberFormat(intl, {
          style: 'currency',
          currency: meta.code,
          maximumFractionDigits: meta.maxFractionDigits,
          minimumFractionDigits: 0,
          currencyDisplay: 'narrowSymbol',
        }).format(amount)
      } catch {
        return `${meta.symbol}${amount.toLocaleString('en-US')}`
      }
    }
    return {
      currency,
      setCurrency,
      meta,
      price: (usd: number) => {
        const raw = usd * meta.rate
        const rounded = Math.round(raw / meta.round) * meta.round
        return format(rounded || raw)
      },
      exact: (usd: number) => format(usd * meta.rate),
    }
  }, [currency, intl, setCurrency])

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
}

export function useCurrency(): CurrencyValue {
  const ctx = useContext(CurrencyContext)
  if (!ctx) throw new Error('useCurrency must be used inside CurrencyProvider')
  return ctx
}
