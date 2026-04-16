import { describe, expect, it } from "vitest";
import { danceCurriculum } from "@/data/dance-curriculum";
import { getFirstCurriculumYoutubeVideoId, getPrimaryYoutubeTutorial } from "./danceYoutube";

describe("getPrimaryYoutubeTutorial", () => {
  it("skips Instagram and returns YouTube for Azonto", () => {
    const dance = danceCurriculum.afrobeats.find((d) => d.id === "azonto");
    expect(dance).toBeDefined();
    const t = getPrimaryYoutubeTutorial(dance!.tutorials);
    expect(t?.link).toContain("youtube.com");
  });
});

describe("getFirstCurriculumYoutubeVideoId", () => {
  it("returns a non-empty id for every curriculum dance", () => {
    const all = [...danceCurriculum.afrobeats, ...danceCurriculum.amapiano];
    for (const d of all) {
      const id = getFirstCurriculumYoutubeVideoId(d);
      expect(id.length, d.id).toBeGreaterThanOrEqual(6);
    }
  });
});
