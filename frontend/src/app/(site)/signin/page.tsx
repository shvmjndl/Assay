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
      <div className="mx-auto grid max-w-[64rem] gap-12 px-6 py-20 pl-8 md:grid-cols-[0.9fr_1.1fr] md:px-10 md:pl-14 md:py-28">
        <div>
          <SectionLabel>Account</SectionLabel>
          <h1 className="mt-5 font-display text-5xl font-semibold tracking-tight text-ink">
            Sign in
          </h1>
          <p className="mt-5 max-w-md font-body text-lg leading-[1.7] text-mute">
            Quiet identity for readers and builders. Sign in to publish your
            product journey with the Assay template.
          </p>
          <ul className="mt-10 space-y-4 font-sans text-sm text-mute">
            <li className="border-l-2 border-[#5f7050]/50 pl-4">
              Write your issue with the full paper trail
            </li>
            <li className="border-l-2 border-[#e4b6be]/70 pl-4">
              Publish live to Issues and Discover
            </li>
            <li className="border-l-2 border-[#7e98aa]/50 pl-4">
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
