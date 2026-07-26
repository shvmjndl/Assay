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
      <div className="rounded-xl border border-line bg-soft/50 p-8 md:p-10">
        <SectionLabel>Signed in</SectionLabel>
        <h2 className="mt-4 font-display text-3xl tracking-tight text-ink">
          {session.user.name ?? "Builder"}
        </h2>
        <p className="mt-2 font-body text-mute">{session.user.email}</p>
        <p className="mt-6 max-w-md font-body leading-[1.7] text-mute">
          You're signed in. Publish your product journey with the Assay
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
    <div className="rounded-xl border border-line bg-soft/50 p-8 md:p-10">
      <SectionLabel>Member access</SectionLabel>
      <h2 className="mt-4 font-display text-3xl tracking-tight text-ink md:text-4xl">
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
          <GoogleMark />
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
        <p className="mt-5 max-w-md font-mono text-[11px] leading-relaxed tracking-wide text-fog/70">
          Google OAuth isn't configured yet. Add GOOGLE_CLIENT_ID and
          GOOGLE_CLIENT_SECRET to frontend/.env.local. Until then, use "Continue
          as reader."
        </p>
      )}
    </div>
  );
}

function GoogleMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" aria-hidden>
      <path
        fill="#5A6B45"
        d="M9 3.48c1.69 0 2.84.73 3.49 1.34l2.38-2.32C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z"
      />
      <path
        fill="#4A5340"
        d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z"
      />
      <path
        fill="#5C4A34"
        d="M3.88 10.78A5.54 5.54 0 0 1 3.58 9c0-.62.11-1.22.29-1.78L.96 4.96A9 9 0 0 0 0 9c0 1.45.35 2.82.96 4.04l2.92-2.26z"
      />
      <path
        fill="#3A3F34"
        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.96 13.04C2.44 15.98 5.48 18 9 18z"
      />
    </svg>
  );
}
