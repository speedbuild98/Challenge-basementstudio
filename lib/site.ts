/**
 * Canonical site origin. Trims accidental newlines from CLI-uploaded env values.
 */
export function getSiteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\\n$/g, "").replace(/\\r$/g, "") ||
    "http://localhost:3000";
  return raw.replace(/\/+$/, "");
}

/** Demo content is allowed in development, or when explicitly enabled. */
export function allowDemoContent(): boolean {
  if (process.env.ALLOW_DEMO_CONTENT === "true") return true;
  if (process.env.ALLOW_DEMO_CONTENT === "false") return false;
  return process.env.NODE_ENV !== "production";
}
