import { ArrowUpRight, Lock } from 'lucide-react'
import { motion, useTransform } from 'framer-motion'
import { projects, type Project } from '../../data/projects'
import { site } from '../../data/site'
import { easeInOut, easeOut } from '../../lib/motion'
import { cn } from '../../lib/cn'
import { GithubIcon } from '../ui/BrandIcons'
import { Magnetic } from '../motion/Magnetic'
import { TiltCard, useTilt } from '../motion/TiltCard'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { StatusDot } from '../ui/StatusDot'
import { Tag } from '../ui/Tag'
import { ProjectArt } from './ProjectArt'

/**
 * Bento placement on the 12-column desktop grid — widths alternate so
 * no two rows line up, and every preview keeps its 16:10 proportions:
 *   ┌────────── KROX (7) ──────────┐┌─── Maria Maria (5) ───┐
 *   ┌── Vehicle App (5) ──┐┌──────── School Library (7) ─────┐
 *   ┌───────────────────── GitHub banner (12) ──────────────────┐
 */
type Layout = 'feature' | 'compact'
const layouts: { layout: Layout; cell: string }[] = [
  { layout: 'feature', cell: 'lg:col-span-7' },
  { layout: 'compact', cell: 'lg:col-span-5' },
  { layout: 'compact', cell: 'lg:col-span-5' },
  { layout: 'feature', cell: 'lg:col-span-7' },
]

const hostOf = (url: string) => new URL(url).host

/**
 * The preview window. On scroll-in it wipes open from the bottom while
 * the art settles from a slight zoom; on hover it zooms in and drifts
 * against the card's tilt for parallax depth.
 */
