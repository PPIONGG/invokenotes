import Link from "next/link";
import type { SkillRef } from "@/lib/recipes";
import { categoryDot } from "@/components/category-badge";
import { cn } from "@/lib/utils";

/** A clickable chip for a cataloged skill — used in Recipe steps and parts lists. */
export function SkillChip({
  skill,
  className,
}: {
  skill: SkillRef;
  className?: string;
}) {
  return (
    <Link
      href={`/skills/${skill.slug}`}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border border-border bg-surface-2 px-2 py-0.5 font-mono text-xs text-foreground/90 transition-colors hover:border-accent/40 hover:text-accent",
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", categoryDot(skill.category))} />
      {skill.name}
    </Link>
  );
}
