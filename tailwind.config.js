/** @type {import('tailwindcss').Config} */
import typography from "@tailwindcss/typography";
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        din: ["DINNextLTArabic", "sans-serif"],
      },
      colors: {
        background: {
          light: "#ffffff",
          dark: "#0f172a",
          babyBlue: "#F0EDFFCC",
          gray: "#f7f7f7",
        },
        text: {
          light: "#1e293b",
          dark: "#f8fafc",
          gray: "#828282",
          red: "#FF0000",
          subHeader: "#8593A3",
          link: "#09c",
        },
        darkBlue: "#0642BC",
        lightBlue: "#3274FF",
        orangeColor: "#fab528",
      },
    },
  },
  plugins: [typography],
};
