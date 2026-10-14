import type { Project } from '../types'

export const projects: Project[] = [
  // ─── Featured: Awesome Python Projects Community ───────────────────────────
  {
    id: 'awesome-python-projects-community',
    slug: 'awesome-python-projects-community',
    title: 'Awesome Python Projects Community',
    shortDescription:
      'An open-source Python projects community designed to encourage developers to explore Python projects, collaborate, share ideas, and contribute to community-driven development.',
    fullDescription:
      'Awesome Python Projects Community is an open-source initiative that brings together Python developers of all skill levels. The repository serves as a curated hub where developers can discover interesting Python projects, contribute their own work, exchange ideas, and grow together through collaborative development. The community is built around the belief that open-source collaboration is the best way to learn, improve, and create meaningful software.',
    category: 'Open Source',
    technologies: ['Python', 'Open Source', 'GitHub'],
    tags: ['community', 'python', 'open-source', 'collaboration', 'projects'],
    features: [
      'Curated collection of Python projects for developers',
      'Community-driven contributions and collaboration',
      'Encourages developers to explore and share Python projects',
      'Open to contributors at all experience levels',
      'Hosted publicly on GitHub for transparency and accessibility',
    ],
    imageAlt: 'Awesome Python Projects Community — Open source GitHub repository',
    status: 'In Progress',
    featured: true,
    featuredOrder: 1,
    githubUrl: 'https://github.com/PriyanshMasiyava/awesome-python-projects-community',
    challenges: [
      'Building and growing an open-source community from scratch',
      'Maintaining repository quality while welcoming contributions from diverse contributors',
      'Structuring the repository to be discoverable and navigable',
    ],
    learnings: [
      'Open-source community management and contribution workflows',
      'Importance of clear documentation for attracting contributors',
      'Structuring repositories for long-term discoverability',
    ],
  },

  // ─── Expense Tracker Application ──────────────────────────────────────────
  {
    id: 'expense-tracker',
    slug: 'expense-tracker',
    title: 'Expense Tracker Application',
    shortDescription:
      'A GUI-based expense management application built with Python and Tkinter, featuring full CRUD operations, SQLite storage, CSV/PDF export, and Matplotlib visualizations.',
    fullDescription:
      'The Expense Tracker Application is a full-featured desktop application built using Python and Tkinter. It provides users with a clean graphical interface to manage their personal finances. Data is stored persistently in SQLite, ensuring reliability and speed. The application supports creating, reading, updating, and deleting expense records, and includes search and filtering capabilities to help users find specific transactions quickly. Spending patterns are visualized through Matplotlib bar charts, and data can be exported to CSV or PDF formats for external use.',
    category: 'Desktop Application',
    technologies: ['Python', 'Tkinter', 'SQLite', 'Matplotlib'],
    tags: ['finance', 'desktop', 'gui', 'data-visualization', 'crud'],
    features: [
      'Create, read, update, and delete expense records',
      'SQLite database for persistent data storage',
      'Search and filtering of expense records',
      'CSV and PDF export functionality',
      'Matplotlib bar charts for expense visualization',
      'User-friendly graphical interface',
    ],
    imageAlt: 'Expense Tracker Application — Python Tkinter desktop GUI',
    status: 'Completed',
    featured: true,
    featuredOrder: 2,
    completionDate: '2024',
    challenges: [
      'Designing an intuitive GUI layout with Tkinter widgets',
      'Implementing reliable CSV and PDF export pipelines',
      'Ensuring database integrity across CRUD operations',
    ],
    learnings: [
      'Tkinter GUI layout and event handling patterns',
      'SQLite integration and query optimization for desktop apps',
      'Data visualization with Matplotlib in a GUI context',
    ],
  },

  // ─── Weather Application ──────────────────────────────────────────────────
  {
    id: 'weather-application',
    slug: 'weather-application',
    title: 'Weather Application',
    shortDescription:
      'A GUI-based weather application built with Python and Tkinter that fetches real-time weather data via the OpenWeather API, displaying temperature, humidity, wind speed, and conditions.',
    fullDescription:
      'The Weather Application is a desktop application developed in Python using the Tkinter framework. It integrates with the OpenWeather API to provide real-time weather information for any city. Users can enter a city name and instantly receive current temperature, humidity, wind speed, and weather conditions. The application includes robust input validation and exception handling to provide a smooth experience even when network issues or invalid city names are encountered.',
    category: 'Desktop Application',
    technologies: ['Python', 'Tkinter', 'OpenWeather API', 'REST API'],
    tags: ['weather', 'api-integration', 'desktop', 'gui', 'real-time'],
    features: [
      'Real-time weather data via the OpenWeather API',
      'Displays temperature, humidity, wind speed, and conditions',
      'City name input with validation',
      'Exception handling for network errors and invalid inputs',
      'Clean and responsive graphical user interface',
    ],
    imageAlt: 'Weather Application — Python Tkinter desktop GUI showing weather data',
    status: 'Completed',
    featured: true,
    featuredOrder: 3,
    completionDate: '2024',
    challenges: [
      'Handling API rate limits and network failures gracefully',
      'Parsing and displaying varied JSON structures from the weather API',
      'Providing meaningful error feedback in the GUI',
    ],
    learnings: [
      'REST API integration patterns in Python',
      'Robust exception handling for networked desktop applications',
      'User-friendly error messaging design',
    ],
  },

  // ─── Advanced BMI Calculator ──────────────────────────────────────────────
  {
    id: 'bmi-calculator',
    slug: 'bmi-calculator',
    title: 'Advanced BMI Calculator',
    shortDescription:
      'A Python desktop application for calculating BMI with input validation, result history, and visual feedback built using Tkinter.',
    fullDescription:
      'The Advanced BMI Calculator is a Python desktop application built with Tkinter. It provides a straightforward interface for calculating Body Mass Index based on user-provided height and weight values. The application includes input validation to prevent erroneous calculations and provides categorized BMI results. Additional features may include calculation history and basic data visualization depending on the implementation.',
    category: 'Desktop Application',
    technologies: ['Python', 'Tkinter', 'CSV'],
    tags: ['health', 'calculator', 'desktop', 'gui'],
    features: [
      'BMI calculation with height and weight inputs',
      'Input validation to prevent invalid calculations',
      'BMI category classification (Underweight, Normal, Overweight, Obese)',
      'Calculation history tracking',
      'User-friendly desktop interface',
    ],
    imageAlt: 'Advanced BMI Calculator — Python Tkinter desktop application',
    status: 'Completed',
    featured: false,
    completionDate: '2024',
    challenges: [
      'Validating diverse user inputs robustly',
      'Presenting health data categories clearly in a GUI',
    ],
    learnings: [
      'Building health-focused utility applications in Python',
      'Input validation patterns for numerical data',
    ],
  },

  // ─── Password Generator ───────────────────────────────────────────────────
  {
    id: 'password-generator',
    slug: 'password-generator',
    title: 'Password Generator',
    shortDescription:
      'A configurable Python desktop application for generating strong, random passwords with Tkinter GUI, supporting character type selection and clipboard copy.',
    fullDescription:
      'The Password Generator is a Python desktop utility built with Tkinter that allows users to generate secure random passwords. Users can configure the desired password length and choose which character types to include, such as uppercase letters, lowercase letters, digits, and special characters. The generated password can be copied to the clipboard for immediate use.',
    category: 'Desktop Application',
    technologies: ['Python', 'Tkinter'],
    tags: ['security', 'utility', 'desktop', 'gui', 'password'],
    features: [
      'Configurable password length',
      'Character type selection (uppercase, lowercase, digits, special characters)',
      'Clipboard copy functionality',
      'Instant password generation',
      'User-friendly desktop interface',
    ],
    imageAlt: 'Password Generator — Python Tkinter desktop application',
    status: 'Completed',
    featured: false,
    completionDate: '2024',
    challenges: [
      'Ensuring cryptographically strong randomness for generated passwords',
      'Providing flexible configuration without overcomplicating the UI',
    ],
    learnings: [
      'Python secrets and random modules for secure generation',
      'Building practical security utilities with desktop GUIs',
    ],
  },

  // ─── Chat Application ─────────────────────────────────────────────────────
  {
    id: 'chat-application',
    slug: 'chat-application',
    title: 'Chat Application',
    shortDescription:
      'A Python-based chat application exploring client-server architecture for real-time messaging.',
    fullDescription:
      'The Chat Application is a Python project exploring real-time client-server communication. The application is built using Python networking capabilities. Implementation details including the complete feature set, database integration, and production-readiness are subject to verification from the source repository.',
    category: 'Desktop Application',
    technologies: ['Python'],
    tags: ['networking', 'chat', 'client-server', 'python'],
    features: [
      'Client-server architecture for real-time messaging',
      'Python socket-based networking',
      'Basic message exchange between clients',
    ],
    imageAlt: 'Chat Application — Python client-server messaging project',
    status: 'In Progress',
    featured: false,
    challenges: [
      'Implementing reliable real-time message delivery',
      'Managing concurrent client connections',
    ],
    learnings: [
      'Python socket programming and networking fundamentals',
      'Client-server architecture design patterns',
    ],
  },

  // ─── Django Student Management ────────────────────────────────────────────
  {
    id: 'django-student-management',
    slug: 'django-student-management',
    title: 'Django Student Management Application',
    shortDescription:
      'A web-based student management system built with Python and Django, supporting CRUD operations, search, and administrative workflows.',
    fullDescription:
      'The Django Student Management Application is a web application built with Python and the Django framework. It provides an administrative interface for managing student records. Core functionality includes creating, reading, updating, and deleting student data. The application leverages Django\'s ORM for database interactions and its template engine for the front end. Additional features such as image uploads, search, and pagination may be present and are subject to verification from the source repository.',
    category: 'Web Development',
    technologies: ['Python', 'Django', 'HTML', 'CSS'],
    tags: ['web', 'django', 'crud', 'admin', 'management'],
    features: [
      'Student record management with CRUD operations',
      'Django ORM-based database interactions',
      'Search functionality for student records',
      'Web-based administrative interface',
      'Django template-powered front end',
    ],
    imageAlt: 'Django Student Management Application — web-based admin interface',
    status: 'Completed',
    featured: false,
    completionDate: '2024',
    challenges: [
      'Structuring Django models for flexible student data',
      'Implementing search and pagination in Django views',
    ],
    learnings: [
      'Django MVT architecture and ORM patterns',
      'Building administrative CRUD interfaces with Django',
    ],
  },
]

// ─── Helper: get featured projects in order ──────────────────────────────────

export const featuredProjects = projects
  .filter(p => p.featured)
  .sort((a, b) => (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99))

// ─── Helper: get project by slug ─────────────────────────────────────────────

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug)
}

// ─── Helper: get related projects ────────────────────────────────────────────

export function getRelatedProjects(slug: string, count = 3): Project[] {
  const current = projects.find(p => p.slug === slug)
  if (!current) return []
  return projects
    .filter(p => p.slug !== slug)
    .sort((a, b) => {
      const aShared = a.technologies.filter(t => current.technologies.includes(t)).length
      const bShared = b.technologies.filter(t => current.technologies.includes(t)).length
      return bShared - aShared
    })
    .slice(0, count)
}

// ─── Helper: all unique categories ───────────────────────────────────────────

export const allCategories = ['All Projects', ...Array.from(new Set(projects.map(p => p.category)))]

// ─── Helper: all unique technologies ─────────────────────────────────────────

export const allTechnologies = Array.from(
  new Set(projects.flatMap(p => p.technologies))
).sort()
