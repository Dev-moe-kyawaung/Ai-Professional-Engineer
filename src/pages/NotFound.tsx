import { useI18n } from '../lib/i18n'
import { useSEO } from '../lib/seo'
import { Magnetic, Section } from '../components/ui'
import { footerQuickLinks } from '../lib/nav'
import { Link } from 'react-router-dom'

export default function NotFound() {
  const { t } = useI18n()
  useSEO(t('page.notFound'), 'That route does not exist.')

  return (
    <Section className="flex min-h-[70vh] flex-col justify-center pt-40">
      <div className="mono-label text-neon">404</div>
      <h1 className="display mt-5 text-[clamp(2.6rem,7vw,5.5rem)] text-ink">
        This route was never registered.
      </h1>
      <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-dim">
        Every other link on this site resolves. If you followed one from here and reached this page, that is a bug
        and I would like to know about it.
      </p>
      <div className="mt-9 flex flex-wrap gap-3">
        <Magnetic to="/">{t('cta.backHome')}</Magnetic>
        <Magnetic to="/contact" variant="ghost">
          {t('cta.contact')}
        </Magnetic>
      </div>
      <div className="mt-14 flex flex-wrap gap-x-6 gap-y-3">
        {footerQuickLinks.map((l) => (
          <Link key={l.to} to={l.to} className="text-[13px] text-faint transition-colors hover:text-neon">
            {t(l.key)}
          </Link>
        ))}
      </div>
    </Section>
  )
}
