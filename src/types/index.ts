// ─── Portfolio Types ──────────────────────────────────────────────────────────

export type ProjectStatus = 'Completed' | 'In Progress' | 'Archived'

export interface Project {
  id: string
  slug: string
  title: string
  shortDescription: string
  fullDescription: string
  category: string
  technologies: string[]
  tags: string[]
  features: string[]
  thumbnail?: string
  imageAlt: string
  status: ProjectStatus
  featured: boolean
  featuredOrder?: number
  githubUrl?: string
  liveDemoUrl?: string
  completionDate?: string
  challenges?: string[]
  learnings?: string[]
}

export interface SkillCategory {
  category: string
  skills: string[]
}

export interface Experience {
  id: string
  role: string
  company: string
  location?: string
  duration: string
  responsibilities: string[]
}

export interface Education {
  id: string
  degree: string
  institution: string
  duration: string
  location: string
  status: 'In Progress' | 'Completed'
  cgpa?: string
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
}
