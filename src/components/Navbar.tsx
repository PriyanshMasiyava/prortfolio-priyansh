import { useState, useEffect } from 'react'
import { Menu, X, Download, Code2 } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

// ─── NavLink ──────────────────────────────────────────────────────────────────

const linkClass =
  'px-3 py-2 text-sm text-theme-muted hover:text-theme-primary rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-violet-500'

function NavLink({
  label,
  to,
  onClick,
}: {
  label: string
  to: string
  onClick?: () => void
}) {
  // Anchor-only links (#section) — native <a> for same-page scroll
  if (to.startsWith('#')) {
    return (
      <a href={to} className={linkClass} onClick={onClick}>
        {label}
      </a>
    )
  }
  // Cross-page anchor links (/#section) — native <a> so the browser handles
  // the hash scroll after navigation instead of React Router stripping it
  if (to.startsWith('/#')) {
    return (
      <a href={to} className={linkClass} onClick={onClick}>
        {label}
      </a>
    )
  }
  return (
    <Link to={to} className={linkClass} onClick={onClick}>
      {label}
    </Link>
  )
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  const isHome = location.pathname === '/'

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const handleNavClick = () => setMenuOpen(false)

  function navTo(anchor: string, fullPath: string) {
    return isHome ? anchor : fullPath
  }

  const navLinks = [
    { label: 'Home',         to: navTo('#home', '/') },
    { label: 'About',        to: navTo('#about', '/#about') },
    { label: 'Skills',       to: navTo('#skills', '/#skills') },
    { label: 'Projects',     to: navTo('#projects', '/projects') },
    { label: 'Experience',   to: navTo('#experience', '/#experience') },
    { label: 'Education',    to: navTo('#education', '/#education') },
    { label: 'Achievements', to: navTo('#achievements', '/#achievements') },
    { label: 'Contact',      to: navTo('#contact', '/#contact') },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-theme-nav backdrop-blur-md border-b border-theme shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-violet-500 rounded-lg"
            aria-label="Priyansh Masiyava — Home"
          >
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-violet-500/20 border border-violet-500/40 group-hover:bg-violet-500/30 transition-all duration-200">
              <Code2 size={18} className="text-violet-400" />
            </div>
            <span className="font-bold text-theme-primary text-sm hidden sm:block">
              PM
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <li key={link.label}>
                <NavLink label={link.label} to={link.to} />
              </li>
            ))}
          </ul>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              to="/resume"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg
                         bg-violet-500 hover:bg-violet-600 text-white transition-all duration-200
                         focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
              aria-label="View resume"
            >
              <Download size={15} />
              Resume
            </Link>
            <button
              onClick={() => setMenuOpen(prev => !prev)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              className="lg:hidden p-2 rounded-lg border border-theme text-theme-muted hover:text-theme-primary
                         hover:border-violet-500/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="lg:hidden bg-theme-nav backdrop-blur-md border-b border-theme">
          <div className="section-container py-4 flex flex-col gap-1">
            {navLinks.map(link => (
              <NavLink key={link.label} label={link.label} to={link.to} onClick={handleNavClick} />
            ))}
            <div className="pt-2 border-t border-theme">
              <Link
                to="/resume"
                onClick={handleNavClick}
                className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-violet-400 hover:text-violet-300 transition-colors"
                aria-label="View resume"
              >
                <Download size={15} />
                View Resume
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
