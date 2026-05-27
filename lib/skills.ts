// ---------------------------------------------------------------------------
// Domain model for InvokeNotes. Terms here mirror CONTEXT.md exactly:
//   Skill, Author (+ kind), Source (+ install methods), Example, Category, Tag.
//
// Content is Thai-primary (see docs/adr/0002): curated prose is Thai, while
// skill names, Category values, Tags and code stay English.
//
// The detail page is fully curated and links out to the source — the raw
// SKILL.md is NOT rendered (see docs/adr/0003, which supersedes 0001).
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
  /** Thai one-liner, outcome-focused. */
  tagline: string;
  authorSlug: string;
  category: Category;
  tags: string[];
  /** Curated Thai explanation of what the skill is (2-3 plain sentences). */
  summary: string;
  /** Concrete things the skill does for you — plain Thai. */
  capabilities: string[];
  /** Situations in which you'd reach for it. */
  whenToUse: string[];
  /** The value you gain. */
  benefits: string[];
  /** Plain-language step sequence of how it operates. */
  howItWorks: string[];
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
  {
    slug: "andrej-karpathy",
    name: "Andrej Karpathy",
    kind: "community",
    title: "อดีตหัวหน้า AI ที่ Tesla · หนึ่งในทีมก่อตั้ง OpenAI · ครูสอน deep learning",
    bio: "นักวิจัยและนักสอน AI ชื่อดัง อดีตผู้อำนวยการฝ่าย AI ที่ Tesla และเป็นหนึ่งในทีมก่อตั้ง OpenAI เจ้าของคอร์ส deep learning ยอดนิยม (เช่น CS231n และ Neural Networks: Zero to Hero) มักแชร์ข้อสังเกตเรื่องจุดพลาดที่พบบ่อยเวลาใช้ LLM เขียนโค้ด ซึ่งชุดสกิลนี้ถอดออกมาเป็นกฎปฏิบัติสำหรับ agent",
    links: {
      github: "https://github.com/karpathy",
      website: "https://karpathy.ai",
      twitter: "https://twitter.com/karpathy",
    },
  },
  {
    slug: "nextlevelbuilder",
    name: "NextLevelBuilder",
    kind: "community",
    title: "ทีมทำเครื่องมือ AI สำหรับนักพัฒนา · ผู้สร้าง UI UX Pro Max",
    bio: "ทีม/องค์กรที่ทำเครื่องมือและสกิลสาย AI coding หลายตัว (UI UX Pro Max, ClaudeKit, GoClaw ฯลฯ) เน้นยกระดับงานออกแบบ UI/UX และ workflow ของนักพัฒนา — สกิล UI UX Pro Max รวมฐานข้อมูลสไตล์ พาเลตต์สี ฟอนต์ และกฎ UX ไว้ให้ agent ใช้ตัดสินใจดีไซน์",
    links: {
      github: "https://github.com/nextlevelbuilder",
      website: "https://nextlevelbuilder.io",
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
// Source helper for the Karpathy guideline. One upstream SKILL.md
// (karpathy-guidelines) maps to one Skill (see docs/adr/0005). The repo is
// owned by multica-ai, who adapted Karpathy's ideas; per docs/adr/0004 that
// adapter is disclosed only through this repo name.
// ---------------------------------------------------------------------------

function karpathySource(): Source {
  const repoPath = "skills/karpathy-guidelines/SKILL.md";
  return {
    repoName: "multica-ai/andrej-karpathy-skills",
    repoUrl: "https://github.com/multica-ai/andrej-karpathy-skills",
    fileUrl: `https://github.com/multica-ai/andrej-karpathy-skills/blob/main/${repoPath}`,
    path: repoPath,
    installMethods: [
      {
        label: "Claude Code plugin",
        command: "/plugin install andrej-karpathy-skills@karpathy-skills",
        note: "ติดตั้งสกิล karpathy-guidelines ครบทั้งไฟล์ (รวมกฎทั้ง 4 ข้อในสกิลเดียว)",
      },
      {
        label: "CLAUDE.md",
        command:
          "curl -o CLAUDE.md https://raw.githubusercontent.com/multica-ai/andrej-karpathy-skills/main/CLAUDE.md",
        note: "ดาวน์โหลด CLAUDE.md ไปวางที่ root ของโปรเจกต์",
      },
      {
        label: "Cursor rules",
        command: "cp .cursor/rules/karpathy-guidelines.mdc <repo>/.cursor/rules/",
        note: "ใช้ไฟล์ .cursor/rules ที่ repo เตรียมไว้ สำหรับ Cursor",
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
    tagline:
      "เขียนฟีเจอร์หรือแก้บั๊กแบบเทสต์นำ — เขียนเทสต์ให้พังก่อน แล้วค่อยเขียนโค้ดให้ผ่านทีละขั้น",
    authorSlug: "matt-pocock",
    category: "Coding",
    tags: ["testing", "red-green-refactor", "tdd", "workflow", "quality"],
    featured: true,
    summary:
      "วิธีทำงานแบบ 'เทสต์นำโค้ด' ที่บังคับให้เขียนเทสต์ทีละตัวสลับกับโค้ดจริง แทนการเขียนเทสต์รวดเดียวแล้วค่อยโค้ด เทสต์ที่ได้จะตรวจ 'พฤติกรรม' ผ่านหน้าบ้านจริง ไม่ผูกกับโครงสร้างภายใน เลยไม่พังเวลา refactor และอ่านได้เหมือนสเปกของระบบ",
    capabilities: [
      "พาเขียนเทสต์–โค้ด–รีแฟคเตอร์ ทีละรอบ (red → green → refactor)",
      "แปลงบั๊กที่เจอให้กลายเป็นเทสต์ที่ reproduce ได้ก่อนลงมือแก้",
      "ช่วยเลือกพฤติกรรมสำคัญมาทดสอบ แทนที่จะทดสอบทุกอย่างจนเฝือ",
      "เตือนเมื่อเทสต์ไปผูกกับ implementation (สัญญาณว่าจะพังตอน refactor)",
    ],
    whenToUse: [
      "สร้างฟีเจอร์ใหม่โดยให้เทสต์เป็นตัวกำหนดสเปก",
      "แก้บั๊ก โดยเขียนเทสต์ที่ reproduce บั๊กก่อน",
      "งานที่ regression มีราคาแพง อยากได้ตาข่ายกันพลาด",
    ],
    benefits: [
      "ทุกบรรทัดของโค้ดมีเทสต์รองรับ",
      "เทสต์รอดจากการ refactor เพราะตรวจพฤติกรรม ไม่ใช่โครงสร้างภายใน",
      "ได้สเปกที่อ่านรู้เรื่องเป็นผลพลอยได้",
    ],
    howItWorks: [
      "ตกลงกันก่อนว่าจะทดสอบพฤติกรรมไหนบ้าง เรียงตามความสำคัญ",
      "เขียนเทสต์ 1 ตัวให้ fail ด้วยเหตุผลที่ถูกต้อง (RED)",
      "เขียนโค้ดน้อยที่สุดให้เทสต์ผ่าน (GREEN)",
      "รีแฟคเตอร์เฉพาะตอนเขียวแล้ว แล้ววนทำตัวถัดไป",
    ],
    examples: [
      {
        title: "เพิ่มฟังก์ชัน checkout",
        prompt: "ช่วยเพิ่มฟังก์ชัน checkout ที่ปฏิเสธตะกร้าว่างด้วย TDD",
        result: `เริ่มด้วย tracer bullet — เขียนเทสต์เดียวก่อน (RED):

\`\`\`ts
test("rejects checkout with an empty cart", () => {
  expect(() => checkout({ items: [] })).toThrow("Cart is empty");
});
\`\`\`

รันแล้ว ❌ fail เพราะยังไม่มี \`checkout\` — fail ด้วยเหตุผลที่ถูกต้อง

GREEN: เขียนโค้ดน้อยที่สุดให้ผ่าน แล้วค่อยวนเขียนเทสต์ตัวถัดไป (เช่น คิดยอดรวม) ทีละรอบ — ไม่เขียนเทสต์รวดเดียวทั้งหมด`,
      },
      {
        title: "แก้บั๊กแบบ TDD",
        prompt: "slugify('  a  b  ') คืน 'a--b' มี dash ซ้ำ ช่วยแก้แบบ TDD",
        result: `ก่อนแก้ จับบั๊กเป็นเทสต์ที่ fail ก่อน (RED):

\`\`\`ts
test("collapses repeated separators", () => {
  expect(slugify("  a  b  ")).toBe("a-b");
});
\`\`\`

❌ \`Expected "a-b", received "a--b"\` — ดี, fail ตรงบั๊ก

GREEN: ยุบช่องว่างที่ติดกันก่อนแทนที่ด้วย dash → ✅ ผ่าน เทสต์นี้กลายเป็น regression test กันบั๊กเดิมกลับมา`,
      },
    ],
    source: mpSource("skills/engineering/tdd/SKILL.md"),
  },
  {
    slug: "diagnose",
    name: "diagnose",
    tagline:
      "ไล่บั๊กยากอย่างมีระบบ — สร้างสัญญาณ pass/fail ที่เชื่อถือได้ก่อน แล้วที่เหลือจะตามมาเอง",
    authorSlug: "matt-pocock",
    category: "Coding",
    tags: ["debugging", "performance", "feedback-loop", "regression", "workflow"],
    featured: true,
    summary:
      "วิธีดีบักบั๊กยากแบบมีวินัย หัวใจคือสร้าง 'feedback loop' ที่เร็วและรันเองได้ ให้บอก pass/fail ของบั๊กได้ชัดเจน พอมีสัญญาณนี้แล้ว การหาสาเหตุ (ตัดทีละส่วน, ทดสอบสมมติฐาน) ก็แค่บริโภคสัญญาณนั้น ถ้าไม่มี loop ต่อให้จ้องโค้ดยังไงก็ไม่เจอ",
    capabilities: [
      "ช่วยสร้าง feedback loop ที่ reproduce บั๊กได้ (เทสต์ / สคริปต์ / ยิง request ซ้ำ)",
      "ดันบั๊กที่เกิดเป็นพักๆ ให้เกิดบ่อยขึ้นจนดีบักได้",
      "ตั้งสมมติฐาน 3–5 ข้อที่พิสูจน์ผิดได้ แล้วทดสอบทีละตัว",
      "จบด้วย regression test + สรุปว่าจะกันบั๊กแบบนี้ในอนาคตยังไง",
    ],
    whenToUse: [
      "บั๊กยากที่จ้องโค้ดเฉยๆ แล้วหาไม่เจอ",
      "บั๊กที่เกิดเป็นพักๆ (non-deterministic)",
      "performance regression ที่ต้องวัดก่อนแก้",
    ],
    benefits: [
      "เปลี่ยน 'เดา' เป็น 'วัด' ด้วย feedback loop ที่เชื่อถือได้",
      "ตั้งหลายสมมติฐานพร้อมกัน กันการ anchor กับไอเดียแรก",
      "จบด้วย regression test ที่ผูกบั๊กไว้ถาวร",
    ],
    howItWorks: [
      "สร้าง feedback loop ที่ให้สัญญาณบั๊กชัดและเร็ว",
      "รัน loop จน reproduce บั๊กได้จริง",
      "ตั้งสมมติฐานหลายข้อ เรียงตามความน่าจะเป็น",
      "ใส่ probe ทีละตัวเพื่อชี้สาเหตุ แล้วแก้ + เขียน regression test",
    ],
    examples: [
      {
        title: "หน้า checkout เก็บเงินซ้ำเป็นบางครั้ง",
        prompt: "หน้า checkout เก็บเงินซ้ำเป็นบางครั้ง ช่วย diagnose ที",
        result: `บั๊กเป็นพักๆ — เป้าหมายยังไม่ใช่ repro สะอาด แต่คือ **ยกอัตราการเกิดให้สูงพอจะดีบักได้** ผมจะยิง \`checkout()\` ด้วย fixture เดิมซ้ำ 200 รอบแบบ parallel แล้วนับครั้งที่ \`charge\` ถูกเรียก > 1:

\`\`\`bash
node scripts/stress-checkout.mjs --runs 200 --parallel 8
# → double-charged: 11 / 200  (5.5%)
\`\`\`

5.5% ดีบักได้ ตั้งสมมติฐาน เช่น "retry ยิงซ้ำเมื่อ charge สำเร็จแต่ timeout" → ถ้าใช่ ปิด retry แล้วอัตราจะเป็น 0 ขอเทสต์ข้อนี้ก่อน`,
      },
      {
        title: "API ช้าลงหลัง deploy",
        prompt: "หลัง deploy เมื่อวาน endpoint /search ช้าขึ้น ~3 เท่า ช่วยหาสาเหตุ",
        result: `Perf regression — logs มักไม่ช่วย ต้อง **วัดก่อน** ตั้ง baseline ด้วย timing harness แล้ว bisect:

\`\`\`bash
# วัดเวอร์ชันก่อน-หลัง deploy ด้วย input เดียวกัน
hyperfine 'curl -s localhost:3000/search?q=test'
# before: 80ms   after: 240ms
\`\`\`

จากนั้น bisect ระหว่าง 2 commit ของ deploy ทีละขั้น เพื่อชี้ commit ที่ทำให้ช้า แล้วค่อยดูว่าเป็น query plan เปลี่ยน หรือ N+1 — วัดทุกขั้น ไม่เดา`,
      },
    ],
    source: mpSource("skills/engineering/diagnose/SKILL.md"),
  },
  {
    slug: "prototype",
    name: "prototype",
    tagline:
      "สร้างของต้นแบบใช้แล้วทิ้งเพื่อตอบคำถามดีไซน์ ก่อนลงแรงเขียนของจริง",
    authorSlug: "matt-pocock",
    category: "Coding",
    tags: ["prototyping", "design", "throwaway", "ui", "state"],
    summary:
      "ต้นแบบคือโค้ดใช้แล้วทิ้งที่มีไว้ตอบ 'คำถามเดียว' สกิลนี้เลือกสองทางให้: อยากรู้ว่า logic/สถานะถูกไหม → ทำ terminal app เล็กๆ ที่กดเล่นได้; อยากรู้ว่าหน้าตาควรเป็นยังไง → ทำ UI หลายแบบสลับดูในหน้าเดียว เน้นเร็ว ไม่ persist เสร็จแล้วเก็บแค่คำตอบ ตัวโค้ดทิ้ง",
    capabilities: [
      "ทำ terminal app เล็กๆ เพื่อลองเล่น state machine / business logic",
      "สร้าง UI หลายแบบสุดขั้วในหน้าเดียว สลับเทียบกันได้",
      "โชว์ state ทุกครั้งที่กด เพื่อเห็นว่าอะไรเปลี่ยน",
      "สรุป 'คำตอบ' เก็บไว้ (NOTES/ADR) แล้วลบต้นแบบทิ้ง",
    ],
    whenToUse: [
      "อยากลองว่า data model / state machine เวิร์กไหมก่อนผูกมัด",
      "อยาก mock up UI หลายแบบเทียบกันเร็วๆ",
      "สำรวจทางเลือกดีไซน์ ('ขอลองเล่นดูก่อน')",
    ],
    benefits: [
      "ตอบคำถามดีไซน์ด้วยของจริงที่จับต้องได้ ไม่ใช่เดาบนกระดาษ",
      "แยกชัดว่าเป็นโค้ดทิ้ง ไม่ปนกับ production",
      "เก็บเฉพาะ 'คำตอบ' ไว้ แล้วทิ้งตัวต้นแบบ",
    ],
    howItWorks: [
      "ระบุคำถามที่ต้องการตอบ (logic หรือ หน้าตา)",
      "เลือกสาขา: terminal app (logic) หรือ UI variations (หน้าตา)",
      "สร้างแบบเร็วๆ รันได้ด้วยคำสั่งเดียว ไม่ persist ไม่ขัดเงา",
      "ได้คำตอบแล้วจดไว้ แล้วลบหรือกลืนเข้าโค้ดจริง",
    ],
    examples: [
      {
        title: "ลอง state machine ของ flow สมัครสมาชิก",
        prompt: "อยากลองว่า state machine ของ flow สมัครสมาชิกออกแบบโอเคไหม",
        result: `คำถามคือ "logic ถูกไหม" → ไปสาขา terminal app เล็กๆ ที่กดเล่นได้ ทุกครั้งที่สั่ง action จะ print state เต็มๆ:

\`\`\`
state: AWAITING_EMAIL
> submitEmail("x@y.com")
state: AWAITING_OTP   (otpSentAt=…)
> submitOtp("000000")  ✗ wrong
state: AWAITING_OTP   (attempts=1)
\`\`\`

เล่นจนเจอเคสที่ออกแบบพลาด (เช่น OTP หมดอายุระหว่างพิมพ์) แล้วจดคำตอบลง NOTES.md ก่อนลบต้นแบบ`,
      },
      {
        title: "เทียบ layout การ์ด 3 แบบ",
        prompt: "อยากเทียบ layout การ์ดสินค้า 3 แบบว่าอันไหนดีสุด",
        result: `คำถามคือ "หน้าตาควรเป็นยังไง" → ไปสาขา UI variations: สร้าง 3 แบบในหน้าเดียว สลับด้วย search param + แถบลอยล่างจอ

\`\`\`
/prototype/cards?variant=grid     ← การ์ดใหญ่ รูปเด่น
/prototype/cards?variant=compact  ← แถวแน่น ข้อมูลครบ
/prototype/cards?variant=list     ← แนวยาว สแกนเร็ว
\`\`\`

กดสลับเทียบกันเร็วๆ เลือกได้แล้วค่อยกลืนแบบที่ชนะเข้าโค้ดจริง ที่เหลือทิ้ง`,
      },
    ],
    source: mpSource("skills/engineering/prototype/SKILL.md"),
  },
  {
    slug: "grill-with-docs",
    name: "grill-with-docs",
    tagline:
      "ถูกซักทีละคำถามจนแผนรัดกุม พร้อมจดศัพท์และการตัดสินใจสำคัญเป็นเอกสารให้ไปในตัว",
    authorSlug: "matt-pocock",
    category: "Research",
    tags: ["planning", "documentation", "adr", "domain-modeling", "ddd"],
    featured: true,
    summary:
      "เซสชันที่ AI ตั้งคำถามไล่บี้แผนของคุณทีละข้อ (พร้อมเสนอคำตอบที่แนะนำ) เพื่อปิดช่องโหว่ก่อนเขียนโค้ด ระหว่างคุยมันจะจดศัพท์ที่ตกลงกันลงไฟล์รวมนิยาม (glossary) และบันทึกเหตุผลของการตัดสินใจที่ย้อนยากเป็นเอกสาร (ADR) ให้อัตโนมัติ — เป็นสกิลตัวเดียวกับที่ใช้ออกแบบเว็บ InvokeNotes นี้",
    capabilities: [
      "ตั้งคำถามไล่ทีละข้อจนแผนไม่มีจุดคลุมเครือ (พร้อมคำตอบที่แนะนำ)",
      "ช่วยให้คำศัพท์ในทีมตรงกัน — ถ้าใช้คำกำกวมหรือขัดกับนิยามเดิมจะทักทันที",
      "จดนิยามศัพท์ลงไฟล์ glossary (CONTEXT.md) สดๆ ระหว่างคุย",
      "บันทึกการตัดสินใจที่ย้อนยากเป็น ADR ให้ เฉพาะตอนที่คุ้มจริง",
    ],
    whenToUse: [
      "ก่อนเริ่มฟีเจอร์/ดีไซน์ใหญ่ อยากให้แผนรัดกุมก่อนลงมือ",
      "อยากให้ทีมเรียกสิ่งเดียวกันด้วยคำเดียวกัน",
      "อยากได้เอกสารการตัดสินใจโดยไม่ต้องมานั่งเขียนทีหลัง",
    ],
    benefits: [
      "จับช่องโหว่ของแผนก่อนเขียนโค้ดจริง",
      "glossary และ ADR ถูกอัปเดตสดระหว่างคุย ไม่ค้างไว้ทีหลัง",
      "เสนอ ADR เฉพาะตอนที่คุ้มจริง (ย้อนยาก + เซอร์ไพรส์ + เป็น trade-off)",
    ],
    howItWorks: [
      "สำรวจโค้ดและเอกสารเดิมก่อน เพื่อไม่ถามสิ่งที่หาเองได้",
      "ถามทีละคำถาม พร้อมคำตอบที่แนะนำ รอคำตอบแล้วค่อยไปข้อถัดไป",
      "พอตกลงศัพท์ได้ อัปเดตไฟล์ glossary ทันที",
      "เจอการตัดสินใจที่ย้อนยาก → เสนอเขียน ADR",
    ],
    examples: [
      {
        title: "grill ฟีเจอร์ comment",
        prompt: "อยากเพิ่มฟีเจอร์ comment ในเว็บ ช่วย grill หน่อย",
        result: `ก่อนถาม ผมจะสำรวจโค้ด + glossary ก่อน เพื่อไม่ถามสิ่งที่หาเองได้ จากนั้นถามทีละข้อ

**คำถามแรก** — comment ผูกกับอะไร?

> glossary ปัจจุบันมี **Skill** และ **Author** แต่ยังไม่มี comment — comment เกาะที่ **Skill** (คุยใต้แต่ละสกิล) หรือเกาะที่ **Author**?
>
> *แนะนำ:* เกาะที่ Skill — ตรงกับพฤติกรรม "อ่านสกิลแล้วอยากถาม/เสริม"

พอคุณตอบ ผมจะอัปเดต glossary ทันที แล้วไล่กิ่งถัดไป (เก็บแบบ nested ไหม, ใครลบได้)`,
      },
      {
        title: "grill การเปลี่ยนไปใช้ DB จริง",
        prompt: "อยากเปลี่ยนจาก mock data เป็น database จริง ช่วย grill",
        result: `**คำถามแรก** — เลือก database แบบไหน?

> ตอนนี้ข้อมูลเป็น array ใน \`lib/skills.ts\` (อ่านอย่างเดียว, ไม่มี relation ซับซ้อน) — จะไป **Postgres** (relational, เผื่อโตเป็น comment/rating) หรือ **SQLite/ไฟล์** (เบา, เหมาะ catalog อ่านมาก)?
>
> *แนะนำ:* Postgres ถ้าวางแผนมี user-generated content; SQLite ถ้ายังเป็น catalog อ่านอย่างเดียว

อันนี้เป็นการตัดสินใจที่**ย้อนยาก** (lock-in) — ถ้าตกลงได้ ผมจะเสนอเขียนเป็น **ADR** ทันที`,
      },
    ],
    source: mpSource("skills/engineering/grill-with-docs/SKILL.md"),
  },
  {
    slug: "handoff",
    name: "handoff",
    tagline:
      "สรุปบทสนทนาตอนนี้เป็นเอกสารส่งต่อ ให้ session หรือคนใหม่ทำงานต่อได้ทันที",
    authorSlug: "matt-pocock",
    category: "Productivity",
    tags: ["context", "handoff", "summary", "workflow"],
    summary:
      "เวลาคุยกับ AI มายาวจน context ใกล้เต็ม สกิลนี้บีบทุกอย่างเป็นเอกสารส่งต่อสั้นๆ ให้ session ใหม่อ่านแล้วสานต่อได้เลย เซฟไว้ที่โฟลเดอร์ temp ของเครื่อง ไม่ทำซ้ำสิ่งที่มีในเอกสารอื่นอยู่แล้ว และตัดข้อมูลอ่อนไหวออกให้",
    capabilities: [
      "สรุปสถานะงาน + สิ่งที่ทำไปแล้ว / ที่ยังเหลือ เป็นเอกสารเดียว",
      "อ้างอิงเอกสารเดิม (PRD / ADR / commit) ด้วย path แทนการก๊อปซ้ำ",
      "แนะนำ skill ที่ session ใหม่ควรหยิบมาใช้ต่อ",
      "ตัดข้อมูลอ่อนไหว (key / password / PII) ออกให้",
    ],
    whenToUse: [
      "context ใกล้เต็ม อยากส่งงานต่อให้เซสชันใหม่",
      "เปลี่ยนคน / เปลี่ยน agent มาทำงานต่อ",
      "อยากสรุปสถานะงานแบบหยิบไปทำต่อได้เลย",
    ],
    benefits: [
      "agent ใหม่สานต่อได้โดยไม่ต้องไล่อ่านทั้งบทสนทนา",
      "ไม่ทำซ้ำเอกสารที่มีอยู่ — อ้างอิง path/URL แทน",
      "ปลอดภัย — ตัด secret ออกก่อนส่งต่อ",
    ],
    howItWorks: [
      "ไล่อ่านสิ่งที่คุยกันมา สรุปสถานะปัจจุบัน",
      "เขียนเอกสารส่งต่อ เซฟที่ temp dir ของ OS (ไม่ปนใน workspace)",
      "ใส่ส่วน suggested skills + redact ข้อมูลอ่อนไหว",
    ],
    examples: [
      {
        title: "ส่งต่องาน deploy ให้เซสชันหน้า",
        prompt: "ช่วยทำ handoff ให้เซสชันหน้ามาทำเรื่อง deploy ต่อ",
        result: `เขียน handoff doc เซฟที่ temp dir ของ OS (ไม่ปนใน workspace):

\`\`\`
/tmp/handoff-deploy-2026-05-27.md
\`\`\`

โครงเอกสาร: **สถานะ** (Dockerfile.dev + compose เสร็จ, hot reload ผ่าน) · **เหลือทำ** (production Dockerfile) · **อ้างอิง** (\`docker-compose.yml\`, commit ล่าสุด — ไม่ก๊อปซ้ำ) · **Suggested skills** (\`/setup-pre-commit\`) · redact: ไม่มี secret`,
      },
      {
        title: "เปลี่ยนคนมาทำ refactor ต่อ",
        prompt: "เพื่อนจะมาทำ refactor auth ต่อ ช่วยทำ handoff ให้หน่อย",
        result: `handoff doc ที่โฟกัสงาน refactor auth:

- **ทำไปแล้ว:** แยก \`AuthService\` ออกจาก controller, เทสต์เขียว 12/12
- **กำลังทำ:** ย้าย session store จาก in-memory → Redis (ค้างที่ token refresh)
- **อ้างอิง:** ADR เรื่อง auth (path), PR #42 (diff)
- **ระวัง:** อย่าแตะ \`legacy-login.ts\` — มี ticket แยก
- **Suggested skills:** \`/tdd\` ตอนเขียน Redis adapter`,
      },
    ],
    source: mpSource("skills/productivity/handoff/SKILL.md"),
  },
  {
    slug: "write-a-skill",
    name: "write-a-skill",
    tagline:
      "สร้าง agent skill ใหม่ให้โครงดี อธิบาย trigger ชัด และแยกไฟล์/สคริปต์เมื่อจำเป็น",
    authorSlug: "matt-pocock",
    category: "Productivity",
    tags: ["skills", "authoring", "meta", "documentation"],
    summary:
      "พาเขียนไฟล์ SKILL.md ใหม่ทีละขั้น ตั้งแต่ถามว่าจะทำอะไร ไปจนรีวิว จุดสำคัญคือ 'description' เป็นสิ่งเดียวที่ AI เห็นตอนเลือกหยิบสกิล จึงต้องบอกชัดว่าทำอะไร และให้หยิบใช้เมื่อไหร่",
    capabilities: [
      "ถาม requirement แล้วร่าง SKILL.md ให้ตามโครงมาตรฐาน",
      "เขียน description ที่มี trigger ('Use when…') ให้ AI เลือกถูก",
      "แนะนำว่าควรแยกไฟล์ หรือใส่ script ตอนไหน",
      "มี checklist ให้รีวิวก่อนนำไปใช้จริง",
    ],
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
    howItWorks: [
      "ถามว่าสกิลครอบคลุมงานอะไร ใช้เคสไหน ต้องมีสคริปต์ไหม",
      "ร่าง SKILL.md (เนื้อกระชับ) + description ที่ระบุ trigger",
      "เสนอแยกไฟล์ / ใส่ script เมื่อเนื้อยาวหรือเป็นงาน deterministic",
      "รีวิวตาม checklist แล้วส่งมอบ",
    ],
    examples: [
      {
        title: "เขียน skill สร้าง changelog",
        prompt: "อยากเขียน skill สำหรับสร้าง changelog จาก git log",
        result: `เริ่มจากถาม requirement สั้นๆ แล้วร่าง description — สิ่งเดียวที่ AI เห็นตอนเลือก:

\`\`\`md
---
name: changelog
description: Generate a grouped changelog from git history between two refs. Use when the user wants a changelog, release notes, or asks "what changed since <tag>".
---
\`\`\`

ประโยคที่สอง "Use when…" คือ trigger ที่ทำให้ AI หยิบถูก จากนั้นเสนอใส่ script \`scripts/changelog.mjs\` เพราะการ parse git log เป็น deterministic`,
      },
      {
        title: "เขียน skill รีวิว PR",
        prompt: "อยากได้ skill ที่ช่วยรีวิว pull request",
        result: `ถามก่อน: รีวิวเชิงอะไร (bug / style / security)? ผูกกับ GitHub ไหม? แล้วร่าง description ที่ trigger ชัด:

\`\`\`md
---
name: review-pr
description: Review a pull request for correctness bugs and risky changes. Use when the user asks to review a PR, a diff, or says "review this".
---
\`\`\`

เนื้อหายาวกว่า 100 บรรทัด → เสนอแยกเป็น \`CHECKLIST.md\` (สิ่งที่ต้องดู) กับ \`SKILL.md\` (ขั้นตอนหลัก) ตามหลัก progressive disclosure`,
      },
    ],
    source: mpSource("skills/productivity/write-a-skill/SKILL.md"),
  },
  {
    slug: "edit-article",
    name: "edit-article",
    tagline:
      "ปรับบทความให้อ่านลื่น จัดลำดับหัวข้อตาม 'อะไรต้องรู้ก่อน' แล้วรีไรต์ทีละส่วนให้กระชับ",
    authorSlug: "matt-pocock",
    category: "Writing",
    tags: ["writing", "editing", "clarity", "structure"],
    summary:
      "แก้บทความอย่างมีหลักการ: แบ่งเป็นหัวข้อ มองว่าข้อมูลพึ่งพากันเป็นลำดับ (อะไรต้องเข้าใจก่อน) จัดเรียงใหม่ให้ถูกลำดับ ยืนยันโครงกับคุณก่อน แล้วค่อยรีไรต์ทีละส่วนให้ชัดและกระชับ",
    capabilities: [
      "แบ่งบทความเป็นหัวข้อและสรุปแก่นของแต่ละส่วน",
      "จัดลำดับหัวข้อใหม่ให้เคารพการพึ่งพาของเนื้อหา",
      "รีไรต์ทีละส่วนให้ชัด คุมย่อหน้าไม่เกิน 240 ตัวอักษร",
      "ยืนยันโครงกับคุณก่อนลงมือเขียน",
    ],
    whenToUse: [
      "มี draft บทความที่อยากให้อ่านลื่นและกระชับขึ้น",
      "ลำดับการนำเสนอสับสน เนื้อหาพึ่งพากันผิดลำดับ",
      "อยากรีไรต์ทีละส่วนอย่างมีโครง",
    ],
    benefits: [
      "ลำดับเนื้อหาเคารพการพึ่งพา ผู้อ่านไม่งง",
      "ย่อหน้ากระชับ (≤ 240 ตัวอักษร) อ่านง่าย",
      "ยืนยันโครงก่อน ไม่รื้อทิ้งทีหลัง",
    ],
    howItWorks: [
      "แบ่งบทความตามหัวข้อ ดึงแก่นของแต่ละส่วน",
      "เรียงลำดับใหม่ตามว่าอะไรต้องรู้ก่อน",
      "ยืนยันโครงกับคุณ",
      "รีไรต์ทีละส่วน คุมความยาวย่อหน้า",
    ],
    examples: [
      {
        title: "ปรับบทความ 'เริ่มต้นกับ Docker'",
        prompt: "ช่วยปรับบทความ 'เริ่มต้นกับ Docker' ให้อ่านลื่นขึ้น",
        result: `แบ่งตามหัวข้อแล้วมองเป็นลำดับการพึ่งพา — เรียงสิ่งที่ต้องรู้ก่อนมาก่อน:

1. Image คืออะไร
2. Container คืออะไร (ต้องรู้ 1 ก่อน)
3. \`docker run\`
4. Volume & hot reload

บทความเดิมเอา "volume" ไว้ก่อน "container" ที่ผู้อ่านยังไม่รู้จัก — สลับลำดับ ขอยืนยันโครงนี้ก่อน แล้วผมจะรีไรต์ทีละส่วน คุมย่อหน้าไม่เกิน 240 ตัวอักษร`,
      },
      {
        title: "กระชับ blog ยาวเกิน",
        prompt: "blog 'ทำไมต้อง TypeScript' ยาวและวกวน ช่วยปรับให้กระชับ",
        result: `แบ่งหัวข้อแล้วพบว่ามี 2 ส่วนพูดเรื่อง type safety ซ้ำกัน และตัวอย่างโค้ดมาก่อนนิยามที่มันพึ่งพา

จัดใหม่: ปัญหาที่เจอ → type safety คืออะไร → ตัวอย่าง → ผลในทีมจริง รวมส่วนซ้ำเป็นหนึ่ง ตัดย่อหน้าที่ยาวเกินให้ ≤ 240 ตัวอักษร ขอยืนยันโครงก่อนรีไรต์`,
      },
    ],
    source: mpSource("skills/personal/edit-article/SKILL.md"),
  },
  {
    slug: "setup-pre-commit",
    name: "setup-pre-commit",
    tagline:
      "ตั้ง pre-commit hook ให้ format / typecheck / test อัตโนมัติทุกครั้งที่ commit",
    authorSlug: "matt-pocock",
    category: "DevOps",
    tags: ["husky", "lint-staged", "prettier", "git-hooks", "ci"],
    summary:
      "ตั้งค่า Husky + lint-staged + Prettier ให้ครบในขั้นตอนเดียว เพื่อให้ทุกครั้งที่ commit โค้ดถูก format และตรวจ type/test อัตโนมัติ โดยปรับตาม package manager และ script ที่ repo มีจริง ไม่ใส่มั่ว",
    capabilities: [
      "ตรวจ package manager ที่ repo ใช้ (npm / pnpm / yarn / bun)",
      "ติดตั้งและตั้งค่า Husky + lint-staged + Prettier ให้",
      "สร้าง hook ที่รัน lint-staged → typecheck → test (ปรับตาม script จริง)",
      "commit ปิดท้ายเป็น smoke test ว่า hook ทำงานจริง",
    ],
    whenToUse: [
      "อยากเพิ่ม pre-commit hook ใน repo",
      "อยากให้ format/typecheck/test อัตโนมัติตอน commit",
      "เซ็ตอัป Husky + lint-staged ครั้งแรก",
    ],
    benefits: [
      "format อัตโนมัติทุก commit ด้วย Prettier",
      "กัน type error / test fail หลุดเข้า repo",
      "ปรับตาม package manager และ script ที่มีจริง ไม่ใส่มั่ว",
    ],
    howItWorks: [
      "ตรวจ lockfile เพื่อหา package manager",
      "ติดตั้ง devDependencies + npx husky init",
      "เขียน .husky/pre-commit + .lintstagedrc + .prettierrc (ถ้ายังไม่มี)",
      "commit เพื่อทดสอบว่า hook ทำงาน",
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

สร้าง \`.husky/pre-commit\` (Husky v9+ ไม่ต้องมี shebang) ที่รัน \`npx lint-staged\` → \`npm run typecheck\` → \`npm run test\` แล้ว commit เพื่อ smoke test ทันที`,
      },
      {
        title: "repo ไม่มี typecheck script",
        prompt: "repo นี้ไม่มี script typecheck ตั้ง hook ให้หน่อย",
        result: `ตรวจ package.json แล้วไม่เจอ script \`typecheck\` — ผมจะ **ตัดบรรทัดนั้นออก** จาก hook และบอกคุณ แทนที่จะใส่ค้างไว้ให้ commit พัง

\`\`\`
# .husky/pre-commit
npx lint-staged
npm run test
\`\`\`

(ข้าม typecheck ไว้ก่อน — เพิ่ม \`"typecheck": "tsc --noEmit"\` ใน package.json เมื่อไหร่ ค่อยเติมบรรทัดกลับ)`,
      },
    ],
    source: mpSource("skills/misc/setup-pre-commit/SKILL.md"),
  },
  {
    slug: "zoom-out",
    name: "zoom-out",
    tagline:
      "บอก agent ให้ถอยมามองภาพรวม — ขอแผนที่ของโมดูลและผู้เรียกใช้ ในโค้ดส่วนที่ไม่คุ้น",
    authorSlug: "matt-pocock",
    category: "Coding",
    tags: ["context", "code-navigation", "architecture", "understanding"],
    summary:
      "เวลาเจอโค้ดส่วนที่ไม่คุ้นแล้วงงว่ามันต่อกับอะไร สกิลนี้สั่งให้ agent ถอยขึ้นไปอีกชั้นของ abstraction แล้วร่าง 'แผนที่' ของโมดูลที่เกี่ยวข้องและใครเรียกใช้บ้าง โดยใช้คำศัพท์จาก glossary ของโปรเจกต์",
    capabilities: [
      "ถอยขึ้นอีกชั้น abstraction เพื่อให้เห็นภาพรวมแทนรายละเอียดบรรทัด",
      "ร่างแผนที่โมดูลที่เกี่ยวข้อง + ใครเรียกใช้ (callers)",
      "อธิบายด้วยคำศัพท์จาก glossary ของโปรเจกต์ ให้ตรงภาษาทีม",
    ],
    whenToUse: [
      "เพิ่งเข้าโค้ดส่วนที่ไม่คุ้น ไม่รู้ว่ามันต่อกับอะไร",
      "อยากเห็นว่าโมดูลนี้วางตัวยังไงในภาพใหญ่ก่อนลงไปแก้",
      "หลงอยู่ในรายละเอียด อยากได้มุมมองระดับสูง",
    ],
    benefits: [
      "เข้าใจบริบทเร็วก่อนลงมือแก้ ลดการแก้ผิดจุด",
      "เห็นความเชื่อมโยง/ผู้เรียกใช้ที่อาจกระทบ",
      "ใช้ภาษาเดียวกับทีม (glossary)",
    ],
    howItWorks: [
      "ระบุโค้ดส่วนที่ไม่คุ้น",
      "agent ถอยขึ้นอีกชั้นของ abstraction",
      "ร่างแผนที่โมดูล + callers ด้วยคำศัพท์ใน glossary",
    ],
    examples: [
      {
        title: "เข้าใจโมดูล payment ที่ไม่คุ้น",
        prompt: "ผมไม่รู้จักส่วน payment ในโปรเจกต์นี้เลย zoom out ให้หน่อย",
        result: `ถอยขึ้นมาหนึ่งชั้น — แผนที่ส่วน payment (ใช้คำจาก glossary):

\`\`\`
Checkout ──calls──▶ PaymentService ──▶ ChargeGateway (external)
                          │
                          └──▶ PaymentRepository (Postgres)
\`\`\`

ผู้เรียก \`PaymentService\`: \`CheckoutController\` และ \`RetryWorker\` (2 ที่) จุดต้องระวังถ้าจะแก้คือ \`RetryWorker\` เพราะเรียกซ้ำได้ อยากเจาะตรงไหนต่อบอกได้`,
      },
      {
        title: "หาภาพรวมฟีเจอร์ search",
        prompt: "search ทำงานยังไงในโปรเจกต์นี้ ขอภาพรวมก่อน",
        result: `\`\`\`
SearchPage (UI) ──▶ /api/search ──▶ SearchService
                                       ├──▶ QueryParser
                                       └──▶ SearchIndex (read-only)
\`\`\`

ตรงนี้ไม่มีการเขียนกลับ index (read-only) ถ้าจะแก้ ranking ดูที่ \`SearchService.rank()\` ซึ่งมีผู้เรียกเดียว ปลอดภัยที่จะแตะ`,
      },
    ],
    source: mpSource("skills/engineering/zoom-out/SKILL.md"),
  },
  {
    slug: "caveman",
    name: "caveman",
    tagline:
      "โหมดสื่อสารบีบอัด — ตัด filler ทิ้ง ลด token ~75% แต่เนื้อหาเทคนิคครบเป๊ะ",
    authorSlug: "matt-pocock",
    category: "Productivity",
    tags: ["communication", "tokens", "concise", "mode"],
    summary:
      "โหมดตอบแบบ 'มนุษย์ถ้ำฉลาด' — ตัดคำเชื่อม คำเกริ่น คำสุภาพออกหมด เหลือแต่เนื้อเทคนิคล้วนๆ ลด token ลงราว 75% เปิดแล้วติดทุกคำตอบจนกว่าจะสั่งปิด แต่จะกลับมาพูดเต็มชั่วคราวตอนเตือนเรื่องอันตรายหรือการกระทำที่ย้อนไม่ได้",
    capabilities: [
      "ตอบแบบบีบอัด ตัด article/filler/คำสุภาพ ลด token ~75%",
      "คงเนื้อเทคนิค โค้ด และข้อความ error ไว้เป๊ะ",
      "ติดทุกคำตอบจนกว่าจะสั่ง 'stop caveman'",
      "กลับมาพูดเต็มชั่วคราวตอนเตือนเรื่องอันตราย/ย้อนไม่ได้",
    ],
    whenToUse: [
      "อยากประหยัด token หรืออยากได้คำตอบกระชับ",
      "คุยงานเทคนิคเร็วๆ ไม่ต้องการคำเกริ่น",
      "พิมพ์ 'caveman mode' / 'be brief'",
    ],
    benefits: [
      "ลด token ลงมาก เร็วและถูกลง",
      "เนื้อเทคนิคไม่หาย แค่ตัดน้ำออก",
      "ปลอดภัย — เรื่องอันตรายยังอธิบายเต็ม",
    ],
    howItWorks: [
      "ผู้ใช้สั่งเปิดโหมด (เช่น 'caveman mode')",
      "ตัด filler/article/คำสุภาพ ใช้ลูกศรแทนเหตุผล (X -> Y)",
      "คงโค้ด/term/error ไว้เป๊ะ",
      "ปิดเมื่อสั่ง 'normal mode'",
    ],
    examples: [
      {
        title: "คำตอบสไตล์ caveman",
        prompt: "ทำไม React component re-render?",
        result: `> Inline obj prop -> new ref -> re-render. \`useMemo\`.

(ปกติจะเขียนยาว 3–4 ประโยค — caveman เหลือบรรทัดเดียว เนื้อครบ ลด token ไปมาก)`,
      },
      {
        title: "ข้อยกเว้นตอนคำสั่งอันตราย",
        prompt: "ช่วยลบตาราง users ที (ตอนอยู่ในโหมด caveman)",
        result: `**Warning:** คำสั่งนี้จะลบทุกแถวในตาราง \`users\` อย่างถาวร ย้อนกลับไม่ได้

\`\`\`sql
DROP TABLE users;
\`\`\`

Caveman resume. Verify backup exist first.

(เห็นไหมว่าตอนเตือนเรื่องย้อนไม่ได้ มันดรอปโหมด caveman ชั่วคราวเพื่อพูดให้ชัด)`,
      },
    ],
    source: mpSource("skills/productivity/caveman/SKILL.md"),
  },
  {
    slug: "grill-me",
    name: "grill-me",
    tagline:
      "ถูกสัมภาษณ์ไล่บี้แผนทีละข้อจนเข้าใจตรงกัน (เวอร์ชันเบาของ grill-with-docs ไม่ยุ่งเอกสาร)",
    authorSlug: "matt-pocock",
    category: "Research",
    tags: ["planning", "design", "interview", "decision-tree"],
    summary:
      "AI จะสัมภาษณ์คุณไล่บี้ทุกแง่ของแผน ไล่ทีละกิ่งของต้นไม้การตัดสินใจ ทีละคำถาม พร้อมเสนอคำตอบที่แนะนำ ต่างจาก grill-with-docs ตรงที่ไม่ไปยุ่ง/อัปเดตเอกสาร (glossary/ADR) — เน้นทำให้แผนคมขึ้นล้วนๆ",
    capabilities: [
      "ตั้งคำถามไล่บี้แผนทีละข้อจนไม่เหลือจุดคลุมเครือ",
      "ไล่ทุกกิ่งของต้นไม้การตัดสินใจ แก้ทีละ dependency",
      "เสนอคำตอบที่แนะนำในทุกคำถาม",
      "ถ้าหาคำตอบจากโค้ดได้ จะไปอ่านโค้ดเองแทนการถาม",
    ],
    whenToUse: [
      "อยาก stress-test แผน/ดีไซน์เร็วๆ โดยไม่ต้องแตะเอกสาร",
      "อยากให้คนช่วยจี้จุดอ่อนของไอเดีย",
      "พิมพ์ 'grill me'",
    ],
    benefits: [
      "เจอช่องโหว่ของแผนก่อนลงมือ",
      "เบากว่า grill-with-docs — ไม่มีภาระอัปเดตเอกสาร",
      "ได้คำตอบที่แนะนำช่วยตัดสินใจเร็ว",
    ],
    howItWorks: [
      "ระบุแผน/ดีไซน์ที่อยากให้ซัก",
      "ถามทีละคำถาม พร้อมคำตอบที่แนะนำ",
      "อะไรที่หาในโค้ดได้ ไปอ่านเองแทนถาม",
      "ไล่จนทุกกิ่งของการตัดสินใจถูกแก้",
    ],
    examples: [
      {
        title: "grill ดีไซน์ rate limit",
        prompt: "อยากใส่ rate limiting ใน API ช่วย grill me",
        result: `**คำถามแรก** — จะ limit ตามอะไร?

> ตาม IP, ตาม API key, หรือตาม user? แต่ละแบบกันคนละภัย (IP กัน abuse ทั่วไป, key กันลูกค้ารายเดียวยิงรัว)
>
> *แนะนำ:* ตาม API key ถ้ามี auth อยู่แล้ว — ยุติธรรมต่อผู้ใช้หลังเดียวกัน

ตอบแล้วไปข้อถัดไป (เก็บ counter ที่ไหน / เกินโควตาแล้วทำยังไง)`,
      },
      {
        title: "ต่างจาก grill-with-docs ยังไง",
        prompt: "grill-me ต่างจาก grill-with-docs ยังไง",
        result: `เหมือนกันตรงสัมภาษณ์ไล่บี้แผนทีละข้อ ต่างกันที่:

- **grill-me** — จบที่ความเข้าใจร่วม ไม่แตะไฟล์
- **grill-with-docs** — ระหว่างคุยจะอัปเดต glossary (CONTEXT.md) และเขียน ADR ให้ด้วย

เลือก grill-me เมื่ออยากคิดให้คมเร็วๆ เลือก grill-with-docs เมื่ออยากได้เอกสารติดมือ`,
      },
    ],
    source: mpSource("skills/productivity/grill-me/SKILL.md"),
  },
  {
    slug: "to-prd",
    name: "to-prd",
    tagline:
      "เปลี่ยนบทสนทนาตอนนี้ให้เป็น PRD แล้วเปิดเป็น issue — ไม่สัมภาษณ์ แค่สังเคราะห์จากที่คุยมา",
    authorSlug: "matt-pocock",
    category: "Productivity",
    tags: ["prd", "planning", "github", "spec"],
    summary:
      "หยิบบริบทที่คุยกันมาทั้งหมดมาสังเคราะห์เป็น PRD (problem, solution, user stories, decisions, testing, out-of-scope) โดยไม่สัมภาษณ์เพิ่ม แล้วเผยแพร่เข้า issue tracker พร้อม label ระหว่างนั้นจะมองหาโอกาสแยกเป็น deep module ที่เทสต์แยกได้",
    capabilities: [
      "สังเคราะห์บทสนทนา + ความเข้าใจโค้ดเป็น PRD เต็มรูป",
      "ร่าง user stories จำนวนมากครอบคลุมทุกแง่",
      "ระบุ implementation/testing decisions โดยไม่ผูกกับ file path",
      "เผยแพร่ PRD เข้า issue tracker พร้อม label",
    ],
    whenToUse: [
      "คุยจนตกผลึกแล้ว อยากได้ PRD โดยไม่ต้องตอบคำถามเพิ่ม",
      "อยากแปลงสิ่งที่ discuss เป็นเอกสารทางการ + issue",
      "ก่อนส่งงานให้ทีม/agent ลงมือ",
    ],
    benefits: [
      "ได้ PRD ทันทีจากบริบทที่มี ไม่ต้องเริ่มใหม่",
      "user stories ครอบคลุม ลดงานตกหล่น",
      "เข้า issue tracker พร้อมใช้",
    ],
    howItWorks: [
      "สำรวจ repo เข้าใจสถานะปัจจุบัน (ใช้ glossary + เคารพ ADR)",
      "ร่างโมดูลหลักที่ต้องสร้าง/แก้ มองหา deep module — เช็คกับผู้ใช้",
      "เขียน PRD ตาม template",
      "เผยแพร่เข้า issue tracker + ใส่ label",
    ],
    examples: [
      {
        title: "ทำ PRD จากที่คุยเรื่อง comment",
        prompt: "เราคุยเรื่องฟีเจอร์ comment กันมาพอแล้ว ช่วยทำ PRD",
        result: `สังเคราะห์จากที่คุยมา (ไม่ถามเพิ่ม) — ร่าง PRD:

**Problem** ผู้อ่านอยากแลกเปลี่ยนความเห็นใต้แต่ละ Skill
**Solution** comment ผูกกับ Skill, nested 1 ชั้น
**User stories**
1. ในฐานะผู้อ่าน ฉันอยากคอมเมนต์ใต้ Skill เพื่อถามผู้สร้าง
2. ...

ก่อนเผยแพร่ ขอเช็คโมดูลหลัก: \`CommentService\` (deep module, เทสต์แยกได้) — ตรงกับที่คิดไหม?`,
      },
      {
        title: "PRD เรื่องต่อ database จริง",
        prompt: "ทำ PRD เรื่องย้าย mock data ไป Postgres",
        result: `**Problem** ข้อมูลเป็น mock ใน \`lib/skills.ts\` แก้ทีต้อง deploy ใหม่
**Solution** ย้ายไป Postgres + repository layer
**Implementation decisions** \`SkillRepository\` (interface แคบ อ่าน/เขียน), schema: skills/authors/tags — ไม่ใส่ file path
**Out of scope** auth, comment

เผยแพร่เข้า issue tracker พร้อม label \`ready-for-agent\``,
      },
    ],
    source: mpSource("skills/engineering/to-prd/SKILL.md"),
  },
  {
    slug: "to-issues",
    name: "to-issues",
    tagline:
      "แตกแผน/PRD เป็น GitHub issues แบบ vertical slice ที่หยิบทำแยกกันได้",
    authorSlug: "matt-pocock",
    category: "Coding",
    tags: ["issues", "planning", "vertical-slice", "github", "breakdown"],
    summary:
      "แตกแผนเป็น issue ย่อยแบบ 'tracer bullet' — แต่ละอันเป็น vertical slice บางๆ ที่ตัดผ่านทุกชั้น (schema/API/UI/test) จบในตัว ไม่ใช่ horizontal slice ของชั้นเดียว แยกเป็น HITL (ต้องมีคนตัดสิน) กับ AFK (agent ทำเองจบ) แล้วเผยแพร่เข้า issue tracker ตามลำดับ dependency",
    capabilities: [
      "แตกแผน/PRD เป็น issue แบบ vertical slice ที่ demo ได้ในตัว",
      "ระบุ dependency (blocked by) และชนิด HITL/AFK ของแต่ละ slice",
      "ให้คุณรีวิว granularity/ลำดับก่อนสร้างจริง",
      "เผยแพร่ issue ตามลำดับ blocker ก่อน พร้อม label",
    ],
    whenToUse: [
      "มีแผน/PRD แล้ว อยากแตกเป็นตั๋วงานให้หยิบทำ",
      "อยากได้ slice ที่ทำแยกกันได้/มอบหมายได้",
      "เตรียมงานให้ AFK agent ลงมือ",
    ],
    benefits: [
      "งานถูกแบ่งเป็นชิ้นที่ทำเสร็จแล้ว demo ได้ทันที",
      "เห็น dependency ชัด ไม่ติดล็อกกันเอง",
      "รีวิวก่อนสร้างจริง ปรับ granularity ได้",
    ],
    howItWorks: [
      "รวบรวมบริบท / อ่าน issue อ้างอิงถ้ามี",
      "ร่าง vertical slice (tracer bullet) แต่ละอันตัดทุกชั้น",
      "โชว์เป็นลิสต์ให้ผู้ใช้รีวิว (title/type/blocked by) จนอนุมัติ",
      "เผยแพร่ issue ตามลำดับ blocker ก่อน + label",
    ],
    examples: [
      {
        title: "แตกฟีเจอร์ comment เป็น issues",
        prompt: "แตกฟีเจอร์ comment เป็น issues ให้หน่อย",
        result: `แตกเป็น vertical slice (แต่ละอันตัดทุกชั้น จบในตัว):

1. **แสดง comment แบบ read-only** (AFK) — schema + API GET + UI list + test · blocked by: ไม่มี
2. **โพสต์ comment** (AFK) — API POST + form + test · blocked by: 1
3. **ลบ comment ของตัวเอง** (AFK) · blocked by: 2
4. **เลือกนโยบาย moderation** (HITL — ต้องตัดสิน) · blocked by: ไม่มี

granularity โอเคไหม / ลำดับถูกไหม? อนุมัติแล้วผมเผยแพร่ตาม blocker ก่อน`,
      },
      {
        title: "ทำไม vertical ไม่ใช่ horizontal",
        prompt: "ทำไมแตกเป็น vertical slice ไม่ใช่แบ่งตาม layer",
        result: `horizontal = แบ่งตามชั้น (ทำ schema ทั้งหมด แล้วค่อย API ทั้งหมด) → ไม่มีอะไร demo ได้จนกว่าจะครบทุกชั้น และเสี่ยงทำเกินจำเป็น

vertical = แต่ละ issue ตัดผ่านทุกชั้นแต่แคบ ทำเสร็จแล้ว **ใช้งานจริงได้ทันที** ทีละนิด เห็นผลเร็ว ลดความเสี่ยง`,
      },
    ],
    source: mpSource("skills/engineering/to-issues/SKILL.md"),
  },
  {
    slug: "git-guardrails-claude-code",
    name: "git-guardrails-claude-code",
    tagline:
      "ตั้ง hook ใน Claude Code บล็อกคำสั่ง git อันตราย (push, reset --hard, clean...) ก่อนรัน",
    authorSlug: "matt-pocock",
    category: "DevOps",
    tags: ["git", "safety", "hooks", "claude-code", "guardrails"],
    summary:
      "ติดตั้ง PreToolUse hook ที่ดักและบล็อกคำสั่ง git อันตรายก่อน Claude จะรัน เช่น git push, reset --hard, clean -f, branch -D, checkout . เลือกได้ว่าติดเฉพาะโปรเจกต์หรือทุกโปรเจกต์ และปรับ pattern ที่บล็อกเพิ่ม/ลดได้",
    capabilities: [
      "ติดตั้ง PreToolUse hook ที่บล็อกคำสั่ง git อันตรายก่อนรัน",
      "เลือก scope: เฉพาะโปรเจกต์ (.claude/) หรือทุกโปรเจกต์ (~/.claude/)",
      "merge เข้า settings เดิมโดยไม่ทับของอื่น",
      "ปรับรายการ pattern ที่บล็อก + มีขั้นตอน verify ให้",
    ],
    whenToUse: [
      "กลัว agent เผลอรัน git push / reset --hard / clean",
      "อยากกันคำสั่ง git ทำลายล้างใน Claude Code",
      "ตั้ง git safety hook ครั้งแรก",
    ],
    benefits: [
      "กันอุบัติเหตุ git ที่ย้อนยาก (force push / reset --hard)",
      "ตั้งระดับโปรเจกต์หรือทั้งเครื่องก็ได้",
      "ปรับแต่ง pattern ที่บล็อกได้ตามต้องการ",
    ],
    howItWorks: [
      "ถาม scope: โปรเจกต์เดียว หรือทุกโปรเจกต์",
      "คัดลอกสคริปต์ hook ไป .claude/hooks/ แล้ว chmod +x",
      "เพิ่ม hook เข้า settings.json (merge ไม่ทับของเดิม)",
      "verify ด้วยการยิงคำสั่งทดสอบ ดูว่า exit 2 + BLOCKED",
    ],
    examples: [
      {
        title: "ติดตั้งกัน git push อันตราย",
        prompt: "ช่วยตั้ง guardrail บล็อก git push อันตรายใน Claude Code",
        result: `ถามก่อน: ติดเฉพาะโปรเจกต์นี้ (\`.claude/settings.json\`) หรือทุกโปรเจกต์ (\`~/.claude/settings.json\`)?

สมมติเลือกโปรเจกต์ — คัดสคริปต์ไป \`.claude/hooks/block-dangerous-git.sh\` + chmod +x แล้วเพิ่ม PreToolUse hook (matcher: Bash) เข้า settings (merge ไม่ทับของเดิม)

บล็อก: \`git push\`, \`reset --hard\`, \`clean -f\`, \`branch -D\`, \`checkout .\``,
      },
      {
        title: "ทดสอบว่า hook บล็อกจริง",
        prompt: "ตั้งเสร็จแล้วเช็คยังไงว่ามันบล็อกจริง",
        result: `ยิง payload ทดสอบเข้า hook ตรงๆ:

\`\`\`bash
echo '{"tool_input":{"command":"git push origin main"}}' | .claude/hooks/block-dangerous-git.sh
\`\`\`

ควรได้ exit code 2 + ข้อความ BLOCKED ที่ stderr — ถ้าเห็นแบบนั้น = ใช้งานได้`,
      },
    ],
    source: mpSource("skills/misc/git-guardrails-claude-code/SKILL.md"),
  },

  // -------------------------------------------------------------------------
  // Andrej Karpathy guideline — ONE upstream SKILL.md = ONE Skill
  // (docs/adr/0005). The four rules live in capabilities/howItWorks, not as
  // separate entries. Attributed to Karpathy though written by multica-ai
  // (docs/adr/0004).
  // -------------------------------------------------------------------------
  {
    slug: "karpathy-guidelines",
    name: "karpathy-guidelines",
    tagline:
      "กฎพฤติกรรม 4 ข้อลดจุดพลาดยอดฮิตของ LLM เวลาเขียนโค้ด — คิดก่อนเขียน, เขียนให้น้อย, แก้เฉพาะจุด, ตั้งเกณฑ์สำเร็จที่ตรวจได้",
    authorSlug: "andrej-karpathy",
    category: "Coding",
    tags: ["code-quality", "llm-pitfalls", "simplicity", "refactoring", "testing", "guidelines"],
    featured: true,
    summary:
      "ชุดกฎพฤติกรรมสำหรับ agent ที่ถอดมาจากข้อสังเกตของ Andrej Karpathy เรื่องจุดที่ LLM มักพลาดเวลาเขียนโค้ด รวม 4 ข้อไว้ในสกิลเดียว: คิด/เปิดสมมติฐานก่อนเขียน, เขียนเท่าที่จำเป็นไม่ over-engineer, แก้โค้ดเดิมแบบเฉพาะจุด, และแปลงโจทย์เป็นเกณฑ์สำเร็จที่ตรวจสอบได้ เน้นความรอบคอบมากกว่าความเร็ว (งานเล็กๆ ใช้ดุลพินิจได้)",
    capabilities: [
      "Think Before Coding — เปิดสมมติฐาน/จุดกำกวมและทักท้วงโจทย์ที่ไม่ชัด แทนการเดาเงียบๆ",
      "Simplicity First — เขียนโค้ดขั้นต่ำที่ใช้ได้ ไม่ใส่ฟีเจอร์เผื่อ/abstraction/error handling เกินจำเป็น",
      "Surgical Changes — แก้เฉพาะที่จำเป็น คง style เดิม ไม่ reformat หรือรื้อส่วนที่ไม่เกี่ยว",
      "Goal-Driven Execution — แปลง requirement เป็นเกณฑ์สำเร็จที่ตรวจได้ + ใช้เทสต์ยืนยันและกัน regression",
    ],
    whenToUse: [
      "อยากให้ agent รอบคอบขึ้นเวลาเขียน/รีวิว/refactor โค้ด",
      "เจอ agent เดาโจทย์, over-engineer, reformat ทั้งไฟล์ หรือบอกว่าเสร็จโดยไม่พิสูจน์",
      "อยากมีกฎกลางคุมคุณภาพโค้ดที่ LLM ผลิต",
    ],
    benefits: [
      "ลดจุดพลาดยอดฮิตของ LLM ตั้งแต่ต้นทาง",
      "โค้ดเล็ก ตรงประเด็น diff รีวิวง่าย",
      "งาน 'เสร็จ' แบบมีเกณฑ์และมีเทสต์พิสูจน์",
    ],
    howItWorks: [
      "ก่อนเขียน: เปิดสมมติฐาน/ความกำกวม ถ้าไม่ชัดให้ถาม",
      "ตอนเขียน: เลือกทางที่เรียบที่สุดที่ตอบโจทย์ ไม่เติมของเกิน",
      "ตอนแก้ของเดิม: แตะเฉพาะจุด คง style เดิม",
      "ปิดงาน: เทียบกับเกณฑ์สำเร็จ + เพิ่มเทสต์กัน regression",
    ],
    examples: [
      {
        title: "เปิดสมมติฐานก่อนเขียน (Think Before Coding)",
        prompt: "ช่วยเพิ่ม cache ให้ฟังก์ชัน getUser หน่อย",
        result: `ก่อนเขียน ขอเปิดสมมติฐานที่กำกวมก่อน:

- cache อยู่ที่ไหน — ในหน่วยความจำ process เดียว หรือใช้ Redis แชร์หลาย instance?
- อายุ cache (TTL) เท่าไหร่ และต้อง invalidate ตอน user แก้ข้อมูลไหม?
- ถ้า \`getUser\` ขว้าง error ให้ cache ค่า error ด้วยหรือไม่?

3 ข้อนี้ทำให้โค้ดออกมาคนละแบบเลย ผมยังไม่เดา — ขอคำตอบก่อนแล้วค่อยเขียน`,
      },
      {
        title: "เขียนให้น้อยที่สุด (Simplicity First)",
        prompt: "โค้ดอ่าน config ของผมมี 3 ชั้น class + factory ดูเยอะไป ช่วยดูที",
        result: `ใช่ มันเกินงาน — โจทย์แค่ "อ่านค่าจากไฟล์ JSON" แต่มี \`ConfigFactory\` + \`ConfigProvider\` + \`AbstractConfig\`

รื้อเหลือเท่าที่ใช้จริง:

\`\`\`ts
import config from "./config.json";
\`\`\`

3 ชั้นนั้นไม่มีใครเรียกใช้ความสามารถพิเศษของมันเลย — ลบทิ้ง เหลือ import ตรงๆ ถ้าวันหน้าต้องโหลดหลายแหล่งค่อยเพิ่ม abstraction ตอนนั้น`,
      },
    ],
    source: karpathySource(),
  },

  // -------------------------------------------------------------------------
  // NextLevelBuilder — original work (not an adaptation, so ADR 0004 N/A).
  // The plugin registers exactly one skill (ui-ux-pro-max); the other folders
  // in the repo aren't part of it, so this is one entry (ADR 0005).
  // -------------------------------------------------------------------------
  {
    slug: "ui-ux-pro-max",
    name: "ui-ux-pro-max",
    tagline:
      "คลังปัญญาด้านดีไซน์ UI/UX ให้ agent — แนะนำสไตล์ พาเลตต์สี ฟอนต์ และกฎ UX/accessibility พร้อมสร้าง design system ให้ตรงประเภทงาน",
    authorSlug: "nextlevelbuilder",
    category: "Design",
    tags: ["ui", "ux", "design-system", "accessibility", "tailwind", "shadcn"],
    featured: true,
    summary:
      "สกิลให้ความรู้ด้านออกแบบ UI/UX แบบครบเครื่องสำหรับเว็บและมือถือ มีฐานข้อมูลค้นได้ทั้งสไตล์ 60+ แบบ, พาเลตต์สี 161 ชุด, คู่ฟอนต์ 57 คู่, ชนิดกราฟ 25 แบบ และกฎ UX/accessibility อีกเกือบร้อยข้อ ครอบหลาย stack (React, Next.js, Vue, Svelte, Tailwind, shadcn/ui ฯลฯ) จุดเด่นคือ 'Design System Generator' ที่วิเคราะห์โจทย์แล้วเสนอ pattern/สไตล์/สี/ฟอนต์ที่เหมาะ พร้อม anti-pattern ที่ควรเลี่ยง",
    capabilities: [
      "สร้าง design system ครบชุด (pattern, สไตล์, สี, ฟอนต์, effect) จากประเภทงาน/อุตสาหกรรม",
      "ค้นฐานข้อมูลสไตล์/สี/ฟอนต์/กราฟ/กฎ UX ตาม domain ที่ต้องการ",
      "รีวิว UI ตามเช็กลิสต์ accessibility, touch target, performance, layout",
      "ให้แนวปฏิบัติเฉพาะ stack (React, Tailwind, shadcn/ui, มือถือ ฯลฯ)",
    ],
    whenToUse: [
      "ออกแบบหน้า/คอมโพเนนต์ใหม่แล้วอยากได้สไตล์-สี-ฟอนต์ที่เข้ากับงาน",
      "UI ดู 'ไม่โปร' แต่บอกไม่ถูกว่าเพราะอะไร",
      "รีวิว UI เรื่อง accessibility / UX / ความสม่ำเสมอก่อนปล่อยจริง",
    ],
    benefits: [
      "ตัดสินใจดีไซน์บนฐานข้อมูล + เหตุผล ไม่ใช่เดา",
      "ได้ design system ที่สม่ำเสมอทั้งโปรเจกต์",
      "มีเช็กลิสต์ accessibility/performance กันพลาดก่อนส่ง",
    ],
    howItWorks: [
      "วิเคราะห์โจทย์: ประเภทงาน กลุ่มผู้ใช้ คีย์เวิร์ดสไตล์ stack",
      "รัน --design-system เพื่อได้ pattern/สไตล์/สี/ฟอนต์ + anti-pattern",
      "เจาะ domain เพิ่มตามต้องการ (style, color, ux, chart ฯลฯ)",
      "ดึงแนวปฏิบัติเฉพาะ stack แล้วลงมือ + ไล่เช็กลิสต์ก่อนส่ง",
    ],
    examples: [
      {
        title: "สร้าง design system จากโจทย์",
        prompt: "ทำ landing page ให้ร้านสปา ช่วยเลือกสไตล์/สี/ฟอนต์ให้หน่อย",
        result: `เริ่มจาก \`--design-system\` ให้ระบบ reasoning เสนอชุดที่เข้ากับ "สปา/wellness":

\`\`\`bash
python3 scripts/search.py "beauty spa wellness service" --design-system -p "Serenity Spa"
\`\`\`

ได้ออกมาเช่น: pattern Hero-Centric + Social Proof, สไตล์ Soft UI, สีชมพูนวล + เซจกรีน + ทอง, ฟอนต์ Cormorant Garamond/Montserrat พร้อม anti-pattern ("เลี่ยงนีออนจัด, ไม่ใช้ dark mode") — เอาไปทำต่อได้เลย`,
      },
      {
        title: "รีวิว accessibility ของหน้าเดิม",
        prompt: "ช่วยรีวิวหน้านี้เรื่อง UX/accessibility ก่อนปล่อย",
        result: `ไล่ตามเช็กลิสต์เรียงความสำคัญ (CRITICAL ก่อน):

- contrast ตัวอักษร ≥ 4.5:1 ไหม
- touch target ≥ 44×44px และเว้นช่อง ≥ 8px
- ปุ่ม icon มี aria-label ไหม, focus ring เห็นชัดไหม
- เคารพ prefers-reduced-motion ไหม

เจอจุดตก เช่น ปุ่ม icon ไม่มี label → เพิ่ม aria-label; เทาบนเทา contrast ไม่ผ่าน → เปลี่ยนสีให้ผ่าน AA แล้วค่อยปล่อย`,
      },
    ],
    source: {
      repoName: "nextlevelbuilder/ui-ux-pro-max-skill",
      repoUrl: "https://github.com/nextlevelbuilder/ui-ux-pro-max-skill",
      fileUrl:
        "https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/main/.claude/skills/ui-ux-pro-max/SKILL.md",
      path: ".claude/skills/ui-ux-pro-max/SKILL.md",
      installMethods: [
        {
          label: "Claude Code plugin",
          command: "/plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill",
          note: "แล้วรัน /plugin install ui-ux-pro-max@ui-ux-pro-max-skill",
        },
        {
          label: "CLI (uipro)",
          command: "npm install -g uipro-cli",
          note: "แล้วรัน uipro init --ai claude ในโฟลเดอร์โปรเจกต์ (รองรับหลาย AI: cursor, windsurf, copilot ฯลฯ)",
        },
      ],
    },
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
