<template>
    <div class="accordion" :aria-expanded="expandedIndex">
      <slot></slot>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, provide, defineProps } from 'vue'
  
  // Paramètre par défaut pour le panneau actif
  const props = defineProps({
    value: {
      type: String,
      default: "0", // Valeur par défaut pour le premier panneau
    }
  })
  
  // Index du panneau actif
  const expandedIndex = ref(props.value)
  
  // Fournir une fonction de changement de panneau aux composants enfants
  provide('togglePanel', (index: string) => {
    expandedIndex.value = expandedIndex.value === index ? '' : index
  })
  </script>
  
  <style scoped>
  /* Styles du composant Accordion */
  .accordion {
    display: flex;
    flex-direction: column;
  }
  </style>
  