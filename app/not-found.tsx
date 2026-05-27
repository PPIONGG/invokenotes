import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center justify-center px-4 py-32 text-center">
      <p className="font-mono text-6xl font-semibold text-accent">404</p>
      <h1 className="mt-4 text-xl font-semibold text-foreground">
        ไม่มีอะไรให้ invoke ตรงนี้
      </h1>
      <p className="mt-2 text-sm text-muted">
        ไม่พบสกิลหรือผู้สร้างนี้ในคอลเลกชัน
      </p>
      <Link
        href="/"
        className="mt-6 rounded-lg border border-border bg-surface px-4 py-2 text-sm text-foreground transition-colors hover:border-border-strong"
      >
        กลับไปหน้าสกิลทั้งหมด
      </Link>
    </div>
  );
}
