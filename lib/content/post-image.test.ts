import { describe, expect, it, vi } from "vitest";

import { resolvePostCoverSrc } from "@/lib/content/post-image";
import { mockPost } from "@/test/fixtures/post";

vi.mock("@/lib/sanity/image", () => ({
  urlForImage: () => ({
    width: () => ({
      height: () => ({
        fit: () => ({
          url: () => "https://cdn.sanity.io/images/demo/cover.jpg",
        }),
      }),
    }),
  }),
}));

describe("resolvePostCoverSrc", () => {
  it("prefers coverUrl when present", () => {
    expect(resolvePostCoverSrc(mockPost)).toBe("/brand/basement-logo.svg");
  });

  it("builds a Sanity URL when only coverImage.asset exists", () => {
    const src = resolvePostCoverSrc({
      ...mockPost,
      coverUrl: null,
      coverImage: { alt: "Cover", asset: { _ref: "image-1" } },
    });
    expect(src).toBe("https://cdn.sanity.io/images/demo/cover.jpg");
  });

  it("returns null when no cover is available", () => {
    expect(
      resolvePostCoverSrc({
        ...mockPost,
        coverUrl: null,
        coverImage: null,
      }),
    ).toBeNull();
  });
});
