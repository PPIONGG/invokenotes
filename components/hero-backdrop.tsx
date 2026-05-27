import { cn } from "@/lib/utils";

/**
 * The layered hero backdrop shared across page headers: a faded grid, a
 * drifting emerald aurora, fine film grain, and a hairline accent rule along
 * the bottom edge. Drop into any `relative isolate overflow-hidden` container.
 */
export function HeroBackdrop({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 -z-10", className)}
    >
      <div className="bg-grid bg-grid-faded absolute inset-0 opacity-70" />
      <div className="aurora" />
      <div className="noise absolute inset-0" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
    </div>
  );
}
