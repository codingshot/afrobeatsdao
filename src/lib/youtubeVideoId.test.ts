import { describe, expect, it } from "vitest";
import { getYoutubeVideoId } from "./youtubeVideoId";

describe("getYoutubeVideoId", () => {
  it("parses watch URLs", () => {
    expect(getYoutubeVideoId("https://www.youtube.com/watch?v=abc12345xyz&list=foo")).toBe("abc12345xyz");
  });

  it("parses short youtu.be URLs", () => {
    expect(getYoutubeVideoId("https://youtu.be/abc12345xyz?t=12")).toBe("abc12345xyz");
  });

  it("returns bare IDs", () => {
    expect(getYoutubeVideoId("dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
  });

  it("handles empty input", () => {
    expect(getYoutubeVideoId("")).toBe("");
  });
});
