/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bat-black-bg': '#0B0B0B',
        'bat-black-card': '#161616',
        'bat-gold': '#D4AF37',
        'bat-yellow': '#F7D354',
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 15px rgba(212, 175, 55, 0.25)',
        'yellow-glow': '0 0 20px rgba(247, 211, 84, 0.35)',
        'spotlight': '0 0 40px rgba(247, 211, 84, 0.15)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.6', filter: 'drop-shadow(0 0 5px rgba(247, 211, 84, 0.3))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 15px rgba(247, 211, 84, 0.8))' },
        }
      }
    },
  },
  plugins: [],
}
