/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#080B11',
          card: 'rgba(21, 28, 44, 0.4)',
          lighter: '#111827',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        primary: {
          DEFAULT: '#00F2FE', // Cyber/blockchain cyan
          blue: '#0052FF',    // Web3/Coinbase blue
          neon: '#05FFCC',    // Neon security/blockchain green
        },
        secondary: {
          DEFAULT: '#7928CA', // Web3 purple
          pink: '#FF0080',    // Neon accent pink
        }
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'neon-cyan': '0 0 15px rgba(0, 242, 254, 0.3)',
        'neon-purple': '0 0 15px rgba(121, 40, 202, 0.3)',
      },
      backdropBlur: {
        'glass': '12px',
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
