/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
          'custom-brown': '#AD5B34',
          'custom-green': '#1D9325',
      },
    },
  },
  plugins: [],
};
