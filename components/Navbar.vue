<template>
  <nav class="bg-light-01 dark:bg-dark-01">
    <div
      class="border-light-b dark:border-dark-b container mx-auto border-b-2 px-4"
    >
      <div class="flex h-16 items-center justify-between">
        <div class="flex items-center space-x-8">
          <NuxtLink
            to="/"
            class="text-primary dark:text-primary text-xl font-bold"
          >
            Anime & Manga
          </NuxtLink>
          <div class="hidden space-x-4 md:flex">
            <NuxtLink
              v-for="link in navLinks"
              :key="link.path"
              :to="link.path"
              class="hover:text-primary dark:hover:text-primary rounded-md px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              active-class="text-primary dark:text-primary"
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
