<template>
  <div
    class="bg-light-second dark:bg-dark-second animate-fade-in mx-auto max-w-3xl overflow-hidden rounded-xl p-4 shadow-2xl"
  >
    <h2 class="mb-6 text-center text-3xl font-bold">Test de Formulaires</h2>
    <form class="space-y-6">
      <!-- Champ texte -->
      <div>
        <label for="nom" class="mb-1 block text-sm font-medium text-surface-600 dark:text-surface-300">Nom</label>
        <VInputText v-model="value" fluid />
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
const value = ref(null);
</script>
