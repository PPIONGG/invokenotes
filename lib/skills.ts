// ---------------------------------------------------------------------------
// Domain model for InvokeNotes. Terms here mirror CONTEXT.md exactly:
//   Skill, Author (+ kind), Source (+ install methods), Example, Category, Tag.
//
// Content is Thai-primary (see docs/adr/0002): curated prose is Thai, while
// skill names, Category values, Tags and code stay English. The verbatim
// SKILL.md body is NOT stored here — it lives in content/skills/<slug>.md and
// is read server-side via lib/skill-content.ts, keeping this module
// client-safe (no `fs`).
// ---------------------------------------------------------------------------

/** Whether an Author is an external community figure or the site creator. */
export type AuthorKind = "community" | "self";

export interface AuthorLinks {
  github?: string;
  twitter?: string;
  website?: string;
}

export interface Author {
  slug: string;
  name: string;
  kind: AuthorKind;
  /** Short role/affiliation (Thai prose, English terms inline). */
  title: string;
  bio: string;
  links: AuthorLinks;
}

/** The single primary kind of work a Skill is for. Values stay English. */
export type Category =
  | "Coding"
  | "Data"
  | "Writing"
  | "Research"
  | "DevOps"
  | "Design"
  | "Productivity";

/** A demonstration of a Skill in action, as a prompt -> result transcript. */
export interface Example {
  title: string;
  /** Thai. */
  prompt: string;
  /** Markdown. Thai narration around English code/diffs/output. */
  result: string;
}

/** One concrete way to obtain a Skill. */
export interface InstallMethod {
  label: string;
  command: string;
  note?: string;
}

/** Where a Skill's original SKILL.md lives, plus how to install it. */
export interface Source {
  repoName: string;
  repoUrl: string;
  fileUrl: string;
  path: string;
  installMethods: InstallMethod[];
}

export interface Skill {
  slug: string;
  /** Frontmatter `name` — stays English. */
  name: string;
  /** Thai one-liner. */
  tagline: string;
  authorSlug: string;
  category: Category;
  tags: string[];
  /** Curated Thai explanation of what the skill is. */
  summary: string;
  whenToUse: string[];
  benefits: string[];
  examples: Example[];
  source: Source;
  featured?: boolean;
}

// ---------------------------------------------------------------------------
// Authors
// ---------------------------------------------------------------------------

export const authors: Author[] = [
  {
    slug: "matt-pocock",
    name: "Matt Pocock",
    kind: "community",
    title: "ครูสอน TypeScript · ผู้สร้าง Total TypeScript",
    bio: "วิศวกรและนักสอนที่โด่งดังเรื่อง TypeScript (Total TypeScript) ปล่อยชุด agent skills ที่ออกแบบมาแก้ failure mode ที่พบบ่อยของ coding agent ครอบคลุม workflow วิศวกรรมตั้งแต่ TDD, การดีบัก, การ prototype ไปจนถึงการเขียน skill เอง",
    links: {
      github: "https://github.com/mattpocock",
      website: "https://www.totaltypescript.com",
      twitter: "https://twitter.com/mattpocockuk",
    },
  },
];

// ---------------------------------------------------------------------------
// Source helper — every skill lives in the same repo with the same install path.
// ---------------------------------------------------------------------------

function mpSource(repoPath: string): Source {
  return {
    repoName: "mattpocock/skills",
    repoUrl: "https://github.com/mattpocock/skills",
    fileUrl: `https://github.com/mattpocock/skills/blob/main/${repoPath}`,
    path: repoPath,
    installMethods: [
      {
        label: "skills installer",
        command: "npx skills@latest add mattpocock/skills",
        note: "เลือก skill ที่ต้องการ (อย่าลืมเลือก /setup-matt-pocock-skills) แล้วรัน /setup-matt-pocock-skills ใน agent ของคุณ",
      },
      {
        label: "Clone repo",
        command: "git clone https://github.com/mattpocock/skills.git",
      },
    ],
  };
}

