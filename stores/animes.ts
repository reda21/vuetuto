import { defineStore } from "pinia";
import { Anime } from "@/data/animes";
import { Kitsu } from "@/types/kitsu"


const animeInstance = new Anime();

export const useAnimeStore = defineStore("anime", {
  state: () => ({
    loading: false,
    items: animeInstance.all(), // Utilise les données brutes ici
    error: null,
    currentPage: 1,
  }),
  actions: {
    loadItems(newItems: Kitsu[]) {
      animeInstance.set(newItems); // Mets à jour les données dans l'instance Anime
      this.items = animeInstance.all(); // Mets à jour le state avec les données brutes
    },
  },
});


