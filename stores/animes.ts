import { defineStore } from 'pinia';
import type { KitsuState, kitsuList } from "@/types/kitsuStore";


export const useAnimeStore = defineStore('animeStore', { // Ajout de l'ID du store
    state: (): KitsuState => ({
        items: [],
        loading: false,
        error: null,
        currentPage: 1,
        limiteParPage : 20,
        searchQuery: "",
        sortBy: "popularity",
    }),
    actions: {
        async fetchContents(type?: 'anime' | 'manga'){
            if (this.loading) return

            try {
                this.loading = true
                const sort = this.sortBy === 'rating' ? '-average_rating' : '-user_count'
                const url = `https://kitsu.io/api/edge/anime?page[limit]=${this.limiteParPage}&sort=${sort}`
                const response = await $fetch<kitsuList>(url)
                const {data, meta, links} = response;
                this.items = data;
                this.error = null
            } catch (error) {
                this.error = "hello"
            } finally {
                this.loading = false
            }
        }
    },
});
