import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#16a34a",
          foreground: "#ffffff",
          dark: "#15803d",
          light: "#22c55e",
          container: "#00873a",
          fixed: "#7ffc97",
        },
        whatsapp: {
          DEFAULT: "#25d366",
          dark: "#128c7e",
          light: "#dcf8c6",
        },
        secondary: {
          DEFAULT: "#f59e0b",
          dark: "#d97706",
          container: "#fea619",
          fixed: "#ffddb8",
        },
        surface: {
          DEFAULT: "#f8f9ff",
          muted: "#f8fafc",
          warm: "#fefce8",
          card: "#ffffff",
          container: "#e6eeff",
          "container-low": "#eff4ff",
          "container-high": "#dce9ff",
          "container-lowest": "#ffffff",
        },
        stock: {
          available: "#16a34a",
          low: "#ea580c",
          out: "#dc2626",
        },
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      boxShadow: {
        card: "0px 2px 8px -2px rgba(22, 163, 74, 0.06), 0px 1px 3px 0px rgba(0, 0, 0, 0.04)",
        sticky: "0px -4px 16px -2px rgba(15, 23, 42, 0.08)",
        floating: "0px 10px 25px -5px rgba(22, 163, 74, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
