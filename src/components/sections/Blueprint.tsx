import { Container, Database, Monitor, Server, Smartphone, Zap, type LucideIcon } from 'lucide-react'

interface NodeProps {
  icon: LucideIcon
  name: string
  detail: string
}

function Node({ icon: Icon, name, detail }: NodeProps) {
  return (
    <div className="flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-line bg-canvas/70 px-3 py-2.5">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent-soft">
        <Icon className="size-4" />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-medium text-ink">{name}</span>
        <span className="block truncate font-mono text-[11px] text-faint">{detail}</span>
      </span>
      <span className="ml-auto size-1.5 shrink-0 rounded-full bg-live shadow-[0_0_8px_1px_rgb(16_185_129/0.8)]" />
    </div>
  )
}

function Tier({ label }: { label: string }) {
  return <p className="mb-2 font-mono text-[10px] tracking-[0.2em] text-faint uppercase">{label}</p>
}

/** Vertical link between tiers with a pulse travelling down it. */
function Link({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 py-1.5 pl-7">
      <span className="relative h-7 w-px overflow-hidden bg-line-strong">
        <span className="absolute inset-x-0 top-0 h-1/3 animate-flow bg-live" />
      </span>
      <span className="font-mono text-[10px] text-faint">{label}</span>
    </div>
  )
}

/**
 * Hero illustration: the reference architecture JUSA builds on,
 * drawn as a layered system diagram inside a glass panel.
 */
export function Blueprint() {
  return (
    <div className="relative" role="img" aria-label="Reference architecture: web and mobile clients call .NET and FastAPI services backed by PostgreSQL, deployed with Docker on Vercel and Render.">
      <div className="absolute -inset-8 -z-10 rounded-[2.5rem] bg-accent/20 blur-3xl" aria-hidden="true" />

      <div className="glass overflow-hidden rounded-2xl shadow-card" aria-hidden="true">
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="ml-3 font-mono text-xs text-muted">system.blueprint</span>
          </div>
          <span className="font-mono text-[10px] tracking-[0.16em] text-faint uppercase">Reference architecture</span>
        </div>

        <div className="p-4 sm:p-5">
          <Tier label="Clients" />
          <div className="flex flex-col gap-2 sm:flex-row">
            <Node icon={Monitor} name="Web platform" detail="React · Tailwind" />
            <Node icon={Smartphone} name="Mobile app" detail="React Native" />
          </div>

          <Link label="HTTPS · REST" />

          <Tier label="Services" />
          <div className="flex flex-col gap-2 sm:flex-row">
            <Node icon={Server} name="Web API" detail="C# · .NET 10" />
            <Node icon={Zap} name="Async API" detail="Python · FastAPI" />
          </div>

          <Link label="SQL · migrations" />

          <Tier label="Data" />
          <Node icon={Database} name="PostgreSQL" detail="Managed · relational" />
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line bg-canvas/50 px-4 py-3 sm:px-5">
          <span className="inline-flex items-center gap-2 font-mono text-[11px] text-live-soft">
            <Container className="size-3.5" />
            Containerised delivery
          </span>
          <span className="font-mono text-[11px] text-faint">Docker → CI/CD → Vercel · Render</span>
        </div>
      </div>
    </div>
  )
}
