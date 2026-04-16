import { describe, it, expect } from "vitest";
import {
  appendToQueueCapped,
  getPlayableVideoId,
  isValidYoutubeVideoId,
  MAX_QUEUE_LENGTH,
  parseStoredQueue,
  parseStoredSong,
  reorderQueueSafe,
} from "./globalAudioPlayerSupport";

describe("globalAudioPlayerSupport", () => {
  it("getPlayableVideoId accepts bare ids and common URLs", () => {
    expect(getPlayableVideoId("dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
    expect(getPlayableVideoId("https://www.youtube.com/watch?v=dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
    expect(getPlayableVideoId("")).toBeNull();
    expect(getPlayableVideoId("   ")).toBeNull();
    expect(getPlayableVideoId("bad")).toBeNull();
  });

  it("isValidYoutubeVideoId rejects too-short tokens", () => {
    expect(isValidYoutubeVideoId("short")).toBe(false);
    expect(isValidYoutubeVideoId("abcdef")).toBe(true);
  });

  it("parseStoredQueue tolerates garbage", () => {
    expect(parseStoredQueue(null)).toEqual([]);
    expect(parseStoredQueue("")).toEqual([]);
    expect(parseStoredQueue("not json")).toEqual([]);
    expect(parseStoredQueue("{}")).toEqual([]);
    expect(parseStoredQueue(JSON.stringify([{ id: "a", youtube: "x" }]))).toEqual([{ id: "a", youtube: "x" }]);
    expect(
      parseStoredQueue(
        JSON.stringify([
          { id: "1", youtube: "dQw4w9WgXcQ" },
          { foo: 1 },
          null,
        ])
      )
    ).toEqual([{ id: "1", youtube: "dQw4w9WgXcQ" }]);
  });

  it("parseStoredSong returns null for invalid", () => {
    expect(parseStoredSong(null)).toBeNull();
    expect(parseStoredSong("{}")).toBeNull();
    expect(parseStoredSong(JSON.stringify({ id: "a", youtube: "b" }))).toEqual({ id: "a", youtube: "b" });
  });

  it("appendToQueueCapped drops from the front when over max", () => {
    const base = Array.from({ length: MAX_QUEUE_LENGTH }, (_, i) => ({
      id: `s${i}`,
      youtube: "dQw4w9WgXcQ",
    }));
    const next = appendToQueueCapped(base, { id: "new", youtube: "dQw4w9WgXcQ" });
    expect(next).toHaveLength(MAX_QUEUE_LENGTH);
    expect(next[MAX_QUEUE_LENGTH - 1]?.id).toBe("new");
    expect(next[0]?.id).toBe("s1");
  });

  it("appendToQueueCapped stays bounded under stress", () => {
    let q: { id: string; youtube: string }[] = [];
    for (let i = 0; i < 5000; i++) {
      q = appendToQueueCapped(q, { id: `t${i}`, youtube: "dQw4w9WgXcQ" });
    }
    expect(q).toHaveLength(MAX_QUEUE_LENGTH);
    expect(q[MAX_QUEUE_LENGTH - 1]?.id).toBe("t4999");
  });

  it("reorderQueueSafe rejects out-of-range indices", () => {
    const q = [{ id: "a", youtube: "x" }, { id: "b", youtube: "y" }];
    expect(reorderQueueSafe(q, 0, 1)).toEqual([{ id: "b", youtube: "y" }, { id: "a", youtube: "x" }]);
    expect(reorderQueueSafe(q, -1, 0)).toBeNull();
    expect(reorderQueueSafe(q, 0, 5)).toBeNull();
    expect(reorderQueueSafe(q, 0, 0)).toBe(q);
  });
});
