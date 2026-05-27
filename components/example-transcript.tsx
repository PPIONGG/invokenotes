import { CornerDownRight, MessageSquare } from "lucide-react";
import type { Example } from "@/lib/skills";
import { MarkdownView } from "@/components/markdown-view";

export function ExampleTranscript({ example }: { example: Example }) {
  return (
    <figure className="overflow-hidden rounded-xl border border-border bg-surface">
      <figcaption className="border-b border-border bg-surface-2 px-4 py-2 text-xs font-medium text-muted">
        {example.title}
      </figcaption>

      <div className="space-y-4 p-4">
        {/* Prompt */}
        <div className="flex gap-3">
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-border-strong bg-surface-2 text-faint">
            <MessageSquare className="h-3.5 w-3.5" />
          </span>
          <div className="flex-1">
            <p className="mb-1 font-mono text-[11px] uppercase tracking-wide text-faint">
              Prompt
            </p>
            <p className="text-sm leading-relaxed text-foreground/90">
              {example.prompt}
            </p>
          </div>
        </div>

        {/* Result */}
        <div className="flex gap-3">
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-accent/40 bg-accent/10 text-accent">
            <CornerDownRight className="h-3.5 w-3.5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="mb-1 font-mono text-[11px] uppercase tracking-wide text-accent/80">
              ผลลัพธ์
            </p>
            <MarkdownView>{example.result}</MarkdownView>
          </div>
        </div>
      </div>
    </figure>
  );
}
