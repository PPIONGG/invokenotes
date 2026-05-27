import { Bug, Clock, Hammer, Rocket, Signal, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Difficulty, Effort, Goal } from "@/lib/recipes";
import { cn } from "@/lib/utils";

// Full class strings (not interpolated) so Tailwind's static scanner keeps them.

const GOAL_META: Record<Goal, { label: string; className: string; Icon: LucideIcon }> = {
  Build: {
    label: "สร้าง",
    className: "text-emerald-300 bg-emerald-500/10 border-emerald-500/25",
    Icon: Hammer,
  },
  Fix: {
    label: "แก้",
    className: "text-rose-300 bg-rose-500/10 border-rose-500/25",
    Icon: Bug,
  },
  Improve: {
    label: "ปรับปรุง",
    className: "text-violet-300 bg-violet-500/10 border-violet-500/25",
    Icon: Wrench,
  },
  Ship: {
    label: "ส่ง",
    className: "text-sky-300 bg-sky-500/10 border-sky-500/25",
    Icon: Rocket,
  },
};

export const goalLabel = (goal: Goal) => GOAL_META[goal].label;

const BADGE = "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium";

export function GoalBadge({ goal, className }: { goal: Goal; className?: string }) {
  const m = GOAL_META[goal];
  const Icon = m.Icon;
  return (
    <span className={cn(BADGE, m.className, className)}>
      <Icon className="h-3.5 w-3.5" />
      {m.label}
    </span>
  );
}

const DIFFICULTY_META: Record<Difficulty, { label: string; className: string }> = {
  beginner: {
    label: "เริ่มต้น",
    className: "text-emerald-300 bg-emerald-500/10 border-emerald-500/25",
  },
  intermediate: {
    label: "กลาง",
    className: "text-amber-300 bg-amber-500/10 border-amber-500/25",
  },
  advanced: {
    label: "ขั้นสูง",
    className: "text-rose-300 bg-rose-500/10 border-rose-500/25",
  },
};

export const difficultyLabel = (difficulty: Difficulty) =>
  DIFFICULTY_META[difficulty].label;

export function DifficultyBadge({
  difficulty,
  className,
}: {
  difficulty: Difficulty;
  className?: string;
}) {
  const m = DIFFICULTY_META[difficulty];
  return (
    <span className={cn(BADGE, m.className, className)} title="ความยาก (วิจารณญาณที่ต้องใช้)">
      <Signal className="h-3.5 w-3.5" />
      {m.label}
    </span>
  );
}

const EFFORT_LABEL: Record<Effort, string> = {
  "single-session": "นั่งเดียวจบ",
  "half-day": "ครึ่งวัน–ทั้งวัน",
  "multi-day": "ข้ามวันหลายเซสชัน",
};

export const effortLabel = (effort: Effort) => EFFORT_LABEL[effort];

export function EffortBadge({
  effort,
  className,
}: {
  effort: Effort;
  className?: string;
}) {
  return (
    <span
      className={cn(
        BADGE,
        "border-border bg-surface-2 text-muted",
        className,
      )}
      title="เวลาโดยประมาณ (เป็นค่าคร่าวๆ แล้วแต่คน/โปรเจกต์)"
    >
      <Clock className="h-3.5 w-3.5" />
      {EFFORT_LABEL[effort]}
    </span>
  );
}
