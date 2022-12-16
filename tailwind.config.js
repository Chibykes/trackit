module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'app-main': '#15B3CC',
        'app-light': '#D1F9FF'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
