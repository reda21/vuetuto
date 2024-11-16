<template>
  <div class="loader-container">
    <div class="spinner"></div>
    <p v-if="message" class="loader-message">{{ message }}</p>
  </div>
</template>

<script lang="ts" setup>
// Props pour personnaliser le composant
interface Props {
  message?: string; // Message facultatif à afficher sous le loader
}

// Valeur par défaut pour les props
const props = withDefaults(defineProps<Props>(), {
  message: 'Chargement...', // Message par défaut
});
</script>

<style scoped>
/* Conteneur pour centrer le loader */
.loader-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

/* Animation du spinner */
.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid transparent;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* Message sous le loader */
.loader-message {
  margin-top: 10px;
  font-size: 1rem;
  color: #555;
}

/* Animation clé pour la rotation */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
