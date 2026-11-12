import { Briefcase, GraduationCap, Rocket, type LucideIcon } from 'lucide-react'

export interface Milestone {
  icon: LucideIcon
  when: string
  title: string
  org: string
  body: string
  points: string[]
  current?: boolean
}

export const milestones: Milestone[] = [
  {
    icon: Rocket,
    when: 'Present',
    title: 'Founder · Full-Stack Software Developer & Web Design Engineer',
    org: 'JUSA',
    body: 'Leading engineering for JUSA: architecture, implementation, deployment and the design of every interface that ships.',
    points: [
      'Backend systems in .NET and FastAPI',
      'Web and mobile clients on a shared API',
      'Cloud delivery with Docker and CI/CD',
    ],
    current: true,
  },
  {
    icon: Briefcase,
    when: 'Client delivery',
    title: 'Full-Stack Client Delivery',
    org: 'KROX SHPK · Maria Maria · independent engagements',
    body: 'End-to-end delivery for client businesses, from first requirements to a live product: corporate websites, e-commerce platforms and mobile applications.',
    points: [
      'Corporate site with automated contact flows',
      'E-commerce with Stripe payments',
      'Fleet maintenance app with live tracking',
    ],
  },
  {
    icon: GraduationCap,
    when: 'July 2026',
    title: 'Degree in Computer Science',
    org: 'University of Camerino (UNICAM)',
    body: 'Formal grounding in software engineering and algorithms, completed with a thesis on an IoT device management platform.',
    points: ['Software architecture', 'Algorithms and data structures', 'IoT thesis: MQTT device management'],
  },
]
