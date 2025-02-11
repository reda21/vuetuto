/** @type {import('tailwindcss').Config} */
//const primeui = require("tailwindcss-primeui");

export default {
  content: [
    "./components/**/*.{vue,js}", // Tous les fichiers dans le dossier components
    "./layouts/**/*.vue", // Tous les layouts
    "./pages/**/*.vue", // Toutes les pages
    "./plugins/**/*.{js,ts}", // Tous les plugins
    "./nuxt.config.{js,ts}", // Fichier de configuration de Nuxt
  ],
  darkMode: "class", // ou 'media'
  theme: {
    extend: {
      colors: {
        twitter: "#1DA1F2", // Couleur principale
        "twitter-dark": "#1A91DA", // Couleur au survol
        "twitter-light": "#ADD8F7", // Couleur pour focus
      },
    },
  },
  plugins: [require("tailwindcss-primeui")],
};
