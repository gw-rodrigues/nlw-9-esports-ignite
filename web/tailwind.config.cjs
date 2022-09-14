/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx','./index.html'
  ],
  theme: {
    fontFamily:{
      sans:['Inter','sans-serif']
    },
    extend: {
      backgroundImage:{
        'nlw-gradient':'linear-gradient(89.86deg, #9572FC 03.08%, #43E7AD 53.94%, #E1D55D 97.57%)',
        galaxy: "url('/background-galaxy.jpeg')",
        'game-gradient': 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67.08%)',
      }
    },
  },
  plugins: [],
}
 