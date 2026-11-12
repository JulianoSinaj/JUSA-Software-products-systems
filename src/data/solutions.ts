import { CloudCog, Cpu, Layers, Smartphone, type LucideIcon } from 'lucide-react'

export interface Solution {
  icon: LucideIcon
  title: string
  summary: string
  capabilities: string[]
  stack: string[]
}

export const solutions: Solution[] = [
  {
    icon: Layers,
    title: 'Full-Stack Web & API Architecture',
    summary:
      'Backend systems designed around clear contracts: typed APIs, layered services and interfaces that hold up under real traffic and real change.',
    capabilities: [
      'RESTful services with versioned, documented contracts',
      'Secure microservices and service-to-service boundaries',
      'Responsive web front ends wired to the same API',
    ],
    stack: ['C# .NET 10', 'Python FastAPI', 'REST', 'Microservices'],
  },
  {
    icon: CloudCog,
    title: 'Cloud Deployment & DevOps',
    summary:
      'From repository to running service without manual steps. Containers, managed databases and pipelines that build, test and ship on every push.',
    capabilities: [
      'Docker images for reproducible builds and environments',
      'Automated CI/CD workflows from commit to release',
      'Vercel and Render infrastructure with managed PostgreSQL',
    ],
    stack: ['Docker', 'PostgreSQL', 'CI/CD', 'Vercel', 'Render'],
  },
  {
    icon: Smartphone,
    title: 'Cross-Platform & Mobile Solutions',
    summary:
      'One React Native codebase for iOS and Android, backed by the same APIs as the web platform and tuned for a seamless day-to-day experience.',
    capabilities: [
      'Real-time location tracking and background processing',
      'Role-based experiences for individuals and enterprise admins',
      'Reminders and notifications driven by live data',
    ],
    stack: ['React Native', 'Real-time tracking', 'Python backend'],
  },
  {
    icon: Cpu,
    title: 'Hardware & IoT Systems Integration',
    summary:
      'Software that reaches the physical world: microcontroller prototypes, device-to-device communication and the dashboards that monitor them.',
    capabilities: [
      'Microcontroller prototyping on Arduino Uno R4',
      'BLE mesh communication between devices',
      'Device data surfaced in web and mobile interfaces',
    ],
    stack: ['Arduino Uno R4', 'BLE mesh', 'Embedded C'],
  },
]
