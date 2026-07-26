"use client";

import { motion, useReducedMotion } from "framer-motion";
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
  const reduce = useReducedMotion();
  const classes = cn(
    "inline-flex items-center rounded-full border px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.1em] transition-all duration-300",
    active
      ? "border-[#5a6b45]/45 bg-[#5a6b45]/[0.14] text-[#4a5340]"
      : "border-[#2b2d33]/10 bg-soft text-mute hover:border-[#5a6b45]/35 hover:text-[#5a6b45]",
    className,
  );

  if (as === "button") {
    return (
      <motion.button
        type="button"
        onClick={onClick}
        className={cn(classes, "focus-ring cursor-pointer")}
        whileTap={reduce ? undefined : { scale: 0.96 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {children}
      </motion.button>
    );
  }

  return <span className={classes}>{children}</span>;
}
