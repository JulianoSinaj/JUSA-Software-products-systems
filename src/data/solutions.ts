export interface Solution {
  title: string
  summary: string
  capabilities: string[]
  stack: string[]
}

export const solutions: Solution[] = [
  {
    title: 'Web & API architecture',
    summary:
      'Backend systems designed around clear contracts: typed APIs, layered services and web interfaces that hold up under real traffic and real change.',
    capabilities: [
      'RESTful services with versioned, documented contracts',
      'Secure service boundaries and authentication',
      'Responsive web front ends wired to the same API',
    ],
    stack: ['C# .NET 10', 'Python FastAPI', 'React'],
  },
  {
    title: 'Cloud & delivery',
    summary:
      'From repository to running service without manual steps. Containers, managed databases and pipelines that build, test and ship on every push.',
    capabilities: [
      'Docker images for reproducible environments',
      'Automated CI/CD from commit to release',
      'Vercel and Render with managed PostgreSQL',
    ],
    stack: ['Docker', 'PostgreSQL', 'CI/CD', 'Vercel', 'Render'],
  },
  {
    title: 'Mobile applications',
    summary:
      'One React Native codebase for iOS and Android, backed by the same APIs as the web platform and tuned for everyday use.',
    capabilities: [
      'Real-time location and background processing',
      'Separate experiences for individual users and admins',
      'Reminders and notifications driven by live data',
    ],
    stack: ['React Native', 'Python', 'PostgreSQL'],
  },
  {
    title: 'Hardware & IoT',
    summary:
      'Software that reaches the physical world: microcontroller prototypes, device-to-device communication and the dashboards that monitor them.',
    capabilities: [
      'Microcontroller prototyping on Arduino Uno R4',
      'BLE mesh communication between devices',
      'Device data surfaced in web and mobile interfaces',
    ],
    stack: ['Arduino', 'BLE mesh', 'MQTT', 'Embedded C'],
  },
]
