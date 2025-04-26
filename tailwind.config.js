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
        'youtube-red': '#FF0000',
        'youtube-black': '#0F0F0F',
        'youtube-dark': '#0F0F0F',
        'youtube-light': '#272727',
        'youtube-lightest': '#383838',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
} 