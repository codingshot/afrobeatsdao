/**
 * Extracts a YouTube watch/embed ID from common URL shapes or returns a bare ID.
 */
export function getYoutubeVideoId(youtube: string): string {
  if (!youtube) return "";
  const trimmed = youtube.trim();

  const shorts = trimmed.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/i);
  if (shorts?.[1]) return shorts[1];

  const embed = trimmed.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/i);
  if (embed?.[1]) return embed[1];

  const live = trimmed.match(/youtube\.com\/live\/([a-zA-Z0-9_-]+)/i);
  if (live?.[1]) return live[1];

  if (trimmed.includes("v=")) {
    return trimmed.split("v=")[1]?.split("&")[0]?.split("#")[0] ?? trimmed;
  }
  if (trimmed.includes("youtu.be/")) {
    return trimmed.split("youtu.be/")[1]?.split("?")[0]?.split("#")[0] ?? trimmed;
  }

  if (/^[a-zA-Z0-9_-]{6,}$/.test(trimmed)) {
    return trimmed;
  }

  return trimmed;
}
