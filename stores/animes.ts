import { Titles } from './../types/kitsu';
import { defineStore } from 'pinia';
import type { KitsuState, kitsuList } from "@/types/kitsuStore";
import { RepositoryFactory, AnimeRepository } from "@@/repositories/repositoryFactory"
import { Title } from '../.nuxt/components';

const animeRepository = RepositoryFactory.get<AnimeRepository>("anime")


export const useAnimeStore = defineStore('animeStore', { // Ajout de l'ID du store
    state: (): KitsuState => ({
        items: [],
        loading: false,
        error: null,
        currentPage: 0,
        limiteParPage : 20,
        searchQuery: "",
        sortBy: "popularity",
    }),
    actions: {
        async fetchContents(type?: 'anime' | 'manga'){
            if (this.loading) return

            try {
                this.loading = true
                const offset = this.currentPage * 20
                const sort = this.sortBy === 'rating' ? '-average_rating' : '-user_count'                
                const {data, meta, links} = await animeRepository.getAllWithPagination({'page[limit]': this.limiteParPage, 'page[offset]': offset, sort});
                this.items = data;
                this.error = null
            } catch (error) {
                this.error = "hello"
            } finally {
                this.loading = false
            }
        },
        async tester () {
            const {data: animes, meta, links} = await animeRepository.getAllWithPagination({'page[limit]': 5, 'page[offset]': 5, sort: '-user_count'})
            console.log("animes", animes)
        }
    },
});
