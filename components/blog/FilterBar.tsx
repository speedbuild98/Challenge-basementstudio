import Link from "next/link";

import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils/cn";
import type { CategoryRef } from "@/types/content";

type FilterBarProps = {
  categories: CategoryRef[];
  activeSlug?: string | null;
  className?: string;
};

export function FilterBar({
  categories,
  activeSlug = null,
  className,
}: FilterBarProps) {
  return (
    <nav aria-label="Filter posts by category" className={className}>
      {/*
        Mobile 158:4393 — single HORIZONTAL row, gap 24, NO_WRAP, clips at edge (scroll).
        Desktop — gap 40, may wrap when many categories.
      */}
      <ul
        className={cn(
          "flex flex-nowrap items-center gap-x-6 overflow-x-auto overscroll-x-contain",
          "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          "md:flex-wrap md:gap-x-10 md:overflow-visible",
        )}
      >
        <li className="shrink-0">
          <FilterLink href={ROUTES.journal} active={!activeSlug}>
            All posts
          </FilterLink>
        </li>
        {categories.map((category) => (
          <li key={category._id} className="shrink-0">
            <FilterLink
              href={`/category/${category.slug}`}
              active={activeSlug === category.slug}
            >
              {category.title}
            </FilterLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function FilterLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: string;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        // Mobile — hug 14/1.4 · Desktop — same type
        "inline-flex items-center whitespace-nowrap py-2 font-mono text-[length:var(--text-meta)] font-medium uppercase leading-[1.4] tracking-[var(--tracking-meta)] transition-[color,transform] duration-[var(--duration-base)] ease-[var(--ease-out)] md:py-0",
        // Figma light filters: active #000 · inactive #666
        active
          ? "text-black"
          : "text-[#666] hover:text-black hover:-translate-y-px",
      )}
    >
      {children}
    </Link>
  );
}
