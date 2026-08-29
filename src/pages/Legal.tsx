import { useState } from 'react'
import { useI18n } from '../lib/i18n'
import { useSEO } from '../lib/seo'
import { profile } from '../lib/data'
import { GlassCard, PageHero, Section } from '../components/ui'

type Doc = { id: string; title: string; updated: string; sections: { h: string; p: string[] }[] }

const docs: Doc[] = [
  {
    id: 'privacy',
    title: 'Privacy',
    updated: '2026-01-05',
    sections: [
      {
        h: 'What this site collects',
        p: [
          'This portfolio does not use advertising trackers, third-party analytics cookies, or behavioural profiling. No account is required and no personal data is required to browse any page.',
          'Two preferences are stored locally in your browser: your selected language and your selected currency. They never leave your device and can be cleared at any time through your browser settings.',
        ],
      },
      {
        h: 'Contact enquiries',
        p: [
          'When you submit the contact form, the details are composed into an email in your own mail client and sent to moekyawaung@fastmail.com. Nothing is transmitted to a server owned by me until you press send in that client.',
          'Enquiry emails are retained for up to 24 months for business record-keeping, then deleted. They are never sold, shared, or used for marketing lists.',
        ],
      },
      {
        h: 'Your rights',
        p: [
          'You may request a copy of any correspondence held about you, ask for corrections, or request deletion at any time by emailing the address below. Requests are handled within 30 days.',
        ],
      },
    ],
  },
  {
    id: 'terms',
    title: 'Terms',
    updated: '2026-01-05',
    sections: [
      {
        h: 'Use of this site',
        p: [
          'Content on this site is published for information. Case study figures are drawn from real engagements; where a client is under NDA, identifying details have been generalised while preserving the accuracy of the technical narrative.',
          'Written content and code samples may be quoted with attribution. Wholesale reproduction of the site design or copy is not permitted.',
        ],
      },
      {
        h: 'Engagement terms',
        p: [
          'Pricing shown is indicative and confirmed in a written proposal before any work begins. Fixed-scope engagements are invoiced 50% on commencement and 50% on delivery. Retainers are invoiced monthly in arrears with 14-day payment terms.',
          'Intellectual property in delivered work transfers to the client on final payment. I retain the right to describe the engagement in general terms unless a mutual NDA states otherwise.',
          'Either party may terminate a retainer with one month written notice. Fixed-scope work terminated early is invoiced for work completed to date.',
        ],
      },
      {
        h: 'Liability',
        p: [
          'Professional liability is capped at the total fees paid for the engagement in question. Nothing in these terms limits liability for gross negligence or wilful misconduct.',
        ],
      },
    ],
  },
  {
    id: 'cookies',
    title: 'Cookies',
    updated: '2026-01-05',
    sections: [
      {
        h: 'Cookie usage',
        p: [
          'This site sets no cookies. Language and currency preferences use localStorage, which is functionally similar but never transmitted with requests.',
          'Fonts are served by Google Fonts, which may log the request IP address as part of delivering the font files. No cookie is set by that request.',
          'The profile photograph is served from this domain, not from a third-party avatar service, so viewing this site does not report your visit anywhere.',
        ],
      },
    ],
  },
  {
    id: 'imprint',
    title: 'Imprint',
    updated: '2026-01-05',
    sections: [
      {
        h: 'Responsible for content',
        p: [
          `${profile.nameUpper} — Senior Mobile / Android Engineer, operating independently and through ${profile.venture}.`,
          `Registered address: ${profile.location}.`,
          `Correspondence: ${profile.email} · ${profile.phone}`,
          `Verified public profile: ${profile.gravatar}`,
          'Services are provided from Myanmar with client engagements across Thailand and Europe. Tax and registration identifiers are provided on invoices and in contract documentation.',
        ],
      },
      {
        h: 'Accessibility statement',
        p: [
          'This site targets WCAG 2.2 AA. If you encounter a barrier, email the address above and it will be treated as a priority fix rather than a backlog item.',
        ],
      },
    ],
  },
]

export default function Legal() {
  const { t, formatDate } = useI18n()
  const [active, setActive] = useState(docs[0].id)
  useSEO(t('page.legal'), 'Privacy, terms of engagement, cookie policy, and imprint.')

  const doc = docs.find((d) => d.id === active)!

  return (
    <>
      <PageHero
        eyebrow={t('page.legal')}
        title="The small print, written to be read."
        lead="Short, specific, and free of boilerplate that nobody intends to enforce."
        accent="electric"
        meta={[
          { k: 'Documents', v: '4' },
          { k: t('ui.updated'), v: formatDate(doc.updated) },
          { k: 'Cookies', v: 'None set' },
          { k: 'Trackers', v: 'None' },
        ]}
      />

      <Section className="pt-2">
        <div className="grid gap-8 lg:grid-cols-[0.28fr_0.72fr]">
          <nav aria-label="Legal documents" className="flex flex-row flex-wrap gap-2 lg:flex-col">
            {docs.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setActive(d.id)}
                aria-pressed={active === d.id}
                className={`rounded-xl border px-4 py-3 text-left text-[13.5px] transition-all duration-300 ${
                  active === d.id
                    ? 'border-electric/40 bg-electric/10 text-ink'
                    : 'border-white/8 bg-white/[0.02] text-dim hover:border-white/20 hover:text-ink'
                }`}
              >
                {d.title}
              </button>
            ))}
          </nav>

          <GlassCard strong className="p-7 md:p-9">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="display text-3xl text-ink">{doc.title}</h2>
              <span className="font-mono text-[11.5px] text-faint">
                {t('ui.updated')} {formatDate(doc.updated)}
              </span>
            </div>
            <div className="mt-8 space-y-8">
              {doc.sections.map((s) => (
                <section key={s.h}>
                  <h3 className="text-[15px] font-semibold text-neon">{s.h}</h3>
                  <div className="mt-3 space-y-3">
                    {s.p.map((para) => (
                      <p key={para} className="text-[14px] leading-relaxed text-dim">
                        {para}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </GlassCard>
        </div>
      </Section>
    </>
  )
}
