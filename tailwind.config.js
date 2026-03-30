/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: '#5B2D8E',
        'purple-dark': '#301252',
        'purple-hero': '#1e0838',
        'purple-mid': '#3d1a6e',
        pink: '#C47DC0',
        'pink-light': '#f0d8ef',
        pale: '#f7f2fd',
        cream: '#FEF3C7',
        'cream-text': '#78350F',
        'gray-dark': '#1a1a2e',
        'gray-mid': '#5a5a70',
        'gray-light': '#f5f4f9',
        border: '#e2d5f5',
        'green-wa': '#25D366',
        'teal-dark': '#1a8a8a',
        'footer-bg': '#0f0520',
      },
    },
  },
  plugins: [],
}
