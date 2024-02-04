/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'light': '#CEBEA4',
        'dark': '#0D0D0D',
        'primary': '#FF5631',
        'gray': '#1E1E1E'
      },
      fontFamily: {
        'Mono': 'Space Mono',
      },
    },
  },
  plugins: [],
}

