import { useEffect, useState } from 'react'

/**
 * Tracks which section currently sits under the header, so the nav can
 * mark it. A section is "active" while it crosses a thin band in the
 * upper part of the viewport.
 */
export function useActiveSection(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (sections.length === 0) return

    const visible = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        }
        // When two sections share the band, the later one wins.
        const current = ids.filter((id) => visible.has(id)).at(-1)
        setActive(current ?? null)
      },
      { rootMargin: '-30% 0px -60% 0px' },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [ids])

  return active
}
