import Link from "next/link";
import { ArrowUpRight, Boxes, Sparkles } from "lucide-react";
import {
  skillsWithAuthors,
  allCategories,
  allTags,
  authors,
} from "@/lib/skills";
import { recipes, featuredRecipes } from "@/lib/recipes";
import { SkillBrowser } from "@/components/skill-browser";
import { RecipeCard } from "@/components/recipe-card";

export default function Home() {
  const stats = [
    { label: "skills", value: skillsWithAuthors.length },
    { label: "recipes", value: recipes.length },
    { label: "authors", value: authors.length },
    { label: "categories", value: allCategories.length },
  ];

  return (
    <div className="bg-grid">
      {/* Hero */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            คู่มือสำรวจ agent skills
          </div>

          <h1 className="mt-5 max-w-2xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            เข้าใจทุก{" "}
            <span className="font-mono text-accent">SKILL.md</span> ก่อนติดตั้ง
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
            คอลเลกชัน agent skills ที่คัดสรรจากคอมมิวนิตี้ AI และ engineering —
            ดูว่าแต่ละสกิลทำอะไร ใครเป็นคนทำ ทำงานยังไง และไปเอามาใช้ได้ที่ไหน
          </p>

          <div className="mt-8 flex gap-6">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-mono text-2xl font-semibold text-foreground">
                  {s.value}
                </div>
                <div className="text-xs uppercase tracking-wide text-faint">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recipes showcase — how to combine skills for a real task */}
      {featuredRecipes.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pt-10 sm:px-6">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight text-foreground">
                <Boxes className="h-5 w-5 text-accent" />
                Recipes
              </h2>
              <p className="mt-1 text-sm text-muted">
                ร้อยหลาย skill เป็น flow เดียวสำหรับงานจริง — หยิบตัวไหนตอนไหน
              </p>
            </div>
            <Link
              href="/recipes"
              className="inline-flex shrink-0 items-center gap-1 text-sm text-muted transition-colors hover:text-accent"
            >
              ดูทั้งหมด
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredRecipes.map((recipe) => (
              <RecipeCard key={recipe.slug} recipe={recipe} />
            ))}
          </div>
        </section>
      )}

      {/* Browser */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <SkillBrowser
          skills={skillsWithAuthors}
          categories={allCategories}
          tags={allTags}
          authors={authors}
        />
      </section>
    </div>
  );
}
