"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import type { Category, SkillWithAuthor } from "@/lib/skills";
import { SkillCard } from "@/components/skill-card";
import { cn } from "@/lib/utils";

export function SkillBrowser({
  skills,
  categories,
  tags,
}: {
  skills: SkillWithAuthor[];
  categories: Category[];
  tags: string[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category | "All">("All");
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [showTags, setShowTags] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return skills.filter((s) => {
      if (category !== "All" && s.category !== category) return false;
      // OR semantics: keep a skill if it carries any of the active tags.
      if (activeTags.length > 0 && !activeTags.some((t) => s.tags.includes(t)))
        return false;
      if (!q) return true;
      const haystack = [
        s.name,
        s.tagline,
        s.summary,
        s.category,
        s.author.name,
        ...s.tags,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [skills, query, category, activeTags]);

  const hasFilters = query !== "" || category !== "All" || activeTags.length > 0;

  function toggleTag(tag: string) {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  }

  function reset() {
    setQuery("");
    setCategory("All");
    setActiveTags([]);
  }

  return (
    <div className="space-y-5">
      {/* Search + tag toggle */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ค้นหาสกิล, tag, ผู้สร้าง…"
            className="h-10 w-full rounded-lg border border-border bg-surface pl-9 pr-3 text-sm text-foreground placeholder:text-faint outline-none transition-colors focus:border-accent/50"
          />
        </div>
        <button
          onClick={() => setShowTags((v) => !v)}
          className={cn(
            "flex h-10 items-center gap-2 rounded-lg border px-3 text-sm transition-colors",
            showTags || activeTags.length > 0
              ? "border-accent/40 bg-accent/10 text-accent"
              : "border-border bg-surface text-muted hover:text-foreground",
          )}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Tags
          {activeTags.length > 0 && (
            <span className="rounded bg-accent/20 px-1.5 text-xs">
              {activeTags.length}
            </span>
          )}
        </button>
      </div>

      {/* Category segmented control */}
      <div className="flex flex-wrap gap-1.5">
        {(["All", ...categories] as const).map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
              category === c
                ? "border-foreground/20 bg-foreground text-background"
                : "border-border bg-surface text-muted hover:border-border-strong hover:text-foreground",
            )}
          >
            {c === "All" ? "ทั้งหมด" : c}
          </button>
        ))}
      </div>

      {/* Tag toggles (collapsible) */}
      {showTags && (
        <div className="flex flex-wrap gap-1.5 rounded-lg border border-border bg-surface/50 p-3">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={cn(
                "rounded-md border px-2 py-0.5 font-mono text-[11px] transition-colors",
                activeTags.includes(tag)
                  ? "border-accent/40 bg-accent/10 text-accent"
                  : "border-border bg-surface-2 text-muted hover:text-foreground",
              )}
            >
              #{tag}
            </button>
          ))}
        </div>
      )}

      {/* Result meta */}
      <div className="flex items-center justify-between text-sm text-faint">
        <span>
          พบ {filtered.length} สกิล
          {hasFilters ? " ตามที่กรอง" : " ในคอลเลกชัน"}
        </span>
        {hasFilters && (
          <button
            onClick={reset}
            className="flex items-center gap-1 text-muted transition-colors hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" />
            ล้าง
          </button>
        )}
      </div>

      {/* Grid / empty state */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((skill) => (
            <SkillCard key={skill.slug} skill={skill} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border py-16 text-center">
          <p className="text-sm text-muted">ไม่มีสกิลที่ตรงกับตัวกรอง</p>
          <button
            onClick={reset}
            className="rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-foreground transition-colors hover:border-border-strong"
          >
            ล้างตัวกรอง
          </button>
        </div>
      )}
    </div>
  );
}
