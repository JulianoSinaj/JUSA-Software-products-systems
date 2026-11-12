import type { ReactNode } from 'react'
import { WordReveal } from '../motion/WordReveal'
import { Reveal } from './Reveal'

interface SectionHeadingProps {
  /** Section number, e.g. "01". */
  index: string
  label: string
  /** Serif title, set upright. */
  title: string
  /** Closing phrase of the title, set in italic grey. */
  accent?: string
  lead?: ReactNode
  className?: string
}

export function SectionHeading({ index, label, title, accent, lead, className }: SectionHeadingProps) {
  return (
    <div className={className}>
      <Reveal y={12}>
        <p className="meta flex items-center gap-3 text-faint">
          <span className="text-muted">{index}</span>
          <span className="h-px w-6 bg-line-strong" aria-hidden="true" />
          {label}
        </p>
      </Reveal>
      <h2 className="display mt-8 text-[2.75rem] text-ink sm:text-6xl lg:text-[4.25rem]">
        <WordReveal
          lines={[{ text: title }, ...(accent ? [{ text: accent, className: 'italic text-muted' }] : [])]}
          delay={0.1}
        />
      </h2>
      {lead && (
        <Reveal delay={250}>
          <p className="mt-8 max-w-xl text-[17px] leading-[1.7] text-muted">{lead}</p>
        </Reveal>
      )}
    </div>
  )
}
