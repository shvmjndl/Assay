"use client";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="paper-board px-0 md:px-3 md:py-4 lg:px-6 lg:py-5">
      <div className="newsprint relative mx-auto flex min-h-screen flex-col md:min-h-[calc(100vh-2.5rem)] md:max-w-[76rem]">
        <div className="paper-field flex flex-1 flex-col">
          <SiteHeader />
          <main className="relative z-[2] flex-1">{children}</main>
          <SiteFooter />
        </div>
      </div>
    </div>
  );
}
