/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2C5364', // Teal from gradient
        'primary-dark': '#0F2027', // Dark teal/navy from gradient
        'primary-light': '#3d6a7a', // Lighter teal variant
        secondary: '#475569', // Slate-600
        accent: '#10b981', // Emerald-500 for "Available" or "Verified"
        highlight: '#f59e0b', // Amber-500 for "Rating" stars
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #0F2027 0%, #2C5364 100%)',
        'gradient-primary-reverse': 'linear-gradient(135deg, #2C5364 0%, #0F2027 100%)',
      },
      boxShadow: {
        'soft-teal': '0 10px 40px -10px rgba(44, 83, 100, 0.3)',
        'teal-glow': '0 0 30px rgba(44, 83, 100, 0.4)',
        'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
}
