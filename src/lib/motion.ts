/** Shared motion language: one easing family, a handful of durations. */

/** Long, soft deceleration — the house curve for reveals. */
export const easeOut = [0.22, 1, 0.36, 1] as const
/** Symmetric in-out for curtains and panels. */
export const easeInOut = [0.76, 0, 0.24, 1] as const

export const springSoft = { stiffness: 150, damping: 20, mass: 0.5 }
export const springSnappy = { stiffness: 260, damping: 18, mass: 0.35 }

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * The intro curtain plays once per browser session and never for
 * visitors who ask for reduced motion. Evaluated once, at module load,
 * so React StrictMode double-renders cannot replay it.
 */
function shouldPlayIntro(): boolean {
  if (typeof window === 'undefined' || prefersReducedMotion()) return false
  try {
    if (sessionStorage.getItem('jusa-intro')) return false
    sessionStorage.setItem('jusa-intro', '1')
    return true
  } catch {
    return false
  }
}

export const PLAY_INTRO = shouldPlayIntro()

/** Seconds before the hero starts animating (waits for the curtain). */
export const HERO_DELAY = PLAY_INTRO ? 1.45 : 0.15
