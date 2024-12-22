<template>
  <div v-show="isActive" class="accordion-content">
    <slot></slot>  <!-- Contenu du panneau -->
  </div>
</template>

<script setup lang="ts">
// Récupérer la fonction togglePanel
const togglePanel = inject('togglePanel') as (index: string) => void

// Déterminer si le panneau est actif ou non
// Injecter la valeur et l'état actif du panneau
const panelValue = inject('panelValue') as string
const isActive = inject('isActive') as Ref<boolean>

// Lorsqu'un panneau est ouvert ou fermé
togglePanel(panelValue)
</script>

<style scoped>
/* Styles du contenu */
.accordion-content {
  padding: 10px;
  background-color: #f9f9f9;
  display: none;
}
</style>
