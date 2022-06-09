module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'app-main': '#855ca3',
        'app-light': '#d4c1e2'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
