# Priyansh Masiyava — Developer Portfolio

A professional personal developer portfolio for **Priyansh Masiyava**, a Computer Engineering student focused on Python development, practical software projects, and web development.

**Live site:** _To be updated after Vercel deployment_  
**Repository:** https://github.com/PriyanshMasiyava/portfolio_web_PM

---

## Features

- Dark developer-studio design with midnight navy theme and violet accents
- Responsive layout for desktop, tablet, and mobile
- Hero section with animated role typewriter effect
- About, Skills, Experience, Education, Achievements, and Contact sections
- Searchable, filterable project showcase (`/projects`)
- Individual project detail pages (`/projects/:slug`)
- Featured project: [Awesome Python Projects Community](https://github.com/PriyanshMasiyava/awesome-python-projects-community)
- Printable resume page (`/resume`)
- Contact form with client-side validation and `mailto:` fallback
- Technical SEO — per-route `<title>`, meta descriptions, Open Graph, Twitter Card, JSON-LD structured data
- `robots.txt` and `sitemap.xml` (production domain must be configured after first deployment)
- 404 not-found page with React Router catch-all route
- Vercel SPA rewrite for clean URL refreshes

---

## Tech Stack

| Tool | Version |
|---|---|
| React | ^18.3 |
| TypeScript | ~5.6 |
| Vite | ^5.4 |
| Tailwind CSS | ^3.4 |
| React Router DOM | ^6.30 |
| Lucide React | ^1.56 |

---

## Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x

---

## Local Development

### 1. Clone the repository

```bash
git clone https://github.com/PriyanshMasiyava/portfolio_web_PM.git
cd portfolio_web_PM
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Run TypeScript type-check

```bash
npx tsc --noEmit
```

### 5. Run lint

```bash
npm run lint
```

### 6. Build for production

```bash
npm run build
```

Output is emitted to `dist/`.

### 7. Preview the production build locally

```bash
npm run preview
```

---

## Project Structure

```
PROTOFOLIYO/
├── public/
│   ├── robots.txt          # Crawler directives
│   ├── sitemap.xml         # XML sitemap (update domain after deployment)
│   ├── images/             # Static images (og-preview.png goes here)
│   └── resume/             # Resume PDF assets
├── src/
│   ├── components/         # Shared UI components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroSection.tsx
│   │   ├── FeaturedProjects.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── SEOHead.tsx     # JSON-LD structured data injection
│   │   └── ...
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── ProjectsPage.tsx
│   │   ├── ProjectDetailPage.tsx
│   │   └── ResumePage.tsx
│   ├── data/               # Centralized static data
│   │   ├── projects.ts     # All project definitions and helpers
│   │   ├── profile.ts
│   │   ├── skills.ts
│   │   ├── experience.ts
│   │   ├── education.ts
│   │   └── achievements.ts
│   ├── hooks/
│   │   └── useSEO.ts       # Per-route title/meta injection hook
│   ├── lib/
│   │   ├── seo.ts          # SEO config — set SITE_URL here after deployment
│   │   └── ThemeContext.tsx
│   ├── styles/
│   │   └── globals.css
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx             # Route definitions
│   └── main.tsx            # Application entry point
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
├── vercel.json             # SPA rewrite rule for React Router
└── package.json
```

---

## Deployment to Vercel

### Step 1 — Push to GitHub

Ensure this repository is pushed to:

```
https://github.com/PriyanshMasiyava/portfolio_web_PM
```

### Step 2 — Import to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in.
2. Click **Add New → Project**.
3. Select **Import Git Repository** and choose `PriyanshMasiyava/portfolio_web_PM`.
4. Vercel will auto-detect Vite. Confirm these settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
5. No environment variables are required for the base portfolio.
6. Click **Deploy**.

### Step 3 — After deployment

Once Vercel assigns a production URL (e.g. `https://portfolio-web-pm.vercel.app`):

1. Open `src/lib/seo.ts` and set:
   ```ts
   export const SITE_URL = 'https://your-production-url.vercel.app'
   ```
2. If you have an OG preview image at `public/images/og-preview.png`, also set:
   ```ts
   export const OG_IMAGE_PATH = '/images/og-preview.png'
   ```
3. Open `public/sitemap.xml` and replace every `YOUR-PRODUCTION-DOMAIN` with the real URL.
4. Open `public/robots.txt` and uncomment the `Sitemap:` line, updating it with the real URL.
5. Commit and push these changes — Vercel will redeploy automatically.
6. Optionally submit `sitemap.xml` to [Google Search Console](https://search.google.com/search-console).

### Notes

- **SPA routing:** `vercel.json` contains a catch-all rewrite rule so direct visits to `/projects`, `/projects/slug`, and `/resume` all work correctly after a browser refresh.
- **Contact form:** Uses a client-side `mailto:` link. No backend or API keys are required. Visitors send messages through their own email application.
- **Resume PDF:** Place the resume PDF at `public/resume/Priyansh_Masiyava_Resume.pdf`. The resume page links to this path.

---

## Environment Variables

No environment variables are required for deployment.

If you add an external service (e.g. a contact form API) in the future, add variables prefixed with `VITE_` to Vercel's project settings under **Settings → Environment Variables**. Never commit secret values to this repository.

---

## License

Personal portfolio — all rights reserved by Priyansh Masiyava.
