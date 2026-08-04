import { afterEach, describe, expect, it } from "vitest";

import { allowDemoContent, getSiteUrl } from "@/lib/site";

const original = { ...process.env };

afterEach(() => {
  process.env = { ...original };
});

describe("getSiteUrl", () => {
  it("falls back to localhost", () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    expect(getSiteUrl()).toBe("http://localhost:3000");
  });

  it("trims trailing slashes and escaped newlines", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://example.com/\\n";
    expect(getSiteUrl()).toBe("https://example.com");
  });
});

describe("allowDemoContent", () => {
  it("respects explicit true/false overrides", () => {
    process.env.ALLOW_DEMO_CONTENT = "true";
    expect(allowDemoContent()).toBe(true);
    process.env.ALLOW_DEMO_CONTENT = "false";
    expect(allowDemoContent()).toBe(false);
  });
});
