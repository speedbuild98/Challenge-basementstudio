import { describe, expect, it } from "vitest";

import { CACHE_TAGS, ROUTES, SITE_NAME } from "@/lib/constants";

describe("constants", () => {
  it("exposes brand site name", () => {
    expect(SITE_NAME).toBe("basement.studio");
  });

  it("builds content routes", () => {
    expect(ROUTES.home).toBe("/");
    expect(ROUTES.journal).toBe("/#knowledge");
    expect(ROUTES.post("hello")).toBe("/blog/hello");
    expect(ROUTES.category("design")).toBe("/category/design");
    expect(ROUTES.tag("webgl")).toBe("/tag/webgl");
  });

  it("builds cache tags", () => {
    expect(CACHE_TAGS.posts).toBe("posts");
    expect(CACHE_TAGS.post("hello")).toBe("post:hello");
  });
});
