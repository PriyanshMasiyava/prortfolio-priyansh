/**
 * SEO configuration for the portfolio.
 *
 * PRODUCTION DOMAIN:
 * Replace SITE_URL below with the real deployed URL once it is known
 * (e.g. "https://priyanshmasiyava.vercel.app").
 * Until then it is left as an empty string so canonical tags and absolute
 * Open Graph URLs are simply omitted rather than pointing to a wrong domain.
 *
 * SOCIAL PREVIEW IMAGE:
 * A 1200×630 px Open Graph image should be placed at:
 *   public/images/og-preview.png
 * Once that file exists, set OG_IMAGE_PATH to '/images/og-preview.png'.
 */

// ─────────────────────────────────────────────────────────────────────────────
// DEPLOYMENT NOTE: Replace SITE_URL with your actual Vercel production URL.
// Example: 'https://priyansh-portfolio.vercel.app'
// Until it is set, canonical links and OG absolute URLs are omitted.
// ─────────────────────────────────────────────────────────────────────────────
export const SITE_URL = '' // ← paste your real Vercel URL here, e.g. 'https://priyansh-portfolio.vercel.app'
export const OG_IMAGE_PATH = '' // ← set to '/images/og-preview.png' when the file exists

export const SITE_AUTHOR = 'Priyansh Masiyava'
export const TWITTER_HANDLE = '' // ← set to '@yourhandle' when available

// ─── Per-page metadata ────────────────────────────────────────────────────────

export interface PageMeta {
  title: string
  description: string
  /** Path relative to SITE_URL, e.g. "/" or "/projects" */
  path: string
  /** Override the default OG image (absolute URL) */
  ogImage?: string
  /** Set to true for article-style pages */
  ogType?: 'website' | 'article'
}

export const pageMeta = {
  home: {
    title: 'Priyansh Masiyava | Python Developer Portfolio',
    description:
      'Explore the portfolio of Priyansh Masiyava, a Computer Engineering student focused on Python development, practical software projects, and web development.',
    path: '/',
    ogType: 'website',
  },
  projects: {
    title: 'Projects | Priyansh Masiyava',
    description:
      'Browse Python desktop applications, open-source community initiatives, and web development projects built by Priyansh Masiyava.',
    path: '/projects',
    ogType: 'website',
  },
  resume: {
    title: 'Resume | Priyansh Masiyava',
    description:
      'Resume of Priyansh Masiyava — Computer Engineering student at SSASIT Surat, Python Developer, and open-source contributor.',
    path: '/resume',
    ogType: 'website',
  },
  notFound: {
    title: '404 – Page Not Found | Priyansh Masiyava',
    description: 'The page you are looking for does not exist.',
    path: '',
    ogType: 'website',
  },
} satisfies Record<string, PageMeta>

/** Build a page meta object for an individual project detail page. */
export function projectPageMeta(
  title: string,
  shortDescription: string,
  slug: string
): PageMeta {
  return {
    title: `${title} | Priyansh Masiyava`,
    description: shortDescription,
    path: `/projects/${slug}`,
    ogType: 'article',
  }
}

/** Resolve a canonical URL, or undefined when SITE_URL is not set. */
export function canonicalUrl(path: string): string | undefined {
  if (!SITE_URL) return undefined
  return `${SITE_URL}${path}`
}

/** Resolve the absolute OG image URL, or undefined when not configured. */
export function ogImageUrl(): string | undefined {
  if (!SITE_URL || !OG_IMAGE_PATH) return undefined
  return `${SITE_URL}${OG_IMAGE_PATH}`
}
