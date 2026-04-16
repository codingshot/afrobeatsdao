import { describe, expect, it } from "vitest";
import { danceCurriculum } from "@/data/dance-curriculum";
import {
  assertUniqueDanceIds,
  findDanceCurriculumDataIssues,
  findDanceCurriculumLinkIssues,
  runSiteContentQa,
  validateClubRecords,
} from "./siteContentQA";
import { CLUBS } from "@/data/clubs";

describe("validateClubRecords", () => {
  it("passes for production club data", () => {
    expect(validateClubRecords(CLUBS)).toEqual([]);
  });
});

describe("dance curriculum QA", () => {
  it("covers every dance entry in both genres", () => {
    const n =
      danceCurriculum.afrobeats.length +
      danceCurriculum.amapiano.length;
    expect(n).toBe(11);
  });

  it("has unique dance ids across genres", () => {
    expect(assertUniqueDanceIds()).toEqual([]);
  });

  it("has valid YouTube and Spotify links on songs", () => {
    const issues = findDanceCurriculumLinkIssues();
    expect(issues, JSON.stringify(issues, null, 2)).toEqual([]);
  });

  it("has complete dance records and on-disk poster images", () => {
    const issues = findDanceCurriculumDataIssues();
    expect(issues, issues.join("\n")).toEqual([]);
  });

  it("aggregate QA has no findings", () => {
    const r = runSiteContentQa();
    expect(r.clubs, r.clubs.join("\n")).toEqual([]);
    expect(r.dances, JSON.stringify(r.dances)).toEqual([]);
    expect(r.danceIds).toEqual([]);
    expect(r.danceData, r.danceData.join("\n")).toEqual([]);
  });
});
