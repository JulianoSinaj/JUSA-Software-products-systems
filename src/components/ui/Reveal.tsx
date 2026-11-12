import { useLayoutEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface RevealProps {
  children: ReactNode
  /** Stagger in milliseconds. */
  delay?: number
  className?: string
}

/** Fades content up the first time it scrolls into view. */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  // Layout effect: the hidden state is applied before first paint, so
  // content never flashes visible and then fades in again.
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    el.classList.add('reveal-ready')
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('reveal-in')
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={cn(className)} style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}>
      {children}
    </div>
  )
}
