import type { ReactNode } from 'react'

/** Hairline mono badge for technologies. Lifts and warms on hover. */
export function Tag({ children }: { children: ReactNode }) {
  return <span className="tag">{children}</span>
}
