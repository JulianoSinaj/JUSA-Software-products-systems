import type { ReactNode } from 'react'

/** Small mono tag for technologies and metadata. */
export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-line bg-white/[0.03] px-2 py-1 font-mono text-[11px] leading-none text-muted">
      {children}
    </span>
  )
}
