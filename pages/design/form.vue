<template>
  <div
    class="bg-light-second dark:bg-dark-second animate-fade-in mx-auto max-w-3xl overflow-hidden rounded-xl p-4 shadow-2xl"
  >
    <h2 class="mb-6 text-center text-3xl font-bold">Test de Formulaires</h2>
    <form class="space-y-6">
      <!-- Champ texte -->
      <div class="mp-3">
        <label
          for="nom"
          class="text-surface-600 dark:text-surface-300 mb-1 block text-sm font-medium"
          >Nom Utulisateur</label
        >
        <VInputText v-model="inputs.username" placeholder="Username" fluid />
      </div>
      <div class="mp-3">
        <label
          for="nom"
          class="text-surface-600 dark:text-surface-300 mb-1 block text-sm font-medium"
          >Nom</label
        >
        <VInputText v-model="inputs.nom" placeholder="Nom" fluid />
      </div>
      <div class="mp-3">
        <label
          for="nom"
          class="text-surface-600 dark:text-surface-300 mb-1 block text-sm font-medium"
          >cities</label
        >
        <VMultiSelect
          v-model="inputs.cities"
          filter
          :options="cities"
          optionLabel="name"
          placeholder="cities"
          fluid
        />
      </div>
      <div class="mp-3">
        <label
          for="nom"
          class="text-surface-600 dark:text-surface-300 mb-1 block text-sm font-medium"
          >city</label
        >
        <VSelect
          v-model="inputs.city"
          :options="cities"
          showClear
          optionLabel="name"
          placeholder="Select a City"
          fluid
        />
      </div>
      <div class="mp-3">
        <label
          for="firstname"
          class="text-surface-600 dark:text-surface-300 mb-1 block text-sm font-medium"
          >Prénom</label
        >
        <VAutoComplete
          v-model="inputs.prenom"
          :suggestions="items"
          :loading="loading"
          @complete="search"
          fluid
        />
        <small class="text-red-500 dark:text-red-400" v-if="error">{{ error }}</small>
      </div>
      <div class="card mb-3 flex flex-wrap justify-center gap-4">
        <div class="flex items-center gap-2">
          <VCheckbox v-model="inputs.pizza" inputId="ingredient1" name="pizza" value="Cheese" />
          <label for="ingredient1"> Cheese </label>
        </div>
        <div class="flex items-center gap-2">
          <VCheckbox v-model="inputs.pizza" inputId="ingredient2" name="pizza" value="Mushroom" />
          <label for="ingredient2"> Mushroom </label>
        </div>
        <div class="flex items-center gap-2">
          <VCheckbox v-model="inputs.pizza" inputId="ingredient3" name="pizza" value="Pepper" />
          <label for="ingredient3"> Pepper </label>
        </div>
        <div class="flex items-center gap-2">
          <VCheckbox v-model="inputs.pizza" inputId="ingredient4" name="pizza" value="Onion" />
          <label for="ingredient4"> Onion </label>
        </div>
      </div>
      <div class="mp-3">
        <label
          for="password"
          class="text-surface-600 dark:text-surface-300 mb-1 block text-sm font-medium"
          >password</label
        >
        <VPassword
          v-model="inputs.password"
          promptLabel="Choose a password"
          weakLabel="Too simple"
          mediumLabel="Average complexity"
          strongLabel="Complex password"
          toggleMask
          fluid
        >
          <template #header>
            <div class="text-xm mb-4 font-semibold">Pick a password</div>
          </template>
          <template #footer>
            <Divider />
            <ul class="my-0 pl-2 leading-normal">
              <li>At least one lowercase</li>
              <li>At least one uppercase</li>
              <li>At least one numeric</li>
              <li>Minimum 8 characters</li>
            </ul>
          </template>
        </VPassword>
      </div>
    </form>
    <pre>{{ inputs }}</pre>
  </div>
</template>

<script lang="ts" setup>
const items = ref<string[]>([]);
const loading = ref(false);
const error = ref('');

// Ajout d'un identifiant de requête pour lazying
let lastRequestId = 0;

interface Inputs {
  username: string;
  nom: string;
  prenom: string[];
  city: string;
  cities: string[];
  textea: string;
  pizza: string[];
  password: string;
}

const inputs = reactive<Inputs>({
  username: 'reda21',
  nom: '',
  prenom: [],
  city: '',
  cities: [],
  textea: String(),
  pizza: [],
  password: '',
});

const cities = ref([
  { name: 'New York', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
  { name: 'Istanbul', code: 'IST' },
  { name: 'Paris', code: 'PRS' },
]);

const test: (string | number)[] = [15, '10'];

const search = async (event: { query: string }) => {
  const requestId = ++lastRequestId; // incrémente à chaque appel
  try {
    loading.value = true;
    error.value = '';
    const data = await $fetch<string[]>('/api/suggestions', {
      // @ts-ignore
      query: { q: event.query },
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
};
</script>
