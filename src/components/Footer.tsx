import { Mail, Phone, ArrowUp, Code2 } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { GithubIcon, LinkedinIcon } from './BrandIcons'
import { profile } from '../data/profile'

const navItems = [
  { label: 'About',       anchor: '#about' },
  { label: 'Skills',      anchor: '#skills' },
  { label: 'Projects',    anchor: '#projects' },
  { label: 'Experience',  anchor: '#experience' },
  { label: 'Education',   anchor: '#education' },
  { label: 'Contact',     anchor: '#contact' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  const location = useLocation()
  const isHome = location.pathname === '/'

  function navTo(anchor: string): string {
    return isHome ? anchor : `/${anchor}`
  }

  return (
    <footer className="bg-theme-page border-t border-theme">
      <div className="section-container py-12">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-violet-500/20 border border-violet-500/40 flex items-center justify-center">
                <Code2 size={16} className="text-violet-400" />
              </div>
              <span className="font-bold text-theme-primary">{profile.name}</span>
            </div>
            <p className="text-sm text-theme-subtle leading-relaxed max-w-xs">
              Computer Engineering student building practical software solutions with Python and modern web technologies.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href={profile.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile (opens in new tab)"
                className="text-theme-subtle hover:text-theme-primary transition-colors"
              >
                <GithubIcon size={18} />
              </a>
              <a
                href={profile.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile (opens in new tab)"
                className="text-theme-subtle hover:text-teal-400 transition-colors"
              >
                <LinkedinIcon size={18} />
              </a>
              <a
                href={`mailto:${profile.contact.email}`}
                aria-label={`Email ${profile.name}`}
                className="text-theme-subtle hover:text-violet-400 transition-colors"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <h4 className="text-sm font-semibold text-theme-primary uppercase tracking-wider mb-4">Navigation</h4>
            <ul className="space-y-2">
              {navItems.map(item => {
                const to = navTo(item.anchor)
                return (
                  <li key={item.anchor}>
                    {/* Use native <a> for all anchor links so browsers handle hash scroll */}
                    <a href={to} className="text-sm text-theme-subtle hover:text-theme-secondary transition-colors">
                      {item.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-theme-primary uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href={`mailto:${profile.contact.email}`}
                  className="flex items-center gap-1.5 text-sm text-theme-subtle hover:text-violet-400 transition-colors break-all"
                  aria-label={`Email: ${profile.contact.email}`}
                >
                  <Mail size={13} className="flex-shrink-0" />
                  {profile.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${profile.contact.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-1.5 text-sm text-theme-subtle hover:text-violet-400 transition-colors"
                  aria-label={`Phone: ${profile.contact.phone}`}
                >
                  <Phone size={13} className="flex-shrink-0" />
                  {profile.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={profile.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-theme-subtle hover:text-teal-400 transition-colors"
                  aria-label="LinkedIn Profile (opens in new tab)"
                >
                  LinkedIn Profile
                </a>
              </li>
              <li>
                <a
                  href={profile.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-theme-subtle hover:text-theme-primary transition-colors"
                  aria-label="GitHub Profile (opens in new tab)"
                >
                  GitHub Profile
                </a>
              </li>
              <li>
                <Link
                  to="/resume"
                  className="text-sm text-theme-subtle hover:text-violet-400 transition-colors"
                  aria-label="View resume"
                >
                  View Resume
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-theme flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-theme-subtle">
            © {year} {profile.name}. All rights reserved.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            className="flex items-center gap-1.5 text-xs text-theme-subtle hover:text-violet-400 transition-colors"
          >
            <ArrowUp size={14} />
            Back to top
          </button>
        </div>
      </div>
    </footer>
  )
}
