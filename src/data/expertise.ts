import { Blocks, Gauge, ShieldCheck, type LucideIcon } from 'lucide-react'

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
  icon: LucideIcon
  title: string
  body: string
}

export const principles: Principle[] = [
  {
    icon: Blocks,
    title: 'Architecture before code',
    body: 'Domain, application and infrastructure are separated from the first commit, so systems stay changeable as requirements grow.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure by default',
    body: 'Authentication, validation and least-privilege access are part of the service contract, not a hardening pass at the end.',
  },
  {
    icon: Gauge,
    title: 'Built to be operated',
    body: 'Containerised builds and automated pipelines make every release repeatable, from a first deploy to the hundredth.',
  },
]
