<template>
  <nav class="bg-light-01 dark:bg-dark-01">
    <div class="container mx-auto px-4">
      <div class="flex h-16 items-center justify-between">
        <div class="flex items-center space-x-8">
          qyqt
          <NuxtLink to="/" class="text-primary dark:text-primary text-xl font-bold">
            Anime & Manga
          </NuxtLink>
          <div class="hidden space-x-4 md:flex">
            <NuxtLink
              v-for="link in navLinks"
              :key="link.path"
              :to="link.path"
              class="hover:text-primary border-primary/0 hover:border-primary border-b-2 px-3 py-2 text-sm font-medium text-gray-700 duration-200 dark:text-gray-300"
              active-class="text-primary dark:text-primary"
            >
              {{ link.name }}
            </NuxtLink>
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <DarkModeToggle />
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import DarkModeToggle from '@/components/DarkModeToggle.vue';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Anime', path: '/anime' },
  { name: 'Manga', path: '/manga' },
  { name: 'tailwind', path: '/tailwind' },
  { name: 'formulaire', path: '/formulaire' },
];

const classBtn = 'transition-transform duration-300 ease-in-out transform hover:scale-110';

// Utilisation du composable

/*
border-light-b dark:border-dark-b 
*/
</script>
