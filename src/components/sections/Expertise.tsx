import { principles, stackLayers } from '../../data/expertise'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export function Expertise() {
  return (
    <section id="expertise" className="border-t border-line py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="01 / Expertise"
              title="Core competencies across the whole system."
              lead="One engineer accountable for every layer: the interface a customer touches, the services behind it, the database underneath and the pipeline that ships it."
            />
          </div>

          {/* Stack matrix: one row per layer of the system. */}
          <Reveal delay={120}>
            <dl className="overflow-hidden rounded-2xl border border-line bg-surface shadow-card">
              {stackLayers.map((row, index) => (
                <div
                  key={row.layer}
                  className="grid gap-2 border-line px-5 py-4 not-last:border-b sm:grid-cols-[7.5rem_1fr] sm:items-center sm:gap-6 sm:px-6"
                >
                  <dt className="flex items-center gap-3 font-mono text-xs text-faint">
                    <span className="text-accent-soft">{String(index + 1).padStart(2, '0')}</span>
                    <span className="tracking-[0.14em] uppercase">{row.layer}</span>
                  </dt>
                  <dd className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-ink">
                    {row.items.map((item) => (
                      <span key={item} className="inline-flex items-center gap-2">
                        <span className="size-1 rounded-full bg-live" aria-hidden="true" />
                        {item}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
          {principles.map((principle, index) => (
            <li key={principle.title} className="bg-canvas">
              <Reveal delay={index * 90} className="h-full p-6 sm:p-7">
                <principle.icon className="size-5 text-accent-soft" aria-hidden="true" />
                <h3 className="mt-5 text-base font-semibold text-ink">{principle.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{principle.body}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
