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
        ink: "#0B1220",
        "ink-soft": "#13203B",
        text: {
          DEFAULT: "#25324A",
          subtle: "#5B6B86",
          faint: "#A7B4CC",
        },
        card: "#F8FAFC",
        "surface-base": "#FFFFFF",
        "surface-muted": "#F1F5F9",
        "surface-contrast": "#0F172A",
        "border-subtle": "rgba(15,23,42,0.14)",
        "border-strong": "rgba(15,23,42,0.2)",
        "cool-bg": "#E4ECFF",
        "cool-base": "#2563EB",
        "cool-tint": "#60A5FA",
        "warm-bg": "#FFE8D6",
        "warm-base": "#F97316",
        "warm-tint": "#FDBA74",
        "accent-blue": "#2563EB",
        "accent-orange": "#F97316",
        "accent-amber": "#FDBA74",
        "accent-deep": "#1E3A8A",
      },
      borderRadius: {
        "2.5xl": "1.75rem",
        "3xl": "2.5rem",
      },
      boxShadow: {
        subtle: "0 1px 0 rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.08)",
        card: "0 10px 22px rgba(15, 23, 42, 0.06), 0 2px 6px rgba(15, 23, 42, 0.04)",
        "card-hover": "0 24px 56px -24px rgba(15, 23, 42, 0.45), 0 12px 28px -14px rgba(15, 23, 42, 0.24)",
        floating: "0 40px 120px -40px rgba(15, 23, 42, 0.35)",
      },
      backgroundImage: {
        "accent-gradient": "linear-gradient(120deg, #2563EB 0%, #F97316 100%)",
        "cool-radial": "radial-gradient(circle at 18% 20%, rgba(37, 99, 235, 0.32), transparent 68%)",
        "warm-radial": "radial-gradient(circle at 82% 22%, rgba(249, 115, 22, 0.28), transparent 70%)",
        "noise-texture": "url('/noise.png')",
        noise: "url('/noise.png')",
      },
      spacing: {
        section: "6rem",
      },
      transitionTimingFunction: {
        "out-cubic": "cubic-bezier(0.22, 0.61, 0.36, 1)",
      },
      backdropBlur: {
        "2xs": "6px",
      },
      fontFamily: {
        sans: ["Roboto", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
