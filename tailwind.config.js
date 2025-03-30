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
        // Uniswap-inspired color palette
        uniswap: {
          pink: '#FC72FF',
          purple: '#9B30FF',
          'dark-purple': '#7A1BFF',
          blue: '#4C82FB',
          'light-blue': '#7AECFF',
          green: '#1EC992',
          yellow: '#FFB23F',
          red: '#FF5E69',
          // Dark mode colors
          'dark-bg': '#191B1F',
          'dark-card': '#212429',
          'dark-border': '#2C2F36',
          'dark-text': '#FFFFFF',
          'dark-text-secondary': '#8F96AC',
          // Light mode colors
          'light-bg': '#F7F8FA',
          'light-card': '#FFFFFF',
          'light-border': '#E8ECFB',
          'light-text': '#0D111C',
          'light-text-secondary': '#5E6887',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'uniswap-gradient': 'linear-gradient(to right, #FC72FF, #9B30FF)',
      },
      boxShadow: {
        'uniswap': '0 4px 12px rgba(0, 0, 0, 0.1)',
        'uniswap-dark': '0 4px 12px rgba(0, 0, 0, 0.4)',
      },
      fontFamily: {
        'uniswap': ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
