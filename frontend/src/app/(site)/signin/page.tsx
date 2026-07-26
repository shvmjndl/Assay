import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SignInPanel } from "@/features/auth/SignInPanel";
import { authOptions, googleConfigured } from "@/lib/auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to Assay with Google.",
};

type Props = {
  searchParams: Promise<{ next?: string }>;
};

export default async function SignInPage({ searchParams }: Props) {
  const session = await getServerSession(authOptions);
  const params = await searchParams;
  const next =
    params.next && params.next.startsWith("/") ? params.next : "/write";

  return (
    <div className="paper-field">
      <div className="mx-auto grid max-w-[70rem] gap-10 px-5 py-12 md:grid-cols-[0.9fr_1.1fr] md:gap-12 md:px-8 md:py-16">
        <div>
          <SectionLabel>Account</SectionLabel>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
            Sign in
          </h1>
          <p className="mt-4 max-w-md border-b-[3px] border-ink pb-8 font-body text-lg leading-[1.7] text-mute">
            Quiet identity for readers and builders. Sign in to publish your
            product journey with the Assay template.
          </p>
          <ul className="mt-8 space-y-4 font-body text-sm text-mute">
            <li className="border-l-2 border-ink pl-4">
              Write your issue with the full paper trail
            </li>
            <li className="border-l-2 border-mark pl-4">
              Publish live to Issues and Discover
            </li>
            <li className="border-l-2 border-rose pl-4">
              Same rigid template — no launch-day fluff
            </li>
          </ul>
        </div>
        <SignInPanel
          googleReady={googleConfigured}
          session={session}
          callbackUrl={next}
        />
      </div>
    </div>
  );
}
