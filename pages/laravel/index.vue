<script setup lang="ts">
const votre_token =  "CxThQFF6p50okC6shRTguoMdv4Lfxh9d1c8HluLd83297ca7"
const { data, error, status } = await useFetch("http://myapi.me/api/user", {
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": `Bearer ${votre_token}` // Remplacez par le token réel
  },
});
</script>

<template>
  <div class="p-4">
    <!-- Affichage du statut -->
    <h1 class="text-xl font-bold text-gray-800">Laravel : Status {{ status }}</h1>
    
    <!-- Affichage des données -->
    <pre v-if="data" class="bg-gray-100 p-4 rounded-md shadow-md text-gray-700">{{ data }}</pre>

    <!-- Affichage de l'erreur -->
    <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 p-4 rounded-md mt-4">
      <h2 class="text-lg font-semibold">Erreur :</h2>
      <pre class="whitespace-pre-wrap">{{ error }}</pre>
    </div>
  </div>
</template>
