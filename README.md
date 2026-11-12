# JUSA — Enterprise Software & Engineering Excellence

Corporate showcase and engineering portfolio for **JUSA**, founded by Juliano Sinaj
(Full-Stack Software Developer & Web Design Engineer).

Single-page site built with **React 19 + Vite 8 + TypeScript + Tailwind CSS v4** and Lucide icons.

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
  hooks/
    useActiveSection.ts        Marks the nav link for the section in view
    useScrolled.ts             Switches the header to its glass state on scroll
  components/
    layout/                    Header (desktop nav + mobile menu), Footer
    sections/                  Hero, Blueprint, Expertise, Solutions, Projects,
                               Experience, Contact, ContactForm
    ui/                        Button, Chip, Logo, Reveal, SectionHeading,
                               SpotlightCard, BrandIcons
```

## Design tokens

Tailwind v4 is configured in CSS, so there is no `tailwind.config.js`. The theme lives in the
`@theme` block of [`src/index.css`](src/index.css); each token generates utilities
(`bg-canvas`, `text-muted`, `border-line`, `shadow-glow`, ...).

| Token | Value | Use |
| --- | --- | --- |
| `canvas` | `#09090b` | Page background |
| `surface` | `#18181b` | Cards and modals |
| `ink` | `#f4f4f5` | Primary text |
| `muted` | `#a1a1aa` | Secondary text |
| `accent` | `#6366f1` | Primary accent (indigo) |
| `live` | `#10b981` | Status and conversion highlights (emerald) |

Custom utilities defined alongside: `glass` (glassmorphism panel), `bg-grid` (blueprint grid),
`bg-brand` / `text-brand` (indigo → emerald gradient).

## Editing content

- **Add a project:** append an entry to `src/data/projects.ts`. Set `liveUrl` and/or `repoUrl`
  for public links, or `accessNote` for private work.
- **Change the nav:** edit `navLinks` in `src/data/site.ts`; each `id` must match a section `id`.

## Deployment

The build output is a static bundle in `dist/`. On Vercel, import the repository and keep the
detected Vite defaults (build `npm run build`, output `dist`). Add `VITE_CONTACT_ENDPOINT` in the
project's environment variables if you use a form endpoint.
