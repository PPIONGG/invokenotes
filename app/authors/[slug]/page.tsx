import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Globe } from "lucide-react";
import { getAuthor, getSkillsByAuthor, withAuthor, authors } from "@/lib/skills";
import { AuthorAvatar } from "@/components/author-avatar";
import { SkillCard } from "@/components/skill-card";
import { GitHubIcon, XIcon } from "@/components/icons";

export function generateStaticParams() {
  return authors.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) return { title: "ไม่พบผู้สร้าง — InvokeNotes" };
  return {
    title: `${author.name} — InvokeNotes`,
    description: author.bio,
  };
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) notFound();

  const authorSkills = getSkillsByAuthor(author.slug).map(withAuthor);

  const links = [
    author.links.github && {
      href: author.links.github,
      label: "GitHub",
      icon: <GitHubIcon className="h-4 w-4" />,
    },
    author.links.website && {
      href: author.links.website,
      label: "Website",
      icon: <Globe className="h-4 w-4" />,
    },
    author.links.twitter && {
      href: author.links.twitter,
      label: "X",
      icon: <XIcon className="h-3.5 w-3.5" />,
    },
  ].filter(Boolean) as { href: string; label: string; icon: React.ReactNode }[];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        สกิลทั้งหมด
      </Link>

      {/* Profile header */}
      <div className="mt-6 flex flex-col gap-5 border-b border-border pb-8 sm:flex-row sm:items-start">
        <AuthorAvatar author={author} size="lg" />
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              {author.name}
            </h1>
            <span
              className={
                author.kind === "self"
                  ? "rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent"
                  : "rounded-full border border-border bg-surface-2 px-2 py-0.5 text-xs font-medium text-muted"
              }
            >
              {author.kind === "self" ? "สกิลของฉัน" : "Community"}
            </span>
          </div>
          <p className="mt-1 text-sm text-muted">{author.title}</p>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-foreground/90">
            {author.bio}
          </p>

          {links.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-muted transition-colors hover:border-border-strong hover:text-foreground"
                >
                  {l.icon}
                  {l.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Their skills */}
      <h2 className="mb-4 mt-8 text-sm font-semibold uppercase tracking-wide text-foreground">
        {authorSkills.length} สกิล
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {authorSkills.map((skill) => (
          <SkillCard key={skill.slug} skill={skill} />
        ))}
      </div>
    </div>
  );
}
