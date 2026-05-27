"use client";

import { useCallback, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  ChevronDown,
  CornerDownRight,
  MessageSquare,
  RotateCcw,
} from "lucide-react";
import type { Category, Example } from "@/lib/skills";
import { ExampleTranscript } from "@/components/example-transcript";
import { CopyButton } from "@/components/copy-button";
import { categoryDot } from "@/components/category-badge";
import { cn } from "@/lib/utils";

/** A step's skill, pre-resolved by the (server) page, with its first example. */
export interface StepSkillView {
  slug: string;
  name: string;
  category: Category;
  example?: Example;
}

/** A step, flattened for the client island. */
export interface StepView {
  label: string;
  prompt?: string;
  outcome: string;
  skills: StepSkillView[];
}

/**
 * Per-recipe progress backed by localStorage. Uses `useSyncExternalStore` so it
 * is SSR-safe (server renders all-unchecked) without a setState-in-effect read.
 */
function usePersistentProgress(
  key: string,
  length: number,
): [boolean[], (i: number) => void, () => void] {
  // Stable all-false array — the server snapshot and the empty-store fallback.
  const fallbackRef = useRef<boolean[]>(new Array(length).fill(false));
  // Cache the parsed value so getSnapshot returns a stable reference until the
  // stored string actually changes (a requirement of useSyncExternalStore).
  const cacheRef = useRef<{ raw: string | null; value: boolean[] } | null>(null);
  const listenersRef = useRef(new Set<() => void>());

  const read = useCallback((): boolean[] => {
    let raw: string | null = null;
    try {
      raw = localStorage.getItem(key);
    } catch {
      /* localStorage unavailable — treat as empty. */
    }
    if (!cacheRef.current || cacheRef.current.raw !== raw) {
      let value = fallbackRef.current;
      try {
        const parsed = raw ? (JSON.parse(raw) as unknown) : null;
        if (
          Array.isArray(parsed) &&
          parsed.length === length &&
          parsed.every((v) => typeof v === "boolean")
        ) {
          value = parsed as boolean[];
        }
      } catch {
        /* malformed — keep the all-false fallback. */
      }
      cacheRef.current = { raw, value };
    }
    return cacheRef.current.value;
  }, [key, length]);

  const subscribe = useCallback(
    (cb: () => void) => {
      const set = listenersRef.current;
      set.add(cb);
      const onStorage = (e: StorageEvent) => {
        if (e.key === key) cb();
      };
      window.addEventListener("storage", onStorage);
      return () => {
        set.delete(cb);
        window.removeEventListener("storage", onStorage);
      };
    },
    [key],
  );

  const getServerSnapshot = useCallback(() => fallbackRef.current, []);
  const done = useSyncExternalStore(subscribe, read, getServerSnapshot);

  const write = useCallback(
    (next: boolean[]) => {
      try {
        localStorage.setItem(key, JSON.stringify(next));
      } catch {
        /* ignore write failures (e.g. private-mode quota). */
      }
      listenersRef.current.forEach((l) => l());
    },
    [key],
  );

  const toggle = useCallback(
    (i: number) => {
      write(read().map((v, idx) => (idx === i ? !v : v)));
    },
    [read, write],
  );

  const reset = useCallback(
    () => write(new Array(length).fill(false)),
    [write, length],
  );

  return [done, toggle, reset];
}

/**
 * The interactive part of a Recipe: tick off steps (persisted per recipe in
 * localStorage), copy a step's prompt or all prompts, and expand a skill's
 * first example inline (collapsed by default; the data still lives in the
 * skill catalog, this just re-shows it).
 */
