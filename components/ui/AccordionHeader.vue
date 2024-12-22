<template>
  <div @click="toggle" :id="headerId" class="accordion-header">
    <slot></slot>  <!-- Contenu du titre -->
  </div>
</template>

<script setup lang="ts">
// Récupérer la fonction togglePanel
const togglePanel = inject('togglePanel') as (index: string) => void

// Obtenir la valeur du panneau
const props = defineProps({
  value: {
    type: String,
    required: true,
  }
})

// Identifiant de l'en-tête
const headerId = `accordion-header-${props.value}`

const toggle = () => {
  togglePanel(props.value)  // Ouvrir ou fermer le panneau
}
</script>

<style scoped>
/* Styles pour l'entête du panneau */
.accordion-header {
  cursor: pointer;
  padding: 10px;
  background-color: #f1f1f1;
  border: 1px solid #ccc;
}
</style>


<template>
  <div @click="toggle" :id="headerId" class="accordion-header">
    <slot></slot> <!-- Le contenu de l'en-tête -->
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'

// Injecter la valeur et l'état actif du panneau
const panelValue = inject('panelValue') as string
const isActive = inject('isActive') as Ref<boolean>

// Identifiant de l'en-tête
const headerId = `accordion-header-${panelValue}`

// Fonction pour changer l'état actif du panneau
const toggle = () => {
  isActive.value = !isActive.value
}
</script>

<style scoped>
/* Styles pour l'entête */
.accordion-header {
  cursor: pointer;
  padding: 10px;
  background-color: #f1f1f1;
  border: 1px solid #ccc;
}
</style>
