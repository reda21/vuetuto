<template>
  <div>
    <p class="text-gray-900 dark:text-white">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia id
      excepturi temporibus culpa ut ducimus libero voluptates provident cumque
      repellat delectus, odit tenetur. Cupiditate quidem obcaecati dolor nostrum
      sint blanditiis!
    </p>
  </div>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6"
  >
    <AnimeItem v-for="anime in store.items" key="anime.id" :content="anime" />
  </div>
  <Loader v-if="store.loading" />
</template>

<script lang="ts" setup>
import { useAnimeStore } from "@/stores/animes"
import type { Kitsu } from "@/types/kitsu";


//store
const store = useAnimeStore()
await store.fetchContents()









//
</script>

<style></style>
