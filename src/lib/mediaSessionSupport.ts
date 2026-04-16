/** YouTube thumbnail sizes for lock-screen / OS media artwork (best-first). */
export function buildYoutubeArtwork(
  videoId: string | null,
  fallbackAbsolute: string
): { src: string; sizes?: string; type?: string }[] {
  if (!videoId) {
    return [{ src: fallbackAbsolute, sizes: "512x512", type: "image/png" }];
  }
  const base = `https://img.youtube.com/vi/${videoId}`;
  return [
    { src: `${base}/maxresdefault.jpg`, sizes: "1280x720", type: "image/jpeg" },
    { src: `${base}/sddefault.jpg`, sizes: "640x480", type: "image/jpeg" },
    { src: `${base}/hqdefault.jpg`, sizes: "480x360", type: "image/jpeg" },
    { src: `${base}/mqdefault.jpg`, sizes: "320x180", type: "image/jpeg" },
    { src: `${base}/default.jpg`, sizes: "120x90", type: "image/jpeg" },
    { src: fallbackAbsolute, sizes: "512x512", type: "image/png" },
  ];
}

export function positionStateForMediaSession(
  duration: number,
  position: number,
  playbackRate = 1
): { duration: number; playbackRate: number; position: number } | null {
  if (!Number.isFinite(duration) || duration <= 0) return null;
  if (!Number.isFinite(position) || position < 0) return null;
  if (!Number.isFinite(playbackRate) || playbackRate <= 0) return null;
  const pos = Math.min(position, duration);
  return { duration, playbackRate, position: pos };
}
