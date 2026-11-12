import { solutions } from '../../data/solutions'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { Tag } from '../ui/Tag'

export function Solutions() {
  return (
    <section id="solutions" className="border-t border-line py-32 sm:py-44">
      <div className="frame">
        <SectionHeading
          className="max-w-3xl"
          index="02"
          label="Services"
          title="Four kinds of work,"
          accent="one standard."
          lead="Each engagement draws on the same foundation, whether the outcome is an API, a cloud rollout, a mobile product or a connected device."
        />

        <ol className="mt-24 border-t border-line lg:mt-32">
          {solutions.map((solution, index) => (
            <li key={solution.title} className="group border-b border-line">
              <Reveal className="grid gap-6 py-12 lg:grid-cols-12 lg:gap-10 lg:py-16">
                <span className="font-mono text-[11px] text-faint transition-colors duration-300 group-hover:text-accent lg:col-span-1 lg:pt-3">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <h3 className="display text-4xl text-ink transition-transform duration-700 ease-out-soft group-hover:translate-x-1.5 sm:text-5xl lg:col-span-4">
                  {solution.title}
                </h3>

                <div className="lg:col-span-4 lg:pt-2">
                  <p className="text-[15px] leading-[1.75] text-muted">{solution.summary}</p>
                  <ul className="mt-6 space-y-2.5 text-sm text-ink/90">
                    {solution.capabilities.map((capability) => (
                      <li key={capability} className="flex gap-3">
                        <span className="mt-[0.7em] h-px w-3 shrink-0 bg-faint" aria-hidden="true" />
                        {capability}
                      </li>
                    ))}
                  </ul>
                </div>

                <ul className="flex flex-wrap content-start gap-2 lg:col-span-3 lg:justify-end lg:pt-2.5">
                  {solution.stack.map((item) => (
                    <li key={item}>
                      <Tag>{item}</Tag>
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
