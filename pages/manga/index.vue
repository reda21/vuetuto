<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white pb-2">Anime {{ store.countAllItem }} / {{
      store.totalPages }}</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
      <AnimeItem v-for="anime in store.items" key="anime.id" :content="anime" />
    </div>
    <div class="mb-[1500px]"></div>
    <p class="text-gray-900 dark:text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci pariatur suscipit voluptate sint dignissimos
      dolore veritatis, quo accusantium debitis facilis. Nesciunt in ipsam ut, earum expedita reprehenderit deleniti
      provident fugiat!</p>
  </div>

  <Loader v-if="store.loading" />
</template>

<script lang="ts" setup>
import { useAnimeStore } from "@/stores/animes"
import type { Kitsu } from "@/types/kitsu";

//data
const { y } = useWindowScroll();

//watches
watch(y, () => handleScroll());


//methods 
const handleScroll = useDebounceFn(() => {
  const maxY = document.documentElement.scrollHeight - window.innerHeight;
  console.info("maxY", maxY, "y", y.value, "maxY - y", y.value > maxY - 100)

}, 200); // 200ms de délai

//store
const store = useAnimeStore()
store.fetchContents()

onMounted(() => { }
)









//
</script>

<style></style>
