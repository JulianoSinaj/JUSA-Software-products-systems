import { milestones } from '../../data/experience'
import { site } from '../../data/site'
import { cn } from '../../lib/cn'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export function Experience() {
  return (
    <section id="experience" className="border-t border-line py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="04 / Experience"
            title="Professional background."
            lead={`${site.founder} founded JUSA to bring formal computer science training and hands-on client delivery together under one name.`}
          />
          <Reveal delay={120}>
            <div className="mt-8 flex items-center gap-4 rounded-2xl border border-line bg-surface p-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand text-base font-semibold text-white">
                {site.founder
                  .split(' ')
                  .map((part) => part[0])
                  .join('')}
              </span>
              <div className="min-w-0">
                <p className="font-medium text-ink">{site.founder}</p>
                <p className="text-sm text-muted">{site.role}</p>
              </div>
            </div>
          </Reveal>
        </div>

        <ol className="relative">
          {/* Timeline rail */}
          <span
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-5 w-px bg-gradient-to-b from-accent via-line-strong to-transparent"
          />
          {milestones.map((milestone, index) => (
            <li key={milestone.title} className="relative pb-10 pl-16 last:pb-0">
              <Reveal delay={index * 100}>
                <span
                  className={cn(
                    'absolute top-0 left-0 flex size-10 items-center justify-center rounded-full border bg-canvas',
                    milestone.current ? 'border-accent text-accent-soft shadow-glow' : 'border-line-strong text-muted',
                  )}
                >
                  <milestone.icon className="size-[18px]" aria-hidden="true" />
                </span>

                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={cn(
                      'inline-flex items-center gap-2 rounded-full border px-2.5 py-1 font-mono text-[11px] tracking-[0.12em] uppercase',
                      milestone.current ? 'border-live/40 bg-live/10 text-live-soft' : 'border-line text-muted',
                    )}
                  >
                    {milestone.current && <span className="size-1.5 rounded-full bg-live" aria-hidden="true" />}
                    {milestone.when}
                  </span>
                  <span className="text-sm text-faint">{milestone.org}</span>
                </div>

                <h3 className="mt-3 text-lg font-semibold tracking-tight text-ink sm:text-xl">{milestone.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{milestone.body}</p>

                <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-ink">
                  {milestone.points.map((point) => (
                    <li key={point} className="inline-flex items-center gap-2">
                      <span className="size-1 rounded-full bg-accent-soft" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
