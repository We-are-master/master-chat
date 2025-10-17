/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'master-blue': '#020135',
        'master-blue-hover': '#030146',
      },
      animation: {
        'bounce': 'bounce 1s infinite',
      }
    },
  },
  plugins: [],
}
