<template>
  <nav class="bg-light-01 dark:bg-dark-01">
    <div class="container mx-auto px-4">
      <div class="flex h-16 items-center justify-between">
        <div class="flex items-center space-x-8">
          <NuxtLink to="/" class="text-xl font-bold">
            <span class="text-blog-accent">Anime</span>
            <span class="text-gray-700 dark:text-gray-100"> & </span>
            <span class="text-blog-secondary"> Manga </span>
          </NuxtLink>
          <div class="hidden space-x-4 md:flex md:gap-2">
            <NuxtLink
              v-for="link in navLinks"
              :key="link.path"
              :to="link.path"
              class="navbar-link"
              exactActiveClass="active"
            >
              {{ link.name }}
            </NuxtLink>
          </div>
        </div>

        <!-- Menu mobile -->
        <div class="flex items-center space-x-4 md:hidden">
          <button
            @click="isOpen = !isOpen"
            class="hover:text-blog-accent inline-flex items-center justify-center rounded-md p-2 text-gray-700 focus:outline-none dark:text-gray-300"
            aria-label="Menu"
          >
            <Icon :icon="isOpen ? 'mdi:close' : 'mdi:menu'" class="h-6 w-6" />
          </button>
          <DarkModeToggle />
        </div>

        <!-- Menu desktop -->
        <div class="hidden items-center space-x-4 md:flex">
          <DarkModeToggle />
        </div>
      </div>

      <!-- Menu mobile déroulant avec animation -->
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="transform opacity-0 -translate-y-2"
        enter-to-class="transform opacity-100 translate-y-0"
        leave-active-class="transition duration-250 ease-in"
        leave-from-class="transform opacity-100 translate-y-0"
        leave-to-class="transform opacity-0 -translate-y-2"
      >
        <div v-if="isOpen" class="submenu">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="submenu-link"
            exactActiveClass="active"
            @click="isOpen = false"
          >
            {{ link.name }}
          </NuxtLink>
        </div>
      </Transition>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRoute } from '#imports';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Anime', path: '/anime' },
  { name: 'Manga', path: '/manga' },
  { name: 'tailwind', path: '/tailwind' },
  { name: 'formulaire', path: '/formulaire' },
];

const classBtn = 'transition-transform duration-300 ease-in-out transform hover:scale-110';
const isOpen = ref(false);

// Fermer le menu lors du changement de route
const route = useRoute();
watch(
  () => route.path,
  () => {
    isOpen.value = false;
  }
);
</script>
