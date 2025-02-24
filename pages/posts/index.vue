<template>
  <div class="container mx-auto p-4">
    {{ post }}
    <button @click="goBack" class="mb-4 rounded bg-blue-500 px-4 py-2 text-white">Retour</button>
    <h1 class="text-3xl font-bold">{{ post?.title }}</h1>
    <p class="mt-4 text-gray-700">{{ post?.body }}</p>
    <small class="mt-2 block text-gray-500"
      >Auteur : {{ post?.author }} - Date : {{ post?.createdAt }}</small
    >
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useFetch } from '#app';

interface Post {
  id: number;
  title: string;
  body: string;
  author: string;
  createdAt: string;
}

const route = useRoute();
const router = useRouter();
const post = ref<Post | null>(null);

async function fetchPost() {
  const { data } = await useFetch<Post>(`http://localhost:3030/posts/${route.params.id}`);
  post.value = data.value;
}

function goBack() {
  router.back();
}

onMounted(fetchPost);
</script>

<style>
/* Styles CSS supplémentaires, si nécessaires */
</style>
