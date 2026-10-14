import { GraduationCap, Code2, Globe, Trophy, Users } from 'lucide-react'
import { profile } from '../data/profile'

const highlights = [
  { icon: GraduationCap, text: 'Computer Engineering student at SSASIT, Surat' },
  { icon: Code2,         text: 'Python Programming Intern at Oasis Infobyte' },
  { icon: Globe,         text: 'React.js Intern at Perffecto Solutions' },
  { icon: Code2,         text: 'Practical Python GUI and web development projects' },
  { icon: Trophy,        text: 'Participant in SSIP and SIH hackathons' },
  { icon: Users,         text: 'Open-source Python community founder on GitHub' },
]

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-theme-section-alt">
      <div className="section-container">
        <div className="mb-12 text-center">
          <p className="text-violet-400 text-sm font-semibold tracking-widest uppercase mb-2">
            Get to Know Me
          </p>
          <h2 className="section-heading text-theme-primary">
            About <span className="accent-text">Me</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <p className="text-theme-secondary text-lg leading-relaxed">
              {profile.summary}
            </p>
            <p className="text-theme-muted leading-relaxed">
              I enjoy building desktop and web applications that tackle practical
              challenges. From GUI-based expense trackers to real-time weather
              apps, I focus on writing clean, maintainable code that delivers
              real value.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href={`mailto:${profile.contact.email}`}
                className="text-sm text-violet-400 hover:text-violet-300 transition-colors underline underline-offset-4"
              >
                {profile.contact.email}
              </a>
              <a
                href={`tel:${profile.contact.phone.replace(/\s/g, '')}`}
                className="text-sm text-theme-muted hover:text-theme-secondary transition-colors"
              >
                {profile.contact.phone}
              </a>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {highlights.map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-start gap-3 p-4 bg-theme-card border border-theme rounded-xl
                           hover:border-violet-500/40 transition-all duration-200"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-violet-500/15 flex items-center justify-center">
                  <Icon size={16} className="text-violet-400" />
                </div>
                <p className="text-sm text-theme-secondary leading-snug">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
