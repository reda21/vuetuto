<template>
  <form @submit.prevent="handleSubmit" class="mx-auto max-w-md space-y-6 rounded-lg bg-white p-6 shadow-md">
    <!-- Username -->
    <div>
      <label for="username" class="block text-sm font-medium text-gray-700">
        Nom d’utilisateur
      </label>
      <input id="username" v-model="form.username" type="text" :disabled="meta.pending"
        class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
        placeholder="Entrez votre nom d’utilisateur" />
      <p v-if="errors.has('v')" class="mt-1 text-sm text-red-600">
        {{ errors.first('username') }}
      </p>
    </div>

    <!-- Email -->
    <div>
      <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
      <input id="email" v-model="form.email" type="email" :disabled="meta.pending"
        class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
        placeholder="exemple@domaine.com" />
      <p v-if="errors.has('email')" class="mt-1 text-sm text-red-600">
        {{ errors.first('email') }}
      </p>
    </div>

    <!-- Password -->
    <div>
      <label for="password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
      <input id="password" v-model="form.password" type="password" :disabled="meta.pending"
        class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
        placeholder="••••••••" />
      <p v-if="errors.has('password')" class="mt-1 text-sm text-red-600">
        {{ errors.first('password') }}
      </p>
    </div>

    <!-- Submit Button -->
    <div class="relative">
      <button type="submit" :disabled="meta.pending"
        class="w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50">
        <span v-if="!meta.pending">Soumettre</span>
        <span v-else>Validation en cours…</span>
      </button>

      <!-- Spinner -->
      <svg v-if="meta.pending"
        class="absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 transform animate-spin text-white"
        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
      </svg>
    </div>
  </form>
</template>

<script setup lang="ts">
//@ts-ignore
import { reactive } from 'vue';
import { useValidator } from '@/composables/useValidator';
import { Data } from '../data/data';
import { Password } from '../.nuxt/components';

type InitialValuesType = {
  username: string;
  email: string;
  password: string;
}

const initialValues: Record<string, any> =  {
  username: '',
  email: '',
  password: '',
}

const { values: form, errors, meta, validate } = useValidator({
  initialValues,
  customMessages: {}
});





async function handleSubmit() {
  const result = await validate();

  if (result.valid) {
    console.log('✅ Données valides', form);
  } else {
    console.warn('❌ Erreurs détectées', result.errors.all());
  }
}
</script>
