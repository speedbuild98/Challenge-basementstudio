"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

type PostImageClientProps = {
  src: string | null;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  /** When null/failed: render this (default brand mark). Pass `null` for no slot. */
  fallback?: ReactNode;
};

function BrandPlaceholder({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex size-full items-center justify-center bg-black",
        className,
      )}
      aria-hidden
    >
      <Image
        src="/brand/basement-logo.svg"
        alt=""
        width={123}
        height={46}
        className="h-6 w-auto opacity-90 md:h-7"
      />
    </div>
  );
}

/** Client-only image. Does not import Sanity env. */
export function PostImageClient({
  src,
  alt,
  className,
  sizes = "(max-width: 768px) 100vw, 33vw",
  priority = false,
  quality = 70,
  fallback,
}: PostImageClientProps) {
  const [failed, setFailed] = useState(false);
  const resolvedFallback =
    fallback === undefined ? (
      <BrandPlaceholder className={className} />
    ) : (
      fallback
    );

  if (!src || failed) {
    return <>{resolvedFallback}</>;
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      quality={quality}
      priority={priority}
      fetchPriority={priority ? "high" : "auto"}
      decoding={priority ? "sync" : "async"}
      className={cn("object-cover will-change-transform", className)}
      onError={() => setFailed(true)}
    />
  );
}
