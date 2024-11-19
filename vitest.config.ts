import { defineVitestConfig } from "@nuxt/test-utils/config";

export default defineVitestConfig({
  // Any custom Vitest config you require
  test: {
    environment: "nuxt",
    environmentOptions: {
      nuxt: {
        mock: {
          intersectionObserver: true,
          indexedDb: true,
        },
      },
    },
    // You can optionally set Nuxt-specific environment options
    // environmentOptions: {
    //   nuxt: {
    //     rootDir: fileURLToPath(new URL('./playground', import.meta.url)),
    //     domEnvironment: 'happy-dom', // 'happy-dom' (default) or 'jsdom'
    //     overrides: {
    //       // Other Nuxt config you want to pass
    //     }
    //   }
    // }
  },
});
