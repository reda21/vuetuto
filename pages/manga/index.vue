remplacer dans le script détecteur scroll par .anime-list :

<template>
  <div class="anime-list">
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white pb-2">
      Anime {{ store.countAllItem }} / {{ store.totalPages }} /
      {{ store.loading ? "lazy" : "done" }}
    </h1>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6"
    >
      <AnimeItem v-for="anime in store.items" key="anime.id" :content="anime" />
    </div>
    <Loader v-if="store.loading" />
  </div>
  <p class="pb-52">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio ipsum, corporis cum placeat quod culpa vitae assumenda totam esse quia, voluptatem numquam iste distinctio architecto atque ipsam beatae est tempora!</p>
</template>

<script lang="ts" setup>
import { useAnimeStore } from "@/stores/animes";

import type { Kitsu } from "@/types/kitsu";

//data
const { y } = useWindowScroll();

//watches
watch(y, () => handleScroll());

const fetchMoreContents = () => store.fetchMoreContents();

//methods
const handleScroll = useDebounceFn(() => {
  const animeList = document.querySelector('.anime-list');
  if(!animeList) return;
  const animeMaxY = animeList.scrollHeight - animeList.clientHeight;
  const maxY = document.documentElement.scrollHeight - window.innerHeight;
  console.info("scrollHeight", document.documentElement.scrollHeight, "innerHeight", window.innerHeight);
  console.info("animeMaxY", animeMaxY, "y", y.value, "maxY - y", y.value > animeMaxY - 100);
  console.info("animeList.scrollTop", animeMaxY)
}, 200); // 200ms de délai

//store
const store = useAnimeStore();
store.fetchContents();

onMounted(() => {});

//
</script>

<style></style>
