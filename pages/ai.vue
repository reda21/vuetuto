<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
    <form @submit.prevent="generateResponse">
      <div class="mb-4">
        <label for="userInput" class="block text-sm font-medium text-gray-700">Entrez votre texte :</label>
        <input id="userInput" v-model="userInput" type="text" required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>
      <div class="flex justify-end">
        <button type="submit"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Générer la réponse
        </button>
      </div>
    </form>
    
    <!-- Affichage de l'indicateur de chargement -->
    <div v-if="loading" class="mt-6 text-center text-gray-700">
      <span>Chargement...</span>
    </div>

    <!-- Affichage de la réponse générée -->
    <div v-if="response && !loading" class="mt-6 p-4 bg-gray-100 rounded-md">
      <h2 class="text-lg font-medium text-gray-900">Réponse générée :</h2>
      <div class="mt-2 text-gray-700" v-html="response"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { GoogleGenerativeAI } from '@google/generative-ai';

const config = useRuntimeConfig();
const apiKey = config.public.geminiApiKey || '';
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: 'gemini-2.0-flash-thinking-exp-1219',
});

const generationConfig = {
  temperature: 2,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: 'text/plain',
};

const userInput = ref('');
const response = ref('');
const loading = ref(false);  // Nouvelle variable pour l'état de chargement

const generateResponse = async () => {
  loading.value = true;  // Active le chargement
  try {
    const result = await model.generateContent([
      { text: userInput.value }
    ]);
    const responseText = await result.response;

    // Vérifiez si la réponse semble déjà être un JSON
    try {
      const jsonResponse = JSON.parse(responseText.text());
      response.value = jsonResponse;  // Si c'est un JSON, affectez-le à la variable 'response'
    } catch (parseError) {
      console.error('Réponse non JSON:', parseError);
      response.value = responseText.text();  // Si ce n'est pas du JSON, affectez simplement le texte
    }

  } catch (error) {
    console.error('Erreur lors de la génération :', error);
  } finally {
    loading.value = false;  // Désactive le chargement une fois la réponse obtenue
  }
};
</script>
