import Link from "next/link";
import { ArrowRight, ArrowUpRight, Boxes, Sparkles } from "lucide-react";
import {
  skillsWithAuthors,
  allCategories,
  allTags,
  authors,
} from "@/lib/skills";
import { recipes, featuredRecipes } from "@/lib/recipes";
import { SkillBrowser } from "@/components/skill-browser";
import { RecipeCard } from "@/components/recipe-card";
import { HeroBackdrop } from "@/components/hero-backdrop";

export default function Home() {
  const stats = [
    { label: "skills", value: skillsWithAuthors.length },
    { label: "recipes", value: recipes.length },
    { label: "authors", value: authors.length },
    { label: "categories", value: allCategories.length },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-border">
        <HeroBackdrop />

        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="reveal inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1 text-xs text-muted backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            คู่มือสำรวจ agent skills
          </div>

          <h1
            className="reveal mt-6 max-w-3xl text-3xl font-semibold leading-[1.12] tracking-tight text-foreground sm:text-6xl sm:leading-[1.08]"
            style={{ animationDelay: "60ms" }}
          >
            <span className="inline-block">เข้าใจทุก</span>{" "}
            <span className="inline-block font-mono text-accent">SKILL.md</span>
            <br />
            <span className="inline-block">ก่อนติดตั้ง</span>
          </h1>
          <p
            className="reveal mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
            style={{ animationDelay: "120ms" }}
          >
            คอลเลกชัน agent skills ที่คัดสรรจากคอมมิวนิตี้ AI และ engineering —
            ดูว่าแต่ละสกิลทำอะไร ใครเป็นคนทำ ทำงานยังไง และไปเอามาใช้ได้ที่ไหน
          </p>

          <div
            className="reveal mt-8 flex flex-wrap items-center gap-3"
            style={{ animationDelay: "180ms" }}
          >
            <a
              href="#skills"
              className="group inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-strong"
            >
              สำรวจ skills
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <Link
              href="/recipes"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface/70 px-4 py-2.5 text-sm font-medium text-foreground backdrop-blur transition-colors hover:border-border-strong hover:bg-surface-2"
            >
              <Boxes className="h-4 w-4 text-accent" />
              ดู recipes
            </Link>
          </div>

          <div
            className="reveal mt-14 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
            style={{ animationDelay: "240ms" }}
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="surface-hi rounded-xl border border-border bg-surface/60 px-4 py-3 backdrop-blur transition-colors hover:border-border-strong"
              >
                <div className="font-mono text-2xl font-semibold tabular-nums text-foreground sm:text-3xl">
                  {s.value}
                </div>
                <div className="mt-0.5 text-[11px] uppercase tracking-wide text-faint">
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
      <section
        id="skills"
        className="mx-auto max-w-6xl scroll-mt-20 px-4 py-10 sm:px-6"
      >
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
