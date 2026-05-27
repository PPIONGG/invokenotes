import { Hash } from "lucide-react";
import { cn } from "@/lib/utils";

export function TagPill({
  tag,
  className,
}: {
  tag: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 rounded-md border border-border bg-surface-2 px-1.5 py-0.5 font-mono text-[11px] text-muted",
        className,
      )}
    >
      <Hash className="h-3 w-3 text-faint" />
      {tag}
    </span>
  );
}
