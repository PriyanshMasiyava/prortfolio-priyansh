import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import AboutSection from '../components/AboutSection'
import SkillsSection from '../components/SkillsSection'
import FeaturedProjects from '../components/FeaturedProjects'
import ExperienceSection from '../components/ExperienceSection'
import EducationSection from '../components/EducationSection'
import AchievementsSection from '../components/AchievementsSection'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'
import SEOHead from '../components/SEOHead'
import { useSEO } from '../hooks/useSEO'
import { pageMeta } from '../lib/seo'

export default function Home() {
  useSEO(pageMeta.home)

  return (
    <div className="min-h-screen bg-theme-page text-theme-primary">
      {/* Both Person and WebSite schemas on the homepage */}
      <SEOHead type="person" />
      <SEOHead type="website" />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <FeaturedProjects />
        <ExperienceSection />
        <EducationSection />
        <AchievementsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
