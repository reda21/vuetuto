import { defineNuxtConfig } from 'nuxt/config'

import {ConfigApp} from "./configs/app"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "nuxt-lodash",
    "@nuxt/test-utils/module",
    "@sidebase/nuxt-auth",
  ],
  auth: {
    baseURL: '/api/auth',
    provider: {
      type: 'local',
      endpoints: {
        signIn: { path: '/login', method: 'post' },
        signOut: { path: '/logout', method: 'post' },
        signUp: { path: '/register', method: 'post' },
        getSession: { path: '/session', method: 'get' },
      }
    }
  },
  plugins: ["~/plugins/iconify.ts"],
  devtools: { enabled: false },
  css: [
    // "@unocss/reset/tailwind.css", // Importez les styles de réinitialisation de Tailwind CSS
  ],
  pinia: {
    storesDirs: ["./stores/**"],
  },
  devServer: {
    port: 4000, // Changez le port ici
  },
  ... ConfigApp,
  runtimeConfig: {
    public: {
      laravelToken: process.env.LARAVEL_TOKEN ?? "hello",
      tester: process.env.TESTER ?? "alpha"
    }
  }
});
