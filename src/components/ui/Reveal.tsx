import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { easeOut } from '../../lib/motion'

interface RevealProps {
  children: ReactNode
  /** Stagger in milliseconds. */
  delay?: number
  /** Starting vertical offset in px. */
  y?: number
  className?: string
}

/** Fades content up the first time it scrolls into view. */
export function Reveal({ children, delay = 0, y = 28, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 1, ease: easeOut, delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  )
}
