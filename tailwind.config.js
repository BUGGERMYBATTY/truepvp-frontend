/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        display: ['"Orbitron"', 'sans-serif'],
      },
      colors: {
        'brand-dark': '#0D0E18',
        'brand-gray': '#1A1B2E',
        'blue': {
          'light': '#7DF9FF',
          'DEFAULT': '#00BFFF',
          'dark': '#008C9E',
        },
        'pink': {
          'light': '#FF7ED4',
          'DEFAULT': '#FF1493',
          'dark': '#C2007B',
        },
        'yellow': {
          'light': '#FFF700',
          'DEFAULT': '#FFD700',
          'dark': '#E0B400',
        }
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'psychedelic-bg': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out',
        'psychedelic-bg': 'psychedelic-bg 6s ease-in-out infinite',
      }
    }
  },
  plugins: [],
}
