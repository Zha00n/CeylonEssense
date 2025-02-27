// tailwind.config.js
const {heroui} = require("@heroui/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/components/(button|card|image|navbar|scroll-shadow|ripple|spinner).js"
  ],
  theme: {
    extend: {
      colors: {
      'custom-brown': '#AD5B34',
      'custom-green': '#1D9325',
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};