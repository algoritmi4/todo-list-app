/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xl: { 'max': '1440px' },
      lg: { 'max': '976px' },
      md: { 'max': '768px' },
      sm: { 'max': '520px' },
      xs: { 'max': '350px' }
    },
    colors: {
      transparent: 'transparent',
      white: '#fff',
      black: '#000',
    },
    extend: {
      colors: {
        'gray': 'hsl(0, 0%, 80%)',
        'gray-dark': '#141414',
        'gray-light': '#DCDCDC',
        'blue': '#00bfff',
        'indigo': '#4b0082',
        'red': '#9b2d30',
        'red-light': '#c10020',
        'orange': '#ff7e00',
        'green': '#00382b',
        'green-light': '#66ff00',
      },
      borderRadius: {
        'sm': '4px',
        DEFAULT: '10px',
        'circle': '50%',
        'l': '15px',
      },
      borderWidth: {
        DEFAULT: '1px',
        'none': 'none',
        '0': '0',
        '2': '2px',
        '3': '3px',
        '4': '4px',
        '6': '6px',
        '8': '8px',
      },
      maxWidth: {
        DEFAULT: '50px',
      },
      backgroundImage: {
        'cross': "url('images/close-cross.svg')",
        'hatch': 'repeating-linear-gradient(-60deg, #555 0, #555 1px, transparent 1px, transparent 5px)',
        'up-arr': "url('images/up-arrow.png')",
        'down-arr': "url('images/down-arrow.png')",
        'arrows': "url('images/up-down-arrows.png')"
      }
    }
  },
  plugins: [],
}