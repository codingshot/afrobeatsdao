# Viral dance moves: methodology and sourcing plan

This document explains how to keep `src/data/dance-curriculum.ts` current with **recent viral dances** (e.g. Zep / Zep Zep, TikTok challenges, club-first trends) while staying accurate, respectful, and maintainable.

## Principles

1. **Credit culture, not just clicks** — Note country / scene (e.g. South African Amapiano, Nigerian Afrobeats), and prefer language like “challenge,” “trend,” or “community style” when there is no single canonical choreographer.
2. **Prefer stable primary links** — Official artist channels, long-form YouTube tutorials, and press from known outlets age better than lone TikTok IDs (which can be taken down).
3. **Never ship mismatched song pairs** — If a YouTube clip is a **compilation or challenge mix**, do not attach an unrelated Spotify track ID “just to have Spotify.” Omit `spotify` until a correct track mapping is verified.
4. **QA before merge** — Run `npm run test` (includes `findDanceCurriculumLinkIssues` + `findDanceCurriculumDataIssues`): valid YouTube shapes (including Shorts), optional Spotify track URLs, optional Apple Music, non-empty modules/songs, and **on-disk** images under `public/dances/`.

## What “scraping” should mean here

**Goal:** discover *candidates* for new curriculum rows (name, aliases, era, tutorial URLs, tempo notes), not to bulk-copy third-party prose or media.

| Approach | Use for | Caveats |
| --- | --- | --- |
| **Official / platform APIs** | TikTok Research API, YouTube Data API, Instagram Graph (where eligible) | ToS, quotas, app review; store keys in secrets. |
| **RSS & newsletters** | Dance media, label blogs, festival lineups | Low volume, high signal. |
| **Trend dashboards** | TikTok Creative Center, YouTube Trending (geo + music), Shazam charts | Correlation ≠ causation; confirm dance name ↔ sound. |
| **Manual curator pass** | Final copy, `keyMoves`, `culturalContext` | Required for every merge. |

Avoid **raw HTML scraping** of TikTok/Instagram against ToS when an API or export exists. If you script HTML, do it only where permitted and for **metadata you have rights to reuse**.

## Pipeline (recommended)

### 1. Ingest — “trend candidates”

- Inputs: hashtags (`#amapiano`, `#zepzep`, `#afrodance`), sound IDs, chart dates, region (ZA, NG, UK, US).
- Output JSON per candidate:  
  `{ slug, displayNames[], region, era, topVideoIds[], topTutorialIds[], confidence, sources[] }`

### 2. Deduplicate

- Merge aliases (Zep / ZEP / Zep Zep) under one `id` (e.g. `zep-zep`).
- If two trends are the same footwork with different names, pick one primary name and list others in `modernVariations` or description.

### 3. Media selection

- **Poster (`image`)**: license-cleared GIF/WebP from design, still from **rights-cleared** promo, or temporary duplicate of a neutral asset until art exists (see `zep-zep.gif` pattern).
- **Songs**: prefer **official music videos** for `youtube` + matching `spotify` when the row is “dance to this track.” For **challenge compilations**, use YouTube-only or a clearly titled highlight entry (no fake Spotify).
- **Tutorials**: one **YouTube** breakdown (watch or Shorts) + one **short-form** link (TikTok/Reels) is enough; validate URL shapes in QA.

### 4. Editorial pass

- Write `description`, `modules`, `keyMoves` in your own words after watching 2–3 independent tutorials.
- `culturalContext` / `historicalBackground`: cite phenomenon and community; avoid invented dates—use ranges (“mid-2020s”) if exact week is unclear.

### 5. Merge into `danceCurriculum`

- Choose genre key: `afrobeats` vs `amapiano` (or future `diaspora`, `kuduro`, etc.).
- Add `id` **globally unique** across all genres (`assertUniqueDanceIds`).
- Bump dance-count test when adding rows.

### 6. Refresh cadence

| Period | Action |
| --- | --- |
| Weekly (optional) | Re-run trend ingest for “new sound + dance” pairs. |
| Monthly | Re-validate top external links (spot-check oEmbed / HTTP 200). |
| On PR | Full QA tests + human read of new copy. |

## Tooling sketch (future code)

- `scripts/dance-trend-candidates.ts` — reads a CSV/JSON of hashtags, calls YouTube search API, writes `data/dance-candidates.json` (no auto-merge).
- `scripts/validate-dance-curriculum.ts` — thin CLI wrapper around `runSiteContentQa()` for CI logs.

## Legal and ethics

- Do not scrape private profiles or paywalled content.
- Prefer **embedding** or linking out; do not host others’ videos without permission.
- When in doubt about choreography ownership, describe the **move generically** and link tutorials as attribution to specific creators.

## Reference: Zep / Zep Zep (example row)

- **Genre:** `amapiano`  
- **Rationale:** Trend is widely discussed as an Amapiano-adjacent challenge; choreography is community-evolved.  
- **Links:** YouTube challenge / tutorial URLs plus TikTok tutorial; second song uses a verified Amapiano hit for practice (`Ke Star`).

Use this row as a template for future viral entries: honest scope, optional Spotify, and explicit “community / challenge” framing.
