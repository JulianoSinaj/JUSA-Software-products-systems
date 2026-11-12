import type { PointerEvent, ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface SpotlightCardProps {
  children: ReactNode
  className?: string
}

/** Surface card with a soft highlight that follows the pointer. */
export function SpotlightCard({ children, className }: SpotlightCardProps) {
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`)
    event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`)
  }

  return (
    <div
      onPointerMove={onPointerMove}
      className={cn(
        'spotlight rounded-2xl border border-line bg-surface shadow-card',
        'transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-line-strong',
        className,
      )}
    >
      {children}
    </div>
  )
}
