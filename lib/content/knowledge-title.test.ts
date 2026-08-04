import { describe, expect, it } from "vitest";

import {
  FIGMA_KNOWLEDGE_TITLE,
  formatKnowledgeTitle,
} from "@/lib/content/knowledge-title";

describe("formatKnowledgeTitle", () => {
  it("maps the flat Figma copy to the exact line break", () => {
    expect(formatKnowledgeTitle("Knowledge Is Meant to Be Shared")).toBe(
      FIGMA_KNOWLEDGE_TITLE,
    );
  });

  it("normalizes literal \\n sequences from CMS", () => {
    expect(formatKnowledgeTitle("Knowledge Is Meant\\nto Be Shared")).toBe(
      FIGMA_KNOWLEDGE_TITLE,
    );
  });

  it("keeps custom titles with real newlines", () => {
    expect(formatKnowledgeTitle("Custom\nTitle")).toBe("Custom\nTitle");
  });

  it("trims surrounding whitespace", () => {
    expect(formatKnowledgeTitle("  Hello world  ")).toBe("Hello world");
  });
});
