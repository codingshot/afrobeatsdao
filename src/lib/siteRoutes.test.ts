import { describe, expect, it } from "vitest";
import { isKnownInternalPath } from "./siteRoutes";

describe("isKnownInternalPath", () => {
  it("accepts static routes", () => {
    expect(isKnownInternalPath("/dance")).toBe(true);
    expect(isKnownInternalPath("/clubs")).toBe(true);
    expect(isKnownInternalPath("/")).toBe(true);
  });

  it("accepts parameterized dance routes", () => {
    expect(isKnownInternalPath("/dance/zanku")).toBe(true);
    expect(isKnownInternalPath("/dance/afrobeats/zanku")).toBe(true);
  });

  it("rejects unknown paths", () => {
    expect(isKnownInternalPath("/not-a-real-page")).toBe(false);
  });
});
