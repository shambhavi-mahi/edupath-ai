import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Warm cream base
        cream:   { DEFAULT: "#FAF7F2", dark: "#F2EDE4" },
        sand:    "#EDE8DF",

        primary: {
          DEFAULT: "#5B4FCF",   // soft indigo/violet
          light:   "#A89DE8",
          dark:    "#4339A8",
          subtle:  "#EEE9FF",
        },
        secondary: {
          DEFAULT: "#10B981",
          light:   "#6EE7B7",
          dark:    "#059669",
          subtle:  "#D1FAE5",
        },
        accent: {
          pink:    "#F9A8C9",
          "pink-bg": "#FDE8F0",
          orange:  "#FBBF24",
          "orange-bg": "#FEF3C7",
          lavender:"#C4B5FD",
          "lavender-bg": "#EDE9FE",
          mint:    "#6EE7B7",
          "mint-bg": "#D1FAE5",
          peach:   "#FCA5A5",
          "peach-bg": "#FEE2E2",
          sky:     "#93C5FD",
          "sky-bg": "#DBEAFE",
        },
        background: {
          DEFAULT: "#FAF7F2",
          alt:     "#FFFFFF",
          dark:    "#0F0E1A",
        },
        card: {
          DEFAULT: "#FFFFFF",
          dark:    "#1A1833",
        },
        text: {
          DEFAULT: "#1A1523",
          muted:   "#6B7280",
          light:   "#9CA3AF",
        },
        border: {
          DEFAULT: "#E9E4DC",
          dark:    "#2D2B4A",
        },
      },
      fontFamily: {
        poppins:   ["var(--font-poppins)",    "sans-serif"],
        montserrat:["var(--font-montserrat)", "sans-serif"],
        inter:     ["var(--font-inter)",      "sans-serif"],
        dmsans:    ["var(--font-dm-sans)",    "sans-serif"],
        outfit:    ["var(--font-outfit)",     "sans-serif"],
      },
      borderRadius: {
        card:   "20px",
        card2:  "16px",
        button: "12px",
        pill:   "999px",
      },
      boxShadow: {
        card:  "0 2px 20px rgba(0,0,0,0.06)",
        "card-hover": "0 8px 32px rgba(0,0,0,0.10)",
        soft:  "0 4px 24px rgba(91,79,207,0.12)",
        glow:  "0 0 0 3px rgba(91,79,207,0.20)",
        "pink-glow":    "0 8px 32px rgba(249,168,201,0.3)",
        "orange-glow":  "0 8px 32px rgba(251,191,36,0.25)",
        "lavender-glow":"0 8px 32px rgba(196,181,253,0.3)",
        "mint-glow":    "0 8px 32px rgba(110,231,183,0.3)",
      },
      backgroundImage: {
        hero:       "linear-gradient(135deg, #5B4FCF 0%, #A89DE8 50%, #10B981 100%)",
        "hero-dark":"linear-gradient(135deg, #4339A8 0%, #5B4FCF 50%, #059669 100%)",
        "warm-gradient": "linear-gradient(180deg, #FAF7F2 0%, #FFFFFF 100%)",
      },
      animation: {
        float:        "float 6s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2s ease-out infinite",
        marquee:      "marquee 30s linear infinite",
        "bounce-dot": "bounce-dot 1.4s ease-in-out infinite",
        wiggle:       "wiggle 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-14px)" },
        },
        "pulse-ring": {
          "0%":   { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(1.5)", opacity: "0" },
        },
        marquee: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "bounce-dot": {
          "0%, 80%, 100%": { transform: "scale(0)" },
          "40%":           { transform: "scale(1)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%":      { transform: "rotate(3deg)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
