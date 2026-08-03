import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

const variants = {
  display:
    "font-semibold tracking-[var(--tracking-display)] [font-size:var(--text-display)] [line-height:var(--leading-display)]",
  h1: "font-semibold tracking-[var(--tracking-heading)] [font-size:var(--text-h1)] [line-height:var(--leading-heading)]",
  h2: "font-semibold tracking-[var(--tracking-heading)] [font-size:var(--text-h2)] [line-height:var(--leading-heading)]",
  h3: "font-semibold [font-size:var(--text-h3)] [line-height:var(--leading-heading)]",
  body: "[font-size:var(--text-body)] [line-height:var(--leading-body)]",
  meta: "uppercase tracking-[var(--tracking-meta)] text-[var(--color-muted)] [font-size:var(--text-meta)] [line-height:var(--leading-meta)]",
  caption:
    "text-[var(--color-muted)] [font-size:var(--text-caption)] [line-height:var(--leading-meta)]",
} as const;

type TextProps = {
  as?: ElementType;
  variant?: keyof typeof variants;
  children: ReactNode;
  className?: string;
};

export function Text({
  as: Tag = "p",
  variant = "body",
  children,
  className,
}: TextProps) {
  return <Tag className={cn(variants[variant], className)}>{children}</Tag>;
}
