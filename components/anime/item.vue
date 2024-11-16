<template>
    <div class="border rounded-lg p-4 shadow">
        <img :src="anime.attributes.posterImage?.medium" :alt="anime.attributes.canonicalTitle"
            class="w-full h-64 object-cover rounded">
        <h2 class="text-xl font-bold mt-2">{{ anime.attributes.canonicalTitle }}</h2>
        <p class="text-gray-600 mt-2 line-clamp-3">{{ anime.attributes.synopsis }}</p>
        <div class="mt-2 text-sm">
            <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {{ anime.attributes.status }}
            </span>
            <span class="ml-2 text-gray-500">
                Note: {{ anime.attributes.averageRating }}
            </span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Anime } from "@@/types/anime"

const props = defineProps<{
    anime: Anime
}>()


/*

*/
</script>