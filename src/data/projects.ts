/** Which illustrated preview to draw when no screenshot is supplied. */
export type ProjectArt = 'web' | 'commerce' | 'mobile' | 'api'

export interface Project {
  /** Short display name, set large in the serif. */
  name: string
  art: ProjectArt
  /**
   * Optional screenshot, e.g. '/projects/krox.jpg' (put the file in
   * public/projects/). Replaces the illustrated preview when set.
   */
  image?: string
  kind: string
  summary: string
  highlights: string[]
  stack: string[]
  /** Public deployment. Omit when there is none to link. */
  liveUrl?: string
  /** Public repository. Omit for private or client-owned code. */
  repoUrl?: string
  /** Shown in place of links that cannot be public. */
  accessNote?: string
}

export const projects: Project[] = [
  {
    name: 'KROX',
    art: 'web',
    kind: 'Corporate website · KROX SHPK',
    summary:
      'A corporate presence that presents the company clearly on every screen size and turns visits into qualified inquiries.',
    highlights: ['Responsive carousels', 'Automated contact flows', 'Deployed on Vercel'],
    stack: ['JavaScript', 'Responsive UI', 'Vercel'],
    liveUrl: 'https://krox-design.vercel.app',
    repoUrl: 'https://github.com/JulianoSinaj/KROX-Design',
  },
  {
    name: 'Maria Maria',
    art: 'commerce',
    kind: 'Boutique wine e-commerce',
    summary: 'A wine storefront where each label gets its own story, and checkout is handled end to end.',
    highlights: ['Story-led landing pages', 'Stripe payments', 'Regional maps'],
    stack: ['E-commerce', 'Stripe', 'Maps'],
    accessNote: 'Client engagement — walkthrough on request',
  },
  {
    name: 'Vehicle App',
    art: 'mobile',
    kind: 'Fleet maintenance · mobile',
    summary:
      'A maintenance tracker for drivers and fleet operators, with time- and mileage-based reminders driven by live GPS data.',
    highlights: ['Driver and admin roles', 'Background GPS processing', 'Maintenance reminders'],
    stack: ['React Native', 'Python', 'PostgreSQL'],
    accessNote: 'Private repository — walkthrough on request',
  },
  {
    name: 'School Library',
    art: 'api',
    kind: 'Library management · Web API',
    summary:
      'A library backend for teachers and students, built as a layered Web API with a managed database and containerised deployment.',
    highlights: ['Domain / Application / Infrastructure layers', 'PostgreSQL on Render', 'Docker'],
    stack: ['.NET 10', 'PostgreSQL', 'Docker', 'Render'],
    repoUrl: 'https://github.com/JulianoSinaj/School-Library-Teacher-Student',
  },
]
