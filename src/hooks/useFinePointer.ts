import { useEffect, useState } from 'react'

/**
 * True on devices with a precise, hovering pointer AND no reduced-motion
 * preference. Pointer-driven effects (tilt, magnetic pull, cursor glow)
 * switch off everywhere else.
 */
export function useFinePointer(): boolean {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const pointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setEnabled(pointer.matches && !reduced.matches)
    update()
    pointer.addEventListener('change', update)
    reduced.addEventListener('change', update)
    return () => {
      pointer.removeEventListener('change', update)
      reduced.removeEventListener('change', update)
    }
  }, [])

  return enabled
}
