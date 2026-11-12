import { motion, type Variants } from 'framer-motion'
import { easeOut } from '../../lib/motion'
import { cn } from '../../lib/cn'

export interface RevealLine {
  text: string
  className?: string
}

interface WordRevealProps {
  lines: RevealLine[]
  /** Seconds before the first word moves. */
  delay?: number
  /** 'mount' plays immediately; 'view' waits until scrolled into view. */
  trigger?: 'mount' | 'view'
  stagger?: number
  /** Render each line as its own block. */
  block?: boolean
}

const word: Variants = {
  hidden: { y: '110%', opacity: 0, rotate: 2 },
  show: { y: '0%', opacity: 1, rotate: 0, transition: { duration: 1, ease: easeOut } },
}

/**
 * Splits text into words that rise out of a mask one after another.
 * Words stay real text in the DOM, so the heading reads normally to
 * assistive tech and search engines. Drop this inside an h1/h2.
 */
export function WordReveal({ lines, delay = 0, trigger = 'view', stagger = 0.06, block = false }: WordRevealProps) {
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  }
  const play =
    trigger === 'mount'
      ? { animate: 'show' }
      : { whileInView: 'show', viewport: { once: true, margin: '0px 0px -12% 0px' } }

  return (
    <motion.span initial="hidden" variants={container} {...play}>
      {lines.map((line, li) => (
        <span key={li} className={cn(block && 'block', line.className)}>
          {line.text.split(' ').map((w, wi) => (
            <span key={wi}>
              {/* Mask with room for descenders and italic overhang. */}
              <span className="-mr-[0.1em] -mb-[0.14em] inline-block overflow-hidden pr-[0.1em] pb-[0.14em] align-top">
                <motion.span variants={word} className="inline-block origin-bottom-left will-change-transform">
                  {w}
                </motion.span>
              </span>{' '}
            </span>
          ))}
        </span>
      ))}
    </motion.span>
  )
}
