import { defineNuxtConfig } from 'nuxt/config';
import tailwindcss from '@tailwindcss/vite';
import { ConfigApp } from './configs/app';
import Aura from '@primeuix/themes/aura';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-02-20',
  devtools: { enabled: false },
  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    'nuxt-lodash',
    '@nuxt/test-utils/module',
    '@sidebase/nuxt-auth',
    //"@nuxt/eslint",
    '@nuxt/fonts',
    '@primevue/nuxt-module',
  ],
  css: ['~/assets/css/main.css'],
  auth: {
    baseURL: '/api/auth',
    provider: {
      type: 'local',
      endpoints: {
        signIn: { path: '/login', method: 'post' },
        signOut: { path: '/logout', method: 'post' },
        signUp: { path: '/register', method: 'post' },
        getSession: { path: '/session', method: 'get' },
      },
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  app: {
    head: {
      title: 'Webtuto',
      meta: [
        { name: 'description', content: 'A Twitter clone built with Nuxt 3' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        { charset: 'UTF-8' },
      ],
      htmlAttrs: {
        //     class: "dark",
      },
      bodyAttrs: {
        class: 'min-h-screen bg-light-01 dark:bg-dark-01 transition-colors duration-300',
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
          type: 'text/javascript',
        },
      ],
    },
  },
  pinia: {
    storesDirs: ['./stores/**'],
  },
  devServer: {
    host: '0.0.0.0',
    port: 4000, // Changez le port ici 2
  },
  runtimeConfig: {
    public: {
      laravelToken: process.env.LARAVEL_TOKEN ?? 'hello',
      tester: process.env.TESTER ?? 'alpha',
    },
  },
  primevue: {
    options: {
      //     css: false,
      theme: {
        preset: Aura,
        options: {
          cssLayer: {
            name: 'primevue',
            order: 'tailwind-base, primevue, tailwind-utilities',
          },
        },
      },
    },
  },
});
