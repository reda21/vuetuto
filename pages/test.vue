<template>
  <form
    @submit.prevent="handleSubmit"
    class="mx-auto max-w-md space-y-6 rounded-lg bg-white p-6 shadow-md"
  >
    <!-- Username -->
    <div>
      <label for="username" class="block text-sm font-medium text-gray-700">
        Nom d’utilisateur
      </label>
      <input
        id="username"
        v-model="form.username"
        type="text"
        :disabled="isValidating"
        class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
        placeholder="Entrez votre nom d’utilisateur"
      />
      <p v-if="errors.username" class="mt-1 text-sm text-red-600">
        {{ errors.username[0] }}
      </p>
    </div>

    <!-- Email -->
    <div>
      <label for="email" class="block text-sm font-medium text-gray-700"> Email </label>
      <input
        id="email"
        v-model="form.email"
        type="email"
        :disabled="isValidating"
        class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
        placeholder="exemple@domaine.com"
      />
      <p v-if="errors.email" class="mt-1 text-sm text-red-600">
        {{ errors.email[0] }}
      </p>
    </div>

    <!-- Password -->
    <div>
      <label for="password" class="block text-sm font-medium text-gray-700"> Mot de passe </label>
      <input
        id="password"
        v-model="form.password"
        type="password"
        :disabled="isValidating"
        class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
        placeholder="••••••••"
      />
      <p v-if="errors.password" class="mt-1 text-sm text-red-600">
        {{ errors.password[0] }}
      </p>
    </div>

    <!-- Submit with loader -->
    <div class="relative">
      <button
        type="submit"
        :disabled="isValidating"
        class="w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span v-if="!isValidating">Soumettre</span>
        <span v-else>Validation en cours…</span>
      </button>
      <svg
        v-if="isValidating"
        class="absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 transform animate-spin text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
      </svg>
    </div>
  </form>
</template>

<script setup lang="ts">
//@ts-ignore
import { reactive, ref } from 'vue';
import { useValidator } from '@/composables/useValidator';
import { Validator } from '@chantouchsek/validatorjs';

const { validate, addCustomAsyncRule } = useValidator();

// États réactifs
const form = reactive({
  username: '',
  email: '',
  password: '',
});

const rules = {
  username: 'required|min:3|username_available',
  email: 'required|email',
  password: 'required|min:8',
};

const errors = ref<Record<string, string[]>>({});
const isValidating = ref(false);

// Soumission du formulaire en async/await
async function handleSubmit() {
  const validation = new Validator(form, rules);

  isValidating.value = true;
  try {
    // Wrap checkAsync in a Promise to await it
    await new Promise<void>((resolve, reject) => {
      validation.checkAsync(
        () => resolve(),
        () => reject(validation.errors.all())
      );
    });
    // Validation réussie
    errors.value = {};
    console.log('Formulaire valide :', form);
  } catch (validationErrors) {
    // Validation échouée
    errors.value = validationErrors as Record<string, string[]>;
  } finally {
    isValidating.value = false;
  }
}
</script>
