<template>
  <div
    class="overflow-hidden rounded-lg bg-white shadow-lg transition-transform hover:scale-105 dark:bg-gray-800"
  >
    <img
      :src="content.attributes.posterImage.small"
      :alt="content.attributes.canonicalTitle"
      class="h-64 w-full object-cover"
    />
    <div class="p-4">
      <h3
        class="mb-2 line-clamp-2 text-lg font-semibold text-gray-900 dark:text-white"
      >
        {{ content.attributes.canonicalTitle }}
      </h3>
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <span class="mr-1 text-yellow-500">★</span>
          <span class="text-gray-600 dark:text-gray-400">
            {{ formatRating(content.attributes.averageRating) }}
          </span>
        </div>
        <NuxtLink
          :to="`/anime/${content.id}`"
          class="bg-primary-500 hover:bg-primary-600 rounded-md px-4 py-2 text-white transition-colors"
        >
          Details
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Kitsu } from "~/types/kitsu";

const props = defineProps<{
  content: Kitsu;
}>();

const formatRating = (rating: string) => {
  return rating ? (parseFloat(rating) / 10).toFixed(1) : "N/A";
};
</script>
