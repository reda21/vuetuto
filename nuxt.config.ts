// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "nuxt-lodash",
  ],
  plugins: ['~/plugins/iconify.ts'],
  devtools: { enabled: true },
  css: [
    // "@unocss/reset/tailwind.css", // Importez les styles de réinitialisation de Tailwind CSS
  ],
  pinia: {
    storesDirs: ["./stores/**"],
  },
  devServer: {
    port: 4000, // Changez le port ici
  },
  app: {
    head: {
      title: "Twitter Clone",
      meta: [
        { name: "description", content: "A Twitter clone built with Nuxt 3" },
        { name: "viewport", content: "width=device-width, initial-scale=1.0" },
        { charset: "UTF-8" },
      ],
      htmlAttrs: {
       // class: "dark",
      },
      bodyAttrs: {
        class:
          "min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300",
      },
    },
  },
});
