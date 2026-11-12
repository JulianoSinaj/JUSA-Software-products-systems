import type { ComponentType, SVGProps } from 'react'
import { ArrowUp, ArrowUpRight, Crosshair, Mail } from 'lucide-react'
import { motion, type Variants } from 'framer-motion'
import { navLinks, site } from '../../data/site'
import { easeOut } from '../../lib/motion'
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons'
import { BrandMark } from '../ui/BrandMark'
import { StatusDot } from '../ui/StatusDot'

interface ExternalLink {
  label: string
  href: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
  /** Opens in a new tab (everything except mailto). */
  external: boolean
}

/* Unconfigured channels (empty strings in site.ts) are left out, so the
   footer never ships a link that points nowhere. */
const elsewhere: ExternalLink[] = [
  { label: 'GitHub', href: site.links.github, icon: GithubIcon, external: true },
  { label: 'LinkedIn', href: site.links.linkedin, icon: LinkedinIcon, external: true },
  { label: 'Email', href: site.email && `mailto:${site.email}`, icon: Mail, external: false },
].filter((link) => link.href)

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}
const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: easeOut } },
}
const letter: Variants = {
  hidden: { y: '60%', opacity: 0 },
  show: { y: '0%', opacity: 1, transition: { duration: 1.4, ease: easeOut } },
}

export function Footer() {
  return (
    <motion.footer
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={container}
      className="relative overflow-hidden border-t border-white/[0.06] bg-canvas"
    >
      {/* Light: a hairline highlight on the top edge, warm glow rising from the bottom. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[32rem] bg-[radial-gradient(55%_100%_at_50%_100%,rgb(245_158_11/0.1),transparent)]" />
      </div>

      <div className="relative">
        {/* Backdrop: the oversized JUSA wordmark — its only appearance in
            the footer. It mirrors the column grid below so it starts at
            the Index column and runs to the right edge. The whole word
            stands clear of the divider, lit from the top and dimming
            toward its feet without ever fading out. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden select-none">
          <div className="frame grid h-full grid-cols-2 grid-rows-1 gap-x-8 lg:grid-cols-12 lg:gap-x-10">
            {/* `@container`: the wordmark sizes itself from this cell's width. */}
            <div className="@container relative col-span-2 lg:col-span-6 lg:col-start-7">
              <motion.p
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } } }}
                className="absolute inset-x-0 bottom-[0.03em] flex justify-center font-serif text-[length:min(63cqw,22rem)] leading-[0.8] tracking-[-0.02em]"
              >
                {site.name.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    variants={letter}
                    // The gradient only paints inside each letter's box, and
                    // in this face the J's tail drops 0.215em below the
                    // baseline and hooks 0.056em to the left. The padding
                    // grows the box to hold the whole glyph (the negative
                    // margin keeps the spacing unchanged), and the bottom
                    // padding is also what lifts the word off the divider.
                    className="-mx-[0.07em] bg-gradient-to-b from-white/[0.13] to-white/[0.04] bg-clip-text px-[0.07em] pb-[0.18em] text-transparent"
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.p>
            </div>
          </div>
        </div>

        <div className="frame relative grid grid-cols-2 gap-x-8 gap-y-16 pt-24 pb-20 lg:grid-cols-12 lg:gap-x-10 lg:pt-28">
          {/* Brand */}
          <motion.div variants={rise} className="col-span-2 lg:col-span-5">
            <a href="#top" className="group/brand inline-flex items-center gap-4" aria-label={`${site.name} Studio — back to top`}>
              <BrandMark className="transition-transform duration-700 ease-out-soft group-hover/brand:-rotate-6" />
              <span className="flex items-center gap-3">
                <span className="text-lg font-semibold tracking-[0.28em] text-ink">{site.name}</span>
                <span className="rounded-md border border-white/10 bg-white/[0.03] px-1.5 py-1 font-mono text-[9px] leading-none tracking-[0.22em] text-muted transition-colors duration-500 group-hover/brand:border-accent/40 group-hover/brand:text-ink">
                  STUDIO
                </span>
              </span>
            </a>

            <p className="mt-8 max-w-sm text-[15px] leading-[1.75] text-muted">
              The independent software practice of {site.founder}. Backend systems, web platforms and mobile apps, built
              to keep working after launch.
            </p>

            <p className="meta mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-faint">
              <Crosshair className="size-3 text-accent/70" aria-hidden="true" />
              <span>
                © {new Date().getFullYear()} {site.name}
              </span>
              <span className="hidden text-line-strong sm:inline" aria-hidden="true">
                /
              </span>
              <span className="basis-full sm:basis-auto">Designed &amp; engineered with precision</span>
            </p>
          </motion.div>

          {/* Index */}
          <motion.nav variants={rise} aria-label="Footer" className="lg:col-span-3 lg:col-start-7">
            <p className="meta text-faint">Index</p>
            <ul className="mt-6">
              {navLinks.map((link, index) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="group flex items-baseline gap-4 py-2 text-[15px] text-muted transition-colors duration-300 hover:text-ink"
                  >
                    <span className="font-mono text-[10px] text-faint transition-colors duration-300 group-hover:text-accent">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="transition-transform duration-500 ease-out-soft group-hover:translate-x-1">
                      {link.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Elsewhere */}
          <motion.div variants={rise} className="lg:col-span-3 lg:col-start-10">
            <p className="meta text-faint">Elsewhere</p>
            <ul className="mt-6 border-t border-white/[0.06]">
              {elsewhere.map(({ label, href, icon: Icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                    className="group flex items-center gap-3 border-b border-white/[0.06] py-3.5 text-[15px] text-muted transition-colors duration-300 hover:border-white/20 hover:text-ink"
                  >
                    <Icon className="size-4 shrink-0 text-faint transition-colors duration-300 group-hover:text-accent" aria-hidden="true" />
                    <span className="transition-transform duration-500 ease-out-soft group-hover:translate-x-1">{label}</span>
                    {external && <span className="sr-only">(opens in a new tab)</span>}
                    <span className="ml-auto flex size-7 items-center justify-center rounded-full border border-white/[0.08] transition-[border-color,background-color] duration-300 group-hover:border-accent/50 group-hover:bg-accent/10">
                      <ArrowUpRight
                        className="size-3.5 transition-[transform,color] duration-500 ease-out-soft group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                        aria-hidden="true"
                      />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Status and return */}
      <motion.div variants={rise} className="relative border-t border-white/[0.06]">
        <div className="frame meta flex items-center justify-between gap-6 py-6 text-faint">
          <p className="inline-flex items-center gap-2.5">
            <StatusDot />
            {site.availability}
          </p>
          <a href="#top" className="group inline-flex items-center gap-2.5 transition-colors duration-300 hover:text-ink">
            Back to top
            <span className="flex size-7 items-center justify-center rounded-full border border-white/[0.08] transition-[border-color,background-color] duration-300 group-hover:border-accent/50 group-hover:bg-accent/10">
              <ArrowUp
                className="size-3.5 transition-[transform,color] duration-500 ease-out-soft group-hover:-translate-y-0.5 group-hover:text-accent"
                aria-hidden="true"
              />
            </span>
          </a>
        </div>
      </motion.div>
    </motion.footer>
  )
}
