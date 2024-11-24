<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105"
  >
    <img
      :src="content.attributes.posterImage.small"
      :alt="content.attributes.canonicalTitle"
      class="w-full h-64 object-cover"
    />
    <div class="p-4">
      <h3
        class="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2"
      >
        {{ content.attributes.canonicalTitle }}
      </h3>
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <span class="text-yellow-500 mr-1">★</span>
          <span class="text-gray-600 dark:text-gray-400">
            {{ formatRating(content.attributes.averageRating) }}
          </span>
        </div>
        <NuxtLink
          :to="`/anime/${content.id}`"
          class="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
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
