import { describe, expect, it } from "vitest";

import { formatPostDate } from "@/lib/utils/format-date";

describe("formatPostDate", () => {
  it("formats ISO dates as en-US short month style", () => {
    expect(formatPostDate("2025-12-03T12:00:00.000Z")).toBe("Dec 3, 2025");
  });

  it("returns the original value when the date is invalid", () => {
    expect(formatPostDate("not-a-date")).toBe("not-a-date");
  });
});
