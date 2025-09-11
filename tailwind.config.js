/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ["Orbitron", "sans-serif"],
        oxanium: ["Oxanium", "sans-serif"],
      },
      colors: {
        primary: {
          500: '#3B82F6',
          600: '#2563EB',
        },
        dark: {
          800: '#1F2937',
          900: '#111827',
        },
      },
    },
  },
  plugins: [],
}
