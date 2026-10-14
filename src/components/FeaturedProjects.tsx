import { Link } from 'react-router-dom'
import { ArrowRight, Star } from 'lucide-react'
import { GithubIcon } from './BrandIcons'
import { featuredProjects } from '../data/projects'
import ProjectCard from './ProjectCard'

// ─── Featured Hero Card (Awesome Python Projects Community) ──────────────────

function FeaturedHeroCard() {
  const hero = featuredProjects[0]
  if (!hero) return null
  return (
    <div className="relative rounded-2xl border border-violet-500/40 bg-theme-card overflow-hidden mb-12 group hover:border-violet-400/60 transition-all duration-300 hover:shadow-2xl hover:shadow-violet-500/10">
      {/* Decorative gradient stripe */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-teal-400 to-violet-500" />

      {/* Code background watermark */}
      <div className="absolute inset-0 opacity-[0.04] font-mono text-xs text-violet-300 p-6 leading-6 select-none overflow-hidden whitespace-pre pointer-events-none">
        {`# awesome-python-projects-community\n# A community hub for Python developers\n\n## Contributing\n\nFork the repository, add your project,\nand submit a pull request!\n\ngit clone https://github.com/PriyanshMasiyava/\n         awesome-python-projects-community\ngit checkout -b add-my-project\n# ... make your changes ...\ngit commit -m "Add: my awesome python project"\ngit push origin add-my-project\n# Open a pull request on GitHub`}
      </div>

      <div className="relative z-10 p-8 sm:p-10">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
          {/* Left */}
          <div className="flex-1 space-y-4">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-violet-500/20 border border-violet-500/50 text-violet-300">
                <Star size={11} className="fill-violet-300" />
                Featured Project
              </span>
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-teal-400/10 border border-teal-400/30 text-teal-400">
                Open Source
              </span>
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400">
                In Progress
              </span>
            </div>

            {/* Title */}
            <h3 className="text-2xl sm:text-3xl font-bold text-theme-primary group-hover:text-violet-400 transition-colors duration-200 leading-tight">
              {hero.title}
            </h3>

            {/* Description */}
            <p className="text-theme-secondary leading-relaxed max-w-xl">
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
                  aria-label="View Awesome Python Projects Community on GitHub (opens in new tab)"
                >
                  <GithubIcon size={15} />
                  View on GitHub
                </a>
              )}
            </div>
          </div>

          {/* Right: Visual */}
          <div className="flex-shrink-0 w-full sm:w-40 h-36 sm:h-40 rounded-xl bg-theme-page border border-theme flex flex-col items-center justify-center gap-3">
            <div className="w-16 h-16 rounded-2xl bg-violet-500/20 border border-violet-500/40 flex items-center justify-center text-3xl">
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

// ─── Featured Projects Section ────────────────────────────────────────────────

export default function FeaturedProjects() {
  // other featured (not the hero)
  const otherFeatured = featuredProjects.slice(1)

  return (
    <section id="projects" className="py-20 bg-theme-section-alt">
      <div className="section-container">
        {/* Heading */}
        <div className="mb-12 text-center">
          <p className="text-violet-400 text-sm font-semibold tracking-widest uppercase mb-2">
            What I've Built
          </p>
          <h2 className="section-heading text-theme-primary">
            Featured <span className="accent-text">Projects</span>
          </h2>
          <p className="mt-4 text-theme-muted max-w-2xl mx-auto">
            A collection of Python applications and open-source initiatives — built with curiosity,
            real-world utility, and clean code at the core.
          </p>
        </div>

        {/* Hero featured card */}
        <FeaturedHeroCard />

        {/* Other featured projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {otherFeatured.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Link
            to="/projects"
            className="btn-secondary"
            aria-label="View all projects"
          >
            View All Projects
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
