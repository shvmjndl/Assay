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
        "font-sans text-[0.7rem] font-bold uppercase tracking-[0.12em] text-mark",
        className,
      )}
    >
      {children}
    </p>
  );
}
