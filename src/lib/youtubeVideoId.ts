/**
 * Extracts a YouTube watch/embed ID from common URL shapes or returns a bare ID.
 */
export function getYoutubeVideoId(youtube: string): string {
  if (!youtube) return "";
  const trimmed = youtube.trim();
  if (trimmed.includes("v=")) {
    return trimmed.split("v=")[1]?.split("&")[0] ?? trimmed;
  }
  if (trimmed.includes("youtu.be/")) {
    return trimmed.split("youtu.be/")[1]?.split("?")[0] ?? trimmed;
  }
  return trimmed;
}
