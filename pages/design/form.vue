<template>
  <div
    class="bg-light-second dark:bg-dark-second animate-fade-in mx-auto max-w-3xl overflow-hidden rounded-xl p-4 shadow-2xl"
  >
    <h2 class="mb-6 text-center text-3xl font-bold">Test de Formulaires</h2>
    <form class="space-y-6">
      <!-- Champ texte -->
      <div class="mp-3">
        <label for="nom" class="mb-1 block text-sm font-medium text-surface-600 dark:text-surface-300">Nom</label>
        <VInputText v-model="inputs.nom" fluid/>
      </div>
      <div class="mp-3">
        <label for="firstname" class="mb-1 block text-sm font-medium text-surface-600 dark:text-surface-300">Prénom</label>
        <VAutoComplete 
          v-model="inputs.prenom" 
          :suggestions="items" 
          :loading="loading"
          @complete="search" 
          fluid
        />
        <small class="text-red-500 dark:text-red-400" v-if="error">{{ error }}</small>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
const items = ref<string[]>([]);
const loading = ref(false);
const error = ref('');

// Ajout d'un identifiant de requête pour lazying
let lastRequestId = 0;

interface Inputs {
  nom: string;
  prenom: string[];
}

const inputs = reactive<Inputs>({
  nom: '',
  prenom: []
});

const test: (string | number)[] = [15, "10"]

const search = async (event: { query: string }) => {
  const requestId = ++lastRequestId; // incrémente à chaque appel
  try {
    loading.value = true;
    error.value = '';
    const data = await $fetch<string[]>('/api/suggestions', {
      // @ts-ignore
      query: { q: event.query }
    });
    // Ne met à jour les items que si c'est la dernière requête
    if (requestId === lastRequestId) {
      items.value = data;
    }
  } catch (err) {
    if (requestId === lastRequestId) {
      error.value = 'Erreur lors du chargement des suggestions';
      items.value = [];
    }
  } finally {
    if (requestId === lastRequestId) {
      loading.value = false;
    }
  }
}
</script>

