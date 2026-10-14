import { useEffect } from 'react'
import { SITE_URL, SITE_AUTHOR } from '../lib/seo'
import { profile } from '../data/profile'

/**
 * SEOHead — injects JSON-LD structured data into <head> for the current page.
 *
 * Each rendered instance manages its own <script> tag identified by a unique
 * `schemaId`. On the homepage, render two instances — one for "person" and one
 * for "website" — so both schemas appear in the document simultaneously.
 *
 * Only verified, factual fields are included. No fabricated ratings, job
 * postings, or unverified credentials.
 *
 * SPA limitation: this is client-side injection. Search crawlers that do not
 * execute JavaScript will not see this structured data. For full crawler
 * coverage, server-side rendering or static prerendering would be required.
 */

type SchemaType = 'person' | 'website' | 'webpage'

interface SEOHeadProps {
  type: SchemaType
  /** Used for WebPage schema: human-readable page name */
  pageName?: string
  /** Used for WebPage schema: page description */
  pageDescription?: string
  /** Used for WebPage schema: path relative to SITE_URL */
  pagePath?: string
}

// ─── Schema builders ──────────────────────────────────────────────────────────

function buildPersonSchema(): string {
  const base: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE_AUTHOR,
    url: SITE_URL || undefined,
    sameAs: [profile.contact.github, profile.contact.linkedin].filter(Boolean),
    email: profile.contact.email,
    jobTitle: 'Computer Engineering Student',
    description:
      'Computer Engineering student focused on Python development, software projects, and web development.',
  }
  return JSON.stringify(base, (_k, v) => (v === undefined ? undefined : v), 2)
}

function buildWebsiteSchema(): string {
  const base: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Priyansh Masiyava Portfolio',
    url: SITE_URL || undefined,
    author: { '@type': 'Person', name: SITE_AUTHOR },
    description:
      'Portfolio of Priyansh Masiyava, a Computer Engineering student and Python developer.',
  }
  return JSON.stringify(base, (_k, v) => (v === undefined ? undefined : v), 2)
}

function buildWebPageSchema(name: string, description: string, path: string): string {
  const pageUrl = SITE_URL ? `${SITE_URL}${path}` : undefined
  const base: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url: pageUrl,
    isPartOf: SITE_URL
      ? { '@type': 'WebSite', url: SITE_URL, name: 'Priyansh Masiyava Portfolio' }
      : undefined,
    author: { '@type': 'Person', name: SITE_AUTHOR },
  }
  return JSON.stringify(base, (_k, v) => (v === undefined ? undefined : v), 2)
}

// ─── Schema type → stable script element ID mapping ──────────────────────────

const SCHEMA_ID: Record<SchemaType, string> = {
  person: 'json-ld-person',
  website: 'json-ld-website',
  webpage: 'json-ld-webpage',
}

// ─── SEOHead component ────────────────────────────────────────────────────────

export default function SEOHead({ type, pageName, pageDescription, pagePath }: SEOHeadProps) {
  const scriptId = SCHEMA_ID[type]

  useEffect(() => {
    // Remove any previously injected schema of this type
    document.getElementById(scriptId)?.remove()

    let jsonLd: string
    switch (type) {
      case 'person':
        jsonLd = buildPersonSchema()
        break
      case 'website':
        jsonLd = buildWebsiteSchema()
        break
      case 'webpage':
        jsonLd = buildWebPageSchema(
          pageName ?? 'Priyansh Masiyava Portfolio',
          pageDescription ?? '',
          pagePath ?? '/'
        )
        break
    }

    const script = document.createElement('script')
    script.id = scriptId
    script.type = 'application/ld+json'
    script.textContent = jsonLd
    document.head.appendChild(script)

    return () => {
      document.getElementById(scriptId)?.remove()
    }
  }, [type, pageName, pageDescription, pagePath, scriptId])

  return null
}
