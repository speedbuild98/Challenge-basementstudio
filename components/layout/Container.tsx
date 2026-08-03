import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

type ContainerProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  width?: "default" | "narrow" | "wide";
};

const widthClass = {
  default: "max-w-[var(--container-max)]",
  narrow: "max-w-[var(--container-narrow)]",
  wide: "max-w-[var(--container-wide)]",
} as const;

export function Container({
  as: Tag = "div",
  children,
  className,
  width = "default",
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-[var(--gutter)]",
        widthClass[width],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
