/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          foreground: '#33277D',
          background: '#DCE2F2',
          backgroundLight: '#EDF4FC',
        }
      }
    },
  },
  plugins: [],
}

