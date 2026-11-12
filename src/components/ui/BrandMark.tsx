import { cn } from '../../lib/cn'
import { StatusDot } from './StatusDot'

/**
 * JUSA badge: a "JS" monogram drawn as geometry (constant-width strokes,
 * squared terminals) inside a double-framed rounded square, with the
 * amber status dot pinned to its top-right corner.
 *
 * The outer frame warms to amber when an ancestor marked `group/brand`
 * is hovered.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <span className={cn('relative inline-flex size-12 shrink-0', className)}>
      <svg viewBox="0 0 48 48" className="size-full" aria-hidden="true">
        <rect
          x="0.5"
          y="0.5"
          width="47"
          height="47"
          rx="11.5"
          className="fill-surface stroke-white/[0.14] transition-[stroke] duration-500 group-hover/brand:stroke-accent/60"
        />
        <rect x="4.5" y="4.5" width="39" height="39" rx="8" fill="none" className="stroke-white/[0.05]" />
        <g
          transform="translate(-1 1.5)"
          fill="none"
          strokeWidth="2.6"
          strokeLinecap="square"
          strokeLinejoin="round"
          className="stroke-ink"
        >
          {/* J — top bar, stem, hook */}
          <path d="M15.5 14H21v12.5a4.5 4.5 0 0 1-9 0" />
          {/* S — two opposed bowls */}
          <path d="M37 17.5A3.5 3.5 0 0 0 33.5 14h-3a4 4 0 0 0 0 8h3a4.5 4.5 0 0 1 0 9H30a3.5 3.5 0 0 1-3.5-3.5" />
        </g>
      </svg>
      <StatusDot className="absolute -top-0.5 -right-0.5" />
    </span>
  )
}
