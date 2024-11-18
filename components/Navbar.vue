<template>
  <nav class="bg-white dark:bg-gray-800 shadow-lg">
    <div class="container mx-auto px-4">
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
          <button
            @click="toggleDark()"
            class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            :aria-label="
              isDark ? 'Switch to light mode' : 'Switch to dark mode'
            "
          >
            <Icon
              icon="heroicons:sun-20-solid"
              v-if="isDark"
              class="w-5 h-5 text-yellow-500"
              style="color: #f39c12; font-size: 24px"
            />
            <Icon
              icon="heroicons:moon-20-solid"
              v-else
              class="w-5 h-5 text-white"
              style="color: #f39c12; font-size: 24px"
            />
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const navLinks = [
  { name: "Home", path: "/" },
  { name: "Anime", path: "/anime" },
  { name: "Manga", path: "/manga" },
];

const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === "dark");
const toggleDark = () => {
  colorMode.preference = isDark.value ? "light" : "dark";
};
</script>
