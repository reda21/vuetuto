<template>
  <div class="container mx-auto my-5">
    <h1 class="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
      Anime
    </h1>   
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
    
      
    </div>
    <pre>{{ store.items.length }}</pre>
  </div>
</template>

<script lang="ts" setup>
import type { kitsuList } from "@/types/kitsu"

// Initialisation du store
const store = useAnimeStore();
const { data } = await useFetch<kitsuList>(
      "https://kitsu.io/api/edge/anime?page%5Bnumber%5D=1&page%5Bsize%5D=10"
    );

console.info("data", data.value?.data)
if(data.value?.data) store.loadItems(data.value?.data)

  
//await store.fetchContents();


//<AnimeItem v-for="item in store.items.all()" :key="item.id" :content="item" />


/*
<div v-if="store.loading" class="flex justify-center my-8">
      <div class="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
    </div>
*/

// Déclencher tester() correctement
onMounted(async () => {
  
});
</script>


<style scoped>
/* Styles personnalisés si nécessaire */
</style>
