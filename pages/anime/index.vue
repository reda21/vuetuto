<template>
  <div class="container mx-auto my-5">
    <h1 class="mb-8 text-3xl font-bold text-gray-900 dark:text-white">Anime {{ date }}</h1>
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6"></div>
    <p @click="fetchData">{{ error?.message ?? 'sucess' }} - {{ status }}</p>
    <pre>{{ data }}</pre>
  </div>
</template>

<script lang="ts" setup>
import type { kitsuList } from "@/types/kitsu";
import { formatDate } from "@/utils/date";
import { useAnimeStore } from "@/stores/animes";
import * as Collection from "@/utils/collect";

//data
const date = formatDate(new Date().toISOString());
//const texte = Collection.tester();

// Initialisation du store
const store = useAnimeStore();
const { data, refresh, status, error } = await useFetch<kitsuList>(
	"https://kitsu.io/api/edge/anime?page%5Bnumber%5D=1&page%5Bsize%5D=10",
	{
		immediate: false, // La requête ne sera pas exécutée automatiquement
	},
);
const fetchData = async () => {
	await refresh(); // Exécute la requête à ce moment-là
};
console.info("data", data.value?.data);
if (data.value?.data) store.loadAnimes(data.value?.data);

const recharger = async () => await refresh();

//await store.fetchContents();

//<AnimeItem v-for="item in store.items.all()" :key="item.id" :con tent="item" />

/*
<div v-if="store.loading" class="flex justify-center my-8">
      <div class="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
    </div>
*/

// Déclencher tester() correctement
onMounted(async () => {});
</script>

<style scoped>
/* Styles personnalisés si nécessaire */
</style>
