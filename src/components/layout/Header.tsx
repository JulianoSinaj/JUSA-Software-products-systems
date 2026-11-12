import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { navLinks } from '../../data/site'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useScrolled } from '../../hooks/useScrolled'
import { HERO_DELAY, easeOut } from '../../lib/motion'
import { cn } from '../../lib/cn'
import { ButtonLink } from '../ui/Button'
import { Logo } from '../ui/Logo'

const sectionIds = navLinks.map((link) => link.id)
// Contact has its own button on desktop, so it stays out of the inline nav.
const inlineLinks = navLinks.filter((link) => link.id !== 'contact')

export function Header() {
  const scrolled = useScrolled(24)
  const active = useActiveSection(sectionIds)
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 })

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
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: easeOut, delay: HERO_DELAY - 0.1 }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] backdrop-blur-xl',
        'transition-[background-color,box-shadow] duration-500 ease-out-soft',
        scrolled || open ? 'bg-black/70 shadow-[0_24px_60px_-30px_rgb(0_0_0/0.95)]' : 'bg-black/50',
      )}
    >
      <motion.div
        animate={{ height: scrolled ? 64 : 84 }}
        transition={{ duration: 0.6, ease: easeOut }}
        className="frame flex items-center justify-between gap-6"
      >
        <Logo />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {inlineLinks.map((link) => {
              const current = active === link.id
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    aria-current={current ? 'location' : undefined}
                    className={cn(
                      'link-line relative inline-flex py-0.5 text-[13px] transition-colors duration-200',
                      current ? 'text-ink' : 'text-muted hover:text-ink',
                    )}
                  >
                    {/* One amber point that glides to the active link. */}
                    {current && (
                      <motion.span
                        layoutId="nav-indicator"
                        aria-hidden="true"
                        className="absolute top-1/2 -left-3.5 -mt-0.5 size-1 rounded-full bg-accent shadow-[0_0_8px_rgb(245_158_11/0.9)]"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    {link.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2.5">
          <ButtonLink
            href="#contact"
            size="sm"
            variant="secondary"
            aria-current={active === 'contact' ? 'location' : undefined}
          >
            Get in touch
            <ArrowUpRight className="size-3.5 text-muted transition-[transform,color] duration-300 group-hover:translate-x-px group-hover:-translate-y-px group-hover:text-accent" />
          </ButtonLink>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 text-ink transition-colors hover:bg-white/[0.06] lg:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? 'close' : 'open'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {open ? <X className="size-4" /> : <Menu className="size-4" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: easeOut }}
            className="overflow-hidden border-t border-line lg:hidden"
          >
            <motion.ul
              className="frame flex flex-col pt-2 pb-8"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } } }}
            >
              {navLinks.map((link) => {
                const current = active === link.id
                return (
                  <motion.li
                    key={link.id}
                    className="border-b border-line last:border-b-0"
                    variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } } }}
                  >
                    <a
                      href={`#${link.id}`}
                      onClick={() => setOpen(false)}
                      aria-current={current ? 'location' : undefined}
                      className={cn(
                        'flex items-center justify-between py-4 font-serif text-[2rem] leading-none transition-colors',
                        current ? 'text-ink' : 'text-muted hover:text-ink',
                      )}
                    >
                      {link.label}
                      {current && <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />}
                    </a>
                  </motion.li>
                )
              })}
            </motion.ul>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Reading progress along the bottom edge. */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="absolute inset-x-0 -bottom-px h-px origin-left bg-gradient-to-r from-accent/20 via-accent/80 to-accent"
      />
    </motion.header>
  )
}
