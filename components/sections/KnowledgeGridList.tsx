"use client";

import { useMemo, useState } from "react";

import { PostCard } from "@/components/blog/PostCard";
import { Stagger } from "@/components/motion/Stagger";
import { Button } from "@/components/ui/Button";
import type { PostCard as PostCardType } from "@/types/content";

const PAGE_SIZE = 6;

type KnowledgeGridListProps = {
  posts: PostCardType[];
};

/**
 * Figma 19:993 — first 3 media (400px), next 3 text-only (250px), gap 32.
 * Extra posts beyond 6 load as media cards.
 */
export function KnowledgeGridList({ posts }: KnowledgeGridListProps) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const visible = useMemo(
    () => posts.slice(0, visibleCount),
    [posts, visibleCount],
  );
  const hasMore = visibleCount < posts.length;

  const mediaRow = visible.slice(0, 3);
  const textRow = visible.slice(3, 6);
  const extra = visible.slice(6);

  return (
    // Mobile 158:5096 — filters→grid ~11 · card gap 12 · Desktop gap 32 / filters→grid 55
    <div className="mt-3 md:mt-[3.45rem]">
      <Stagger className="space-y-3 md:space-y-8" y={28} stagger={0.06}>
        {mediaRow.length ? (
          <ul className="grid list-none gap-3 md:grid-cols-3 md:gap-8">
            {mediaRow.map((post) => (
              <li key={post._id} data-stagger-item className="min-w-0">
                <PostCard post={post} variant="media" />
              </li>
            ))}
          </ul>
        ) : null}

        {textRow.length ? (
          <ul className="grid list-none gap-3 md:grid-cols-3 md:gap-8">
            {textRow.map((post) => (
              <li key={post._id} data-stagger-item className="min-w-0">
                <PostCard post={post} variant="text" />
              </li>
            ))}
          </ul>
        ) : null}

        {extra.length ? (
          <ul className="grid list-none gap-3 md:grid-cols-3 md:gap-8">
            {extra.map((post) => (
              <li key={post._id} data-stagger-item className="min-w-0">
                <PostCard post={post} variant="media" />
              </li>
            ))}
          </ul>
        ) : null}
      </Stagger>

      {hasMore ? (
        <div className="mt-10 flex justify-center md:mt-24">
          {/* Mobile 158:4525 / Desktop 19:1192 — Main Button black */}
          <Button
            type="button"
            variant="contact"
            onClick={() =>
              setVisibleCount((count) =>
                Math.min(count + PAGE_SIZE, posts.length),
              )
            }
          >
            Load more
          </Button>
        </div>
      ) : null}
    </div>
  );
}
