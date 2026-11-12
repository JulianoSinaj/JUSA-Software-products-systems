import { ArrowUpRight } from 'lucide-react'
import { site } from '../../data/site'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { StatusDot } from '../ui/StatusDot'
import { ContactForm } from './ContactForm'

interface Channel {
  label: string
  value: string
  href: string
  external: boolean
}

const channels: Channel[] = [
  site.email && { label: 'Email', value: site.email, href: `mailto:${site.email}`, external: false },
  { label: 'GitHub', value: `@${site.links.githubHandle}`, href: site.links.github, external: true },
  site.links.linkedin && { label: 'LinkedIn', value: site.founder, href: site.links.linkedin, external: true },
].filter((channel): channel is Channel => Boolean(channel))

export function Contact() {
  return (
    <section id="contact" className="border-t border-line py-32 sm:py-44">
      <div className="frame grid gap-20 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionHeading
            index="05"
            label="Contact"
            title="Have something"
            accent="in mind?"
            lead="Tell me what you are building. A short brief is enough to start a conversation about scope, architecture and timing."
          />

          <Reveal delay={100}>
            <dl className="mt-14 space-y-7">
              {channels.map((channel) => (
                <div key={channel.label}>
                  <dt className="meta text-faint">{channel.label}</dt>
                  <dd className="mt-2">
                    <a
                      href={channel.href}
                      {...(channel.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                      className="group inline-flex items-center gap-2 text-lg text-ink"
                    >
                      <span className="link-line-rest">{channel.value}</span>
                      <ArrowUpRight
                        className="size-4 text-muted transition-[transform,color] duration-300 group-hover:translate-x-px group-hover:-translate-y-px group-hover:text-accent"
                        aria-hidden="true"
                      />
                      {channel.external && <span className="sr-only"> (opens in a new tab)</span>}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>

            <p className="meta mt-14 inline-flex items-center gap-2.5 text-muted">
              <StatusDot />
              {site.availability}
            </p>
          </Reveal>
        </div>

        <Reveal delay={160} className="lg:col-span-6 lg:col-start-7">
          <div className="rounded-[1.25rem] border border-white/10 bg-surface/80 shadow-card backdrop-blur-sm transition-[border-color,box-shadow] duration-500 focus-within:border-accent/25 focus-within:shadow-[var(--shadow-card),0_40px_90px_-50px_rgb(245_158_11/0.35)]">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
