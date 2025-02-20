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
        //     class: "dark",
      },
      bodyAttrs: {
        class:
          "min-h-screen bg-light-01 dark:bg-dark-01 transition-colors duration-300",
      },
      script: [
        {
          innerHTML: `(function() {
            const theme = localStorage.getItem('vueuse-color-scheme')            
            if (theme === 'auto' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
              console.info('script dark mode is on')
              document.documentElement.classList.add('dark')
            } else {
              console.info('script dark mode is OFF')
              document.documentElement.classList.remove('dark')
            }
          })()`,
          type: "text/javascript",
        },
      ],
    },
  },
};
