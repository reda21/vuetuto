<script setup lang="ts">
const config = useRuntimeConfig();
console.info("config", config.public);

const laravelToken = config.public.laravelToken;

const tester = config.public.TESTER ?? "hello";

const { data, error, status } = await useFetch("http://myapi.me/api/user", {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${laravelToken}`, // Remplacez par le token réel
  },
});
</script>

<template>
  <div class="p-4">
    <!-- Affichage du statut -->
    <h1 class="text-xl font-bold text-green-800">
      Laravel : Status {{ status }} / {{ config.public.tester }}
    </h1>
    <p class="text-red-400">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
      accusantium, quis adipisci magni rem debitis optio quod perferendis,
      veritatis quibusdam eligendi cum beatae iusto aspernatur harum voluptatem
      culpa fugit fuga.
    </p>

    <!-- Affichage des données -->
    <pre
      v-if="data"
      class="rounded-md bg-gray-100 p-4 text-gray-700 shadow-md"
      >{{ data }}</pre
    >

    <!-- Affichage de l'erreur -->
    <div
      v-if="error"
      class="mt-4 rounded-md border border-red-400 bg-red-100 p-4 text-red-700"
    >
      <h2 class="text-lg font-semibold">Erreur :</h2>
      <pre class="whitespace-pre-wrap">{{ error }}</pre>
    </div>
  </div>
</template>
