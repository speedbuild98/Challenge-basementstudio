import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ??= "test-project";
process.env.NEXT_PUBLIC_SANITY_DATASET ??= "production";
process.env.NEXT_PUBLIC_SANITY_API_VERSION ??= "2025-01-01";
process.env.NEXT_PUBLIC_SITE_URL ??= "http://localhost:3000";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    // Disable GSAP motion in unit tests so scroll reveals don't hide a11y trees.
    matches: query.includes("prefers-reduced-motion"),
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

afterEach(() => {
  cleanup();
});

vi.mock("next/image", () => ({
  default: ({
    alt,
    src,
    ...rest
  }: {
    alt: string;
    src: string;
    fill?: boolean;
    priority?: boolean;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={alt}
      src={typeof src === "string" ? src : ""}
      data-fill={rest.fill ? "true" : undefined}
    />
  ),
}));
