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

interface Inputs {
  nom: string;
  prenom: string[];
}

const inputs = reactive<Inputs>({
  nom: '' as string,
  prenom: [] as string[]
});

const search = async (event: { query: string }) => {
  try {
    loading.value = true;
    error.value = '';
    const data = await $fetch<string[]>('/api/suggestions', {
      params: { q: event.query }
    });
    items.value = data as string[];
  } catch (err) {
    error.value = 'Erreur lors du chargement des suggestions';
    items.value = [];
  } finally {
    loading.value = false;
  }
}
</script>
