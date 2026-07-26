import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IssueReader } from "@/features/issues/IssueReader";
import { getAllIssues, getIssue } from "@/lib/issue-store";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const issues = await getAllIssues();
  return issues.map((issue) => ({ slug: issue.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const issue = await getIssue(slug);
  if (!issue) return { title: "Issue" };
  return {
    title: `${issue.builder.name} — ${issue.product.name}`,
    description: issue.frame,
  };
}

export default async function IssuePage({ params }: Props) {
  const { slug } = await params;
  const issue = await getIssue(slug);
  if (!issue) notFound();

  return (
    <div className="paper-field">
      <div className="mx-auto max-w-[64rem] px-6 py-20 pl-8 md:px-10 md:pl-14 md:py-28">
        <IssueReader issue={issue} />
      </div>
    </div>
  );
}
