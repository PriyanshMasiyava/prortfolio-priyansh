import { Link } from 'react-router-dom'
import { Printer, ArrowLeft, Mail, Phone, ExternalLink, MapPin } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../components/BrandIcons'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEOHead from '../components/SEOHead'
import { useSEO } from '../hooks/useSEO'
import { pageMeta } from '../lib/seo'
import { profile } from '../data/profile'
import { experiences } from '../data/experience'
import { educationList } from '../data/education'
import { skillCategories } from '../data/skills'
import { achievements } from '../data/achievements'

// ─── Print styles injected as a style element ─────────────────────────────────
// Tailwind purges unused print: classes in production, so we inject a <style>
// block directly to ensure print-specific overrides are always present.
const PRINT_STYLES = `
@media print {
  body { background: white !important; color: #111 !important; }
  .no-print { display: none !important; }
  .print-page {
    max-width: 100% !important;
    margin: 0 !important;
    padding: 16px 24px !important;
    box-shadow: none !important;
    border: none !important;
    background: white !important;
    color: #111 !important;
  }
  .print-page * { color: inherit !important; background: transparent !important; border-color: #ddd !important; }
  a { text-decoration: none !important; }
  .print-section-title { border-bottom: 1px solid #ccc !important; }
  @page { margin: 1.2cm; }
}
`

// ─── Section heading ──────────────────────────────────────────────────────────

function ResumeSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="mb-6 print-section">
      <h2 className="print-section-title text-xs font-bold uppercase tracking-widest text-violet-400 print:text-slate-600 border-b border-theme pb-1.5 mb-4">
        {title}
      </h2>
      {children}
    </section>
  )
}

// ─── Resume Page ──────────────────────────────────────────────────────────────

