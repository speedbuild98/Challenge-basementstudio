"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type PostCardMediaProps = {
  href: string;
  src: string;
  alt: string;
  sizes?: string;
};

/** Renders cover only when the URL loads — no brand/empty placeholder. */
export function PostCardMedia({
  href,
  src,
  alt,
  sizes = "(max-width: 768px) 100vw, 436px",
}: PostCardMediaProps) {
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  return (
    <Link
      href={href}
      className="relative block h-[110px] w-full overflow-hidden rounded-md md:h-[137px]"
      tabIndex={-1}
      aria-hidden
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover"
        onError={() => setFailed(true)}
      />
    </Link>
  );
}
