<template>
  <div>
    <h1 class="text-gray-900">Button {{ add }}</h1>
    <div class="card mb-4 flex flex-wrap justify-center gap-4">
      <UiButton label="Secondary"  />
      <UiButton label="Secondary" variant="outlined" severity="info" />
    </div>
  </div>
</template>

<script lang="ts" setup>
//@ts-ignore
import { twMerge } from 'tailwind-merge'

definePageMeta({
  layout: 'tester', // correspond au fichier layouts/blog.vue
});

const add = twMerge('px-2 py-1 bg-red hover:bg-dark-red', 'p-3 bg-[#B91C1C]')
</script>

<style>
.alpha {
  color: var(--main-text-color);
}
</style>
