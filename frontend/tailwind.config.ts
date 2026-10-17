import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand colors
        navy: {
          DEFAULT: '#0F2742',
          50: '#E7ECF1',
          100: '#C2CDD9',
          200: '#9BACC2',
          300: '#748AA9',
          400: '#4D6890',
          500: '#334D70',
          600: '#263957',
          700: '#1A253D',
          800: '#0F2742',
          900: '#0A1B2D',
        },
        ivory: {
          DEFAULT: '#F8F5EF',
          50: '#FFFFFF',
          100: '#FEFDFB',
          200: '#FCFAF6',
          300: '#F8F5EF',
          400: '#F0EBE1',
          500: '#E8E2D4',
          600: '#C4BBAB',
          700: '#9A917F',
          800: '#6F6759',
          900: '#443E34',
        },
        saffron: {
          DEFAULT: '#C77B30',
          50: '#FBF3E9',
          100: '#F6E4D1',
          200: '#EDC6A2',
          300: '#E4A773',
          400: '#DB8944',
          500: '#C77B30',
          600: '#9F6226',
          700: '#77491C',
          800: '#4F3113',
          900: '#271809',
        },
        maroon: {
          DEFAULT: '#7A263A',
          50: '#F5E8EB',
          100: '#E9D1D8',
          200: '#D3A3B0',
          300: '#BD7588',
          400: '#A74760',
          500: '#7A263A',
          600: '#621E2F',
          700: '#491623',
          800: '#310E17',
          900: '#18070B',
        },
        slate: {
          750: '#293548',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        serif: [
          'Merriweather',
          'Georgia',
          'Cambria',
          'Times New Roman',
          'Times',
          'serif',
        ],
      },
      spacing: {
        18: '4.5rem',
        88: '22rem',
        128: '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        soft: '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
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
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
