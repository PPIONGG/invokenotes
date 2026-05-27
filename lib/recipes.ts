// ---------------------------------------------------------------------------
// Recipe domain model for InvokeNotes. Terms mirror CONTEXT.md exactly:
//   Recipe (an ordered, editorial walkthrough of a real-life situation) and
//   Step (one ordered stage that may invoke 0..N Skills).
//
// A Recipe has NO Author — it is the site's own editorial sequencing, often
// combining Skills from several different Authors.
//
// Every Skill a Step references MUST already exist in the catalog, by slug
// (see docs/adr/0007). The selectors below enforce that at build time: an
// unknown slug throws while pages are statically generated. Steps that are not
// a skill call are plain connective narrative (empty skillSlugs, no prompt).
// ---------------------------------------------------------------------------

import { getSkill, type Category } from "./skills";

/** One ordered stage of a Recipe. */
export interface Step {
  /** Phase label (Thai), e.g. "วางแผน & เคาะสเปก". */
  label: string;
  /** Cataloged skill slugs used at this step (0..N). Empty = narrative step. */
  skillSlugs: string[];
  /** The prompt you'd give the agent here (Thai). Omitted for narrative steps. */
  prompt?: string;
  /** What you do / what you get at this point (Thai). */
  outcome: string;
}

/**
 * The single kind of work a Recipe is for — the primary browse axis.
 * Distinct from a Skill's Category (see CONTEXT.md). "Understand" is not a Goal:
 * it is a Step on the way to building, fixing, or improving.
 */
export type Goal = "Build" | "Fix" | "Improve" | "Ship";

/** How much judgment/experience the Recipe demands — not its length. */
export type Difficulty = "beginner" | "intermediate" | "advanced";

/** Rough size of the job, by sitting (a guide, not a clock). */
export type Effort = "single-session" | "half-day" | "multi-day";

/** What a reader should have in place before starting a Recipe (see CONTEXT.md). */
export interface Prerequisites {
  /** Free-text readiness, e.g. "Node 22+", "เข้าใจ TS เบื้องต้น". */
  notes: string[];
  /** Other Recipes to complete first — a backward Recipe→Recipe dependency. */
  recipeSlugs: string[];
}

export interface Recipe {
  slug: string;
  /** The real-life situation (Thai), e.g. "สร้างเว็บ full-stack 1 โปรเจกต์". */
  title: string;
  /** One-line outcome/goal (Thai). */
  tagline: string;
  /** Short framing paragraph (Thai). */
  intro: string;
  /** The single kind of work this Recipe is for — the browse axis. */
  goal: Goal;
  difficulty: Difficulty;
  effort: Effort;
  /** Concrete artifacts you hold at the end (Thai) — distinct from the tagline. */
  deliverables: string[];
  /** What to have ready first. Omitted when there is nothing to require. */
  prerequisites?: Prerequisites;
  steps: Step[];
  featured?: boolean;
}

// ---------------------------------------------------------------------------
// Recipes — editorial, Thai-primary. Seeded from skills already in the catalog.
// ---------------------------------------------------------------------------

