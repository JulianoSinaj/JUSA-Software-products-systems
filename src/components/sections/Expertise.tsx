import { coreStack, principles, stackLayers } from '../../data/expertise'
import { TiltCard } from '../motion/TiltCard'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { Tag } from '../ui/Tag'

const pad = (n: number) => String(n).padStart(2, '0')

const bento = ['lg:col-span-4', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-4']

export function Expertise() {
  return (
    <section id="expertise" className="border-t border-line py-32 sm:py-44">
      <div className="frame">
        <SectionHeading
          className="max-w-4xl"
          index="01"
          label="Expertise"
          title="One engineer, accountable for"
          accent="every layer."
          lead="The interface a customer touches, the services behind it, the database underneath and the pipeline that ships it — designed together, so nothing is lost at the seams."
        />

        {/* Core stack as a bento: wide / narrow, then narrow / wide. */}
        <ul className="mt-20 grid gap-4 sm:grid-cols-2 lg:mt-28 lg:grid-cols-6 lg:gap-5">
          {coreStack.map((tool, index) => (
            <li key={tool.name} className={bento[index % bento.length]}>
              <Reveal delay={(index % 2) * 120} className="h-full">
                <TiltCard className="flex h-full min-h-[22rem] flex-col p-8 sm:p-9">
                  <div className="meta flex items-center justify-between text-faint">
                    <span>{tool.role}</span>
                    <span className="text-muted transition-colors duration-500 group-hover:text-accent">{pad(index + 1)}</span>
                  </div>
                  <p className="display mt-auto pt-16 text-6xl text-ink transition-transform duration-700 ease-out-soft group-hover:-translate-y-1 lg:text-[4.25rem]">
                    {tool.name}
                  </p>
                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">{tool.note}</p>
                  <ul className="mt-7 flex flex-wrap gap-2">
                    {tool.tags.map((tag) => (
                      <li key={tag}>
                        <Tag>{tag}</Tag>
                      </li>
                    ))}
                  </ul>
                </TiltCard>
              </Reveal>
            </li>
          ))}
        </ul>

        {/* Ledger: the full stack, layer by layer. */}
        <div className="mt-32 grid gap-10 lg:mt-44 lg:grid-cols-12">
          <Reveal className="lg:col-span-3">
            <p className="meta text-faint">Layer by layer</p>
            <p className="mt-4 max-w-[24ch] text-sm leading-relaxed text-muted">
              Read top-down, the way a request travels through a system.
            </p>
          </Reveal>

          <Reveal delay={100} className="lg:col-span-9">
            <dl className="border-t border-line">
              {stackLayers.map((row, index) => (
                <div
                  key={row.layer}
                  className="group grid gap-2 border-b border-line py-6 sm:grid-cols-[11rem_1fr] sm:items-baseline sm:gap-8"
                >
                  <dt className="flex items-baseline gap-4">
                    <span className="font-mono text-[11px] text-faint transition-colors duration-300 group-hover:text-accent">
                      {pad(index + 1)}
                    </span>
                    <span className="font-serif text-2xl text-muted italic transition-colors duration-300 group-hover:text-ink">
                      {row.layer}
                    </span>
                  </dt>
                  <dd className="flex flex-wrap gap-x-6 gap-y-1 text-[15px] leading-relaxed text-ink/90">
                    {row.items.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Principles, on the same 3 / 9 rhythm as the ledger. */}
        <div className="mt-32 grid gap-10 lg:mt-44 lg:grid-cols-12">
          <Reveal className="lg:col-span-3">
            <p className="meta text-faint">How the work is done</p>
          </Reveal>

          <ol className="border-t border-line lg:col-span-9">
            {principles.map((principle, index) => (
              <li key={principle.title} className="border-b border-line">
                <Reveal delay={index * 80} className="grid gap-4 py-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] md:gap-12">
                  <h3 className="display text-[2rem] text-ink sm:text-4xl">{principle.title}</h3>
                  <p className="text-[15px] leading-[1.75] text-muted md:pt-1.5">{principle.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
