import { useEffect, useState } from 'react'
import { ArrowRight, Mail, Terminal } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './BrandIcons'
import { profile } from '../data/profile'
import ResumeButton from './ResumeButton'

function AnimatedRole({ roles }: { roles: string[] }) {
  const [index, setIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = roles[index]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80)
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setIndex(prev => (prev + 1) % roles.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, deleting, index, roles])

  return (
    <span className="text-violet-400 font-semibold">
      {displayed}
      <span className="animate-blink ml-0.5">|</span>
    </span>
  )
}

function CodePanel() {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Glow */}
      <div className="absolute -inset-4 bg-violet-500/10 rounded-2xl blur-xl" />
      {/* Code panel always stays dark — it's a decorative code editor illustration */}
      <div className="relative bg-[#111827] border border-slate-700/60 rounded-xl overflow-hidden shadow-2xl shadow-black/40">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-[#0d1326]/80 border-b border-slate-700/50">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
          <div className="flex items-center gap-2 ml-3 text-xs text-slate-500 font-mono truncate">
            <Terminal size={12} className="flex-shrink-0" />
            priyansh_portfolio.py
          </div>
        </div>
        {/* Code */}
        <div className="p-4 sm:p-5 font-mono text-xs sm:text-sm leading-6 sm:leading-7 select-none overflow-x-auto">
          <div>
            <span className="text-violet-400">class </span>
            <span className="text-teal-400">Developer</span>
            <span className="text-slate-300">:</span>
          </div>
          <div className="ml-4">
            <span className="text-violet-400">def </span>
            <span className="text-yellow-300">__init__</span>
            <span className="text-slate-300">(self):</span>
          </div>
          <div className="ml-8 text-slate-400">
            <span className="text-slate-500">self.</span>
            <span className="text-teal-300">name</span>
            <span className="text-slate-400"> = </span>
            <span className="text-green-400">"Priyansh Masiyava"</span>
          </div>
          <div className="ml-8 text-slate-400">
            <span className="text-slate-500">self.</span>
            <span className="text-teal-300">role</span>
            <span className="text-slate-400"> = </span>
            <span className="text-green-400">"Python Developer"</span>
          </div>
          <div className="ml-8 text-slate-400">
            <span className="text-slate-500">self.</span>
            <span className="text-teal-300">languages</span>
            <span className="text-slate-400"> = [</span>
            <span className="text-green-400">"Python"</span>
            <span className="text-slate-400">, </span>
            <span className="text-green-400">"SQL"</span>
            <span className="text-slate-400">, </span>
            <span className="text-green-400">"C++"</span>
            <span className="text-slate-400">]</span>
          </div>
          <div className="mt-2 ml-4">
            <span className="text-violet-400">def </span>
            <span className="text-yellow-300">solve</span>
            <span className="text-slate-300">(self, problem):</span>
          </div>
          <div className="ml-8 text-slate-400">
            <span className="text-violet-400">return </span>
            <span className="text-teal-300">practical_solution</span>
            <span className="text-slate-400">(problem)</span>
          </div>
          {/* Cursor */}
          <div className="mt-3 ml-4 flex items-center gap-1 text-green-400 text-xs">
            <span className="text-slate-600">$</span>
            <span className="animate-blink">█</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden bg-theme-page"
    >
      {/* Background gradient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-violet-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-teal-400/6 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-8 items-center">
          {/* Left — Copy */}
          <div className="space-y-6 animate-fade-in">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-400 text-xs font-semibold tracking-widest uppercase max-w-full">
              {profile.eyebrow}
            </div>

            {/* Main heading */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-theme-primary">
                Hi, I'm{' '}
                <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-teal-400">
                  {profile.name}
                </span>
              </h1>
              <h2 className="text-xl sm:text-2xl font-semibold text-theme-secondary">
                {profile.tagline}
              </h2>
            </div>

            {/* Animated role */}
            <div className="flex items-center gap-2 text-base sm:text-lg text-theme-muted">
              <span>Currently a</span>
              <AnimatedRole roles={profile.roles} />
            </div>

            {/* Supporting text */}
            <p className="text-theme-muted text-base sm:text-lg leading-relaxed max-w-xl">
              Computer Engineering student passionate about Python development,
              software engineering, and creating practical solutions to
              real-world problems.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a href="#projects" className="btn-primary">
                Explore My Projects
                <ArrowRight size={16} />
              </a>
              <ResumeButton />
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4 pt-2">
              <a
                href={profile.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="flex items-center gap-2 text-theme-muted hover:text-theme-primary transition-colors duration-200 text-sm"
              >
                <GithubIcon size={20} />
                <span className="hidden sm:inline">GitHub</span>
              </a>
              <a
                href={profile.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="flex items-center gap-2 text-theme-muted hover:text-teal-400 transition-colors duration-200 text-sm"
              >
                <LinkedinIcon size={20} />
                <span className="hidden sm:inline">LinkedIn</span>
              </a>
              <a
                href={`mailto:${profile.contact.email}`}
                aria-label="Send email"
                className="flex items-center gap-2 text-theme-muted hover:text-violet-400 transition-colors duration-200 text-sm"
              >
                <Mail size={20} />
                <span className="hidden sm:inline">Email</span>
              </a>
            </div>
          </div>

          {/* Right — Code panel */}
          <div className="animate-slide-up">
            <CodePanel />
          </div>
        </div>
      </div>
    </section>
  )
}
