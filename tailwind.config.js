module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        'vh90': '90vh',
        'vh10': '10vh'
      },
      letterSpacing: {
        widestest: '.25em',
        widerest: '.75em'
      }
    }
  },
  plugins: [],
}
