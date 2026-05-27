import type { Author } from "@/lib/skills";
import { cn } from "@/lib/utils";

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const SIZES = {
  sm: "h-6 w-6 text-[10px]",
  md: "h-9 w-9 text-xs",
  lg: "h-14 w-14 text-lg",
} as const;

export function AuthorAvatar({
  author,
  size = "md",
  className,
}: {
  author: Author;
  size?: keyof typeof SIZES;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full border font-mono font-semibold",
        author.kind === "self"
          ? "border-accent/40 bg-accent/10 text-accent"
          : "border-border-strong bg-surface-2 text-muted",
        SIZES[size],
        className,
      )}
      title={author.name}
    >
      {initials(author.name)}
    </span>
  );
}
