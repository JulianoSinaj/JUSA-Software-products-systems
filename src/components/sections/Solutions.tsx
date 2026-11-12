import { Check } from 'lucide-react'
import { solutions } from '../../data/solutions'
import { Chip } from '../ui/Chip'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { SpotlightCard } from '../ui/SpotlightCard'

export function Solutions() {
  return (
    <section id="solutions" className="relative border-t border-line py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-grid [mask-image:linear-gradient(to_bottom,transparent,#000_30%,#000_70%,transparent)] opacity-50"
      />
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="02 / Enterprise Solutions"
          title="Four technical pillars, engineered as one platform."
          lead="Each engagement draws on the same disciplined foundation, whether the outcome is an API, a cloud rollout, a mobile product or a connected device."
        />

        <ul className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
          {solutions.map((solution, index) => (
            <li key={solution.title}>
              <Reveal delay={(index % 2) * 100} className="h-full">
                <SpotlightCard className="flex h-full flex-col p-6 sm:p-8">
                  <div className="flex items-start justify-between">
                    <span className="flex size-12 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent-soft">
                      <solution.icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-xs text-faint">{String(index + 1).padStart(2, '0')} / 04</span>
                  </div>

                  <h3 className="mt-6 text-xl font-semibold tracking-tight text-ink">{solution.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">{solution.summary}</p>

                  <ul className="mt-6 space-y-2.5">
                    {solution.capabilities.map((capability) => (
                      <li key={capability} className="flex gap-3 text-sm text-ink">
                        <Check className="mt-0.5 size-4 shrink-0 text-live" aria-hidden="true" />
                        {capability}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-wrap gap-2 pt-7">
                    {solution.stack.map((item) => (
                      <Chip key={item}>{item}</Chip>
                    ))}
                  </div>
                </SpotlightCard>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
