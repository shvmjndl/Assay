import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "var(--paper)",
        ink: "var(--ink)",
        mute: "var(--mute)",
        fog: "var(--fog)",
        mark: "var(--mark)",
        harbor: "var(--harbor)",
        soft: "var(--soft)",
        indigo: "var(--indigo)",
        line: "var(--line)",
        wash: "var(--wash)",
        moss: "var(--moss)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        measure: "38rem",
      },
      boxShadow: {
        stamp: "0 1px 0 rgba(43, 45, 51, 0.12)",
        lift: "0 18px 50px -28px rgba(43, 45, 51, 0.35)",
      },
      transitionDuration: {
        400: "400ms",
      },
      transitionTimingFunction: {
        soft: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0.2", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
} satisfies Config;
