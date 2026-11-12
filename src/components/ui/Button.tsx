import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'

type Variant = 'primary' | 'secondary'
type Size = 'sm' | 'md'

const base =
  'group inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap ' +
  'transition-[transform,box-shadow,background-color,border-color] duration-200 active:scale-[0.98] ' +
  'disabled:pointer-events-none disabled:opacity-60'

const variants: Record<Variant, string> = {
  primary: 'bg-brand text-white shadow-glow hover:shadow-[0_0_0_1px_rgb(16_185_129/0.4),0_10px_44px_-6px_rgb(16_185_129/0.5)]',
  secondary: 'border border-line-strong bg-white/[0.03] text-ink hover:border-white/30 hover:bg-white/[0.07]',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-12 px-6 text-[15px]',
}

interface StyleProps {
  variant?: Variant
  size?: Size
  children: ReactNode
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: StyleProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </a>
  )
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: StyleProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </button>
  )
}
