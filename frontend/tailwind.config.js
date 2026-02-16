/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors - Steel Blue palette
        primary: {
          DEFAULT: '#4682b4',
          50: '#e0eaf3',
          100: '#c1d6e7',
          200: '#a1c1db',
          300: '#82acce',
          400: '#6397c2',
          500: '#4682b4',
          600: '#3a6d96',
          700: '#2f5778',
          800: '#23415a',
          900: '#172b3c',
          950: '#0c161e',
        },
        // Accent Colors - Yale Blue palette
        accent: {
          DEFAULT: '#00416A',
          50: '#bce5ff',
          100: '#79ccff',
          200: '#36b2ff',
          300: '#0095f1',
          400: '#006bae',
          500: '#00416a',
          600: '#003759',
          700: '#002c47',
          800: '#002136',
          900: '#001624',
        },
        // Secondary/Background
        secondary: {
          DEFAULT: '#f8fafc',
          50: '#ffffff',
          100: '#f8fafc',
          200: '#f1f5f9',
          300: '#e2e8f0',
          400: '#cbd5e1',
          500: '#94a3b8',
        },
        // Text Colors
        text: {
          primary: '#1a1c1e',
          secondary: '#4b5563',
          tertiary: '#6b7280',
          light: '#9ca3af',
        },
        // Maintain backward compatibility
        'primary-dark': '#3a6d96',
        'primary-light': '#82acce',
        highlight: '#D4AF37',
        background: '#f8fafc',
      },
      fontFamily: {
        sans: ['Open Sans', 'system-ui', 'sans-serif'],
        display: ['Sora', 'Open Sans', 'system-ui', 'sans-serif'],
        heading: ['Sora', 'Open Sans', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-lg': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-md': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        'heading-xl': ['2.25rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
        'heading-lg': ['1.875rem', { lineHeight: '1.3', fontWeight: '600' }],
        'heading-md': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #4682b4 0%, #3a6d96 100%)',
        'gradient-accent': 'linear-gradient(135deg, #00416A 0%, #002c47 100%)',
        'gradient-soft': 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'soft-xl': '0 10px 40px -10px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.04)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'soft-teal': '0 10px 40px -10px rgba(70, 130, 180, 0.3)',
        'teal-glow': '0 0 30px rgba(70, 130, 180, 0.4)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
    },
  },
  plugins: [],
}
