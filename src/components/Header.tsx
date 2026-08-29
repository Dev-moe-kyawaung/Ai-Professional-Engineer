import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react'
import { navGroups } from '../lib/nav'
import { useI18n } from '../lib/i18n'
import { AvailabilityBadge, CurrencySwitcher, LanguageSwitcher } from './Switchers'
import Portrait from './Portrait'

export default function Header() {
  const { t } = useI18n()
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [openGroup, setOpenGroup] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setOpenGroup(null)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  useEffect(() => {
    const esc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenGroup(null)
        setMobileOpen(false)
      }
    }
    document.addEventListener('keydown', esc)
    return () => document.removeEventListener('keydown', esc)
  }, [])

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-neon focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-obsidian"
      >
        {t('ui.skipToContent')}
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? 'border-b border-white/8 bg-[#05080d]/78 backdrop-blur-2xl' : 'border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 md:h-[74px]">
          <Link to="/" className="flex items-center gap-3" aria-label={t('brand.name')}>
            <Portrait size="sm" status priority />
            <span className="hidden leading-tight sm:block">
              <span className="block text-[13.5px] font-semibold tracking-tight text-ink">
                MOE KYAW AUNG
              </span>
              <span className="block font-mono text-[9.5px] uppercase tracking-[0.18em] text-faint">
                {t('brand.role')}
              </span>
            </span>
          </Link>

          {/* desktop nav */}
          <nav
            className="hidden items-center gap-0.5 lg:flex"
            onMouseLeave={() => setOpenGroup(null)}
            aria-label="Primary"
          >
            {navGroups.map((g) => {
              const active = g.items.some((i) => pathname === i.to || pathname.startsWith(i.to + '/'))
              return (
                <div key={g.key} className="relative" onMouseEnter={() => setOpenGroup(g.key)}>
                  <button
                    type="button"
                    aria-expanded={openGroup === g.key}
                    aria-haspopup="true"
                    onClick={() => setOpenGroup(openGroup === g.key ? null : g.key)}
                    className={`flex items-center gap-1 rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors ${
                      active ? 'text-ink' : 'text-dim hover:text-ink'
                    }`}
                  >
                    {t(g.key)}
                    <ChevronDown
                      className={`h-3 w-3 transition-transform duration-300 ${openGroup === g.key ? 'rotate-180' : ''}`}
                    />
                    {active && (
                      <span className="absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-neon to-transparent" />
                    )}
                  </button>

                  <AnimatePresence>
                    {openGroup === g.key && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute left-1/2 top-full w-60 -translate-x-1/2 pt-3"
                      >
                        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#080c13]/95 p-2 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.95)] backdrop-blur-2xl">
                          {g.items.map((i) => (
                            <NavLink
                              key={i.to}
                              to={i.to}
                              className={({ isActive }) =>
                                `flex items-center justify-between rounded-xl px-3 py-2.5 text-[13px] transition-colors ${
                                  isActive ? 'bg-white/7 text-neon' : 'text-dim hover:bg-white/5 hover:text-ink'
                                }`
                              }
                            >
                              {t(i.key)}
                              <ArrowUpRight className="h-3.5 w-3.5 opacity-40" />
                            </NavLink>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            <AvailabilityBadge className="hidden xl:inline-flex" />
            <div className="hidden md:block">
              <LanguageSwitcher compact />
            </div>
            <div className="hidden md:block">
              <CurrencySwitcher />
            </div>
            <Link
              to="/contact"
              className="hidden rounded-full bg-gradient-to-r from-neon to-violetneon px-4 py-2 text-[13px] font-semibold text-obsidian shadow-[0_8px_30px_-10px_rgba(34,224,245,0.8)] transition-transform duration-300 hover:scale-[1.03] sm:inline-flex"
            >
              {t('cta.startProject')}
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/4 text-ink lg:hidden"
              aria-label={t('ui.menu')}
            >
              <Menu className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>
      </header>

      {/* mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] overflow-y-auto bg-[#04060a]/97 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex min-h-full flex-col px-5 pb-12 pt-5 sm:px-8">
              <div className="flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3">
                  <Portrait size="sm" status />
                  <span className="text-[13.5px] font-semibold text-ink">MOE KYAW AUNG</span>
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/4 text-ink"
                  aria-label={t('ui.close')}
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-2">
                <LanguageSwitcher />
                <CurrencySwitcher />
              </div>
              <AvailabilityBadge className="mt-3 self-start" />

              <nav className="mt-8 grid gap-8 sm:grid-cols-2" aria-label="Mobile">
                {navGroups.map((g, gi) => (
                  <motion.div
                    key={g.key}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + gi * 0.06, duration: 0.4 }}
                  >
                    <div className="mono-label mb-3 text-neon">{t(g.key)}</div>
                    <ul className="space-y-1">
                      {g.items.map((i) => (
                        <li key={i.to}>
                          <NavLink
                            to={i.to}
                            className={({ isActive }) =>
                              `block rounded-lg py-2 text-[15px] transition-colors ${
                                isActive ? 'text-neon' : 'text-dim hover:text-ink'
                              }`
                            }
                          >
                            {t(i.key)}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </nav>

              <Link
                to="/contact"
                className="mt-10 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-neon to-violetneon px-6 py-3.5 text-sm font-semibold text-obsidian"
              >
                {t('cta.startProject')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
