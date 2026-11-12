import { site } from '../../data/site'
import { StatusDot } from './StatusDot'

/** JUSA wordmark with its small amber status dot. */
export function Logo() {
  return (
    <a href="#top" className="inline-flex items-center gap-2.5" aria-label={`${site.name} — back to top`}>
      <span className="text-[13px] font-semibold tracking-[0.28em] text-ink">{site.name}</span>
      <StatusDot />
    </a>
  )
}
