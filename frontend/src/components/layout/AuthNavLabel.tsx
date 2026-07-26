"use client";

import { useSession } from "next-auth/react";

export function AuthNavLabel({ fallback }: { fallback: string }) {
  const { data } = useSession();
  if (!data?.user) return <>{fallback}</>;
  return <>{data.user.name?.split(" ")[0] ?? "Account"}</>;
}
