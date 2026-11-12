import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionHeadingProps {
  /** Short mono label above the title, e.g. "02 / Enterprise Solutions". */
  eyebrow: string
  title: ReactNode
  lead?: ReactNode
}

export function SectionHeading({ eyebrow, title, lead }: SectionHeadingProps) {
  return (
    <Reveal className="max-w-2xl">
      <p className="font-mono text-xs tracking-[0.18em] text-accent-soft uppercase">{eyebrow}</p>
      <h2 className="mt-4 text-3xl leading-[1.1] font-semibold tracking-tight text-ink sm:text-[2.5rem]">{title}</h2>
      {lead && <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{lead}</p>}
    </Reveal>
  )
}
