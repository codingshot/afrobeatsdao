import { getYoutubeVideoId } from "@/lib/youtubeVideoId";

export type QueueSong = {
  id: string;
  youtube: string;
  title?: string;
  artist?: string;
};

/** Hard cap so queue persistence and render stay bounded under stress. */
export const MAX_QUEUE_LENGTH = 200;

const YT_ID_RE = /^[a-zA-Z0-9_-]{6,}$/;

export function isValidYoutubeVideoId(id: string): boolean {
  return Boolean(id && YT_ID_RE.test(id.trim()));
}

/** Returns a normalized 11-char style id, or null if not playable in the iframe API. */
export function getPlayableVideoId(youtube: string | undefined): string | null {
  if (!youtube?.trim()) return null;
  const id = getYoutubeVideoId(youtube);
  return isValidYoutubeVideoId(id) ? id.trim() : null;
}

export function isQueueSong(x: unknown): x is QueueSong {
  if (!x || typeof x !== "object") return false;
  const o = x as Record<string, unknown>;
  return typeof o.id === "string" && typeof o.youtube === "string" && o.id.length > 0;
}

export function parseStoredQueue(raw: string | null): QueueSong[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isQueueSong);
  } catch {
    return [];
  }
}

export function parseStoredSong(raw: string | null): QueueSong | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as unknown;
    return isQueueSong(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

/** Append with FIFO cap (drop oldest at front when over max). */
export function appendToQueueCapped(queue: QueueSong[], song: QueueSong, max = MAX_QUEUE_LENGTH): QueueSong[] {
  const next = [...queue, song];
  if (next.length <= max) return next;
  const overflow = next.length - max;
  return next.slice(overflow);
}

export function reorderQueueSafe(queue: QueueSong[], from: number, to: number): QueueSong[] | null {
  if (!Number.isInteger(from) || !Number.isInteger(to)) return null;
  if (from < 0 || to < 0 || from >= queue.length || to >= queue.length) return null;
  if (from === to) return queue;
  const copy = [...queue];
  const [removed] = copy.splice(from, 1);
  copy.splice(to, 0, removed);
  return copy;
}