export function RecipeSteps({
  recipeSlug,
  steps,
}: {
  recipeSlug: string;
  steps: StepView[];
}) {
  const [done, toggle, reset] = usePersistentProgress(
    `invokenotes:recipe-progress:${recipeSlug}`,
    steps.length,
  );
  const [openExample, setOpenExample] = useState<string | null>(null);

  const completed = done.filter(Boolean).length;

  const allPrompts = steps
    .map((s, i) => (s.prompt ? `${i + 1}. ${s.prompt}` : null))
    .filter((line): line is string => line !== null)
    .join("\n\n");

  return (
    <div>
      {/* Progress + copy-all */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <span className="text-sm text-muted">
          ทำแล้ว{" "}
          <span className="font-mono text-foreground">
            {completed}/{steps.length}
          </span>
        </span>
        <div className="flex items-center gap-2">
          {completed > 0 && (
            <button
              onClick={reset}
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface-2 px-2 py-1 text-xs text-muted transition-colors hover:text-foreground"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              รีเซ็ต
            </button>
          )}
          {allPrompts && (
            <CopyButton value={allPrompts} label="คัดลอก prompt ทั้งหมด" />
          )}
        </div>
      </div>

      {steps.map((step, i) => {
        const isDone = done[i];
        return (
          <div key={i} className="relative flex gap-4">
            {/* Number / checkbox rail */}
            <div className="flex flex-col items-center">
              <button
                onClick={() => toggle(i)}
                aria-pressed={isDone}
                aria-label={isDone ? "ทำแล้ว — กดเพื่อยกเลิก" : "ทำเสร็จแล้ว?"}
                className="shrink-0 rounded-full transition-transform hover:scale-105"
              >
                {isDone ? (
                  <CheckCircle2 className="h-7 w-7 text-accent" />
                ) : (
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-border-strong bg-surface-2 font-mono text-xs text-accent">
                    {i + 1}
                  </span>
                )}
              </button>
              {i < steps.length - 1 && (
                <span className="mt-1 w-px flex-1 bg-border" aria-hidden />
              )}
            </div>

            {/* Body */}
            <div className={cn("min-w-0 flex-1 pb-8", isDone && "opacity-60")}>
              <div className="flex flex-wrap items-center gap-2">
                <h3
                  className={cn(
                    "text-[15px] font-semibold text-foreground",
                    isDone && "line-through",
                  )}
                >
                  {step.label}
                </h3>
                {step.skills.length > 0 ? (
                  step.skills.map((s) => {
                    const key = `${i}:${s.slug}`;
                    return (
                      <span key={s.slug} className="inline-flex items-center gap-1">
                        <Link
                          href={`/skills/${s.slug}`}
                          className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface-2 px-2 py-0.5 font-mono text-xs text-foreground/90 transition-colors hover:border-accent/40 hover:text-accent"
                        >
                          <span
                            className={cn(
                              "h-1.5 w-1.5 rounded-full",
                              categoryDot(s.category),
                            )}
                          />
                          {s.name}
                        </Link>
                        {s.example && (
                          <button
                            onClick={() =>
                              setOpenExample((cur) => (cur === key ? null : key))
                            }
                            aria-expanded={openExample === key}
                            className="inline-flex items-center gap-0.5 rounded-md border border-border px-1.5 py-0.5 text-[11px] text-faint transition-colors hover:text-foreground"
                          >
                            ตัวอย่าง
                            <ChevronDown
                              className={cn(
                                "h-3 w-3 transition-transform",
                                openExample === key && "rotate-180",
                              )}
                            />
                          </button>
                        )}
                      </span>
                    );
                  })
                ) : (
                  <span className="rounded-md border border-border bg-surface-2 px-2 py-0.5 text-[11px] text-faint">
                    งานมือ · ไม่เรียก skill
                  </span>
                )}
              </div>

              {/* Prompt + per-step copy */}
              {step.prompt && (
                <div className="mt-3 rounded-lg border border-border bg-surface p-3">
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wide text-faint">
                      <MessageSquare className="h-3.5 w-3.5" />
                      สิ่งที่คุณพิมพ์
                    </p>
                    <CopyButton
                      value={step.prompt}
                      label="คัดลอก"
                      className="px-1.5 py-0.5"
                    />
                  </div>
                  <p className="text-sm leading-relaxed text-foreground/90">
                    {step.prompt}
                  </p>
                </div>
              )}

              {/* Inline example(s) — collapsed until toggled */}
              {step.skills.map((s) =>
                s.example && openExample === `${i}:${s.slug}` ? (
                  <div key={s.slug} className="mt-3">
                    <ExampleTranscript example={s.example} />
                  </div>
                ) : null,
              )}

              {/* Outcome */}
              <div className="mt-3 flex gap-2.5">
                <CornerDownRight className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <p className="text-sm leading-relaxed text-muted">
                  {step.outcome}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
