/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        instagram: {
          blue: '#0095f6',
          purple: '#833ab4',
          pink: '#c13584',
          orange: '#e1306c',
          yellow: '#f77737',
        },
      },
    },
  },
  plugins: [],
} 