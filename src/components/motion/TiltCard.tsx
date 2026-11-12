import { createContext, useContext, useRef, type PointerEvent, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from 'framer-motion'
import { useFinePointer } from '../../hooks/useFinePointer'
import { springSoft } from '../../lib/motion'
import { cn } from '../../lib/cn'

interface TiltState {
  /** Pointer position across the card, -0.5 (left/top) to 0.5 (right/bottom). Sprung. */
  px: MotionValue<number>
  py: MotionValue<number>
}

const TiltContext = createContext<TiltState | null>(null)

/** Read the card's sprung pointer position, e.g. for parallax layers. */
export function useTilt(): TiltState {
  const value = useContext(TiltContext)
  if (!value) throw new Error('useTilt must be used inside <TiltCard>')
  return value
}

interface TiltCardProps {
  children: ReactNode
  className?: string
  /** Maximum rotation in degrees. */
  max?: number
  as?: 'div' | 'article' | 'li'
}

/**
 * Surface card that tilts toward the cursor in 3D, lights its border
 * amber, and paints a soft inner glow at the pointer. Children can read
 * the pointer through useTilt() to build parallax layers.
 */
export function TiltCard({ children, className, max = 5, as = 'div' }: TiltCardProps) {
  const ref = useRef<HTMLElement>(null)
  const enabled = useFinePointer()
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const px = useSpring(rawX, springSoft)
  const py = useSpring(rawY, springSoft)
  const rotateY = useTransform(px, [-0.5, 0.5], [-max, max])
  const rotateX = useTransform(py, [-0.5, 0.5], [max, -max])

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    const el = ref.current
    if (!enabled || !el) return
    const rect = el.getBoundingClientRect()
    const lx = event.clientX - rect.left
    const ly = event.clientY - rect.top
    rawX.set(lx / rect.width - 0.5)
    rawY.set(ly / rect.height - 0.5)
    el.style.setProperty('--mx', `${lx}px`)
    el.style.setProperty('--my', `${ly}px`)
  }
  const onPointerLeave = () => {
    rawX.set(0)
    rawY.set(0)
  }

  const Component = motion[as]

  return (
    <Component
      ref={ref as never}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={enabled ? { rotateX, rotateY, transformPerspective: 1200 } : undefined}
      className={cn(
        'tilt-card group relative rounded-[1.25rem] border border-white/10 bg-surface shadow-card',
        'transition-[border-color,box-shadow] duration-500 ease-out-soft',
        'hover:border-accent/40 hover:shadow-[var(--shadow-card),0_40px_80px_-40px_rgb(245_158_11/0.25)]',
        className,
      )}
    >
      <TiltContext.Provider value={{ px, py }}>{children}</TiltContext.Provider>
    </Component>
  )
}
