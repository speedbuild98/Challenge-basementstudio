/** Figma Desktop Blog (19:993) — exact Knowledge display breaks. */
export const FIGMA_KNOWLEDGE_TITLE = "Knowledge Is Meant\nto Be Shared";

const FIGMA_KNOWLEDGE_FLAT = "Knowledge Is Meant to Be Shared";

export function formatKnowledgeTitle(title: string): string {
  const trimmed = title.replace(/\r\n/g, "\n").trim();
  if (trimmed.includes("\n")) {
    const flat = trimmed.replace(/\n/g, " ").replace(/\s+/g, " ");
    if (flat === FIGMA_KNOWLEDGE_FLAT) return FIGMA_KNOWLEDGE_TITLE;
    return trimmed;
  }

  const flat = trimmed.replace(/\s+/g, " ");
  if (flat === FIGMA_KNOWLEDGE_FLAT) return FIGMA_KNOWLEDGE_TITLE;

  return trimmed;
}
