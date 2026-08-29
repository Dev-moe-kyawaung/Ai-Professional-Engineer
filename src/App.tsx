import { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { I18nProvider } from './lib/i18n'
import { CurrencyProvider } from './lib/currency'
import Layout from './components/Layout'
import Home from './pages/Home'

const About = lazy(() => import('./pages/About'))
const Resume = lazy(() => import('./pages/Resume'))
const Skills = lazy(() => import('./pages/Skills'))
const TechStack = lazy(() => import('./pages/TechStack'))
const Projects = lazy(() => import('./pages/Projects'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const CaseStudies = lazy(() => import('./pages/CaseStudies'))
const SystemDesign = lazy(() => import('./pages/SystemDesign'))
const Architecture = lazy(() => import('./pages/Architecture'))
const Performance = lazy(() => import('./pages/Performance'))
const OpenSource = lazy(() => import('./pages/OpenSource'))
const GithubActivity = lazy(() => import('./pages/GithubActivity'))
const TestimonialsPage = lazy(() => import('./pages/Testimonials'))
const ExperiencePage = lazy(() => import('./pages/Experience'))
const Services = lazy(() => import('./pages/Services'))
const Contact = lazy(() => import('./pages/Contact'))
const Writing = lazy(() => import('./pages/Writing'))
const Talks = lazy(() => import('./pages/Talks'))
const Mentorship = lazy(() => import('./pages/Mentorship'))
const Awards = lazy(() => import('./pages/Awards'))
const Labs = lazy(() => import('./pages/Labs'))
const DesignSystem = lazy(() => import('./pages/DesignSystem'))
const AccessibilityPage = lazy(() => import('./pages/Accessibility'))
const LocalizationPage = lazy(() => import('./pages/Localization'))
const Pricing = lazy(() => import('./pages/Pricing'))
const Faq = lazy(() => import('./pages/Faq'))
const Legal = lazy(() => import('./pages/Legal'))
const NotFound = lazy(() => import('./pages/NotFound'))

function RouteFallback() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center" role="status" aria-live="polite">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-white/12 border-t-neon" />
      <span className="sr-only">Loading</span>
    </div>
  )
}

export default function App() {
  return (
    <I18nProvider>
      <CurrencyProvider>
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <Suspense fallback={<RouteFallback />}>
                  <Layout />
                </Suspense>
              }
            >
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/tech-stack" element={<TechStack />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:slug" element={<ProjectDetail />} />
              <Route path="/case-studies" element={<CaseStudies />} />
              <Route path="/system-design" element={<SystemDesign />} />
              <Route path="/architecture" element={<Architecture />} />
              <Route path="/performance" element={<Performance />} />
              <Route path="/open-source" element={<OpenSource />} />
              <Route path="/github-activity" element={<GithubActivity />} />
              <Route path="/testimonials" element={<TestimonialsPage />} />
              <Route path="/experience" element={<ExperiencePage />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/writing" element={<Writing />} />
              <Route path="/talks" element={<Talks />} />
              <Route path="/mentorship" element={<Mentorship />} />
              <Route path="/awards" element={<Awards />} />
              <Route path="/labs" element={<Labs />} />
              <Route path="/design-system" element={<DesignSystem />} />
              <Route path="/accessibility" element={<AccessibilityPage />} />
              <Route path="/localization" element={<LocalizationPage />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/legal" element={<Legal />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CurrencyProvider>
    </I18nProvider>
  )
}
