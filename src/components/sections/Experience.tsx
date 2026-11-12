import { milestones } from '../../data/experience'
import { site } from '../../data/site'
import { cn } from '../../lib/cn'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { StatusDot } from '../ui/StatusDot'

const initials = site.founder
  .split(' ')
  .map((part) => part[0])
  .join('')

export function Experience() {
  return (
    <section id="experience" className="border-t border-line py-32 sm:py-44">
      <div className="frame grid gap-20 lg:grid-cols-12 lg:gap-10">
        <div className="lg:sticky lg:top-32 lg:col-span-4 lg:self-start">
          <SectionHeading
            index="04"
            label="Background"
            title="Training, then"
            accent="delivery."
            lead={`${site.founder} founded ${site.name} to bring formal computer-science training and hands-on client work together under one name.`}
          />
          <Reveal delay={120}>
            <div className="mt-12 flex items-center gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-line-strong font-serif text-lg text-ink italic">
                {initials}
              </span>
              <div className="min-w-0">
                <p className="text-sm text-ink">{site.founder}</p>
                <p className="mt-0.5 text-sm text-muted">{site.role}</p>
              </div>
            </div>
          </Reveal>
        </div>

        <ol className="border-t border-line lg:col-span-7 lg:col-start-6">
          {milestones.map((milestone, index) => (
            <li key={milestone.title} className="border-b border-line">
              <Reveal delay={index * 80} className="grid gap-5 py-12 sm:grid-cols-[9rem_1fr] sm:gap-8">
                <p className={cn('meta inline-flex items-center gap-2.5 self-start sm:pt-2', milestone.current ? 'text-ink' : 'text-faint')}>
                  {milestone.current && <StatusDot />}
                  {milestone.when}
                </p>

                <div>
                  <h3 className="display text-[2rem] text-ink sm:text-4xl">{milestone.title}</h3>
                  <p className="mt-3 text-sm text-faint">{milestone.org}</p>
                  <p className="mt-6 text-[15px] leading-[1.75] text-muted">{milestone.body}</p>
                  <ul className="mt-6 space-y-2.5 text-sm text-ink/90">
                    {milestone.points.map((point) => (
                      <li key={point} className="flex gap-3">
                        <span className="mt-[0.7em] h-px w-3 shrink-0 bg-faint" aria-hidden="true" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
