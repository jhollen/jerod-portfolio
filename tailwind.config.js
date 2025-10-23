/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Main Color Palette
        primary: "#78866B", // Primary Accent (Google Search Tab)
        secondary: "#A68170", // Beaver - Secondary Accent
        tertiary: "#CEC1B7", // Dun - Tertiary Accent

        // Background Colors
        page: "#F7F8FA", // Very light gray for main page background
        antique: "#F0E7D8", // Antique White for content areas
        gray: "#808080", // Gray for subtle highlights or footer

        // Semantic Colors
        text: {
          DEFAULT: "#222222", // Near-black for main text
          muted: "#78866B", // Muted text using primary color
          light: "#FFFFFF", // White text for dark backgrounds
        },
        border: {
          DEFAULT: "#E6E1D5", // Light border color
          accent: "#78866B", // Accent border using primary color
        },

        // Section Background Colors
        section: {
          DEFAULT: "#FFFFFF", // White for primary sections
          alt: "#F9FAFB", // Very light gray for alternating sections
          muted: "#F0E7D8", // Antique white for muted sections
        },
      },
      fontFamily: {
        sans: ["Lato", "sans-serif"],
        serif: ["Georgia", "serif"],
        mono: ["Menlo", "monospace"],
      },
      spacing: {
        container: "2rem",
        section: "4rem",
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        lg: "1rem",
        xl: "1.5rem",
      },
      boxShadow: {
        card: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
        elevated:
          "0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)",
      },
      maxWidth: {
        container: "64rem", // 1024px
        reading: "48rem", // 768px
      },
    },
  },
  plugins: [],
};
