import { BookOpen, Building2, Truck, Wine, type LucideIcon } from 'lucide-react'

export interface Project {
  icon: LucideIcon
  kind: string
  title: string
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
    icon: Building2,
    kind: 'Corporate website',
    title: 'KROX SHPK Corporate Website',
    summary:
      'A corporate presence for KROX SHPK that presents the company with clarity on every screen size and turns visits into qualified inquiries.',
    highlights: ['Responsive carousels', 'Automated contact flows', 'Deployed on Vercel'],
    stack: ['JavaScript', 'Responsive UI', 'Vercel'],
    liveUrl: 'https://krox-design.vercel.app',
    repoUrl: 'https://github.com/JulianoSinaj/KROX-Design',
  },
  {
    icon: Wine,
    kind: 'E-commerce platform',
    title: 'Maria Maria Boutique Wine Platform',
    summary:
      'A boutique wine storefront where landing pages tell the story of each label and checkout is handled end to end.',
    highlights: ['E-commerce landing pages', 'Stripe payments', 'Regional maps'],
    stack: ['E-commerce', 'Stripe', 'Maps'],
    accessNote: 'Client engagement — walkthrough on request',
  },
  {
    icon: Truck,
    kind: 'Mobile application',
    title: 'Vehicle & Fleet Maintenance Mobile App',
    summary:
      'A maintenance tracker for individual drivers and fleet operators, with time- and mileage-based reminders driven by live GPS telemetry.',
    highlights: ['Multi-tenant driver and admin roles', 'Background GPS processing', 'Maintenance reminders'],
    stack: ['React Native', 'Python', 'PostgreSQL'],
    accessNote: 'Private repository — walkthrough on request',
  },
  {
    icon: BookOpen,
    kind: 'Web API',
    title: 'School Library Management System',
    summary:
      'A library management backend for teachers and students, built as a layered Web API with a managed database and containerised deployment.',
    highlights: ['Domain / Application / Infrastructure layers', 'PostgreSQL on Render', 'Docker containerisation'],
    stack: ['.NET 10 Web API', 'PostgreSQL', 'Docker', 'Render'],
    repoUrl: 'https://github.com/JulianoSinaj/School-Library-Teacher-Student',
  },
]