// ---------------------------------------------------------------------------
// Skills — real skills from mattpocock/skills, curated in Thai.
// ---------------------------------------------------------------------------

export const skills: Skill[] = [
  {
    slug: "tdd",
    name: "tdd",
    tagline: "พัฒนาฟีเจอร์และแก้บั๊กด้วยลูป red-green-refactor ทีละ test",
    authorSlug: "matt-pocock",
    category: "Coding",
    tags: ["testing", "red-green-refactor", "tdd", "workflow", "quality"],
    featured: true,
    summary:
      "บังคับให้เขียน test สลับกับ implementation ทีละตัว (vertical slice / tracer bullet) แทนที่จะเขียน test รวดเดียวแล้วค่อยเขียนโค้ด เน้น test ที่ตรวจ behavior ผ่าน public interface ไม่ผูกกับ implementation จึงรอดจากการ refactor และอ่านได้เหมือน spec ของระบบ",
    whenToUse: [
      "สร้างฟีเจอร์ใหม่โดยให้ test เป็นตัวกำหนด spec",
      "แก้บั๊ก โดยเขียน test ที่ reproduce บั๊กก่อน",
      "งานที่ regression มีราคาแพง อยากได้ตาข่ายกันพลาด",
    ],
    benefits: [
      "ทุกบรรทัดของ implementation มี test รองรับ",
      "test รอดจากการ refactor เพราะตรวจ behavior ไม่ใช่โครงสร้างภายใน",
      "ได้ spec ที่อ่านรู้เรื่องเป็นผลพลอยได้",
    ],
    examples: [
      {
        title: "เพิ่มฟังก์ชัน checkout ด้วย TDD",
        prompt: "ช่วยเพิ่มฟังก์ชัน checkout ที่ปฏิเสธตะกร้าว่างด้วย TDD",
        result: `เริ่มด้วย tracer bullet — เขียน test เดียวก่อน (RED):

\`\`\`ts
test("rejects checkout with an empty cart", () => {
  expect(() => checkout({ items: [] })).toThrow("Cart is empty");
});
\`\`\`

รันแล้ว ❌ fail เพราะยังไม่มี \`checkout\` — fail ด้วยเหตุผลที่ถูกต้อง

GREEN: เขียนโค้ดน้อยที่สุดให้ผ่าน:

\`\`\`ts
export function checkout(cart) {
  if (cart.items.length === 0) throw new Error("Cart is empty");
}
\`\`\`

✅ ผ่าน จากนั้นค่อยเขียน test ตัวถัดไป (เช่น คิดยอดรวม) วนทีละรอบ — ไม่เขียน test รวดเดียวทั้งหมด เพราะนั่นจะได้ test ที่ทดสอบ *สิ่งที่จินตนาการ* ไม่ใช่ behavior จริง`,
      },
    ],
    source: mpSource("skills/engineering/tdd/SKILL.md"),
  },
  {
    slug: "diagnose",
    name: "diagnose",
    tagline:
      "ดีบักบั๊กยากอย่างมีระบบ: สร้าง feedback loop → reproduce → ตั้งสมมติฐาน → วัด → แก้ → กัน regression",
    authorSlug: "matt-pocock",
    category: "Coding",
    tags: ["debugging", "performance", "feedback-loop", "regression", "workflow"],
    featured: true,
    summary:
      "หัวใจคือสร้าง feedback loop ที่เร็ว deterministic และรันเองได้ ให้สัญญาณ pass/fail ของบั๊กก่อน แล้วทุกอย่างที่เหลือ (bisection, ทดสอบสมมติฐาน, ใส่ probe) ก็แค่บริโภคสัญญาณนั้น บังคับให้ตั้ง 3–5 สมมติฐานที่ falsifiable ก่อนลงมือทดสอบ",
    whenToUse: [
      "บั๊กยากที่จ้องโค้ดเฉยๆ แล้วหาไม่เจอ",
      "บั๊กที่เกิดเป็นพักๆ (non-deterministic)",
      "performance regression ที่ต้องวัดก่อนแก้",
    ],
    benefits: [
      "เปลี่ยน 'เดา' เป็น 'วัด' ด้วย feedback loop ที่เชื่อถือได้",
      "ตั้งหลายสมมติฐานพร้อมกัน กันการ anchor กับไอเดียแรก",
      "จบด้วย regression test ที่ผูกบั๊กไว้ถาวร + post-mortem",
    ],
    examples: [
      {
        title: "หน้า checkout เก็บเงินซ้ำเป็นบางครั้ง",
        prompt: "หน้า checkout เก็บเงินซ้ำเป็นบางครั้ง ช่วย diagnose ที",
        result: `บั๊กเป็นพักๆ — เป้าหมาย Phase 1 ยังไม่ใช่ repro สะอาด แต่คือ **ยกอัตราการเกิดให้สูงพอจะดีบักได้**

ผมจะสร้าง loop ที่ยิง \`checkout()\` ด้วย fixture เดิมซ้ำ 200 รอบแบบ parallel แล้วนับจำนวนครั้งที่ \`charge\` ถูกเรียกมากกว่า 1:

\`\`\`bash
node scripts/stress-checkout.mjs --runs 200 --parallel 8
# → double-charged: 11 / 200  (5.5%)
\`\`\`

5.5% ดีบักได้ ตอนนี้ตั้งสมมติฐาน 3 ข้อ (falsifiable) เรียงตามน่าจะเป็น:

1. **retry wrapper ยิงซ้ำเมื่อ charge สำเร็จแต่ timeout** → ถ้าใช่ ปิด retry แล้วอัตราจะเป็น 0
2. race ระหว่าง 2 request กดปุ่มรัว → ถ้าใช่ ใส่ idempotency key จะหาย
3. webhook ตีกลับซ้ำ → ถ้าใช่ จะเห็นใน log ว่ามาจาก webhook ไม่ใช่ client

ขอเทสต์ #1 ก่อน — คุณเพิ่งแก้ส่วน retry มาเหรอเปล่า?`,
      },
    ],
    source: mpSource("skills/engineering/diagnose/SKILL.md"),
  },
  {
    slug: "prototype",
    name: "prototype",
    tagline: "สร้าง prototype แบบใช้แล้วทิ้งเพื่อตอบคำถามดีไซน์ก่อนลงมือจริง",
    authorSlug: "matt-pocock",
    category: "Coding",
    tags: ["prototyping", "design", "throwaway", "ui", "state"],
    summary:
      "prototype คือโค้ดใช้แล้วทิ้งที่ตอบ 'คำถามหนึ่งข้อ' โดยเลือกสองสาขา: ถ้าคำถามคือ 'logic/state model ใช่ไหม' → ทำ terminal app เล็กๆ ที่รันได้; ถ้าคือ 'หน้าตาควรเป็นยังไง' → สร้าง UI หลายแบบสุดขั้วสลับกันได้ใน route เดียว เน้นไม่ persist ไม่ขัดเงา เสร็จแล้วลบหรือกลืนเข้าโค้ดจริง",
    whenToUse: [
      "อยากลองว่า data model / state machine เวิร์กไหมก่อนผูกมัด",
      "อยาก mock up UI หลายแบบเทียบกันเร็วๆ",
      "สำรวจทางเลือกดีไซน์ ('ขอลองเล่นดูก่อน')",
    ],
    benefits: [
      "ตอบคำถามดีไซน์ด้วยของจริงที่จับต้องได้ ไม่ใช่เดาบนกระดาษ",
      "แยกชัดว่าเป็นโค้ดทิ้ง ไม่ปนกับ production",
      "เก็บเฉพาะ 'คำตอบ' ไว้ (commit/ADR/NOTES) แล้วทิ้งตัว prototype",
    ],
    examples: [
      {
        title: "ลอง state machine ของ flow สมัครสมาชิก",
        prompt: "อยากลองว่า state machine ของ flow สมัครสมาชิกออกแบบโอเคไหม",
        result: `คำถามคือ "logic/state model ใช่ไหม" → ไปสาขา LOGIC: ทำ terminal app เล็กๆ ที่รันได้ ดันให้ state machine ผ่านเคสที่คิดบนกระดาษยาก

\`\`\`bash
bun run prototypes/signup-machine.ts   # PROTOTYPE — ลบทิ้งได้
\`\`\`

ทุกครั้งที่สั่ง action มันจะ print state เต็มๆ ให้เห็นว่าอะไรเปลี่ยน:

\`\`\`
state: AWAITING_EMAIL
> submitEmail("x@y.com")
state: AWAITING_OTP   (otpSentAt=…)
> submitOtp("000000")  ✗ wrong
state: AWAITING_OTP   (attempts=1)
\`\`\`

เล่นจนเจอเคสที่ออกแบบพลาด (เช่น OTP หมดอายุระหว่างพิมพ์) แล้วค่อยจดคำตอบลง NOTES.md ก่อนลบ prototype`,
      },
    ],
    source: mpSource("skills/engineering/prototype/SKILL.md"),
  },
  {
    slug: "grill-with-docs",
    name: "grill-with-docs",
    tagline: "ซักไซ้แผนของคุณทีละข้อ พร้อมอัปเดต CONTEXT.md / ADR ไปในตัว",
    authorSlug: "matt-pocock",
    category: "Research",
    tags: ["planning", "documentation", "adr", "domain-modeling", "ddd"],
    featured: true,
    summary:
      "เซสชันสัมภาษณ์ที่ท้าทายแผนของคุณกับ domain model เดิม ไล่ทีละกิ่งของต้นไม้การตัดสินใจ ทำให้คำศัพท์คม และอัปเดตเอกสาร (CONTEXT.md เป็น glossary, ADR สำหรับการตัดสินใจที่ย้อนยาก) ทันทีที่ตกผลึก — เป็นสกิลตัวเดียวกับที่ใช้ออกแบบเว็บ InvokeNotes นี้",
    whenToUse: [
      "อยาก stress-test แผน/ดีไซน์ให้รอบด้านก่อนลงมือ",
      "อยากให้คำศัพท์ในทีมตรงกันและคมขึ้น",
      "อยากบันทึกการตัดสินใจสำคัญเป็นเอกสารระหว่างคุย",
    ],
    benefits: [
      "จับช่องโหว่ของแผนก่อนเขียนโค้ดจริง",
      "glossary และ ADR ถูกอัปเดตสดระหว่างคุย ไม่ค้างไว้ทีหลัง",
      "เสนอ ADR เฉพาะตอนที่คุ้มจริง (ย้อนยาก + เซอร์ไพรส์ + เป็น trade-off)",
    ],
    examples: [
      {
        title: "grill ฟีเจอร์ comment",
        prompt: "อยากเพิ่มฟีเจอร์ comment ในเว็บ ช่วย grill หน่อย",
        result: `ก่อนถาม ผมจะสำรวจโค้ด + CONTEXT.md ก่อน เพื่อไม่ถามสิ่งที่หาเองได้ จากนั้นถามทีละข้อพร้อมคำตอบที่แนะนำ

**คำถามแรก** — comment ผูกกับอะไร?

> glossary ปัจจุบันมี **Skill** และ **Author** แต่ยังไม่มี comment — comment เกาะที่ **Skill** (คุยกันใต้แต่ละสกิล) หรือเกาะที่ **Author**?
>
> *แนะนำ:* เกาะที่ Skill — ตรงกับพฤติกรรม "อ่านสกิลแล้วอยากถาม/เสริม" มากกว่า

พอคุณตอบ ผมจะอัปเดต CONTEXT.md ทันที แล้วค่อยไล่กิ่งถัดไป (เก็บแบบ nested ไหม, ใครลบได้, ฯลฯ)`,
      },
    ],
    source: mpSource("skills/engineering/grill-with-docs/SKILL.md"),
  },
  {
    slug: "handoff",
    name: "handoff",
    tagline: "บีบบทสนทนาปัจจุบันเป็นเอกสารส่งต่อให้ agent ตัวใหม่ทำงานต่อ",
    authorSlug: "matt-pocock",
    category: "Productivity",
    tags: ["context", "handoff", "summary", "workflow"],
    summary:
      "สรุปบทสนทนาปัจจุบันเป็น handoff document ให้ agent ใหม่สานต่อได้ทันที เซฟไว้ใน temp directory ของ OS (ไม่ใช่ workspace) ไม่ทำซ้ำสิ่งที่มีใน PRD/plan/ADR/commit อยู่แล้ว (อ้างอิง path แทน) มีส่วน 'suggested skills' และ redact ข้อมูลอ่อนไหวออกให้",
    whenToUse: [
      "context ใกล้เต็ม อยากส่งงานต่อให้เซสชันใหม่",
      "เปลี่ยนคน/เปลี่ยน agent มาทำงานต่อ",
      "อยากสรุปสถานะงานแบบหยิบไปทำต่อได้เลย",
    ],
    benefits: [
      "agent ใหม่สานต่อได้โดยไม่ต้องไล่อ่านทั้งบทสนทนา",
      "ไม่ทำซ้ำเอกสารที่มีอยู่ — อ้างอิง path/URL แทน",
      "ตัดข้อมูลอ่อนไหว (key / password / PII) ออกให้",
    ],
    examples: [
      {
        title: "ส่งต่องาน deploy ให้เซสชันหน้า",
        prompt: "ช่วยทำ handoff ให้เซสชันหน้ามาทำเรื่อง deploy ต่อ",
        result: `เขียน handoff doc แล้วเซฟไว้ที่ temp dir ของ OS (ไม่ปนใน workspace):

\`\`\`
/tmp/handoff-deploy-2026-05-27.md
\`\`\`

โครงเอกสาร:

- **สถานะ:** Dockerfile.dev + compose เสร็จ, hot reload ผ่าน (ดู docs/adr ที่เกี่ยว)
- **เหลือทำ:** production Dockerfile (multi-stage, output: standalone)
- **อ้างอิง (ไม่ก๊อปซ้ำ):** \`docker-compose.yml\`, commit ล่าสุด
- **Suggested skills:** \`/setup-pre-commit\` ก่อน deploy
- redact: ไม่มี secret ในบทสนทนานี้`,
      },
    ],
    source: mpSource("skills/productivity/handoff/SKILL.md"),
  },
  {
    slug: "write-a-skill",
    name: "write-a-skill",
    tagline: "สร้าง agent skill ใหม่ให้มีโครงสร้างถูกต้องและทรัพยากรครบ",
    authorSlug: "matt-pocock",
    category: "Productivity",
    tags: ["skills", "authoring", "meta", "documentation"],
    summary:
      "พาเขียน SKILL.md ใหม่อย่างเป็นระบบ ตั้งแต่ถาม requirement, ร่าง, ไปจนรีวิว เน้นว่า description คือสิ่งเดียวที่ agent เห็นตอนเลือก skill จึงต้องบอกชัดว่า 'ทำอะไร' + 'ใช้เมื่อไหร่ (triggers)' และใช้ progressive disclosure — แยกไฟล์/ใส่ script เมื่อจำเป็น",
    whenToUse: [
      "อยากสร้าง skill ใหม่ให้ agent",
      "skill เดิมโครงสร้างมั่ว หรืออธิบาย trigger ไม่ชัด",
      "อยากรู้ว่าควรแยกไฟล์ หรือใส่ script ตอนไหน",
    ],
    benefits: [
      "ได้ description ที่ agent เลือกใช้ถูกที่ถูกเวลา",
      "โครงสร้างไฟล์เป็นมาตรฐาน (progressive disclosure)",
      "มี checklist รีวิวก่อนนำไปใช้จริง",
    ],
    examples: [
      {
        title: "เขียน skill สร้าง changelog",
        prompt: "อยากเขียน skill สำหรับสร้าง changelog จาก git log",
        result: `เริ่มจากถาม requirement สั้นๆ ก่อน (task อะไร, ใช้เคสไหน, ต้องมี script ไหม) แล้วร่าง description ที่ดี — สิ่งเดียวที่ agent เห็นตอนเลือก:

\`\`\`md
---
name: changelog
description: Generate a grouped changelog from git history between two refs. Use when the user wants a changelog, release notes, or asks "what changed since <tag>".
---
\`\`\`

สังเกตประโยคที่สอง "Use when…" คือ trigger ที่ทำให้ agent หยิบถูก จากนั้นเสนอโครง: SKILL.md (< 100 บรรทัด) + script \`scripts/changelog.mjs\` เพราะการ parse git log เป็น deterministic — ใส่ script ดีกว่าให้ generate ใหม่ทุกครั้ง`,
      },
    ],
    source: mpSource("skills/productivity/write-a-skill/SKILL.md"),
  },
  {
    slug: "edit-article",
    name: "edit-article",
    tagline:
      "ปรับบทความให้ชัดและกระชับ ด้วยการจัดลำดับ section ตามลำดับการพึ่งพาของข้อมูล",
    authorSlug: "matt-pocock",
    category: "Writing",
    tags: ["writing", "editing", "clarity", "structure"],
    summary:
      "แก้บทความอย่างมีหลักการ: แบ่งเป็น section ตามหัวข้อ มองข้อมูลเป็น directed acyclic graph แล้วจัดลำดับ section ให้เคารพการพึ่งพา (อะไรต้องรู้ก่อน) ยืนยันโครงกับผู้ใช้ก่อน แล้วค่อยเขียนใหม่ทีละ section ให้ชัด คุมไม่เกิน 240 ตัวอักษรต่อย่อหน้า",
    whenToUse: [
      "มี draft บทความที่อยากให้อ่านลื่นและกระชับขึ้น",
      "ลำดับการนำเสนอสับสน เนื้อหาพึ่งพากันผิดลำดับ",
      "อยากรีไรต์ทีละ section อย่างมีโครง",
    ],
    benefits: [
      "ลำดับเนื้อหาเคารพการพึ่งพา ผู้อ่านไม่งง",
      "ย่อหน้ากระชับ (≤ 240 ตัวอักษร) อ่านง่าย",
      "ยืนยันโครงก่อน ไม่รื้อทิ้งทีหลัง",
    ],
    examples: [
      {
        title: "ปรับบทความ 'เริ่มต้นกับ Docker'",
        prompt: "ช่วยปรับบทความ 'เริ่มต้นกับ Docker' ให้อ่านลื่นขึ้น",
        result: `ขั้นแรก แบ่งบทความตามหัวข้อ แล้วมองเป็น DAG ของการพึ่งพา — เรียงใหม่ให้สิ่งที่ต้องรู้ก่อนมาก่อน:

1. Image คืออะไร (พึ่งพา: ไม่มี)
2. Container คืออะไร (พึ่งพา: 1)
3. \`docker run\` (พึ่งพา: 1, 2)
4. Volume & hot reload (พึ่งพา: 2, 3)

ตอนนี้บทความเดิมเอา "volume" ไว้ก่อน "container" ซึ่งผู้อ่านยังไม่รู้จัก container — สลับลำดับ ขอยืนยันโครงนี้ก่อนนะครับ แล้วผมจะรีไรต์ทีละ section คุมย่อหน้าไม่เกิน 240 ตัวอักษร`,
      },
    ],
    source: mpSource("skills/personal/edit-article/SKILL.md"),
  },
  {
    slug: "setup-pre-commit",
    name: "setup-pre-commit",
    tagline:
      "ติดตั้ง pre-commit hook ด้วย Husky + lint-staged (Prettier) พร้อม typecheck และ test",
    authorSlug: "matt-pocock",
    category: "DevOps",
    tags: ["husky", "lint-staged", "prettier", "git-hooks", "ci"],
    summary:
      "ตั้งค่า Husky pre-commit hook ให้ครบในขั้นตอนเดียว: ตรวจ package manager ที่ repo ใช้จริง, ติดตั้ง husky/lint-staged/prettier, สร้าง config ที่ขาด, และใส่ hook ที่รัน lint-staged → typecheck → test (ปรับตาม script ที่มีจริง) ปิดท้ายด้วย commit เพื่อ smoke test",
    whenToUse: [
      "อยากเพิ่ม pre-commit hook ใน repo",
      "อยากให้ format/typecheck/test อัตโนมัติตอน commit",
      "เซ็ตอัป Husky + lint-staged ครั้งแรก",
    ],
    benefits: [
      "format อัตโนมัติทุก commit ด้วย Prettier",
      "กัน type error / test fail หลุดเข้า repo",
      "ตรวจ package manager และ script ที่มีจริงให้ ไม่ใส่มั่ว",
    ],
    examples: [
      {
        title: "ตั้ง pre-commit hook ให้โปรเจกต์",
        prompt: "ช่วยตั้ง pre-commit hook ให้โปรเจกต์นี้",
        result: `ตรวจเจอ \`package-lock.json\` → ใช้ npm ติดตั้ง devDependencies แล้ว init Husky:

\`\`\`bash
npm i -D husky lint-staged prettier
npx husky init
\`\`\`

สร้าง \`.husky/pre-commit\` (Husky v9+ ไม่ต้องมี shebang):

\`\`\`
npx lint-staged
npm run typecheck
npm run test
\`\`\`

repo นี้ยังไม่มี script \`typecheck\` — ผมจะตัดบรรทัดนั้นออกและบอกคุณ แทนที่จะใส่ค้างไว้ให้ commit พัง จากนั้นสร้าง \`.lintstagedrc\` และ commit เพื่อ smoke test ทันที`,
      },
    ],
    source: mpSource("skills/misc/setup-pre-commit/SKILL.md"),
  },
];

