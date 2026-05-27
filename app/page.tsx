import { Sparkles } from "lucide-react";
import {
  skillsWithAuthors,
  allCategories,
  allTags,
  authors,
} from "@/lib/skills";
import { SkillBrowser } from "@/components/skill-browser";

export default function Home() {
  const stats = [
    { label: "skills", value: skillsWithAuthors.length },
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

      {/* Browser */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <SkillBrowser
          skills={skillsWithAuthors}
          categories={allCategories}
          tags={allTags}
        />
      </section>
    </div>
  );
}
