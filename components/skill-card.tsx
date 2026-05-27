import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { SkillWithAuthor } from "@/lib/skills";
import { CategoryBadge } from "@/components/category-badge";
import { TagPill } from "@/components/tag-pill";
import { AuthorAvatar } from "@/components/author-avatar";

export function SkillCard({ skill }: { skill: SkillWithAuthor }) {
  return (
    <Link
      href={`/skills/${skill.slug}`}
      className="group surface-hi card-glow relative flex flex-col gap-3 rounded-xl border border-border bg-surface p-5 transition duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:bg-surface-3"
    >
      <div className="flex items-start justify-between gap-3">
        <CategoryBadge category={skill.category} />
        <ArrowUpRight className="h-4 w-4 text-faint transition-colors group-hover:text-accent" />
      </div>

      <div className="space-y-1.5">
        <h3 className="font-mono text-base font-semibold tracking-tight text-foreground">
          {skill.name}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted">
          {skill.tagline}
        </p>
      </div>

      <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
        {skill.tags.slice(0, 3).map((tag) => (
          <TagPill key={tag} tag={tag} />
        ))}
      </div>

      <div className="flex items-center gap-2 border-t border-border pt-3 text-xs text-faint">
        <AuthorAvatar author={skill.author} size="sm" />
        <span className="text-muted">{skill.author.name}</span>
        {skill.author.kind === "self" && (
          <span className="ml-auto rounded border border-accent/30 bg-accent/10 px-1.5 py-0.5 font-mono text-[10px] text-accent">
            mine
          </span>
        )}
      </div>
    </Link>
  );
}
