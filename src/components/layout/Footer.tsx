import { navLinks, site } from '../../data/site'
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons'
import { Logo } from '../ui/Logo'

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Enterprise software and engineering excellence. Backend systems, digital platforms and the
            infrastructure that keeps them running.
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`} className="text-muted transition-colors hover:text-ink">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col-reverse items-start gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-faint">
            © {new Date().getFullYear()} {site.name} · Engineered by {site.founder}
          </p>
          <div className="flex items-center gap-2">
            <a
              href={site.links.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="inline-flex size-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-ink"
            >
              <GithubIcon className="size-4" />
            </a>
            {site.links.linkedin && (
              <a
                href={site.links.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="inline-flex size-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-ink"
              >
                <LinkedinIcon className="size-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