export default function ResumePage() {
  useSEO(pageMeta.resume)

  function handlePrint() {
    window.print()
  }

  return (
    <>
      <SEOHead
        type="webpage"
        pageName={pageMeta.resume.title}
        pageDescription={pageMeta.resume.description}
        pagePath={pageMeta.resume.path}
      />
      <style>{PRINT_STYLES}</style>

      <div className="min-h-screen bg-theme-page text-theme-primary">
        {/* Navbar — hidden on print */}
        <div className="no-print">
          <Navbar />
        </div>

        {/* Page chrome — hidden on print */}
        <div className="no-print pt-24 pb-6">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <nav aria-label="Breadcrumb" className="mb-4">
              <ol className="flex items-center gap-2 text-xs text-theme-subtle">
                <li>
                  <Link to="/" className="hover:text-theme-secondary transition-colors focus:outline-none focus:ring-1 focus:ring-violet-500 rounded">
                    Home
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li className="text-theme-secondary" aria-current="page">Resume</li>
              </ol>
            </nav>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-theme-primary">Resume</h1>
                <p className="text-sm text-theme-muted mt-1">
                  Print or save as PDF using your browser's print dialog (File → Print → Save as PDF).
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrint}
                  className="btn-primary"
                  aria-label="Print resume or save as PDF"
                >
                  <Printer size={16} />
                  Print / Save as PDF
                </button>
                <Link
                  to="/"
                  className="btn-secondary"
                  aria-label="Back to homepage"
                >
                  <ArrowLeft size={16} />
                  Back
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ── Resume document ────────────────────────────────────────────── */}
        <main className="max-w-3xl mx-auto px-4 sm:px-6 pb-20 print:pb-0">
          <div
            className="print-page bg-theme-card border border-theme rounded-2xl p-8 sm:p-10 shadow-xl shadow-black/30"
            role="document"
            aria-label="Priyansh Masiyava resume"
          >

            {/* ── Header ─────────────────────────────────────────────── */}
            <header className="mb-8 pb-6 border-b border-theme">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-extrabold text-theme-primary tracking-tight">
                    {profile.name}
                  </h1>
                  <p className="text-violet-400 font-semibold mt-1">
                    Computer Engineering Student · Python Developer
                  </p>
                  <p className="text-sm text-theme-muted mt-2 max-w-lg leading-relaxed">
                    {profile.summary}
                  </p>
                </div>
              </div>

              {/* Contact row */}
              <div className="flex flex-wrap gap-x-4 gap-y-2 mt-5 text-sm">
                <a
                  href={`mailto:${profile.contact.email}`}
                  className="flex items-center gap-1.5 text-theme-secondary hover:text-violet-400 transition-colors"
                  aria-label={`Email: ${profile.contact.email}`}
                >
                  <Mail size={13} className="text-violet-400 flex-shrink-0" />
                  {profile.contact.email}
                </a>
                <a
                  href={`tel:${profile.contact.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-1.5 text-theme-secondary hover:text-violet-400 transition-colors"
                  aria-label={`Phone: ${profile.contact.phone}`}
                >
                  <Phone size={13} className="text-violet-400 flex-shrink-0" />
                  {profile.contact.phone}
                </a>
                <a
                  href={profile.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-theme-secondary hover:text-teal-400 transition-colors"
                  aria-label="LinkedIn profile (opens in new tab)"
                >
                  <LinkedinIcon size={13} className="text-teal-400 flex-shrink-0" />
                  linkedin.com/in/priyansh-masiyava
                  <ExternalLink size={11} className="text-theme-subtle" aria-hidden="true" />
                </a>
                <a
                  href={profile.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-theme-secondary hover:text-theme-primary transition-colors"
                  aria-label="GitHub profile (opens in new tab)"
                >
                  <GithubIcon size={13} className="flex-shrink-0" />
                  github.com/PriyanshMasiyava
                  <ExternalLink size={11} className="text-theme-subtle" aria-hidden="true" />
                </a>
              </div>
            </header>

            {/* ── Education ──────────────────────────────────────────── */}
            <ResumeSection title="Education">
              <div className="space-y-5">
                {educationList.map(edu => (
                  <div key={edu.id}>
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-0.5">
                      <div>
                        <h3 className="text-sm font-semibold text-theme-primary">{edu.degree}</h3>
                        <p className="text-sm text-theme-secondary">{edu.institution}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-xs text-theme-muted">{edu.duration}</p>
                        {edu.cgpa && (
                          <p className="text-xs text-teal-400 font-medium">CGPA: {edu.cgpa}</p>
                        )}
                        <span
                          className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                            edu.status === 'In Progress'
                              ? 'bg-amber-400/10 text-amber-400 border border-amber-400/30'
                              : 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/30'
                          }`}
                        >
                          {edu.status}
                        </span>
                      </div>
                    </div>
                    {edu.location && (
                      <p className="flex items-center gap-1 text-xs text-theme-subtle mt-0.5">
                        <MapPin size={11} />
                        {edu.location}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </ResumeSection>

            {/* ── Skills ─────────────────────────────────────────────── */}
            <ResumeSection title="Technical Skills">
              <div className="space-y-3">
                {skillCategories.map(cat => (
                  <div key={cat.category} className="flex flex-col sm:flex-row sm:gap-3">
                    <dt className="text-xs font-semibold text-theme-muted sm:w-44 flex-shrink-0 mb-1 sm:mb-0 sm:pt-0.5">
                      {cat.category}
                    </dt>
                    <dd className="flex flex-wrap gap-1.5">
                      {cat.skills.map(skill => (
                        <span
                          key={skill}
                          className="text-xs px-2 py-0.5 rounded-full bg-theme-card border border-theme text-theme-secondary"
                        >
                          {skill}
                        </span>
                      ))}
                    </dd>
                  </div>
                ))}
              </div>
            </ResumeSection>

            {/* ── Experience ──────────────────────────────────────────── */}
            <ResumeSection title="Work Experience">
              <div className="space-y-6">
                {experiences.map(exp => (
                  <div key={exp.id}>
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-0.5 mb-2">
                      <div>
                        <h3 className="text-sm font-semibold text-theme-primary">{exp.role}</h3>
                        <p className="text-sm text-violet-400">{exp.company}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-xs text-theme-muted">{exp.duration}</p>
                        {exp.location && (
                          <p className="flex items-center justify-end gap-1 text-xs text-theme-subtle mt-0.5">
                            <MapPin size={11} />
                            {exp.location}
                          </p>
                        )}
                      </div>
                    </div>
                    <ul className="space-y-1.5 ml-0">
                      {exp.responsibilities.map((r, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-theme-secondary">
                          <span className="text-violet-500 flex-shrink-0 mt-1">•</span>
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </ResumeSection>

            {/* ── Projects ────────────────────────────────────────────── */}
            <ResumeSection title="Key Projects">
              <div className="space-y-4">
                <div>
                  <div className="flex flex-wrap items-start justify-between gap-x-2 gap-y-1">
                    <h3 className="text-sm font-semibold text-theme-primary">Expense Tracker Application</h3>
                    <span className="text-xs text-theme-subtle">Python · Tkinter · SQLite · Matplotlib</span>
                  </div>
                  <p className="text-xs text-theme-secondary mt-1 leading-relaxed">
                    GUI-based expense management application with full CRUD operations, SQLite data storage,
                    search and filtering, CSV/PDF export, and Matplotlib bar-chart visualization.
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap items-start justify-between gap-x-2 gap-y-1">
                    <h3 className="text-sm font-semibold text-theme-primary">Weather Application</h3>
                    <span className="text-xs text-theme-subtle">Python · Tkinter · OpenWeather API</span>
                  </div>
                  <p className="text-xs text-theme-secondary mt-1 leading-relaxed">
                    Desktop weather application fetching real-time data via the OpenWeather API —
                    displays temperature, humidity, wind speed, and conditions with input validation and exception handling.
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap items-start justify-between gap-x-2 gap-y-1">
                    <h3 className="text-sm font-semibold text-theme-primary">
                      Awesome Python Projects Community
                    </h3>
                    <a
                      href="https://github.com/PriyanshMasiyava/awesome-python-projects-community"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300"
                      aria-label="Awesome Python Projects Community on GitHub (opens in new tab)"
                    >
                      <GithubIcon size={11} />
                      GitHub
                    </a>
                  </div>
                  <p className="text-xs text-theme-secondary mt-1 leading-relaxed">
                    Open-source Python community project on GitHub — curated hub for Python
                    developers to explore projects, collaborate, and contribute.
                  </p>
                </div>
              </div>
            </ResumeSection>

            {/* ── Achievements ────────────────────────────────────────── */}
            <ResumeSection title="Achievements & Certifications">
              <div className="space-y-3">
                {achievements.map(a => (
                  <div key={a.id}>
                    <h3 className="text-sm font-semibold text-theme-primary">{a.title}</h3>
                    <p className="text-xs text-theme-secondary mt-0.5 leading-relaxed">{a.description}</p>
                  </div>
                ))}
              </div>
            </ResumeSection>

          </div>
        </main>

        {/* Footer — hidden on print */}
        <div className="no-print">
          <Footer />
        </div>
      </div>
    </>
  )
}
