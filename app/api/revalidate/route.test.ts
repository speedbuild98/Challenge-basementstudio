import { beforeEach, describe, expect, it, vi } from "vitest";

const revalidateTag = vi.fn();

vi.mock("next/cache", () => ({
  revalidateTag: (...args: unknown[]) => revalidateTag(...args),
}));

describe("POST /api/revalidate", () => {
  beforeEach(() => {
    revalidateTag.mockClear();
    process.env.SANITY_REVALIDATE_SECRET = "test-secret";
  });

  it("rejects missing or invalid secrets", async () => {
    const { POST } = await import("./route");
    const request = new Request("http://localhost/api/revalidate", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ tags: ["posts"] }),
    });

    const response = await POST(request as never);
    expect(response.status).toBe(401);
  });

  it("revalidates allowed tags", async () => {
    const { POST } = await import("./route");
    const request = new Request("http://localhost/api/revalidate", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-revalidate-secret": "test-secret",
      },
      body: JSON.stringify({ tags: ["posts", "post:hello", "evil"] }),
    });

    const response = await POST(request as never);
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json).toEqual({ revalidated: true, count: 2 });
    expect(revalidateTag).toHaveBeenCalledWith("posts", "max");
    expect(revalidateTag).toHaveBeenCalledWith("post:hello", "max");
  });

  it("rejects empty tag lists", async () => {
    const { POST } = await import("./route");
    const request = new Request("http://localhost/api/revalidate", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-revalidate-secret": "test-secret",
      },
      body: JSON.stringify({ tags: [] }),
    });

    const response = await POST(request as never);
    expect(response.status).toBe(400);
  });
});
