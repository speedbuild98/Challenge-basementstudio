import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

const variants = {
  display:
    "font-semibold tracking-[var(--tracking-display)] [font-size:var(--text-display)] [line-height:var(--leading-display)]",
  h1: "font-semibold tracking-[var(--tracking-h1)] [font-size:var(--text-h1)] [line-height:var(--leading-h1)]",
  h2: "font-semibold tracking-[var(--tracking-h2)] [font-size:var(--text-h2)] [line-height:var(--leading-h2)]",
  h3: "font-semibold tracking-[var(--tracking-h2)] [font-size:var(--text-h3)] [line-height:var(--leading-h2)]",
  body: "font-normal tracking-[var(--tracking-body)] [font-size:var(--text-body)] [line-height:var(--leading-body)]",
  bodyStrong:
    "font-semibold tracking-[var(--tracking-body)] [font-size:var(--text-body)] [line-height:var(--leading-body)]",
  meta: "font-mono font-medium uppercase tracking-[var(--tracking-meta)] [font-size:var(--text-meta)] [line-height:var(--leading-meta)]",
  caption:
    "font-semibold [font-size:var(--text-caption)] [line-height:var(--leading-caption)]",
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