export const recipes: Recipe[] = [
  {
    slug: "build-fullstack-web",
    title: "สร้างเว็บ full-stack 1 โปรเจกต์",
    tagline:
      "ตั้งแต่เคาะสเปก → ออกแบบ → เขียนฟีเจอร์ → ไล่บั๊ก → ตั้งระบบกันพลาด → ส่งต่อ — เรียงว่าหยิบ skill ไหนตอนไหน",
    intro:
      "เหมือนร้านคอมที่ประกอบเครื่องจากอุปกรณ์หลายชิ้น — เรซิพีนี้ร้อยหลาย skill เข้าด้วยกันเป็น flow เดียวสำหรับสร้างเว็บ full-stack ใหม่ แต่ละขั้นบอกว่าจะคุยกับ agent ว่าอะไร หยิบ skill ตัวไหน และจะได้อะไรกลับมา",
    featured: true,
    goal: "Build",
    difficulty: "advanced",
    effort: "multi-day",
    deliverables: [
      "เว็บ full-stack ที่รันได้จริง",
      "ชุดเทสต์ที่คุมพฤติกรรมหลักของฟีเจอร์",
      "design system (สี/ฟอนต์/pattern) ที่ใช้ซ้ำได้ทั้งโปรเจกต์",
      "pre-commit hook กัน type error / test fail",
      "glossary + ADR ตั้งต้นของโปรเจกต์",
      "เอกสาร handoff สำหรับ session ถัดไป",
    ],
    prerequisites: {
      notes: ["Node 22+ และ repo ที่ init/รันได้", "เข้าใจ TypeScript เบื้องต้น"],
      recipeSlugs: [],
    },
    steps: [
      {
        label: "วางแผน & เคาะสเปกก่อนลงโค้ด",
        skillSlugs: ["grill-with-docs"],
        prompt:
          "อยากสร้างเว็บจดโน้ตแบบ full-stack ช่วย grill ให้สเปกรัดกุมก่อนลงมือ",
        outcome:
          "ถูกซักทีละข้อจนขอบเขตฟีเจอร์ชัด ไม่มีจุดคลุมเครือ และได้ glossary + ADR ติดมาเป็นเอกสารตั้งต้นของโปรเจกต์",
      },
      {
        label: "ออกแบบ design system",
        skillSlugs: ["ui-ux-pro-max"],
        prompt:
          "ทำ design system ให้เว็บจดโน้ต โทน dark dev-tool ช่วยเลือกสไตล์/สี/ฟอนต์ให้หน่อย",
        outcome:
          "ได้ pattern + พาเลตต์สี + คู่ฟอนต์ + anti-pattern ที่เข้ากับงาน เอาไปวาง UI ต่อได้ทันที ไม่ต้องเดา",
      },
      {
        label: "วางโครงโปรเจกต์",
        skillSlugs: [],
        outcome:
          "ตั้ง Next.js + เลือก stack ตามที่เคาะไว้ วาง schema และ route เปล่าๆ ให้พร้อม — ขั้นนี้เป็นงานมือ ไม่ได้เรียก skill ตัวไหน",
      },
      {
        label: "เขียนหน้าหลักแบบเทสต์นำ + ขัด UI",
        skillSlugs: ["tdd", "ui-ux-pro-max"],
        prompt:
          "เพิ่มฟีเจอร์สร้าง/แก้โน้ตด้วย TDD แล้วรีวิว UI ตามเช็กลิสต์ accessibility",
        outcome:
          "ได้โค้ดที่ทุกบรรทัดมีเทสต์คุม (อ่านเป็นสเปก ไม่พังตอน refactor) พร้อมหน้าตาที่ผ่านเช็กลิสต์ UX — สองสกิลทำงานในขั้นเดียว",
      },
      {
        label: "ไล่บั๊กที่โผล่ระหว่างทาง",
        skillSlugs: ["diagnose"],
        prompt: "บันทึกโน้ตซ้ำเป็นบางครั้งตอนกดเร็วๆ ช่วย diagnose ที",
        outcome:
          "สร้าง feedback loop ที่ reproduce บั๊กได้ก่อน แล้วตัดสาเหตุทีละสมมติฐาน จบด้วย regression test กันบั๊กกลับมา",
      },
      {
        label: "ตั้งระบบกันพลาดก่อน commit",
        skillSlugs: ["setup-pre-commit"],
        prompt: "ตั้ง pre-commit hook ให้ format / typecheck / test อัตโนมัติ",
        outcome:
          "ทุก commit ถูก format ด้วย Prettier และกัน type error / test fail ไม่ให้หลุดเข้า repo โดยปรับตาม script ที่มีจริง",
      },
      {
        label: "ส่งต่อให้ session ถัดไป",
        skillSlugs: ["handoff"],
        prompt:
          "context ใกล้เต็มแล้ว ช่วยทำ handoff ให้ session หน้ามาทำเรื่อง deploy ต่อ",
        outcome:
          "ได้เอกสารส่งต่อสั้นๆ ที่สรุปสถานะ + งานที่เหลือ + skill ที่ควรหยิบต่อ ให้ session ใหม่สานต่อได้ทันที",
      },
    ],
  },
  {
    slug: "refactor-unfamiliar-code",
    title: "รื้อโค้ดเก่าที่ไม่คุ้นให้ปลอดภัย",
    tagline:
      "เข้าใจภาพรวมก่อนแตะ → คุมพฤติกรรมด้วยเทสต์ → รื้อ → ไล่บั๊ก → ส่งต่อ",
    intro:
      "เจอโค้ดส่วนที่ไม่ได้เขียนเองแล้วต้องรื้อ เรซิพีนี้เรียงลำดับให้รื้อได้โดยไม่ทำของเดิมพัง — เริ่มจากเห็นภาพใหญ่ก่อน ค่อยลงมือ",
    goal: "Improve",
    difficulty: "intermediate",
    effort: "half-day",
    deliverables: [
      "โค้ดที่รื้อใหม่โดยพฤติกรรมเดิมไม่เปลี่ยน",
      "ชุดเทสต์ characterization ที่คุมพฤติกรรมเดิม",
      "regression test สำหรับบั๊กที่เจอระหว่างรื้อ",
      "เอกสารส่งต่อให้คนทำส่วนที่เหลือ",
    ],
    prerequisites: {
      notes: ["repo ที่ build/รันได้", "เข้าถึง git history ของส่วนที่จะรื้อ"],
      recipeSlugs: [],
    },
    steps: [
      {
        label: "เห็นภาพรวมก่อนแตะ",
        skillSlugs: ["zoom-out"],
        prompt: "ผมไม่คุ้นส่วน auth นี้เลย zoom out ให้เห็นภาพรวมก่อน",
        outcome:
          "ได้แผนที่โมดูล + ใครเรียกใช้บ้าง (callers) ด้วยคำศัพท์จาก glossary ของโปรเจกต์ รู้ว่าจุดไหนแตะแล้วเสี่ยง",
      },
      {
        label: "คุมพฤติกรรมด้วยเทสต์ก่อนรื้อ",
        skillSlugs: ["tdd"],
        prompt: "ช่วยเขียนเทสต์คลุมพฤติกรรมปัจจุบันของ auth ก่อนผมจะ refactor",
        outcome:
          "ได้ตาข่ายเทสต์ที่ตรวจ 'พฤติกรรม' ไม่ใช่โครงสร้างภายใน — รื้อข้างในได้อย่างมั่นใจว่าผลลัพธ์ไม่เปลี่ยน",
      },
      {
        label: "ไล่บั๊กที่โผล่จากการรื้อ",
        skillSlugs: ["diagnose"],
        prompt: "หลัง refactor แล้ว login พังเป็นบางเคส ช่วย diagnose",
        outcome:
          "ยกอัตราการเกิดบั๊กให้ reproduce ได้ ตั้งสมมติฐานแล้วตัดทีละข้อจนเจอจุดที่รื้อพลาด แล้วแก้ + ผูก regression test",
      },
      {
        label: "ส่งต่อ/บันทึกสถานะ",
        skillSlugs: ["handoff"],
        prompt: "เพื่อนจะมาทำ refactor ส่วนที่เหลือต่อ ช่วยทำ handoff ให้",
        outcome:
          "สรุปสิ่งที่รื้อไปแล้ว / ที่ยังเหลือ + จุดที่ต้องระวัง อ้างอิง path/PR แทนการก๊อปซ้ำ ให้คนถัดไปรับช่วงได้เลย",
      },
    ],
  },
  {
    slug: "ship-to-production",
    title: "ส่งเว็บขึ้น production ครั้งแรก",
    tagline:
      "ล็อก quality gate → ทดสอบก่อนเปิดจริง → เฝ้าหลัง deploy → ส่งต่อ on-call",
    intro:
      "ต่อยอดจากเว็บที่ build เสร็จแล้ว — เรซิพีนี้พาส่งขึ้น production อย่างมีสติ กันพังตั้งแต่ก่อนปล่อย และพร้อมรับมือถ้ามีปัญหาหลัง deploy",
    goal: "Ship",
    difficulty: "intermediate",
    effort: "half-day",
    deliverables: [
      "เว็บที่ขึ้น production แล้ว",
      "quality gate (pre-commit/CI) กัน regression ก่อนปล่อย",
      "เอกสารส่งต่อให้คน on-call",
    ],
    prerequisites: {
      notes: ["บัญชี/สิทธิ์ deploy (เช่น Vercel)"],
      recipeSlugs: ["build-fullstack-web"],
    },
    featured: true,
    steps: [
      {
        label: "ล็อก quality gate ก่อนปล่อย",
        skillSlugs: ["setup-pre-commit"],
        prompt: "ตั้ง pre-commit ให้ typecheck + test ผ่านก่อนถึงจะ commit ได้",
        outcome:
          "ได้ด่านกันพลาดที่ทำให้โค้ดพังไม่หลุดขึ้นไป — เป็นเงื่อนไขขั้นต่ำก่อนคิดเรื่อง deploy",
      },
      {
        label: "ทดสอบ smoke ก่อนเปิดจริง",
        skillSlugs: [],
        outcome:
          "build + รันบน environment ใกล้ production แล้วไล่กดเส้นทางหลักด้วยตัวเอง — ขั้นนี้เป็นงานมือ ไม่ได้เรียก skill",
      },
      {
        label: "เฝ้าหลัง deploy แล้วไล่ปัญหาที่โผล่",
        skillSlugs: ["diagnose"],
        prompt: "หลัง deploy แล้ว /api ตอบช้าผิดปกติเป็นบางครั้ง ช่วย diagnose",
        outcome:
          "ตั้ง feedback loop วัดของจริงบน production แล้วตัดสาเหตุทีละข้อ ไม่เดา — จบด้วย regression test กันซ้ำ",
      },
      {
        label: "ส่งต่อให้คน on-call",
        skillSlugs: ["handoff"],
        prompt: "ช่วยทำ handoff สรุปสถานะ deploy + จุดเฝ้าระวัง ให้คน on-call",
        outcome:
          "ได้เอกสารส่งต่อที่บอกว่าอะไร deploy ไปแล้ว ต้องจับตาตรงไหน และติดต่อใครถ้าพัง",
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Selectors
// ---------------------------------------------------------------------------

export function getRecipe(slug: string): Recipe | undefined {
  return recipes.find((r) => r.slug === slug);
}

/** A skill reference for chips/links — just what the UI needs, no author join. */
export interface SkillRef {
  slug: string;
  name: string;
  category: Category;
}

function toRef(slug: string, recipeSlug: string): SkillRef {
  const skill = getSkill(slug);
  if (!skill) {
    // ADR 0007: a Recipe must not reference a skill outside the catalog.
    throw new Error(
      `Recipe "${recipeSlug}" references unknown skill "${slug}" — add it to the catalog first (see docs/adr/0007).`,
    );
  }
  return { slug: skill.slug, name: skill.name, category: skill.category };
}

/** The skills used by a single Step, resolved for rendering. */
export function stepSkillRefs(step: Step, recipeSlug: string): SkillRef[] {
  return step.skillSlugs.map((slug) => toRef(slug, recipeSlug));
}

/**
 * The derived "parts list" — the union of every skill across the Recipe's
 * steps, in first-appearance order. Never authored separately, so it cannot
 * drift from the steps.
 */
export function skillRefsInRecipe(recipe: Recipe): SkillRef[] {
  const seen = new Set<string>();
  const out: SkillRef[] = [];
  for (const step of recipe.steps) {
    for (const slug of step.skillSlugs) {
      if (seen.has(slug)) continue;
      seen.add(slug);
      out.push(toRef(slug, recipe.slug));
    }
  }
  return out;
}

/** Recipes that include a given skill in any step — powers cross-linking. */
export function getRecipesUsingSkill(skillSlug: string): Recipe[] {
  return recipes.filter((r) =>
    r.steps.some((s) => s.skillSlugs.includes(skillSlug)),
  );
}

/** A skill joined with its author, plus its parts list — handy for cards. */
export interface RecipeWithSkills extends Recipe {
  skills: SkillRef[];
}

export function withSkills(recipe: Recipe): RecipeWithSkills {
  return { ...recipe, skills: skillRefsInRecipe(recipe) };
}

export const recipesWithSkills: RecipeWithSkills[] = recipes.map(withSkills);

export const featuredRecipes: RecipeWithSkills[] = recipesWithSkills.filter(
  (r) => r.featured,
);

// ---------------------------------------------------------------------------
// Prerequisite graph — recipe→recipe edges, validated once at module load.
// Mirrors the honesty guard of ADR 0007: an edge must point at a real Recipe,
// and the graph must stay acyclic (A requires B requires A is rejected).
// ---------------------------------------------------------------------------

/** Recipes this Recipe lists as prerequisites, resolved. Throws on unknown slug. */
export function prerequisiteRecipes(recipe: Recipe): Recipe[] {
  return (recipe.prerequisites?.recipeSlugs ?? []).map((slug) => {
    const r = getRecipe(slug);
    if (!r) {
      throw new Error(
        `Recipe "${recipe.slug}" has unknown prerequisite recipe "${slug}".`,
      );
    }
    return r;
  });
}

/** Recipes that list `slug` as a prerequisite — the inverse edge ("do next"). */
export function nextRecipes(slug: string): Recipe[] {
  return recipes.filter((r) =>
    (r.prerequisites?.recipeSlugs ?? []).includes(slug),
  );
}

function assertAcyclicPrerequisites(): void {
  const state = new Map<string, "visiting" | "done">();
  const walk = (slug: string, trail: string[]): void => {
    if (state.get(slug) === "done") return;
    if (state.get(slug) === "visiting") {
      throw new Error(
        `Prerequisite cycle detected: ${[...trail, slug].join(" → ")}`,
      );
    }
    state.set(slug, "visiting");
    for (const dep of getRecipe(slug)?.prerequisites?.recipeSlugs ?? []) {
      if (!getRecipe(dep)) {
        throw new Error(
          `Recipe "${slug}" has unknown prerequisite recipe "${dep}".`,
        );
      }
      walk(dep, [...trail, slug]);
    }
    state.set(slug, "done");
  };
  for (const r of recipes) walk(r.slug, []);
}

// Runs at import time → fails the build on a missing or cyclic prerequisite.
assertAcyclicPrerequisites();

/** Goals present in the catalog, in canonical lifecycle order — drives the filter. */
const GOAL_ORDER: Goal[] = ["Build", "Fix", "Improve", "Ship"];
export const allGoals: Goal[] = GOAL_ORDER.filter((g) =>
  recipes.some((r) => r.goal === g),
);
