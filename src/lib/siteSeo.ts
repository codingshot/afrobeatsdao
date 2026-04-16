/** Canonical public origin (no trailing slash). */
export const SITE_ORIGIN = "https://afrobeats.party";

export const SITE_NAME = "Afrobeats.party";

/** Turn a path or absolute URL into a full https URL for og:image, JSON-LD, etc. */
export function absoluteUrl(pathOrUrl: string): string {
  const raw = (pathOrUrl || "").trim();
  if (!raw) return SITE_ORIGIN;
  if (raw.startsWith("http://") || raw.startsWith("https://")) return raw;
  if (raw.startsWith("/")) return `${SITE_ORIGIN}${raw}`;
  return `${SITE_ORIGIN}/${raw}`;
}

/**
 * Tighten copy for meta description / AI snippets: trim, collapse space, strip emoji, cap length.
 */
export function sanitizeSnippet(text: string, maxLen = 158): string {
  let s = text
    .replace(/\p{Extended_Pictographic}/gu, "")
    .replace(/\uFE0F/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (s.length <= maxLen) return s;
  const cut = s.slice(0, maxLen - 1).trimEnd();
  return `${cut}…`;
}

/** BreadcrumbList node for inclusion in @graph (no outer @context). */
export function breadcrumbListSchema(items: { name: string; url: string }[]) {
  return {
    "@type": "BreadcrumbList" as const,
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem" as const,
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

/** Wrap multiple schema.org nodes in a single script-friendly object. */
export function jsonLdGraph(nodes: Record<string, unknown>[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
