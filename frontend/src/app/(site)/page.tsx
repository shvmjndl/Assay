import { Hero } from "@/features/home/Hero";
import { LatestIssue } from "@/features/home/LatestIssue";
import { Manifesto } from "@/features/home/Manifesto";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Manifesto />
      <LatestIssue />
    </>
  );
}
