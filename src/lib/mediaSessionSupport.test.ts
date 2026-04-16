import { describe, it, expect } from "vitest";
import { buildYoutubeArtwork, positionStateForMediaSession } from "./mediaSessionSupport";

describe("mediaSessionSupport", () => {
  it("buildYoutubeArtwork falls back when no video id", () => {
    const art = buildYoutubeArtwork(null, "https://afrobeats.party/icon.png");
    expect(art).toHaveLength(1);
    expect(art[0].src).toContain("icon.png");
  });

  it("buildYoutubeArtwork includes multiple sizes for an id", () => {
    const art = buildYoutubeArtwork("dQw4w9WgXcQ", "https://afrobeats.party/fallback.png");
    expect(art.length).toBeGreaterThan(3);
    expect(art[0].src).toContain("dQw4w9WgXcQ");
  });

  it("positionStateForMediaSession returns null for invalid duration", () => {
    expect(positionStateForMediaSession(NaN, 0)).toBeNull();
    expect(positionStateForMediaSession(0, 0)).toBeNull();
    expect(positionStateForMediaSession(-1, 0)).toBeNull();
  });

  it("positionStateForMediaSession clamps position to duration", () => {
    expect(positionStateForMediaSession(100, 999)).toEqual({
      duration: 100,
      playbackRate: 1,
      position: 100,
    });
  });
});
