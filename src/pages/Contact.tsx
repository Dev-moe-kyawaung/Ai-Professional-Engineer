import { useState, type FormEvent } from 'react'
import { Calendar, CheckCircle2, Clock, Cloud, Github, Globe, Linkedin, Mail, Phone } from 'lucide-react'
import { useI18n } from '../lib/i18n'
import { useSEO } from '../lib/seo'
import { profile } from '../lib/data'
import { useCurrency } from '../lib/currency'
import { GlassCard, Magnetic, PageHero, Reveal, Section } from '../components/ui'
import { AvailabilityBadge } from '../components/Switchers'
import Portrait from '../components/Portrait'

const TOPICS = ['Architecture audit', 'Product build', 'Release rescue', 'Fractional lead', 'Full-time role', 'Mentorship']

export default function Contact() {
  const { t } = useI18n()
  const { price } = useCurrency()
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    topic: TOPICS[0],
    message: '',
  })
  useSEO(t('page.contact'), t('contact.lead'))

  const budgets = [price(5000), price(15000), price(40000), price(90000)]

  const update = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email.includes('@') || form.message.length < 10) {
      setError(t('contact.required'))
      return
    }
    setError('')
    setSent(true)
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Company: ${form.company}`,
      `Budget: ${form.budget}`,
      `Topic: ${form.topic}`,
      '',
      form.message,
    ].join('\n')
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
      `[${form.topic}] enquiry from ${form.name}`,
    )}&body=${encodeURIComponent(body)}`
  }

  const field =
    'w-full rounded-xl border border-white/10 bg-white/4 px-4 py-3 text-[14px] text-ink placeholder:text-faint transition-colors focus:border-neon/50 focus:outline-none'

  return (
    <>
      <PageHero
        eyebrow={t('page.contact')}
        title="Tell me what is blocked."
        lead={t('contact.lead')}
        accent="neon"
        meta={[
          { k: t('contact.responseTime'), v: profile.responseTime },
          { k: t('contact.timezone'), v: profile.timezone },
          { k: 'Base', v: profile.location },
          { k: 'Status', v: t('availability.short') },
        ]}
      />

      <Section className="pt-2">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <GlassCard strong className="p-7 md:p-9">
              {sent ? (
                <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                  <CheckCircle2 className="h-12 w-12 text-limeneon" />
                  <h2 className="display mt-6 text-3xl text-ink">{t('contact.sent')}</h2>
                  <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-dim">{t('contact.sentBody')}</p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="mt-8 text-[13px] text-neon underline-offset-4 hover:underline"
                  >
                    {t('contact.send')}
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} noValidate className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mono-label mb-2 block text-faint">
                        {t('contact.name')} *
                      </label>
                      <input id="name" className={field} value={form.name} onChange={update('name')} required />
                    </div>
                    <div>
                      <label htmlFor="email" className="mono-label mb-2 block text-faint">
                        {t('contact.email')} *
                      </label>
                      <input
                        id="email"
                        type="email"
                        className={field}
                        value={form.email}
                        onChange={update('email')}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="company" className="mono-label mb-2 block text-faint">
                        {t('contact.company')}
                      </label>
                      <input id="company" className={field} value={form.company} onChange={update('company')} />
                    </div>
                    <div>
                      <label htmlFor="budget" className="mono-label mb-2 block text-faint">
                        {t('contact.budget')}
                      </label>
                      <select id="budget" className={field} value={form.budget} onChange={update('budget')}>
                        <option value="">—</option>
                        {budgets.map((b, i) => (
                          <option key={b} value={b} className="bg-charcoal">
                            {i === budgets.length - 1 ? `${b}+` : `< ${b}`}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <span className="mono-label mb-3 block text-faint">{t('contact.topic')}</span>
                    <div className="flex flex-wrap gap-2">
                      {TOPICS.map((topic) => (
                        <button
                          key={topic}
                          type="button"
                          onClick={() => setForm((f) => ({ ...f, topic }))}
                          aria-pressed={form.topic === topic}
                          className={`rounded-full border px-3.5 py-1.5 text-[12.5px] transition-all duration-300 ${
                            form.topic === topic
                              ? 'border-neon/50 bg-neon/12 text-neon'
                              : 'border-white/10 bg-white/3 text-dim hover:border-white/25 hover:text-ink'
                          }`}
                        >
                          {topic}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="mono-label mb-2 block text-faint">
                      {t('contact.message')} *
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      className={`${field} resize-none`}
                      placeholder={t('contact.messagePlaceholder')}
                      value={form.message}
                      onChange={update('message')}
                      required
                    />
                  </div>

                  {error && (
                    <p role="alert" className="text-[13px] text-[#ff8f6b]">
                      {error}
                    </p>
                  )}

                  <div className="pt-2">
                    <Magnetic type="submit">{t('contact.send')}</Magnetic>
                  </div>
                </form>
              )}
            </GlassCard>
          </Reveal>

          <div className="space-y-5">
            <Reveal delay={0.08}>
              <GlassCard className="p-7">
                <div className="mb-6 flex items-center gap-4">
                  <Portrait size="md" status />
                  <div>
                    <div className="text-[14px] font-semibold text-ink">MOE KYAW AUNG</div>
                    <div className="text-[11.5px] text-faint">{profile.title}</div>
                  </div>
                </div>
                <AvailabilityBadge />
                <div className="mono-label mt-6 text-faint">{t('contact.channels')}</div>
                <div className="mt-4 space-y-3">
                  {[
                    { icon: Mail, label: profile.email, href: `mailto:${profile.email}` },
                    { icon: Phone, label: profile.phone, href: `tel:${profile.phoneRaw}` },
                    { icon: Calendar, label: profile.calendar, href: `https://${profile.calendar}` },
                    { icon: Github, label: profile.github, href: `https://${profile.github}` },
                    { icon: Linkedin, label: 'LinkedIn — moe-kyaw-aung', href: `https://${profile.linkedin}` },
                    { icon: Cloud, label: profile.blueskyHandle, href: `https://${profile.bluesky}` },
                    { icon: Globe, label: 'gravatar.com/moekyawaung2026', href: profile.gravatar },
                  ].map((c) => (
                    <a
                      key={c.label}
                      href={c.href}
                      className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/3 px-4 py-3 text-[13px] text-dim transition-colors hover:border-neon/40 hover:text-ink"
                    >
                      <c.icon className="h-4 w-4 text-faint" />
                      <span className="truncate">{c.label}</span>
                    </a>
                  ))}
                </div>
              </GlassCard>
            </Reveal>

            <Reveal delay={0.16}>
              <GlassCard className="p-7">
                <Clock className="h-5 w-5 text-neon" />
                <div className="mt-4 space-y-4 text-[13.5px]">
                  <div>
                    <div className="text-faint">{t('contact.responseTime')}</div>
                    <div className="mt-0.5 text-ink">{profile.responseTime}</div>
                  </div>
                  <div>
                    <div className="text-faint">{t('contact.timezone')}</div>
                    <div className="mt-0.5 text-ink">{profile.timezone}</div>
                  </div>
                  <div>
                    <div className="text-faint">Languages</div>
                    <div className="mt-0.5 text-ink">Burmese (native) · English (fluent) · Thai (conversational)</div>
                  </div>
                  <div>
                    <div className="text-faint">Invoicing currencies</div>
                    <div className="mt-0.5 text-ink">USD · THB · MMK — rate fixed at signing</div>
                  </div>
                </div>
              </GlassCard>
            </Reveal>

            <Reveal delay={0.24}>
              <GlassCard className="p-7">
                <div className="mono-label text-limeneon">What happens next</div>
                <ol className="mt-4 space-y-3 text-[13px] text-dim">
                  <li>1. I reply within one business day with two or three questions.</li>
                  <li>2. A 30-minute call about constraints, not features.</li>
                  <li>3. A written scope with a fixed price and start date.</li>
                </ol>
              </GlassCard>
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  )
}
