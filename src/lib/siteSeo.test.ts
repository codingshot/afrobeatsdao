import { describe, it, expect } from "vitest";
import { SITE_ORIGIN, absoluteUrl, sanitizeSnippet, breadcrumbListSchema, jsonLdGraph } from "./siteSeo";

describe("siteSeo", () => {
  it("absoluteUrl handles paths and full URLs", () => {
    expect(absoluteUrl("")).toBe(SITE_ORIGIN);
    expect(absoluteUrl("/x.jpg")).toBe(`${SITE_ORIGIN}/x.jpg`);
    expect(absoluteUrl("https://cdn.example/a.png")).toBe("https://cdn.example/a.png");
    expect(absoluteUrl("rel/path")).toBe(`${SITE_ORIGIN}/rel/path`);
  });

  it("sanitizeSnippet caps length and strips emoji", () => {
    expect(sanitizeSnippet("🎵 Hello   world", 12)).toBe("Hello world");
    expect(sanitizeSnippet("abc", 10)).toBe("abc");
  });

  it("jsonLdGraph nests breadcrumb", () => {
    const g = jsonLdGraph([
      { "@type": "WebPage", name: "Test" },
      breadcrumbListSchema([
        { name: "Home", url: SITE_ORIGIN },
        { name: "Music", url: `${SITE_ORIGIN}/music` },
      ]),
    ]);
    expect(g["@graph"]).toHaveLength(2);
    expect((g["@graph"] as unknown[])[1]).toMatchObject({ "@type": "BreadcrumbList" });
  });
});
