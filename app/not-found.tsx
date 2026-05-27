import Link from "next/link";
import { HeroBackdrop } from "@/components/hero-backdrop";

export default function NotFound() {
  return (
    <div className="relative isolate flex min-h-[60vh] flex-col items-center justify-center overflow-hidden px-4 py-24 text-center">
      <HeroBackdrop />
      <p className="reveal font-mono text-7xl font-semibold text-accent">404</p>
      <h1
        className="reveal mt-4 text-xl font-semibold text-foreground"
        style={{ animationDelay: "60ms" }}
      >
        ไม่มีอะไรให้ invoke ตรงนี้
      </h1>
      <p
        className="reveal mt-2 text-sm text-muted"
        style={{ animationDelay: "120ms" }}
      >
        ไม่พบสกิลหรือผู้สร้างนี้ในคอลเลกชัน
      </p>
      <Link
        href="/"
        className="reveal mt-6 rounded-lg border border-border bg-surface/70 px-4 py-2 text-sm text-foreground backdrop-blur transition-colors hover:border-border-strong"
        style={{ animationDelay: "180ms" }}
      >
        กลับไปหน้าสกิลทั้งหมด
      </Link>
    </div>
  );
}
