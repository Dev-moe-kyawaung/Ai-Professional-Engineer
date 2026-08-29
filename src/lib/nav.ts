export type NavItem = { to: string; key: string }
export type NavGroup = { key: string; items: NavItem[] }

export const navGroups: NavGroup[] = [
  {
    key: 'nav.work',
    items: [
      { to: '/projects', key: 'page.projects' },
      { to: '/case-studies', key: 'page.caseStudies' },
      { to: '/labs', key: 'page.labs' },
      { to: '/open-source', key: 'page.openSource' },
      { to: '/github-activity', key: 'page.github' },
    ],
  },
  {
    key: 'nav.expertise',
    items: [
      { to: '/skills', key: 'page.skills' },
      { to: '/tech-stack', key: 'page.stack' },
      { to: '/architecture', key: 'page.architecture' },
      { to: '/system-design', key: 'page.systemDesign' },
      { to: '/performance', key: 'page.performance' },
      { to: '/design-system', key: 'page.designSystem' },
      { to: '/accessibility', key: 'page.accessibility' },
      { to: '/localization', key: 'page.localization' },
    ],
  },
  {
    key: 'nav.profile',
    items: [
      { to: '/about', key: 'page.about' },
      { to: '/resume', key: 'page.resume' },
      { to: '/experience', key: 'page.experience' },
      { to: '/testimonials', key: 'page.testimonials' },
      { to: '/awards', key: 'page.awards' },
    ],
  },
  {
    key: 'nav.insights',
    items: [
      { to: '/writing', key: 'page.writing' },
      { to: '/talks', key: 'page.talks' },
      { to: '/mentorship', key: 'page.mentorship' },
    ],
  },
  {
    key: 'nav.engage',
    items: [
      { to: '/services', key: 'page.services' },
      { to: '/pricing', key: 'page.pricing' },
      { to: '/faq', key: 'page.faq' },
      { to: '/contact', key: 'page.contact' },
      { to: '/legal', key: 'page.legal' },
    ],
  },
]

export const footerQuickLinks: NavItem[] = [
  { to: '/', key: 'page.home' },
  { to: '/projects', key: 'page.projects' },
  { to: '/case-studies', key: 'page.caseStudies' },
  { to: '/services', key: 'page.services' },
  { to: '/pricing', key: 'page.pricing' },
  { to: '/resume', key: 'page.resume' },
  { to: '/contact', key: 'page.contact' },
]
