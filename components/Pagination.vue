<template>
  <div class="flex items-center justify-center">
    <button
      class="px-3 py-1 mx-1 bg-gray-200 rounded"
      :disabled="currentPage === 1"
      @click="handlePageChange(currentPage - 1)"
    >
      Previous
    </button>

    <!-- Première page -->
    <button
      v-if="currentPage > 1"
      class="px-3 py-1 mx-1 bg-gray-200 rounded"
      @click="handlePageChange(1)"
    >
      1
    </button>

    <!-- Séparation avant les pages visibles -->
    <span v-if="visiblePages[0] > 2" class="mx-2">...</span>

    <!-- Pages visibles -->
    <button
      v-for="page in visiblePages"
      :key="page"
      class="px-3 py-1 mx-1"
      :class="{
        'bg-blue-500 text-white': page === currentPage,
        'bg-gray-200 text-black': page !== currentPage,
      }"
      @click="handlePageChange(page)"
    >
      {{ page }}
    </button>

    <!-- Séparation après les pages visibles -->
    <span
      v-if="visiblePages[visiblePages.length - 1] < totalPages - 1"
      class="mx-2"
      >...</span
    >

    <!-- Dernière page -->
    <button
      v-if="currentPage < totalPages"
      class="px-3 py-1 mx-1 bg-gray-200 rounded"
      @click="handlePageChange(totalPages)"
    >
      {{ totalPages }}
    </button>

    <!-- Bouton suivant -->
    <button
      class="px-3 py-1 mx-1 bg-gray-200 rounded"
      :disabled="currentPage === totalPages"
      @click="handlePageChange(currentPage + 1)"
    >
      Next
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { PaginationProps } from "~/types/pagination";

defineProps<PaginationProps>();

const props = withDefaults(defineProps<PaginationProps>(), {
  currentPage: 1,
  limiteScreenPage: 5,
  total: 100,
  limiteParPage: 10,
});

// Calcul du nombre total de pages
const totalPages = computed(() =>
  Math.ceil((props.total || 1) / props.limiteParPage!),
);

// Page courante
const currentPage = computed(() => props.currentPage || 1);

// Pages visibles
const visiblePages = computed(() => {
  const pages: number[] = [];
  const half = Math.floor(props.limiteScreenPage! / 2);

  let start = Math.max(1, currentPage.value - half);
  let end = Math.min(totalPages.value, start + props.limiteScreenPage! - 1);

  if (end - start + 1 < props.limiteScreenPage!) {
    start = Math.max(1, end - props.limiteScreenPage! + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
});

// Gestion du changement de page
const handlePageChange = (page: number) => {
  if (page > 0 && page <= totalPages.value) {
    props.onPageChange(page);
  }
};
</script>

<style scoped>
/* Ajoutez vos styles ici */
</style>
