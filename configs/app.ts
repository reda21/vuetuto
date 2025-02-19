export const ConfigApp = {
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
};
