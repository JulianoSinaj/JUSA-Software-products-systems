/**
 * Single source of truth for brand and contact details.
 * Empty strings are treated as "not configured": the matching link or
 * channel is simply not rendered, so nothing ships pointing nowhere.
 */
interface SiteConfig {
  name: string
  founder: string
  role: string
  badge: string
  email: string
  links: { github: string; githubHandle: string; linkedin: string }
}

export const site: SiteConfig = {
  name: 'JUSA',
  founder: 'Juliano Sinaj',
  role: 'Full-Stack Software Developer & Web Design Engineer',
  badge: 'JUSA // Enterprise Software & Engineering Excellence',

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
  { id: 'solutions', label: 'Enterprise Solutions' },
  { id: 'projects', label: 'Featured Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
] as const

export type SectionId = (typeof navLinks)[number]['id']
