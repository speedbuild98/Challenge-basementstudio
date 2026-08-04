function readEnv(name: string, fallback?: string) {
  const raw = process.env[name] ?? fallback;
  if (raw === undefined) return undefined;
  // Guard against accidental trailing newlines / escaped junk from CLI env uploads.
  return raw.trim().replace(/\\n$/g, "").replace(/\\r$/g, "");
}

function assertValue(value: string | undefined, errorMessage: string): string {
  if (!value) {
    throw new Error(errorMessage);
  }
  return value;
}

export const dataset = assertValue(
  readEnv("NEXT_PUBLIC_SANITY_DATASET", "production"),
  "Missing environment variable: NEXT_PUBLIC_SANITY_DATASET",
);

export const projectId = assertValue(
  readEnv("NEXT_PUBLIC_SANITY_PROJECT_ID"),
  "Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID",
);

export const apiVersion =
  readEnv("NEXT_PUBLIC_SANITY_API_VERSION") || "2025-01-01";

if (!/^[a-z0-9-]+$/.test(projectId)) {
  throw new Error(
    `Invalid NEXT_PUBLIC_SANITY_PROJECT_ID "${projectId}". Expected only a-z, 0-9, dashes.`,
  );
}
