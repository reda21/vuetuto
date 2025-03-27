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
          <div class="hidden space-x-4 md:flex">
            <NuxtLink
              v-for="link in navLinks"
              :key="link.path"
              :to="link.path"
              class="hover:text-blog-accent border-blog-accent/0 hover:border-blog-accent border-b-2 px-3 py-2 text-sm font-medium text-gray-700 duration-200 dark:text-gray-300"
              active-class="text-primary dark:text-primary"
            >
              {{ link.name }}
            </NuxtLink>
          </div>
        </div>

        <!-- Menu mobile -->
        <div class="flex items-center space-x-4 md:hidden">
          <button
            @click="isOpen = !isOpen"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blog-accent focus:outline-none"
            aria-label="Menu"
          >
            <Icon :icon="isOpen ? 'mdi:close' : 'mdi:menu'" class="w-6 h-6" />
          </button>
          <DarkModeToggle />
        </div>

        <!-- Menu desktop -->
        <div class="hidden md:flex items-center space-x-4">
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
        <div v-if="isOpen" class="md:hidden pt-2 pb-3 space-y-1">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary dark:text-gray-300"
            active-class="text-primary dark:text-primary"
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
import { Icon } from '@iconify/vue';
import DarkModeToggle from '@/components/DarkModeToggle.vue';
import { ref, watch } from 'vue';
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
watch(() => route.path, () => {
  isOpen.value = false;
});
</script>
