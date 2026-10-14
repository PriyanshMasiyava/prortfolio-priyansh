import { Link } from 'react-router-dom'
import { ExternalLink, CheckCircle2, ArrowRight, Star } from 'lucide-react'
import { GithubIcon } from './BrandIcons'
import type { Project } from '../types'

// ─── Project Illustration ─────────────────────────────────────────────────────

const illustrationConfig: Record<string, { emoji: string; codeSnippet: string; stackLabel: string }> = {
  'awesome-python-projects-community': {
    emoji: '🐍',
    codeSnippet: `# awesome-python-projects\n## Community Hub\n\nContribute your Python project!\n\ngit clone https://github.com/\n  PriyanshMasiyava/\n  awesome-python-projects-community\n\n# Open to all contributors`,
    stackLabel: 'Python · Open Source · GitHub',
  },
  'expense-tracker': {
    emoji: '💰',
    codeSnippet: `# expense_tracker.py\nimport sqlite3\nimport tkinter as tk\nfrom matplotlib import pyplot\n\nconn = sqlite3.connect("expenses.db")\ncursor = conn.cursor()\n\ndef add_expense(desc, amount):\n    cursor.execute(...)`,
    stackLabel: 'Python · Tkinter · SQLite',
  },
  'weather-application': {
    emoji: '🌤',
    codeSnippet: `# weather_app.py\nimport requests\nimport tkinter as tk\n\nAPI_KEY = "your_key_here"\nURL = "api.openweathermap.org"\n\ndef get_weather(city):\n    resp = requests.get(URL)\n    return resp.json()`,
    stackLabel: 'Python · Tkinter · API',
  },
  'bmi-calculator': {
    emoji: '⚖️',
    codeSnippet: `# bmi_calculator.py\nimport tkinter as tk\n\ndef calculate_bmi(weight, height):\n    bmi = weight / (height ** 2)\n    return round(bmi, 2)\n\ndef get_category(bmi):\n    if bmi < 18.5: return "Underweight"`,
    stackLabel: 'Python · Tkinter · CSV',
  },
  'password-generator': {
    emoji: '🔐',
    codeSnippet: `# password_gen.py\nimport secrets\nimport string\nimport tkinter as tk\n\ndef generate_password(length, opts):\n    chars = ""\n    if opts["upper"]: chars += string.ascii_uppercase\n    if opts["digits"]: chars += string.digits`,
    stackLabel: 'Python · Tkinter',
  },
  'chat-application': {
    emoji: '💬',
    codeSnippet: `# server.py\nimport socket\nimport threading\n\nserver = socket.socket()\nserver.bind(('0.0.0.0', 5555))\nserver.listen()\n\ndef handle_client(conn):\n    while True:\n        msg = conn.recv(1024)`,
    stackLabel: 'Python · Sockets',
  },
  'django-student-management': {
    emoji: '🎓',
    codeSnippet: `# models.py\nfrom django.db import models\n\nclass Student(models.Model):\n    name = models.CharField(max_length=100)\n    email = models.EmailField(unique=True)\n    enrollment = models.DateField()\n\n    def __str__(self):\n        return self.name`,
    stackLabel: 'Python · Django · HTML',
  },
}

// The illustration panel is always rendered dark (code editor aesthetic)
function ProjectIllustration({ slug, title }: { slug: string; title: string }) {
  const config = illustrationConfig[slug] ?? {
    emoji: '🛠',
    codeSnippet: `# ${title.toLowerCase().replace(/\s+/g, '_')}.py\n# Project source code`,
    stackLabel: 'Python',
  }
  return (
    <div className="h-48 flex items-center justify-center rounded-t-xl border-b border-slate-700/40 overflow-hidden relative"
         style={{ background: 'linear-gradient(135deg, #0B1020 0%, #1a2236 100%)' }}>
      <div className="absolute inset-0 opacity-[0.08] font-mono text-xs text-violet-300 p-3 leading-5 select-none overflow-hidden whitespace-pre">
        {config.codeSnippet}
      </div>
      <div className="relative z-10 flex flex-col items-center gap-2">
        <div className="w-14 h-14 rounded-xl bg-violet-500/20 border border-violet-500/40 flex items-center justify-center text-2xl">
          {config.emoji}
        </div>
        <span className="text-xs font-medium text-slate-400">{config.stackLabel}</span>
      </div>
    </div>
  )
}

// ─── Badges ───────────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: Project['status'] }) {
  if (status === 'Completed') {
    return (
      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400">
        Completed
      </span>
    )
  }
  if (status === 'In Progress') {
    return (
      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400">
        In Progress
      </span>
    )
  }
  return null
}

function FeaturedBadge() {
  return (
    <span className="flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-violet-500/15 border border-violet-500/40 text-violet-400">
      <Star size={10} className="fill-violet-400" />
      Featured
    </span>
  )
}

// ─── Project Card ─────────────────────────────────────────────────────────────

interface ProjectCardProps {
  project: Project
  compact?: boolean
}

export default function ProjectCard({ project, compact = false }: ProjectCardProps) {
  return (
    <article
      className="flex flex-col bg-theme-card border border-theme rounded-xl overflow-hidden
                 hover:border-violet-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/8
                 hover:-translate-y-1 group"
      aria-label={project.title}
    >
      {/* Illustration — full cards only */}
      {!compact && <ProjectIllustration slug={project.slug} title={project.title} />}

      {/* Compact: thin top accent bar */}
      {compact && (
        <div className="h-1 w-full bg-gradient-to-r from-violet-500/50 via-teal-400/50 to-violet-500/50" />
      )}

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 gap-4">
        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-teal-400/10 border border-teal-400/30 text-teal-400">
            {project.category}
          </span>
          {project.featured && <FeaturedBadge />}
          <StatusBadge status={project.status} />
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-theme-primary group-hover:text-violet-400 transition-colors duration-200 leading-snug">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-theme-muted text-sm leading-relaxed flex-1">
          {project.shortDescription}
        </p>

        {/* Features (abbreviated) */}
        {!compact && (
          <ul className="space-y-1.5">
            {project.features.slice(0, 3).map(feat => (
              <li key={feat} className="flex items-start gap-2 text-xs text-theme-muted">
                <CheckCircle2 size={13} className="text-teal-400 flex-shrink-0 mt-0.5" />
                {feat}
              </li>
            ))}
            {project.features.length > 3 && (
              <li className="text-xs text-theme-subtle ml-[18px]">
                +{project.features.length - 3} more
              </li>
            )}
          </ul>
        )}

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.map(tech => (
            <span key={tech} className="tech-chip text-xs">
              {tech}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2 border-t border-theme flex-wrap">
          <Link
            to={`/projects/${project.slug}`}
            className="flex items-center gap-1.5 text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 rounded"
            aria-label={`View details for ${project.title}`}
          >
            View Details
            <ArrowRight size={13} />
          </Link>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-theme-muted hover:text-theme-primary transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 rounded"
              aria-label={`GitHub repository for ${project.title} (opens in new tab)`}
            >
              <GithubIcon size={14} />
              GitHub
            </a>
          )}
          {project.liveDemoUrl && (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-theme-muted hover:text-teal-400 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 rounded"
              aria-label={`Live demo for ${project.title} (opens in new tab)`}
            >
              <ExternalLink size={14} />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
