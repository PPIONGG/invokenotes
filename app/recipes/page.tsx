import type { Metadata } from "next";
import { Boxes } from "lucide-react";
import { recipesWithSkills, allGoals } from "@/lib/recipes";
import { RecipeBrowser } from "@/components/recipe-browser";
import { HeroBackdrop } from "@/components/hero-backdrop";

export const metadata: Metadata = {
  title: "Recipes — InvokeNotes",
  description:
    "ตัวอย่างจริงว่าจะหยิบ skill ไหนตอนไหน — ร้อยหลายสกิลเข้าด้วยกันเป็น flow เดียวสำหรับงานจริงแต่ละเหตุการณ์",
};

export default function RecipesPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-border">
        <HeroBackdrop />
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="reveal inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1 text-xs text-muted backdrop-blur">
            <Boxes className="h-3.5 w-3.5 text-accent" />
            Recipes
          </div>
          <h1
            className="reveal mt-5 max-w-2xl text-3xl font-semibold tracking-tight text-foreground sm:text-5xl"
            style={{ animationDelay: "60ms" }}
          >
            หยิบ skill ไหน <span className="text-accent">ตอนไหน</span>
          </h1>
          <p
            className="reveal mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
            style={{ animationDelay: "120ms" }}
          >
            เหมือนร้านคอมที่ประกอบเครื่องจากอุปกรณ์หลายชิ้น — แต่ละเรซิพีร้อยหลาย
            skill เข้าด้วยกันเป็น flow เดียวสำหรับงานจริง บอกชัดว่าแต่ละขั้นคุยกับ
            agent ว่าอะไร และได้อะไรกลับมา
          </p>
        </div>
      </section>

      {/* Browser */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <RecipeBrowser recipes={recipesWithSkills} goals={allGoals} />
      </section>
    </div>
  );
}
