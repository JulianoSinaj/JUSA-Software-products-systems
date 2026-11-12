import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useFinePointer } from '../../hooks/useFinePointer'

/**
 * Page atmosphere, fixed behind all content:
 *  - two very faint light fields (warm amber, cool indigo) that drift on
 *    long CSS loops — compositor-only, no JS per frame;
 *  - a soft amber glow that trails the cursor on a spring.
 */
export function Ambient() {
  const fine = useFinePointer()
  const x = useMotionValue(-1000)
  const y = useMotionValue(-1000)
  const sx = useSpring(x, { stiffness: 60, damping: 20, mass: 0.8 })
  const sy = useSpring(y, { stiffness: 60, damping: 20, mass: 0.8 })

  useEffect(() => {
    if (!fine) return
    const onMove = (event: PointerEvent) => {
      x.set(event.clientX)
      y.set(event.clientY)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [fine, x, y])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="ambient-field animate-drift-a absolute -top-[30vh] -left-[20vw] size-[80vw] max-w-[1100px] max-h-[1100px] bg-[radial-gradient(closest-side,rgb(245_158_11/0.075),transparent)]" />
      <div className="ambient-field animate-drift-b absolute -right-[25vw] -bottom-[35vh] size-[85vw] max-w-[1200px] max-h-[1200px] bg-[radial-gradient(closest-side,rgb(99_102_241/0.055),transparent)]" />
      {fine && (
        <motion.div
          style={{ x: sx, y: sy }}
          className="absolute -top-[260px] -left-[260px] size-[520px] rounded-full bg-[radial-gradient(closest-side,rgb(245_158_11/0.07),transparent)]"
        />
      )}
    </div>
  )
}
