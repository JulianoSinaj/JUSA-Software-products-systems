import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

/**
 * Inertial smooth scrolling. Lenis drives the native scroll position,
 * so sticky elements, IntersectionObservers and scroll events keep
 * working. In-page anchor links are intercepted and eased, offset for
 * the fixed header. Skipped entirely for reduced-motion visitors.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      anchors: { offset: -72 },
      autoRaf: true,
    })
    return () => lenis.destroy()
  }, [])

  return null
}
