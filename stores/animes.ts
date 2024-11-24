import { defineStore } from "pinia";
import type { Kitsu, KitsuState } from "@/types/kitsuStore";
import {
  AnimeRepository,
  RepositoryFactory,
} from "@/repositories/repositoryFactory";
const animeRepository = RepositoryFactory.get<AnimeRepository>("anime");

export const useAnimeStore = defineStore("anime", {
  state: (): KitsuState => ({
    items: [],
    loading: true,
    error: null,
    currentPage: 0,
    limiteParPage: 20,
    searchQuery: "",
    sortBy: "popularity",
  }),
  actions: {
    loadAnimes(newItems: Kitsu[]) {
      newItems.forEach((item) => this.addAnime(item));
    },
    addAnime(anime: Kitsu) {
      const index = this.getIndexAnimeById(anime.id);
      if (index !== null) {
        this.items[index] = anime;
      } else {
        this.items.push(anime);
      }
    },
    removeAnime(id: number) {
      this.items = this.items.filter((item) => item.id !== id);
    },
    updateItem(updatedAnime: Kitsu) {
      const index = this.getIndexAnimeById(updatedAnime.id);
      if (index !== null) {
        this.items[index] = updatedAnime;
      }
    },
    findAnimes(id: number): Kitsu | null {
      return this.getAnimeById(id) ?? null;
    },
    clearStore() {
      this.items = [];
    },
    async fetchContents() {
      try {
        this.loading = true;
        const {data: animes} = await animeRepository.fetchContents();
        this.loadAnimes(animes)
      } catch (error) {
      } finally {
        this.loading = false;
      }
    },
  },
  getters: {
    getIndexAnimeById: (state: KitsuState) => (id: number) => {
      const index = state.items.findIndex((item) => item.id === id);
      return index !== -1 ? index : null;
    },
    isAnimeInStore: (state: KitsuState) => (id: number) =>
      state.items.some((item) => item.id === id),
    getAnimeById: (state: KitsuState) => (id: number) =>
      state.items.find((item) => item.id === id),
    getAnimeByIndex: (state: KitsuState) => (index: number) =>
      state.items[index],
    getAnimeByTitle: (state: KitsuState) => (title: string) =>
      state.items.find((item) =>
        item.attributes.canonicalTitle
          .toLowerCase()
          .includes(title.toLowerCase())
      ),
    getAnimeBySlug: (state: KitsuState) => (slug: string) =>
      state.items.find((item) => item.attributes.slug === slug),
    getAnimeByGenre: (state: KitsuState) => (genre: string) =>
      state.items.filter((item) => item.attributes.showType === genre),
    count: (state: KitsuState): number => state.items.length,
  },
});
