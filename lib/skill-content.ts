import fs from "node:fs";
import path from "node:path";

// Server-only: reads the verbatim SKILL.md body from content/skills/<slug>.md.
// Kept out of lib/skills.ts so that module stays free of `fs` and safe to import
// (type-only) from client components. Only ever called from server components.
export function getSkillBody(slug: string): string | null {
  const file = path.join(process.cwd(), "content", "skills", `${slug}.md`);
  try {
    return fs.readFileSync(file, "utf8");
  } catch {
    return null;
  }
}
