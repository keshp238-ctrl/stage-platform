/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        stage: {
          bg: '#0A0B0E',
          surface: '#111318',
          card: '#161922',
          border: 'rgba(255, 255, 255, 0.08)',
          coral: {
            DEFAULT: '#E62B1E',
            glow: '#FF4438',
            subtle: 'rgba(230, 43, 30, 0.15)',
            deep: '#B31B10',
          },
          light: {
            bg: '#F9F9F8',
            surface: '#FFFFFF',
            card: '#F3F2EE',
            border: 'rgba(0, 0, 0, 0.08)',
          }
        }
      },
      fontFamily: {
        sans: ['Geist', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'spotlight': 'spotlight 2s ease .75s 1 forwards',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        spotlight: {
          '0%': { opacity: 0, transform: 'translate(-50%, -100%) scale(0.6)' },
          '100%': { opacity: 1, transform: 'translate(-50%, 0%) scale(1)' },
        }
      }
    },
  },
  plugins: [],
}
