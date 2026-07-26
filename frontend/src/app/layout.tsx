import type { Metadata } from "next";
import {
  IBM_Plex_Mono,
  IBM_Plex_Sans,
  Newsreader,
  Source_Serif_4,
} from "next/font/google";
import { Providers } from "@/app/providers";
import { Grain } from "@/components/layout/Grain";
import { siteConfig } from "@/config/site";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  weight: ["400", "500", "600", "700"],
});

const body = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
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
    <html lang="en-GB">
      <body
        className={`${newsreader.variable} ${body.variable} ${sans.variable} ${mono.variable} antialiased`}
        style={
          {
            "--font-display": "var(--font-newsreader)",
          } as React.CSSProperties
        }
      >
        <Providers>
          <Grain />
          {children}
        </Providers>
      </body>
    </html>
  );
}
