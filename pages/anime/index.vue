<template>
  <div class="container mx-auto my-5">
    <h1 class="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
      Anime {{ store.loading }}
    </h1>   
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
      <AnimeItem v-for="item in store.items" :key="item.id" :content="item" />
    </div>
    <div v-if="store.loading" class="flex justify-center my-8">
      <div class="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// Initialisation du store
const store = useAnimeStore();
await store.fetchContents();


// Déclencher tester() correctement
onMounted(async () => {
  
});
</script>


<style scoped>
/* Styles personnalisés si nécessaire */
</style>
