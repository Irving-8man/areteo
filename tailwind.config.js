/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        '--color-1': '#C1D2D9',
        '--color-2': '#EBF0F2',
        '--color-3': '#013440',
        '--color-4': '#05F2DB',
        '--color-5': '#0D0D0D'
      },
    },
  },
  plugins: [],
}

