/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Fraunces", "ui-serif", "Georgia", "serif"],
        mono: [
          "'IBM Plex Mono'",
          "ui-monospace",
          "SFMono-Regular",
          "monospace",
        ],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        ink: {
          950: "#0E1013",
          900: "#171A1F",
          800: "#20242B",
          700: "#2A2E35",
        },
        paper: {
          50: "#F5F3EE",
          100: "#EBE7DE",
          200: "#D8D2C4",
        },
        brass: {
          100: "#F8E7C3",
          200: "#EFCF93",
          300: "#E0B867",
          400: "#D9A441",
          500: "#C4903A",
          600: "#A8752B",
          700: "#855A1F",
          800: "#654114",
        },
      },
    },
  },
  plugins: [],
};
