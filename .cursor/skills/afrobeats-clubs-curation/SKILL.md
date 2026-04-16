---
name: afrobeats-clubs-curation
description: >-
  Fact-check and expand Afrobeats / amapiano / African diaspora club listings for
  afrobeats-landing: verify official websites, addresses, coordinates on the map,
  and QA fields. Use when adding clubs, auditing CLUBS data, fixing map pins, or
  researching venues worldwide.
---

# Afrobeats landing — clubs curation & fact checking

## Data location

- **Source of truth:** `src/data/clubs.ts` (`CLUBS` array, `Club` type in `src/types/club.ts`).
- **Map:** `/clubs` uses Leaflet (`ClubsMapView.tsx`). Global map aggregates clubs in `src/hooks/use-map-data.tsx` — each club needs **`coordinates: [longitude, latitude]`** (GeoJSON order).
- **Country / flags:** `getClubCountry(city)` in `src/data/clubs.ts` powers map metadata and UI flags (`ClubsSection`, `ClubsMapView`, `ClubsCardView`, `use-map-data`). **Extend that map** whenever you introduce a **new** `city` string on a club row.

## Fact-checking workflow (required before merge)

1. **Official web presence** — Prefer the venue’s own domain. If none exists, use the **official Instagram or Facebook page** (as for Wanderlust / some diaspora rooms). Avoid unverified blogs as `website`.
2. **HTTP sanity** — From repo root, spot-check (expect `403`/`406` from some WAFs; if so, confirm in a normal browser and note in PR text):
   ```bash
   curl -sL -o /dev/null -w "%{http_code}\n" --max-time 15 "https://example-club.com/"
   ```
3. **Address & maps** — `address` should match what the official site or Google Maps listing shows. **`google_maps`** should be a working `maps.google.com` or `maps.app.goo.gl` link for the same place.
4. **Coordinates** — Pick a point on the **building footprint** (not city centroid). Order is **`[lng, lat]`**. After edits, visually confirm on `/clubs` map and global map if applicable.
5. **Copy honesty** — If a venue is **members-only**, **ticket-only**, or **more bar than nightclub**, say so in `type` / `general_rating` / `entry_fee` so users are not misled.
6. **Automated QA** — Run `npm run test` (includes `validateClubRecords(CLUBS)`).

## Field conventions (match existing rows)

| Field | Guidance |
|--------|-----------|
| `music` | Comma-separated genres; “varies by night” when programming shifts. |
| `hours` | Qualify with “check site” unless hours are stable on the official page. |
| `year_founded` | Decade is OK if exact year is unclear. |
| `capacity` | Ranges are fine; avoid false precision. |

## Sourcing ideas (then verify each)

- Official venue site, Google Maps business profile, Resident Advisor / Shotgun / Dice for **European** ticket pages (supplement, not sole source).
- **Africa:** prioritize Lagos, Accra, Nairobi, Joburg, Cape Town, Dakar, Abidjan — always confirm the venue is **still operating** (clubs close or rebrand often).

## Anti-patterns

- Do not invent addresses or coordinates.
- Do not list a venue as “Afrobeats-only” if it is primarily EDM or techno with rare Afro nights — describe accurately.
- Do not add `coordinates` without updating **`getClubCountry`** (and `countryCodeMap` in `use-country-flags.tsx` if you need a flag asset for a new country).
