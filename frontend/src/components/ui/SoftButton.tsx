"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "ink" | "ghost" | "mark" | "primary";

const variants: Record<Variant, string> = {
  primary:
    "bg-mark text-paper shadow-stamp hover:bg-indigo border border-ink/10",
  mark:
    "bg-rose text-paper shadow-stamp hover:bg-indigo border border-ink/10",
  ink:
    "bg-ink text-paper shadow-stamp hover:bg-mark border border-ink/15 active:shadow-press",
  ghost:
    "bg-[rgba(255,250,240,0.35)] text-ink border border-ink/30 shadow-stamp hover:border-ink hover:bg-soft active:shadow-press",
};

type Props = {
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
  href?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
};

export function SoftButton({
  children,
  className,
  variant = "ink",
  href,
  disabled,
  onClick,
  type = "button",
}: Props) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-none px-5 py-2.5 font-sans text-[0.78rem] font-semibold uppercase tracking-[0.08em] transition-all duration-150 focus-ring active:translate-y-px disabled:cursor-not-allowed disabled:opacity-40",
    variants[variant],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={classes}
    >
      {children}
    </button>
  );
}
