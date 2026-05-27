import Link from "next/link";
import { ArrowUpRight, Boxes, ListOrdered } from "lucide-react";
import type { RecipeWithSkills } from "@/lib/recipes";
import { categoryDot } from "@/components/category-badge";
import {
  DifficultyBadge,
  EffortBadge,
  GoalBadge,
} from "@/components/recipe-meta";
import { cn } from "@/lib/utils";

/**
 * A Recipe preview. The whole card links to the recipe, so the parts-list
 * chips are plain (non-link) here to avoid nesting anchors.
 */
export function RecipeCard({ recipe }: { recipe: RecipeWithSkills }) {
  return (
    <Link
      href={`/recipes/${recipe.slug}`}
      className="group surface-hi card-glow flex flex-col gap-3 rounded-xl border border-border bg-surface p-5 transition duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:bg-surface-3"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <GoalBadge goal={recipe.goal} />
          <DifficultyBadge difficulty={recipe.difficulty} />
        </div>
        <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-faint transition-colors group-hover:text-accent" />
      </div>

      <div className="space-y-1.5">
        <h3 className="text-base font-semibold tracking-tight text-foreground">
          {recipe.title}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted">
          {recipe.tagline}
        </p>
      </div>

      {/* Parts list — plain chips, the whole card is the link */}
      <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
        {recipe.skills.map((s) => (
          <span
            key={s.slug}
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-muted"
          >
            <span className={cn("h-1.5 w-1.5 rounded-full", categoryDot(s.category))} />
            {s.name}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-3 text-xs text-faint">
        <span className="inline-flex items-center gap-1.5">
          <ListOrdered className="h-3.5 w-3.5" />
          {recipe.steps.length} ขั้นตอน
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Boxes className="h-3.5 w-3.5" />
          {recipe.skills.length} skills
        </span>
        <EffortBadge effort={recipe.effort} className="ml-auto" />
      </div>
    </Link>
  );
}
