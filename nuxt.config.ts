import { defineNuxtConfig } from 'nuxt/config';
import tailwindcss from '@tailwindcss/vite';
import { ConfigApp } from './configs/app';
import Aura from '@primeuix/themes/aura';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-02-20',
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
  primevue: {
    options: {
      theme: {
        preset: Aura,
        /*     options: {
          cssLayer: {
            name: "primevue",
            order: "tailwind-base, primevue, tailwind-utilities",
          },
        }, */
      },
    },
  },
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
  plugins: [
    //"~/plugins/iconify.ts"
  ],
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  pinia: {
    storesDirs: ['./stores/**'],
  },
  devServer: {
    port: 4000, // Changez le port ici
  },
  ...ConfigApp,
  runtimeConfig: {
    public: {
      laravelToken: process.env.LARAVEL_TOKEN ?? 'hello',
      tester: process.env.TESTER ?? 'alpha',
    },
  },
});

/*  eslint: {
    config: {
      stylistic: {
        indent: "tab",
        semi: true,        
      },
    },
  }, */
