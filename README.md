# JUSA — Enterprise Software & Engineering Excellence

Corporate showcase and engineering portfolio for **JUSA**, founded by Juliano Sinaj
(Full-Stack Software Developer & Web Design Engineer).

Single-page site built with **React 19 + Vite 8 + TypeScript + Tailwind CSS v4**, **Framer Motion** for animation,
**Lenis** for smooth scrolling, and Lucide icons.

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build locally
```

Requires Node 20.19+ (or 22.12+).

## Before going live

Two values in [`src/data/site.ts`](src/data/site.ts) are intentionally empty. Until they are set,
the matching links are not rendered and the contact form reports that it could not send.

| Setting | Where | Effect |
| --- | --- | --- |
| `site.email` | `src/data/site.ts` | Shows the email channel; the form opens the visitor's mail client addressed to it |
| `site.links.linkedin` | `src/data/site.ts` | Shows the LinkedIn links in Contact and the footer |
| `VITE_CONTACT_ENDPOINT` | `.env` (see `.env.example`) | Optional. The form POSTs JSON to this URL (Formspree, Getform, your own API) instead of using the mail client |

## Structure

```
index.html                     Document shell, meta and Open Graph tags
vite.config.ts                 Vite + React + Tailwind plugins
src/
  main.tsx                     React entry
  App.tsx                      Page composition (header → sections → footer)
  index.css                    Tailwind import, design tokens (@theme), shared utilities
  data/                        All copy and content — edit here, not in components
    site.ts                    Brand, founder, contact links, nav items
    expertise.ts               Stack matrix and engineering principles
    solutions.ts               The four enterprise solution pillars
    projects.ts                Featured projects, live and repository links
    experience.ts              Professional timeline
  lib/
    cn.ts                      Class-name joiner
    contact.ts                 Form validation rules and delivery (endpoint → mailto)
  lib/motion.ts                Easing curves, springs, intro/hero timing
  hooks/
    useActiveSection.ts        Marks the nav link for the section in view
    useScrolled.ts             Shrinks the header once the page scrolls
    useFinePointer.ts          Gates pointer effects (mouse only, no reduced motion)
  components/
    motion/                    SmoothScroll (Lenis), Ambient (background light),
                               Intro (opening curtain), WordReveal, TiltCard, Magnetic
    layout/                    Header (desktop nav + mobile menu), Footer
    sections/                  Hero, Expertise, Solutions (Services), Projects (Work),
                               ProjectArt, Experience (Background), Contact, ContactForm
    ui/                        Button, Tag, Logo, BrandMark (JS monogram badge), StatusDot,
                               Reveal, SectionHeading, BrandIcons
```

## Design tokens

Tailwind v4 is configured in CSS, so there is no `tailwind.config.js`. The theme lives in the
`@theme` block of [`src/index.css`](src/index.css); each token generates utilities
(`bg-canvas`, `text-muted`, `border-line`, `font-serif`, ...).

| Token | Value | Use |
| --- | --- | --- |
| `canvas` | `#0a0a0c` | Page background (warm charcoal) |
| `surface` | `#121216` | Cards and the form panel |
| `ink` | `#ededef` | Primary text |
| `muted` | `#9898a0` | Secondary text and metadata |
| `faint` | `#808088` | Tertiary labels (still 4.5:1 on `surface`) |
| `line` | `white / 8%` | Hairline borders |
| `accent` | `#f59e0b` | Amber. Active states, indicator dots and hover feedback only |

Type: **Instrument Serif** for display headings (`display` utility), **Inter** for body text,
**Geist Mono** for small uppercase metadata (`meta` utility). All fonts are self-hosted via Fontsource.

Other utilities in `index.css`: `frame` (page measure and gutters), `link-line` / `link-line-rest`
(drawn underlines), `sweep-border` (amber arc that circles a button on hover), `tag` (hover-lift badge),
`.tilt-card` (pointer-following inner light), `.grain` (film grain).

## Motion

| Effect | Where | Notes |
| --- | --- | --- |
| Opening curtain | `motion/Intro.tsx` | Once per browser session (`sessionStorage`) |
| Word-by-word headline reveal | `motion/WordReveal.tsx` | Hero on load; section titles on scroll |
| Smooth scroll + eased anchor links | `motion/SmoothScroll.tsx` | Lenis, offset for the fixed header |
| Ambient light + cursor glow | `motion/Ambient.tsx` | Drift is pure CSS; glow follows the cursor on a spring |
| 3D tilt, amber border, preview parallax | `motion/TiltCard.tsx` | Expertise and project bento cards |
| Magnetic buttons + border sweep | `motion/Magnetic.tsx`, `ui/Button.tsx` | All buttons by default (`magnetic={false}` to opt out) |
| Shrinking header, sliding nav dot, scroll progress | `layout/Header.tsx` | |
| Floating labels, animated success | `sections/ContactForm.tsx` | |

Every effect respects `prefers-reduced-motion`: the intro, Lenis and parallax are skipped,
pointer effects switch off, and reveals fall back to plain fades. Pointer effects also stay off on touch devices.

## Editing content

- **Add a project:** append an entry to `src/data/projects.ts`. Set `liveUrl` and/or `repoUrl`
  for public links, or `accessNote` for private work.
- **Project screenshots:** each case study shows an illustrated preview (`art`) until you add a real
  image. Put the file in `public/projects/` and set `image: '/projects/krox.jpg'`; 16:10 works best.
- **Change the nav:** edit `navLinks` in `src/data/site.ts`; each `id` must match a section `id`.

## Deployment

The build output is a static bundle in `dist/`. On Vercel, import the repository and keep the
detected Vite defaults (build `npm run build`, output `dist`). Add `VITE_CONTACT_ENDPOINT` in the
project's environment variables if you use a form endpoint.
