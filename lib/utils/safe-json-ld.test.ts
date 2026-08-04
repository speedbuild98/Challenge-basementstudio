import { describe, expect, it } from "vitest";

import { serializeJsonLd } from "@/lib/utils/safe-json-ld";

describe("serializeJsonLd", () => {
  it("escapes characters that can break out of a script tag", () => {
    const raw = serializeJsonLd({
      name: "</script><script>alert(1)</script>",
      amp: "a & b",
    });

    expect(raw).not.toContain("</script>");
    expect(raw).toContain("\\u003c");
    expect(raw).toContain("\\u003e");
    expect(raw).toContain("\\u0026");
  });

  it("serializes plain objects", () => {
    expect(JSON.parse(serializeJsonLd({ ok: true }))).toEqual({ ok: true });
  });
});
