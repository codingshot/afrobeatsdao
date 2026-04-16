---
name: afrobeats-site-qa
description: >-
  Structured QA for the afrobeats-landing Vite/React site: fact-checking copy and
  streaming links, club and dance dataset validation, internal routes, broken
  external links, mobile layout, global YouTube player behavior, and regression
  hunting. Use when auditing the site, before releases, or when the user asks for
  QA, fact checks, link checks, responsive review, or player/clubs/dances testing.
---

# Afrobeats landing — site QA

## Automated checks (run first)

From the repo root:

```bash
npm run test
```

This runs Vitest suites that validate club rows, dance curriculum IDs and song
links (YouTube + Spotify shape, no known placeholder IDs), YouTube ID parsing,
and internal route patterns (`src/lib/siteContentQA.ts`, `siteRoutes.ts`,
`youtubeVideoId.ts`).

## Fact checking and external links

1. **Streaming links** — For each `spotify` / `youtube` entry in
   `src/data/dance-curriculum.ts`, confirm the track matches title + artist;
   prefer official artist pages or label links. Extend
   `assertValidSpotifyTrackUrl` / YouTube checks in `siteContentQA.ts` if new
   URL shapes appear.
2. **Events, jobs, news** — Cross-check dates, locations, and ticket URLs in
   `src/data/*.json` and `src/data/*.ts` against the source of truth; treat
   one-off Eventbrite URLs as time-sensitive and verify or replace before major
   launches.
3. **Broken HTTP links** — Run a link crawler against staging/production (e.g.
   Playwright + `request.head`, or `lychee`/similar). Expect `429`/`403` from
   some social hosts; retry or mark as manual verification.

## Mobile and responsive

1. **Breakpoints** — `useIsMobile` uses 768px (`src/hooks/use-mobile.tsx`).
   Check nav, carousels, map/clubs views, dance detail pages, and the bottom
   `GlobalAudioPlayer` bar at ~320px, 390px, and 768px widths.
2. **Touch targets** — Player and queue controls should remain tappable without
   overlap from fixed video (`z-[200]`) vs bar (`z-[150]`).

## Global audio / YouTube player

1. **Smoke** — Start playback from `/music`, queue drawer open/close, skip,
   repeat, volume, restore from `localStorage` after refresh.
2. **Edge cases** — Corrupt `localStorage` JSON should not crash the app
   (errors are logged). Bare 11-char IDs and `watch` / `youtu.be` URLs must all
   load (`getYoutubeVideoId`).

## Clubs and map data

1. Run `validateClubRecords` expectations via `npm run test`.
2. Manually verify `coordinates` as **[longitude, latitude]** and that
   `google_maps` matches `address`.

## Dances and routing

1. `/dance/:genre/:id` and `/dance/:id` must resolve to the same dance when the
   ID is unique across genres (`src/pages/DanceDetails.tsx`).
2. After adding a dance, update tests if IDs or link rules change.

## Bug-hunting checklist

- [ ] `npm run build` and `npm run lint` clean
- [ ] `npm run test` clean
- [ ] No `console.error` storms on cold load (YouTube API is async)
- [ ] 404 route (`*` in `App.tsx`) still reachable

## Optional: Playwright (not installed by default)

For viewport screenshots or `HEAD` link checks, add `@playwright/test`, then
script `test:e2e` and keep specs under `e2e/`. Install browsers with
`npx playwright install` on CI or locally.
