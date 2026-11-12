import { cn } from '../../lib/cn'

/** The amber indicator dot. `still` drops the breathing animation. */
export function StatusDot({ still = false, className }: { still?: boolean; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-block size-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_10px_0_rgb(245_158_11/0.55)]',
        !still && 'animate-breathe',
        className,
      )}
    />
  )
}
