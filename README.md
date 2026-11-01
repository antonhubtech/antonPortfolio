# Virtual Assistant Portfolio

A futuristic, interactive portfolio site built with **Vite + React + TypeScript + Tailwind CSS v4 + Motion + Lucide**.
Six pages (Home, About, Services, Portfolio, Tools, Contact) with a custom cursor, preloader, cinematic page
transitions, scroll-driven reveals, a particle backdrop and an interactive hero.

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-checks, then outputs ./dist
npm run preview   # serve the production build locally
```

Requires Node 20+.

## Make it yours — one file

Everything personal lives in **`src/data/content.ts`**. Anything in `[BRACKETS]` is a placeholder:

| What | Where in `content.ts` |
| --- | --- |
| Name, title, bio, email, location | `profile` |
| Profile photo | put an image in `/public` (e.g. `me.jpg`) and set `profile.photoUrl: './me.jpg'` |
| Social links | `profile.socials[].href` (icons without a link render as inert, labelled icons — never broken links) |
| Stats | `stats` (the two marked `placeholder` show an asterisk until you remove `note`) |
| Services | `services` |
| Portfolio projects | `projects` (replace the `[PROJECT DESCRIPTION]` slots; thumbnails are generated from `hue` + `motif`) |
| Tools | `tools` |
| Testimonials | `testimonials` — only add real quotes you have permission to publish |
| About copy | `about` |

Also update the `<title>` and `<meta>` tags in `index.html` once you have your name.

## Contact form

The form validates and animates, but **does not send anything until you connect a service**. Until then
it shows an honest "preview only" confirmation.

To go live, create a form endpoint (e.g. [Formspree](https://formspree.io) or Web3Forms) and paste its URL into
`profile.formEndpoint` in `content.ts`. The form will POST JSON `{ name, email, subject, message }` and show a real
success / error state.

## Project structure

```
src/
  data/content.ts      all copy and personal details
  router.tsx           tiny hash router + curtain page transition
  components/          Cursor, Preloader, Background, Nav, Button, Magnetic, Reveal, SpotlightCard, Modal, ...
  pages/               Home, About, Services, Portfolio, Tools, Contact
  index.css            design tokens (colours, fonts) and shared utilities
```

Design tokens (colours, fonts) are in the `@theme` block at the top of `src/index.css`.

## Deploying

`npm run build` produces a static site in `dist/` that works on any static host (Netlify, Vercel, Cloudflare Pages,
GitHub Pages). Routing is hash-based (`/#services`), so no server rewrite rules are needed.

## Accessibility & performance notes

- Skip link, visible focus rings, `aria-current` on navigation, focus moves to the page on navigation.
- Modals trap focus, close on Esc, and restore focus.
- `prefers-reduced-motion` is respected: CSS animations are disabled, the particle field renders one still frame,
  and page transitions are skipped.
- The custom cursor and magnetic effects only run on devices with a precise pointer; touch devices get the normal cursor.
- The particle canvas caps its density and pixel ratio and pauses when the tab is hidden.
