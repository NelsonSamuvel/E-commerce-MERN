/** @type {import('tailwindcss').Config} */
import flowbite from "flowbite/plugin";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        darkLight: "var(--color-darkLight)",
        baseColor: "var(--color-text)",
      },
    },
  },
  darkMode: "class",
  plugins: [flowbite],
};