// ---------------------------------------------------------------------------
// Selectors
// ---------------------------------------------------------------------------

export function getAuthor(slug: string): Author | undefined {
  return authors.find((a) => a.slug === slug);
}

export function getSkill(slug: string): Skill | undefined {
  return skills.find((s) => s.slug === slug);
}

export function getSkillsByAuthor(authorSlug: string): Skill[] {
  return skills.filter((s) => s.authorSlug === authorSlug);
}

/** A skill joined with its author — convenient for cards and lists. */
export interface SkillWithAuthor extends Skill {
  author: Author;
}

export function withAuthor(skill: Skill): SkillWithAuthor {
  const author = getAuthor(skill.authorSlug);
  if (!author) {
    throw new Error(
      `Skill "${skill.slug}" references unknown author "${skill.authorSlug}"`,
    );
  }
  return { ...skill, author };
}

export const skillsWithAuthors: SkillWithAuthor[] = skills.map(withAuthor);

export const allCategories: Category[] = Array.from(
  new Set(skills.map((s) => s.category)),
).sort();

export const allTags: string[] = Array.from(
  new Set(skills.flatMap((s) => s.tags)),
).sort();

export const featuredSkills: SkillWithAuthor[] = skillsWithAuthors.filter(
  (s) => s.featured,
);
