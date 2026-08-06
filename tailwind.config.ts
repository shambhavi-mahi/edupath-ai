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
        primary: {
          DEFAULT: "#4338CA",
          light: "#A5B4FC",
          dark: "#3730A3",
        },
        secondary: {
          DEFAULT: "#10B981",
          light: "#34D399",
          dark: "#059669",
        },
        background: {
          DEFAULT: "#FFFFFF",
          dark: "#0F0E1A",
        },
        card: {
          DEFAULT: "#F5F3FF",
          dark: "#1A1833",
        },
        text: {
          DEFAULT: "#1E1B4B",
          muted: "#6B7280",
        },
      },
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
        montserrat: ["var(--font-montserrat)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        dmsans: ["var(--font-dm-sans)", "sans-serif"],
        outfit: ["var(--font-outfit)", "sans-serif"],
      },
      borderRadius: {
        card: "16px",
        button: "8px",
      },
      boxShadow: {
        card: "0 4px 24px rgba(67, 56, 202, 0.10)",
        glow: "0 0 0 3px rgba(67, 56, 202, 0.25)",
      },
      backgroundImage: {
        hero: "linear-gradient(135deg, #4338CA 0%, #A5B4FC 50%, #10B981 100%)",
        "hero-dark": "linear-gradient(135deg, #3730A3 0%, #4338CA 50%, #059669 100%)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2s ease-out infinite",
        marquee: "marquee 30s linear infinite",
        "bounce-dot": "bounce-dot 1.4s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(1.5)", opacity: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "bounce-dot": {
          "0%, 80%, 100%": { transform: "scale(0)" },
          "40%": { transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
