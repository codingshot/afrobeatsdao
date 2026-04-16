import { existsSync } from "node:fs";
import { join } from "node:path";

import { CLUBS } from "@/data/clubs";
import { danceCurriculum } from "@/data/dance-curriculum";
import type { Club } from "@/types/club";

/** Known placeholder / synthetic Spotify track IDs used in early drafts */
const SPOTIFY_PLACEHOLDER_SUBSTRINGS = ["z9xQz3x4Y5z6Z", "z9xQz3x4Y5z6Z0"];

const SPOTIFY_TRACK_RE = /^https:\/\/open\.spotify\.com\/track\/([0-9A-Za-z]{22})(?:\?.*)?$/;

const YOUTUBE_WATCH_RE = /^https:\/\/(www\.)?youtube\.com\/watch\?v=[\w-]{6,}(&.*)?$/;
const YOUTUBE_SHORT_RE = /^https:\/\/youtu\.be\/[\w-]{6,}(\?.*)?$/;
const YOUTUBE_SHORTS_RE = /^https:\/\/(www\.)?youtube\.com\/shorts\/[\w-]{6,}(\?.*)?$/;
const YOUTUBE_EMBED_RE = /^https:\/\/(www\.)?youtube\.com\/embed\/[\w-]{6,}(\?.*)?$/;
const YOUTUBE_LIVE_RE = /^https:\/\/(www\.)?youtube\.com\/live\/[\w-]{6,}(\?.*)?$/;

export function assertValidSpotifyTrackUrl(url: string, context: string): void {
  const m = url.trim().match(SPOTIFY_TRACK_RE);
  if (!m) {
    throw new Error(`${context}: invalid Spotify track URL: ${url}`);
  }
  const id = m[1];
  if (SPOTIFY_PLACEHOLDER_SUBSTRINGS.some((p) => id.includes(p))) {
    throw new Error(`${context}: Spotify track id looks like a placeholder: ${id}`);
  }
}

const APPLE_MUSIC_ITEM_RE =
  /^https:\/\/music\.apple\.com\/[^/]+\/(song|album|music-video|playlist|artist)\/[^?\s]+/;

export function assertValidYoutubeUrl(url: string, context: string): void {
  const u = url.trim();
  if (
    !YOUTUBE_WATCH_RE.test(u) &&
    !YOUTUBE_SHORT_RE.test(u) &&
    !YOUTUBE_SHORTS_RE.test(u) &&
    !YOUTUBE_EMBED_RE.test(u) &&
    !YOUTUBE_LIVE_RE.test(u)
  ) {
    throw new Error(`${context}: unexpected YouTube URL shape: ${url}`);
  }
}

export function assertValidAppleMusicUrl(url: string, context: string): void {
  const u = url.trim();
  if (!APPLE_MUSIC_ITEM_RE.test(u)) {
    throw new Error(`${context}: unexpected Apple Music URL shape: ${url}`);
  }
}

export function validateClubRecords(clubs: Club[]): string[] {
  const issues: string[] = [];
  const names = new Set<string>();

  clubs.forEach((club, i) => {
    const prefix = `Club[${i}] "${club.name || "(no name)"}"`;
    if (!club.name?.trim()) issues.push(`${prefix}: missing name`);
    if (names.has(club.name)) issues.push(`${prefix}: duplicate name`);
    names.add(club.name);

    if (!club.city?.trim()) issues.push(`${prefix}: missing city`);
    if (!club.address?.trim()) issues.push(`${prefix}: missing address`);

    if (club.website && club.website.trim()) {
      try {
        const u = new URL(club.website);
        if (u.protocol !== "https:" && u.protocol !== "http:") {
          issues.push(`${prefix}: website has unusual protocol (${u.protocol})`);
        }
      } catch {
        issues.push(`${prefix}: invalid website URL`);
      }
    }

    if (club.google_maps?.trim()) {
      try {
        new URL(club.google_maps);
      } catch {
        issues.push(`${prefix}: invalid google_maps URL`);
      }
    }

    if (club.coordinates) {
      const [lng, lat] = club.coordinates;
      if (typeof lng !== "number" || typeof lat !== "number" || Number.isNaN(lng) || Number.isNaN(lat)) {
        issues.push(`${prefix}: coordinates must be numeric [lng, lat]`);
      } else if (lng < -180 || lng > 180 || lat < -90 || lat > 90) {
        issues.push(`${prefix}: coordinates out of WGS84 range`);
      }
    }
  });

  return issues;
}

export type DanceSongLinkIssue = { genre: string; danceId: string; title: string; message: string };

function isLikelyYoutubeLink(link: string): boolean {
  const u = link.toLowerCase();
  return u.includes("youtube.com") || u.includes("youtu.be");
}

