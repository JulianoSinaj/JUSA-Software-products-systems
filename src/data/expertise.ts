/** The four tools most engagements are built on. */
export interface CoreTool {
  name: string
  role: string
  note: string
  tags: string[]
}

export const coreStack: CoreTool[] = [
  {
    name: '.NET',
    role: 'C# · Web APIs',
    note: 'Layered services with clear domain boundaries — Domain, Application and Infrastructure kept apart from the first commit.',
    tags: ['C# .NET 10', 'REST', 'PostgreSQL', 'EF migrations'],
  },
  {
    name: 'FastAPI',
    role: 'Python · async',
    note: 'Lean, typed endpoints for data-heavy work.',
    tags: ['Python', 'Async', 'PostgreSQL'],
  },
  {
    name: 'React Native',
    role: 'iOS · Android',
    note: 'One codebase, backed by the same API as the web.',
    tags: ['React Native', 'GPS', 'Background tasks'],
  },
  {
    name: 'Docker',
    role: 'Delivery',
    note: 'Reproducible builds from laptop to production, shipped through CI/CD to Vercel and Render.',
    tags: ['Docker', 'CI/CD', 'Vercel', 'Render'],
  },
]

export interface StackLayer {
  layer: string
  items: string[]
}

/** The stack, read top-down the way a request travels through a system. */
export const stackLayers: StackLayer[] = [
  { layer: 'Interface', items: ['React', 'Tailwind CSS', 'Responsive UI', 'Web design'] },
  { layer: 'Mobile', items: ['React Native', 'Real-time GPS tracking', 'Background telemetry'] },
  { layer: 'API', items: ['C# · .NET 10', 'Python · FastAPI', 'RESTful services', 'Microservices'] },
  { layer: 'Data', items: ['PostgreSQL', 'Schema migrations', 'Layered domain models'] },
  { layer: 'Delivery', items: ['Docker', 'CI/CD workflows', 'Vercel', 'Render'] },
  { layer: 'Hardware', items: ['Arduino Uno R4', 'BLE mesh', 'MQTT'] },
]

export interface Principle {
  title: string
  body: string
}

export const principles: Principle[] = [
  {
    title: 'Architecture before code',
    body: 'Domain, application and infrastructure are separated from the first commit, so the system stays easy to change as requirements grow.',
  },
  {
    title: 'Secure by default',
    body: 'Authentication, validation and least-privilege access are part of the service contract, not a hardening pass at the end.',
  },
  {
    title: 'Built to be operated',
    body: 'Containerised builds and automated pipelines make every release repeatable, from the first deploy to the hundredth.',
  },
]
