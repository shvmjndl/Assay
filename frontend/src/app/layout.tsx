import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  IBM_Plex_Mono,
  Source_Serif_4,
} from "next/font/google";
import { Providers } from "@/app/providers";
import { Grain } from "@/components/layout/Grain";
import { StrataRail } from "@/components/layout/StrataRail";
import { siteConfig } from "@/config/site";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  weight: ["400", "500", "600", "700"],
});

const body = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bricolage.variable} ${body.variable} ${mono.variable} antialiased`}
        style={
          {
            "--font-display": "var(--font-bricolage)",
            "--font-sans": "var(--font-bricolage)",
          } as React.CSSProperties
        }
      >
        <Providers>
          <Grain />
          <StrataRail />
          {children}
        </Providers>
      </body>
    </html>
  );
}
