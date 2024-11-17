<template>
  <div class="container mx-auto my-5">
    <!-- Informations sur la pagination -->
    <p>alpha</p>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6"
    >
      <AnimeItem v-for="item in store.items" :key="item.id" :content="item" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const store = useAnimeStore();

await store.fetchContents();
</script>

<style scoped>
/* Styles personnalisés si nécessaire */
</style>
