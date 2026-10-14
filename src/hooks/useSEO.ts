import { useEffect } from 'react'
import type { PageMeta } from '../lib/seo'
import { SITE_AUTHOR, TWITTER_HANDLE, canonicalUrl, ogImageUrl } from '../lib/seo'

/**
 * useSEO — imperatively updates <title> and <meta> tags for the current page.
 *
 * This is a client-side only hook. It is appropriate for a Vite React SPA where
 * server-side rendering is not configured. Search crawlers that execute JavaScript
 * will read the updated metadata; crawlers that do not execute JavaScript will
 * only see the fallback metadata in index.html.
 *
 * To provide full pre-rendered metadata for every route, a prerendering or SSR
 * solution such as vite-plugin-ssr or a migration to a framework like Next.js
 * would be required. That is outside the scope of Phase 05.
 */
export function useSEO(meta: PageMeta): void {
  useEffect(() => {
    const { title, description, path, ogType = 'website' } = meta
    const canonical = canonicalUrl(path)
    const ogImage = ogImageUrl()
    const ogUrl = canonical

    // ── <title> ──────────────────────────────────────────────────────────────
    document.title = title

    // ── Helper: upsert a <meta> tag ───────────────────────────────────────────
    function setMeta(selector: string, attr: string, value: string | undefined) {
      if (!value) {
        // Remove tag if it exists and there is no value to set
        const el = document.head.querySelector(selector)
        el?.remove()
        return
      }
      let el = document.head.querySelector<HTMLMetaElement>(selector)
      if (!el) {
        el = document.createElement('meta')
        const [attrName, attrVal] = attr.split('=')
        el.setAttribute(attrName, attrVal)
        document.head.appendChild(el)
      }
      el.setAttribute('content', value)
    }

    // ── Helper: upsert a <link rel="canonical"> ───────────────────────────────
    function setCanonical(url: string | undefined) {
      const existing = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
      if (!url) {
        existing?.remove()
        return
      }
      let el = existing
      if (!el) {
        el = document.createElement('link')
        el.setAttribute('rel', 'canonical')
        document.head.appendChild(el)
      }
      el.setAttribute('href', url)
    }

    // ── Standard meta ─────────────────────────────────────────────────────────
    setMeta('meta[name="description"]', 'name=description', description)
    setMeta('meta[name="author"]', 'name=author', SITE_AUTHOR)

    // ── Canonical ─────────────────────────────────────────────────────────────
    setCanonical(canonical)

    // ── Open Graph ────────────────────────────────────────────────────────────
    setMeta('meta[property="og:title"]', 'property=og:title', title)
    setMeta('meta[property="og:description"]', 'property=og:description', description)
    setMeta('meta[property="og:type"]', 'property=og:type', ogType)
    setMeta('meta[property="og:url"]', 'property=og:url', ogUrl)
    setMeta('meta[property="og:image"]', 'property=og:image', ogImage)
    setMeta('meta[property="og:site_name"]', 'property=og:site_name', 'Priyansh Masiyava Portfolio')

    // ── Twitter / X Card ──────────────────────────────────────────────────────
    setMeta('meta[name="twitter:card"]', 'name=twitter:card', 'summary_large_image')
    setMeta('meta[name="twitter:title"]', 'name=twitter:title', title)
    setMeta('meta[name="twitter:description"]', 'name=twitter:description', description)
    setMeta('meta[name="twitter:image"]', 'name=twitter:image', ogImage)
    setMeta(
      'meta[name="twitter:creator"]',
      'name=twitter:creator',
      TWITTER_HANDLE || undefined
    )

  }, [meta])
}
