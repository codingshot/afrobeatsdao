import { describe, expect, it } from "vitest";
import { collectRandomPlayableSongs, shuffleArray } from "./randomSongPool";

describe("collectRandomPlayableSongs", () => {
  it("returns a non-trivial deduped pool", () => {
    const pool = collectRandomPlayableSongs();
    expect(pool.length).toBeGreaterThan(30);
    const ids = new Set(pool.map((s) => s.youtube));
    expect(ids.size).toBe(pool.length);
  });
});

describe("shuffleArray", () => {
  it("preserves length and elements", () => {
    const a = [1, 2, 3, 4, 5];
    const b = shuffleArray(a);
    expect(b).toHaveLength(5);
    expect(b.sort()).toEqual([1, 2, 3, 4, 5]);
  });
});
