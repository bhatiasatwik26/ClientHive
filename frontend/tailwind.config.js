/** @type {import('tailwindcss').Config} */
import scrollbar from 'tailwind-scrollbar';
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        vibrate: {
          '0%': { transform: 'rotate(-7deg)' },
          '50%': { transform: 'rotate(7deg)' },
          '100%': { transform: 'rotate(-7deg)' },
        }
      },
      animation: {
        'vibrate': 'vibrate 0.3s ease-in-out infinite',
      }
    },
  },
  plugins: [
    scrollbar({ nocompatible: true }),
    function ({ addComponents }) {
      addComponents({
        '.scrollbar-hide': {
          /* Hide scrollbar for Webkit-based browsers (Chrome, Safari, etc.) */
          '-ms-overflow-style': 'none',  /* Internet Explorer 10+ */
          'scrollbar-width': 'none',    /* Firefox */
          '&::-webkit-scrollbar': {
            display: 'none',  /* Safari and Chrome */
          },
        },
      });
    },
  ],
}