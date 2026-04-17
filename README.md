# Afrobeats.party

Public site for **Afrobeats.party**: African and diaspora music discovery, playlists, events, club listings, dance curriculum, news, and community pages. Built as a fast React SPA with server-friendly metadata via `react-helmet`.

**Live site:** [https://afrobeats.party](https://afrobeats.party)

---

## Quick start

```sh
git clone https://github.com/<your-org>/afrobeats-landing.git
cd afrobeats-landing
npm install
npm run dev
```

Dev server defaults to port **8080** (see `vite.config.ts`).

| Script | Purpose |
|--------|---------|
| `npm run dev` | Vite dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | ESLint |
| `npm test` | Vitest unit tests |

---

## Stack

- React 18 + TypeScript, Vite 5, React Router 6  
- Tailwind CSS + shadcn/ui (Radix)  
- TanStack Query, Framer Motion, Leaflet (clubs / map)  
- Global audio: YouTube IFrame API via `GlobalAudioPlayer` context  

Canonical URLs and shared SEO helpers live in `src/lib/siteSeo.ts` (`SITE_ORIGIN`, `absoluteUrl`, JSON-LD helpers).

---

## Project layout (high level)

| Path | Role |
|------|------|
| `src/pages/` | Route-level screens (home, dance, events, clubs, music, careers, …) |
| `src/components/` | UI, layout, global player, carousels |
| `src/data/` | Curated JSON/TS data: `events.json`, `clubs.ts`, `artists.ts`, `dance-curriculum.ts`, … |
| `public/` | Static assets, `robots.txt`, `sitemap.xml`, `llms.txt`, `branding/` images |

---

## Global audio player

The bottom dock player is a React context (`GlobalAudioPlayerProvider`) that persists queue and volume in `localStorage`, integrates the YouTube IFrame API, optional video surface, queue drawer with drag-and-drop, and the Media Session API for OS media keys.

Primary implementation: `src/components/GlobalAudioPlayer.tsx` (queue UI in `QueueDrawer.tsx`, home random vibes in `VibeOfTheDay.tsx`).

---

## Deployment

This is a static client bundle after `npm run build`. Deploy `dist/` to any static host (e.g. Vercel, Netlify, Cloudflare Pages, S3+CDN). Ensure:

- SPA fallback routes all resolve to `index.html` for client-side routing.  
- Environment-specific analytics or API keys are injected at build time if you add them later.

`vercel.json` in the repo can be adjusted for rewrites on that platform.

---

## Contributing

Issues and PRs are welcome. When changing copy about real venues or festivals, prefer primary sources (official sites and ticketing) so listings stay accurate for visitors and search engines.

---

## License

Project licensing is defined by the repository owner; add or update a `LICENSE` file if you need an explicit OSS license.
