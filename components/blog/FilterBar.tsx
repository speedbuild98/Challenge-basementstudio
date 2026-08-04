import Link from "next/link";

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
      {/* Figma Desktop: gap 40 · Mobile: gap 24 */}
      <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 md:gap-x-10">
        <li>
          <FilterLink href="/" active={!activeSlug}>
            All posts
          </FilterLink>
        </li>
        {categories.map((category) => (
          <li key={category._id}>
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
        // Hug Figma 14/1.4 line on desktop; keep 44px target on small screens
        "inline-flex min-h-11 items-center font-mono text-[length:var(--text-meta)] font-medium uppercase leading-[1.4] tracking-[var(--tracking-meta)] transition-colors duration-[var(--duration-fast)] md:min-h-0",
        // Figma light filters: active #000 · inactive #666
        active ? "text-black" : "text-[#666] hover:text-black",
      )}
    >
      {children}
    </Link>
  );
}
