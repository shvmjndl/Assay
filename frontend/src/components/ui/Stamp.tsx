import { cn } from "@/lib/utils";

type StampProps = {
  children: React.ReactNode;
  active?: boolean;
  className?: string;
  as?: "span" | "button";
  onClick?: () => void;
};

export function Stamp({
  children,
  active = false,
  className,
  as = "span",
  onClick,
}: StampProps) {
  const classes = cn(
    "inline-flex items-center border px-2.5 py-0.5 font-sans text-[10px] font-semibold uppercase tracking-[0.08em] shadow-stamp transition-all duration-150 active:translate-y-px active:shadow-press",
    active
      ? "border-ink bg-ink text-paper"
      : "border-[var(--rule)] bg-[rgba(255,250,240,0.45)] text-mute hover:border-ink hover:text-ink",
    className,
  );

  if (as === "button") {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn(classes, "focus-ring cursor-pointer")}
      >
        {children}
      </button>
    );
  }

  return <span className={classes}>{children}</span>;
}
