// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  modules: ["@unocss/nuxt", "@pinia/nuxt"],
  devtools: { enabled: true },
  unocss: {
    nuxtLayers: true,
  },
  css: [
    '@unocss/reset/tailwind.css', // Importez les styles de réinitialisation de Tailwind CSS
  ],
  pinia: {
    storesDirs: ["./stores/**"],
  },
  app: {
    head: {
      title: 'Twitter Clone',
      meta: [
        { name: 'description', content: 'A Twitter clone built with Nuxt 3' },
        { name:"viewport", content:"width=device-width, initial-scale=1.0"},
        {charset: "UTF-8"}
      ],
    }
  },
});
