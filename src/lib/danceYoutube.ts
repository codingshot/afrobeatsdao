import { getYoutubeVideoId } from "@/lib/youtubeVideoId";

export function isLikelyYoutubeUrl(url: string): boolean {
  const u = url.toLowerCase();
  return u.includes("youtube.com") || u.includes("youtu.be");
}

/**
 * First YouTube-backed tutorial entry (skips TikTok / Instagram links).
 */
export function getPrimaryYoutubeTutorial<T extends { link: string }>(
  tutorials: T[] | undefined
): T | null {
  for (const t of tutorials ?? []) {
    if (!t?.link) continue;
    if (!isLikelyYoutubeUrl(t.link)) continue;
    const id = getYoutubeVideoId(t.link);
    if (id.replace(/[^a-zA-Z0-9_-]/g, "").length >= 6) return t;
  }
  return null;
}

/**
 * Video id for dance cards / carousel: first YouTube tutorial, else first song MV.
 */
export function getFirstCurriculumYoutubeVideoId(dance: {
  tutorials?: { link: string }[];
  songs?: { youtube: string }[];
}): string {
  const t = getPrimaryYoutubeTutorial(dance.tutorials);
  if (t) return getYoutubeVideoId(t.link);
  const song = dance.songs?.[0];
  if (song?.youtube) return getYoutubeVideoId(song.youtube);
  return "";
}
