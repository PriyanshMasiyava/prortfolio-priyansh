import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import ProjectsPage from './pages/ProjectsPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import ResumePage from './pages/ResumePage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useSEO } from './hooks/useSEO'
import { pageMeta } from './lib/seo'

// ─── 404 Not Found Page ───────────────────────────────────────────────────────

function NotFoundPage() {
  useSEO(pageMeta.notFound)
  return (
    <div className="min-h-screen bg-theme-page text-theme-primary">
      <Navbar />
      <main className="pt-24 pb-20 flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        <div className="w-20 h-20 rounded-2xl bg-theme-card border border-theme flex items-center justify-center text-4xl mb-6">
          404
        </div>
        <h1 className="text-3xl font-bold text-theme-primary mb-3">Page Not Found</h1>
        <p className="text-theme-muted max-w-sm leading-relaxed mb-8">
          The page you're looking for doesn't exist or the URL may have changed.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link to="/" className="btn-primary">
            Back to Home
          </Link>
          <Link to="/projects" className="btn-secondary">
            Browse Projects
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/projects/:slug" element={<ProjectDetailPage />} />
      <Route path="/resume" element={<ResumePage />} />
      {/* Catch-all 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
