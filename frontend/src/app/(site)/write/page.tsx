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
      <div className="mx-auto max-w-[70rem] px-5 py-12 md:px-8 md:py-16">
        <SectionLabel>Letters & submissions</SectionLabel>
        <h1 className="mt-3 max-w-2xl font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
          Write
        </h1>
        <p className="mt-4 max-w-xl border-b-[3px] border-ink pb-8 font-body text-lg leading-[1.7] text-mute">
          Same template as every Assay issue — problem, architecture, hardest
          tradeoff, timeline with stuck periods, what you’d do differently, open
          roadmap. Fill it honestly. Publish goes live on the site.
        </p>
        <p className="mt-6 byline text-mark">
          Signed in as {session.user.name ?? session.user.email}
          {" · "}
          <Link href="/signin" className="underline decoration-mark/40 underline-offset-4">
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
