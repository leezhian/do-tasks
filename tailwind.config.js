/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'border-base': 'rgb(229 231 235 / <alpha-value>)',
      }
    },
  },
  plugins: [require('daisyui')],
}
