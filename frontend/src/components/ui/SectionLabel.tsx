import { cn } from "@/lib/utils";

export function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-mono text-[11px] uppercase tracking-[0.18em] text-[#5a6b45]",
        className,
      )}
    >
      {children}
    </p>
  );
}
