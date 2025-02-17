<template>
  <div class="container p-4 mx-auto">
    <h1 class="mb-4 text-2xl font-bold text-center">Actualités</h1>
    <div class="grid gap-4 md:grid-cols-3">
      <div v-for="article in articles" :key="article.title" class="p-4 bg-white rounded-lg shadow-lg">
        <img v-if="article.image" :src="article.image" alt="" class="object-cover w-full h-40 rounded" />
        <h2 class="mt-2 text-lg font-semibold">{{ article.title }}</h2>
        <p class="text-sm text-gray-600">{{ article.description }}</p>
        <a :href="article.url" target="_blank" class="inline-block mt-2 text-blue-500">Lire plus</a>
      </div>
    </div>
    <button @click="loadMore" class="px-4 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
      Charger plus
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const articles = ref([]);
const offset = ref(0);
const limit = 9;

const fetchNews = async () => {
  const { data } = await useFetch('https://api.mediastack.com/v1/news', {
    query: {
      access_key: '5a571ec3326cf4dfa0489776d7b2b13e',
      languages: 'fr',
      countries: 'ca,fr',
      limit,
      offset: offset.value
    }
  });
  if (data.value && data.value.data) {
    articles.value.push(...data.value.data);
  }
};

const loadMore = () => {
  offset.value += limit;
  fetchNews();
};

onMounted(fetchNews);
</script>