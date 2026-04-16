/**
 * Static path prefixes for smoke tests and internal link QA.
 * Keep in sync with `src/App.tsx` routes.
 */
export const STATIC_SITE_PATH_PREFIXES = [
  "/",
  "/dance",
  "/clubs",
  "/events",
  "/music",
  "/careers",
  "/news",
  "/discord",
  "/map",
  "/partner",
  "/chapters",
  "/join",
  "/artist-join",
] as const;

/** Returns true if `pathname` is a known static prefix or matches a parameterized route pattern. */
export function isKnownInternalPath(pathname: string): boolean {
  const p = pathname.split("?")[0].replace(/\/+$/, "") || "/";
  if ((STATIC_SITE_PATH_PREFIXES as readonly string[]).includes(p)) return true;

  if (/^\/dance\/[^/]+\/[^/]+$/.test(p)) return true;
  if (/^\/dance\/[^/]+$/.test(p)) return true;
  if (/^\/event\/[^/]+$/.test(p)) return true;
  if (/^\/music\/artist\/[^/]+$/.test(p)) return true;
  if (/^\/music\/artist\/[^/]+\/[^/]+$/.test(p)) return true;
  if (/^\/careers\/[^/]+$/.test(p)) return true;

  return false;
}
