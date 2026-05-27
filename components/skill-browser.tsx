"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search, SlidersHorizontal, X } from "lucide-react";
import type { Author, Category, SkillWithAuthor } from "@/lib/skills";
import { SkillCard } from "@/components/skill-card";
import { AuthorAvatar } from "@/components/author-avatar";
import { cn } from "@/lib/utils";

export function SkillBrowser({
  skills,
  categories,
  tags,
  authors,
}: {
  skills: SkillWithAuthor[];
  categories: Category[];
  tags: string[];
  authors: Author[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category | "All">("All");
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [author, setAuthor] = useState<string>("All");
  const [showTags, setShowTags] = useState(false);

  // Skill count per author — for the showcase cards.
  const authorCounts = useMemo(() => {
    const m = new Map<string, number>();
    for (const s of skills) m.set(s.authorSlug, (m.get(s.authorSlug) ?? 0) + 1);
    return m;
  }, [skills]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return skills.filter((s) => {
      if (author !== "All" && s.authorSlug !== author) return false;
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
  }, [skills, query, category, activeTags, author]);

  const hasFilters =
    query !== "" ||
    category !== "All" ||
    activeTags.length > 0 ||
    author !== "All";

  function toggleTag(tag: string) {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  }

  // Single-select: clicking the active author again clears it back to "All".
  function toggleAuthor(slug: string) {
    setAuthor((prev) => (prev === slug ? "All" : slug));
  }

  function reset() {
    setQuery("");
    setCategory("All");
    setActiveTags([]);
    setAuthor("All");
  }

  return (
    <div className="space-y-5">
      {/* Authors showcase — doubles as the author filter */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs uppercase tracking-wide text-faint">ผู้สร้าง</p>
          {author !== "All" && (
            <button
              onClick={() => setAuthor("All")}
              className="text-xs text-muted transition-colors hover:text-foreground"
            >
              ดูทุกคน
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {authors.map((a) => {
            const active = author === a.slug;
            return (
              <div
                key={a.slug}
                className={cn(
                  "rounded-xl border p-4 transition-colors",
                  active
                    ? "border-accent/50 bg-accent/5"
                    : "border-border bg-surface hover:border-border-strong",
                )}
              >
                <button
                  onClick={() => toggleAuthor(a.slug)}
                  aria-pressed={active}
                  className="block w-full text-left"
                >
                  <div className="flex items-center gap-3">
                    <AuthorAvatar author={a} size="md" />
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="font-medium text-foreground">
                          {a.name}
                        </span>
                        <span
                          className={cn(
                            "rounded-full border px-1.5 text-[10px]",
                            a.kind === "self"
                              ? "border-accent/30 bg-accent/10 text-accent"
                              : "border-border bg-surface-2 text-muted",
                          )}
                        >
                          {a.kind === "self" ? "ของฉัน" : "Community"}
                        </span>
                      </div>
                      <p className="truncate text-xs text-muted">{a.title}</p>
                    </div>
                  </div>
                </button>
                <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-xs">
                  <span className="text-faint">
                    {authorCounts.get(a.slug) ?? 0} สกิล
                  </span>
                  <Link
                    href={`/authors/${a.slug}`}
                    className="inline-flex items-center gap-0.5 text-muted transition-colors hover:text-accent"
                  >
                    ดูโปรไฟล์
                    <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

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
