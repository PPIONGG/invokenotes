import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronRight,
  ExternalLink,
  FileCode2,
  MessageSquare,
  Terminal,
  Workflow,
  Wrench,
  Zap,
} from "lucide-react";
import { getSkill, getAuthor, skills } from "@/lib/skills";
import { CategoryBadge } from "@/components/category-badge";
import { TagPill } from "@/components/tag-pill";
import { AuthorAvatar } from "@/components/author-avatar";
import { ExampleTranscript } from "@/components/example-transcript";
import { InstallTabs } from "@/components/install-tabs";
import { GitHubIcon } from "@/components/icons";

export function generateStaticParams() {
  return skills.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const skill = getSkill(slug);
  if (!skill) return { title: "ไม่พบสกิล — InvokeNotes" };
  return {
    title: `${skill.name} — InvokeNotes`,
    description: skill.tagline,
  };
}

export default async function SkillPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const skill = getSkill(slug);
  if (!skill) notFound();

  const author = getAuthor(skill.authorSlug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        สกิลทั้งหมด
      </Link>

      {/* Header */}
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <CategoryBadge category={skill.category} />
        {skill.featured && (
          <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
            Featured
          </span>
        )}
      </div>
      <h1 className="mt-3 font-mono text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {skill.name}
      </h1>
      <p className="mt-2 max-w-2xl text-lg leading-relaxed text-muted">
        {skill.tagline}
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {skill.tags.map((tag) => (
          <TagPill key={tag} tag={tag} />
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
        {/* Main column */}
        <div className="min-w-0 space-y-10">
          {/* Summary */}
          <section>
            <SectionHeading icon={<BookOpen className="h-4 w-4" />}>
              สรุปสั้น
            </SectionHeading>
            <p className="text-[15px] leading-relaxed text-foreground/90">
              {skill.summary}
            </p>
          </section>

          {/* Capabilities — the "what can I do with it" answer */}
          <section>
            <SectionHeading icon={<Wrench className="h-4 w-4" />}>
              ใช้ทำอะไรได้บ้าง
            </SectionHeading>
            <ul className="space-y-2.5">
              {skill.capabilities.map((item) => (
                <li
                  key={item}
                  className="flex gap-2.5 text-[15px] leading-relaxed text-foreground/90"
                >
                  <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* When to use + Benefits */}
          <div className="grid gap-6 sm:grid-cols-2">
            <section>
              <SectionHeading icon={<Check className="h-4 w-4" />}>
                ใช้ตอนไหน
              </SectionHeading>
              <ul className="space-y-2">
                {skill.whenToUse.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-muted">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
            <section>
              <SectionHeading icon={<Zap className="h-4 w-4" />}>
                ได้อะไร
              </SectionHeading>
              <ul className="space-y-2">
                {skill.benefits.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-muted">
                    <Zap className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* How it works — plain step sequence */}
          <section>
            <SectionHeading icon={<Workflow className="h-4 w-4" />}>
              ทำงานยังไง
            </SectionHeading>
            <ol className="space-y-3">
              {skill.howItWorks.map((step, i) => (
                <li key={step} className="flex gap-3 text-sm text-muted">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border-strong bg-surface-2 font-mono text-xs text-accent">
                    {i + 1}
                  </span>
                  <span className="pt-0.5 leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </section>

          {/* Examples */}
          <section>
            <SectionHeading icon={<MessageSquare className="h-4 w-4" />}>
              ตัวอย่างจริง
            </SectionHeading>
            <div className="space-y-4">
              {skill.examples.map((ex, i) => (
                <ExampleTranscript key={i} example={ex} />
              ))}
            </div>
          </section>

          {/* Go to source — the raw SKILL.md lives on GitHub, not rendered here */}
          <a
            href={skill.source.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between rounded-xl border border-border bg-surface p-4 transition-colors hover:border-accent/40 hover:bg-surface-2"
          >
            <span className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-border-strong bg-surface-2 text-foreground">
                <GitHubIcon className="h-4 w-4" />
              </span>
              <span>
                <span className="block text-sm font-medium text-foreground">
                  ดูต้นฉบับ SKILL.md บน GitHub
                </span>
                <span className="block font-mono text-xs text-faint">
                  {skill.source.path}
                </span>
              </span>
            </span>
            <ArrowUpRight className="h-4 w-4 text-faint transition-colors group-hover:text-accent" />
          </a>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6 lg:sticky lg:top-20 lg:self-start">
          {/* Author */}
          {author && (
            <div className="rounded-xl border border-border bg-surface p-4">
              <p className="mb-3 text-xs uppercase tracking-wide text-faint">
                Author
              </p>
              <Link
                href={`/authors/${author.slug}`}
                className="group flex items-center gap-3"
              >
                <AuthorAvatar author={author} size="md" />
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-medium text-foreground transition-colors group-hover:text-accent">
                      {author.name}
                    </span>
                    {author.kind === "self" && (
                      <span className="rounded border border-accent/30 bg-accent/10 px-1 text-[10px] text-accent">
                        you
                      </span>
                    )}
                  </div>
                  <p className="truncate text-xs text-muted">{author.title}</p>
                </div>
              </Link>
            </div>
          )}

          {/* Install */}
          <div>
            <p className="mb-2 flex items-center gap-1.5 text-xs uppercase tracking-wide text-faint">
              <Terminal className="h-3.5 w-3.5" />
              Install
            </p>
            <InstallTabs methods={skill.source.installMethods} />
          </div>

          {/* Source */}
          <div className="rounded-xl border border-border bg-surface p-4">
            <p className="mb-3 text-xs uppercase tracking-wide text-faint">
              Source
            </p>
            <p className="mb-3 break-all font-mono text-xs text-muted">
              {skill.source.repoName}
            </p>
            <div className="flex flex-col gap-2">
              <a
                href={skill.source.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm text-foreground transition-colors hover:border-border-strong"
              >
                <span className="flex items-center gap-2">
                  <FileCode2 className="h-4 w-4 text-faint" />
                  ดูต้นฉบับ
                </span>
                <ExternalLink className="h-3.5 w-3.5 text-faint" />
              </a>
              <a
                href={skill.source.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm text-foreground transition-colors hover:border-border-strong"
              >
                <span className="flex items-center gap-2">
                  <GitHubIcon className="h-4 w-4 text-faint" />
                  Repository
                </span>
                <ExternalLink className="h-3.5 w-3.5 text-faint" />
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function SectionHeading({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-foreground">
      <span className="text-accent">{icon}</span>
      {children}
    </h2>
  );
}
