# InvokeNotes

> คู่มือสำรวจ **agent skills** — รวบรวมและอธิบายไฟล์ `SKILL.md` จากคอมมิวนิตี้ AI/engineering ว่าแต่ละสกิลคืออะไร ใครทำ ใช้เมื่อไหร่ ได้ประโยชน์อะไร และไปติดตั้ง/ดูต้นฉบับได้ที่ไหน

เว็บภาษาไทย (ผสมศัพท์อังกฤษ) สไตล์ dark dev-tool สำหรับทำความเข้าใจสกิลก่อนเอาไปใช้จริง

## ✨ ฟีเจอร์

- **หน้า detail แบบ hybrid** ต่อสกิล — สรุป (ไทย) + เมื่อไหร่ควรใช้ + ได้อะไร + ตัวอย่างการทำงาน (transcript) + เรนเดอร์ `SKILL.md` ต้นฉบับ + วิธีติดตั้ง
- **กรองได้** ตามคำค้น / Category / Tags (ทำงานฝั่ง client)
- **หน้าโปรไฟล์ผู้สร้าง (Author)** รวมสกิลของแต่ละคน
- รองรับ **Docker + hot reload** สำหรับ dev

## 🧱 Tech stack

- [Next.js 16](https://nextjs.org) (App Router) + TypeScript
- Tailwind CSS v4
- [lucide-react](https://lucide.dev) (icons) · [react-markdown](https://github.com/remarkjs/react-markdown) + rehype-highlight (เรนเดอร์ `SKILL.md`)
- ตอนนี้ใช้ **mock data** (ยังไม่ต่อ database) — ข้อมูลสกิลอยู่ใน `lib/skills.ts` และเนื้อ `SKILL.md` ต้นฉบับอยู่ใน `content/skills/`

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
  page.tsx                 หน้า Home (hero + filter + grid)
  skills/[slug]/page.tsx   หน้า detail ของสกิล (hybrid)
  authors/[slug]/page.tsx  หน้าโปรไฟล์ผู้สร้าง
lib/
  skills.ts                types + mock data + selectors (client-safe)
  skill-content.ts         อ่าน body SKILL.md ฝั่ง server (fs)
content/skills/            ไฟล์ SKILL.md ต้นฉบับ (verbatim)
components/                SkillCard, FilterBar, MarkdownView, InstallTabs, ...
CONTEXT.md                 อภิธานศัพท์ของโดเมน (glossary)
docs/adr/                  Architecture Decision Records
```

## 📚 เอกสาร

- [`CONTEXT.md`](./CONTEXT.md) — อภิธานศัพท์: Skill, Author, Source, Example, Category, Tag
- [`docs/adr/`](./docs/adr) — การตัดสินใจเชิงสถาปัตยกรรม (hybrid content model, Thai-primary content)

## 🙏 เครดิตเนื้อหา

สกิลในชุดเริ่มต้นนำมาจาก repo สาธารณะของ **[Matt Pocock](https://github.com/mattpocock)** — [`mattpocock/skills`](https://github.com/mattpocock/skills) ส่วนคำสรุป/คำอธิบายภาษาไทยและตัวอย่างเป็นการเรียบเรียงใหม่เพื่อการเรียนรู้ ไฟล์ `SKILL.md` ต้นฉบับใน `content/skills/` เป็นลิขสิทธิ์ของเจ้าของเดิมตาม [LICENSE ของ repo ต้นทาง](https://github.com/mattpocock/skills/blob/main/LICENSE) — เว็บนี้ทำเพื่อรวบรวมและอธิบาย ไม่ใช่การรับรองอย่างเป็นทางการ

แต่ละหน้าสกิลมีลิงก์ไปยังต้นฉบับและ repo เสมอ
