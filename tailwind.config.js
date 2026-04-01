/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      letterSpacing: {
        'widest-2': '0.35em',
        'widest-3': '0.5em',
      },
      colors: {
        'tvp-black': '#000000',
        'tvp-white': '#ffffff',
        'tvp-gray': '#888888',
        'tvp-border': '#1a1a1a',
      },
    },
  },
  plugins: [],
}
