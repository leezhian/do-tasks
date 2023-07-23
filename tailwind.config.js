/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      width: {
        64: '16rem',
      },
      borderRadius: {
        unset: 'unset',
        inherit: 'inherit',
      },
      gridTemplateColumns: {
        'auto-fit-flex': 'repeat(auto-fit, minmax(256px, 1fr))',
        'auto-fit-fixed': 'repeat(auto-fit, minmax(256px, 256px))',
      }
    },
  },
  plugins: [require('daisyui')],
}
