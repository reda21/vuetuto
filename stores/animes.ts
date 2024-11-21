import { defineStore } from "pinia";
import { Anime } from "@/data/animes";
import type { Kitsu, KitsuState } from "@/types/kitsuStore";

const animeInstance = new Anime();

export const useAnimeStore = defineStore("anime", {
  state: (): KitsuState => ({
    items: [],
    loading: false,
    error: null,
    currentPage: 0,
    limiteParPage: 20,
    searchQuery: "",
    sortBy: "popularity",
  }),
  actions: {
    loadItems(newItems: Kitsu[]) {
      animeInstance.set(newItems); // Mets à jour les données dans l'instance Anime
      this.items = animeInstance.all(); // Mets à jour le state avec les données brutes
    },
    addItem() {
      
    },
  },
});
