import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowUpRight,
  Boxes,
  Check,
  ClipboardList,
  ListOrdered,
  PackageCheck,
} from "lucide-react";
import {
  getRecipe,
  recipes,
  skillRefsInRecipe,
  stepSkillRefs,
  prerequisiteRecipes,
  nextRecipes,
} from "@/lib/recipes";
import { getSkill } from "@/lib/skills";
import { SkillChip } from "@/components/skill-chip";
import { RecipeSteps, type StepView } from "@/components/recipe-steps";
import {
  DifficultyBadge,
  EffortBadge,
  GoalBadge,
} from "@/components/recipe-meta";

export function generateStaticParams() {
  return recipes.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const recipe = getRecipe(slug);
  if (!recipe) return { title: "ไม่พบเรซิพี — InvokeNotes" };
  return {
    title: `${recipe.title} — InvokeNotes`,
    description: recipe.tagline,
  };
}

export default async function RecipePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const recipe = getRecipe(slug);
  if (!recipe) notFound();

  const parts = skillRefsInRecipe(recipe);
  const prereqNotes = recipe.prerequisites?.notes ?? [];
  const prereqRecipes = prerequisiteRecipes(recipe);
  const hasPrereqs = prereqNotes.length > 0 || prereqRecipes.length > 0;
  const next = nextRecipes(recipe.slug);

  // Flatten steps for the client island: resolve each skill + its first example.
  const stepViews: StepView[] = recipe.steps.map((step) => ({
    label: step.label,
    prompt: step.prompt,
    outcome: step.outcome,
    skills: stepSkillRefs(step, recipe.slug).map((ref) => ({
      ...ref,
      example: getSkill(ref.slug)?.examples[0],
    })),
  }));

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <Link
        href="/recipes"
        className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Recipes ทั้งหมด
      </Link>

      {/* Header */}
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <GoalBadge goal={recipe.goal} />
        <DifficultyBadge difficulty={recipe.difficulty} />
        <EffortBadge effort={recipe.effort} />
      </div>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {recipe.title}
      </h1>
      <p className="mt-2 text-lg leading-relaxed text-muted">{recipe.tagline}</p>
      <p className="mt-4 text-[15px] leading-relaxed text-foreground/90">
        {recipe.intro}
      </p>

      {/* Parts list — every chip is a cataloged, clickable skill (ADR 0007) */}
      <div className="mt-8 rounded-xl border border-border bg-surface p-5">
        <p className="mb-3 flex items-center gap-2 text-xs uppercase tracking-wide text-faint">
          <Boxes className="h-3.5 w-3.5" />
          Skills ที่ใช้ ({parts.length})
        </p>
        <div className="flex flex-wrap gap-1.5">
          {parts.map((s) => (
            <SkillChip key={s.slug} skill={s} />
          ))}
        </div>
      </div>

      {/* Prerequisites — what to have ready first */}
      {hasPrereqs && (
        <section className="mt-8">
          <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-foreground">
            <ClipboardList className="h-4 w-4 text-accent" />
            ก่อนเริ่ม
          </h2>
          {prereqRecipes.length > 0 && (
            <div className="mb-3 space-y-2">
              {prereqRecipes.map((r) => (
                <Link
                  key={r.slug}
                  href={`/recipes/${r.slug}`}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-surface p-3 transition-colors hover:border-accent/40 hover:bg-surface-2"
                >
                  <span className="min-w-0">
                    <span className="block text-[11px] uppercase tracking-wide text-faint">
                      ทำเรซิพีนี้ก่อน
                    </span>
                    <span className="block text-sm font-medium text-foreground">
                      {r.title}
                    </span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-faint transition-colors group-hover:text-accent" />
                </Link>
              ))}
            </div>
          )}
          {prereqNotes.length > 0 && (
            <ul className="space-y-2">
              {prereqNotes.map((note) => (
                <li
                  key={note}
                  className="flex gap-2 text-sm leading-relaxed text-muted"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      {/* Steps (interactive) */}
      <h2 className="mb-5 mt-10 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-foreground">
        <ListOrdered className="h-4 w-4 text-accent" />
        ขั้นตอน ({recipe.steps.length})
      </h2>
      <RecipeSteps recipeSlug={recipe.slug} steps={stepViews} />

      {/* Deliverables — what you hold at the end */}
      <section className="mt-4 rounded-xl border border-border bg-surface p-5">
        <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-foreground">
          <PackageCheck className="h-4 w-4 text-accent" />
          ผลลัพธ์ที่ได้
        </h2>
        <ul className="space-y-2">
          {recipe.deliverables.map((item) => (
            <li
              key={item}
              className="flex gap-2.5 text-[15px] leading-relaxed text-foreground/90"
            >
              <Check className="mt-1 h-4 w-4 shrink-0 text-accent" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Do next — inverse of other recipes' prerequisites (not a stored field) */}
      {next.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-foreground">
            <ArrowUpRight className="h-4 w-4 text-accent" />
            ทำต่อ
          </h2>
          <div className="space-y-2">
            {next.map((r) => (
              <Link
                key={r.slug}
                href={`/recipes/${r.slug}`}
                className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-surface p-4 transition-colors hover:border-accent/40 hover:bg-surface-2"
              >
                <span className="min-w-0">
                  <span className="block text-sm font-medium text-foreground">
                    {r.title}
                  </span>
                  <span className="mt-0.5 block truncate text-xs text-muted">
                    {r.tagline}
                  </span>
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-faint transition-colors group-hover:text-accent" />
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
