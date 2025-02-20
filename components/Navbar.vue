<template>
  <nav class="bg-light-01 dark:bg-dark-01">
    <div
      class="container mx-auto px-4 border-b-2 border-light-b dark:border-dark-b"
    >
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center space-x-8">
          <NuxtLink
            to="/"
            class="text-primary-600 dark:text-primary-400 font-bold text-xl"
          >
            Anime & Manga
          </NuxtLink>
          <div class="hidden md:flex space-x-4">
            <NuxtLink
              v-for="link in navLinks"
              :key="link.path"
              :to="link.path"
              class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium"
              active-class="text-primary-600 dark:text-primary-400"
            >
              {{ link.name }}
            </NuxtLink>
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <button @click="toggleDark" class="classBtn">
            <Icon :icon="icon" :class="iconClass" />
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useDarkMode } from "@/composables/useDarkMode";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Anime", path: "/anime" },
  { name: "Manga", path: "/manga" },
  { name: "laravel", path: "/laravel" },
];

const classBtn =
  "transition-transform duration-300 ease-in-out transform hover:scale-110";

// Utilisation du composable
const { isDark, toggleDark, icon, iconClass } = useDarkMode();
</script>
