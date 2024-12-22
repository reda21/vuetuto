<template>
  <div :aria-expanded="isActive" :aria-labelledby="headerId">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { inject, defineProps, ref } from 'vue'

// Récupérer la fonction togglePanel
const togglePanel = inject('togglePanel') as (index: string) => void

// Obtenir la valeur du panneau
const props = defineProps({
  value: {
    type: String,
    required: true,
  }
})

// Déterminer si le panneau est actif ou non
const isActive = ref(false)
const headerId = `accordion-header-${props.value}`

// Lier l'ouverture et la fermeture des panneaux
togglePanel(props.value)

// Mise à jour de l'état du panneau lors de l'interaction
const toggle = () => {
  isActive.value = !isActive.value
  togglePanel(props.value)
}

// Fournir la valeur à ses enfants
provide('panelValue', props.value)
provide('isActive', isActive)
</script>

<style scoped>
/* Styles du panneau */
.accordion-panel {
  border: 1px solid #ccc;
  margin: 5px 0;
  padding: 10px;
}
</style>


