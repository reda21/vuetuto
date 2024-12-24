import { defineNuxtConfig } from "nuxt/config";
import { ConfigApp } from "./configs/app";
import { ConfigCss } from "./configs/primevue";

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
    "@primevue/nuxt-module",
  ],
  ... ConfigCss,
  auth: {
    baseURL: "/api/auth",
    provider: {
      type: "local",
      endpoints: {
        signIn: { path: "/login", method: "post" },
        signOut: { path: "/logout", method: "post" },
        signUp: { path: "/register", method: "post" },
        getSession: { path: "/session", method: "get" },
      },
    },
  },
  plugins: ["~/plugins/iconify.ts", "~/plugins/primevue.ts"],
  devtools: { enabled: true },
  pinia: {
    storesDirs: ["./stores/**"],
  },
  devServer: {
    port: 4000, // Changez le port ici
  },
  ...ConfigApp,
  runtimeConfig: {
    public: {
      laravelToken: process.env.LARAVEL_TOKEN ?? "hello",
      tester: process.env.TESTER ?? "alpha",
    },
  },
});
