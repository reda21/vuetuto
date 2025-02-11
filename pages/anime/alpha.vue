<template>
  <div @scroll="onScroll" class="overflow-auto h-screen">
    <header>
      <h1>My Extensive Anime & Manga List</h1>
    </header>
    <div class="container-2xl mx-auto p-4">
      <div class="flex gap-1 justify-center my-[1.25rem]">
        <input
          class="w-1/2 p-2 text-base border border-gray-300 rounded"
          v-model="searchQuery"
          type="text"
          placeholder="Search for anime or manga..."
          @keyup.enter="resetPagination"
        />
        <button
          @click="toggleView"
          class="px-5 py-2 text-base text-white bg-blue-700 rounded cursor-pointer hover:bg-blue-800 transition-colors duration-300"
        >
          Toggle Anime/Manga
        </button>
      </div>
      <div class="content-grid">
        <div
          v-for="item in filteredContent"
          :key="item.id"
          class="content-card"
        >
          <img :src="item.image" :alt="item.title" width="200" height="280" />
          <div class="content-info">
            <div class="content-title">{{ item.title }}</div>
            <div class="content-rating">★ {{ item.rating.toFixed(1) }}</div>
            <div class="content-type">{{ item.type }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";

// Références
const currentView = ref<"Anime" | "Manga">("Anime");
const currentPage = ref(1);
const itemsPerPage = 12;
const searchQuery = ref("");

// Données principales avec ID assignés
let nextId = 1;
const contentData = ref(
  [
    {
      title: "Attack on Titan",
      rating: 9.0,
      image: "https://cdn.myanimelist.net/images/anime/10/47347.jpg",
      type: "Anime",
    },
    {
      title: "Death Note",
      rating: 8.6,
      image: "https://cdn.myanimelist.net/images/anime/9/9453.jpg",
      type: "Anime",
    },
    {
      title: "Fullmetal Alchemist: Brotherhood",
      rating: 9.1,
      image: "https://cdn.myanimelist.net/images/anime/1223/96541.jpg",
      type: "Anime",
    },
    {
      title: "One Punch Man",
      rating: 8.5,
      image: "https://cdn.myanimelist.net/images/anime/12/76049.jpg",
      type: "Anime",
    },
    {
      title: "My Hero Academia",
      rating: 8.3,
      image: "https://cdn.myanimelist.net/images/anime/10/78745.jpg",
      type: "Anime",
    },
    {
      title: "Steins;Gate",
      rating: 9.1,
      image: "https://cdn.myanimelist.net/images/anime/5/73199.jpg",
      type: "Anime",
    },
    {
      title: "Demon Slayer",
      rating: 8.5,
      image: "https://cdn.myanimelist.net/images/anime/1286/99889.jpg",
      type: "Anime",
    },
    {
      title: "Tokyo Ghoul",
      rating: 7.8,
      image: "https://cdn.myanimelist.net/images/anime/5/64449.jpg",
      type: "Anime",
    },
    {
      title: "Sword Art Online",
      rating: 7.2,
      image: "https://cdn.myanimelist.net/images/anime/11/39717.jpg",
      type: "Anime",
    },
    {
      title: "Naruto",
      rating: 7.9,
      image: "https://cdn.myanimelist.net/images/anime/13/17405.jpg",
      type: "Anime",
    },
    {
      title: "One Piece",
      rating: 8.6,
      image: "https://cdn.myanimelist.net/images/anime/6/73245.jpg",
      type: "Anime",
    },
    {
      title: "Dragon Ball Z",
      rating: 8.1,
      image: "https://cdn.myanimelist.net/images/anime/7/75199.jpg",
      type: "Anime",
    },
    // Autres données...
  ].map((item) => ({ ...item, id: nextId++ })),
);

// Génère une copie avec des IDs incrémentés
function loadMoreData() {
  const newContent = contentData.value.map((item) => ({
    ...item,
    id: nextId++,
  }));
  contentData.value.push(...newContent);
}

// Filtre les données selon la recherche et la vue actuelle
const filteredContent = computed(() => {
  return contentData.value
    .filter(
      (item) =>
        item.type === currentView.value &&
        item.title.toLowerCase().includes(searchQuery.value.toLowerCase()),
    )
    .slice(0, currentPage.value * itemsPerPage);
});

// Change entre Anime et Manga
function toggleView() {
  currentView.value = currentView.value === "Anime" ? "Manga" : "Anime";
  resetPagination();
}

// Réinitialise la pagination
function resetPagination() {
  currentPage.value = 1;
}

// Gestion du scroll infini
function onScroll() {
  const bottomReached =
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

  if (bottomReached) {
    console.log("Bottom reached");
  }
}

// Ajout de l'événement scroll
onMounted(() => {
  window.addEventListener("scroll", onScroll);
});
</script>

<style>
header {
  background-color: #2e51a2;
  color: white;
  padding: 20px 0;
  text-align: center;
}

h1 {
  margin: 0;
  font-size: 2.5em;
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.content-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.content-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.content-card img {
  width: 100%;
  height: 280px;
  object-fit: cover;
}

.content-info {
  padding: 15px;
}

.content-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #2e51a2;
}

.content-rating {
  color: #f39c12;
  font-weight: bold;
}

.content-type {
  font-size: 14px;
  color: #7f8c8d;
  margin-top: 5px;
}
</style>
