/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#D46F4D',   // Couleur principale (boutons, liens, accents)
        secondary: '#FFBF66', // Couleur d'accent douce
        neutral: '#430C05',   // Fond sombre / texte fort
        info: '#08C5D1',      // Élément d’information
        dark: '#00353F',      // Couleur de contraste / fond principal
      },
    },
  },
  plugins: [],
}
