"use client";

import { useMemo, useState } from "react";

import { PostCard } from "@/components/blog/PostCard";
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
    // Figma: filters→grid 55 desktop / ~31 mobile · row gap 32 / 12
    <div className="mt-8 md:mt-[3.45rem]">
      <div className="space-y-3 md:space-y-8">
        {mediaRow.length ? (
          <ul className="grid list-none gap-3 md:grid-cols-3 md:gap-8">
            {mediaRow.map((post) => (
              <li key={post._id} className="min-w-0">
                <PostCard post={post} variant="media" />
              </li>
            ))}
          </ul>
        ) : null}

        {textRow.length ? (
          <ul className="grid list-none gap-3 md:grid-cols-3 md:gap-8">
            {textRow.map((post) => (
              <li key={post._id} className="min-w-0">
                <PostCard post={post} variant="text" />
              </li>
            ))}
          </ul>
        ) : null}

        {extra.length ? (
          <ul className="grid list-none gap-3 md:grid-cols-3 md:gap-8">
            {extra.map((post) => (
              <li key={post._id} className="min-w-0">
                <PostCard post={post} variant="media" />
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      {hasMore ? (
        <div className="mt-10 flex justify-center md:mt-24">
          <Button
            type="button"
            variant="contact"
            className="bg-[#e6e6e6] text-black shadow-none hover:bg-light-grey"
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
