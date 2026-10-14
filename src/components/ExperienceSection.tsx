import { MapPin, Calendar, CheckCircle2 } from 'lucide-react'
import { experiences } from '../data/experience'

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20 bg-theme-section">
      <div className="section-container">
        <div className="mb-12 text-center">
          <p className="text-violet-400 text-sm font-semibold tracking-widest uppercase mb-2">
            Where I've Worked
          </p>
          <h2 className="section-heading text-theme-primary">
            Work <span className="accent-text">Experience</span>
          </h2>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/60 via-violet-500/20 to-transparent hidden sm:block" />

          <div className="space-y-10">
            {experiences.map((exp) => (
              <div key={exp.id} className="relative sm:pl-16">
                {/* Timeline dot */}
                <div className="absolute left-4 top-6 w-5 h-5 rounded-full bg-theme-page border-2 border-violet-500
                               flex items-center justify-center hidden sm:flex -translate-x-1/2">
                  <div className="w-2 h-2 rounded-full bg-violet-400" />
                </div>

                <div className="bg-theme-card border border-theme rounded-xl p-6
                               hover:border-violet-500/40 transition-all duration-300">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-theme-primary">
                        {exp.role}
                      </h3>
                      <p className="text-violet-400 font-semibold text-sm mt-0.5">
                        {exp.company}
                      </p>
                    </div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-violet-500/10 border border-violet-500/30 text-violet-400">
                      Internship
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4 mb-5 text-sm text-theme-subtle">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={13} />
                      {exp.duration}
                    </span>
                    {exp.location && (
                      <span className="flex items-center gap-1.5">
                        <MapPin size={13} />
                        {exp.location}
                      </span>
                    )}
                  </div>

                  <ul className="space-y-2">
                    {exp.responsibilities.map(r => (
                      <li key={r} className="flex items-start gap-2.5 text-sm text-theme-muted">
                        <CheckCircle2 size={14} className="text-teal-400 flex-shrink-0 mt-0.5" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
