# Afrobeats events: population, fact-checking, and seeding plan

This document describes how to keep `src/data/events.json` accurate, how to scale it with **per-artist concerts**, and which sources to trust.

## Goals

- **Curated festivals** in JSON remain hand-reviewed; each row should cite an official site or primary ticket partner.
- **Artist tours** should eventually come from structured APIs or partner feeds, not guesswork, and be merged without duplicating the same show twice.

## Data model (current)

Each key in `events.json` is the display title. Recommended fields:

| Field | Required | Notes |
| --- | --- | --- |
| `image_url` | yes | Prefer first-party art or rights-cleared press assets; avoid hotlinking fragile CDNs. |
| `website` | yes | Official site or venue page. |
| `ticket_url` | optional | Direct ticket/checkout URL; UI uses this for “Get Tickets”. |
| `location`, `event_description`, `organizer` | yes | Copy should reflect **confirmed** year/edition; say “TBD / confirm on …” when needed. |
| `start_date`, `end_date` | yes | ISO `YYYY-MM-DD`. Past vs upcoming is based on **end_date** (see `Events.tsx` / `EventsSection.tsx`). |
| `ticket_info` | yes | Human-readable tier guidance; not a URL. |

## Fact-checking workflow (festivals)

1. **Official organiser** (e.g. `afronation.com`, `afrofuture.com`, `flytimefest.com`, `mawazine.ma`) for dates, cancellation, and ticket authenticity.
2. **Primary ticket partner** (Ticketmaster, Dice, Eventbrite organiser account, Oztix, tix.africa, etc.) for on-sale state and venue.
3. **Do not** treat SEO blogs, package tour pages, or Wikipedia as authoritative; use them only as hints, then confirm on (1) or (2).
4. **Cancelled or dormant brands** (e.g. Afro Nation Nigeria after the cancelled rollout): remove misleading “upcoming” copy; point users to active alternatives (e.g. Flytime Fest for Lagos Detty December) when that is editorially appropriate.
5. **Images**: store under `public/` where possible; replace `.heic`, broken hotlinks, and placeholder logos.

## Per-artist concert discovery (recommended pipeline)

`src/data/artists.ts` is the roster input. The goal is a **repeatable job** that proposes events for QA before they hit production JSON.

### Phase 1 — Export list

- Add a small script (e.g. `scripts/list-artist-seeds.ts`) that imports `ARTISTS` and writes `artist-name`, `spotify_id` (if present), and `country` to `data/artist-seeds.json` for downstream tools.

### Phase 2 — Provider abstraction

Implement one interface, multiple adapters:

- **Ticketmaster Discovery API** (US/UK/EU coverage): search by keyword + geo; store `id`, `url`, `dates`, `venue`.
- **Bandsintown** or **Songkick** (artist-centric): good for “all dates for artist X”.
- **SeatGeek / Dice** where Ticketmaster is weak (optional, by market).

Normalize every hit to:

```text
{ source, external_id, artist_ids[], title, venue, city, country, start, end, ticket_url, info_url, raw }
```

### Phase 3 — Dedupe and merge

- Same show across providers: match on `(date local, venue normalised, headliner)` fuzzy score ≥ threshold.
- Same show as a curated festival row: if venue + date ⊆ known festival, **link** to festival slug instead of creating a duplicate club-night row.

### Phase 4 — QA queue

- Output `data/events-candidates.json` + a Markdown or CSV diff for editors.
- Rules: drop TBA placeholders with no URL; flag “rescheduled” / “cancelled” strings from API; require `ticket_url` or official `info_url` before merge.

### Phase 5 — Storage options

- **Short term**: extend `events.json` with generated rows (keys like `Burna Boy — London 2026-06-01`) after QA.
- **Medium term**: split `events.festivals.json` vs `events.shows.json` and merge at build time to keep file size manageable.
- **Long term**: small backend or edge function + cache for live ticket links (URLs rot quickly).

## Refresh cadence

| Data | Suggested cadence |
| --- | --- |
| Major festivals | Weekly during on-sale / lineup season; monthly otherwise. |
| Artist tours | Daily batched job during tour announcements; weekly steady state. |
| Static copy / images | On each PR that touches events. |

## Rate limits and keys

- Store API keys in CI secrets, not the repo.
- Batch artists (e.g. 20 per minute) with exponential backoff; respect provider ToS.
- Log `429` and provider error bodies for tuning.

## QA checklist (before merge)

- [ ] `end_date` ≥ `start_date`; timezone for single-night shows documented if needed.
- [ ] Past editions are not shown as upcoming.
- [ ] `ticket_url` opens a real checkout or organiser page (not 404).
- [ ] No false “official” claims for unconfirmed 2026 dates.
- [ ] Map pins: `use-map-data.tsx` `locationCoords` includes any new `location` string exactly.

## Testing

After JSON or map location changes:

- `npm run lint`
- `npm run test`
- `npm run build`

Manually spot-check `/events`, home events carousel, `/event/:slug`, and the map layer for new pins.
