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
      maxHeight: {
        modal: 'calc(100vh - 5em)'
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
      boxShadow: {
        toast: '0 0 16px -2px rgb(0 0 0 / 0.12), 0 12px 20px -5px rgb(0 0 0 / 0.1)'
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
