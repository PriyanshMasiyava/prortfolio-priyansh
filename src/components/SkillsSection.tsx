import { skillCategories } from '../data/skills'

const categoryIcons: Record<string, string> = {
  'Programming Languages': '{ }',
  'Frameworks & Libraries': '⚙',
  'Web Technologies': '🌐',
  Databases: '🗄',
  'Tools & Platforms': '🛠',
}

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 bg-theme-section">
      <div className="section-container">
        <div className="mb-12 text-center">
          <p className="text-violet-400 text-sm font-semibold tracking-widest uppercase mb-2">
            Technologies I Work With
          </p>
          <h2 className="section-heading text-theme-primary">
            Technical <span className="accent-text">Skills</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map(({ category, skills }) => (
            <div
              key={category}
              className="bg-theme-card border border-theme rounded-xl p-6
                         hover:border-violet-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/5"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-lg bg-violet-500/15 border border-violet-500/30
                               flex items-center justify-center text-base font-mono text-violet-400 select-none">
                  {categoryIcons[category] ?? '◆'}
                </div>
                <h3 className="text-sm font-semibold text-theme-primary">
                  {category}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                  <span key={skill} className="tech-chip">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
