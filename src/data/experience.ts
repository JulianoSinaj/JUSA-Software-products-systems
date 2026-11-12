export interface Milestone {
  when: string
  title: string
  org: string
  body: string
  points: string[]
  current?: boolean
}

export const milestones: Milestone[] = [
  {
    when: 'Present',
    title: 'Founder, full-stack engineer',
    org: 'JUSA',
    body: 'Architecture, implementation, deployment and the design of every interface that ships.',
    points: ['Backend systems in .NET and FastAPI', 'Web and mobile clients on a shared API', 'Delivery with Docker and CI/CD'],
    current: true,
  },
  {
    when: 'Client work',
    title: 'Full-stack client delivery',
    org: 'KROX SHPK · Maria Maria · independent clients',
    body: 'End-to-end delivery for client businesses, from first requirements to a live product: corporate websites, e-commerce and mobile applications.',
    points: ['Corporate site with automated contact flows', 'E-commerce with Stripe payments', 'Fleet maintenance app with live tracking'],
  },
  {
    when: 'July 2026',
    title: 'Degree in Computer Science',
    org: 'University of Camerino (UNICAM)',
    body: 'A formal grounding in software engineering and algorithms, completed with a thesis on an IoT device management platform.',
    points: ['Software architecture', 'Algorithms and data structures', 'Thesis: MQTT device management'],
  },
]
