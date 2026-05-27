import type { Category } from "@/lib/skills";
import { cn } from "@/lib/utils";

// Full class strings (not interpolated) so Tailwind's static scanner keeps them.
const CATEGORY_STYLES: Record<Category, { badge: string; dot: string }> = {
  Coding: {
    badge: "text-emerald-300 bg-emerald-500/10 border-emerald-500/25",
    dot: "bg-emerald-400",
  },
  Data: {
    badge: "text-sky-300 bg-sky-500/10 border-sky-500/25",
    dot: "bg-sky-400",
  },
  Writing: {
    badge: "text-violet-300 bg-violet-500/10 border-violet-500/25",
    dot: "bg-violet-400",
  },
  Research: {
    badge: "text-amber-300 bg-amber-500/10 border-amber-500/25",
    dot: "bg-amber-400",
  },
  DevOps: {
    badge: "text-rose-300 bg-rose-500/10 border-rose-500/25",
    dot: "bg-rose-400",
  },
  Design: {
    badge: "text-pink-300 bg-pink-500/10 border-pink-500/25",
    dot: "bg-pink-400",
  },
  Productivity: {
    badge: "text-cyan-300 bg-cyan-500/10 border-cyan-500/25",
    dot: "bg-cyan-400",
  },
};

export function categoryDot(category: Category) {
  return CATEGORY_STYLES[category].dot;
}

export function CategoryBadge({
  category,
  className,
}: {
  category: Category;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        CATEGORY_STYLES[category].badge,
        className,
      )}
    >
      <span
        className={cn("h-1.5 w-1.5 rounded-full", CATEGORY_STYLES[category].dot)}
      />
      {category}
    </span>
  );
}
