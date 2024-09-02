/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'my-primary': '#011640',
        'my-secondary': '#203F59',
        'my-terciary': '#8C7472',
        'my-quartenary': '#F2F2F2',
        'my-quintenary': '#0D0D0D',
      }
    },
  },
  plugins: [],
}

