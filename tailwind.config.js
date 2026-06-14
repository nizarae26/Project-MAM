/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // enable class-based dark mode
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'hsl(190, 70%, 45%)', // teal-ish industrial
          light: 'hsl(190, 70%, 55%)',
          dark: 'hsl(190, 70%, 35%)',
        },
        accent: {
          DEFAULT: 'hsl(35, 80%, 50%)', // orange accent
        },
        danger: {
          DEFAULT: 'hsl(0, 80%, 55%)',
        },
        success: {
          DEFAULT: 'hsl(120, 70%, 45%)',
        },
        warning: {
          DEFAULT: 'hsl(45, 80%, 50%)',
        },
      },
    },
  },
  plugins: [],
};
