/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff5722',
        secondary: '#2c3e50',
      },
      borderRadius: {
        'brand': '12px',
      },
      boxShadow: {
        'brand': '0 10px 40px rgba(255, 87, 34, 0.2)',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.container-border': {
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
        },
        '.brand-shadow': {
          boxShadow: '0 10px 40px rgba(255, 87, 34, 0.2)',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}
