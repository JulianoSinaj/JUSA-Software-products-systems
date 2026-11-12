import type { ReactNode } from 'react'
import { ArrowUpRight, Mail } from 'lucide-react'
import { site } from '../../data/site'
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { ContactForm } from './ContactForm'

interface Channel {
  icon: ReactNode
  label: string
  value: string
  href: string
  external: boolean
}

const channels: Channel[] = [
  {
    icon: <GithubIcon className="size-[18px]" />,
    label: 'GitHub',
    value: `@${site.links.githubHandle}`,
    href: site.links.github,
    external: true,
  },
  ...(site.links.linkedin
    ? [
        {
          icon: <LinkedinIcon className="size-[18px]" />,
          label: 'LinkedIn',
          value: site.founder,
          href: site.links.linkedin,
          external: true,
        },
      ]
    : []),
  ...(site.email
    ? [
        {
          icon: <Mail className="size-[18px]" aria-hidden="true" />,
          label: 'Professional inquiries',
          value: site.email,
          href: `mailto:${site.email}`,
          external: false,
        },
      ]
    : []),
]

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-line py-20 sm:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -bottom-48 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-accent/15 blur-[120px]" />
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="05 / Contact"
            title="Start a collaboration."
            lead="Share what you are building. A short brief is enough to open the conversation about scope, architecture and delivery."
          />

          <ul className="mt-10 space-y-3">
            {channels.map((channel, index) => (
              <li key={channel.label}>
                <Reveal delay={index * 80}>
                  <a
                    href={channel.href}
                    {...(channel.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                    className="group flex items-center gap-4 rounded-2xl border border-line bg-surface p-4 transition-colors duration-200 hover:border-line-strong"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-line bg-canvas text-ink">
                      {channel.icon}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-mono text-[11px] tracking-[0.16em] text-faint uppercase">
                        {channel.label}
                      </span>
                      <span className="block truncate text-[15px] font-medium text-ink">{channel.value}</span>
                    </span>
                    <ArrowUpRight
                      className="ml-auto size-4 shrink-0 text-faint transition-[color,transform] duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-live-soft"
                      aria-hidden="true"
                    />
                  </a>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        <Reveal delay={120}>
          <div className="glass overflow-hidden rounded-2xl shadow-card">
            <div className="flex items-center justify-between border-b border-line px-5 py-3 sm:px-8">
              <span className="font-mono text-xs text-muted">new-inquiry</span>
              <span className="inline-flex items-center gap-2 font-mono text-[11px] text-live-soft">
                <span className="size-1.5 rounded-full bg-live" aria-hidden="true" />
                Open to new projects
              </span>
            </div>
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
