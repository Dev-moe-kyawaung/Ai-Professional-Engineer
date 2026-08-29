import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Cloud, Github, Globe, Linkedin, Mail, MapPin, Phone } from 'lucide-react'
import { navGroups } from '../lib/nav'
import { useI18n } from '../lib/i18n'
import { profile } from '../lib/data'
import { AvailabilityBadge, CurrencySwitcher, LanguageSwitcher } from './Switchers'
import Portrait from './Portrait'

const socials = [
  { icon: Github, href: `https://${profile.github}`, label: 'GitHub' },
  { icon: Linkedin, href: `https://${profile.linkedin}`, label: 'LinkedIn' },
  { icon: Cloud, href: `https://${profile.bluesky}`, label: 'Bluesky' },
  { icon: Globe, href: profile.gravatar, label: 'Gravatar profile' },
]

export default function Footer() {
  const { t } = useI18n()
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  return (
    <footer className="relative mt-10 border-t border-white/8 bg-[#05080d]/60 backdrop-blur-xl">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-neon/40 to-transparent"
      />
      <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_2fr]">
          <div>
            <div className="flex items-center gap-4">
              <Portrait size="md" status />
              <div>
                <div className="display text-2xl leading-none text-ink">MOE KYAW AUNG</div>
                <div className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                  {t('brand.role')}
                </div>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-dim">{t('footer.tag')}</p>
            <AvailabilityBadge className="mt-5" />

            <div className="mt-7 space-y-2.5 text-sm text-dim">
              <a href={`mailto:${profile.email}`} className="flex items-center gap-2.5 hover:text-neon">
                <Mail className="h-4 w-4 text-faint" /> {profile.email}
              </a>
              <a href={`tel:${profile.phoneRaw}`} className="flex items-center gap-2.5 hover:text-neon">
                <Phone className="h-4 w-4 text-faint" /> {profile.phone}
              </a>
              <div className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-faint" /> {t('brand.location')}
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  title={label}
                  className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/3 text-dim transition-colors hover:border-neon/40 hover:text-neon"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {navGroups.map((g) => (
              <div key={g.key}>
                <div className="mono-label mb-3.5 text-faint">{t(g.key)}</div>
                <ul className="space-y-2">
                  {g.items.map((i) => (
                    <li key={i.to}>
                      <Link to={i.to} className="text-[13.5px] text-dim transition-colors hover:text-neon">
                        {t(i.key)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-6 rounded-2xl border border-white/8 bg-white/3 p-6 md:grid-cols-[1.4fr_1fr] md:items-center">
          <div>
            <div className="text-[15px] font-semibold text-ink">{t('footer.newsletter')}</div>
            <p className="mt-1.5 text-[13px] text-dim">{t('footer.newsletterSub')}</p>
          </div>
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault()
              if (email.includes('@')) setDone(true)
            }}
          >
            <label className="sr-only" htmlFor="footer-email">
              {t('contact.email')}
            </label>
            <input
              id="footer-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="min-w-0 flex-1 rounded-full border border-white/10 bg-white/4 px-4 py-2.5 text-[13px] text-ink placeholder:text-faint focus:border-neon/50 focus:outline-none"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-white/90 px-4 py-2.5 text-[13px] font-semibold text-obsidian transition-colors hover:bg-neon"
            >
              {done ? t('footer.subscribed') : t('footer.subscribe')}
            </button>
          </form>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-5 border-t border-white/8 pt-7 md:flex-row md:items-center">
          <div className="text-xs text-faint">
            © {new Date().getFullYear()} Moe Kyaw Aung. {t('ui.rights')} · {t('ui.builtWith')}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <LanguageSwitcher />
            <CurrencySwitcher />
            <Link to="/legal" className="ml-1 text-xs text-faint transition-colors hover:text-neon">
              {t('page.legal')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
