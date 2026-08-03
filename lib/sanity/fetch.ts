import { type QueryParams } from "next-sanity";

import { client } from "./client";

type FetchOptions = {
  params?: QueryParams;
  tags?: string[];
  /** Seconds. Prefer tags + on-demand revalidation when possible. */
  revalidate?: number | false;
};

/**
 * Typed Sanity fetch wrapper for Server Components / route handlers.
 * Keep GROQ in `lib/sanity/queries` and call this from pages/loaders only.
 */
export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
  revalidate = 60,
}: {
  query: string;
} & FetchOptions): Promise<T> {
  return client.fetch<T>(query, params, {
    next: {
      revalidate,
      tags,
    },
  });
}
