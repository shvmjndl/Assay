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
        board: "var(--board)",
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
        rose: "var(--rose)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },

      maxWidth: {
        measure: "38rem",
      },
      boxShadow: {
        stamp:
          "0 1px 0 rgba(28, 25, 20, 0.2), inset 0 1px 0 rgba(255, 252, 245, 0.12)",
        press: "inset 0 1px 2px rgba(28, 25, 20, 0.18)",
        sheet:
          "0 18px 40px -18px rgba(40, 32, 22, 0.35), 0 4px 12px -4px rgba(40, 32, 22, 0.18)",
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
