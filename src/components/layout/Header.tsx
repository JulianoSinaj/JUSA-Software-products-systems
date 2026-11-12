import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { navLinks } from '../../data/site'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useScrolled } from '../../hooks/useScrolled'
import { cn } from '../../lib/cn'
import { ButtonLink } from '../ui/Button'
import { Logo } from '../ui/Logo'

const sectionIds = navLinks.map((link) => link.id)

export function Header() {
  const scrolled = useScrolled()
  const active = useActiveSection(sectionIds)
  const [open, setOpen] = useState(false)

  // Close the mobile menu on Escape or when the viewport grows to desktop.
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false)
    const desktop = window.matchMedia('(min-width: 1024px)')
    const onResize = () => desktop.matches && setOpen(false)
    window.addEventListener('keydown', onKey)
    desktop.addEventListener('change', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      desktop.removeEventListener('change', onResize)
    }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6">
      <div
        className={cn(
          'mx-auto max-w-6xl rounded-2xl border transition-[background-color,border-color,box-shadow] duration-300',
          // The open menu sits over page content, so it gets a near-solid
          // surface; the resting scrolled bar stays translucent glass.
          open
            ? 'border-line bg-surface/95 shadow-card backdrop-blur-xl'
            : scrolled
              ? 'glass shadow-card'
              : 'border-transparent bg-transparent',
        )}
      >
        <div className="flex h-14 items-center justify-between gap-6 pr-2.5 pl-5">
          <Logo />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    aria-current={active === link.id ? 'location' : undefined}
                    className={cn(
                      'rounded-full px-3.5 py-2 text-sm transition-colors duration-200',
                      active === link.id ? 'bg-white/[0.07] text-ink' : 'text-muted hover:text-ink',
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <ButtonLink href="#contact" size="sm">
                Get in Touch
                <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </ButtonLink>
            </div>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="inline-flex size-9 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-white/[0.07] lg:hidden"
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>

        {open && (
          <nav id="mobile-nav" aria-label="Mobile" className="border-t border-line px-3 pt-2 pb-3 lg:hidden">
            <ul className="flex flex-col">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === link.id ? 'location' : undefined}
                    className={cn(
                      'flex items-center justify-between rounded-xl px-3 py-3 text-[15px] transition-colors',
                      active === link.id ? 'bg-white/[0.07] text-ink' : 'text-muted hover:text-ink',
                    )}
                  >
                    {link.label}
                    <ArrowUpRight className="size-4 text-faint" />
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-2 sm:hidden">
              <ButtonLink href="#contact" onClick={() => setOpen(false)} className="w-full">
                Get in Touch
              </ButtonLink>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
