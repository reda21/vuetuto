<template>
  <h1 class="mb-4 text-2xl font-bold dark:text-white">Contactez-nous</h1>
  <div>
    <ui-form @submit="handleSubmit">
      <FormInput
        id="name"
        label="Nom"
        placeholder="Votre nom"
        v-model="form.name"
        :required="true"
        :disabled="isLoading"
      />
      <FormInput
        id="email"
        label="Email"
        type="email"
        placeholder="Votre email"
        v-model="form.email"
        :required="true"
        :disabled="isLoading"
      />
      <FormTextarea
        id="message"
        label="Message"
        placeholder="Votre message"
        v-model="form.message"
        :required="true"
        :disabled="isLoading"
      />
      <FormButton
        :label="isLoading ? 'Envoi en cours...' : 'Envoyer'"
        :disabled="isLoading"
        :isLoading="isLoading"
      />
      <div v-if="form.messageSent" class="mt-4 text-green-500">Message envoyé !</div>
      <div v-if="form.errorMessage" class="mt-4 text-red-500">
        {{ form.errorMessage }}
      </div>
    </ui-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue';
import { useDarkMode } from '~/composables/useDarkMode';
import FormInput from '~/components/ui/form/FormInput2.vue';
import FormTextarea from '~/components/ui/form/FormTextarea.vue';
import FormButton from '~/components/ui/form/FormButton.vue';
import UiForm from '~/components/ui/form/Form.vue';

// Utilisation du mode sombre pour l'adaptation du thème
const { isDark } = useDarkMode();

// Gestion de l'état du formulaire
const isLoading = ref(false);
const form = reactive({
  name: '',
  email: '',
  message: '',
  messageSent: false,
  errorMessage: '',
});

// Méthode appelée lors du montage du composant
onMounted(() => {
  // Initialisation ou actions à effectuer lors du montage
});

// Gestion de la soumission du formulaire
const handleSubmit = async () => {
  isLoading.value = true;
  form.messageSent = false;
  form.errorMessage = '';

  // Validation des entrées
  if (!form.name || !form.email || !form.message) {
    form.errorMessage = 'Veuillez remplir tous les champs requis.';
    isLoading.value = false;
    return;
  }

  try {
    // Simuler l'envoi du message (remplacer par votre logique d'envoi)
    await new Promise((resolve) => setTimeout(resolve, 5000));
    console.log('Formulaire soumis:', {
      name: form.name,
      email: form.email,
      message: form.message,
    });
    form.messageSent = true;
    form.name = '';
    form.email = '';
    form.message = '';
  } catch (error) {
    form.errorMessage = "Erreur lors de l'envoi du message.";
    console.error('Erreur lors de la soumission du formulaire:', error);
  } finally {
    isLoading.value = false;
  }
};
</script>
