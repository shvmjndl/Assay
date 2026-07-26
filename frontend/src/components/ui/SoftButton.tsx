"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Variant = "ink" | "ghost" | "mark" | "primary";

const variants: Record<Variant, string> = {
  primary:
    "bg-[#5a6b45] text-white hover:bg-[#4a5340] border border-transparent",
  mark:
    "bg-[#5c4a34] text-white hover:bg-[#4a5340] border border-transparent",
  ink:
    "bg-[#2b2d33] text-white hover:bg-[#4a5340] border border-transparent",
  ghost:
    "bg-transparent text-ink border border-[#2b2d33]/20 hover:border-[#5a6b45]/50 hover:bg-[#5a6b45]/[0.1]",
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
  const reduce = useReducedMotion();
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-sans text-[0.84rem] font-medium tracking-wide transition-all duration-300 focus-ring disabled:cursor-not-allowed disabled:opacity-40",
    variants[variant],
    className,
  );

  const motionProps = reduce
    ? {}
    : {
        whileHover: { y: -2 },
        whileTap: { scale: 0.975, y: 0 },
        transition: { type: "spring" as const, stiffness: 380, damping: 22 },
      };

  if (href) {
    return (
      <motion.div className="inline-flex" {...motionProps}>
        <Link href={href} className={classes}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={classes}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}
