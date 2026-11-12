/**
 * Single source of truth for brand and contact details.
 * Empty strings are treated as "not configured": the matching link or
 * channel is simply not rendered, so nothing ships pointing nowhere.
 */
interface SiteConfig {
  name: string
  founder: string
  role: string
  /** Short status line shown next to the amber dot. */
  availability: string
  /** Hero status badge: status, then studio name. */
  badge: { status: string; studio: string }
  email: string
  links: { github: string; githubHandle: string; linkedin: string }
}

export const site: SiteConfig = {
  name: 'JUSA',
  founder: 'Juliano Sinaj',
  role: 'Full-stack software engineer',
  availability: 'Open to new projects',
  badge: { status: 'Available for Enterprise Projects', studio: 'JUSA Studio' },

  /** Professional inquiry address, e.g. 'hello@jusa.dev'. */
  email: '',

  links: {
    github: 'https://github.com/JulianoSinaj',
    githubHandle: 'JulianoSinaj',
    /** Full profile URL, e.g. 'https://www.linkedin.com/in/your-handle'. */
    linkedin: '',
  },
}

export const navLinks = [
  { id: 'expertise', label: 'Expertise' },
  { id: 'solutions', label: 'Services' },
  { id: 'projects', label: 'Work' },
  { id: 'experience', label: 'Background' },
  { id: 'contact', label: 'Contact' },
] as const

export type SectionId = (typeof navLinks)[number]['id']
