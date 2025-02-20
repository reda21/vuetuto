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
    //"@nuxt/eslint",
    "@nuxt/fonts",
    //   "@nuxt/icon",
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
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
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

/*  eslint: {
    config: {
      stylistic: {
        indent: "tab",
        semi: true,
        // ...
      },
    },
  }, */