import { cn } from "@/lib/utils/cn";

type OrangeGlowProps = {
  className?: string;
};

/**
 * Figma Desktop Blog (19:993) hero atmosphere:
 * wide horizontal orange band / horizon behind the featured card.
 */
export function OrangeGlow({ className }: OrangeGlowProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      {/* Wide horizon ellipse — primary Figma band */}
      <div
        className="absolute left-1/2 top-[52%] h-[clamp(280px,42vw,520px)] w-[min(1680px,165vw)] -translate-x-1/2 -translate-y-1/2 rounded-[100%] opacity-90 blur-[64px] md:blur-[90px]"
        style={{
          background:
            "radial-gradient(ellipse 72% 55% at 50% 50%, rgba(255,77,0,0.95) 0%, rgba(255,77,0,0.55) 28%, rgba(255,77,0,0.18) 52%, transparent 72%)",
        }}
      />
      {/* Soft outer wash so it falls off into black like the frame */}
      <div
        className="absolute left-1/2 top-[58%] h-[clamp(200px,30vw,360px)] w-[min(1400px,140vw)] -translate-x-1/2 -translate-y-1/2 rounded-[100%] opacity-70 blur-[48px] md:blur-[72px]"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(255,77,0,0.35) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
