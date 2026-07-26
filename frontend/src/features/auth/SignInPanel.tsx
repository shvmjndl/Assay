"use client";

import { signIn, signOut } from "next-auth/react";
import type { Session } from "next-auth";
import { SoftButton } from "@/components/ui/SoftButton";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function SignInPanel({
  googleReady,
  session,
  callbackUrl = "/write",
}: {
  googleReady: boolean;
  session: Session | null;
  callbackUrl?: string;
}) {
  if (session?.user) {
    return (
      <div className="border border-[var(--rule)] bg-soft/50 p-8 md:p-10">
        <SectionLabel>Signed in</SectionLabel>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink">
          {session.user.name ?? "Builder"}
        </h2>
        <p className="mt-2 font-body text-mute">{session.user.email}</p>
        <p className="mt-6 max-w-md font-body leading-[1.7] text-mute">
          You&apos;re signed in. Publish your product journey with the Assay
          template, or keep reading the log.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <SoftButton href="/write" variant="ink">
            Write an issue
          </SoftButton>
          <SoftButton href="/issues" variant="ghost">
            Back to issues
          </SoftButton>
          <SoftButton variant="ghost" onClick={() => signOut({ callbackUrl: "/" })}>
            Sign out
          </SoftButton>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-[var(--rule)] bg-soft/50 p-8 md:p-10">
      <SectionLabel>Subscriber access</SectionLabel>
      <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
        Sign in to write and follow the work.
      </h2>
      <p className="mt-4 max-w-md font-body text-lg leading-[1.7] text-mute">
        Anyone can publish — same rigid template as every Assay issue. Sign in,
        fill the journey, go live on the site.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <SoftButton
          variant="ink"
          onClick={() => signIn("google", { callbackUrl })}
          disabled={!googleReady}
        >
          Continue with Google
        </SoftButton>
        <SoftButton
          variant="ghost"
          onClick={() => signIn("reader", { callbackUrl })}
        >
          Continue as reader
        </SoftButton>
      </div>

      {!googleReady && (
        <p className="mt-5 max-w-md byline leading-relaxed">
          Google OAuth isn&apos;t configured yet. Until then, use Continue as
          reader.
        </p>
      )}
    </div>
  );
}
