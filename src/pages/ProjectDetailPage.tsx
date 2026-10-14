import { Link, useParams } from 'react-router-dom'
import { CheckCircle2, ExternalLink, ArrowLeft, ChevronRight, BookOpen, Lightbulb, Zap } from 'lucide-react'
import { GithubIcon } from '../components/BrandIcons'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProjectCard from '../components/ProjectCard'
import SEOHead from '../components/SEOHead'
import { useSEO } from '../hooks/useSEO'
import { projectPageMeta } from '../lib/seo'
import { getProjectBySlug, getRelatedProjects } from '../data/projects'
import type { Project } from '../types'

// ─── Project Not Found ────────────────────────────────────────────────────────

function ProjectNotFound() {
  return (
    <div className="min-h-screen bg-theme-page text-theme-primary">
      <Navbar />
      <main className="pt-24 pb-20 flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        <div className="w-20 h-20 rounded-2xl bg-theme-card border border-theme flex items-center justify-center text-4xl mb-6">
          🔍
        </div>
        <h1 className="text-3xl font-bold text-theme-primary mb-3">Project Not Found</h1>
        <p className="text-theme-muted max-w-sm leading-relaxed mb-8">
          The project you're looking for doesn't exist or the URL may have changed.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link to="/projects" className="btn-primary">
            <ArrowLeft size={16} />
            Browse All Projects
          </Link>
          <Link to="/" className="btn-secondary">
            Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}

// ─── Illustration ─────────────────────────────────────────────────────────────

const illustrationEmoji: Record<string, string> = {
  'awesome-python-projects-community': '🐍',
  'expense-tracker': '💰',
  'weather-application': '🌤',
  'bmi-calculator': '⚖️',
  'password-generator': '🔐',
  'chat-application': '💬',
  'django-student-management': '🎓',
}

function DetailIllustration({ slug, alt }: { slug: string; alt: string }) {
  const emoji = illustrationEmoji[slug] ?? '🛠'
  return (
    <div
      className="w-full h-56 sm:h-72 rounded-xl border border-theme bg-theme-card flex flex-col items-center justify-center gap-4 overflow-hidden relative"
      role="img"
      aria-label={alt}
    >
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, #8B5CF6 0px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, #8B5CF6 0px, transparent 1px, transparent 40px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="relative z-10 flex flex-col items-center gap-4">
        <div className="w-20 h-20 rounded-2xl bg-violet-500/20 border border-violet-500/40 flex items-center justify-center text-4xl">
          {emoji}
        </div>
        <p className="text-xs text-theme-subtle font-mono">{alt}</p>
      </div>
    </div>
  )
}

// ─── Status + Category Badge row ──────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  if (status === 'Completed') {
    return (
      <span className="text-xs font-medium px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400">
        Completed
      </span>
    )
  }
  if (status === 'In Progress') {
    return (
      <span className="text-xs font-medium px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400">
        In Progress
      </span>
    )
  }
  return null
}

// ─── Project Detail Content (hooks-safe inner component) ─────────────────────

