# InvokeNotes

> คู่มือสำรวจ **agent skills** — รวบรวมและอธิบายไฟล์ `SKILL.md` จากคอมมิวนิตี้ AI/engineering ว่าแต่ละสกิลคืออะไร ใครทำ ใช้เมื่อไหร่ ได้ประโยชน์อะไร และไปติดตั้ง/ดูต้นฉบับได้ที่ไหน

เว็บภาษาไทย (ผสมศัพท์อังกฤษ) สไตล์ dark dev-tool สำหรับทำความเข้าใจสกิลก่อนเอาไปใช้จริง

## ✨ ฟีเจอร์

- **หน้า detail แบบ curated** ต่อสกิล — สรุปสั้น + ใช้ทำอะไรได้บ้าง + ใช้ตอนไหน + ได้อะไร + ทำงานยังไง + ตัวอย่างจริง (transcript) + วิธีติดตั้ง + ลิงก์ไปต้นฉบับบน GitHub
- **กรองได้** ตามคำค้น / Category / Tags (ทำงานฝั่ง client)
- **Recipes** — playbook เรียงลำดับขั้นว่าจะหยิบ skill ไหนตอนไหนสำหรับงานจริง (เช่น สร้างเว็บ full-stack 1 โปรเจกต์) พร้อม cross-link ไป-กลับกับหน้าสกิล · กรองตาม **Goal** (Build/Fix/Improve/Ship) · มี badge ความยาก/เวลา, prerequisite, ผลลัพธ์ที่ได้, ปุ่ม copy prompt และเช็ก step ที่ทำแล้ว (เก็บใน localStorage)
- **หน้าโปรไฟล์ผู้สร้าง (Author)** รวมสกิลของแต่ละคน
- รองรับ **Docker + hot reload** สำหรับ dev

## 🧱 Tech stack

- [Next.js 16](https://nextjs.org) (App Router) + TypeScript
- Tailwind CSS v4
- [lucide-react](https://lucide.dev) (icons) · [react-markdown](https://github.com/remarkjs/react-markdown) + rehype-highlight (เรนเดอร์ตัวอย่าง markdown)
- ตอนนี้ใช้ **mock data** (ยังไม่ต่อ database) — ข้อมูลสกิลทั้งหมดอยู่ใน `lib/skills.ts`

## 🚀 เริ่มใช้งาน

### แบบปกติ (Node 22+)

```bash
npm install
npm run dev      # http://localhost:3000
```

### แบบ Docker (มี hot reload)

```bash
docker compose up --build -d   # ครั้งแรก
docker compose up -d           # ครั้งต่อไป
docker compose logs -f web     # ดู log
docker compose down            # หยุด
```

> หมายเหตุ: บน Windows/Mac เว็บใน Docker รันด้วย `next dev --webpack` + file polling (`WATCHPACK_POLLING`) เพราะ Turbopack ไม่รับ event การแก้ไฟล์ผ่าน bind mount จาก host filesystem — ดูเหตุผลใน comment ของ `docker-compose.yml`

## 📁 โครงสร้างโปรเจกต์

```
app/
  page.tsx                 หน้า Home (hero + Recipes showcase + filter + grid)
  skills/[slug]/page.tsx   หน้า detail ของสกิล (curated + เรซิพีที่ใช้สกิลนี้)
  authors/[slug]/page.tsx  หน้าโปรไฟล์ผู้สร้าง
  recipes/page.tsx         หน้า index ของ Recipes
  recipes/[slug]/page.tsx  หน้า detail ของเรซิพี (parts list + ขั้นตอน)
lib/
  skills.ts                types + mock data + selectors ของ Skill
  recipes.ts               types + mock data + selectors ของ Recipe/Step
components/                SkillCard, RecipeCard, RecipeBrowser, RecipeSteps, SkillChip, MarkdownView, ...
CONTEXT.md                 อภิธานศัพท์ของโดเมน (glossary)
docs/adr/                  Architecture Decision Records
```

## 📚 เอกสาร

- [`CONTEXT.md`](./CONTEXT.md) — อภิธานศัพท์: Skill, Author, Source, Example, Category, Tag, Recipe, Step, Prerequisite, Goal
- [`docs/adr/`](./docs/adr) — การตัดสินใจเชิงสถาปัตยกรรม (Thai-primary content, catalog model ที่ลิงก์ไปต้นฉบับแทนการเรนเดอร์ SKILL.md)

## 🙏 เครดิตเนื้อหา

สกิลในชุดเริ่มต้นนำมาจาก repo สาธารณะของ **[Matt Pocock](https://github.com/mattpocock)** — [`mattpocock/skills`](https://github.com/mattpocock/skills) ส่วนคำสรุป/คำอธิบายภาษาไทยและตัวอย่างเป็นการเรียบเรียงใหม่เพื่อการเรียนรู้ เว็บนี้ **ไม่ได้ทำสำเนา** `SKILL.md` ต้นฉบับ แต่ลิงก์ไปยังไฟล์จริงบน GitHub ของเจ้าของโดยตรง (ดู [LICENSE ของ repo ต้นทาง](https://github.com/mattpocock/skills/blob/main/LICENSE)) — เว็บนี้ทำเพื่อรวบรวมและอธิบาย ไม่ใช่การรับรองอย่างเป็นทางการ

แต่ละหน้าสกิลมีลิงก์ไปยังต้นฉบับและ repo เสมอ
