<template>
  <div class="container mx-auto my-5">
    <!-- Informations sur la pagination -->
    <h1 class="text-2xl font-bold text-center">La liste des animes</h1>
    <Pagination class="mt-4" :currentPage="currentPage" :limiteParPage="limiteParPage" :total="totalItems"
      :onPageChange="handlePageChange" />
    <!-- Contenu principal -->
    <div v-if="loading" class="text-center mt-4">
      <Loader />
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
      <AnimeItem v-for="anime in kitsu?.data" :key="anime.id" :anime="anime" />
    </div>

    <!-- Pagination -->
    <Pagination class="mt-4" :currentPage="currentPage" :limiteParPage="limiteParPage" :total="totalItems"
      :onPageChange="handlePageChange" />
  </div>
</template>

<script lang="ts" setup>
import type { AnimeList } from '@/types/anime';

// --- Déclarations des états ---
const currentPage = ref(1); // Page courante
const limiteParPage = 9; // Nombre d'éléments par page
const loading = ref(true); // État de chargement
const kitsu = ref<AnimeList | null>(null); // Données d'anime récupérées

// --- Calculs dérivés ---
const totalItems = ref(0); // Total d'éléments
const totalPages = computed(() => Math.ceil(totalItems.value / limiteParPage));

// --- Fonction pour charger les données ---
const fetchAnimeData = async (page: number) => {
  try {
    loading.value = true; // Indiquer que les données sont en chargement
    const { data } = await useFetch<AnimeList>(
      `https://kitsu.io/api/edge/anime?page[limit]=${limiteParPage}&page[offset]=${(page - 1) * limiteParPage
      }`
    );
    kitsu.value = data.value;
    totalItems.value = data.value?.meta?.count || 0;
  } catch (error) {
    console.error('Erreur lors du chargement des données:', error);
  } finally {
    loading.value = false; // Fin du chargement
  }
};

// --- Fonction de changement de page ---
const handlePageChange = (page: number) => {
  if (page !== currentPage.value) {
    currentPage.value = page;
    fetchAnimeData(page); // Recharger les données pour la page spécifiée
  }
};

// --- Surveillance initiale ---
watchEffect(() => {
  fetchAnimeData(currentPage.value); // Charger les données à la première exécution
});
</script>

<style scoped>
/* Styles personnalisés si nécessaire */
</style>