function ProjectDetailContent({ project }: { project: Project }) {
  const meta = projectPageMeta(project.title, project.shortDescription, project.slug)
  useSEO(meta)

  const related = getRelatedProjects(project.slug, 3)

  return (
    <div className="min-h-screen bg-theme-page text-theme-primary">
      <SEOHead
        type="webpage"
        pageName={meta.title}
        pageDescription={meta.description}
        pagePath={meta.path}
      />
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="section-container max-w-4xl">

          {/* ── Breadcrumb ───────────────────────────────────────────────── */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-theme-subtle">
              <li>
                <Link
                  to="/"
                  className="hover:text-theme-secondary transition-colors focus:outline-none focus:ring-1 focus:ring-violet-500 rounded"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden>
                <ChevronRight size={12} />
              </li>
              <li>
                <Link
                  to="/projects"
                  className="hover:text-theme-secondary transition-colors focus:outline-none focus:ring-1 focus:ring-violet-500 rounded"
                >
                  Projects
                </Link>
              </li>
              <li aria-hidden>
                <ChevronRight size={12} />
              </li>
              <li className="text-theme-secondary truncate max-w-[200px]" aria-current="page">
                {project.title}
              </li>
            </ol>
          </nav>

          {/* ── Header ───────────────────────────────────────────────────── */}
          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-teal-400/10 border border-teal-400/30 text-teal-400">
                {project.category}
              </span>
              <StatusBadge status={project.status} />
              {project.completionDate && (
                <span className="text-xs text-theme-subtle">{project.completionDate}</span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-theme-primary leading-tight mb-4">
              {project.title}
            </h1>

            <p className="text-theme-secondary text-lg leading-relaxed">
              {project.shortDescription}
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-4 mt-6">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  aria-label={`View ${project.title} on GitHub (opens in new tab)`}
                >
                  <GithubIcon size={16} />
                  View on GitHub
                </a>
              )}
              {project.liveDemoUrl && (
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  aria-label={`Open live demo for ${project.title} (opens in new tab)`}
                >
                  <ExternalLink size={16} />
                  Live Demo
                </a>
              )}
              {!project.githubUrl && !project.liveDemoUrl && (
                <span className="text-sm text-theme-subtle italic">
                  Repository link not available
                </span>
              )}
            </div>
          </header>

          {/* ── Illustration ─────────────────────────────────────────────── */}
          <DetailIllustration slug={project.slug} alt={project.imageAlt} />

          {/* ── Content grid ─────────────────────────────────────────────── */}
          <div className="mt-10 grid lg:grid-cols-3 gap-8">

            {/* ── Main content ──────────────────────────────────────── */}
            <div className="lg:col-span-2 space-y-8">

              {/* About */}
              <section aria-labelledby="about-heading">
                <h2 id="about-heading" className="flex items-center gap-2 text-xl font-bold text-theme-primary mb-4">
                  <BookOpen size={20} className="text-violet-400" />
                  About This Project
                </h2>
                <p className="text-theme-secondary leading-relaxed">
                  {project.fullDescription}
                </p>
              </section>

              {/* Features */}
              <section aria-labelledby="features-heading">
                <h2 id="features-heading" className="flex items-center gap-2 text-xl font-bold text-theme-primary mb-4">
                  <CheckCircle2 size={20} className="text-teal-400" />
                  Key Features
                </h2>
                <ul className="space-y-3">
                  {project.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 text-theme-secondary">
                      <CheckCircle2 size={16} className="text-teal-400 flex-shrink-0 mt-0.5" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Challenges */}
              {project.challenges && project.challenges.length > 0 && (
                <section aria-labelledby="challenges-heading">
                  <h2 id="challenges-heading" className="flex items-center gap-2 text-xl font-bold text-theme-primary mb-4">
                    <Zap size={20} className="text-amber-400" />
                    Challenges
                  </h2>
                  <ul className="space-y-3">
                    {project.challenges.map((c, i) => (
                      <li key={i} className="flex items-start gap-3 text-theme-secondary">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-400 text-xs font-bold mt-0.5">
                          {i + 1}
                        </span>
                        {c}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Learnings */}
              {project.learnings && project.learnings.length > 0 && (
                <section aria-labelledby="learnings-heading">
                  <h2 id="learnings-heading" className="flex items-center gap-2 text-xl font-bold text-theme-primary mb-4">
                    <Lightbulb size={20} className="text-violet-400" />
                    What I Learned
                  </h2>
                  <ul className="space-y-3">
                    {project.learnings.map((l, i) => (
                      <li key={i} className="flex items-start gap-3 text-theme-secondary">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-violet-500/15 border border-violet-500/30 flex items-center justify-center text-violet-400 text-xs font-bold mt-0.5">
                          {i + 1}
                        </span>
                        {l}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>

            {/* ── Sidebar ───────────────────────────────────────────── */}
            <aside className="space-y-6">

              {/* Technology Stack */}
              <div className="card-base">
                <h3 className="text-sm font-semibold text-theme-muted uppercase tracking-wider mb-4">
                  Technology Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map(tech => (
                    <span key={tech} className="tech-chip text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tags */}
              {project.tags.length > 0 && (
                <div className="card-base">
                  <h3 className="text-sm font-semibold text-theme-muted uppercase tracking-wider mb-4">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-full bg-theme-card border border-theme text-theme-muted"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Repository */}
              {project.githubUrl && (
                <div className="card-base">
                  <h3 className="text-sm font-semibold text-theme-muted uppercase tracking-wider mb-4">
                    Repository
                  </h3>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 transition-colors break-all focus:outline-none focus:ring-2 focus:ring-violet-500 rounded"
                    aria-label={`GitHub repository for ${project.title} (opens in new tab)`}
                  >
                    <GithubIcon size={14} className="flex-shrink-0" />
                    View on GitHub
                    <ExternalLink size={11} className="flex-shrink-0 ml-auto" />
                  </a>
                </div>
              )}

              {/* Status card */}
              <div className="card-base">
                <h3 className="text-sm font-semibold text-theme-muted uppercase tracking-wider mb-3">
                  Project Info
                </h3>
                <dl className="space-y-2 text-sm">
                  <div className="flex items-center justify-between gap-2">
                    <dt className="text-theme-subtle flex-shrink-0">Status</dt>
                    <dd>
                      <StatusBadge status={project.status} />
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <dt className="text-theme-subtle flex-shrink-0">Category</dt>
                    <dd className="text-theme-secondary text-right">{project.category}</dd>
                  </div>
                  {project.completionDate && (
                    <div className="flex items-center justify-between gap-2">
                      <dt className="text-theme-subtle flex-shrink-0">Year</dt>
                      <dd className="text-theme-secondary">{project.completionDate}</dd>
                    </div>
                  )}
                </dl>
              </div>
            </aside>
          </div>

          {/* ── Related Projects ──────────────────────────────────────────── */}
          {related.length > 0 && (
            <section className="mt-16" aria-labelledby="related-heading">
              <h2 id="related-heading" className="text-2xl font-bold text-theme-primary mb-6">
                Related Projects
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map(p => (
                  <ProjectCard key={p.id} project={p} compact />
                ))}
              </div>
            </section>
          )}

          {/* ── Navigation ───────────────────────────────────────────────── */}
          <div className="flex items-center justify-between mt-12 pt-8 border-t border-theme">
            <Link
              to="/projects"
              className="flex items-center gap-2 text-sm text-theme-muted hover:text-theme-primary transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 rounded"
              aria-label="Back to all projects"
            >
              <ArrowLeft size={15} />
              Back to Projects
            </Link>
            <Link
              to="/#projects"
              className="flex items-center gap-2 text-sm text-theme-muted hover:text-violet-400 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 rounded"
              aria-label="View featured projects on homepage"
            >
              Featured Projects
              <ChevronRight size={15} />
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}

// ─── Project Detail Page — router shell ──────────────────────────────────────

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? getProjectBySlug(slug) : undefined

  if (!project) return <ProjectNotFound />
  return <ProjectDetailContent project={project} />
}
