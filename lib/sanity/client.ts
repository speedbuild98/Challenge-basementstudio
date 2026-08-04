import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "./env";

/**
 * Server read client. CDN disabled so on-demand revalidation can observe
 * fresh published documents immediately after webhook invalidation.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: "published",
  stega: {
    enabled: false,
    studioUrl: "/studio",
  },
});
