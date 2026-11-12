import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { site } from '../../data/site'
import { ButtonLink } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { Blueprint } from './Blueprint'

const facts = [
  { label: 'API', value: '.NET 10 · FastAPI' },
  { label: 'Mobile', value: 'React Native' },
  { label: 'Cloud', value: 'Docker · Vercel · Render' },
  { label: 'Data', value: 'PostgreSQL' },
]

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* Backdrop: blueprint grid fading out, with indigo and emerald light. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_30%,transparent_100%)]" />
        <div className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-accent/20 blur-[120px]" />
        <div className="absolute top-1/3 -right-40 size-[420px] rounded-full bg-live/10 blur-[120px]" />
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-12">
        <div className="min-w-0">
          <Reveal>
            <p className="glass inline-flex max-w-full items-center gap-2.5 rounded-2xl py-1.5 pr-4 pl-3 font-mono text-[11px] leading-snug text-muted sm:rounded-full sm:text-xs">
              <span className="relative flex size-2 shrink-0" aria-hidden="true">
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-live" />
                <span className="relative size-2 rounded-full bg-live" />
              </span>
              <span>{site.badge}</span>
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-7 text-[2.5rem] leading-[1.04] font-semibold tracking-[-0.03em] text-ink sm:text-6xl lg:text-[4rem]">
              Architecting Robust Backend Systems &amp; <span className="text-brand">High-Impact Digital Platforms.</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              Powering modern enterprises and clients with scalable full-stack web architectures (.NET, FastAPI),
              mobile applications (React Native), and cloud deployments.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="#solutions">
                Explore Solutions
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </ButtonLink>
              <ButtonLink href="#contact" variant="secondary">
                Initiate Project
                <ArrowUpRight className="size-4 text-live-soft transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-7 sm:grid-cols-4">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="font-mono text-[10px] tracking-[0.2em] text-faint uppercase">{fact.label}</dt>
                  <dd className="mt-1.5 text-sm font-medium text-ink">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={200} className="min-w-0">
          <Blueprint />
        </Reveal>
      </div>
    </section>
  )
}
