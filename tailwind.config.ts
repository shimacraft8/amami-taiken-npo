import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // カラートークンは globals.css の CSS 変数を参照（1箇所書き換えでテーマ切替可）
      colors: {
        bg: "var(--color-bg)",
        accent: "var(--color-accent)",
        "accent-soft": "var(--color-accent-soft)",
        text: "var(--color-text)",
        "text-muted": "var(--color-text-muted)",
        surface: "var(--color-surface)",
        border: "var(--color-border)",
      },
      fontFamily: {
        // 見出し：Outfit（英）+ Noto Sans JP / 本文：Noto Sans JP
        heading: ["var(--font-outfit)", "var(--font-noto-sans-jp)", "sans-serif"],
        sans: ["var(--font-noto-sans-jp)", "sans-serif"],
        // パターンA（ダークアース）切替用の明朝見出し
        serif: ["var(--font-noto-serif-jp)", "serif"],
      },
      maxWidth: {
        content: "1200px",
      },
      boxShadow: {
        card: "0 8px 30px rgba(0, 0, 0, 0.08)",
        "card-hover": "0 20px 50px rgba(0, 0, 0, 0.16)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
