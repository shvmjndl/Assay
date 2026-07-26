import type { Metadata } from "next";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SoftButton } from "@/components/ui/SoftButton";
import { WriteForm } from "@/features/write/WriteForm";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Write",
  description: "Publish your product journey using the Assay template.",
};

export default async function WritePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/signin?next=/write");
  }

  return (
    <div className="paper-field">
      <div className="mx-auto max-w-[64rem] px-6 py-20 pl-8 md:px-10 md:pl-14 md:py-28">
        <SectionLabel>Submit for the log</SectionLabel>
        <h1 className="mt-5 max-w-2xl font-display text-5xl font-semibold tracking-tight text-ink md:text-6xl">
          Write
        </h1>
        <p className="mt-5 max-w-xl font-body text-lg leading-[1.7] text-mute">
          Same template as every Assay issue — problem, architecture, hardest
          tradeoff, timeline with stuck periods, what you’d do differently, open
          roadmap. Fill it honestly. Publish goes live on the site.
        </p>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-[#5a6b45]">
          Signed in as {session.user.name ?? session.user.email}
          {" · "}
          <Link href="/signin" className="underline decoration-[#5a6b45]/40 underline-offset-4">
            Account
          </Link>
        </p>

        <div className="mt-14">
          <WriteForm defaultBuilderName={session.user.name ?? ""} />
        </div>

        <div className="mt-16 border-t border-line pt-8">
          <SoftButton href="/issues" variant="ghost">
            Back to issues
          </SoftButton>
        </div>
      </div>
    </div>
  );
}
