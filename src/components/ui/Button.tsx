import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { Magnetic } from '../motion/Magnetic'

type Variant = 'primary' | 'secondary'
type Size = 'sm' | 'md'

const base =
  'sweep-border group inline-flex items-center justify-center gap-2.5 rounded-full font-medium whitespace-nowrap tracking-[-0.005em] ' +
  'transition-[background-color,border-color,color,box-shadow,scale] duration-300 ease-out-soft active:scale-[0.97] ' +
  'disabled:pointer-events-none disabled:opacity-50'

const variants: Record<Variant, string> = {
  // Solid off-white; the sweep sits just outside it as a halo.
  primary:
    'bg-ink text-canvas [--sweep-inset:-3px] hover:bg-white hover:shadow-[0_10px_40px_-12px_rgb(245_158_11/0.55)]',
  // Dark glass; the sweep runs along its own border.
  secondary:
    'border border-white/10 bg-white/[0.03] text-ink backdrop-blur-sm hover:border-white/15 hover:bg-white/[0.06]',
}

const sizes: Record<Size, string> = {
  sm: 'h-10 px-4.5 text-[13px]',
  md: 'h-12 px-6 text-sm',
}

interface StyleProps {
  variant?: Variant
  size?: Size
  /** Pull toward the cursor on hover. On by default. */
  magnetic?: boolean
  children: ReactNode
}

function withMagnet(node: ReactNode, magnetic: boolean, fullWidth: boolean) {
  return magnetic ? <Magnetic className={fullWidth ? 'w-full sm:w-auto' : undefined}>{node}</Magnetic> : node
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  magnetic = true,
  className,
  children,
  ...rest
}: StyleProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return withMagnet(
    <a className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </a>,
    magnetic,
    false,
  )
}

export function Button({
  variant = 'primary',
  size = 'md',
  magnetic = true,
  className,
  children,
  ...rest
}: StyleProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return withMagnet(
    <button className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </button>,
    magnetic,
    Boolean(className?.includes('w-full')),
  )
}
