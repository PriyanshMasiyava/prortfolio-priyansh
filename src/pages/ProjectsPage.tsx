import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search, X, ChevronDown, SlidersHorizontal, ArrowRight, Star } from 'lucide-react'
import { GithubIcon } from '../components/BrandIcons'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProjectCard from '../components/ProjectCard'
import SEOHead from '../components/SEOHead'
import { useSEO } from '../hooks/useSEO'
import { pageMeta } from '../lib/seo'
import { projects, featuredProjects, allCategories, allTechnologies } from '../data/projects'

// ─── Types ────────────────────────────────────────────────────────────────────

type SortOption = 'featured' | 'az' | 'za' | 'date-desc'

// ─── Filter Pill ──────────────────────────────────────────────────────────────

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet-500 whitespace-nowrap ${
        active
          ? 'bg-violet-500/20 border-violet-500/60 text-violet-400'
          : 'bg-theme-card border-theme text-theme-muted hover:border-violet-500/40 hover:text-theme-secondary'
      }`}
      aria-pressed={active}
    >
      {label}
    </button>
  )
}

// ─── Featured Banner (top of /projects page) ──────────────────────────────────

function FeaturedBanner() {
  const hero = featuredProjects[0]
  if (!hero) return null

  return (
    <div className="relative rounded-2xl border border-violet-500/40 bg-theme-card overflow-hidden mb-12 group hover:border-violet-400/60 transition-all duration-300 hover:shadow-2xl hover:shadow-violet-500/10">
      {/* Top accent stripe */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent" />

      {/* Code background watermark */}
      <div className="absolute inset-0 opacity-[0.04] font-mono text-xs text-violet-300 p-6 leading-6 select-none overflow-hidden whitespace-pre pointer-events-none">
        {`# awesome-python-projects-community\n# Open-source Python community hub\n\ngit clone https://github.com/PriyanshMasiyava/\n         awesome-python-projects-community\ngit checkout -b add-my-project\n# make your changes\ngit commit -m "Add: my awesome project"\ngit push origin add-my-project\n# Open a pull request on GitHub`}
      </div>

      <div className="relative z-10 p-7 sm:p-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

          {/* Left: content */}
          <div className="flex-1 space-y-4">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-violet-500/20 border border-violet-500/50 text-violet-400">
                <Star size={11} className="fill-violet-400" aria-hidden="true" />
                Featured Project
              </span>
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-teal-400/10 border border-teal-400/30 text-teal-400">
                {hero.category}
              </span>
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400">
                {hero.status}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-bold text-theme-primary group-hover:text-violet-400 transition-colors duration-200 leading-tight">
              {hero.title}
            </h2>

            {/* Description */}
            <p className="text-theme-secondary leading-relaxed max-w-xl text-sm sm:text-base">
              {hero.shortDescription}
            </p>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-2">
              {hero.technologies.map(tech => (
                <span key={tech} className="tech-chip text-xs">{tech}</span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to={`/projects/${hero.slug}`}
                className="btn-primary text-sm"
                aria-label={`View details for ${hero.title}`}
              >
                View Details
                <ArrowRight size={15} />
              </Link>
              {hero.githubUrl && (
                <a
                  href={hero.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-sm"
                  aria-label={`View ${hero.title} on GitHub (opens in new tab)`}
                >
                  <GithubIcon size={15} />
                  View on GitHub
                </a>
              )}
            </div>
          </div>

          {/* Right: visual accent */}
          <div className="flex-shrink-0 w-full sm:w-36 h-32 sm:h-36 rounded-xl bg-theme-page border border-theme flex flex-col items-center justify-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-violet-500/20 border border-violet-500/40 flex items-center justify-center text-3xl">
              🐍
            </div>
            <div className="text-center">
              <p className="text-xs font-semibold text-violet-400">Community</p>
              <p className="text-xs text-theme-subtle">Python · Open Source</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Projects Page ────────────────────────────────────────────────────────────

export default function ProjectsPage() {
  useSEO(pageMeta.projects)

  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All Projects')
  const [activeTechs, setActiveTechs] = useState<string[]>([])
  const [sort, setSort] = useState<SortOption>('featured')
  const [showTechFilter, setShowTechFilter] = useState(false)

  // ── Filtering ──────────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()

    let result = projects.filter(p => {
      // Category
      if (activeCategory !== 'All Projects' && p.category !== activeCategory) return false

      // Technology
      if (activeTechs.length > 0) {
        const hasAll = activeTechs.every(t => p.technologies.includes(t))
        if (!hasAll) return false
      }

      // Search
      if (q) {
        const searchIn = [
          p.title,
          p.shortDescription,
          p.fullDescription,
          p.category,
          ...p.technologies,
          ...p.tags,
          ...p.features,
        ]
          .join(' ')
          .toLowerCase()
        if (!searchIn.includes(q)) return false
      }

      return true
    })

    // Sort
    switch (sort) {
      case 'featured':
        result = result.sort((a, b) => {
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99)
        })
        break
      case 'az':
        result = result.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'za':
        result = result.sort((a, b) => b.title.localeCompare(a.title))
        break
      case 'date-desc':
        result = result.sort((a, b) => {
          const ay = a.completionDate ?? '0'
          const by = b.completionDate ?? '0'
          return by.localeCompare(ay)
        })
        break
    }

    return result
  }, [query, activeCategory, activeTechs, sort])

  // ── Helpers ────────────────────────────────────────────────────────────────
  const hasActiveFilters =
    query.trim() !== '' || activeCategory !== 'All Projects' || activeTechs.length > 0

  // Only show the banner when no active filters (it would always be visible and confusing)
  const showBanner = !hasActiveFilters

  function clearFilters() {
    setQuery('')
    setActiveCategory('All Projects')
    setActiveTechs([])
    setSort('featured')
  }

  function toggleTech(tech: string) {
    setActiveTechs(prev =>
      prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech]
    )
  }

  return (
    <div className="min-h-screen bg-theme-page text-theme-primary">
      <SEOHead
        type="webpage"
        pageName={pageMeta.projects.title}
        pageDescription={pageMeta.projects.description}
        pagePath={pageMeta.projects.path}
      />
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="section-container">

          {/* ── Page Header ──────────────────────────────────────────────── */}
          <header className="mb-12">
            <nav aria-label="Breadcrumb" className="mb-4">
              <ol className="flex items-center gap-2 text-xs text-theme-subtle">
                <li>
                  <Link to="/" className="hover:text-theme-secondary transition-colors focus:outline-none focus:ring-1 focus:ring-violet-500 rounded">
                    Home
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li className="text-theme-secondary" aria-current="page">Projects</li>
              </ol>
            </nav>
            <p className="text-violet-400 text-sm font-semibold tracking-widest uppercase mb-2">
              Portfolio
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-theme-primary leading-tight">
              Projects Built with{' '}
              <span className="accent-text">Curiosity and Code</span>
            </h1>
            <p className="mt-4 text-theme-muted max-w-2xl leading-relaxed">
              A showcase of Python desktop applications, open-source community initiatives, and
              web development projects — each built to solve real problems and grow skills along
              the way.
            </p>
          </header>

          {/* ── Featured Banner (hidden when filters active) ──────────── */}
          {showBanner && <FeaturedBanner />}

          {/* ── Search + Controls ─────────────────────────────────────────── */}
          <div className="space-y-4 mb-8">
            {/* Search row */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search input */}
              <div className="relative flex-1 min-w-0">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-theme-subtle pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  placeholder="Search by title, technology…"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  className="input-field pl-9 pr-9"
                  aria-label="Search projects"
                />
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-theme-subtle hover:text-theme-primary transition-colors focus:outline-none"
                    aria-label="Clear search"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>

              {/* Sort + Tech filter row on mobile */}
              <div className="flex gap-3">
                {/* Sort select */}
                <div className="relative flex-1 sm:flex-none">
                  <select
                    value={sort}
                    onChange={e => setSort(e.target.value as SortOption)}
                    className="input-field pr-8 appearance-none cursor-pointer w-full sm:min-w-[160px]"
                    aria-label="Sort projects"
                  >
                    <option value="featured">Featured First</option>
                    <option value="az">A → Z</option>
                    <option value="za">Z → A</option>
                    <option value="date-desc">Newest First</option>
                  </select>
                  <ChevronDown
                    size={14}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-theme-subtle pointer-events-none"
                    aria-hidden="true"
                  />
                </div>

                {/* Tech filter toggle */}
                <button
                  onClick={() => setShowTechFilter(prev => !prev)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg border text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet-500 whitespace-nowrap flex-shrink-0 ${
                    showTechFilter || activeTechs.length > 0
                      ? 'border-violet-500/60 text-violet-400 bg-violet-500/10'
                      : 'border-theme text-theme-muted hover:border-violet-500/40 hover:text-theme-secondary bg-theme-card'
                  }`}
                  aria-expanded={showTechFilter}
                  aria-label="Toggle technology filters"
                >
                  <SlidersHorizontal size={15} />
                  <span className="hidden sm:inline">Technologies</span>
                  {activeTechs.length > 0 && (
                    <span className="w-5 h-5 rounded-full bg-violet-500 text-white text-xs flex items-center justify-center font-bold">
                      {activeTechs.length}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Category pills */}
            <div className="filter-pill-row flex flex-wrap gap-2" role="group" aria-label="Filter by category">
              {allCategories.map(cat => (
                <FilterPill
                  key={cat}
                  label={cat}
                  active={activeCategory === cat}
                  onClick={() => setActiveCategory(cat)}
                />
              ))}
            </div>

            {/* Technology pills (collapsible) */}
            {showTechFilter && (
              <div
                className="p-4 rounded-xl bg-theme-card border border-theme"
                role="group"
                aria-label="Filter by technology"
              >
                <p className="text-xs font-semibold text-theme-muted uppercase tracking-wider mb-3">
                  Filter by Technology
                </p>
                <div className="flex flex-wrap gap-2">
                  {allTechnologies.map(tech => (
                    <FilterPill
                      key={tech}
                      label={tech}
                      active={activeTechs.includes(tech)}
                      onClick={() => toggleTech(tech)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Results bar ───────────────────────────────────────────────── */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-theme-muted" aria-live="polite" aria-atomic="true">
              {filtered.length === 0
                ? 'No projects found'
                : filtered.length === 1
                ? '1 project'
                : `${filtered.length} projects`}
              {hasActiveFilters && ' matching your filters'}
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1.5 text-sm text-violet-400 hover:text-violet-300 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 rounded px-2 py-1"
                aria-label="Clear all filters"
              >
                <X size={13} />
                Clear Filters
              </button>
            )}
          </div>

          {/* ── Projects Grid ─────────────────────────────────────────────── */}
          {filtered.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            /* Empty state */
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-16 h-16 rounded-2xl bg-theme-card border border-theme flex items-center justify-center text-3xl mb-4">
                🔍
              </div>
              <h2 className="text-lg font-semibold text-theme-primary mb-2">No projects found</h2>
              <p className="text-theme-muted text-sm max-w-sm leading-relaxed">
                No projects match your search. Try another keyword or clear the filters.
              </p>
              <button
                onClick={clearFilters}
                className="btn-secondary mt-6 text-sm"
                aria-label="Clear all filters and search"
              >
                <X size={15} />
                Clear Filters
              </button>
            </div>
          )}

          {/* ── Back to Home ──────────────────────────────────────────────── */}
          <div className="text-center mt-16 pt-8 border-t border-theme">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-theme-muted hover:text-theme-primary transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 rounded"
              aria-label="Back to homepage"
            >
              ← Back to Home
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}
