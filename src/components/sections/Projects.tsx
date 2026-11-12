import { ArrowUpRight, Lock } from 'lucide-react'
import { projects, type Project } from '../../data/projects'
import { site } from '../../data/site'
import { GithubIcon } from '../ui/BrandIcons'
import { ButtonLink } from '../ui/Button'
import { Chip } from '../ui/Chip'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { SpotlightCard } from '../ui/SpotlightCard'

const linkClass =
  'group/link inline-flex items-center gap-2 rounded-full border border-line-strong px-3.5 py-2 text-sm font-medium text-ink ' +
  'transition-colors duration-200 hover:border-white/30 hover:bg-white/[0.07]'

function hostOf(url: string): string {
  return new URL(url).host
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isLive = Boolean(project.liveUrl)

  return (
    <SpotlightCard className="flex h-full flex-col overflow-hidden">
      {/* Title bar, styled like a browser / device chrome strip. */}
      <div className="flex items-center justify-between gap-4 border-b border-line bg-canvas/60 px-5 py-3 sm:px-6">
        <span className="flex min-w-0 items-center gap-2.5 font-mono text-[11px] text-muted">
          <span
            className={
              isLive
                ? 'size-1.5 shrink-0 rounded-full bg-live shadow-[0_0_8px_1px_rgb(16_185_129/0.8)]'
                : 'size-1.5 shrink-0 rounded-full bg-faint'
            }
            aria-hidden="true"
          />
          <span className="truncate">
            {project.liveUrl ? hostOf(project.liveUrl) : project.repoUrl ? 'Open source' : 'Private delivery'}
          </span>
        </span>
        <span className="shrink-0 font-mono text-[11px] text-faint">
          {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-7">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent-soft">
            <project.icon className="size-[18px]" aria-hidden="true" />
          </span>
          <span className="font-mono text-[11px] tracking-[0.18em] text-accent-soft uppercase">{project.kind}</span>
        </div>

        <h3 className="mt-5 text-xl font-semibold tracking-tight text-ink">{project.title}</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">{project.summary}</p>

        <ul className="mt-5 grid gap-2 text-sm text-ink">
          {project.highlights.map((highlight) => (
            <li key={highlight} className="flex items-center gap-3">
              <span className="h-px w-4 shrink-0 bg-live" aria-hidden="true" />
              {highlight}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <Chip key={item}>{item}</Chip>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-2.5 pt-7">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className={linkClass}>
              Live site
              <ArrowUpRight className="size-4 text-live-soft transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
              <span className="sr-only">for {project.title} (opens in a new tab)</span>
            </a>
          )}
          {project.repoUrl && (
            <a href={project.repoUrl} target="_blank" rel="noreferrer" className={linkClass}>
              <GithubIcon className="size-4" />
              Repository
              <span className="sr-only">for {project.title} (opens in a new tab)</span>
            </a>
          )}
          {project.accessNote && (
            <span className="inline-flex items-center gap-2 py-2 text-sm text-faint">
              <Lock className="size-3.5" aria-hidden="true" />
              {project.accessNote}
            </span>
          )}
        </div>
      </div>
    </SpotlightCard>
  )
}

export function Projects() {
  return (
    <section id="projects" className="border-t border-line py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="03 / Featured Projects"
            title="Client platforms and systems in production."
            lead="A selection of delivered work across corporate web, e-commerce, mobile and backend engineering."
          />
          <Reveal delay={120}>
            <ButtonLink href={site.links.github} target="_blank" rel="noreferrer" variant="secondary" size="sm">
              <GithubIcon className="size-4" />
              All repositories
              <ArrowUpRight className="size-4 text-faint" />
            </ButtonLink>
          </Reveal>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
          {projects.map((project, index) => (
            <li key={project.title}>
              <Reveal delay={(index % 2) * 100} className="h-full">
                <ProjectCard project={project} index={index} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