function ProjectMedia({ project, className }: { project: Project; className?: string }) {
  const { px, py } = useTilt()
  const x = useTransform(px, [-0.5, 0.5], [18, -18])
  const y = useTransform(py, [-0.5, 0.5], [14, -14])

  return (
    <motion.div
      className={cn('relative overflow-hidden rounded-[0.9rem] border border-white/[0.06] bg-canvas', className)}
      initial={{ clipPath: 'inset(100% 0% 0% 0% round 14px)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 14px)' }}
      viewport={{ once: true, margin: '0px 0px -15% 0px' }}
      transition={{ duration: 1.2, ease: easeInOut }}
    >
      <motion.div className="absolute -inset-6" style={{ x, y }}>
        <motion.div
          className="size-full"
          initial={{ scale: 1.25 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: '0px 0px -15% 0px' }}
          transition={{ duration: 1.6, ease: easeOut }}
        >
          <div className="size-full transition-transform duration-[1400ms] ease-out-soft group-hover:scale-[1.07]">
            {project.image ? (
              <img src={project.image} alt="" loading="lazy" decoding="async" className="size-full object-cover" />
            ) : (
              <ProjectArt kind={project.art} className="size-full" />
            )}
          </div>
        </motion.div>
      </motion.div>
      {/* Bottom vignette so the card body reads as one surface. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface/70 via-transparent to-transparent" />
    </motion.div>
  )
}

function ProjectLink({ href, label, project }: { href: string; label: string; project: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="group/link inline-flex items-center gap-1.5 text-ink">
      <span className="link-line-rest">{label}</span>
      <ArrowUpRight
        className="size-3.5 text-muted transition-[transform,color] duration-300 group-hover/link:translate-x-px group-hover/link:-translate-y-px group-hover/link:text-accent"
        aria-hidden="true"
      />
      <span className="sr-only"> for {project} (opens in a new tab)</span>
    </a>
  )
}

function ProjectBody({ project, index, layout }: { project: Project; index: number; layout: Layout }) {
  const status = project.liveUrl ? 'Live' : project.repoUrl ? 'Open source' : 'Private'
  return (
    <div className="flex flex-1 flex-col px-6 pt-6 pb-7 sm:px-8 sm:pb-8">
      <div className="meta flex items-start justify-between gap-6 text-faint">
        <span>
          <span className="text-muted">{String(index + 1).padStart(2, '0')}</span>
          <span className="mx-2.5 text-line-strong">/</span>
          {project.kind}
        </span>
        <span className="inline-flex shrink-0 items-center gap-2">
          {project.liveUrl ? <StatusDot /> : <span className="size-1.5 rounded-full border border-faint" aria-hidden="true" />}
          {status}
        </span>
      </div>

      <h3
        className={cn(
          'display mt-6 text-ink transition-transform duration-700 ease-out-soft group-hover:translate-x-1',
          layout === 'feature' ? 'text-6xl sm:text-7xl' : 'text-5xl sm:text-6xl',
        )}
      >
        {project.name}
      </h3>
      <p className="mt-4 max-w-md text-[15px] leading-[1.7] text-muted">{project.summary}</p>

      <ul className="mt-6 mb-8 flex flex-wrap gap-2" aria-label="Stack">
        {project.stack.map((item) => (
          <li key={item}>
            <Tag>{item}</Tag>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-line pt-5 text-sm">
        {project.liveUrl && <ProjectLink href={project.liveUrl} label={hostOf(project.liveUrl)} project={project.name} />}
        {project.repoUrl && <ProjectLink href={project.repoUrl} label="Source code" project={project.name} />}
        {project.accessNote && (
          <span className="inline-flex items-center gap-2 text-faint">
            <Lock className="size-3.5" aria-hidden="true" />
            {project.accessNote}
          </span>
        )}
      </div>
    </div>
  )
}

function ProjectCard({ project, index, layout }: { project: Project; index: number; layout: Layout }) {
  return (
    <TiltCard
      as="article"
      max={layout === 'feature' ? 3.5 : 4.5}
      className="flex h-full flex-col p-2"
    >
      <ProjectMedia project={project} className="aspect-[16/10]" />
      <ProjectBody project={project} index={index} layout={layout} />
    </TiltCard>
  )
}

function GithubTile() {
  return (
    <TiltCard className="h-full">
      <a
        href={site.links.github}
        target="_blank"
        rel="noreferrer"
        className="flex h-full flex-col gap-10 p-8 sm:p-10 lg:flex-row lg:items-end lg:justify-between"
        aria-label={`All repositories on GitHub, @${site.links.githubHandle} (opens in a new tab)`}
      >
        <span className="flex flex-col">
          <span className="meta flex items-center gap-3 text-faint">
            <GithubIcon className="size-4 text-muted" />
            Open source · @{site.links.githubHandle}
          </span>
          <span className="display mt-10 text-5xl text-ink sm:text-6xl">
            More work, in the open — <em className="text-muted">on GitHub.</em>
          </span>
        </span>
        <Magnetic strength={0.5} className="shrink-0 self-end">
          <span className="flex size-14 items-center justify-center rounded-full border border-white/10 text-ink transition-[background-color,border-color,color] duration-500 group-hover:border-accent/50 group-hover:bg-accent group-hover:text-canvas">
            <ArrowUpRight className="size-5 transition-transform duration-500 ease-out-soft group-hover:rotate-45" />
          </span>
        </Magnetic>
      </a>
    </TiltCard>
  )
}

export function Projects() {
  return (
    <section id="projects" className="border-t border-line py-32 sm:py-44">
      <div className="frame">
        <SectionHeading
          className="max-w-3xl"
          index="03"
          label="Selected work"
          title="Client platforms and systems"
          accent="in production."
          lead="Corporate web, e-commerce, mobile and backend engineering — each one shipped and in use."
        />

        <ul className="mt-20 grid grid-cols-1 gap-4 lg:mt-28 lg:grid-cols-12 lg:gap-5">
          {projects.map((project, index) => {
            const { layout, cell } = layouts[index % layouts.length]
            return (
              <li key={project.name} className={cell}>
                <Reveal delay={(index % 2) * 120} className="h-full">
                  <ProjectCard project={project} index={index} layout={layout} />
                </Reveal>
              </li>
            )
          })}
          <li className="lg:col-span-12">
            <Reveal delay={120} className="h-full">
              <GithubTile />
            </Reveal>
          </li>
        </ul>
      </div>
    </section>
  )
}
