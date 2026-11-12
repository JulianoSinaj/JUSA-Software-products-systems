import { site } from '../../data/site'

/** JUSA wordmark with the glowing indigo status dot. */
export function Logo() {
  return (
    <a href="#top" className="group inline-flex items-center gap-2" aria-label={`${site.name} — back to top`}>
      <span className="text-xl font-semibold tracking-[0.14em] text-ink">{site.name}</span>
      <span className="relative flex size-2.5" aria-hidden="true">
        <span className="absolute inset-0 animate-pulse-ring rounded-full bg-accent" />
        <span className="relative size-2.5 rounded-full bg-accent shadow-[0_0_12px_2px_rgb(99_102_241/0.9)]" />
      </span>
    </a>
  )
}