export function findDanceCurriculumLinkIssues(): DanceSongLinkIssue[] {
  const issues: DanceSongLinkIssue[] = [];

  (Object.keys(danceCurriculum) as (keyof typeof danceCurriculum)[]).forEach((genre) => {
    danceCurriculum[genre].forEach((dance) => {
      const ctx = (title: string) => ({ genre, danceId: dance.id, title });

      dance.songs?.forEach((song) => {
        const c = ctx(song.title);
        try {
          assertValidYoutubeUrl(song.youtube, `${c.genre}/${c.danceId} "${c.title}" youtube`);
        } catch (e) {
          issues.push({ ...c, message: (e as Error).message });
        }
        if (song.spotify) {
          try {
            assertValidSpotifyTrackUrl(song.spotify, `${c.genre}/${c.danceId} "${c.title}" spotify`);
          } catch (e) {
            issues.push({ ...c, message: (e as Error).message });
          }
        }
        if (song.appleMusic) {
          try {
            assertValidAppleMusicUrl(song.appleMusic, `${c.genre}/${c.danceId} "${c.title}" appleMusic`);
          } catch (e) {
            issues.push({ ...c, message: (e as Error).message });
          }
        }
      });

      dance.tutorials?.forEach((tutorial) => {
        const label = `[tutorial] ${tutorial.title}`;
        const c = ctx(label);
        if (!tutorial.link?.trim()) {
          issues.push({ ...c, message: `${genre}/${dance.id} tutorial "${tutorial.title}": missing link` });
          return;
        }
        try {
          // eslint-disable-next-line no-new
          new URL(tutorial.link);
        } catch {
          issues.push({ ...c, message: `${genre}/${dance.id} tutorial "${tutorial.title}": invalid URL` });
          return;
        }
        const yt =
          tutorial.platform === "YouTube" || isLikelyYoutubeLink(tutorial.link);
        if (yt) {
          try {
            assertValidYoutubeUrl(tutorial.link, `${c.genre}/${c.danceId} "${tutorial.title}" tutorial youtube`);
          } catch (e) {
            issues.push({ ...c, message: (e as Error).message });
          }
        }
      });
    });
  });

  return issues;
}

/** Structural checks: required fields, module/song counts, local poster files under `public/`. */
export function findDanceCurriculumDataIssues(): string[] {
  const issues: string[] = [];
  const publicRoot = join(process.cwd(), "public");

  (Object.keys(danceCurriculum) as (keyof typeof danceCurriculum)[]).forEach((genre) => {
    danceCurriculum[genre].forEach((dance) => {
      const p = `${genre}/${dance.id}`;
      if (!dance.id?.trim()) issues.push(`${p}: missing id`);
      if (!dance.name?.trim()) issues.push(`${p}: missing name`);
      if (!dance.origin?.trim()) issues.push(`${p}: missing origin`);
      if (!dance.description?.trim()) issues.push(`${p}: missing description`);
      if (!dance.difficulty?.trim()) issues.push(`${p}: missing difficulty`);
      if (!dance.image?.trim()) issues.push(`${p}: missing image`);

      if (!dance.modules?.length) issues.push(`${p}: modules must be a non-empty array`);
      if (!dance.songs?.length) issues.push(`${p}: songs must be a non-empty array`);

      dance.songs?.forEach((song, i) => {
        if (!song.title?.trim()) issues.push(`${p} song[${i}]: missing title`);
        if (!song.artist?.trim()) issues.push(`${p} song[${i}]: missing artist`);
        if (!song.youtube?.trim()) issues.push(`${p} song[${i}]: missing youtube`);
      });

      if (dance.image?.startsWith("/")) {
        const fsPath = join(publicRoot, dance.image.replace(/^\//, ""));
        if (!existsSync(fsPath)) {
          issues.push(`${p}: image file missing on disk: ${dance.image}`);
        }
      } else if (dance.image?.startsWith("http://") || dance.image?.startsWith("https://")) {
        try {
          // eslint-disable-next-line no-new
          new URL(dance.image);
        } catch {
          issues.push(`${p}: image URL is invalid`);
        }
      } else {
        issues.push(`${p}: image must be an absolute path (/...) or https URL`);
      }
    });
  });

  return issues;
}

export function assertUniqueDanceIds(): string[] {
  const seen = new Map<string, string>();
  const dupes: string[] = [];

  (Object.keys(danceCurriculum) as (keyof typeof danceCurriculum)[]).forEach((genre) => {
    danceCurriculum[genre].forEach((dance) => {
      if (seen.has(dance.id)) {
        dupes.push(`id "${dance.id}" in ${genre} duplicates ${seen.get(dance.id)}`);
      } else {
        seen.set(dance.id, genre);
      }
    });
  });

  return dupes;
}

export function runSiteContentQa(): {
  clubs: string[];
  dances: DanceSongLinkIssue[];
  danceIds: string[];
  danceData: string[];
} {
  return {
    clubs: validateClubRecords(CLUBS),
    dances: findDanceCurriculumLinkIssues(),
    danceIds: assertUniqueDanceIds(),
    danceData: findDanceCurriculumDataIssues(),
  };
}
