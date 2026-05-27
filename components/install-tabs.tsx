"use client";

import { useState } from "react";
import type { InstallMethod } from "@/lib/skills";
import { CopyButton } from "@/components/copy-button";
import { cn } from "@/lib/utils";

export function InstallTabs({ methods }: { methods: InstallMethod[] }) {
  const [active, setActive] = useState(0);
  const method = methods[active];

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-border bg-surface-2 px-2 py-1.5">
        {methods.map((m, i) => (
          <button
            key={m.label}
            onClick={() => setActive(i)}
            className={cn(
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
              i === active
                ? "bg-background text-foreground"
                : "text-muted hover:text-foreground",
            )}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Command */}
      <div className="relative">
        <pre className="overflow-x-auto p-4 pr-20 font-mono text-[13px] leading-relaxed text-foreground/90">
          <code>{method.command}</code>
        </pre>
        <div className="absolute right-3 top-3">
          <CopyButton value={method.command} />
        </div>
      </div>

      {method.note && (
        <p className="border-t border-border px-4 py-2 text-xs text-faint">
          {method.note}
        </p>
      )}
    </div>
  );
}
