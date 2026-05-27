"use client";

import { useState } from "react";
import type { Goal, RecipeWithSkills } from "@/lib/recipes";
import { RecipeCard } from "@/components/recipe-card";
import { goalLabel } from "@/components/recipe-meta";
import { cn } from "@/lib/utils";

/** Browse Recipes, filtered by their single Goal (the primary axis). */
export function RecipeBrowser({
  recipes,
  goals,
}: {
  recipes: RecipeWithSkills[];
  goals: Goal[];
}) {
  const [goal, setGoal] = useState<Goal | "All">("All");
  const options: (Goal | "All")[] = ["All", ...goals];
  const filtered =
    goal === "All" ? recipes : recipes.filter((r) => r.goal === goal);

  return (
    <div className="space-y-5">
      {/* Goal segmented control */}
      <div className="flex flex-wrap gap-1.5">
        {options.map((g) => (
          <button
            key={g}
            onClick={() => setGoal(g)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
              goal === g
                ? "border-foreground/20 bg-foreground text-background"
                : "border-border bg-surface text-muted hover:border-border-strong hover:text-foreground",
            )}
          >
            {g === "All" ? "ทั้งหมด" : goalLabel(g)}
          </button>
        ))}
      </div>

      <div className="text-sm text-faint">
        พบ {filtered.length} recipe{goal !== "All" ? " ตามที่กรอง" : ""}
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((recipe) => (
            <RecipeCard key={recipe.slug} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-border py-16 text-center text-sm text-muted">
          ยังไม่มี recipe ในกลุ่มนี้
        </div>
      )}
    </div>
  );
}
