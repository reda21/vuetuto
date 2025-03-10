import { defineNuxtConfig } from "nuxt/config";
import tailwindcss from "@tailwindcss/vite";
import { ConfigApp } from "./configs/app";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  modules: [
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "nuxt-lodash",
    "@nuxt/test-utils/module",
    "@sidebase/nuxt-auth",
  ],
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
  vite: {
    plugins: [tailwindcss()],
  },
  plugins: ["~/plugins/iconify.ts"],
  devtools: { enabled: false },
  css: ["~/assets/css/main.css"],
  pinia: {
    storesDirs: ["./stores/**"],
  },
  devServer: {
    port: 4000, // Changez le port ici
  },
  ...ConfigApp,
  runtimeConfig: {
    // Les clés privées, accessibles uniquement côté serveur
    TIKTOK_CLIENT_SECRET: process.env.TIKTOK_CLIENT_SECRET,

    public: {
      laravelToken: process.env.LARAVEL_TOKEN ?? "hello",
      tester: process.env.TESTER ?? "alpha",
      TIKTOK_CLIENT_KEY: process.env.TIKTOK_CLIENT_KEY,
      TIKTOK_REDIRECT_URL: process.env.TIKTOK_REDIRECT_URL,
    },
  },
});
