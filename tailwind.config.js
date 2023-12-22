/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      transparent: 'transparent',
      white: '#fff',
      black: '#000',
    },
    extend: {
      colors: {
        'gray-dark': '#141414',
        'blue': '#00bfff',
        'indigo': '#4b0082',
        'red': '#9b2d30',
        'orange': '#ff7e00',
        'green': '#00382b',
        'grey': 'hsl(0, 0%, 80%)'
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
      }
    }
  },
  plugins: [],
}