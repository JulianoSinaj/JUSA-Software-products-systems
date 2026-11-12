import { useRef, type PointerEvent, type ReactNode } from 'react'
import { motion, useSpring } from 'framer-motion'
import { useFinePointer } from '../../hooks/useFinePointer'
import { springSnappy } from '../../lib/motion'
import { cn } from '../../lib/cn'

interface MagneticProps {
  children: ReactNode
  /** Fraction of the cursor's offset from centre the element follows. */
  strength?: number
  className?: string
}

/** Pulls its child toward the cursor while hovered, then springs home. */
export function Magnetic({ children, strength = 0.3, className }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const enabled = useFinePointer()
  const x = useSpring(0, springSnappy)
  const y = useSpring(0, springSnappy)

  const onPointerMove = (event: PointerEvent<HTMLSpanElement>) => {
    if (!enabled || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.span
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      style={{ x, y }}
      className={cn('inline-flex', className)}
    >
      {children}
    </motion.span>
  )
}
