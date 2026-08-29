import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const SITE = 'MOE KYAW AUNG'

function setMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export function useSEO(title: string, description: string) {
  const { pathname } = useLocation()

  useEffect(() => {
    const full = pathname === '/' ? `${SITE} — Senior Mobile / Android Engineer` : `${title} — ${SITE}`
    document.title = full
    setMeta('meta[name="description"]', 'name', 'description', description)
    setMeta('meta[property="og:title"]', 'property', 'og:title', full)
    setMeta('meta[property="og:description"]', 'property', 'og:description', description)
    setMeta('meta[property="og:url"]', 'property', 'og:url', window.location.href)
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', full)
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description)

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = window.location.origin + pathname
  }, [title, description, pathname])
}
