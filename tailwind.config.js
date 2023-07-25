/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      width: {
        64: '16rem',
        130: '32.5rem',
      },
      maxWidth: {
        modal: 'calc(100vw - 32px)'
      },
      borderRadius: {
        unset: 'unset',
        inherit: 'inherit',
      },
      zIndex: {
        60: 60,
        70: 70,
        80: 80,
        90: 90,
        infinity: 9999,
      },
      gridTemplateColumns: {
        'auto-fit-flex': 'repeat(auto-fit, minmax(256px, 1fr))',
        'auto-fit-fixed': 'repeat(auto-fit, minmax(256px, 256px))',
      }
    },
  },
  daisyui: {
    prefix: 'daisy-'
  },
  plugins: [require('daisyui')],
}
