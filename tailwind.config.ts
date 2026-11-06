import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mauve: {
          50: "#faf6f7",
          100: "#f4ecee",
          200: "#e9dbdf",
          300: "#d9c2c9",
          400: "#c4a3ad",
          500: "#ae8592",
          600: "#8c6572", // Main background tone matching Novianty
          700: "#75525e",
          800: "#62444f",
          900: "#543c44",
          950: "#322026",
        },
        gold: {
          100: "#fbf7ee",
          200: "#f6edd5",
          300: "#eeddac",
          400: "#e3c577",
          500: "#d4a948",
          600: "#bc8e37",
        },
      },
      fontFamily: {
        serif: ["'Playfair Display'", "Georgia", "serif"],
        cinzel: ["'Cinzel'", "serif"],
        script: ["'Alex Brush'", "cursive"],
        sans: ["'Plus Jakarta Sans'", "sans-serif"],
      },
      animation: {
        "spin-slow": "spin 8s linear infinite",
        "bounce-slow": "bounce 2.5s infinite",
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "slide-up": "slideUp 0.8s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
