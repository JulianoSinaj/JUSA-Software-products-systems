import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { site } from '../../data/site'
import { HERO_DELAY, easeOut } from '../../lib/motion'
import { WordReveal } from '../motion/WordReveal'
import { ButtonLink } from '../ui/Button'

const facts = [
  { label: 'Backend', value: '.NET 10 · FastAPI' },
  { label: 'Mobile', value: 'React Native' },
  { label: 'Delivery', value: 'Docker · Vercel · Render' },
  { label: 'Data', value: 'PostgreSQL' },
]

/** Fade-up used for the supporting hero elements, timed after the headline. */
const rise = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: easeOut, delay: HERO_DELAY + delay },
})

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  // As the hero scrolls away, its content drifts down and fades: depth.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 160])
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  return (
    <section ref={ref} id="top" className="relative flex min-h-[100svh] flex-col pt-36 pb-12 sm:pt-44">
      <motion.div style={reduce ? undefined : { y, opacity }} className="frame flex flex-1 flex-col">
        <motion.p
          {...rise(0)}
          className="meta inline-flex items-center gap-3 self-start rounded-full border border-white/10 bg-white/[0.03] py-2 pr-4 pl-3 text-muted backdrop-blur-sm"
        >
          <span className="relative flex size-2" aria-hidden="true">
            <span className="absolute inset-0 animate-signal rounded-full bg-accent" />
            <span className="relative size-2 rounded-full bg-accent shadow-[0_0_10px_rgb(245_158_11/0.8)]" />
          </span>
          <span className="text-ink">{site.badge.status}</span>
          <span className="hidden text-faint sm:inline" aria-hidden="true">
            //
          </span>
          <span className="hidden sm:inline">{site.badge.studio}</span>
        </motion.p>

        <h1 className="display mt-10 text-[3.1rem] leading-[0.98] text-ink sm:mt-12 sm:text-[4.75rem] lg:text-[6rem] xl:text-[6.75rem]">
          <WordReveal
            trigger="mount"
            block
            delay={HERO_DELAY + 0.1}
            stagger={0.07}
            lines={[
              { text: 'Engineering robust systems.' },
              { text: 'Crafting digital experiences.', className: 'italic text-muted' },
            ]}
          />
        </h1>

        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-10">
          <motion.div {...rise(0.75)} className="lg:col-span-5">
            <p className="max-w-md text-base leading-[1.75] text-muted sm:text-[17px]">
              <span className="text-ink">
                {site.name} is the independent studio of {site.founder}.
              </span>{' '}
              Backend systems in .NET and FastAPI, web interfaces in React and mobile apps in React Native — shipped with
              Docker and built to keep running long after launch.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-4">
              <ButtonLink href="#projects">
                Explore the work
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </ButtonLink>
              <ButtonLink href="#contact" variant="secondary">
                Start a project
              </ButtonLink>
            </div>
          </motion.div>

          <motion.dl {...rise(0.9)} className="grid grid-cols-2 gap-x-8 gap-y-8 self-end lg:col-span-4 lg:col-start-9">
            {facts.map((fact) => (
              <div key={fact.label} className="border-t border-line pt-4">
                <dt className="meta text-faint">{fact.label}</dt>
                <dd className="mt-2.5 text-sm text-ink">{fact.value}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.a
          {...rise(1.1)}
          href="#expertise"
          className="meta mt-auto hidden items-center gap-4 self-start pt-16 text-faint transition-colors hover:text-ink sm:inline-flex"
        >
          <span className="relative h-10 w-px overflow-hidden bg-line">
            <span className="absolute inset-0 animate-scroll-cue bg-accent" />
          </span>
          Scroll
        </motion.a>
      </motion.div>
    </section>
  )
}
